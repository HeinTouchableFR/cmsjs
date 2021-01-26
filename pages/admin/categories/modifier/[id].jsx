import React, {useState} from "react";
import Head from "next/head";
import Header from "../../../../components/Header/header.component";
import Content from "../../../../components/Content/content.component";
import Form from "../../../../components/Formulaire/Form";
import InputForm from "../../../../components/Input/Input";
import FormBouton from "../../../../components/Bouton/FormBouton";
import axios from "axios";
import Router from "next/router";
import SelectCustom from "../../../../components/Select/Select";

export default function CategorieModifier({item, errors, categories}) {

    const url = "categories"

    const [nom, setNom] = useState(item.nom)
    const [description, setDescription] = useState(item.description)
    const [categorieParent, setCategorieParent] = useState(item.categorieParent)
    const [categoriesEnfant, setCategoriesEnfant] = useState(item.categoriesEnfant)
    const [ancienneCategorie, setAncienneCategorie] = useState(null)

    async function onSubmit(e) {
        e.preventDefault()

        const CategorieObject = {
            nom: nom,
            description: description,
            categorieParent: categorieParent,
            categoriesEnfant: categoriesEnfant
        };

        const headers = new Headers()
        headers.append('Accept', 'application/json')

       await axios.put(process.env.URL + '/api/'+ url +'/' + item._id, CategorieObject)
            .then(res => Router.push("/admin/" + url));

        if(categorieParent){
            let categorieP = []

            await axios.get(process.env.URL + '/api/'+ url +'/' + categorieParent._id)
                .then(res => {
                    categorieP = res.data.data
                })
                .catch((error) => {
                    errors = JSON.stringify(error)
                })

            categorieP.categoriesEnfant.push(item._id)

            await axios.put(process.env.URL + '/api/'+ url +'/' + categorieP._id, categorieP)
                .then(res => Router.push("/admin/" + url));
        }
        if(ancienneCategorie){
            let categorieA = []
            await axios.get(process.env.URL + '/api/'+ url +'/' + ancienneCategorie)
                .then(res => {
                    categorieA = res.data.data
                })
                .catch((error) => {
                    errors = JSON.stringify(error)
                })

            categorieA.categoriesEnfant = categorieA.categoriesEnfant.filter(i => i !== item._id)

            await axios.put(process.env.URL + '/api/'+ url +'/' + categorieA._id, categorieA)
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
        if(categorieParent && e !== item.categorieParent){
            setAncienneCategorie(item.categorieParent)
        }
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
                        <InputForm label={"Nom"} type={"text"} nom={"nom"} valeur={item.nom} onChange={onNomChange} />
                        <InputForm label={"Description"} type={"text"} valeur={item.description} nom={"description"} onChange={onDescriptionChange} />
                        <SelectCustom item={item} items={categories} onChange={onCategorieParentChange} label="Sélectionnez une catégorie"/>
                        <FormBouton type={"submit"} label={"Modifier"} />
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
