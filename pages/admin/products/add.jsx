import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button, Form } from 'semantic-ui-react';
import axios from 'axios';

import Header from 'components/Header/Header';
import Content from 'components/Content/Content';
import FileManager from 'components/FileManager/FileManager';

var FormData = require('form-data');

export default function Add({ categories }) {
    const intl = useIntl();
    const url = 'products';

    const [form, setForm] = useState({
        name: '',
        description: '',
        onSale: false,
        price: 0,
        specialPrice: null,
        width: null,
        length: null,
        height: null,
        weight: null,
        categories: [],
        productImage: null,
        productGallery: [],
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    const [data, setData] = useState(null);

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
            data.append('categories', JSON.stringify(form.categories));
            data.append('produitEnVente', form.enVente ? 'true' : 'false');
            router.push(`/admin/${url}`);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let errs = validate();
        let f = new FormData(e.target);
        setData(f);
        setErrors(errs);
        setIsSubmitting(true);
    };

    const validate = () => {
        let err = {};

        if (!form.nom) {
            err.nom = 'This field is required';
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

    return (
        <>
            <Head>
                <title>Ajouter un produit</title>
            </Head>
            <Header>
                <Content title='Products' icon='fa-cubes' url={url} action={'add'}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Input
                            fluid
                            error={errors.name ? { content: 'This field is required', pointing: 'below' } : null}
                            label='Name'
                            placeholder='Name'
                            onChange={handleChange}
                            name='name'
                            required
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
                        />
                        <Form.Input
                            fluid
                            label='Special Price'
                            placeholder='Special Price'
                            name='spetialPrice'
                            type='number'
                            onChange={handleChange}
                            step='0.01'
                        />
                        <Form.TextArea label='Description' placeholder='Description' onChange={handleChange} name='description' />
                        <Form.Checkbox label='On Sale' onChange={handleChange} name='onSale' />
                        <Form.Input fluid label='Length (cm)' placeholder='Length' name='lenght' type='number' onChange={handleChange} step='0.01' />
                        <Form.Input fluid label='Width (cm)' placeholder='Width' name='width' onChange={handleChange} type='number' step='0.01' />
                        <Form.Input fluid label='Height (cm)' placeholder='Height' name='height' onChange={handleChange} type='number' step='0.01' />
                        <Form.Input fluid label='Weight (Kg)' placeholder='Weight' name='weight' onChange={handleChange} type='number' step='0.001' />
                        <div className='field'>
                            <label>Product Image</label>
                            <FileManager
                                currentFiles={form.productImage ? [form.productImage] : []}
                                setCurrentFiles={handleSetProductImage}
                                trigger={
                                    <div className={`filemanager_btn`}>
                                        {form.productImage && form.productImage.url ? (
                                            <div className={`preview`} style={{ background: `url(${form.productImage.url})` }}></div>
                                        ) : (
                                            <div className={`preview`} style={{ background: `url(/placeholder.png)` }}></div>
                                        )}
                                        <div className={`preview__action`}>{intl.formatMessage({ id: 'choosePicture' })}</div>
                                    </div>
                                }
                            />
                        </div>
                        <div className='field'>
                            <label>Product Gallery</label>
                            <FileManager
                                currentFiles={form.productGallery}
                                setCurrentFiles={handleSetProductGallery}
                                multiple={true}
                                trigger={
                                    <div className={`filemanager_btn`}>
                                        {form.productGallery.length > 0 && form.productGallery[0].url ? (
                                            <div className={`preview__gallery`}>
                                                {form.productGallery.map((image) => (
                                                    <img src={`${image.url}`} alt={`${image.name}`} />
                                                ))}
                                            </div>
                                        ) : (
                                            <div className={`preview`} style={{ background: `url(/placeholder.png)` }}></div>
                                        )}
                                        <div className={`preview__action`}>{intl.formatMessage({ id: 'choosePicture' })}</div>
                                    </div>
                                }
                            />
                        </div>
                        <Form.Dropdown
                            placeholder='Choose a parent category'
                            fluid
                            search
                            clearable
                            selection
                            multiple
                            options={categoriesOptions}
                            name='categories'
                            onChange={handleChange}
                        />
                        <Button type='submit'>Add</Button>
                    </Form>
                </Content>
            </Header>
        </>
    );
}

export async function getServerSideProps() {
    let categories = [];

    await axios
        .get(process.env.URL + '/api/categories')
        .then((res) => {
            categories = res.data.data;
        })
        .catch(() => {});

    return {
        props: { categories },
    };
}
