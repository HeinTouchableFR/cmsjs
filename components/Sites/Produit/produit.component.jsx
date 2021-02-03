import styles from './produit.module.scss'
import Link from "next/link";
import {useRouter} from 'next/router'
import React from "react";

export default function Produit({item}) {
    return (
        <>
            <Link href={"/fiche/" + item._id + "/slug" }>
                <a title={item.nom}
                   className={styles.product}>
                    <div className={styles.product__image}>
                        <img width={385} height={385}
                            src={item.imageEnAvant ? 'data:image/jpeg;base64,' + item.imageEnAvant.base : '/empty.png'}
                            alt={item.nom} />
                    </div>
                    <div className={styles.product__body}>
                        <h3 className={styles.product__title}>
                            {item.nom}
                        </h3>
                        <div className={styles.product__price}>
                            {item.prix} €
                        </div>
                    </div>
                </a>
            </Link>

        </>
    )
}
