import React from 'react';
import axios from 'axios';

import Header from 'container/Sites/Header/Header';
import ProductsGrid from 'container/Sites/Product/ProductsGrid';

export default function Home({ items }) {
    return (
        <>
            <Header title={'HomePage'} />
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
