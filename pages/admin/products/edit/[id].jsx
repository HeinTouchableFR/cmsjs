import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Button, Card, Form } from 'semantic-ui-react';

import Header from 'components/Header/Header';
import Content from 'components/Content/Content';
import { ActionButtonNoLink } from 'components/Button/Button';
import FileManager from 'components/FileManager/FileManager';

export default function Modifier({ item, categories, attributes }) {
    const intl = useIntl();
    const url = 'products';

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
                <title>Edit product {item.name}</title>
            </Head>
            <Header>
                <Content title='Products' icon='fa-cubes' url={url} action={'modifier'}>
                    <Form>
                        <Form.Input
                            fluid
                            error={errors.name ? { content: 'This field is required', pointing: 'below' } : null}
                            label='Name'
                            placeholder='Name'
                            onChange={handleChange}
                            name='name'
                            required
                            defaultValue={form.name}
                        />
                        <Form.Input
                            fluid
                            error={errors.price ? { content: 'This field is required', pointing: 'below' } : null}
                            label='Price'
                            placeholder='Price'
                            name='price'
                            type='number'
                            onChange={handleChange}
                            step='0.01'
                            required
                            defaultValue={form.price}
                        />
                        <Form.Input
                            fluid
                            label='Special Price'
                            placeholder='Special Price'
                            name='specialPrice'
                            type='number'
                            onChange={handleChange}
                            step='0.01'
                            defaultValue={form.specialPrice}
                        />
                        <Form.TextArea
                            label='Description'
                            placeholder='Description'
                            onChange={handleChange}
                            name='description'
                            defaultValue={form.description}
                        />
                        <Form.Checkbox label='On Sale' onChange={handleChange} name='onSale' defaultChecked={form.onSale} />
                        <Form.Input
                            fluid
                            label='Length (cm)'
                            placeholder='Length'
                            name='length'
                            type='number'
                            onChange={handleChange}
                            step='0.01'
                            defaultValue={form.length}
                        />
                        <Form.Input
                            fluid
                            label='Width (cm)'
                            placeholder='Width'
                            name='width'
                            onChange={handleChange}
                            type='number'
                            step='0.01'
                            defaultValue={form.width}
                        />
                        <Form.Input
                            fluid
                            label='Height (cm)'
                            placeholder='Height'
                            name='height'
                            onChange={handleChange}
                            type='number'
                            step='0.01'
                            defaultValue={form.height}
                        />
                        <Form.Input
                            fluid
                            label='Weight (Kg)'
                            placeholder='Weight'
                            name='weight'
                            onChange={handleChange}
                            type='number'
                            step='0.001'
                            defaultValue={form.weight}
                        />
                        <div className='field'>
                            <label>Product Image</label>
                            <FileManager
                                currentFiles={form.productImage ? [form.productImage] : []}
                                setCurrentFiles={handleSetProductImage}
                            />
                        </div>
                        <div className='field'>
                            <label>Product Gallery</label>
                            <FileManager
                                currentFiles={form.productGallery}
                                setCurrentFiles={handleSetProductGallery}
                                multiple={true}
                            />
                        </div>
                        <div className='field'>
                            <label>Category</label>
                            <Form.Dropdown
                                placeholder='Choose one or more categories'
                                fluid
                                search
                                clearable
                                selection
                                multiple
                                options={categoriesOptions}
                                name='categories'
                                onChange={handleChange}
                                defaultValue={form.categories}
                            />
                        </div>
                        <div className='field'>
                            <label>Attributes</label>
                            {form.attributes.map((attribute) => (
                                <Attribute key={new Date().getTime()} attribute={attribute} setForm={setForm} form={form} attributes={attributes} />
                            ))}
                            <Form.Dropdown
                                placeholder='Choose an attribute'
                                fluid
                                search
                                clearable
                                selection
                                options={attributesOptions}
                                name='attributes'
                                onChange={handleAddAttribute}
                            />
                        </div>
                        <Button type='button' onClick={handleSubmit}>
                            Edit
                        </Button>
                    </Form>
                </Content>
            </Header>
        </>
    );
}

const Attribute = function ({ attribute, setForm, form, attributes }) {
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
            <Card fluid color='teal'>
                <Card.Content header={realAttribute.name} />
                <Card.Content>
                    <Form.Dropdown
                        placeholder='Choose one or more values'
                        fluid
                        search
                        clearable
                        selection
                        multiple
                        options={valuesOptions}
                        name='values'
                        onChange={handleChange}
                        defaultValue={attribute.values}
                    />
                    <Form.Checkbox label='Visible on the product page' name='visible' onChange={handleChange} defaultChecked={attribute.visible} />
                    <Form.Checkbox label='Used for variations' name='variation' onChange={handleChange} defaultChecked={attribute.variation} />
                </Card.Content>
                <Card.Content extra>
                    <ActionButtonNoLink type='button' style={'delete'} icon={'fa-trash'} onClick={handleDelete} />
                </Card.Content>
            </Card>
        </>
    );
};

export async function getServerSideProps({ params }) {
    const { id } = params;

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

    return {
        props: { item, categories, attributes },
    };
}
