import React from 'react';
import Tree from '@atlaskit/tree';
import TreeItem from './TreeItem';
import styles from './Tree.module.scss';
import {
    collapse, dragEnd, dragStart, expand, removeNode, select,
} from './utils';

export * from './utils';

const renderItem = (state, setState) => (props) => (
    <TreeItem
        {...props}
        select={select}
        selectedItem={state.selectedItem}
        state={state}
        setState={setState}
        removeNode={removeNode}
    />
);

export default function TreeView({ state, setState }) {
    return (
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
}
