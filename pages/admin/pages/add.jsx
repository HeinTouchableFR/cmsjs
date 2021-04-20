import React, {
    useEffect, useState,
} from 'react';
import { useIntl } from 'react-intl';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import nookies from 'nookies';
import Builder from 'container/Builder/Builder';
import { auth } from 'utils/dbConnect';
import defaultComponents from 'variables/components';

export default function Ajouter({ pages, images }) {
    const url = 'pages';

    const intl = useIntl();

    const [post, setPost] = useState({
    });
    const [imagesList, setImagesList] = useState(JSON.parse(images));
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({
    });
    const [content, setContent] = useState('');

    const validate = async (slug) => {
        const res = await fetch(`/api/pages/slug/${slug}`);
        const { data } = await res.json();
        const errs = {
        };
        if (data && data.slug) {
            errs.slug = intl.formatMessage({
                id: 'slug.error', defaultMessage: 'The slug {slug} is already defined',
            }, {
                slug,
            });
        }
        return errs;
    };

    const onSubmit = async (e, data) => {
        setContent({
            title: e.title,
            slug: e.slug,
            parentPage: e.parentPage,
            data,
        });
        validate(e.slug).then((errs) => setErrors(errs));
        setIsSubmitting(true);
    };

    const create = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/pages', {
                body: JSON.stringify({
                    title: content.title,
                    slug: content.slug,
                    author: 'A faire',
                    published: new Date(),
                    content: JSON.stringify(content.data),
                    parentPage: content.parentPage,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
            });

            const result = await res.json();
            setPost(result);
            router.push(`/admin/${url}/edit/${result.data._id}`);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                create();
            } else {
                setIsSubmitting(false);
            }
        }
    }, [errors]);

    return (
        <>
            <Head>
                <title>
                    {intl.formatMessage({
                        id: 'page.addNew', defaultMessage: 'Add a new page',
                    })}
                </title>
            </Head>
            <Builder
                url={url}
                onSubmit={onSubmit}
                pages={pages}
                page={post}
                loading={loading}
                images={imagesList}
                setImages={setImagesList}
                modules={defaultComponents.pageComponents(intl)}
                errors={errors}
            />
        </>
    );
}

export async function getServerSideProps(ctx) {
    try {
        const cookies = nookies.get(ctx);
        const token = await auth.verifyIdToken(cookies.token);

        if (!token.roles.some((r) => ['admin', 'editor', 'moderator'].includes(r))) {
            throw new Error('unauthorized');
        }

        let pages = [];
        await axios
            .get(`${process.env.URL}/api/pages`)
            .then((res) => {
                pages = res.data.data;
            })
            .catch((error) => {
            });

        let images = [];
        await axios
            .get(`${process.env.URL}/api/images`)
            .then((res) => {
                images = res.data.data;
            })
            .catch(() => {
            });

        return {
            props: {
                pages, images: JSON.stringify(images),
            },
        };
    } catch (err) {
        return {
            redirect: {
                permanent: false,
                destination: '/admin/login',
            },
            props: {
            },
        };
    }
}
