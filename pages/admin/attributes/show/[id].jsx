import React from 'react';
import Head from 'next/head';
import Header from 'components/Header/Header';
import Content from 'components/Content/Content';
import axios from 'axios';
import { Card, Form, Input } from 'semantic-ui-react';
import {useIntl} from 'react-intl';

export default function Detail({ item }) {
    const intl = useIntl()
    const url = 'attributes';

    return (
        <>
            <Head>
                <title>{intl.formatMessage({ id: 'attribute.detail', defaultMessage: 'Detail of the {name} attribute'}, {name: item.name})}</title>
            </Head>
            <Header>
                <Content title={intl.formatMessage({ id: 'attributes', defaultMessage: 'Attributes' })} icon='fa-cubes' url={url} action={intl.formatMessage({ id: 'detail', defaultMessage: 'Detail' })}>
                    <Form>
                        <Form.Input fluid label={intl.formatMessage({ id: 'name', defaultMessage: 'Name' })} placeholder={intl.formatMessage({ id: 'name', defaultMessage: 'Name' })} defaultValue={item.name} name='name' disabled required />
                        <Form.Checkbox label={intl.formatMessage({ id: 'used.filter', defaultMessage: 'Use the attribute as a product search filter' })} name='filter' checked={item.filter} disabled />
                        <div className='field'>
                            <label>{intl.formatMessage({ id: 'values', defaultMessage: 'Values' })}</label>
                        </div>
                        {item.values && item.values.map((item) => <Value key={item._id} item={item} />)}
                    </Form>
                </Content>
            </Header>
        </>
    );
}

const Value = function ({ item }) {
    const intl = useIntl()
    return (
        <Card fluid color='teal'>
            <Card.Content header={item.name} />
            <Card.Content>
                <Input fluid label={intl.formatMessage({ id: 'name', defaultMessage: 'Name' })} placeholder={intl.formatMessage({ id: 'name', defaultMessage: 'Name' })} name='name' defaultValue={item.name} disabled />
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
