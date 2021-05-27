import React, {
    useEffect, useState,
} from 'react';
import Docs from 'container/Docs/Docs';
import styles from 'container/Docs/Docs.module.scss';
import Link from 'next/link';
import parse from 'html-react-parser';
import { useIntl } from 'react-intl';

export default function Index() {
    const intl = useIntl();
    const menu = [
        {
            key: 'getting-started',
            label: 'gettingStarted',
            defaultLabel: 'Getting Started',
            id: 'getting-started',
            url: `${process.env.SERVER}/docs/getting-started`,
        },
    ];
    const [data, setData] = useState({
        name: '',
        contentHtml: '',
    });

    useEffect(async () => {
        const res = await fetch(`${process.env.SERVER}/api/docs/${intl.locale}/index`);
        const dataRes = await res.json();
        if (dataRes.success) {
            setData(dataRes.data);
        }
    }, [intl.locale]);

    return (
        <>
            <Docs
                menu={menu}
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
                    <div className={styles.sub}>
                        <div className={styles.item}>
                            <div className={styles.item_title}>
                                <Link href={`${process.env.SERVER}/docs/getting-started`}>
                                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                    <a>
                                        {intl.formatMessage({
                                            id: 'docs.gettingStarted', defaultMessage: 'Getting Started',
                                        })}
                                    </a>
                                </Link>
                            </div>
                            <section className={styles.item_sub_item}>
                                <Link href={`${process.env.SERVER}/docs/getting-started/page-management`}>
                                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                    <a>
                                        {intl.formatMessage({
                                            id: 'docs.pageManagement', defaultMessage: 'Page management',
                                        })}
                                    </a>
                                </Link>
                            </section>
                        </div>
                    </div>
                </section>
            </Docs>
        </>
    );
}
