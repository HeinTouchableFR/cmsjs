import React, {
    useEffect, useState,
} from 'react';
import { useIntl } from 'react-intl';
import Head from 'next/head';
import nookies from 'nookies';
import Builder from 'container/Builder/Builder';
import defaultComponents from 'variables/components';
import PropTypes from 'prop-types';
import { BuilderProvider } from 'context/builder';
import {
    getSession, signIn, useSession,
} from 'next-auth/client';

export default function Edit({ item, errors, images, templates }) {
    const intl = useIntl();

    const [post, setPost] = useState(item);
    const [imagesList, setImagesList] = useState(JSON.parse(images));
    const [loading, setLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formErrors, setformErrors] = useState({
    });
    const [builderErrors, setBuilderErrors] = useState(errors);
    const [content, setContent] = useState('');
    const [session] = useSession();

    useEffect(async () => {
        if (!session) {
            await signIn();
        }
    }, [session]);

    const validate = async (slug) => {
        const res = await fetch(`/api/pages/slug/${slug}`);
        const { data } = await res.json();
        const errs = {
        };
        if (data && data.slug && post.slug !== slug) {
            errs.slug = intl.formatMessage({
                id: 'slug.error', defaultMessage: 'The slug {slug} is already defined',
            }, {
                slug,
            });
        }
        return errs;
    };

    const onSubmit = async (e, data, params) => {
        setContent({
            title: e.title,
            slug: e.slug,
            description: e.description,
            data,
            params,
        });
        validate(e.slug).then((errs) => setformErrors(errs));
        setIsSubmitting(true);
    };

    const update = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/pages/${item.id}`, {
                body: JSON.stringify({
                    title: content.title,
                    slug: content.slug,
                    description: content.description,
                    updated: new Date(),
                    content: JSON.stringify(content.data),
                    params: JSON.stringify(content.params),
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'same-origin',
                method: 'PUT',
            });

            const result = await res.json();
            if (result.success) {
                setPost(result.data);
            } else {
                setBuilderErrors([result.errors]);
            }
        } catch (err) {
            setBuilderErrors([err]);
        }
        setLoading(false);
    };

    useEffect(async () => {
        if (isSubmitting) {
            if (Object.keys(formErrors).length === 0) {
                await update();
            } else {
                setIsSubmitting(false);
            }
        }
    }, [formErrors]);

    return (
        <>
            {session && (
            <BuilderProvider
                post={post}
                components={defaultComponents.pageComponents(intl)}
            >
                <Head>
                    <title>
                        {intl.formatMessage({
                            id: 'page.edit', defaultMessage: 'Edit',
                        })}
                        {': '}
                        {item.title}
                    </title>
                </Head>
                <Builder
                    loading={loading}
                    onSubmit={onSubmit}
                    setImages={setImagesList}
                    images={imagesList}
                    formErrors={formErrors}
                    templates={templates}
                    errors={builderErrors}
                />
            </BuilderProvider>
            )}
        </>
    );
}

Edit.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string,
    }).isRequired,
    images: PropTypes.string.isRequired,
    errors: PropTypes.oneOfType([
        PropTypes.shape({
        }),
        PropTypes.arrayOf(PropTypes.shape({
        })),
    ]).isRequired,
    templates: PropTypes.shape([
    ]).isRequired,
};

export async function getServerSideProps(ctx) {
    const authorized = ['ADMIN', 'EDITOR', 'MODERATOR'];
    const session = await getSession(ctx);
    if (session && !authorized.includes(session.user.role)) {
        return {
            props: {
            },
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }
    const cookies = nookies.get(ctx);
    const token = process.env.NODE_ENV === 'production' ? cookies['__Secure-next-auth.session-token'] : cookies['next-auth.session-token']

    const { id } = ctx.params;
    let item = {
    };
    let images = [];
    let templates = [];
    const errors = [];

    if (token) {
        const resItem = await fetch(`${process.env.SERVER}/api/pages/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: 'same-origin',
        });
        const dataItem = await resItem.json();
        if (dataItem.success) {
            item = dataItem.data;
        } else {
            errors.push({
                ...dataItem.errors,
                request: `${process.env.SERVER}/api/pages/${id}`,
            });
        }

        const resImages = await fetch(`${process.env.SERVER}/api/images`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: 'same-origin',
        });
        const dataImages = await resImages.json();
        if (dataImages.success) {
            images = dataImages.data;
        } else {
            errors.push({
                ...dataImages.errors,
                request: `${process.env.SERVER}/api/images`,
            });
        }

        const resTemplates = await fetch(`${process.env.SERVER}/api/templates/getHeaderFooter`, {
            credentials: 'same-origin',
        });
        const dataTemplates = await resTemplates.json();
        if (dataTemplates.success && dataTemplates.data) {
            templates = dataTemplates.data;
        }
    }

    return {
        props: {
            item,
            errors,
            templates,
            images: JSON.stringify(images),
            session,
        },
    };
}
