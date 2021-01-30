import React, {useState, useEffect} from "react";
import Head from "next/head";
import Header from "../../../components/Header/header.component";
import Content from "../../../components/Content/content.component";
import {useRouter} from 'next/router';
import {Button, Card, Form, Input, Loader} from 'semantic-ui-react';
import {ActionBoutonNoLink} from "../../../components/Bouton/ActionBouton";

export default function Ajouter() {

    const url = "attributs"

    const [form, setForm] = useState({nom: '', valeurs: [], filtre: false});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                create();
            } else {
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

    const handleAddValeur = function () {
        setForm({
            ...form,
            valeurs: [...form.valeurs, {_id: 'new-' + new Date().getTime(),nom: '', attribut:  null}]
        })
    }

    return (
        <>
            <Head>
                <title>Ajouter un attribut</title>
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
                            onChange={handleChange}
                        />
                        <Form.Checkbox
                            label="Utiliser l'attribut comme filtre de recherche produit"
                            name='filtre'
                            onChange={handleChange}
                        />
                        {form.valeurs.map(item => <Valeur key={item._id} item={item} setForm={setForm} form={form}/>)}
                        <Button type="button" color="teal" onClick={handleAddValeur}>Ajouter une valeur</Button>
                        <Button type='submit'>Créer</Button>
                    </Form>
                </Content>
            </Header>
        </>
    )
}

const Valeur = function ({item, form, setForm}) {
    const handleChange = (e, data) => {
        item = {...item,
            [data.name]: data.value ? data.value : data.checked}

            setForm({...form, valeurs: form.valeurs.map(i => i._id === item._id ? item : i) })

    }

    const handleDelete = function () {
        setForm({...form, valeurs: form.valeurs.filter(i => i._id !== item._id ) })
    }

    return <Card
                fluid
                color='teal'
            >
        <Card.Content header={item.nom}/>
        <Card.Content>
            <Input
                fluid
                label='Nom'
                placeholder='Nom'
                name='nom'
                onChange={handleChange}
            />
        </Card.Content>
        <Card.Content extra>
            <ActionBoutonNoLink type="button" style={"supprimer"} icon={"fa-trash"}  onClick={handleDelete}/>
        </Card.Content>
    </Card>
}
