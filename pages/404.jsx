import Header from 'container/Sites/Header/Header';
import React, { useState } from 'react';
import { useSettings } from 'context/settings';
import Link from 'next/link';
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
            <section className='wrapper'>
                <div className='container'>
                    <div
                        id='scene'
                        className='scene'
                        data-hover-only='false'
                    >
                        <div
                            className='circle'
                            data-depth='1.2'
                        />
                        <div
                            className='one'
                            data-depth='0.9'
                        >
                            <div className='content'>
                                <span className='piece' />
                                <span className='piece' />
                                <span className='piece' />
                            </div>
                        </div>
                        <div
                            className='two'
                            data-depth='0.60'
                        >
                            <div className='content'>
                                <span className='piece' />
                                <span className='piece' />
                                <span className='piece' />
                            </div>
                        </div>
                        <div
                            className='three'
                            data-depth='0.40'
                        >
                            <div className='content'>
                                <span className='piece' />
                                <span className='piece' />
                                <span className='piece' />
                            </div>
                        </div>
                        <p
                            className='p404'
                            data-depth='0.50'
                        >
                            404
                        </p>
                        <p
                            className='p404'
                            data-depth='0.10'
                        >
                            404
                        </p>
                    </div>
                    <div className='text'>
                        <article>
                            <p>
                                Uh oh! Looks like you got lost.
                                <br />
                                Go back to the homepage if you dare!
                            </p>
                            <Link href='/'>
                                <a>i dare !</a>
                            </Link>
                        </article>
                    </div>

                </div>
            </section>
        </>
    );
}
