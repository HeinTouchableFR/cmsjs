import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Button, Form } from 'semantic-ui-react';
import nookies from 'nookies';
import { auth } from 'utils/dbConnect';
import {useIntl} from 'react-intl';
import Card from 'components/Cards/Card/Card';
import Admin from 'container/Admin/Admin';

export default function Modifier({ item, categories }) {
    const intl = useIntl();
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

    const categoriesOptions = [{ key: 'empty', value: '', text: intl.formatMessage({ id: 'no.parent.category', defaultMessage: 'No parent category' }) }];

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
                <title>{intl.formatMessage({ id: 'edit.category', defaultMessage: 'Edit Category' })} {item.name}</title>
            </Head>
            <Admin>
                <Card title={`${intl.formatMessage({ id: 'edit.category', defaultMessage: 'Edit Category' })} ${item.name}`} buttonLabel={intl.formatMessage({ id: 'back', defaultMessage: 'Back' })} buttonAction={`/admin/${url}`} buttonIcon={"las la-arrow-left"}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Input
                            fluid
                            label={intl.formatMessage({ id: 'name', defaultMessage: 'Name' })}
                            placeholder={intl.formatMessage({ id: 'name', defaultMessage: 'Name' })}
                            name='name'
                            defaultValue={item.name}
                            onChange={handleChange}
                            required
                        />
                        <Form.TextArea
                            label={intl.formatMessage({ id: 'description', defaultMessage: 'Description' })}
                            placeholder={intl.formatMessage({ id: 'description', defaultMessage: 'Description' })}
                            name='description'
                            defaultValue={item.description}
                            onChange={handleChange}
                        />
                        <Form.Dropdown
                            placeholder={intl.formatMessage({ id: 'choose.parent.category', defaultMessage: 'Choose a parent category' })}
                            fluid
                            search
                            clearable
                            selection
                            options={categoriesOptions}
                            defaultValue={item.parentCategory}
                            name='parentCategory'
                            onChange={handleChange}
                        />
                        <Button type='submit'>{intl.formatMessage({ id: 'edit', defaultMessage: 'Edit' })}</Button>
                    </Form>
                </Card>
            </Admin>
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
