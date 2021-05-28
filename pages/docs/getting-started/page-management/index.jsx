import React from 'react';
import Docs from 'container/Docs/Docs';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import { getPostData } from 'docs/lib/data';
import InSectionSingle from 'container/Docs/InSectionSingle';

export default function Index({ data }) {
    const menu = [
        {
            key: 'create-new-page',
            label: 'createNewPage',
            defaultLabel: 'Create a New Page',
            id: 'create-new-page',
            url: `${process.env.SERVER}/docs/getting-started/page-management/create-new-page`,
        },
        {
            key: 'build-your-first-page',
            label: 'buildFirstPage',
            defaultLabel: 'Build Your First Page',
            id: 'build-your-first-page',
            url: `${process.env.SERVER}/docs/getting-started/page-management/build-your-first-page`,
        },
    ];

    return (
        <>
            <Docs
                menu={menu}
                backUrl={`${process.env.SERVER}/docs/getting-started`}
            >
                <h1>{data.name}</h1>
                <section>
                    {parse(data.contentHtml)}
                </section>
                <InSectionSingle
                    elements={menu}
                />
            </Docs>
        </>
    );
}
Index.propTypes = {
    data: PropTypes.shape({
        name: PropTypes.string.isRequired,
        contentHtml: PropTypes.string.isRequired,
    }).isRequired,
};

export async function getServerSideProps(context) {
    const lang = context.locales.includes(context.locale.substr(0, 2)) ? context.locale.substr(0, 2) : 'en';
    const data = await getPostData('page-management', lang);

    return {
        props: {
            data,
        },
    };
}
