import React, {useState} from 'react';
import Head from 'next/head';
import {auth} from 'utils/dbConnect';
import {Accordion, Card as SementicCard, Divider, Dropdown, Form, Grid, Icon, Segment} from 'semantic-ui-react'
import MenuEditor from 'components/MenuEditor/MenuEditor';
import {useIntl} from 'react-intl';
import axios from 'axios';
import nookies from 'nookies';
import Admin from 'container/Admin/Admin';
import Card from 'components/Cards/Card/Card';
import {Button} from '../../../components/Button/Button';

export default function Index({menus, pages}) {
    const intl = useIntl()
    const url = 'menus';

    const [loading, setLoading] = useState(false)

    const [menusList, setMenusList] = useState(menus)

    const [form, setForm] = useState(menusList[0])

    const [activeIndex, setActiveIndex] = useState(0)

    const handleClick = (e, titleProps) => {
        const {index} = titleProps
        const newIndex = activeIndex === index ? -1 : index
        setActiveIndex(newIndex)
    }

    const onMenuChange = (items) => {
        setForm({
            ...form,
            items: JSON.stringify(items)
        })
    }

    const save = async (e) => {
        e.preventDefault()
        setLoading(true)
        const res = await fetch(`${process.env.URL}/api/menus/${form.id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        });
        await res.json();
        setLoading(false)
    }

    const handleAddLink = (e) => {
        e.preventDefault()
        const data = e.target
        const item = {
            id: new Date().getTime().toString(),
            label: data.label.value,
            type: "Custom Link",
            slug: data.url.value,
            child: []
        }
        const items = JSON.parse(form.items)
        items.push(item)
        onMenuChange(items)
    }

    const findPageById = (id) => {
        let p = {}
        pages.map(page => {
            if (page.id === id) {
                p = page
            }
        })
        return p
    }

    const handleAddPage = (e) => {
        e.preventDefault()
        if (e.target.pages.value) {
            const page = findPageById(e.target.pages.value)
            const item = {
                id: new Date().getTime().toString(),
                label: page.title,
                type: "Page",
                slug: page.slug,
                child: []
            }
            const items = JSON.parse(form.items)
            items.push(item)
            onMenuChange(items)
        }
        e.target.reset()
    }

    const handleMenuChange = (e, data) => {
        setForm(menusList[data.value])
    }

    const pageOptions = []
    pages.map(page => pageOptions.push({key: page._id, text: page.title, value: page.id}))

    const menuOptions = []
    menusList.map((menu, index) => menuOptions.push({key: menu.id, text: menu.name, value: index}))

    const handleCreateMenu = async (e) => {
        e.preventDefault()
        setLoading(true)
        const menu = {
            name: e.target.name.value,
            items: "[]"
        }
        const res = await fetch('/api/menus', {
            body: JSON.stringify(menu),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        });

        const result = await res.json();
        menu.id = result.data.id
        const list = [...menusList, menu]
        setMenusList(list)
        setForm(list[list.length - 1])
        setLoading(false)
        e.target.reset()
    }

    const handleDeleteMenu = async () => {
        setLoading(true)
        const res = await fetch(`${process.env.URL}/api/menus/${form.id}`, {
            method: 'DELETE',
        });
        const result = await res.json();
        if(result.success){
            const list = menusList.filter((m) => m.id !== form.id)
            setForm(list[0])
            setMenusList(list)
        }
        setLoading(false)
    }

    const handleChangeMenuName = (e, data) => {
        const menu = form
        menu.name = data.value
        const list = menusList.filter((m) => m.id === form.id ? menu : m)
        setForm(menu)
        setMenusList(list)
    }

    return (
        <>
            <Head>
                <title>{intl.formatMessage({id: 'menus', defaultMessage: 'Menus'})}</title>
            </Head>
            <Admin>
                <Card title={intl.formatMessage({id: 'menus', defaultMessage: 'Menus'})}>
                    <SementicCard fluid color="teal">
                        <Segment>
                            <Grid columns={2} relaxed='very' verticalAlign="middle">
                                <Grid.Column>
                                    <span>
                                        {intl.formatMessage({id: 'menu.edit', defaultMessage: 'Menu to edit'})} {' '}
                                        <Dropdown
                                            inline
                                            options={menuOptions}
                                            value={menusList.findIndex(p => p.id === form.id)}
                                            onChange={handleMenuChange}
                                        />
                                    </span>
                                </Grid.Column>
                                <Grid.Column>
                                    <Form onSubmit={handleCreateMenu}>
                                        <Grid columns={2}>
                                            <Grid.Column>
                                                <Form.Input name="name" label={intl.formatMessage({
                                                    id: 'name',
                                                    defaultMessage: 'Name'
                                                })} inline placeholder={intl.formatMessage({
                                                    id: 'name',
                                                    defaultMessage: 'Names'
                                                })} required/>
                                            </Grid.Column>
                                            <Grid.Column textAlign="right">
                                                <Form.Button secondary loading={loading}>{intl.formatMessage({
                                                    id: 'menu.create',
                                                    defaultMessage: 'Create menu'
                                                })}</Form.Button>
                                            </Grid.Column>
                                        </Grid>
                                    </Form>
                                </Grid.Column>
                            </Grid>

                            <Divider vertical>{intl.formatMessage({id: 'or', defaultMessage: 'OR'})}</Divider>
                        </Segment>
                    </SementicCard>
                    <Grid columns={2}>
                        <Grid.Column width={3}>
                            <SementicCard fluid color='green'>
                                <Accordion fluid styled>
                                    <Accordion.Title active={activeIndex === 0} index={0} onClick={handleClick}>
                                        <Icon name='dropdown'/>
                                        {intl.formatMessage({id: 'pages', defaultMessage: 'Pages'})}
                                    </Accordion.Title>
                                    <Accordion.Content active={activeIndex === 0}>
                                        <Form onSubmit={handleAddPage}>
                                            <Form.Field label='Page' control='select' name="pages">
                                                <option value=''></option>
                                                {pageOptions.map(option => <option key={option.key}
                                                                                   value={option.value}>{option.text}</option>)}
                                            </Form.Field>
                                            <Form.Button fluid secondary type="submit">{intl.formatMessage({
                                                id: 'menu.add',
                                                defaultMessage: 'Add to menu'
                                            })}</Form.Button>
                                        </Form>

                                    </Accordion.Content>
                                    <Accordion.Title active={activeIndex === 1} index={1} onClick={handleClick}>
                                        <Icon name='dropdown'/>
                                        {intl.formatMessage({id: 'articles', defaultMessage: 'Articles'})}
                                    </Accordion.Title>
                                    <Accordion.Content active={activeIndex === 1}>

                                    </Accordion.Content>
                                    <Accordion.Title active={activeIndex === 2} index={2} onClick={handleClick}>
                                        <Icon name='dropdown'/>
                                        {intl.formatMessage({id: 'categories', defaultMessage: 'Categories'})}
                                    </Accordion.Title>
                                    <Accordion.Content active={activeIndex === 2}>

                                    </Accordion.Content>
                                    <Accordion.Title active={activeIndex === 3} index={3} onClick={handleClick}>
                                        <Icon name='dropdown'/>
                                        {intl.formatMessage({id: 'products', defaultMessage: 'Products'})}
                                    </Accordion.Title>
                                    <Accordion.Content active={activeIndex === 3}>

                                    </Accordion.Content>
                                    <Accordion.Title active={activeIndex === 4} index={4} onClick={handleClick}>
                                        <Icon name='dropdown'/>
                                        {intl.formatMessage({id: 'menu.custom.link', defaultMessage: 'Custom link'})}
                                    </Accordion.Title>
                                    <Accordion.Content active={activeIndex === 4}>
                                        <Form onSubmit={handleAddLink}>
                                            <Form.Input label={intl.formatMessage({id: 'url', defaultMessage: 'URL'})}
                                                        placeholder="https://" name="url" required/>
                                            <Form.Input label={intl.formatMessage({
                                                id: 'navigation.label',
                                                defaultMessage: 'Navigation label'
                                            })} name="label" required/>
                                            <Form.Button fluid secondary type="submit">{intl.formatMessage({
                                                id: 'menu.add',
                                                defaultMessage: 'Add to menu'
                                            })}</Form.Button>
                                        </Form>
                                    </Accordion.Content>
                                </Accordion>
                            </SementicCard>
                        </Grid.Column>
                        <Grid.Column width={13}>
                            <Form onSubmit={save}>
                                <SementicCard fluid>
                                    <SementicCard.Content>
                                        <Grid columns={2}>
                                            <Grid.Column>
                                                <Form.Input inline label={intl.formatMessage({
                                                    id: 'name',
                                                    defaultMessage: 'Name'
                                                })} name="name" value={`${form.name}`} onChange={handleChangeMenuName}/>
                                            </Grid.Column>
                                            <Grid.Column textAlign="right">
                                                <Form.Button loading={loading} primary>
                                                    <Icon disabled name='check'/>
                                                    {intl.formatMessage({id: 'menu.save', defaultMessage: 'Save menu'})}
                                                </Form.Button>
                                            </Grid.Column>
                                        </Grid>
                                    </SementicCard.Content>
                                    <SementicCard.Content>
                                        <MenuEditor content={form.items} onChange={onMenuChange}/>
                                    </SementicCard.Content>
                                    <SementicCard.Content extra>
                                        <Grid columns={2}>
                                            <Grid.Column>
                                                <Button action={() => handleDeleteMenu()} icon={'las la-trash-alt'} />
                                            </Grid.Column>
                                            <Grid.Column textAlign="right">
                                                <Form.Button loading={loading} primary>
                                                    <Icon disabled name='check'/>
                                                    {intl.formatMessage({id: 'menu.save', defaultMessage: 'Save menu'})}
                                                </Form.Button>
                                            </Grid.Column>
                                        </Grid>
                                    </SementicCard.Content>
                                </SementicCard>
                            </Form>
                        </Grid.Column>
                    </Grid>
                </Card>
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

        let menus = [];
        await axios
            .get(process.env.URL + '/api/menus')
            .then((res) => {
                menus = res.data.data;
            })
            .catch((error) => {});

        let pages = [];
        await axios
            .get(process.env.URL + '/api/pages')
            .then((res) => {
                pages = res.data.data;
            })
            .catch((error) => {});

        return {
            props: {menus, pages},
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
