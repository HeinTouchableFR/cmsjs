import React from "react";
import Head from "next/head";
import Header from "../../../../components/Header/header.component";
import Content from "../../../../components/Content/content.component";
import axios from "axios";
import {Form} from "semantic-ui-react";

export default function CategorieVoir({item, errors, categories}) {

    const url = "categories"

    const categoriesOptions = []

    categories.map(categorie => categoriesOptions.push({key: categorie._id, value: categorie._id, text: categorie.nom}))

    return (
        <>
            <Head>
                <title>Catégories</title>
            </Head>
            <Header>
                <Content titre="Catégories" icon="fa-folder" url={url}>
                    <Form>
                        <Form.Input
                            fluid
                            label='Nom'
                            placeholder='Nom'
                            name='nom'
                            disabled
                            defaultValue={item.nom}
                        />
                        <Form.TextArea
                            label='Description'
                            placeholder='Description'
                            name='description'
                            disabled
                            defaultValue={item.description}
                        />
                        <Form.Dropdown
                            placeholder='Choisir une catégorie parent'
                            fluid
                            search
                            clearable
                            selection
                            options={categoriesOptions}
                            disabled
                            defaultValue={item.categorieParent}
                            name='categorieParent'
                        />
                    </Form>
                </Content>
            </Header>
        </>
    )
}

export async function getServerSideProps({params}) {
    const {id} = params

    let item = {}
    let errors = []

    await axios.get(process.env.URL + "/api/categories/" + id)
        .then(res => {
            item = res.data.data
        })
        .catch((error) => {
            errors = JSON.stringify(error)
        })

    let categories = []

    await axios.get(process.env.URL + '/api/categories/')
        .then(res => {
            categories = res.data.data
        })
        .catch((error) => {
            console.log(error)
        })

    return {
        props: {item, errors, categories}
    }
}
