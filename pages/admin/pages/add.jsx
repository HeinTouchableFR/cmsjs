import React, {
    useEffect, useState,
} from 'react';
import { useIntl } from 'react-intl';
import Head from 'next/head';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import Builder from 'container/Builder/Builder';
import { auth } from 'utils/dbConnect';
import defaultComponents from 'variables/components';
import { useAuth } from 'context/auth';
import PropTypes from 'prop-types';
import { BuilderProvider } from '../../../context/builder';

export default function Add({ images, errors }) {
    const url = 'pages';

    const intl = useIntl();
    const { user } = useAuth();

    const [imagesList, setImagesList] = useState(JSON.parse(images));
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [builderErrors, setBuilderErrors] = useState(errors);
    const [formErrors, setFormErrors] = useState({
    });
    const [content, setContent] = useState('');

    const validate = async (slug) => {
        const res = await fetch(`/api/pages/slug/${slug}`);
        const { data } = await res.json();
        const errs = {
        };
        if (data && data.slug) {
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
            data,
            params,
        });
        validate(e.slug).then((errs) => setFormErrors(errs));
        setIsSubmitting(true);
    };

    const create = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/pages/auth', {
                body: JSON.stringify({
                    title: content.title,
                    slug: content.slug,
                    author: 'A faire',
                    published: new Date(),
                    content: JSON.stringify(content.data),
                    params: JSON.stringify(content.params),
                }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
                credentials: 'same-origin',
                method: 'POST',
            });

            const result = await res.json();
            if (!result.success) {
                setBuilderErrors([result.errors]);
            }
            await router.push(`/admin/${url}/edit/${result.data.id}`);
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
            <BuilderProvider
                components={defaultComponents.pageComponents(intl)}
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
                />
            </BuilderProvider>
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
};

export async function getServerSideProps(ctx) {
    try {
        const cookies = nookies.get(ctx);
        const token = await auth.verifyIdToken(cookies.token);

        if (!token.roles.some((r) => ['admin', 'editor', 'moderator'].includes(r))) {
            throw new Error('unauthorized');
        }

        const errors = [];
        let images = [];

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
                images: JSON.stringify(images),
                errors,
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
