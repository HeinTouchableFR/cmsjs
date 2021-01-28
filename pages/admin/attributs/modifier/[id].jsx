import React, {useEffect, useState} from "react";
import Head from "next/head";
import Header from "../../../../components/Header/header.component";
import Content from "../../../../components/Content/content.component";
import axios from "axios";
import {Button, Form, Loader} from 'semantic-ui-react';
import {useRouter} from 'next/router';

export default function Modifier({item, categories}) {

    const url = "attributs"

    const [form, setForm] = useState({
        nom: item.nom,
        description: item.description,
        categorieParent: item.categorieParent
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                update();
            } else {
                setIsSubmitting(false);
            }
        }
    }, [errors])

    const update = async () => {
        try {
            const res = await fetch(`${process.env.URL}/api/${url}/${item._id}`, {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })
            if (form.categorieParent !== item.categorieParent) {
                //Ancienne
                if (item.categorieParent) {
                    const response = await fetch(`${process.env.URL}/api/${url}/${item.categorieParent}`);
                    const {data: oldCategorieParent} = await response.json();

                    oldCategorieParent.categoriesEnfant = oldCategorieParent.categoriesEnfant.filter(i => i !== item._id)

                    const res = await fetch(`${process.env.URL}/api/${url}/${oldCategorieParent._id}`, {
                        method: 'PUT',
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(oldCategorieParent)
                    })
                }
                if(form.categorieParent){
                    //Nouvelle
                    const response = await fetch(`${process.env.URL}/api/${url}/${form.categorieParent}`);
                    const { data: newcategorieParent } = await response.json();

                    newcategorieParent.categoriesEnfant.push(item._id)

                    const res = await fetch(`${process.env.URL}/api/${url}/${newcategorieParent._id}`, {
                        method: 'PUT',
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(newcategorieParent)
                    })
                }
            }


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
            [data.name]: data.value ? data.value : null
        })
    }

    const categoriesOptions = []

    categories.map(categorie => categoriesOptions.push({key: categorie._id, value: categorie._id, text: categorie.nom}))

    return (
        <>
            <Head>
                <title>Modifier l'attribut {item.nom}</title>
            </Head>
            <Header>
                <Content titre="Attributs" icon="fa-cubes" url={url} action={"ajouter"}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Input
                            fluid
                            error={errors.nom ? {content: 'Ce champ est requis', pointing: 'below'} : null}
                            label='Nom'
                            placeholder='Nom'
                            name='nom'
                            defaultValue={item.nom}
                            onChange={handleChange}
                        />
                        <Form.TextArea
                            label='Description'
                            placeholder='Description'
                            name='description'
                            defaultValue={item.description}
                            error={errors.description ? {content: 'Ce champ est requis', pointing: 'below'} : null}
                            onChange={handleChange}
                        />
                        <Form.Dropdown
                            placeholder='Choisir une catégorie parent'
                            fluid
                            search
                            clearable
                            selection
                            options={categoriesOptions}
                            defaultValue={item.categorieParent}
                            name='categorieParent'
                            onChange={handleChange}
                        />
                        <Button type='submit'>Modifier</Button>
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
