import React from 'react';
import Tree, {
    moveItemOnTree, mutateTree,
} from '@atlaskit/tree';
import produce from 'immer';
import TreeItem from './TreeItem';
import styles from './Tree.module.scss';

export * from './utils';

const expand = (setState) => (itemId) => {
    setState((state) => mutateTree(state, itemId, {
        isExpanded: true,
    }));
};

const collapse = (setState) => (itemId) => {
    setState((state) => mutateTree(state, itemId, {
        isExpanded: false,
    }));
};

const selectItem = (draft, itemId) => {
    draft.selectedItem = itemId;
    Object.keys(draft.items).forEach((id) => (draft.items[id] = mutateTree(draft, id, {
    }).items[id]));
};

export const select = (state, setState, itemId) => {
    setState(produce((draft) => selectItem(draft, itemId)));
};

export const addNode = (state, setState, node) => {
    const parent = 'root';

    setState(produce((draft) => {
        draft.items[parent].isExpanded = true;
        draft.items[parent].hasChildren = true;
        draft.items[parent].children.push(node.id);
        draft.items[node.id] = {
            ...node, parent,
        };
    }));
};

export const removeNode = (state, setState, itemId) => {
    setState(produce((draft) => {
        if (!itemId || itemId === 'root') return;
        const item = draft.items[itemId];
        const parent = draft.items[item.parent];
        const itemIndex = parent.children.indexOf(itemId);

        draft.items[item.parent].children = parent.children.filter((id) => id !== itemId);

        delete draft.items[itemId];

        parent.hasChildren = !!parent.children.length;

        selectItem(draft,
            parent.children[itemIndex === 0 ? 0 : itemIndex - 1] || parent.id);
    }));
};

export const removeSelectedNode = ({ state, setState }) => {
    removeNode({
        state, setState,
    }, state.selectedItem);
};

// - Helpers

const dragStart = (state, setState) => (itemId) => {
    select(state, setState, itemId);
};

const dragEnd = (state, setState) => (source, destination) => {
    if (!destination) {
        return;
    }

    const oldParent = state.items[source.parentId];
    const newParent = state.items[destination.parentId];
    const childId = oldParent.children[source.index];
    const child = state.items[childId];

    setState((s) => {
        const nextState = moveItemOnTree(s, source, destination);
        return {
            ...s,
            ...nextState,
            isDragging: false,
            items: {
                ...nextState.items,
                [childId]: {
                    ...child, parent: newParent.id,
                },
            },
        };
    });
    select(state, setState,
        newParent.isExpanded ? oldParent.children[source.index] : newParent.id);
};

const renderItem = (state, setState) => (props) => (
    <TreeItem
        {...props}
        select={select}
        selectedItem={state.selectedItem}
        state={state}
        setState={setState}
    />
);

export default ({ state, setState }) => (
    <div
        className={styles.tree}
        id='tree'
    >
        <Tree
            tree={state}
            renderItem={renderItem(state, setState)}
            onExpand={expand(setState)}
            onCollapse={collapse(setState)}
            onDragStart={dragStart(state, setState)}
            onDragEnd={dragEnd(state, setState)}
            offsetPerLevel={20}
            isDragEnabled
            isNestingEnabled
        />
    </div>
);
