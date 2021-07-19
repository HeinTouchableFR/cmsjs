export const node = (title, data, children) => ({
    id: `${(`${Math.random().toString(10)}00000000000000000`).slice(2, 10)}${Date.now()}`,
    data: {
        title, ...data,
    },
    hasChildren: !!children.length,
    isExpanded: !!children.length,
    isChildrenLoading: false,
    children,
});

export const makeTree = (nodes) => ({
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

export const findNextNode = (state, itemId, traverseChildren = true) => {
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

const findLastExpandedChild = (state, itemId) => {
    const item = state.items[itemId];

    if (item.hasChildren && item.isExpanded) return findLastExpandedChild(state, item.children[item.children.length - 1]);
    return itemId;
};
