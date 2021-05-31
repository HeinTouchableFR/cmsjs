import React from 'react';
import Docs from 'container/Docs/Docs';
import parse from 'html-react-parser';
import { getPostData } from 'docs/lib/data';
import PropTypes from 'prop-types';
import InSection from 'container/Docs/InSection';

export default function Index({ data }) {
    return (
        <>
            <Docs
                menu={data.menu}
            >
                <h1>{data.name}</h1>
                <section>
                    {parse(data.contentHtml)}
                </section>
                {(data && data.inSection) && (
                    <InSection
                        elements={data.menu}
                    />
                )}
            </Docs>
        </>
    );
}
Index.propTypes = {
    data: PropTypes.shape({
        name: PropTypes.string.isRequired,
        contentHtml: PropTypes.string.isRequired,
        menu: PropTypes.arrayOf(PropTypes.shape({
        })).isRequired,
        inSection: PropTypes.bool.isRequired,
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
