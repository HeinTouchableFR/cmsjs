import styles from './produit.module.scss'
import Link from "next/link";
import {useRouter} from 'next/router'
import React from "react";
import Produit from "./produit.component";

export default function ProduitsGrid({items}) {
    return (
        <>
            <div className={styles.push_products__grid}>
                {items && items.map(item => <Produit key={item._id} item={item}/>)}
            </div>
        </>
    )
}
