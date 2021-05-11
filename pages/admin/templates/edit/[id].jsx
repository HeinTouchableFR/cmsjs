import React, {
    useEffect, useState,
} from 'react';
import { useIntl } from 'react-intl';
import Head from 'next/head';
import nookies from 'nookies';
import { auth } from 'utils/dbConnect';
import Builder from 'container/Builder/Builder';
import defaultComponents from 'variables/components';
import { BuilderProvider } from 'context/builder';
import { useAuth } from 'context/auth';
import PropTypes from 'prop-types';

export default function Edit({ item, images, errors }) {
    const intl = useIntl();

    const { user } = useAuth();
    const [post, setPost] = useState(item);
    const [imagesList, setImagesList] = useState(JSON.parse(images));
    const [loading, setLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formErrors, setformErrors] = useState({
    });
    const [builderErrors, setBuilderErrors] = useState(errors);
    const [content, setContent] = useState('');

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
            const res = await fetch(`/api/templates/auth/${item.id}`, {
                body: JSON.stringify({
                    updated: new Date(),
                    content: JSON.stringify(content.data),
                    params: JSON.stringify(content.params),
                }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
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
                        {item.title}
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
        id: PropTypes.string.isRequired,
        title: PropTypes.string,
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
    try {
        const cookies = nookies.get(ctx);
        const token = await auth.verifyIdToken(cookies.token);

        if (!token.roles.some((r) => ['admin', 'editor', 'moderator'].includes(r))) {
            throw new Error('unauthorized');
        }

        const { id } = ctx.params;

        let item = {
        };
        let images = [];
        const errors = [];

        const resItem = await fetch(`${process.env.URL}/api/templates/${id}`, {
            headers: {
                Authorization: `Bearer ${cookies.token}`,
            },
            credentials: 'same-origin',
        });
        const dataItem = await resItem.json();
        if (dataItem.success) {
            item = dataItem.data;
        } else {
            errors.push({
                ...dataItem.errors,
                request: `${process.env.URL}/api/pages/${id}`,
            });
        }

        const resImages = await fetch(`${process.env.URL}/api/images`, {
            headers: {
                Authorization: `Bearer ${cookies.token}`,
            },
            credentials: 'same-origin',
        });
        const dataImages = await resImages.json();
        if (dataImages.success) {
            images = dataImages.data;
        } else {
            errors.push({
                ...dataImages.errors,
                request: `${process.env.URL}/api/images`,
            });
        }

        return {
            props: {
                item, errors, images: JSON.stringify(images),
            },
        };
    } catch (err) {
        return {
            redirect: {
                permanent: false,
                destination: '/admin/login',
            },
            props: {
            },
        };
    }
}
