import React from 'react';

export default function Component({ tag, label }) {
    return (
        <>
            <div className={'tag'}>{tag}</div>
            <div className={'label'}>{label}</div>
        </>
    );
}
