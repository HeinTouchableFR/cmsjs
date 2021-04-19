import React, {useState} from 'react';
import DarkModeButton from 'components/Button/DarkModeButton/DarkModeButton';

export default function Index() {
    const [loading, setLoading] = useState(false)
    return (
        <>
            <DarkModeButton />
            <div className='sandbox-container'>

            </div>
        </>
    );
}
