import PropTypes from 'prop-types';
import React, {
    useEffect, useState,
} from 'react';
import Head from 'next/head';
import {useTemplates} from 'context/template';
import styled from '@emotion/styled';
import Layout from 'container/RenderPage/Layout';

export default function Header({children, settings, setShowRender, showRender, post}) {
    const {value: dataTemplates} = useTemplates();
    const [content, setContent] = useState([]);
    const [params, setParams] = useState({});
    const [siteName, setSiteName] = useState('');
    const [logo, setLogo] = useState('');

    useEffect(() => {
        if (dataTemplates.templates.header) {
            setShowRender(true);
        } else {
            setShowRender(false);
        }
    }, [dataTemplates]);

    useEffect(() => {
        if (dataTemplates.templates.header) {
            if (dataTemplates.templates.header.template) {
                setContent(JSON.parse(dataTemplates.templates.header.template.content));
                setParams(JSON.parse(dataTemplates.templates.header.template.params));
            }
        }
    }, [dataTemplates]);

    useEffect(() => {
        if (settings.settings) {
            const generalSettings = settings.settings.find((x) => x.id === 'general');
            if (generalSettings) {
                setSiteName(generalSettings.sitename);
                setLogo(generalSettings.logo);
            }
        }
    }, [settings]);

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
                    name='description'
                    content={post.description}
                />
                <meta
                    property='og:locale'
                    content='fr_FR'
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
                    content={`${process.env.URL}/${post.slug}`}
                />
                <meta
                    property='og:site_name'
                    content={siteName}
                />
                <meta
                    property='og:image'
                    content={logo?.image?.url}
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
                    content={logo?.image?.url}
                />
                <script
                    type='application/ld+json'
                >
                    {
                        `
                        {
                        '@context': 'https://schema.org',
                        "@graph": [
                    {
                        "@type": "Organization",
                        "@id": "${process.env.URL}/#organization",
                        "name": "${siteName}",
                        "url": "${process.env.URL}/",
                        "sameAs": [
                        "https://www.facebook.com/SosDepanordiBoulogne/",
                        "https://www.instagram.com/sos_depanordi/",
                        "https://www.youtube.com/channel/UC97u-ojgOB1fPkDAlw3YVNg"
                        ],
                        "logo": {
                        "@type": "ImageObject",
                        "@id": "${process.env.URL}/#logo",
                        "inLanguage": "fr-FR",
                        "url": "${logo.image.url}",
                        "contentUrl": "${logo.image.url}",
                        "caption": "${siteName}"
                    },
                        "image": {
                        "@id": "${process.env.URL}/#logo"
                    }
                    },
                    {
                        "@type": "WebSite",
                        "@id": "${process.env.URL}/#website",
                        "url": "${process.env.URL}/",
                        "name": "${siteName}",
                        "description": "Informatique - High Tech",
                        "publisher": {
                        "@id": "${process.env.URL}/#organization"
                    },
                        "potentialAction": [
                    {
                        "@type": "SearchAction",
                        "target": "${process.env.URL}/?s={search_term_string}",
                        "query-input": "required name=search_term_string"
                    }
                        ],
                        "inLanguage": "fr-FR"
                    },
                    {
                        "@type": "ImageObject",
                        "@id": "${process.env.URL}/#primaryimage",
                        "inLanguage": "fr-FR",
                        "url": "${logo.image.url}",
                        "contentUrl": "${logo.image.url}",
                    },
                    {
                        "@type": "WebPage",
                        "@id": "${process.env.URL}/#webpage",
                        "url": "${process.env.URL}/",
                        "name": "${post.title} | ${siteName}",
                        "isPartOf": {
                        "@id": "${process.env.URL}/#website"
                    },
                        "about": {
                        "@id": "${process.env.URL}/#organization"
                    },
                        "primaryImageOfPage": {
                        "@id": "${process.env.URL}/#primaryimage"
                    },
                        "datePublished": "2021-05-18T09:17:36+00:00",
                        "dateModified": "2021-05-20T17:16:49+00:00",
                        "breadcrumb": {
                        "@id": "${process.env.URL}/#breadcrumb"
                    },
                        "inLanguage": "fr-FR",
                        "potentialAction": [
                    {
                        "@type": "ReadAction",
                        "target": [
                        "${process.env.URL}/"
                        ]
                    }
                        ]
                    },
                    {
                        "@type": "BreadcrumbList",
                        "@id": "${process.env.URL}/#breadcrumb",
                        "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "item": {
                        "@id": "${process.env.URL}/#webpage"
                    }
                    }
                        ]
                    }
                        ]
                    }
                        `
                    }
                </script>
                <title>
                    {post.title}
                    {' | '}
                    {siteName}
                </title>
                <link
                    rel='canonical'
                    href={process.env.URL}
                />
                {children}
            </Head>
            {showRender
            && (
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
            )}
        </>
    );
}

Header.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.shape({}),
        PropTypes.arrayOf(PropTypes.shape({})),
    ]),
    setShowRender: PropTypes.func.isRequired,
    settings: PropTypes.shape({
        settings: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})])),
    }).isRequired,
    showRender: PropTypes.bool.isRequired,
    post: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string,
        description: PropTypes.string,
        slug: PropTypes.string,
        params: PropTypes.string.isRequired,
    }).isRequired,
};

Header.defaultProps = {
    children: [],
};
