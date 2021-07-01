import PropTypes from 'prop-types';
import React, {
    useEffect, useState,
} from 'react';
import Head from 'next/head';
import styled from '@emotion/styled';
import Layout from 'container/RenderPost/Layout';

export default function Header({ children,
    settings,
    post,
    template,
    isHomePage }) {
    const [content] = useState(template.content ? JSON.parse(template.content) : []);
    const [params] = useState(template.params ? JSON.parse(template.params) : []);
    const [siteName, setSiteName] = useState('');
    const [logo, setLogo] = useState('');

    useEffect(() => {
        if (settings.settings) {
            setSiteName(settings.settings.find((x) => x.data === 'sitename')?.value);

            const logoSetting = settings.settings.find((x) => x.data === 'logo');
            if (logoSetting) {
                setLogo(logoSetting.image ? `${process.env.MEDIA_SERVER}/${settings.settings.find((x) => x.data === 'logo')?.image.name}` : `${process.env.SERVER}/logo.png`);
            }
        }
    }, [settings]);

    useEffect(() => {
        document.documentElement.lang = process.env.LOCALE;
    }, [process.env.LOCALE]);

    const Sticky = styled.div({
        position: 'sticky',
        width: '100%',
        zIndex: '1000',
        backgroundColor: params.background,
        top: '0',
    });

    const HeaderComponent = styled.header({
        maxWidth: '1370px',
        paddingLeft: '20px',
        paddingRight: '20px',
        marginLeft: 'auto',
        marginRight: 'auto',
        alignItems: 'center',
    });

    return (
        <>
            <Head>
                <link
                    rel='stylesheet'
                    href='https://pro.fontawesome.com/releases/v5.10.0/css/all.css'
                    integrity='sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p'
                    crossOrigin='anonymous'
                />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1.0,  user-scalable=no'
                />
                <meta
                    httpEquiv='X-UA-Compatible'
                    content='ie=edge'
                />
                <meta
                    name='robots'
                    content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
                />
                <meta
                    name='language'
                    content={process.env.LOCALE}
                />
                <meta
                    name='description'
                    content={post.description}
                />
                <meta
                    property='og:locale'
                    content={process.env.LOCALE}
                />
                <meta
                    property='og:type'
                    content='website'
                />
                <meta
                    property='og:title'
                    content={`${post.title} | ${siteName}`}
                />
                <meta
                    property='og:description'
                    content={post.description}
                />
                <meta
                    property='og:url'
                    content={`${process.env.SERVER}/${post.slug}`}
                />
                <meta
                    property='og:site_name'
                    content={siteName}
                />
                <meta
                    property='og:image'
                    content={logo}
                />
                <meta
                    name='twitter:card'
                    content='summary'
                />
                <meta
                    name='twitter:site'
                    content={siteName}
                />
                <meta
                    name='twitter:title'
                    content={`${post.title} | ${siteName}`}
                />
                <meta
                    name='twitter:description'
                    content={post.description}
                />
                <meta
                    name='twitter:image'
                    content={logo}
                />
                <script
                    type='application/ld+json'
                >
                    {
                        JSON.stringify({
                            '@context': 'https://schema.org',
                            '@graph': [
                                {
                                    '@type': 'Organization',
                                    '@id': `${process.env.SERVER}/#organization`,
                                    name: `${siteName}`,
                                    url: `${process.env.SERVER}/`,
                                    sameAs: [
                                        settings?.settings?.find((x) => x.data === 'facebook')?.value,
                                        settings?.settings?.find((x) => x.data === 'twitter')?.value,
                                        settings?.settings?.find((x) => x.data === 'instagram')?.value,
                                        settings?.settings?.find((x) => x.data === 'linkedin')?.value,
                                    ],
                                    logo: {
                                        '@type': 'ImageObject',
                                        '@id': `${process.env.SERVER}/#logo`,
                                        inLanguage: `${process.env.LOCALE}`,
                                        url: `${logo}`,
                                        contentUrl: `${logo}`,
                                        caption: `${siteName}`,
                                    },
                                    image: {
                                        '@id': `${process.env.SERVER}/#logo`,
                                    },
                                },
                                {
                                    '@type': 'WebSite',
                                    '@id': `${process.env.SERVER}/#website`,
                                    url: `${process.env.SERVER}/`,
                                    name: `${siteName}`,
                                    description: 'Informatique - High Tech',
                                    publisher: {
                                        '@id': `${process.env.SERVER}/#organization`,
                                    },
                                    potentialAction: [
                                        {
                                            '@type': 'SearchAction',
                                            target: `${process.env.SERVER}/?s={search_term_string}`,
                                            'query-input': 'required name=search_term_string',
                                        },
                                    ],
                                    inLanguage: `${process.env.LOCALE}`,
                                },
                                {
                                    '@type': 'ImageObject',
                                    '@id': `${process.env.SERVER}/#primaryimage`,
                                    inLanguage: `${process.env.LOCALE}`,
                                    url: `${logo}`,
                                    contentUrl: `${logo}`,
                                },
                                {
                                    '@type': 'WebPage',
                                    '@id': `${process.env.SERVER}/#webpage`,
                                    url: `${process.env.SERVER}`,
                                    name: `${post.title} | ${siteName}`,
                                    isPartOf: {
                                        '@id': `${process.env.SERVER}/#website`,
                                    },
                                    about: {
                                        '@id': `${process.env.SERVER}/#organization`,
                                    },
                                    primaryImageOfPage: {
                                        '@id': `${process.env.SERVER}/#primaryimage`,
                                    },
                                    datePublished: new Date(post.published),
                                    dateModified: post.updated
                                        ? new Date(post.updated)
                                        : new Date(post.published),
                                    breadcrumb: {
                                        '@id': `${process.env.SERVER}/#breadcrumb`,
                                    },
                                    inLanguage: `${process.env.LOCALE}`,
                                    potentialAction: [
                                        {
                                            '@type': 'ReadAction',
                                            target: [
                                                `${process.env.SERVER}/`,
                                            ],
                                        },
                                    ],
                                },
                                {
                                    '@type': 'BreadcrumbList',
                                    '@id': `${process.env.SERVER}/#breadcrumb`,
                                    itemListElement: [
                                        {
                                            '@type': 'ListItem',
                                            position: 1,
                                            item: {
                                                '@id': `${process.env.SERVER}/#webpage`,
                                            },
                                        },
                                    ],
                                },
                            ],
                        })
                    }
                </script>
                <title>
                    {post.title}
                    {' | '}
                    {siteName}
                </title>
                <link
                    rel='canonical'
                    href={`${isHomePage ? process.env.SERVER : `${process.env.SERVER}/${post.slug}`}`}
                />
                {children}
            </Head>
            <Sticky>
                <HeaderComponent>
                    {content.map((layout) => (
                        <Layout
                            layout={layout}
                            alignCenter
                            key={layout.id}
                        />
                    ))}
                </HeaderComponent>
            </Sticky>
        </>
    );
}

Header.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.shape({
        }),
        PropTypes.arrayOf(PropTypes.shape({
        })),
    ]),
    settings: PropTypes.shape({
        settings: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
        })])),
    }).isRequired,
    post: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string,
        description: PropTypes.string,
        slug: PropTypes.string,
        published: PropTypes.string,
        updated: PropTypes.string,
        params: PropTypes.string.isRequired,
    }).isRequired,
    template: PropTypes.shape({
        content: PropTypes.string,
        params: PropTypes.string,
    }).isRequired,
    isHomePage: PropTypes.bool,
};

Header.defaultProps = {
    children: [],
    isHomePage: false,
};
