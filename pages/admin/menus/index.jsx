import React, {
    useEffect, useState,
} from 'react';
import Head from 'next/head';
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
import TreeView, {
    addNode, node,
} from 'components/TreeView';
import styles from './menus.module.scss';

export default function Index({ menus, pages, articles, defaultMenu, errors }) {
    const intl = useIntl();

    const [indexErrors, setIndexErrors] = useState(errors);
    const [loading, setLoading] = useState(false);
    const [menusList, setMenusList] = useState(menus);
    const [form, setForm] = useState(defaultMenu
        ? menusList.find((x) => x.id === defaultMenu)
        : menusList[0]);
    const [session] = useSession();
    const [currentMenu, setCurrentMenu] = useState(menusList[0].id);
    const [menuName, setMenuName] = useState(menusList[0].name);
    const [treeState, setTreeState] = useState(JSON.parse(menusList[0].items));

    useEffect(async () => {
        if (!session) {
            await signIn();
        }
    }, [session]);

    useEffect(() => {
        if (defaultMenu) {
            const menu = menusList.find((x) => x.id.toString() === defaultMenu);
            setCurrentMenu(menu.id);
        } else {
            const menu = menusList[0];
            setTreeState(JSON.parse(menu.items));
            setMenuName(menu.name);
            setCurrentMenu(menu.id);
        }
    }, [defaultMenu]);

    useEffect(() => {
        const menu = menusList.find((x) => x.id.toString() === currentMenu);
        if (menu) {
            setTreeState(JSON.parse(menu.items));
            setMenuName(menu.name);
        }
    }, [currentMenu]);

    const onMenuChange = (items) => {
        setForm({
            ...form,
            items: JSON.stringify(items),
        });
    };

    const save = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await fetch(`${process.env.SERVER}/api/menus/${currentMenu}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
            body: JSON.stringify({
                name: menuName,
                items: JSON.stringify(treeState),
            }),
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
        addNode(treeState, setTreeState, node(formLink.label, {
            type: 'Custom Link',
            slug: formLink.url,
        }, []));
        e.target.reset();
        setFormLink({
            url: '',
            label: '',
        });
    };

    const findPostById = (array, id) => {
        let p = {
        };
        array.map((page) => {
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
            const page = findPostById(pages, formPage.page);
            addNode(treeState, setTreeState, node(page.title, {
                type: 'Page',
                slug: page.slug,
            }, []));
        }
        e.target.reset();
        setFormPage({
            page: '',
        });
    };

    const [formArticle, setFormArticle] = useState({
        article: '',
    });

    const handleChangeFormArticle = (_e, data) => {
        setFormArticle({
            ...formArticle,
            [data.name]: data.value ? data.value : null,
        });
    };

    const handleAddArticle = (e) => {
        e.preventDefault();
        if (formArticle.article) {
            const article = findPostById(articles, formArticle.article);
            addNode(treeState, setTreeState, node(article.title, {
                type: 'Article',
                slug: article.slug,
            }, []));
        }
        e.target.reset();
        setFormArticle({
            article: '',
        });
    };

    const handleMenuChange = (e, data) => {
        setCurrentMenu(data.value);
    };

    const pageOptions = [];
    pages.map((page) => pageOptions.push({
        key: page.id.toString(), text: page.title, value: page.id.toString(),
    }));

    const articleOptions = [];
    articles.map((item) => articleOptions.push({
        key: item.id.toString(), text: item.title, value: item.id.toString(),
    }));

    const menuOptions = [];
    menusList.map((menu) => menuOptions.push({
        key: menu.id.toString(), text: menu.name, value: menu.id.toString(),
    }));

    const handleDeleteMenu = async () => {
        setLoading(true);
        const res = await fetch(`${process.env.SERVER}/api/menus/${currentMenu}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
        });
        const result = await res.json();
        if (result.success) {
            const list = menusList.filter((m) => m.id !== currentMenu);
            setCurrentMenu(list[0].id);
            setMenuName(list[0].name);
            setTreeState(JSON.parse(list[0].items));
            setMenusList(list);
        } else {
            setIndexErrors([result.errors]);
        }
        setLoading(false);
    };

    const handleChangeMenuName = (e, data) => {
        const menu = {
            id: currentMenu,
            items: JSON.stringify(treeState),
            name: data.value,
        };
        const list = menusList.filter((m) => (m.id === currentMenu ? menu : m));
        setMenuName(data.value);
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
                                defaultValue={currentMenu.toString()}
                                onChange={handleMenuChange}
                                searchable
                                notClearable
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
                                        id: 'articles', defaultMessage: 'Articles',
                                    })}
                                    active
                                >
                                    <form onSubmit={handleAddArticle}>
                                        <Dropdown
                                            name='article'
                                            options={articleOptions}
                                            onChange={handleChangeFormArticle}
                                            defaultValue={formArticle.article.toString()}
                                            searchable
                                        />
                                        <Button
                                            label={intl.formatMessage({
                                                id: 'menu.add',
                                                defaultMessage: 'Add to menu',
                                            })}
                                            type='submit'
                                            disabled={formArticle.article === ''}
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
                                            defaultValue={formLink.url}
                                            onChange={handleChangeFormLink}
                                        />
                                        <Input
                                            label={intl.formatMessage({
                                                id: 'navigation.label',
                                                defaultMessage: 'Navigation label',
                                            })}
                                            name='label'
                                            required
                                            defaultValue={formLink.label}
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
                                        name: menuName,
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
                                            defaultValue={`${menuName}`}
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
                                        <TreeView
                                            state={treeState}
                                            setState={setTreeState}
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
    articles: PropTypes.oneOfType([
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
    const token = process.env.NODE_ENV === 'production' ? cookies['__Secure-next-auth.session-token'] : cookies['next-auth.session-token'];
    const id = ctx.query.id || '';

    const errors = [];
    let menus = [];
    let pages = [];
    let articles = [];

    if (token) {
        const resPages = await fetch(`${process.env.SERVER}/api/posts?type=PAGE`, {
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

        const resArticles = await fetch(`${process.env.SERVER}/api/posts?type=ARTICLE`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: 'same-origin',
        });
        const dataArticles = await resArticles.json();
        if (data.success) {
            articles = dataArticles.data;
        } else {
            errors.push(dataArticles.errors);
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
            articles,
            defaultMenu: id,
            errors,
            session,
        },
    };
}
