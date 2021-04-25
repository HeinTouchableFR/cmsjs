import React, {
    useEffect, useState,
} from 'react';
import { useIntl } from 'react-intl';
import Head from 'next/head';
import nookies from 'nookies';
import { auth } from 'utils/dbConnect';
import Builder from 'container/Builder/Builder';
import defaultComponents from 'variables/components';
import { useAuth } from 'context/auth';
import PropTypes from 'prop-types';

export default function Edit({ item, errors, images }) {
    const url = 'pages';

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
            data,
            params,
        });
        validate(e.slug).then((errs) => setformErrors(errs));
        setIsSubmitting(true);
    };

    const update = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/pages/auth/${item.id}`, {
                body: JSON.stringify({
                    title: content.title,
                    slug: content.slug,
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

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(formErrors).length === 0) {
                update();
            } else {
                setIsSubmitting(false);
            }
        }
    }, [formErrors]);

    return (
        <>
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
                url={url}
                page={post}
                loading={loading}
                onSubmit={onSubmit}
                setImages={setImagesList}
                images={imagesList}
                modules={defaultComponents.pageComponents(intl)}
                formErrors={formErrors}
                errors={builderErrors}
            />
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

        const resItem = await fetch(`${process.env.URL}/api/pages/auth/${id}`, {
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
