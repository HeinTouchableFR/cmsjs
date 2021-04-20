import React from 'react';
import Head from 'next/head';
import axios from 'axios';
import { useIntl } from 'react-intl';
import nookies from 'nookies';
import { auth } from 'utils/dbConnect';
import Card from 'components/Cards/Card/Card';
import Admin from 'container/Admin/Admin';
import Input from 'components/Form/Input/Input';
import Dropdown from 'components/Form/Dropdown/Dropdown';
import TextArea from 'components/Form/TextArea/TextArea';
import Checkbox from 'components/Form/Checkbox/Checkbox';

export default function Detail({item, categories, attributes}) {
    const intl = useIntl();
    const url = 'products';

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
                        id: 'product.detail', defaultMessage: 'Detail of the product {name}',
                    }, {
                        name: item.name,
                    })}
                </title>
            </Head>
            <Admin>
                <Card
                    color='green'
                >
                    <Card.Header
                        title={intl.formatMessage({
                            id: 'product.detail', defaultMessage: 'Detail of the product {name}',
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
                                name='Name'
                                disabled
                                defaultValue={item.name}
                            />
                            <Input
                                label={intl.formatMessage({
                                    id: 'price', defaultMessage: 'Price',
                                })}
                                placeholder={intl.formatMessage({
                                    id: 'price', defaultMessage: 'Price',
                                })}
                                name='price'
                                type='number'
                                step='0.01'
                                disabled
                                defaultValue={item.price}
                            />
                            <Input
                                label={intl.formatMessage({
                                    id: 'price.special', defaultMessage: 'Special Price',
                                })}
                                placeholder={intl.formatMessage({
                                    id: 'price.special', defaultMessage: 'Special Price',
                                })}
                                name='specialPrice'
                                type='number'
                                step='0.01'
                                disabled
                                defaultValue={item.specialPrice}
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
                            <Checkbox
                                label={intl.formatMessage({
                                    id: 'on.sale', defaultMessage: 'On sale',
                                })}
                                name='onSale'
                                disabled
                                defaultChecked={item.onSale}
                            />
                            <Input
                                label={intl.formatMessage({
                                    id: 'length', defaultMessage: 'Length (cm)',
                                })}
                                placeholder={intl.formatMessage({
                                    id: 'length', defaultMessage: 'Length (cm)',
                                })}
                                name='length'
                                type='number'
                                step='0.01'
                                disabled
                                defaultValue={item.length}
                            />
                            <Input
                                label={intl.formatMessage({
                                    id: 'width', defaultMessage: 'Width (cm)',
                                })}
                                placeholder={intl.formatMessage({
                                    id: 'width', defaultMessage: 'Width (cm)',
                                })}
                                name='width'
                                type='number'
                                step='0.01'
                                disabled
                                defaultValue={item.width}
                            />
                            <Input
                                label={intl.formatMessage({
                                    id: 'height', defaultMessage: 'Height (cm)',
                                })}
                                placeholder={intl.formatMessage({
                                    id: 'height', defaultMessage: 'Height (cm)',
                                })}
                                name='height'
                                type='number'
                                step='0.01'
                                disabled
                                defaultValue={item.height}
                            />
                            <Input
                                label={intl.formatMessage({
                                    id: 'weight', defaultMessage: 'Weight (lb)',
                                })}
                                placeholder={intl.formatMessage({
                                    id: 'weight', defaultMessage: 'Weight (lb)',
                                })}
                                name='weight'
                                type='number'
                                step='0.001'
                                disabled
                                defaultValue={item.weight}
                            />
                            <div className='field'>
                                <label>
                                    {intl.formatMessage({
                                        id: 'product.image', defaultMessage: 'Product Image',
                                    })}
                                </label>
                                {item.productImage && (
                                    <img
                                        width={120}
                                        height={120}
                                        src={item.productImage.url}
                                    />
                                )}
                            </div>
                            <div className='field'>
                                <label>
                                    {intl.formatMessage({
                                        id: 'product.gallery', defaultMessage: 'Product Gallery',
                                    })}
                                </label>
                                {item.productGallery && (
                                    <div className='galerie'>
                                        {item.productGallery.map((image) => (
                                            <img
                                                width={120}
                                                height={120}
                                                src={image.url}
                                                alt={`Image ${item.name}`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                            <Dropdown
                                label={intl.formatMessage({
                                    id: 'categories', defaultMessage: 'Categories',
                                })}
                                placeholder={intl.formatMessage({
                                    id: 'choose.one.more.categories', defaultMessage: 'Choose one or more categories',
                                })}
                                multiple
                                options={categoriesOptions}
                                name='categories'
                                disabled
                                defaultValue={item.categories}
                                searchable
                            />
                            <div className='field'>
                                <label>
                                    {intl.formatMessage({
                                        id: 'attributes', defaultMessage: 'Attributes',
                                    })}
                                </label>
                                {item.attributes.map((attribute) => (
                                    <Attribute
                                        key={new Date().getTime()}
                                        attribute={attribute}
                                        attributes={attributes}
                                    />
                                ))}
                            </div>
                        </form>
                    </Card.Body>
                </Card>
            </Admin>
        </>
    );
}

const Attribute = ({attribute, attributes}) => {
    const intl = useIntl();
    const realAttribute = attributes.find((element) => element._id === attribute.attribute);

    const valuesOptions = [];
    realAttribute.values.map((value) => valuesOptions.push({
        key: value._id, value: value._id, text: value.name,
    }));

    return (
        <>
            <Card
                color='grey'
            >
                <Card.Header
                    title={realAttribute.name}
                />
                <Card.Body>
                    <Dropdown
                        placeholder={intl.formatMessage({
                            id: 'choose.one.more.values', defaultMessage: 'Choose one or more values',
                        })}
                        multiple
                        options={valuesOptions}
                        name='values'
                        defaultValue={attribute.values}
                        disabled
                        searchable
                    />
                    <Checkbox
                        label={intl.formatMessage({
                            id: 'visible.product.page', defaultMessage: 'Visible on the product page',
                        })}
                        name='visible'
                        defaultChecked={attribute.visible}
                        disabled
                    />
                    <Checkbox
                        label={intl.formatMessage({
                            id: 'used.variations', defaultMessage: 'Used for variations',
                        })}
                        name='variation'
                        defaultChecked={attribute.variation}
                        disabled
                    />
                </Card.Body>
            </Card>
        </>
    );
};

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
            .get(`${process.env.URL}/api/products/${id}`)
            .then((res) => {
                item = res.data.data;
            })
            .catch(() => {
            });

        let categories = [];
        await axios
            .get(`${process.env.URL}/api/categories`)
            .then((res) => {
                categories = res.data.data;
            })
            .catch(() => {
            });

        let attributes = [];
        await axios
            .get(`${process.env.URL}/api/attributes`)
            .then((res) => {
                attributes = res.data.data;
            })
            .catch(() => {
            });

        return {
            props: {
                item, categories, attributes,
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
