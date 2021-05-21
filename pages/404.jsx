import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useIntl } from 'react-intl';

export default function Error() {
    const intl = useIntl();

    return (
        <>
            <Head>
                <title>404: This page could not be found</title>
            </Head>
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
                                {intl.formatMessage({
                                    id: 'error.404.lost', defaultMessage: 'Uh oh! Looks like you got lost.',
                                })}
                                <br />
                                {intl.formatMessage({
                                    id: 'error.404.goBack', defaultMessage: 'Go back to the homepage if you dare!',
                                })}
                            </p>
                            <Link href='/'>
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <a>
                                    {intl.formatMessage({
                                        id: 'error.404.iDare', defaultMessage: 'I dare !',
                                    })}
                                </a>
                            </Link>
                        </article>
                    </div>

                </div>
            </section>
        </>
    );
}
