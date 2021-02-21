import React from 'react';
import axios from 'axios';
import Header from 'container/Sites/Header/Header';
import ProductSingle from 'container/Sites/Product/ProductSingle';

export default function FicheProduit({ item, success }) {
    return (
        <>
            <Header title={success ? item.nom : 'Aucun produit trouvé'} />
            <div className='container'>{success ? <ProductSingle item={item} /> : 'Pas de produit'}</div>
        </>
    );
}

export async function getServerSideProps({ params }) {
    const { id } = params;

    let item = {};
    let success = false;
    let errors = [];

    await axios.get(process.env.URL + '/api/produits/' + id).then((res) => {
        item = res.data.data;
        success = res.data.success;
    });

    return {
        props: { item, success, errors },
    };
}
