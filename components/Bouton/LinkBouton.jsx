import styles from './linkbouton.module.scss'
import React from "react";
import Link from "next/link";


export default function LinkBouton({label, icon, url, children}) {

    return (
        <Link href={url}>
            <a className={styles.linkBouton}>
                {icon &&
                    <i className={"fad " + icon}></i>
                }
                {label}
            </a>
        </Link>
    )
}
