import React, {useState, useEffect} from "react";
import Head from "next/head";
import Header from "../../../components/Header/header.component";
import Content from "../../../components/Content/content.component";
import { useRouter } from 'next/router';
import axios from "axios";
import SelectCustom from "../../../components/Select/Select";
import { Button, Form, Loader } from 'semantic-ui-react';

export default function Ajouter({categories}) {

    const url = "categories"

    const [form, setForm] = useState({ nom: '', description: '', categorieParent: null });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                create();
            }
            else {
                setIsSubmitting(false);
            }
        }
    }, [errors])

    const create = async () => {
        try {
            const res = await fetch(`${process.env.URL}/api/${url}`, {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })
            const {data: newItem} = await res.json()

            router.push(`/admin/${url}`);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let errs = validate();
        setErrors(errs);
        setIsSubmitting(true);
    }

    const validate = () => {
        let err = {};

        if (!form.nom) {
            err.nom = 'Ce champ est requis';
        }

        return err;
    }

    const handleChange = (e, data) => {
        setForm({
            ...form,
            [data.name]: data.value ? data.value : data.checked
        })
    }

    const categoriesOptions = []

    const recursiveCategoriesOptions = function(categorie, tiret = "", parent){
        console.log(categorie)
        if (parent) {
            tiret += " — "
        }
        categoriesOptions.push({ key: categorie._id, value: categorie._id, text: (parent ? tiret : '') + categorie.nom })

        if(categorie.categoriesEnfantData){
            categorie.categoriesEnfantData.map(enfant => recursiveCategoriesOptions(enfant, tiret, categorie))
        }
    }

    categories.map(categorie => recursiveCategoriesOptions(categorie))

    return (
        <>
            <Head>
                <title>Ajouter une catégorie</title>
            </Head>
            <Header>
                <Content titre="Catégories" icon="fa-folder" url={url} action={"ajouter"}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Input
                            fluid
                            error={errors.nom ? { content: 'Ce champ est requis', pointing: 'below' } : null}
                            label='Nom'
                            placeholder='Nom'
                            name='nom'
                            onChange={handleChange}
                        />
                        <Form.TextArea
                            label='Description'
                            placeholder='Description'
                            name='description'
                            error={errors.description ? { content: 'Ce champ est requis', pointing: 'below' } : null}
                            onChange={handleChange}
                        />
                        <Form.Dropdown
                            placeholder='Choisir une catégorie parent'
                            fluid
                            search
                            clearable
                            selection
                            options={categoriesOptions}
                            name='categorieParent'
                            onChange={handleChange}
                        />
                        <Button type='submit'>Créer</Button>
                    </Form>
                </Content>
            </Header>
        </>
    )
}

export async function getServerSideProps() {

    let categories = []

    await axios.get(process.env.URL + '/api/categories')
        .then(res => {
            categories = res.data.data
        })
        .catch((error) => {
        })


    return {
        props: {categories}
    }
}
