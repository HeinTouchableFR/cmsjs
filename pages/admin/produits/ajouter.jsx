import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from 'components/Header/Header';
import Content from 'components/Content/Content';
import { useRouter } from 'next/router';
import { Button, Form } from 'semantic-ui-react';
import axios from 'axios';
import { Uploader } from 'rsuite';

var FormData = require('form-data');

export default function Ajouter({ categories }) {
    const url = 'produits';

    const [form, setForm] = useState({
        nom: '',
        description: '',
        enVente: false,
        prix: 0,
        prixPromo: null,
        largeur: null,
        longueur: null,
        hauteur: null,
        poids: null,
        categories: [],
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    const [data, setData] = useState(null);

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                create();
            } else {
                setIsSubmitting(false);
            }
        }
    }, [errors]);

    const create = async () => {
        try {
            data.append('categories', JSON.stringify(form.categories));
            data.append('produitEnVente', form.enVente ? 'true' : 'false');
            const res = await fetch(`${process.env.URL}/api/${url}/post`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                },
                body: data,
            });
            router.push(`/admin/${url}`);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let errs = validate();
        let f = new FormData(e.target);
        setData(f);
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

    const categoriesOptions = [];

    categories.map((categorie) => categoriesOptions.push({ key: categorie._id, value: categorie._id, text: categorie.nom }));

    return (
        <>
            <Head>
                <title>Ajouter un produit</title>
            </Head>
            <Header>
                <Content title='Products' icon='fa-cubes' url={url} action={'ajouter'}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Input
                            fluid
                            error={errors.nom ? { content: 'Ce champ est requis', pointing: 'below' } : null}
                            label='Nom'
                            placeholder='Nom'
                            onChange={handleChange}
                            name='nom'
                        />
                        <Form.Input
                            fluid
                            error={errors.prix ? { content: 'Ce champ est requis', pointing: 'below' } : null}
                            label='Prix'
                            placeholder='Prix'
                            name='prix'
                            type='number'
                            onChange={handleChange}
                            step='0.01'
                        />
                        <Form.Input
                            fluid
                            label='Prix en promo'
                            placeholder='Prix'
                            name='prixPromo'
                            type='number'
                            onChange={handleChange}
                            step='0.01'
                        />
                        <Form.TextArea label='Description' placeholder='Description' onChange={handleChange} name='description' />
                        <Form.Checkbox label='Produit en vente' onChange={handleChange} name='enVente' />
                        <Form.Input
                            fluid
                            label='Longueur (cm)'
                            placeholder='Longueur'
                            name='longueur'
                            type='number'
                            onChange={handleChange}
                            step='0.01'
                        />
                        <Form.Input
                            fluid
                            label='Largeur (cm)'
                            placeholder='Largeur'
                            name='largeur'
                            onChange={handleChange}
                            type='number'
                            step='0.01'
                        />
                        <Form.Input
                            fluid
                            label='Hauteur (cm)'
                            placeholder='Hauteur'
                            name='hauteur'
                            onChange={handleChange}
                            type='number'
                            step='0.01'
                        />
                        <Form.Input fluid label='Poids (Kg)' placeholder='Poids' name='poids' onChange={handleChange} type='number' step='0.001' />
                        <div className='field'>
                            <label>Image en avant</label>
                            <Uploader draggable autoUpload={false} name='imageEnAvant' multiple={false} listType='picture-text'>
                                <div style={{ lineHeight: '200px' }}>Cliquez ou faites glisser les fichiers vers cette zone pour les télécharger</div>
                            </Uploader>
                        </div>
                        <div className='field'>
                            <label>Galerie d'image</label>
                            <Uploader draggable autoUpload={false} name='galerieImage' multiple={true} listType='picture-text'>
                                <div style={{ lineHeight: '200px' }}>Cliquez ou faites glisser les fichiers vers cette zone pour les télécharger</div>
                            </Uploader>
                        </div>
                        <Form.Dropdown
                            placeholder='Catégories'
                            fluid
                            search
                            clearable
                            selection
                            multiple
                            options={categoriesOptions}
                            name='categories'
                            onChange={handleChange}
                        />
                        <Button type='submit'>Créer</Button>
                    </Form>
                </Content>
            </Header>
        </>
    );
}

export async function getServerSideProps() {
    let categories = [];

    await axios
        .get(process.env.URL + '/api/categories')
        .then((res) => {
            categories = res.data.data;
        })
        .catch(() => {});

    return {
        props: { categories },
    };
}
