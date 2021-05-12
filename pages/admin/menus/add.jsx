import React, { useState } from 'react';
import Head from 'next/head';
import { auth } from 'utils/dbConnect';
import { useIntl } from 'react-intl';
import nookies from 'nookies';
import Admin from 'container/Admin/Admin';
import Button from 'components/Button/Button';
import Input from 'components/Form/Input/Input';
import IconButton from 'components/Button/IconButton/IconButton';
import { useRouter } from 'next/router';
import styles from './menus.module.scss';

export default function Add() {
    const intl = useIntl();
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: '',
    });

    const handleCreateMenu = async (e) => {
        e.preventDefault();
        setLoading(true);
        const menu = {
            name: form.name,
            items: '[]',
        };
        const res = await fetch('/api/menus', {
            body: JSON.stringify(menu),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        });
        const { success, data } = await res.json();
        if (success) {
            router.push({
                pathname: '/admin/menus',
                query: {
                    id: data.id,
                },
            });
        }
        setLoading(false);
    };

    const handleChangeFormCreateMenu = (_e, data) => {
        setForm({
            ...form,
            [data.name]: data.value ? data.value : null,
        });
    };

    return (
        <>
            <Head>
                <title>
                    {intl.formatMessage({
                        id: 'menus', defaultMessage: 'Menus',
                    })}
                </title>
            </Head>
            <Admin>
                <div className={`${styles.nav_menu} ${styles.single}`}>
                    <div className={`${styles.menu_edit}`}>
                        <form onSubmit={handleCreateMenu}>
                            <div className={`${styles.header}`}>
                                <Input
                                    label={intl.formatMessage({
                                        id: 'name',
                                        defaultMessage: 'Name',
                                    })}
                                    name='name'
                                    defaultValue={`${form.name}`}
                                    onChange={handleChangeFormCreateMenu}
                                    required
                                />
                                <Button
                                    label={intl.formatMessage({
                                        id: 'menu.create.menu', defaultMessage: 'Create menu',
                                    })}
                                    loading={loading}
                                    type='submit'
                                />
                            </div>
                            <div className={`${styles.body}`}>
                                {intl.formatMessage({
                                    id: 'menu.create.info', defaultMessage: 'Give your menu a name, then click on "Create Menu".',
                                })}
                            </div>
                            <div className={`${styles.footer}`}>
                                <IconButton
                                    action='/admin/menus'
                                    icon='las fa-arrow-left'
                                />
                                <Button
                                    label={intl.formatMessage({
                                        id: 'menu.create.menu', defaultMessage: 'Create menu',
                                    })}
                                    loading={loading}
                                    type='submit'
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </Admin>
        </>
    );
}

export async function getServerSideProps(ctx) {
    try {
        const cookies = nookies.get(ctx);
        const token = await auth.verifyIdToken(cookies.token);

        if (!token.roles.some((r) => ['admin', 'editor', 'moderator'].includes(r))) {
            throw new Error('unauthorized');
        }

        return {
            props: {
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
