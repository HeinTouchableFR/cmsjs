import React, { useState } from 'react';
import TreeView, {
    makeTree,
    node,
    addNode,
    removeSelectedNode,
} from 'components/TreeView';

const initialTree = {
    rootId: 'root',
    selectedItem: '985729261626634541283',
    isDragging: false,
    items: {
        root: {
            id: 'root',
            children: ['985729261626634541283'],
            hasChildren: true,
            isExpanded: true,
            isChildrenLoading: false,
            data: {
                title: 'root',
            },
        },
        '985729261626634541283': {
            id: '985729261626634541283',
            data: {
                title: 'First parent 1',
            },
            hasChildren: true,
            isExpanded: false,
            isChildrenLoading: false,
            children: ['332027231626638866760', '913854991626639099712'],
            parent: 'root',
        },
        '332027231626638866760': {
            id: '332027231626638866760',
            data: {
                title: 'Home Page', type: 'Page', slug: 'home-page',
            },
            hasChildren: false,
            isExpanded: false,
            isChildrenLoading: false,
            children: [],
            parent: '985729261626634541283',
        },
        '439055711626639097845': {
            id: '439055711626639097845',
            data: {
                title: 'Home Page', type: 'Page', slug: 'home-page',
            },
            hasChildren: false,
            isExpanded: false,
            isChildrenLoading: false,
            children: [],
            parent: '390452021626639100908',
        },
        '913854991626639099712': {
            id: '913854991626639099712',
            data: {
                title: 'Home Page', type: 'Page', slug: 'home-page',
            },
            hasChildren: true,
            isExpanded: false,
            isChildrenLoading: false,
            children: ['390452021626639100908'],
            parent: '985729261626634541283',
        },
        '390452021626639100908': {
            id: '390452021626639100908',
            data: {
                title: 'Home Page', type: 'Page', slug: 'home-page',
            },
            hasChildren: true,
            isExpanded: false,
            isChildrenLoading: false,
            children: ['439055711626639097845'],
            parent: '913854991626639099712',
        },
    },
};

export default function Index() {
    const [treeState, setTreeState] = useState(initialTree);
    console.log(treeState);
    return (
        <>
            <div>
                <div className='component-pane'>
                    <h1>Tree View</h1>
                    <div
                        role='toolbar'
                        aria-controls='tree'
                        aria-label='add or remove components'
                    >
                        <button
                            onClick={() => removeSelectedNode({
treeState, setTreeState,
})}
                            aria-label='remove component'
                        >
                            −
                        </button>
                        <button
                            onClick={() => addNode(treeState, setTreeState, node('New item', {
}, []))}
                            aria-label='add component'
                        >
                            +
                        </button>
                    </div>
                    <TreeView
                        state={treeState}
                        setState={setTreeState}
                    />
                </div>
            </div>
        </>
    );
}
