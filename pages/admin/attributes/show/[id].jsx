import React from 'react';
import Head from 'next/head';
import axios from 'axios';
import { useIntl } from 'react-intl';
import Admin from 'container/Admin/Admin';
import Card from 'components/Cards/Card/Card';
import nookies from 'nookies';
import { auth } from 'utils/dbConnect';
import Input from 'components/Form/Input/Input';
import Checkbox from 'components/Form/Checkbox/Checkbox';

export default function Detail({ item }) {
    const intl = useIntl();
    const url = 'attributes';

    return (
        <>
            <Head>
                <title>
                    {intl.formatMessage({
                        id: 'attribute.detail', defaultMessage: 'Detail of the {name} attribute',
                    }, {
                        name: item.name,
                    })}
                </title>
            </Head>
            <Admin>
                <Card
                    color='brown'
                >
                    <Card.Header
                        title={intl.formatMessage({
                            id: 'attribute.detail', defaultMessage: 'Detail of the {name} attribute',
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
                                defaultValue={item.name}
                                name='name'
                                disabled
                                required
                            />
                            <Checkbox
                                label={intl.formatMessage({
                                    id: 'used.filter', defaultMessage: 'Use the attribute as a product search filter',
                                })}
                                name='filter'
                                defaultChecked={item.filters}
                                disabled
                            />
                            <div className='field'>
                                <label>
                                    {intl.formatMessage({
                                        id: 'values', defaultMessage: 'Values',
                                    })}
                                </label>
                            </div>
                            {item.values && item.values.map((item) => (
                                <Value
                                    key={item._id}
                                    item={item}
                                />
                            ))}
                        </form>
                    </Card.Body>
                </Card>
            </Admin>
        </>
    );
}

const Value = ({ item }) => {
    const intl = useIntl();
    return (
        <Card
            color='violet'
        >
            <Card.Header title={item.name} />
            <Card.Body>
                <Input
                    label={intl.formatMessage({
                        id: 'name', defaultMessage: 'Name',
                    })}
                    placeholder={intl.formatMessage({
                        id: 'name', defaultMessage: 'Name',
                    })}
                    name='name'
                    defaultValue={item.name}
                    disabled
                    required
                />
            </Card.Body>
        </Card>
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

        let item = {
        };

        await axios
            .get(`${process.env.URL}/api/attributes/${id}`)
            .then((res) => {
                item = res.data.data;
            })
            .catch((error) => {
            });

        return {
            props: {
                item,
            },
        };
    } catch (err) {
        return {
            redirect: {
                permanent: false,
                destination: '/admin/login',
            },
            props: {
            },
        };
    }
}
