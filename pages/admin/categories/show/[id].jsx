import React from 'react';
import Head from 'next/head';
import Header from 'components/Header/Header';
import Content from 'components/Content/Content';
import axios from 'axios';
import { Form } from 'semantic-ui-react';
import nookies from 'nookies';
import {admin} from '../../../../utils/dbConnect';

export default function Detail({ item, errors, categories }) {
    const url = 'categories';

    const categoriesOptions = [];

    const recursiveCategoriesOptions = function (categorie, tiret = '', parent) {
        console.log(categorie);
        if (parent) {
            tiret += ' — ';
        }
        categoriesOptions.push({ key: categorie._id, value: categorie._id, text: (parent ? tiret : '') + categorie.nom });

        if (categorie.categoriesEnfantData) {
            categorie.categoriesEnfantData.map((enfant) => recursiveCategoriesOptions(enfant, tiret, categorie));
        }
    };

    categories.map((categorie) => recursiveCategoriesOptions(categorie));

    return (
        <>
            <Head>
                <title>Détail de la catégorie {item.nom}</title>
            </Head>
            <Header>
                <Content title='Catégories' icon='fa-folder' url={url}>
                    <Form>
                        <Form.Input fluid label='Nom' placeholder='Nom' name='nom' disabled defaultValue={item.nom} />
                        <Form.TextArea label='Description' placeholder='Description' name='description' disabled defaultValue={item.description} />
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
    );
}

export async function getServerSideProps(ctx) {
    try {
        const cookies = nookies.get(ctx);
        const token = await admin.auth().verifyIdToken(cookies.token);

        if(!token.roles.some(r=> ["admin", "editor", "moderator"].includes(r))){
            throw new Error('unauthorized');
        }

        const { id } = ctx.params;

        let item = {};
        let errors = [];

        await axios
            .get(process.env.URL + '/api/categories/' + id)
            .then((res) => {
                item = res.data.data;
            })
            .catch((error) => {
                errors = JSON.stringify(error);
            });

        let categories = [];

        await axios
            .get(process.env.URL + '/api/categories/')
            .then((res) => {
                categories = res.data.data;
            })
            .catch((error) => {
                console.log(error);
            });

        return {
            props: { item, errors, categories },
        };
    } catch (err) {
        return {
            redirect: {
                permanent: false,
                destination: "/admin/login",
            },
            props: {},
        };
    }
}
