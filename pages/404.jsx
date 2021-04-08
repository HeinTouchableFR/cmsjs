import Header from 'container/Sites/Header/Header';
import React, {useState} from 'react';
import {useSiteName} from '../context/siteName';

export default function Error404() {
    const {siteName} = useSiteName()
    const [showRender, setShowRender] = useState(false)

    return (
        <>
            <Header title={`Error 404 | ${siteName}`} setShowRender={setShowRender} showRender={showRender}/>
            <div className='container'>:(</div>
        </>
    );
}
