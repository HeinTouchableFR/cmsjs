import Header from 'container/Sites/Header/Header';
import React, {useState} from 'react';
import {useSettings} from 'context/settings';

export default function Error404() {
    const {settings} = useSettings()
    const [showRender, setShowRender] = useState(false)

    return (
        <>
            <Header title={`Error 404`} settings={settings} setShowRender={setShowRender} showRender={showRender}/>
            <div className='container'>:(</div>
        </>
    );
}
