import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'docs/data');

export async function getSortedPostsData(lang) {
    const docsDirectory = path.join(process.cwd(), `docs/data/${lang}`);
    // Get file names under /posts
    const fileNames = fs.readdirSync(docsDirectory);
    const allPostsData = await Promise.all(fileNames.map(async (fileName) => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, '');

        // Read markdown file as string
        const fullPath = path.join(docsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);
        const processedContent = await remark()
            .use(html)
            .process(matterResult.content);
        const content = processedContent.toString();

        // Combine the data with the id
        return {
            id,
            ...matterResult.data,
            content,
        };
    }));
    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        }
        return -1;
    });
}

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName) => ({
        params: {
            id: fileName.replace(/\.md$/, ''),
        },
    }));
}

export async function getPostData(id, lang) {
    const docsDirectory = path.join(process.cwd(), `docs/data/${lang}`);
    const fullPath = path.join(docsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    // Combine the data with the id and contentHtml
    return {
        id,
        contentHtml,
        ...matterResult.data,
        locale: lang,
    };
}
