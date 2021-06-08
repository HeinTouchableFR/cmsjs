import React, {
    useEffect, useState,
} from 'react';
import { useIntl } from 'react-intl';
import Head from 'next/head';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import Builder from 'container/Builder/Builder';
import defaultComponents from 'variables/components';
import PropTypes from 'prop-types';
import {
    getSession, signIn, useSession,
} from 'next-auth/client';
import { BuilderProvider } from 'context/builder';

export default function Add({ images, errors, templates }) {
    const intl = useIntl();

    const [imagesList, setImagesList] = useState(JSON.parse(images));
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [session] = useSession();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [builderErrors, setBuilderErrors] = useState(errors);
    const [formErrors, setFormErrors] = useState({
    });
    const [content, setContent] = useState('');

    useEffect(async () => {
        if (!session) {
            await signIn();
        }
    }, [session]);

    const validate = async () => {
        const errs = {
        };
        return errs;
    };

    const onSubmit = async (e, data, params) => {
        setContent({
            name: e.title,
            type: e.type,
            data,
            params,
        });
        validate(e.slug).then((errs) => setFormErrors(errs));
        setIsSubmitting(true);
    };

    const create = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/templates', {
                body: JSON.stringify({
                    name: content.name,
                    type: content.type,
                    content: JSON.stringify(content.data),
                    params: JSON.stringify(content.params),
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
            });

            const result = await res.json();
            if (!result.success) {
                setBuilderErrors([result.errors]);
            }
            await router.push(`/admin/templates/${result.data.id}`);
        } catch (err) {
            setBuilderErrors([err]);
        }
        setLoading(false);
    };

    useEffect(async () => {
        if (isSubmitting) {
            if (Object.keys(formErrors).length === 0) {
                await create();
            } else {
                setIsSubmitting(false);
            }
        }
    }, [formErrors]);

    return (
        <>
            {session && (
            <BuilderProvider
                components={defaultComponents.templateComponents(intl)}
                builderMode='template'
            >
                <Head>
                    <title>
                        {intl.formatMessage({
                            id: 'page.addNew', defaultMessage: 'Add a new page',
                        })}
                    </title>
                </Head>
                <Builder
                    onSubmit={onSubmit}
                    loading={loading}
                    images={imagesList}
                    setImages={setImagesList}
                    formErrors={formErrors}
                    errors={builderErrors}
                    templates={templates}
                />
            </BuilderProvider>
            )}
        </>
    );
}

Add.propTypes = {
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
    const token = process.env.NODE_ENV === 'production' ? cookies['__Secure-next-auth.session-token'] : cookies['next-auth.session-token'];

    const errors = [];
    let images = [];
    let templates = [];

    if (token) {
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
            images: JSON.stringify(images),
            errors,
            templates,
            session,
        },
    };
}
