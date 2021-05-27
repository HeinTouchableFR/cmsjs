import React, {
    useEffect, useState,
} from 'react';
import Docs from 'container/Docs/Docs';
import parse from 'html-react-parser';
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
        const res = await fetch(`${process.env.SERVER}/api/docs/${intl.locale}/create-new-page`);
        const dataRes = await res.json();
        if (dataRes.success) {
            setData(dataRes.data);
        }
    }, [intl.locale]);

    return (
        <>
            <Docs
                menu={menu}
                backUrl={`${process.env.SERVER}/docs/getting-started/page-management`}
            >
                <h1>{data.name}</h1>
                <section>
                    {parse(data.contentHtml)}
                </section>
            </Docs>
        </>
    );
}
