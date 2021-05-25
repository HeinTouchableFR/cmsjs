import React from 'react';
import DarkModeButton from 'components/Button/DarkModeButton/DarkModeButton';
import Component from 'components/ComponentCollection/Component';

export default function Index() {
    return (
        <>
            <DarkModeButton />
            <div className='sandbox-container'>
                <Component
                    onClick={() => console.log('test')}
                    label='Text'
                    color='purple'
                    icon='fa-align-left'
                />
            </div>
        </>
    );
}
