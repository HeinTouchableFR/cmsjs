import React from 'react';
import Head from 'next/head';
import Header from 'components/Header/Header';
import Content from 'components/Content/Content';
import axios from 'axios';
import { Button, Card, Form, Input } from 'semantic-ui-react';
import { ActionButtonNoLink } from 'components/Button/ActionButton/ActionButton';

export default function Detail({ item }) {
    const url = 'attributs';

    return (
        <>
            <Head>
                <title>Détail de l'attribut {item.name}</title>
            </Head>
            <Header>
                <Content title='Attribut' icon='fa-cubes' url={url}>
                    <Form>
                        <Form.Input fluid label='Nom' placeholder='Nom' defaultValue={item.name} name='nom' disabled />
                        <Form.Checkbox label="Utiliser l'attribut comme filtre de recherche produit" name='filtre' checked={item.filter} disabled />
                        <div className='field'>
                            <label>Valeurs</label>
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
        .get(process.env.URL + '/api/attributs/' + id)
        .then((res) => {
            item = res.data.data;
        })
        .catch((error) => {});
    return {
        props: { item },
    };
}
