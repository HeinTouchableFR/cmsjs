import React, {useEffect, useState} from 'react';
import { useIntl } from 'react-intl';
import Head from 'next/head';
import axios from 'axios';
import nookies from 'nookies';
import { auth } from 'utils/dbConnect';
import Builder from 'container/Builder/Builder';
import defaultComponents from 'variables/components';

export default function Edit({ item, images }) {
    const url = 'pages';

    const intl = useIntl();

    const [post, setPost] = useState(item);
    const [imagesList, setImagesList] = useState(JSON.parse(images));
    const [loading, setLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({
    });
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

    const onSubmit = async (e, data) => {
        setContent({
            title: e.title,
            slug: e.slug,
            data,
        });
        validate(e.slug).then((errs) => setErrors(errs));
        setIsSubmitting(true);
    };

    const update = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/pages/${item.id}`, {
                body: JSON.stringify({
                    title: content.title,
                    slug: content.slug,
                    updated: new Date(),
                    content: JSON.stringify(content.data),
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'PUT',
            });

            const result = await res.json();
            setPost(result.data);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                update();
            } else {
                setIsSubmitting(false);
            }
        }
    }, [errors]);

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
                errors={errors}
            />
        </>
    );
}

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
        let errors = [];

        await axios
            .get(`${process.env.URL}/api/pages/${id}`)
            .then((res) => {
                item = res.data.data;
            })
            .catch((error) => {
                errors = JSON.stringify(error);
            });

        let images = [];
        await axios
            .get(`${process.env.URL}/api/images`)
            .then((res) => {
                images = res.data.data;
            })
            .catch(() => {
            });

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
