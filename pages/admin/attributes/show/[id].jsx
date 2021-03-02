import React from 'react';
import Head from 'next/head';
import Header from 'components/Header/Header';
import Content from 'components/Content/Content';
import axios from 'axios';
import { Button, Card, Form, Input } from 'semantic-ui-react';
import { ActionButtonNoLink } from 'components/Button/ActionButton/ActionButton';

export default function Detail({ item }) {
    const url = 'attributes';

    return (
        <>
            <Head>
                <title>Detail of the {item.name} attribute</title>
            </Head>
            <Header>
                <Content title='Attribute' icon='fa-cubes' url={url} action={"show"}>
                    <Form>
                        <Form.Input fluid label='Name' placeholder='Name' defaultValue={item.name} name='name' disabled required />
                        <Form.Checkbox label="Use the attribute as a product search filter" name='filter' checked={item.filter} disabled />
                        <div className='field'>
                            <label>Values</label>
                        </div>
                        {item.values && item.values.map((item) => <Value key={item._id} item={item} />)}
                    </Form>
                </Content>
            </Header>
        </>
    );
}

const Value = function ({ item }) {
    return (
        <Card fluid color='teal'>
            <Card.Content header={item.name} />
            <Card.Content>
                <Input fluid label='Nom' placeholder='Nom' name='nom' defaultValue={item.name} disabled />
            </Card.Content>
        </Card>
    );
};

export async function getServerSideProps({ params }) {
    const { id } = params;

    let item = {};

    await axios
        .get(process.env.URL + '/api/attributes/' + id)
        .then((res) => {
            item = res.data.data;
        })
        .catch((error) => {});
    return {
        props: { item },
    };
}
