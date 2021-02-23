import React, { useEffect, useState, createRef } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import {Button, Form, Tab} from 'semantic-ui-react';
import slugify from 'react-slugify';

import styles from './Navigation.module.scss';

import useTranslation from 'intl/useTranslation';

import Component, { ComponentEditor } from 'components/ComponentCollection/Component';

export default function Navigation({ composants, currentItem, onElementValeurChange, setCurrentElement, page, onSubmit, pages = [], loading }) {
    const { t } = useTranslation();

    const [form, setForm] = useState({ title: page.title || '', slug: page.slug || '', parentPage: page.parentPage || '' });

    const [activeIndex, setActiveIndex] = useState(0);
    const handleTabChange = (e, { activeIndex }) => {
        setActiveIndex(activeIndex);
        if (activeIndex !== 0) {
            setCurrentElement({ id: 'empty' });
        }
    };

    useEffect(
        function () {
            if (currentItem.id) {
                if (currentItem.id !== 'empty') {
                    setActiveIndex(2);
                } else {
                    setActiveIndex(1);
                }
            }
        },
        [currentItem]
    );
    const handleSlugify = function (e) {
        setForm({
            ...form,
            'slug': slugify(e.target.value)
        });
    }

    const handleSubmit = function(e){
        e.preventDefault()
        onSubmit(form)
    }

    const pagesOptions = [];

    const recursivePagesOptions = function (page, tiret = '', parent) {
        if (parent) {
            tiret += ' — ';
        }
        pagesOptions.push({ key: page._id, value: page._id, text: (parent ? tiret : '') + page.title });

        if (page.childPagesData) {
            page.childPagesData.map((child) => recursivePagesOptions(child, tiret, page));
        }
    };

    pages.length > 0 && pages.map((page) => recursivePagesOptions(page));

    const handleChange = (e, data) => {
        if(data.name === "title"){
           handleSlugify(e)
        }
        setForm({
            ...form,
            [data.name]: data.value ? data.value : data.checked,
        });
    };

    const panes = [
        {
            menuItem: t('settingsLabel'),
            render: () => <Tab.Pane attached={true}>
                <Form onSubmit={handleSubmit}>
                    <Form.Input
                        fluid
                        label='Title'
                        placeholder='Title'
                        required
                        name='title'
                        defaultValue={form.title}
                        onChange={handleChange}
                    />
                    <Form.Input
                        fluid
                        label='Slug'
                        placeholder='Slug'
                        required
                        name='slug'
                        value={form.slug}
                        onChange={handleSlugify}
                    />
                    <Form.Dropdown
                        placeholder='Parent Page'
                        additionLabel='Parent Page'
                        fluid
                        search
                        clearable
                        selection
                        options={pagesOptions}
                        defaultValue={form.parentPage}
                        onChange={handleChange}
                        name='parentPage'
                    />
                    <Button loading={loading} color={'green'} type='submit'>{page.content ? 'Update' : 'Publish'}</Button>
                </Form>
            </Tab.Pane>,
        },
        {
            menuItem: t('componentLabel'),
            render: () => (
                <Tab.Pane attached={true}>
                    <Droppable droppableId='composants'>
                        {(provided, snapshot) => (
                            <div className={'dropable'} ref={provided.innerRef}>
                                {composants.map((item, index) => (
                                    <Draggable key={item.type} draggableId={item.type} index={index}>
                                        {(provided, snapshot) => (
                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <Component tag={item.tag} label={item.label} color={item.color} tooltip={item.tooltip} />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </Tab.Pane>
            ),
        },
        currentItem.type && {
            menuItem: t('editLabel') + ' ' + t(currentItem.type),
            render: () => (
                <Tab.Pane attached={true}>
                    <ComponentEditor element={currentItem} onElementValeurChange={onElementValeurChange} />
                </Tab.Pane>
            ),
        },
    ];

    return (
        <>
            <div className={styles.navigation}>
                <Tab panes={panes} activeIndex={activeIndex} onTabChange={handleTabChange} />
            </div>
        </>
    );
}
