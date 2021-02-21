import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '../../../../components/Header/Header';
import Content from '../../../../components/Content/Content';
import axios from 'axios';
import { Button, Card, Form, Input, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { ActionButtonNoLink } from '../../../../components/Button/ActionButton/ActionButton';
import { Uploader } from 'rsuite';

export default function Modifier({ item, categories }) {
    const url = 'produits';

    const [form, setForm] = useState({
        _id: item._id,
        nom: item.nom,
        description: item.description,
        enVente: item.enVente,
        prix: item.prix,
        prixPromo: item.prixPromo,
        largeur: item.largeur,
        longueur: item.longueur,
        hauteur: item.hauteur,
        poids: item.poids,
        categories: item.categories,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    const [data, setData] = useState(null);

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
            data.append('categories', JSON.stringify(form.categories));
            data.append('produitEnVente', form.enVente ? 'true' : 'false');
            const res = await fetch(`${process.env.URL}/api/${url}/post/${form._id}`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                },
                body: data,
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
                <title>Modifier le produit {item.nom}</title>
            </Head>
            <Header>
                <Content title='Products' icon='fa-cubes' url={url} action={'modifier'}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Input
                            fluid
                            error={errors.nom ? { content: 'Ce champ est requis', pointing: 'below' } : null}
                            label='Nom'
                            placeholder='Nom'
                            onChange={handleChange}
                            name='nom'
                            defaultValue={form.nom}
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
                            defaultValue={form.prix}
                        />
                        <Form.Input
                            fluid
                            label='Prix en promo'
                            placeholder='Prix'
                            name='prixPromo'
                            type='number'
                            onChange={handleChange}
                            step='0.01'
                            defaultValue={form.prixPromo}
                        />
                        <Form.TextArea
                            label='Description'
                            placeholder='Description'
                            onChange={handleChange}
                            name='description'
                            defaultValue={form.description}
                        />
                        <Form.Checkbox label='Produit en vente' onChange={handleChange} name='enVente' defaultChecked={form.enVente} />
                        <Form.Input
                            fluid
                            label='Longueur (cm)'
                            placeholder='Longueur'
                            name='longueur'
                            type='number'
                            onChange={handleChange}
                            step='0.01'
                            defaultValue={form.longueur}
                        />
                        <Form.Input
                            fluid
                            label='Largeur (cm)'
                            placeholder='Largeur'
                            name='largeur'
                            onChange={handleChange}
                            type='number'
                            step='0.01'
                            defaultValue={form.largeur}
                        />
                        <Form.Input
                            fluid
                            label='Hauteur (cm)'
                            placeholder='Hauteur'
                            name='hauteur'
                            onChange={handleChange}
                            type='number'
                            step='0.01'
                            defaultValue={form.hauteur}
                        />
                        <Form.Input
                            fluid
                            label='Poids (Kg)'
                            placeholder='Poids'
                            name='poids'
                            onChange={handleChange}
                            type='number'
                            step='0.001'
                            defaultValue={form.poids}
                        />
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
                            defaultValue={form.categories}
                        />
                        <Button type='submit'>Créer</Button>
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
                <ActionButtonNoLink type='button' style={'supprimer'} icon={'fa-trash'} onClick={handleDelete} />
            </Card.Content>
        </Card>
    );
};

export async function getServerSideProps({ params }) {
    const { id } = params;

    let item = {};

    await axios
        .get(process.env.URL + '/api/produits/' + id)
        .then((res) => {
            item = res.data.data;
        })
        .catch((error) => {});

    let categories = [];

    await axios
        .get(process.env.URL + '/api/categories')
        .then((res) => {
            categories = res.data.data;
        })
        .catch((error) => {});

    return {
        props: { item, categories },
    };
}
