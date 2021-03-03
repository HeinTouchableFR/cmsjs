import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from 'components/Header/Header';
import Content from 'components/Content/Content';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Button, Form } from 'semantic-ui-react';
import nookies from 'nookies';
import { admin } from 'utils/dbConnect';

export default function Add({ categories }) {
    const url = 'categories';

    const [form, setForm] = useState({ name: '', description: '', parentCategory: null });
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
    }, [errors]);

    const create = async () => {
        try {
            const res = await fetch(`${process.env.URL}/api/${url}`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });
            await res.json();
            setIsSubmitting(false);
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
            [data.name]: data.value ? data.value : data.checked,
        });
    };

    const categoriesOptions = [{ key: 'empty', value: '', text: 'No parent category' }];

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
                <title>Add a category</title>
            </Head>
            <Header>
                <Content title='Categories' icon='fa-folder' url={url} action={'add'}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Input
                            fluid
                            error={errors.name ? { content: 'This field is required', pointing: 'below' } : null}
                            label='Name'
                            placeholder='Name'
                            name='name'
                            onChange={handleChange}
                            required
                        />
                        <Form.TextArea label='Description' placeholder='Description' name='description' onChange={handleChange} />
                        <Form.Dropdown
                            placeholder='Choose a parent category'
                            fluid
                            search
                            clearable
                            selection
                            options={categoriesOptions}
                            name='parentCategory'
                            onChange={handleChange}
                        />
                        <Button disabled={isSubmitting} loading={isSubmitting} type='submit'>
                            Add
                        </Button>
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

        if (!token.roles.some((r) => ['admin', 'editor', 'moderator'].includes(r))) {
            throw new Error('unauthorized');
        }

        let categories = [];

        await axios
            .get(process.env.URL + '/api/categories')
            .then((res) => {
                categories = res.data.data;
            })
            .catch((error) => {});

        return {
            props: { categories },
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
