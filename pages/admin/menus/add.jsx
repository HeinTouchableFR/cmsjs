import React, {
    useEffect, useState,
} from 'react';
import Head from 'next/head';
import { useIntl } from 'react-intl';
import Admin from 'container/Admin/Admin';
import Button from 'components/Button/Button';
import Input from 'components/Form/Input/Input';
import IconButton from 'components/Button/IconButton/IconButton';
import { useRouter } from 'next/router';
import {
    getSession, signIn, useSession,
} from 'next-auth/client';
import Flash from 'components/Flash/Flash';
import styles from './menus.module.scss';

export default function Add() {
    const intl = useIntl();
    const router = useRouter();
    const [session] = useSession();

    useEffect(async () => {
        if (!session) {
            await signIn();
        }
    }, [session]);
    const [indexErrors, setIndexErrors] = useState([]);

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
            credentials: 'same-origin',
            method: 'POST',
        });
        const result = await res.json();
        if (result) {
            await router.push({
                pathname: '/admin/menus',
                query: {
                    id: result.data.id,
                },
            });
        } else {
            setIndexErrors([result.errors]);
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
            {session && (
                <>
                    <Head>
                        <title>
                            {intl.formatMessage({
                                id: 'menus', defaultMessage: 'Menus',
                            })}
                        </title>
                    </Head>
                    <Admin>
                        {indexErrors
                        && indexErrors.map((error, index) => (
                            <Flash
                                key={index}
                                error={error}
                            />
                        ))}
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
                                            id: 'menu.create.info',
                                            defaultMessage: 'Give your menu a name, then click on "Create Menu".',
                                        })}
                                    </div>
                                    <div className={`${styles.footer}`}>
                                        <IconButton
                                            action='/admin/menus'
                                            icon='fas fa-arrow-left'
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
            )}
        </>
    );
}

export async function getServerSideProps(ctx) {
    const authorized = ['ADMIN', 'EDITOR', 'MODERATOR'];
    const session = await getSession(ctx);
    if (session && !authorized.includes(session.user.role)) {
        return {
            props: {
            },
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return {
        props: {
            session,
        },
    };
}
