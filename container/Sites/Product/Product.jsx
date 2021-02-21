import React from 'react';
import Link from 'next/link';

import styles from './Product.module.scss';

export default function Product({ item }) {
    return (
        <>
            <Link href={'/fiche/' + item._id + '/slug'}>
                <a title={item.nom} className={styles.product}>
                    <div className={styles.product__image}>
                        <img width={385} height={385} src={item.imageEnAvant ? item.imageEnAvant.url : '/empty.png'} alt={item.nom} />
                    </div>
                    <div className={styles.product__body}>
                        <h3 className={styles.product__title}>{item.nom}</h3>
                        <div className={styles.product__price}>{item.prix} €</div>
                    </div>
                </a>
            </Link>
        </>
    );
}
