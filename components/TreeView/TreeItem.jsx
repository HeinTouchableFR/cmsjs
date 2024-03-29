import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import Grid from 'container/Grid/Grid';
import Input from 'components/Form/Input/Input';
import IconButton from '../Button/IconButton/IconButton';
import styles from './Tree.module.scss';
import ChevronDown from './Icons/chevron-down';
import ChevronRight from './Icons/chevron-right';

export default function TreeItem({ item,
    onExpand,
    onCollapse,
    provided,
    state,
    setState,
    select,
    selectedItem,
    removeNode }) {
    const intl = useIntl();
    const isParent = item.children.length;
    const [showForm, setShowForm] = useState(item.isExpanded);

    const handleClick = () => {
        select(state, setState, item.id);
        setShowForm(!item.isExpanded);
        if (item.isExpanded) {
            onCollapse(item.id);
        } else {
            onExpand(item.id);
        }
    };

    const handleChange = (e, data) => {
        const { items } = state;
        items[item.id].data[data.name] = data.value;
        setState({
            ...state, items,
        });
    };

    const handleDelete = () => {
        removeNode(state, setState, item.id);
    };

    return (
        <div
            id={`treeitem-${item.id}`}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            aria-selected={item.id === selectedItem}
            {...(isParent
                ? {
                    role: 'group', 'aria-expanded': item.isExpanded,
                }
                : {
                    role: 'treeitem',
                })}
        >
            <div className={styles.item}>
                <div
                    className={styles.title}
                    onClick={handleClick}
                    onKeyDown={handleClick}
                    role='switch'
                    aria-checked={item.isExpanded}
                >
                    {
                        item.isExpanded
                        ? <ChevronDown />
                        : <ChevronRight />
                    }
                    <Grid columns={2}>
                        <Grid.Column>{item.data.title}</Grid.Column>
                        <Grid.Column
                            align='right'
                        >
                            {item.data.type}
                        </Grid.Column>
                    </Grid>
                </div>
                {
                    showForm && (
                        <div className={styles.content}>
                            <Input
                                label={intl.formatMessage({
                                    id: 'url', defaultMessage: 'URL',
                                })}
                                name='slug'
                                required
                                defaultValue={item.data.slug}
                                onChange={(e, data) => handleChange(e, data, item.id)}
                            />
                            <Input
                                label={intl.formatMessage({
                                    id: 'navigation.label', defaultMessage: 'Navigation label',
                                })}
                                name='title'
                                required
                                defaultValue={item.data.title}
                                onChange={(e, data) => handleChange(e, data, item.id)}
                            />
                            <IconButton
                                action={handleDelete}
                                icon='fas fa-trash-alt'
                            />
                        </div>
                    )
                }
            </div>
        </div>
    );
}
