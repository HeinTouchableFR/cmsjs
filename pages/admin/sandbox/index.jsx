import React from 'react';
import DarkModeButton from 'components/Button/DarkModeButton/DarkModeButton';
import Checkbox from 'components/Form/Checkbox/Checkbox';

export default function Index() {
    return (
        <>
            <DarkModeButton />
            <div className='sandbox-container'>
                <Checkbox onChange={(e, data) => console.log(data)} name='checkbox' label='checkbox' />
            </div>
        </>
    );
}
/*

 */
