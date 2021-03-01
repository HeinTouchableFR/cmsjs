import React from 'react';
import axios from 'axios';
import { FormattedMessage } from 'react-intl';

import Header from 'container/Sites/Header/Header';
import ProductsGrid from 'container/Sites/Product/ProductsGrid';

export default function Home({ items }) {
    return (
        <>
            <Header title={'HomePage'} />
            <FormattedMessage id='fileManagerUploadAddNew' defaultMessage='Add new picture' />
            <div className='container'>
                <ProductsGrid items={items} />
            </div>
        </>
    );
}

export async function getServerSideProps() {
    let items = [];

    await axios
        .get(process.env.URL + '/api/produits')
        .then((res) => {
            items = res.data.data;
        })
        .catch(() => {});

    return {
        props: { items },
    };
}
