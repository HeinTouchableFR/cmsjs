import React from 'react';
import DarkModeButton from 'components/Button/DarkModeButton/DarkModeButton';
import Component from '../../../components/ComponentCollection/Component';
import Head from 'next/head';

export default function Index() {
    return (
        <>
            <Head>
                <link
                    rel='stylesheet'
                    href='https://pro.fontawesome.com/releases/v5.10.0/css/all.css'
                    integrity='sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p'
                    crossOrigin='anonymous'
                />
                <link
                    rel='stylesheet'
                    href='https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css'
                />
            </Head>
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
