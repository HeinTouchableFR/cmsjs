import React from 'react';
import Head from 'next/head';
import axios from 'axios';
import { Form, Input, Card as SementicCard } from 'semantic-ui-react';
import {useIntl} from 'react-intl';
import Admin from 'container/Admin/Admin';
import Card from 'components/Cards/Card/Card';
import nookies from 'nookies';
import {auth} from 'utils/dbConnect';

export default function Detail({ item }) {
    const intl = useIntl()
    const url = 'attributes';

    return (
        <>
            <Head>
                <title>{intl.formatMessage({ id: 'attribute.detail', defaultMessage: 'Detail of the {name} attribute'}, {name: item.name})}</title>
            </Head>
            <Admin>
                <Card title={intl.formatMessage({ id: 'attribute.detail', defaultMessage: 'Detail of the {name} attribute'}, {name: item.name})} buttonLabel={intl.formatMessage({ id: 'back', defaultMessage: 'Back' })} buttonAction={`/admin/${url}`} buttonIcon={"las la-arrow-left"}>
                    <Form>
                        <Form.Input fluid label={intl.formatMessage({ id: 'name', defaultMessage: 'Name' })} placeholder={intl.formatMessage({ id: 'name', defaultMessage: 'Name' })} defaultValue={item.name} name='name' disabled required />
                        <Form.Checkbox label={intl.formatMessage({ id: 'used.filter', defaultMessage: 'Use the attribute as a product search filter' })} name='filter' checked={item.filter} disabled />
                        <div className='field'>
                            <label>{intl.formatMessage({ id: 'values', defaultMessage: 'Values' })}</label>
                        </div>
                        {item.values && item.values.map((item) => <Value key={item._id} item={item} />)}
                    </Form>
                </Card>
            </Admin>
        </>
    );
}

const Value = function ({ item }) {
    const intl = useIntl()
    return (
        <SementicCard fluid color='teal'>
            <SementicCard.Content header={item.name} />
            <SementicCard.Content>
                <Input fluid label={intl.formatMessage({ id: 'name', defaultMessage: 'Name' })} placeholder={intl.formatMessage({ id: 'name', defaultMessage: 'Name' })} name='name' defaultValue={item.name} disabled />
            </SementicCard.Content>
        </SementicCard>
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
            .get(process.env.URL + '/api/attributes/' + id)
            .then((res) => {
                item = res.data.data;
            })
            .catch((error) => {
            });

        return {
            props: { item },
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
