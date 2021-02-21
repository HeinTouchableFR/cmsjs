import React from 'react';
import Head from 'next/head';
import Header from '../../../../components/Header/header.component';
import Content from '../../../../components/Content/content.component';
import axios from 'axios';
import { Form } from 'semantic-ui-react';

export default function Detail({ item, categories }) {
    const url = 'produits';

    const categoriesOptions = [];

    categories.map((categorie) => categoriesOptions.push({ key: categorie._id, value: categorie._id, text: categorie.nom }));

    return (
        <>
            <Head>
                <title>Détail de l'attribut {item.nom}</title>
            </Head>
            <Header>
                <Content title='Produits' icon='fa-cubes' url={url}>
                    <Form>
                        <Form.Input fluid label='Nom' placeholder='Nom' name='nom' disabled defaultValue={item.nom} />
                        <Form.Input fluid label='Prix' placeholder='Prix' name='prix' type='number' step='0.01' disabled defaultValue={item.prix} />
                        <Form.Input
                            fluid
                            label='Prix en promo'
                            placeholder='Prix'
                            name='prixPromo'
                            type='number'
                            step='0.01'
                            disabled
                            defaultValue={item.prixPromo}
                        />
                        <Form.TextArea label='Description' placeholder='Description' name='description' disabled defaultValue={item.description} />
                        <Form.Checkbox label='Produit en vente' name='enVente' disabled defaultChecked={item.enVente} />
                        <Form.Input
                            fluid
                            label='Longueur (cm)'
                            placeholder='Longueur'
                            name='longueur'
                            type='number'
                            step='0.01'
                            disabled
                            defaultValue={item.longueur}
                        />
                        <Form.Input
                            fluid
                            label='Largeur (cm)'
                            placeholder='Largeur'
                            name='largeur'
                            type='number'
                            step='0.01'
                            disabled
                            defaultValue={item.largeur}
                        />
                        <Form.Input
                            fluid
                            label='Hauteur (cm)'
                            placeholder='Hauteur'
                            name='hauteur'
                            type='number'
                            step='0.01'
                            disabled
                            defaultValue={item.hauteur}
                        />
                        <Form.Input
                            fluid
                            label='Poids (Kg)'
                            placeholder='Poids'
                            name='poids'
                            type='number'
                            step='0.001'
                            disabled
                            defaultValue={item.poids}
                        />
                        <div className='field'>
                            <label>Image en avant</label>
                            {item.imageEnAvant ? <img width={120} height={120} src={item.imageEnAvant.url} /> : <h4>Aucune image en avant</h4>}
                        </div>
                        <div className='field'>
                            <label>Galerie d'images</label>
                            {item.galerieImage ? (
                                <div className={'galerie'}>
                                    {item.galerieImage.map((image) => (
                                        <img width={120} height={120} src={image.url} alt={'Image ' + item.nom} />
                                    ))}
                                </div>
                            ) : (
                                <h4>Aucune images suplémentaires</h4>
                            )}
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
                            disabled
                            defaultValue={item.categories}
                        />
                    </Form>
                </Content>
            </Header>
        </>
    );
}

export async function getServerSideProps({ params }) {
    const { id } = params;

    let item = {};

    await axios
        .get(process.env.URL + '/api/produits/' + id)
        .then((res) => {
            item = res.data.data;
        })
        .catch(() => {});

    let categories = [];

    await axios
        .get(process.env.URL + '/api/categories')
        .then((res) => {
            categories = res.data.data;
        })
        .catch(() => {});
    return {
        props: { item, categories },
    };
}
