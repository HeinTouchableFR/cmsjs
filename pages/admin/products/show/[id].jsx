import React from 'react';
import Head from 'next/head';
import axios from 'axios';
import {Card, Form} from 'semantic-ui-react';

import Header from 'components/Header/Header';
import Content from 'components/Content/Content';
import {ActionButtonNoLink} from '../../../../components/Button/ActionButton/ActionButton';

export default function Detail({ item, categories, attributes }) {
    const url = 'products';

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
                <title>Detail of the products {item.nom}</title>
            </Head>
            <Header>
                <Content title='Products' icon='fa-cubes' url={url}>
                    <Form>
                        <Form.Input fluid label='Name' placeholder='Name' name='Name' disabled defaultValue={item.name} />
                        <Form.Input fluid label='Price' placeholder='Price' name='price' type='number' step='0.01' disabled defaultValue={item.price} />
                        <Form.Input fluid label='Special Price' placeholder='Special Price' name='specialPrice' type='number' step='0.01' disabled defaultValue={item.specialPrice}/>
                        <Form.TextArea label='Description' placeholder='Description' name='description' disabled defaultValue={item.description} />
                        <Form.Checkbox label='On Sale' name='onSale' disabled defaultChecked={item.onSale} />
                        <Form.Input fluid label='Length (cm)' placeholder='Length' name='length' type='number' step='0.01' disabled defaultValue={item.length}/>
                        <Form.Input fluid label='Width (cm)' placeholder='Width' name='width' type='number' step='0.01' disabled defaultValue={item.width}/>
                        <Form.Input fluid label='Height (cm)' placeholder='Height' name='height' type='number' step='0.01' disabled defaultValue={item.height}/>
                        <Form.Input fluid label='Weight (Kg)' placeholder='Weight' name='weight' type='number' step='0.001' disabled defaultValue={item.weight}/>
                        <div className='field'>
                            <label>Product Image</label>
                            {item.productImage && <img width={120} height={120} src={item.productImage.url} />}
                        </div>
                        <div className='field'>
                            <label>Product Gallery</label>
                            {item.productGallery && (
                                <div className={'galerie'}>
                                    {item.productGallery.map((image) => (
                                        <img width={120} height={120} src={image.url} alt={'Image ' + item.name} />
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="field">
                            <label>Category</label>
                            <Form.Dropdown placeholder='Catégories' fluid search clearable selection multiple options={categoriesOptions} name='categories' disabled defaultValue={item.categories}/>
                        </div>
                        <div className="field">
                            <label>Attributes</label>
                            {item.attributes.map((attribute) => (
                                <Attribute key={new Date().getTime()} attribute={attribute} attributes={attributes} />
                            ))}
                        </div>
                    </Form>
                </Content>
            </Header>
        </>
    );
}

const Attribute = function ({ attribute, attributes }) {
    const realAttribute = attributes.find((element) => {
        return element._id === attribute.attribute;
    });

    const valuesOptions = [];
    realAttribute.values.map((value) => valuesOptions.push({ key: value._id, value: value._id, text: value.name }));

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
                        defaultValue={attribute.values}
                        disabled
                    />
                    <Form.Checkbox label='Visible on the product page' name='visible' defaultChecked={attribute.visible} disabled/>
                    <Form.Checkbox label='Used for variations' name='variation' defaultChecked={attribute.variation} disabled/>
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
