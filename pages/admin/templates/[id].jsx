import React, {
    useEffect, useState,
} from 'react';
import { useIntl } from 'react-intl';
import Head from 'next/head';
import nookies from 'nookies';
import Builder from 'container/Builder/Builder';
import defaultComponents from 'variables/components';
import { BuilderProvider } from 'context/builder';
import PropTypes from 'prop-types';
import {
    getSession, signIn, useSession,
} from 'next-auth/client';

export default function Edit({ item, images, errors }) {
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

    useEffect(() => {
        if (!session) {
            signIn();
        }
    }, [session]);

    const validate = async () => {
        const errs = {
        };
        return errs;
    };

    const onSubmit = async (e, data, params) => {
        setContent({
            data,
            params,
        });
        validate(e.slug).then((errs) => setformErrors(errs));
        setIsSubmitting(true);
    };

    const update = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/templates/${item.id}`, {
                body: JSON.stringify({
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
            <BuilderProvider
                page={post}
                components={defaultComponents.templateComponents(intl)}
                builderMode='template'
            >
                <Head>
                    <title>
                        {intl.formatMessage({
                            id: 'page.edit', defaultMessage: 'Edit',
                        })}
                        {': '}
                        {item.name}
                    </title>
                </Head>
                <Builder
                    loading={loading}
                    onSubmit={onSubmit}
                    setImages={setImagesList}
                    images={imagesList}
                    formErrors={formErrors}
                    errors={builderErrors}
                />
            </BuilderProvider>
        </>
    );
}

Edit.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string,
    }).isRequired,
    images: PropTypes.string.isRequired,
    errors: PropTypes.oneOfType([
        PropTypes.shape({
        }),
        PropTypes.arrayOf(PropTypes.shape({
        })),
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
    const errors = [];

    if (token) {
        const resItem = await fetch(`${process.env.SERVER}/api/templates/${id}`, {
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
                request: `${process.env.SERVER}/api/templates/${id}`,
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
    }

    return {
        props: {
            item,
            errors,
            images: JSON.stringify(images),
            session,
        },
    };
}
