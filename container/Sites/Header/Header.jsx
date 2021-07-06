import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import Head from 'next/head';
import styled from '@emotion/styled';
import Layout from 'container/RenderPost/Layout';

export default function Header({ children,
    post,
    template,
    isHomePage }) {
    const logo = template.settings.find((x) => x.data === 'logo').image ? `${process.env.MEDIA_SERVER}/${template.settings.find((x) => x.data === 'logo')?.image.name}` : `${process.env.SERVER}/logo.png`;

    useEffect(() => {
        document.documentElement.lang = process.env.LOCALE;
    }, [process.env.LOCALE]);

    const Sticky = styled.div({
        position: 'sticky',
        width: '100%',
        zIndex: '1000',
        backgroundColor: template.post.params.background,
        top: '0',
    });

    const HeaderComponent = styled.header({
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
                    name='google-site-verification'
                    content='fkX0m0u6X-RPUgW6VmS5O5uGI4aCyw12hrHWmtANcO8'
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
                    content={`${post.title} | ${template.settings.find((x) => x.data === 'sitename')?.value}`}
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
                    content={template.settings.find((x) => x.data === 'sitename')?.value}
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
                    content={template.settings.find((x) => x.data === 'sitename')?.value}
                />
                <meta
                    name='twitter:title'
                    content={`${post.title} | ${template.settings.find((x) => x.data === 'sitename')?.value}`}
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
                                    name: `${template.settings.find((x) => x.data === 'sitename')?.value}`,
                                    url: `${process.env.SERVER}/`,
                                    sameAs: [
                                        template.settings?.find((x) => x.data === 'facebook')?.value,
                                        template.settings?.find((x) => x.data === 'twitter')?.value,
                                        template.settings?.find((x) => x.data === 'instagram')?.value,
                                        template.settings?.find((x) => x.data === 'linkedin')?.value,
                                    ],
                                    logo: {
                                        '@type': 'ImageObject',
                                        '@id': `${process.env.SERVER}/#logo`,
                                        inLanguage: `${process.env.LOCALE}`,
                                        url: `${logo}`,
                                        contentUrl: `${logo}`,
                                        caption: `${template.settings.find((x) => x.data === 'sitename')?.value}`,
                                    },
                                    image: {
                                        '@id': `${process.env.SERVER}/#logo`,
                                    },
                                },
                                {
                                    '@type': 'WebSite',
                                    '@id': `${process.env.SERVER}/#website`,
                                    url: `${process.env.SERVER}/`,
                                    name: `${template.settings.find((x) => x.data === 'sitename')?.value}`,
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
                                    name: `${post.title} | ${template.settings.find((x) => x.data === 'sitename')?.value}`,
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
                    {template.settings.find((x) => x.data === 'sitename')?.value}
                </title>
                <link
                    rel='canonical'
                    href={`${isHomePage ? process.env.SERVER : `${process.env.SERVER}/${post.slug}`}`}
                />
                {children}
            </Head>
            <Sticky>
                <HeaderComponent>
                    {template.post.content.map((layout) => (
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
    post: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string,
        description: PropTypes.string,
        slug: PropTypes.string,
        published: PropTypes.string,
        updated: PropTypes.string,
        params: PropTypes.shape({
        }),
    }).isRequired,
    template: PropTypes.shape({
        post: PropTypes.shape({
            content: PropTypes.arrayOf(PropTypes.shape({
            })),
            params: PropTypes.shape({
            }),
        }).isRequired,
        settings: PropTypes.arrayOf(PropTypes.shape({
        })).isRequired,
    }).isRequired,
    isHomePage: PropTypes.bool,
};

Header.defaultProps = {
    children: [],
    isHomePage: false,
};
