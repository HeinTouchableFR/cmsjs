import React from 'react';
import Docs from 'container/Docs/Docs';
import parse from 'html-react-parser';
import { getPostData } from 'docs/lib/data';
import PropTypes from 'prop-types';
import InSection from 'container/Docs/InSection';

export default function Index({ data }) {
    const menu = [
        {
            key: 'installation',
            label: 'installation',
            defaultLabel: 'Installation',
            id: 'installation',
            url: `${process.env.SERVER}/docs/installation`,
            elements: [
                {
                    key: 'page-management',
                    label: 'pageManagement',
                    defaultLabel: 'Page management',
                    id: 'page-management',
                    url: `${process.env.SERVER}/docs/getting-started/page-management`,
                },
            ],
        },
        {
            key: 'getting-started',
            label: 'gettingStarted',
            defaultLabel: 'Getting Started',
            id: 'getting-started',
            url: `${process.env.SERVER}/docs/getting-started`,
            elements: [
                {
                    key: 'page-management',
                    label: 'pageManagement',
                    defaultLabel: 'Page management',
                    id: 'page-management',
                    url: `${process.env.SERVER}/docs/getting-started/page-management`,
                },
            ],
        },
    ];

    return (
        <>
            <Docs
                menu={menu}
            >
                <h1>{data.name}</h1>
                <section>
                    {parse(data.contentHtml)}
                </section>
                <InSection
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
    const data = await getPostData('index', lang);

    return {
        props: {
            data,
        },
    };
}
