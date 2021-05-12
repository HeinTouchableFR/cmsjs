import React, { useState } from 'react';
import Head from 'next/head';
import { auth } from 'utils/dbConnect';
import MenuEditor from 'components/MenuEditor/MenuEditor';
import { useIntl } from 'react-intl';
import axios from 'axios';
import nookies from 'nookies';
import Admin from 'container/Admin/Admin';
import Button from 'components/Button/Button';
import Input from 'components/Form/Input/Input';
import Dropdown from 'components/Form/Dropdown/Dropdown';
import Accordion from 'components/Accordion/Accordion';
import IconButton from 'components/Button/IconButton/IconButton';
import Link from 'next/link';
import styles from './menus.module.scss';

export default function Index({ menus, pages, defaultMenu }) {
    const intl = useIntl();

    const [loading, setLoading] = useState(false);

    const [menusList, setMenusList] = useState(menus);

    const [form, setForm] = useState(defaultMenu
        ? menusList.find((x) => x.id === defaultMenu)
        : menusList[0]);

    const onMenuChange = (items) => {
        setForm({
            ...form,
            items: JSON.stringify(items),
        });
    };

    const save = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await fetch(`${process.env.URL}/api/menus/${form.id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        });
        await res.json();
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
            if (page.id === id) {
                p = page;
            }
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
        setForm(menusList.find((x) => x.id === data.value));
    };

    const pageOptions = [];
    pages.map((page) => pageOptions.push({
        key: page.id, text: page.title, value: page.id,
    }));

    const menuOptions = [];
    menusList.map((menu) => menuOptions.push({
        key: menu.id, text: menu.name, value: menu.id,
    }));

    const handleDeleteMenu = async () => {
        setLoading(true);
        const res = await fetch(`${process.env.URL}/api/menus/${form.id}`, {
            method: 'DELETE',
        });
        const result = await res.json();
        if (result.success) {
            const list = menusList.filter((m) => m.id !== form.id);
            setForm(list[0]);
            setMenusList(list);
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
            <Head>
                <title>
                    {intl.formatMessage({
                        id: 'menus', defaultMessage: 'Menus',
                    })}
                </title>
            </Head>
            <Admin>
                <div className={`${styles.manage_menu}`}>
                    <Dropdown
                        label={intl.formatMessage({
                            id: 'menu.edit', defaultMessage: 'Menu to edit',
                        })}
                        options={menuOptions}
                        defaultValue={form.id}
                        onChange={handleMenuChange}
                        searchable
                    />
                    <span className={`${styles.add_menu}`}>
                        {intl.formatMessage({
                            id: 'or', defaultMessage: 'or',
                        })}
                        <Link href='/admin/menus/add'>
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
                                    defaultValue={formPage.page}
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
                                name: form.name,
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
                                    defaultValue={`${form.name}`}
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
                                    content={form.items}
                                    onChange={onMenuChange}
                                />
                            </div>
                            <div className={`${styles.footer}`}>
                                <IconButton
                                    action={() => handleDeleteMenu()}
                                    icon='las la-trash-alt'
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
    );
}

export async function getServerSideProps(ctx) {
    try {
        const cookies = nookies.get(ctx);
        const token = await auth.verifyIdToken(cookies.token);

        if (!token.roles.some((r) => ['admin', 'editor', 'moderator'].includes(r))) {
            throw new Error('unauthorized');
        }

        const id = ctx.query.id || '';

        let menus = [];
        await axios
            .get(`${process.env.URL}/api/menus`)
            .then((res) => {
                menus = res.data.data;
            })
            .catch((error) => {
            });

        let pages = [];
        await axios
            .get(`${process.env.URL}/api/pages`)
            .then((res) => {
                pages = res.data.data;
            })
            .catch((error) => {
            });

        return {
            props: {
                menus, pages, defaultMenu: id,
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
