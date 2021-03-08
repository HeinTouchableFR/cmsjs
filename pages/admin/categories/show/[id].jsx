import React from 'react';
import Head from 'next/head';
import axios from 'axios';
import { Form } from 'semantic-ui-react';
import nookies from 'nookies';

import { auth } from 'utils/dbConnect';
import Header from 'components/Header/Header';
import Content from 'components/Content/Content';

export default function Detail({ item, errors, categories }) {
    const url = 'categories';

    const categoriesOptions = [];

    const recursiveCategoriesOptions = function (category, dash = '', parent) {
        if (parent) {
            dash += ' — ';
        }
        categoriesOptions.push({ key: category._id, value: category._id, text: (parent ? dash : '') + category.name });

        if (category.childCategoriesData) {
            category.childCategoriesData.map((child) => recursiveCategoriesOptions(child, dash, category));
        }
    };

    categories.map((category) => recursiveCategoriesOptions(category));

    return (
        <>
            <Head>
                <title>Detail of the {item.name} category</title>
            </Head>
            <Header>
                <Content title='Categories' icon='fa-folder' url={url} action={'show'}>
                    <Form>
                        <Form.Input fluid label='Name' placeholder='Name' name='name' disabled defaultValue={item.name} required />
                        <Form.TextArea label='Description' placeholder='Description' name='description' disabled defaultValue={item.description} />
                        <Form.Dropdown
                            fluid
                            search
                            clearable
                            selection
                            options={categoriesOptions}
                            disabled
                            defaultValue={item.parentCategory}
                            name='parentCategory'
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
        const token = await auth.verifyIdToken(cookies.token);

        if (!token.roles.some((r) => ['admin', 'editor', 'moderator'].includes(r))) {
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
                destination: '/admin/login',
            },
            props: {},
        };
    }
}
