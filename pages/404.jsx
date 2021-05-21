import Header from 'container/Sites/Header/Header';
import React, { useState } from 'react';
import { useSettings } from 'context/settings';
import Footer from '../container/Sites/Footer/Footer';

export default function Error404() {
    const { settings } = useSettings();
    const [showRender, setShowRender] = useState(false);

    const [post, setPost] = useState({
        title: 'Error 404',
        published: new Date(),
    });

    return (
        <>
            <Header
                settings={settings}
                setShowRender={setShowRender}
                showRender={showRender}
                post={post}
            />
            <div className='container'>:(</div>
            <Footer
                showRender={showRender}
                setShowRender={setShowRender}
            />
        </>
    );
}
