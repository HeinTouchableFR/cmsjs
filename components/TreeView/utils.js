import {
    moveItemOnTree, mutateTree,
} from '@atlaskit/tree';
import produce from 'immer';

const node = (title, data, children) => ({
    id: `${(`${Math.random().toString(10)}00000000000000000`).slice(2, 10)}${Date.now()}`,
    data: {
        title, ...data,
    },
    hasChildren: !!children.length,
    isExpanded: !!children.length,
    isChildrenLoading: false,
    children,
});

const flattenNodes = (root, nodes, parent) => nodes.reduce((acc, node) => ({
    ...acc,
    [node.id]: {
        ...node,
        parent,
        children: node.children.map((child) => child.id),
    },
    ...flattenNodes(root, node.children, node.id),
}),
root);

const makeTree = (nodes) => ({
    rootId: 'root',
    selectedItem: null,
    isDragging: false,
    items: {
        root: {
            id: 'root',
            children: nodes.map((node) => node.id),
            hasChildren: true,
            isExpanded: true,
            isChildrenLoading: false,
            data: {
                title: 'root',
            },
        },
        ...flattenNodes({
        }, nodes, 'root'),
    },
});

const findNextNode = (state, itemId, traverseChildren = true) => {
    const item = state.items[itemId];
    const parent = state.items[item.parent];

    if (!parent) return item.children[0];

    if (item.isExpanded && item.children[0] && traverseChildren) return item.children[0];

    const itemsIndex = parent.children.indexOf(itemId);

    if (!parent.children[itemsIndex + 1]) {
        return findNextNode(state, parent.id, false);
    }

    return parent.children[itemsIndex + 1];
};

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

const select = (state, setState, itemId) => {
    setState(produce((draft) => selectItem(draft, itemId)));
};

const addNode = (state, setState, node) => {
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

const removeNode = (state, setState, itemId) => {
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

export { dragStart,
    dragEnd,
    removeNode,
    makeTree,
    node,
    addNode,
    collapse,
    select,
    expand,
    findNextNode,
    selectItem };
