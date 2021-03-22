import React, {useState} from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';
import Header from 'components/Header/Header';
import Content from 'components/Content/Content';
import {db} from 'utils/dbConnect';
import {Accordion, Card, Divider, Dropdown, Form, Grid, Icon, Segment} from 'semantic-ui-react'
import {NoLinkButton} from 'components/Button/NoLinkButton/NoLinkButton';
import MenuEditor from 'components/MenuEditor/MenuEditor';
import {firebase} from 'utils/firebaseClient';

export default function Index({menus, pages}) {
    const url = 'menus';
    const router = useRouter();

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
        await firebase.firestore().doc(`menus/${form.id}`).set(form, {merge: true})
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
    pages.map(page => pageOptions.push({key: page.id, text: page.title, value: page.id}))

    const menuOptions = []
    menusList.map((menu, index) => menuOptions.push({key: menu.id, text: menu.name, value: index}))

    const handleCreateMenu = async(e) => {
        e.preventDefault()
        setLoading(true)
        const menu = {
            name: e.target.name.value,
            items: "[]"
        }
        const data = await firebase.firestore().collection("menus").add(menu)
        menu.id = data.id
        const list = [...menusList, menu]
        setMenusList(list)
        setForm(list[list.length - 1])
        setLoading(false)
        e.target.reset()
    }

    const handleDeleteMenu = async() => {
        setLoading(true)
        firebase.firestore().collection('menus').doc(`${form.id}`).delete().then()
        const list = menusList.filter((m) => m.id !== form.id)
        setForm(list[0])
        setMenusList(list)
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
                <title>Menus</title>
            </Head>
            <Header>
                <Content title='Menus' icon='fa-bars' url={url} action={"menus"}>
                    <Card fluid color="teal">
                        <Segment>
                            <Grid columns={2} relaxed='very' verticalAlign="middle">
                                <Grid.Column>
                                    <span>
                                        Menu to edit {' '}
                                        <Dropdown
                                            inline
                                            options={menuOptions}
                                            value={menusList.findIndex(p => p.id === form.id)} onChange={handleMenuChange}
                                        />
                                    </span>
                                </Grid.Column>
                                <Grid.Column>
                                    <Form onSubmit={handleCreateMenu}>
                                        <Grid columns={2}>
                                            <Grid.Column>
                                                <Form.Input name="name" label="Menu name" inline placeholder="Menu name" required/>
                                            </Grid.Column>
                                            <Grid.Column textAlign="right">
                                                <Form.Button secondary loading={loading}>Create menu</Form.Button>
                                            </Grid.Column>
                                        </Grid>
                                    </Form>
                                </Grid.Column>
                            </Grid>

                            <Divider vertical>Or</Divider>
                        </Segment>
                    </Card>
                    <Grid columns={2}>
                        <Grid.Column width={3}>
                            <Card fluid color='green'>
                                <Accordion fluid styled>
                                    <Accordion.Title active={activeIndex === 0} index={0} onClick={handleClick}>
                                        <Icon name='dropdown'/>
                                        Pages
                                    </Accordion.Title>
                                    <Accordion.Content active={activeIndex === 0}>
                                        <Form onSubmit={handleAddPage}>
                                            <Form.Field label='Page' control='select' name="pages">
                                                <option value=''></option>
                                                {pageOptions.map(option => <option key={option.key}
                                                                                   value={option.value}>{option.text}</option>)}
                                            </Form.Field>
                                            <Form.Button fluid secondary type="submit">Add to menu</Form.Button>
                                        </Form>

                                    </Accordion.Content>
                                    <Accordion.Title active={activeIndex === 1} index={1} onClick={handleClick}>
                                        <Icon name='dropdown'/>
                                        Articles
                                    </Accordion.Title>
                                    <Accordion.Content active={activeIndex === 1}>

                                    </Accordion.Content>
                                    <Accordion.Title active={activeIndex === 2} index={2} onClick={handleClick}>
                                        <Icon name='dropdown'/>
                                        Product categories
                                    </Accordion.Title>
                                    <Accordion.Content active={activeIndex === 2}>

                                    </Accordion.Content>
                                    <Accordion.Title active={activeIndex === 3} index={3} onClick={handleClick}>
                                        <Icon name='dropdown'/>
                                        Products
                                    </Accordion.Title>
                                    <Accordion.Content active={activeIndex === 3}>

                                    </Accordion.Content>
                                    <Accordion.Title active={activeIndex === 4} index={4} onClick={handleClick}>
                                        <Icon name='dropdown'/>
                                        Custom Link
                                    </Accordion.Title>
                                    <Accordion.Content active={activeIndex === 4}>
                                        <Form onSubmit={handleAddLink}>
                                            <Form.Input label="URL" placeholder="https://" name="url" required/>
                                            <Form.Input label="Link Text" name="label" required/>
                                            <Form.Button fluid secondary type="submit">Add to menu</Form.Button>
                                        </Form>
                                    </Accordion.Content>
                                </Accordion>
                            </Card>
                        </Grid.Column>
                        <Grid.Column width={13}>
                            <Form onSubmit={save}>
                                <Card fluid>
                                    <Card.Content>
                                        <Grid columns={2}>
                                            <Grid.Column>
                                                <Form.Input inline label="Menu Name" name="name" value={`${form.name}`} onChange={handleChangeMenuName}/>
                                            </Grid.Column>
                                            <Grid.Column textAlign="right">
                                                <Form.Button loading={loading} primary>
                                                    <Icon disabled name='check'/>
                                                    Save Menu
                                                </Form.Button>
                                            </Grid.Column>
                                        </Grid>
                                    </Card.Content>
                                    <Card.Content>
                                        <MenuEditor content={form.items} onChange={onMenuChange}/>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <Grid columns={2}>
                                            <Grid.Column>
                                                <NoLinkButton icon={"fa-trash"} style={"delete"} onClick={handleDeleteMenu}/>
                                            </Grid.Column>
                                            <Grid.Column textAlign="right">
                                                <Form.Button loading={loading} primary>
                                                    <Icon disabled name='check'/>
                                                    Save Menu
                                                </Form.Button>
                                            </Grid.Column>
                                        </Grid>
                                    </Card.Content>
                                </Card>
                            </Form>
                        </Grid.Column>
                    </Grid>
                </Content>
            </Header>
        </>
    );
}

export async function getServerSideProps() {
    let menus = [];
    let pages = [];

    const snapshots = await db.collection(`menus`).get()
    snapshots.docs.map(snapshot => {
        const item = {
            id: snapshot.id,
            ...snapshot.data()
        }
        menus.push(item)
    })

    const pagesSnapshots = await db.collection(`pages`).get()
    pagesSnapshots.docs.map(snapshot => {
        const item = {
            id: snapshot.id,
            ...snapshot.data()
        }
        pages.push(item)
    })

    return {
        props: {menus, pages},
    };
}
