import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Button as SementicButton, Card as SementicCard, Form } from 'semantic-ui-react';
import FileManager from 'components/FileManager/FileManager';
import nookies from 'nookies';
import {auth} from 'utils/dbConnect';
import {Button} from 'components/Button/Button';
import Card from 'components/Cards/Card/Card';
import Admin from 'container/Admin/Admin';
import Input from 'components/Form/Input/Input';
import Dropdown from 'components/Form/Dropdown/Dropdown';

export default function Modifier({ item, categories, attributes, images }) {
    const intl = useIntl();
    const url = 'products';

    const [imagesList, setImagesList] = useState(JSON.parse(images))

    const [form, setForm] = useState({
        _id: item._id,
        name: item.name,
        description: item.description,
        onSale: item.onSale,
        price: item.price,
        specialPrice: item.specialPrice,
        width: item.width,
        length: item.length,
        height: item.height,
        weight: item.weight,
        categories: item.categories,
        productImage: item.productImage,
        productGallery: item.productGallery,
        attributes: item.attributes,
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
            err.name = 'Ce champ est requis';
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

    const handleSetProductImage = function (files) {
        setForm({
            ...form,
            productImage: files[0],
        });
    };

    const handleSetProductGallery = function (files) {
        setForm({
            ...form,
            productGallery: files,
        });
    };

    const handleAddAttribute = function (e, data) {
        const attribute = {
            attribute: data.value,
            values: [],
            variation: false,
            visible: false,
        };
        setForm({ ...form, attributes: [...form.attributes, attribute] });
    };

    const filteredAttributes = (attributes || []).filter((attribute) => {
        return !form.attributes.some((a) => a.attribute === attribute._id);
    });

    const attributesOptions = [];
    filteredAttributes.map((attribute) =>
        attributesOptions.push({
            key: attribute._id,
            value: attribute._id,
            text: attribute.name,
        })
    );

    return (
        <>
            <Head>
                <title>{intl.formatMessage({ id: 'edit.product', defaultMessage: 'Edit product' })} {item.name}</title>
            </Head>
            <Admin>
                <Card title={`${intl.formatMessage({ id: 'edit.product', defaultMessage: 'Edit product' })} ${item.name}`} buttonLabel={intl.formatMessage({ id: 'back', defaultMessage: 'Back' })} buttonAction={`/admin/${url}`} buttonIcon={"las la-arrow-left"}>
                    <Form>
                        <Input label={intl.formatMessage({ id: 'name', defaultMessage: 'Name' })} placeholder={intl.formatMessage({ id: 'name', defaultMessage: 'Name' })} onChange={handleChange} name='name' required defaultValue={form.name}/>
                        <Input label={intl.formatMessage({ id: 'price', defaultMessage: 'Price' })} placeholder={intl.formatMessage({ id: 'price', defaultMessage: 'Price' })} name='price' type='number' onChange={handleChange} step='0.01' required defaultValue={form.price}/>
                        <Input label={intl.formatMessage({ id: 'price.special', defaultMessage: 'Special Price' })} placeholder={intl.formatMessage({ id: 'price.special', defaultMessage: 'Special Price' })} name='specialPrice' type='number' onChange={handleChange} step='0.01' defaultValue={form.specialPrice}/>
                        <Form.TextArea
                            label={intl.formatMessage({ id: 'description', defaultMessage: 'Description' })}
                            placeholder={intl.formatMessage({ id: 'description', defaultMessage: 'Description' })}
                            onChange={handleChange}
                            name='description'
                            defaultValue={form.description}
                        />
                        <Form.Checkbox label={intl.formatMessage({ id: 'on.sale', defaultMessage: 'On sale' })} onChange={handleChange} name='onSale' defaultChecked={form.onSale} />
                        <Input label={intl.formatMessage({ id: 'length', defaultMessage: 'Length (cm)' })} placeholder={intl.formatMessage({ id: 'length', defaultMessage: 'Length (cm)' })} name='length' type='number' onChange={handleChange} step='0.01' defaultValue={form.length}/>
                        <Input label={intl.formatMessage({ id: 'width', defaultMessage: 'Width (cm)' })} placeholder={intl.formatMessage({ id: 'width', defaultMessage: 'Width (cm)' })} name='width' onChange={handleChange} type='number' step='0.01' defaultValue={form.width}/>
                        <Input label={intl.formatMessage({ id: 'height', defaultMessage: 'Height (cm)' })} placeholder={intl.formatMessage({ id: 'height', defaultMessage: 'Height (cm)' })} name='height' onChange={handleChange} type='number' step='0.01' defaultValue={form.height}/>
                        <Input label={intl.formatMessage({ id: 'weight', defaultMessage: 'Weight (lb)' })} placeholder={intl.formatMessage({ id: 'weight', defaultMessage: 'Weight (lb)' })} name='weight' onChange={handleChange} type='number' step='0.001' defaultValue={form.weight}/>
                        <div className='field'>
                            <label>{intl.formatMessage({ id: 'product.image', defaultMessage: 'Product Image' })}</label>
                            <FileManager
                                images={imagesList}
                                setImages={setImagesList}
                                currentFiles={form.productImage ? [form.productImage] : []}
                                setCurrentFiles={handleSetProductImage}
                            />
                        </div>
                        <div className='field'>
                            <label>{intl.formatMessage({ id: 'product.gallery', defaultMessage: 'Product Gallery' })}</label>
                            <FileManager
                                images={imagesList}
                                setImages={setImagesList}
                                currentFiles={form.productGallery}
                                setCurrentFiles={handleSetProductGallery}
                                multiple={true}
                            />
                        </div>
                        <div className='field'>
                            <label>{intl.formatMessage({ id: 'categories', defaultMessage: 'Categories' })}</label>
                            <Dropdown placeholder={intl.formatMessage({ id: 'choose.one.more.categories', defaultMessage: 'Choose one or more categories' })} options={categoriesOptions} name='categories' onChange={handleChange} defaultValue={form.categories}/>
                        </div>
                        <div className='field'>
                            <label>{intl.formatMessage({ id: 'attributes', defaultMessage: 'Attributes' })}</label>
                            {form.attributes.map((attribute) => (
                                <Attribute key={new Date().getTime()} attribute={attribute} setForm={setForm} form={form} attributes={attributes} />
                            ))}
                            <Dropdown placeholder={intl.formatMessage({ id: 'choose.attribute', defaultMessage: 'Choose an attribute' })} options={attributesOptions} name='attributes' onChange={handleAddAttribute}/>
                        </div>
                        <SementicButton type='button' onClick={handleSubmit}>
                            {intl.formatMessage({ id: 'edit', defaultMessage: 'Edit' })}
                        </SementicButton>
                    </Form>
                </Card>
            </Admin>
        </>
    );
}

const Attribute = function ({ attribute, setForm, form, attributes }) {
    const intl = useIntl()
    const realAttribute = attributes.find((element) => {
        return element._id === attribute.attribute;
    });

    const valuesOptions = [];
    realAttribute.values.map((value) => valuesOptions.push({ key: value._id, value: value._id, text: value.name }));

    const handleDelete = function () {
        setForm({ ...form, attributes: form.attributes.filter((a) => a.attribute !== attribute.attribute) });
    };

    const handleChange = (e, data) => {
        setForm({
            ...form,
            attributes: form.attributes.map((a) =>
                a.attribute === attribute.attribute
                    ? {
                          ...a,
                          [data.name]: data.value ? data.value : data.checked,
                      }
                    : a
            ),
        });
    };

    return (
        <>
            <SementicCard fluid color='teal'>
                <SementicCard.Content header={realAttribute.name} />
                <SementicCard.Content>
                    <Dropdown placeholder={intl.formatMessage({ id: 'choose.one.more.values', defaultMessage: 'Choose one or more values' })} multiple options={valuesOptions} name='values' onChange={handleChange} defaultValue={attribute.values}/>
                    <Form.Checkbox label={intl.formatMessage({ id: 'visible.product.page', defaultMessage: 'Visible on the product page' })} name='visible' onChange={handleChange} defaultChecked={attribute.visible} />
                    <Form.Checkbox label={intl.formatMessage({ id: 'used.variations', defaultMessage: 'Used for variations' })} name='variation' onChange={handleChange} defaultChecked={attribute.variation} />
                </SementicCard.Content>
                <SementicCard.Content extra>
                    <Button action={() => handleDelete()} icon={'las la-trash-alt'} />
                </SementicCard.Content>
            </SementicCard>
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

        const { id } = ctx.params;

        let item = {};
        await axios
            .get(process.env.URL + '/api/products/' + id)
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

        let attributes = [];
        await axios
            .get(process.env.URL + '/api/attributes')
            .then((res) => {
                attributes = res.data.data;
            })
            .catch(() => {});

        let images = []
        await axios
            .get(process.env.URL + '/api/images')
            .then((res) => {
                images = res.data.data;
            })
            .catch(() => {});

        return {
            props: { item, categories, attributes, images: JSON.stringify(images) },
        };
    }catch (err) {
        return {
            redirect: {
                permanent: false,
                destination: '/admin/login',
            },
            props: {},
        };
    }
}
