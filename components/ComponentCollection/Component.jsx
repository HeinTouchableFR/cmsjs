import React, { useEffect, useState } from 'react';

//Components
import Title from './Title/Title';
import Text from './Text/Text';
import Image from './Image/Image';

export default function Component({ tag, label }) {
    return (
        <>
            <div className={'tag'}>{tag}</div>
            <div className={'label'}>{label}</div>
        </>
    );
}

export function ComponentEditor({ element, onElementValueChange, device }) {
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
                    <Title element={element} onElementValueChange={onElementValueChange} device={device} />
                </>
            )}
            {type === 'text' && (
                <>
                    <Text element={element} onElementValueChange={onElementValueChange} />
                </>
            )}
            {type === 'image' && (
                <>
                    <Image element={element} onElementValueChange={onElementValueChange} />
                </>
            )}
        </>
    );
}
