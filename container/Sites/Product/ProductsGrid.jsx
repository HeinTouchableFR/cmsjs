import React from 'react';

import styles from './Product.module.scss';

import Product from './Product';

export default function ProductsGrid({ items }) {
    return (
        <>
            <div className={styles.push_products__grid}>{items && items.map((item) => <Product key={item._id} item={item} />)}</div>
        </>
    );
}
