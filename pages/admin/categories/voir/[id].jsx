import React from "react";
import Head from "next/head";
import Header from "../../components/Header/header.component";
import Content from "../../components/Content/content.component";
import axios from "axios";

export default function CategorieVoir({item, errors}) {

    const url = "categories"

    console.log(item)

    return (
        <>
            <Head>
                <title>Catégories</title>
            </Head>
            <Header>
                <Content titre="Catégories" icon="fa-folder" url={url}>
                    {item.nom}
                    {errors}
                </Content>
            </Header>
        </>
    )
}

export async function getStaticPaths() {

    let data = []

    await axios.get('http://localhost:3000/api/categories/')
        .then(res => {
            data = res.data.data
        })
        .catch((error) => {
            console.log(error)
        })

    return {
        paths: data.map((item) => ({ params: { id: item._id } })),
        fallback: false,
    };
}

export async function getStaticProps({params}) {
    const {id} = params

    let item = {}
    let errors = []

    await axios.get("http://localhost:3000/api/categories/" + id)
        .then(res => {
            item = res.data.data
        })
        .catch((error) => {
            errors = JSON.stringify(error)
        })

    return {
        props: {item, errors}
    }
}
