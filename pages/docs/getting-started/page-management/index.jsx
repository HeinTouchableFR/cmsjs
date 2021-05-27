import React, {
    useEffect, useState,
} from 'react';
import Docs from 'container/Docs/Docs';
import parse from 'html-react-parser';
import Link from 'next/link';
import { useIntl } from 'react-intl';

export default function Index() {
    const intl = useIntl();
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
    const [data, setData] = useState({
        name: '',
        contentHtml: '',
    });

    useEffect(async () => {
        const res = await fetch(`${process.env.SERVER}/api/docs/${intl.locale}/page-management`);
        const dataRes = await res.json();
        if (dataRes.success) {
            setData(dataRes.data);
        }
    }, [intl.locale]);

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
                <section>
                    <h2>
                        {intl.formatMessage({
                            id: 'docs.inSection', defaultMessage: 'In this section',
                        })}
                    </h2>
                    <ul>
                        <li>
                            <Link href={`${process.env.SERVER}/docs/getting-started/page-management/create-new-page`}>
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <a>
                                    {intl.formatMessage({
                                        id: 'docs.createNewPage', defaultMessage: 'Create a New Page',
                                    })}
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href={`${process.env.SERVER}/docs/getting-started/page-management/build-your-first-page`}>
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <a>
                                    {intl.formatMessage({
                                        id: 'docs.buildFirstPage', defaultMessage: 'Build Your First Page',
                                    })}
                                </a>
                            </Link>
                        </li>
                    </ul>
                </section>
            </Docs>
        </>
    );
}
