import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '../../../../components/Header/header.component';
import Content from '../../../../components/Content/content.component';
import axios from 'axios';
import { Button, Card, Form, Input, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { ActionBoutonNoLink } from '../../../../components/Bouton/ActionBouton';

export default function Modifier({ item }) {
    const url = 'attributs';

    const [form, setForm] = useState({ _id: item._id, nom: item.nom, valeurs: item.valeurs, filtre: item.filtre, newValeurs: [], deleteValeurs: [] });
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
    }, [errors]);

    const update = async () => {
        try {
            const res = await fetch(`${process.env.URL}/api/${url}/${form._id}`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });
            const { data: updateItem } = await res.json();
            router.push(`/admin/${url}`);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let errs = validate();
        setErrors(errs);
        setIsSubmitting(true);
    };

    const validate = () => {
        let err = {};

        if (!form.nom) {
            err.nom = 'Ce champ est requis';
        }

        return err;
    };

    const handleChange = (e, data) => {
        setForm({
            ...form,
            [data.name]: data.value ? data.value : data.checked,
        });
    };

    const handleAddValeur = function () {
        setForm({
            ...form,
            newValeurs: [...form.newValeurs, { _id: 'new-' + new Date().getTime(), nom: '', attribut: null }],
        });
    };

    return (
        <>
            <Head>
                <title>Modifier l'attribut {item.nom}</title>
            </Head>
            <Header>
                <Content title='Attributs' icon='fa-cubes' url={url} action={'modifier'}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Input
                            fluid
                            error={errors.nom ? { content: 'Ce champ est requis', pointing: 'below' } : null}
                            label='Nom'
                            placeholder='Nom'
                            name='nom'
                            defaultValue={item.nom}
                            onChange={handleChange}
                        />
                        <Form.Checkbox
                            label="Utiliser l'attribut comme filtre de recherche produit"
                            name='filtre'
                            defaultChecked={item.filtre}
                            onChange={handleChange}
                        />
                        {form.valeurs.map((item) => (
                            <Valeur key={item._id} item={item} setForm={setForm} form={form} />
                        ))}
                        {form.newValeurs.map((item) => (
                            <Valeur key={item._id} item={item} setForm={setForm} form={form} type='newValeurs' />
                        ))}
                        <Button type='button' color='teal' onClick={handleAddValeur}>
                            Ajouter une valeur
                        </Button>
                        <Button type='submit'>Modifier</Button>
                    </Form>
                </Content>
            </Header>
        </>
    );
}

const Valeur = function ({ item, form, setForm, type = 'valeurs' }) {
    const handleChange = (e, data) => {
        item = { ...item, [data.name]: data.value ? data.value : data.checked };

        switch (type) {
            case 'valeurs':
                setForm({ ...form, valeurs: form.valeurs.map((i) => (i._id === item._id ? item : i)) });
                break;
            case 'newValeurs':
                setForm({ ...form, newValeurs: form.newValeurs.map((i) => (i._id === item._id ? item : i)) });
                break;
        }
    };

    const handleDelete = function () {
        switch (type) {
            case 'valeurs':
                setForm({ ...form, deleteValeurs: [...form.deleteValeurs, item], valeurs: form.valeurs.filter((i) => i._id !== item._id) });
                break;
            case 'newValeurs':
                setForm({ ...form, newValeurs: form.newValeurs.filter((i) => i._id !== item._id) });
                break;
        }
    };

    return (
        <Card fluid color='teal'>
            <Card.Content header={item.nom} />
            <Card.Content>
                <Input fluid label='Nom' placeholder='Nom' name='nom' defaultValue={item.nom} onChange={handleChange} />
            </Card.Content>
            <Card.Content extra>
                <ActionBoutonNoLink type='button' style={'supprimer'} icon={'fa-trash'} onClick={handleDelete} />
            </Card.Content>
        </Card>
    );
};

export async function getServerSideProps({ params }) {
    const { id } = params;

    let item = {};

    await axios
        .get(process.env.URL + '/api/attributs/' + id)
        .then((res) => {
            item = res.data.data;
        })
        .catch((error) => {});

    return {
        props: { item },
    };
}
