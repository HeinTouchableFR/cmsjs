import React, {useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import slugify from 'react-slugify';
import {Droppable, Draggable, DragDropContext} from 'react-beautiful-dnd';
import {Button, Dropdown, Form, Tab} from 'semantic-ui-react';

import styles from './Navigation.module.scss';

import Component, {ComponentEditor} from 'components/ComponentCollection/Component';
import ComponentDispatcher from '../../components/ComponentCollection/ComponentDispatcher';

export default function Navigation({components, currentItem, onElementValueChange, setCurrentElement, page, onSubmit, pages = [], loading, hide, device, setDevice, hideMenu}) {
    const intl = useIntl();

    const [form, setForm] = useState({
        title: page.title || '',
        slug: page.slug || '',
        parentPage: page.parentPage || ''
    });

    const [activeIndex, setActiveIndex] = useState(0);
    const handleTabChange = (_e, {activeIndex}) => {
        setCurrentElement({});
        setActiveIndex(activeIndex);
    };

    useEffect(
        function () {
            if (currentItem.id === 'empty') {
                setActiveIndex(1);
            }else if(currentItem.type){
                setActiveIndex(2)
            }
        },
        [currentItem]
    );

    const handleSubmit = function (e) {
        e.preventDefault();
        onSubmit(form);
    };

    const pagesOptions = [{
        key: 'empty',
        value: '',
        text: intl.formatMessage({id: 'parentPage.no', defaultMessage: 'No parent page'})
    }];

    const recursivePagesOptions = function (page, tiret = '', parent) {
        if (parent) {
            tiret += ' — ';
        }
        pagesOptions.push({key: page._id, value: page._id, text: (parent ? tiret : '') + page.title});

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
    const getRenderItem = (items) => (provided, snapshot, rubric) => {
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

    const deviceOptions = [
        {key: 'Desktop', text: 'Desktop', value: 'desktop'},
        {key: 'Tablet', text: 'Tablet', value: 'tablet'},
        {key: 'Mobile', text: 'Mobile', value: 'mobile'},
    ];

    const handleDeviceChange = (e, data) => {
        setDevice(data.value)
    };


    const panes = [
        {
            menuItem: intl.formatMessage({id: 'settings', defaultMessage: 'Settings'}),
            render: () => (
                <Tab.Pane attached={true}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Input
                            fluid
                            label={intl.formatMessage({id: 'title', defaultMessage: 'Title'})}
                            placeholder={intl.formatMessage({id: 'title', defaultMessage: 'Title'})}
                            required
                            name='title'
                            defaultValue={form.title}
                            onChange={handleChange}
                        />
                        <Form.Input
                            fluid
                            label={intl.formatMessage({id: 'slug', defaultMessage: 'Slug'})}
                            placeholder={intl.formatMessage({id: 'slug', defaultMessage: 'Slug'})}
                            required
                            name='slug'
                            value={form.slug}
                            onChange={handleChange}
                        />
                        <Form.Dropdown
                            placeholder={intl.formatMessage({id: 'parentPage', defaultMessage: 'Parent page'})}
                            additionLabel={intl.formatMessage({id: 'parentPage', defaultMessage: 'Parent page'})}
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
                                ? intl.formatMessage({id: 'update', defaultMessage: 'Update'})
                                : intl.formatMessage({id: 'publish', defaultMessage: 'Publish'})}
                        </Button>
                    </Form>
                </Tab.Pane>
            ),
        },
        {
            menuItem: intl.formatMessage({id: 'component', defaultMessage: 'Component'}),
            render: () => (
                <Tab.Pane attached={true}>
                    <Droppable
                        droppableId='components'
                        renderClone={getRenderItem(components)}
                        isDropDisabled={true}
                    >
                        {(provided, _snapshot) => (
                            <div className={'dropable' + ' ' + styles.navGrid} ref={provided.innerRef}>
                                {components.map((item, index) => {
                                    const shouldRenderClone = item.type === _snapshot.draggingFromThisWith;
                                    return (
                                        shouldRenderClone ?
                                            <Component tag={item.tag} label={item.label} color={item.color}
                                                       tooltip={item.tooltip} key={item.type}/>
                                            :
                                            <Draggable key={item.type} draggableId={item.type} index={index}>
                                                {(provided, _snapshot) => (
                                                    <div
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
            menuItem: intl.formatMessage({
                id: 'edit',
                defaultMessage: 'Edit'
            }) + ' ' + intl.formatMessage({id: currentItem.type}),
            render: () => (
                <Tab.Pane attached={true}>
                    <ComponentDispatcher element={currentItem} mode="editor" device={device}
                                         onElementValueChange={onElementValueChange}/>
                    <Dropdown
                        placeholder='Select Friend'
                        fluid
                        selection
                        defaultValue={device}
                        options={deviceOptions}
                        onChange={handleDeviceChange}
                    />
                </Tab.Pane>
            ),
        },
    ];

    return (
        <>
            <div className={`${styles.navigation} ${hide ? styles.hide : ''}`}>
                <Tab panes={panes} activeIndex={activeIndex} onTabChange={handleTabChange}/>
            </div>
            <div className={`${styles.hideMenuBtn} ${hide ? styles.hide : ''}`} onClick={() => hideMenu()}/>
        </>
    );
}
