import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Button, Form } from 'semantic-ui-react';
import nookies from 'nookies';

import { auth } from 'utils/dbConnect';
import Header from 'components/Header/Header';
import Content from 'components/Content/Content';

export default function Modifier({ item, categories }) {
    const url = 'categories';

    const [form, setForm] = useState({
        name: item.name,
        description: item.description,
        parentCategory: item.parentCategory,
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
    }, [errors]);

    const update = async () => {
        try {
            const res = await fetch(`${process.env.URL}/api/${url}/${item._id}`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });
            await res.json();
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

        if (!form.name) {
            err.name = 'This field is required';
        }

        return err;
    };

    const handleChange = (e, data) => {
        setForm({
            ...form,
            [data.name]: data.value ? data.value : null,
        });
    };

    const categoriesOptions = [{ key: 'empty', value: '', text: 'No parent category' }];

    const recursiveCategoriesOptions = function (category, dash = '', parent) {
        if (category._id !== item._id) {
            if (parent) {
                dash += ' — ';
            }
            categoriesOptions.push({ key: category._id, value: category._id, text: (parent ? dash : '') + category.name });

            if (category.childCategoriesData) {
                category.childCategoriesData.map((child) => recursiveCategoriesOptions(child, dash, category));
            }
        }
    };

    categories.map((category) => recursiveCategoriesOptions(category));

    return (
        <>
            <Head>
                <title>Edit Category {item.name}</title>
            </Head>
            <Header>
                <Content title='Categories' icon='fa-folder' url={url} action={'edit'}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Input
                            fluid
                            error={errors.name ? { content: 'This field is required', pointing: 'below' } : null}
                            label='Name'
                            placeholder='Name'
                            name='name'
                            defaultValue={item.name}
                            onChange={handleChange}
                            required
                        />
                        <Form.TextArea
                            label='Description'
                            placeholder='Description'
                            name='description'
                            defaultValue={item.description}
                            onChange={handleChange}
                        />
                        <Form.Dropdown
                            placeholder='Choose a parent category'
                            fluid
                            search
                            clearable
                            selection
                            options={categoriesOptions}
                            defaultValue={item.parentCategory}
                            name='parentCategory'
                            onChange={handleChange}
                        />
                        <Button type='submit'>Edit</Button>
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
