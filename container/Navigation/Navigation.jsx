import React, { useEffect, useState, createRef } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Button, Form, Tab } from 'semantic-ui-react';
import slugify from 'react-slugify';
import { useIntl } from 'react-intl';

import styles from './Navigation.module.scss';

import Component, { ComponentEditor } from 'components/ComponentCollection/Component';

export default function Navigation({ composants, currentItem, onElementValeurChange, setCurrentElement, page, onSubmit, pages = [], loading }) {
    const intl = useIntl();

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

    const handleSubmit = function (e) {
        e.preventDefault();
        onSubmit(form);
    };

    const pagesOptions = [{ key: 'empty', value: '', text: intl.formatMessage({ id: 'parentPage.no', defaultMessage: 'No parent page' }) }];

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
        setForm({
            ...form,
            [data.name]: data.value && data.name !== 'slug' ? data.value : data.checked,
            slug: data.name === 'title' || data.name === 'slug' ? slugify(data.value) : form.slug,
        });
    };

    const panes = [
        {
            menuItem: intl.formatMessage({ id: 'settingsLabel' }),
            render: () => (
                <Tab.Pane attached={true}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Input
                            fluid
                            label={intl.formatMessage({ id: 'title', defaultMessage: 'Title' })}
                            placeholder={intl.formatMessage({ id: 'title', defaultMessage: 'Title' })}
                            required
                            name='title'
                            defaultValue={form.title}
                            onChange={handleChange}
                        />
                        <Form.Input
                            fluid
                            label={intl.formatMessage({ id: 'slug', defaultMessage: 'Slug' })}
                            placeholder={intl.formatMessage({ id: 'slug', defaultMessage: 'Slug' })}
                            required
                            name='slug'
                            value={form.slug}
                            onChange={handleChange}
                        />
                        <Form.Dropdown
                            placeholder={intl.formatMessage({ id: 'parentPage', defaultMessage: 'Parent page' })}
                            additionLabel={intl.formatMessage({ id: 'parentPage', defaultMessage: 'Parent page' })}
                            fluid
                            search
                            clearable
                            selection
                            options={pagesOptions}
                            defaultValue={form.parentPage}
                            onChange={handleChange}
                            name='parentPage'
                        />
                        <Button loading={loading} color={'green'} type='submit'>
                            {page.content
                                ? intl.formatMessage({ id: 'update', defaultMessage: 'Update' })
                                : intl.formatMessage({ id: 'publish', defaultMessage: 'Publish' })}
                        </Button>
                    </Form>
                </Tab.Pane>
            ),
        },
        {
            menuItem: intl.formatMessage({ id: 'componentLabel' }),
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
            menuItem: intl.formatMessage({ id: 'editLabel' }) + ' ' + intl.formatMessage({ id: currentItem.type }),
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
