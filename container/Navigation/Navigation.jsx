import React, { useEffect, useState, createRef } from 'react';
import { useIntl } from 'react-intl';
import slugify from 'react-slugify';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Button, Form, Tab } from 'semantic-ui-react';

import styles from './Navigation.module.scss';

import Component, { ComponentEditor } from 'components/ComponentCollection/Component';

export default function Navigation({ composants, currentItem, onElementValeurChange, setCurrentElement, page, onSubmit, pages = [], loading }) {
    const intl = useIntl();

    const [form, setForm] = useState({ title: page.title || '', slug: page.slug || '', parentPage: page.parentPage || '' });

    const [activeIndex, setActiveIndex] = useState(0);
    const handleTabChange = (_e, { activeIndex }) => {
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

    const handleChange = (_e, data) => {
        setForm({
            ...form,
            [data.name]: data.value && data.name !== 'slug' ? data.value : data.checked,
            slug: data.name === 'title' || data.name === 'slug' ? slugify(data.value) : form.slug,
        });
    };

    // This method is needed for rendering clones of draggables
    const getRenderItem = (items, className) => (provided, snapshot, rubric) => {
        const item = items[rubric.source.index];
        return (
            <React.Fragment>
                <div
                    className={'componentBackground'}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={provided.draggableProps.style}
                >
                    <Component tag={item.tag} label={item.label} color={item.color}
                               tooltip={item.tooltip}/>
                </div>
            </React.Fragment>
        );
    };


    const panes = [
        {
            menuItem: intl.formatMessage({ id: 'settings', defaultMessage: 'Settings' }),
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
            menuItem: intl.formatMessage({ id: 'component', defaultMessage: 'Component' }),
            render: () => (
                <Tab.Pane attached={true}>
                    <Droppable
                        droppableId='composants'
                        renderClone={getRenderItem(composants, '')}
                        isDropDisabled={true}
                    >
                        {(provided, _snapshot) => (
                            <div className={'dropable' + ' ' + styles.navGrid} ref={provided.innerRef}>
                                {composants.map((item, index) => {
                                    const shouldRenderClone = item.type === _snapshot.draggingFromThisWith;
                                    return (
                                            shouldRenderClone ?
                                                <div className={'componentBackground'} key={item.type}>
                                                    <Component tag={item.tag} label={item.label} color={item.color} tooltip={item.tooltip}/>
                                                </div> :
                                                <Draggable key={item.type} draggableId={item.type} index={index}>
                                                    {(provided, _snapshot) => (
                                                        <div
                                                            className={'componentBackground'}
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <Component tag={item.tag} label={item.label} color={item.color}
                                                                       tooltip={item.tooltip}/>
                                                        </div>
                                                    )}
                                                </Draggable>
                                        )
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </Tab.Pane>
            ),
        },
        currentItem.type && {
            menuItem: intl.formatMessage({ id: 'edit', defaultMessage: 'Edit' }) + ' ' + intl.formatMessage({ id: currentItem.type }),
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
