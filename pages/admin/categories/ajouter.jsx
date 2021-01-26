import React, {useState} from "react";
import Head from "next/head";
import Header from "../../../components/Header/header.component";
import Content from "../../../components/Content/content.component";
import InputForm from "../../../components/Input/Input";
import Form from "../../../components/Formulaire/Form";
import FormBouton from "../../../components/Bouton/FormBouton";
import {error} from "next/dist/build/output/log";
import Router from "next/router";
import axios from "axios";
import SelectCustom from "../../../components/Select/Select";

export default function CategorieAjouter({categories, errors}) {

    const url = "categories"

    const [nom, setNom] = useState("")
    const [description, setDescription] = useState("")
    const [categorieParent, setCategorieParent] = useState(null)

    async function onSubmit(e) {
        e.preventDefault()

        const CategorieObject = {
            nom: nom,
            description: description,
            categorieParent: categorieParent,
            categoriesEnfant: []
        };

        const headers = new Headers()
        headers.append('Accept', 'application/json')

        let item = []

        await axios.post(process.env.URL + '/api/'+ url, CategorieObject)
            .then(res => item = res.data.data);

        if(categorieParent){
            let categorieP = []

            await axios.get(process.env.URL + '/api/categories/' + item.categorieParent)
                .then(res => {
                    categorieP = res.data.data
                })
                .catch((error) => {
                    errors = JSON.stringify(error)
                })
            console.log(categorieP)
            categorieP.categoriesEnfant.push(item._id)

            await axios.put(process.env.URL + '/api/'+ url + '/' + categorieP._id, categorieP)
                .then(res => Router.push("/admin/" + url));
        }
        Router.push("/admin/" + url)


    }

    function onNomChange(e) {
        setNom(e.target.value)
    }

    function onDescriptionChange(e) {
        setDescription(e.target.value)
    }

    function onCategorieParentChange(e) {
        setCategorieParent(e)
    }

    return (
        <>
            <Head>
                <title>Catégories</title>
            </Head>
            <Header>
                <Content titre="Catégories" icon="fa-folder" url={url} action={"ajouter"}>
                    <Form onSubmit={onSubmit}>
                        <InputForm label={"Nom"} type={"text"} nom={"nom"} onChange={onNomChange} />
                        <InputForm label={"Description"} type={"text"} nom={"description"} onChange={onDescriptionChange} />
                        <SelectCustom items={categories} onChange={onCategorieParentChange} label="Sélectionnez une catégorie"/>
                        <FormBouton type={"submit"} label={"Créer"} />
                    </Form>
                </Content>
            </Header>
        </>
    )
}

export async function getServerSideProps() {

    let categories = []
    let errors = []

    await axios.get(process.env.URL + '/api/categories')
        .then(res => {
            categories = res.data.data
        })
        .catch((error) => {
            errors = JSON.stringify(error)
        })


    return {
        props: {categories, errors}
    }
}
