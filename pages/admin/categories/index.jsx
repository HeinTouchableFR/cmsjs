import React from "react";
import Header from "../components/Header/header.component";
import Head from "next/head";
import Content from "../components/Content/content.component";
import styles from '../../style/table.module.scss'
import ActionBouton from "../components/Bouton/ActionBouton";
import axios from "axios";

export default function Categories({items, errors}) {

    //items = JSON.parse(items)

    const url = "categories"

    return (
        <>
            <Head>
                <title>Catégories</title>
            </Head>
            <Header>
                <Content titre="Catégories" icon="fa-folder" url={url}>
                    {errors}
                    <table className={styles.table + " " + styles.tableStriped}>
                        <thead className={styles.thead}>
                        <th className={styles.th} scope="col">Id</th>
                        <th className={styles.th} scope="col">Nom</th>
                        <th className={styles.th} scope="col">Actions</th>
                        </thead>
                        <tbody className={styles.tbody}>
                        {items && items.map(item =>
                            <Categorie item={item} url={url} key={item._id}/>
                        )}
                        </tbody>
                    </table>
                </Content>
            </Header>
        </>
    )
}

function Categorie({item, url, categorieParent, tiret = ""}) {

    if (!item.nom) {

    }

    if (categorieParent) {
        tiret += " — "
    }

    return <>
        <tr className={styles.tr}>
            <td scope="row" className={styles.td}>{item._id}</td>
            <td className={styles.td}>{categorieParent ? tiret : ''} {item.nom}</td>
            <td className={styles.td}>
                <ActionBouton url={url} style={"voir"} icon={"fa-eye"} action={"voir"} id={item._id}/>
                <ActionBouton url={url} style={"modifier"} icon={"fa-pen"} action={"modifier"} id={item._id}/>
                <ActionBouton url={url} style={"supprimer"} icon={"fa-trash"} action={"supprimer"} id={item._id}/>
            </td>
        </tr>
        {item.categoriesEnfant && item.categoriesEnfant.map(itemE => <Categorie item={itemE} url={url}
                                                                                categorieParent={item} tiret={tiret} key={itemE._id}/>)}
    </>
}

export async function getStaticProps() {

    let items = []
    let errors = []

    await axios.get('http://localhost:3000/api/categories/admin')
        .then(res => {
            items = res.data.data
        })
        .catch((error) => {
            errors = JSON.stringify(error)
        })


    return {
        props: {items, errors}
    }
}
