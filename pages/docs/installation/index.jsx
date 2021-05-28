import React from 'react';
import Docs from 'container/Docs/Docs';
import parse from 'html-react-parser';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import styles from 'container/Docs/Docs.module.scss';
import PropTypes from 'prop-types';
import { getPostData } from 'docs/lib/data';

export default function Index({ data }) {
    const intl = useIntl();
    const menu = [
        {
            key: 'page-management',
            label: 'pageManagement',
            defaultLabel: 'Page management',
            id: 'page-management',
            url: `${process.env.SERVER}/docs/getting-started/page-management`,
        },
    ];

    return (
        <>
            <Docs
                menu={menu}
                backUrl={`${process.env.SERVER}/docs`}
            >
                <h1>{data.name}</h1>
                <section>
                    {parse(data.contentHtml)}
                    {intl.formatMessage({
                        id: 'docs.nextStep', defaultMessage: 'Next step: ',
                    })}
                    {' '}
                    <Link href={`${process.env.SERVER}/docs/getting-started/page-management`}>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a>
                            {intl.formatMessage({
                                id: 'docs.pageManagement', defaultMessage: 'Page management',
                            })}
                        </a>
                    </Link>
                </section>
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
    const data = await getPostData('installation', lang);

    return {
        props: {
            data,
        },
    };
}
