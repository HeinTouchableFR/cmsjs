import React, {
    useState, useEffect,
} from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import nookies from 'nookies';
import { auth } from 'utils/dbConnect';
import { useIntl } from 'react-intl';
import Admin from 'container/Admin/Admin';
import Card from 'components/Cards/Card/Card';
import Input from 'components/Form/Input/Input';
import Dropdown from 'components/Form/Dropdown/Dropdown';
import TextArea from 'components/Form/TextArea/TextArea';
import Button from 'components/Button/Button';

export default function Add({categories}) {
    const intl = useIntl();
    const url = 'categories';

    const [form, setForm] = useState({
        name: '', description: '', parentCategory: null,
    });
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
        const errs = validate();
        setErrors(errs);
        setIsSubmitting(true);
    };

    const validate = () => {
        const err = {};

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

    const categoriesOptions = [];

    const recursiveCategoriesOptions = (category, dash = '', parent) => {
        if (parent) {
            dash += ' — ';
        }
        categoriesOptions.push({
            key: category._id, value: category._id, text: (parent ? dash : '') + category.name,
        });

        if (category.childCategoriesData) {
            category.childCategoriesData.map((child) => recursiveCategoriesOptions(child, dash, category));
        }
    };

    categories.map((category) => recursiveCategoriesOptions(category));

    return (
        <>
            <Head>
                <title>
                    {intl.formatMessage({
                        id: 'add.new.category', defaultMessage: 'Add a new category',
                    })}
                </title>
            </Head>
            <Admin>
                <Card
                    color='orange'
                >
                    <Card.Header
                        title={intl.formatMessage({
                            id: 'add.new.category', defaultMessage: 'Add a new category',
                        })}
                        buttonLabel={intl.formatMessage({
                            id: 'back', defaultMessage: 'Back',
                        })}
                        buttonAction={`/admin/${url}`}
                        buttonIcon='las la-arrow-left'
                    />
                    <Card.Body>
                        <form onSubmit={handleSubmit}>
                            <Input
                                label={intl.formatMessage({
                                    id: 'name', defaultMessage: 'Name',
                                })}
                                placeholder={intl.formatMessage({
                                    id: 'name', defaultMessage: 'Name',
                                })}
                                name='name'
                                onChange={handleChange}
                                required
                            />
                            <TextArea
                                label={intl.formatMessage({
                                    id: 'description', defaultMessage: 'Description',
                                })}
                                placeholder={intl.formatMessage({
                                    id: 'description', defaultMessage: 'Description',
                                })}
                                name='description'
                                onChange={handleChange}
                            />
                            <Dropdown
                                label={intl.formatMessage({
                                    id: 'choose.parent.category', defaultMessage: 'Choose a parent category',
                                })}
                                options={categoriesOptions}
                                name='parentCategory'
                                onChange={handleChange}
                                searchable
                            />
                            <Button
                                label={intl.formatMessage({
                                    id: 'add', defaultMessage: 'Add',
                                })}
                                disabled={isSubmitting}
                                loading={isSubmitting}
                                type='submit'
                            />
                        </form>
                    </Card.Body>
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
            console.log('test');
            throw new Error('unauthorized');
        }

        let categories = [];

        await axios
            .get(`${process.env.URL}/api/categories`)
            .then((res) => {
                categories = res.data.data;
            })
            .catch((error) => {
            });

        return {
            props: {
                categories,
            },
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
