import React, {
    useEffect, useState,
} from 'react';
import Head from 'next/head';
import MenuEditor from 'components/MenuEditor/MenuEditor';
import { useIntl } from 'react-intl';
import nookies from 'nookies';
import Admin from 'container/Admin/Admin';
import Button from 'components/Button/Button';
import Input from 'components/Form/Input/Input';
import Dropdown from 'components/Form/Dropdown/Dropdown';
import Accordion from 'components/Accordion/Accordion';
import IconButton from 'components/Button/IconButton/IconButton';
import Link from 'next/link';
import {
    getSession, signIn, useSession,
} from 'next-auth/client';
import Flash from 'components/Flash/Flash';
import PropTypes from 'prop-types';
import styles from './menus.module.scss';

export default function Index({ menus, pages, defaultMenu, errors }) {
    const intl = useIntl();

    const [indexErrors, setIndexErrors] = useState(errors);
    const [loading, setLoading] = useState(false);
    const [menusList, setMenusList] = useState(menus);
    const [form, setForm] = useState(defaultMenu
        ? menusList.find((x) => x.id === defaultMenu)
        : menusList[0]);
    const [session] = useSession();

    useEffect(async () => {
        if (!session) {
            await signIn();
        }
    }, [session]);

    const onMenuChange = (items) => {
        setForm({
            ...form,
            items: JSON.stringify(items),
        });
    };

    const save = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await fetch(`${process.env.SERVER}/api/menus/${form.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
            body: JSON.stringify(form),
        });
        const result = await res.json();
        if (!result.success) {
            setIndexErrors([result.errors]);
        }
        setLoading(false);
    };

    const [formLink, setFormLink] = useState({
        url: '',
        label: '',
    });

    const handleChangeFormLink = (_e, data) => {
        setFormLink({
            ...formLink,
            [data.name]: data.value ? data.value : null,
        });
    };

    const handleAddLink = (e) => {
        e.preventDefault();
        const item = {
            id: new Date().getTime().toString(),
            label: formLink.label,
            type: 'Custom Link',
            slug: formLink.url,
            child: [],
        };
        const items = JSON.parse(form.items);
        items.push(item);
        onMenuChange(items);
        setFormLink({
            url: '',
            label: '',
        });
    };

    const findPageById = (id) => {
        let p = {
        };
        pages.map((page) => {
            if (page.id.toString() === id) {
                p = page;
            }
            return null;
        });
        return p;
    };

    const [formPage, setFormPage] = useState({
        page: '',
    });

    const handleChangeFormPage = (_e, data) => {
        setFormPage({
            ...formPage,
            [data.name]: data.value ? data.value : null,
        });
    };

    const handleAddPage = (e) => {
        e.preventDefault();
        if (formPage.page) {
            const page = findPageById(formPage.page);
            const item = {
                id: new Date().getTime().toString(),
                label: page.title,
                type: 'Page',
                slug: page.slug,
                child: [],
            };
            const items = JSON.parse(form.items);
            items.push(item);
            onMenuChange(items);
        }
        e.target.reset();
        setFormPage({
            page: '',
        });
    };

    const handleMenuChange = (e, data) => {
        setForm(menusList.find((x) => x.id.toString() === data.value));
    };

    const pageOptions = [];
    pages.map((page) => pageOptions.push({
        key: page.id.toString(), text: page.title, value: page.id.toString(),
    }));

    const menuOptions = [];
    menusList.map((menu) => menuOptions.push({
        key: menu.id.toString(), text: menu.name, value: menu.id.toString(),
    }));

    const handleDeleteMenu = async () => {
        setLoading(true);
        const res = await fetch(`${process.env.SERVER}/api/menus/${form.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
        });
        const result = await res.json();
        if (result.success) {
            const list = menusList.filter((m) => m.id !== form.id);
            setForm(list[0]);
            setMenusList(list);
        } else {
            setIndexErrors([result.errors]);
        }
        setLoading(false);
    };

    const handleChangeMenuName = (e, data) => {
        const menu = form;
        menu.name = data.value;
        const list = menusList.filter((m) => (m.id === form.id ? menu : m));
        setForm(menu);
        setMenusList(list);
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
                        <div className={`${styles.manage_menu}`}>
                            <Dropdown
                                label={intl.formatMessage({
                                    id: 'menu.edit', defaultMessage: 'Menu to edit',
                                })}
                                options={menuOptions}
                                defaultValue={form?.id.toString()}
                                onChange={handleMenuChange}
                                searchable
                            />
                            <span className={`${styles.add_menu}`}>
                                {intl.formatMessage({
                                    id: 'or', defaultMessage: 'or',
                                })}
                                <Link href={`${process.env.SERVER}/admin/menus/add`}>
                                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                    <a>
                                        {intl.formatMessage({
                                            id: 'menu.create', defaultMessage: 'create a new menu.',
                                        })}
                                    </a>
                                </Link>
                            </span>
                        </div>
                        <div className={`${styles.nav_menu}`}>
                            <div className={`${styles.menu_settings}`}>
                                <h2>
                                    {intl.formatMessage({
                                        id: 'menu.addItem', defaultMessage: 'Add menu items',
                                    })}
                                </h2>
                                <Accordion
                                    title={intl.formatMessage({
                                        id: 'pages', defaultMessage: 'Pages',
                                    })}
                                    active
                                >
                                    <form onSubmit={handleAddPage}>
                                        <Dropdown
                                            name='page'
                                            options={pageOptions}
                                            onChange={handleChangeFormPage}
                                            defaultValue={formPage.page.toString()}
                                            searchable
                                        />
                                        <Button
                                            label={intl.formatMessage({
                                                id: 'menu.add',
                                                defaultMessage: 'Add to menu',
                                            })}
                                            type='submit'
                                            disabled={formPage.page === ''}
                                        />
                                    </form>
                                </Accordion>
                                <Accordion
                                    title={intl.formatMessage({
                                        id: 'menu.custom.link', defaultMessage: 'Custom link',
                                    })}
                                >
                                    <form onSubmit={handleAddLink}>
                                        <Input
                                            label={intl.formatMessage({
                                                id: 'url', defaultMessage: 'URL',
                                            })}
                                            placeholder='https://'
                                            name='url'
                                            required
                                            onChange={handleChangeFormLink}
                                        />
                                        <Input
                                            label={intl.formatMessage({
                                                id: 'navigation.label',
                                                defaultMessage: 'Navigation label',
                                            })}
                                            name='label'
                                            required
                                            onChange={handleChangeFormLink}
                                        />
                                        <Button
                                            label={intl.formatMessage({
                                                id: 'menu.add',
                                                defaultMessage: 'Add to menu',
                                            })}
                                            type='submit'
                                            disabled={(formLink.label === '' && formLink.url === '')}
                                        />
                                    </form>
                                </Accordion>
                            </div>
                            <div className={`${styles.menu_edit}`}>
                                <h2>
                                    {intl.formatMessage({
                                        id: 'menu.structure', defaultMessage: '{name} menu structure',
                                    }, {
                                        name: form?.name,
                                    })}
                                </h2>
                                <form onSubmit={save}>
                                    <div className={`${styles.header}`}>
                                        <Input
                                            label={intl.formatMessage({
                                                id: 'name',
                                                defaultMessage: 'Name',
                                            })}
                                            name='name'
                                            defaultValue={`${form?.name}`}
                                            onChange={handleChangeMenuName}
                                            required
                                        />
                                        <Button
                                            label={intl.formatMessage({
                                                id: 'menu.save', defaultMessage: 'Save menu',
                                            })}
                                            loading={loading}
                                            type='submit'
                                        />
                                    </div>
                                    <div className={`${styles.body}`}>
                                        <MenuEditor
                                            content={form?.items}
                                            onChange={onMenuChange}
                                        />
                                    </div>
                                    <div className={`${styles.footer}`}>
                                        <IconButton
                                            action={() => handleDeleteMenu()}
                                            icon='fas fa-trash-alt'
                                        />
                                        <Button
                                            label={intl.formatMessage({
                                                id: 'menu.save', defaultMessage: 'Save menu',
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

Index.propTypes = {
    pages: PropTypes.oneOfType([
        PropTypes.shape({
        }),
        PropTypes.arrayOf(PropTypes.shape({
        })),
    ]).isRequired,
    menus: PropTypes.oneOfType([
        PropTypes.shape({
        }),
        PropTypes.arrayOf(PropTypes.shape({
        })),
    ]).isRequired,
    errors: PropTypes.oneOfType([
        PropTypes.shape({
        }),
        PropTypes.arrayOf(PropTypes.shape({
        })),
    ]).isRequired,
    defaultMenu: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
};

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
    const cookies = nookies.get(ctx);
    const token = cookies['next-auth.session-token'];
    const id = ctx.query.id || '';

    const errors = [];
    let menus = [];
    let pages = [];

    if (token) {
        const resPages = await fetch(`${process.env.SERVER}/api/pages`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: 'same-origin',
        });
        const data = await resPages.json();
        if (data.success) {
            pages = data.data;
        } else {
            errors.push(data.errors);
        }

        const resMenus = await fetch(`${process.env.SERVER}/api/menus`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: 'same-origin',
        });
        const dataMenus = await resMenus.json();
        if (dataMenus.success) {
            menus = dataMenus.data;
        } else {
            errors.push(dataMenus.errors);
        }
    }

    return {
        props: {
            menus,
            pages,
            defaultMenu: id,
            errors,
            session,
        },
    };
}
