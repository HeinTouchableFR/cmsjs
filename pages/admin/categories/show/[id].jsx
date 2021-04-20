import React from 'react';
import Head from 'next/head';
import axios from 'axios';
import nookies from 'nookies';
import { auth } from 'utils/dbConnect';
import { useIntl } from 'react-intl';
import Admin from 'container/Admin/Admin';
import Card from 'components/Cards/Card/Card';
import Input from 'components/Form/Input/Input';
import Dropdown from 'components/Form/Dropdown/Dropdown';
import TextArea from 'components/Form/TextArea/TextArea';

export default function Detail({item, categories}) {
    const intl = useIntl();
    const url = 'categories';

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
                        id: 'category.detail', defaultMessage: 'Detail of the {name} category',
                    }, {
                        name: item.name,
                    })}
                </title>
            </Head>
            <Admin>
                <Card
                    color='orange'
                >
                    <Card.Header
                        title={intl.formatMessage({
                            id: 'category.detail', defaultMessage: 'Detail of the {name} category',
                        }, {
                            name: item.name,
                        })}
                        buttonLabel={intl.formatMessage({
                            id: 'back', defaultMessage: 'Back',
                        })}
                        buttonAction={`/admin/${url}`}
                        buttonIcon='las la-arrow-left'
                    />
                    <Card.Body>
                        <form>
                            <Input
                                label={intl.formatMessage({
                                    id: 'name', defaultMessage: 'Name',
                                })}
                                placeholder={intl.formatMessage({
                                    id: 'name', defaultMessage: 'Name',
                                })}
                                name='name'
                                disabled
                                defaultValue={item.name}
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
                                disabled
                                defaultValue={item.description}
                            />
                            <Dropdown
                                options={categoriesOptions}
                                disabled
                                defaultValue={item.parentCategory}
                                name='parentCategory'
                                searchable
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
            throw new Error('unauthorized');
        }

        const {id} = ctx.params;

        let item = {};

        await axios
            .get(`${process.env.URL}/api/categories/${id}`)
            .then((res) => {
                item = res.data.data;
            })
            .catch((error) => {
            });

        let categories = [];

        await axios
            .get(`${process.env.URL}/api/categories/`)
            .then((res) => {
                categories = res.data.data;
            })
            .catch((error) => {
                console.log(error);
            });

        return {
            props: {
                item, categories,
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
