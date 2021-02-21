import React, { useEffect, useState } from 'react';

//Components
import Title from './Title/Title';
import Text from './Text/Text';
import Image from './Image/Image';

export default function Component({ tag, label, tooltip, color }) {
    return (
        <>
            <div className='ui labeled circular button menu-button' data-tooltip={tooltip} data-position='right center' data-variation='inverted'>
                <div className={`ui button ${color}`}>{tag}</div>
                <a className={`ui basic left pointing label ${color}`}>{label}</a>
            </div>
            <br />
        </>
    );
}

export function ComponentEditor({ element, onElementValeurChange }) {
    const [type, setType] = useState();

    useEffect(
        function () {
            setType(element.type);
        },
        [element]
    );

    return (
        <>
            {type === 'title' && (
                <>
                    <Title element={element} onElementValeurChange={onElementValeurChange} />
                </>
            )}
            {type === 'text' && (
                <>
                    <Text element={element} onElementValeurChange={onElementValeurChange} />
                </>
            )}
            {type === 'image' && (
                <>
                    <Image element={element} onElementValeurChange={onElementValeurChange} />
                </>
            )}
        </>
    );
}
