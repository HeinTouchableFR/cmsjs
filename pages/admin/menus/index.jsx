import React, {useState} from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';

import Header from 'components/Header/Header';
import Content from 'components/Content/Content';
import {db} from 'utils/dbConnect';
import {Accordion, Card, Dropdown, Form, Icon} from 'semantic-ui-react'
import {NoLinkButton} from 'components/Button/NoLinkButton/NoLinkButton';
import MenuEditor from 'components/MenuEditor/MenuEditor';
import {firebase} from 'utils/firebaseClient';
import styles from './menus.module.scss'

export default function Index({items, pages}) {
    const url = 'menus';
    const router = useRouter();

    const [loading, setLoading] = useState(false)

    const [form, setForm] = useState(items[0])

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
            if(page.id === id){
                p = page
            }
        })
        return p
    }

    const handleAddPage = (e) => {
        e.preventDefault()
        if(e.target.pages.value){
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

    const pageOptions = []
    pages.map(page => pageOptions.push({ key: page.id, text: page.title, value: page.id }))

    return (
        <>
            <Head>
                <title>Menus</title>
            </Head>
            <Header>
                <Content title='Menus' icon='fa-bars' url={url}>
                    <div className={styles.menu__form__container}>
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
                                            {pageOptions.map(option => <option key={option.key} value={option.value}>{option.text}</option>)}
                                        </Form.Field>
                                        <Form.Button secondary type="submit">Add to menu</Form.Button>
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
                                        <Form.Button secondary type="submit">Add to menu</Form.Button>
                                    </Form>
                                </Accordion.Content>
                            </Accordion>
                        </Card>
                        <Form onSubmit={save}>
                            <Card fluid>
                                <Card.Content>
                                    <Form.Input label="Menu Name" name="name" value={`${form.name}`}/>
                                    <Form.Button loading={loading} primary>
                                        <Icon disabled name='check'/>
                                        Save Menu
                                    </Form.Button>
                                </Card.Content>
                                <Card.Content>
                                    <MenuEditor content={form.items} onChange={onMenuChange}/>
                                </Card.Content>
                                <Card.Content extra>
                                    <NoLinkButton icon={"fa-trash"} style={"delete"}/>
                                    <Form.Button loading={loading} primary>
                                        <Icon disabled name='check'/>
                                        Save Menu
                                    </Form.Button>
                                </Card.Content>
                            </Card>
                        </Form>
                    </div>
                </Content>
            </Header>
        </>
    );
}

export async function getServerSideProps() {
    let items = [];
    let pages = [];

    const snapshots = await db.collection(`menus`).get()
    snapshots.docs.map(snapshot => {
        const item = {
            id: snapshot.id,
            ...snapshot.data()
        }
        items.push(item)
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
        props: {items, pages},
    };
}
