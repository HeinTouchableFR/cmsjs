import React, { useState } from 'react';
import Head from 'next/head';
import { useIntl } from 'react-intl';
import nookies from 'nookies';
import Admin from 'container/Admin/Admin';
import {
    getSession, useSession,
} from 'next-auth/client';
import Flash from 'components/Flash/Flash';
import PropTypes from 'prop-types';
import Tab from 'components/Tab/Tab';
import Input from 'components/Form/Input/Input';
import Button from 'components/Button/Button';
import TextArea from 'components/Form/TextArea/TextArea';
import FileManager from 'components/FileManager/FileManager';

export default function Index({ settings, pages, images, templates, errors }) {
    const intl = useIntl();
    const [indexErrors, setIndexErrors] = useState(errors);
    const [session] = useSession();
    const [allImages, setImages] = useState(images)
    const [generalForm, setGeneralForm] = useState({
        sitename: {
            type: 'value',
            value: settings.find((x) => x.data === 'sitename').value,
        },
        description: {
            type: 'value',
            value: settings.find((x) => x.data === 'description').value,
        },
        logo: {
            type: 'image',
            image: settings.find((x) => x.data === 'logo').image,
        },
    });
    const [socialForm, setSocialForm] = useState({
        facebook:{
            type: 'value',
            value: settings.find((x) => x.data === 'facebook').value,
        },
        twitter: {
            type: 'value',
            value: settings.find((x) => x.data === 'twitter').value,
        },
        linkedin: {
            type: 'value',
            value: settings.find((x) => x.data === 'linkedin').value,
        },
        instagram: {
            type: 'value',
            value: settings.find((x) => x.data === 'instagram').value,
        },
    });
    const [loading, setLoading] = useState(false);

    const handleSocialsChange = (_e, data) => {
        const updated = {
            ...socialForm,
            [data.name]: {
                ...socialForm[data.name],
                value: data.value,
            },
        };
        setSocialForm(updated);
    };

    const handleGeneralChange = (_e, data) => {
        const updated = {
            ...generalForm,
            [data.name]: {
                ...generalForm[data.name],
                value: data.value,
            },
        };
        setGeneralForm(updated);
    };

    const handleLogoChange = (file) => {
        const updated = {
            ...generalForm,
            logo: {
                ...generalForm.logo,
                image: file,
            },
        };
        setGeneralForm(updated);
    };

    const handleSubmitSocials = async (e) => {
        e.preventDefault();
        setLoading(true);
        const resSocials = await fetch('/api/settings', {
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
            method: 'PUT',
            body: JSON.stringify({
                facebook: socialForm.facebook,
                twitter: socialForm.twitter,
                linkedin: socialForm.linkedin,
                instagram: socialForm.instagram,
            }),
        });
        const data = await resSocials.json();
        if (!data.success) {
            setIndexErrors([data.errors]);
        } else {
            window.location.assign('/admin/settings');
        }
        setLoading(false);
    };

    const handleSubmitGeneral = async (e) => {
        e.preventDefault();
        setLoading(true);
        const resSocials = await fetch('/api/settings', {
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
            method: 'PUT',
            body: JSON.stringify({
                sitename: generalForm.sitename,
                description: generalForm.description,
                logo: generalForm.logo,
            }),
        });
        const data = await resSocials.json();
        if (!data.success) {
            setIndexErrors([data.errors]);
        } else {
            window.location.assign('/admin/settings');
        }
        setLoading(false);
    };

    const panes = [
        {
            label: intl.formatMessage({
                id: 'settings.general',
                defaultMessage: 'General',
            }),
            render: () => (
                <Tab.Pane>
                    <form onSubmit={handleSubmitGeneral}>
                        <Input
                            name='sitename'
                            defaultValue={generalForm.sitename.value}
                            label={intl.formatMessage({
                                id: 'sitename', defaultMessage: 'Site name',
                            })}
                            type='text'
                            required
                            onChange={handleGeneralChange}
                        />
                        <TextArea
                            name='description'
                            defaultValue={generalForm.description.value}
                            label='Description'
                            type='text'
                            required
                            onChange={handleGeneralChange}
                        />
                        <FileManager
                            images={allImages}
                            setImages={setImages}
                            currentFiles={generalForm.logo.image ? [generalForm.logo.image] : []}
                            setCurrentFiles={handleLogoChange}
                            multiple={false}
                        />
                        <Button
                            label={intl.formatMessage({
                                id: 'update', defaultMessage: 'Update',
                            })}
                            loading={loading}
                            type='submit'
                        />
                    </form>
                </Tab.Pane>
            ),
        },
        {
            label: intl.formatMessage({
                id: 'settings.socials',
                defaultMessage: 'Socials',
            }),
            render: () => (
                <Tab.Pane>
                    <form onSubmit={handleSubmitSocials}>
                        <Input
                            name='facebook'
                            defaultValue={socialForm.facebook.value}
                            label='Facebook'
                            type='text'
                            onChange={handleSocialsChange}
                        />
                        <Input
                            name='twitter'
                            defaultValue={socialForm.twitter.value}
                            label='Twitter'
                            type='text'
                            onChange={handleSocialsChange}
                        />
                        <Input
                            name='instagram'
                            defaultValue={socialForm.instagram.value}
                            label='Instagram'
                            type='text'
                            onChange={handleSocialsChange}
                        />
                        <Input
                            name='linkedin'
                            defaultValue={socialForm.linkedin.value}
                            label='Linkedin'
                            type='text'
                            onChange={handleSocialsChange}
                        />
                        <Button
                            label={intl.formatMessage({
                                id: 'update', defaultMessage: 'Update',
                            })}
                            loading={loading}
                            type='submit'
                        />
                    </form>
                </Tab.Pane>
            ),
        },
    ];

    return (
        <>
            {session && (
                <>
                    <Head>
                        <title>
                            {intl.formatMessage({
                                id: 'settings', defaultMessage: 'Settings',
                            })}
                        </title>
                    </Head>
                    <Admin>
                        {indexErrors
                        && indexErrors.map((error, index) => (
                            <Flash
                                key={index}
                                error={error}
                            />
                        ))}
                        <Tab
                            panes={panes}
                        />
                    </Admin>
                </>
            )}
        </>
    );
}

Index.propTypes = {
    pages: PropTypes.oneOfType([
        PropTypes.shape({
        }),
        PropTypes.arrayOf(PropTypes.shape({
        })),
    ]).isRequired,
    images: PropTypes.oneOfType([
        PropTypes.shape({
        }),
        PropTypes.arrayOf(PropTypes.shape({
        })),
    ]).isRequired,
    templates: PropTypes.oneOfType([
        PropTypes.shape({
        }),
        PropTypes.arrayOf(PropTypes.shape({
        })),
    ]).isRequired,
    settings: PropTypes.oneOfType([
        PropTypes.shape({
        }),
        PropTypes.arrayOf(PropTypes.shape({
        })),
    ]).isRequired,
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
    const token = process.env.NODE_ENV === 'production' ? cookies['__Secure-next-auth.session-token'] : cookies['next-auth.session-token'];

    const errors = [];
    let settings = [];
    let pages = [];
    let images = [];
    let templates = [];

    if (token) {
        const resPages = await fetch(`${process.env.SERVER}/api/pages`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: 'same-origin',
        });
        const data = await resPages.json();
        if (data.success) {
            pages = data.data;
        } else {
            errors.push(data.errors);
        }

        const resSettings = await fetch(`${process.env.SERVER}/api/settings`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: 'same-origin',
        });
        const dataSettings = await resSettings.json();
        if (dataSettings.success) {
            settings = dataSettings.data;
        } else {
            errors.push(dataSettings.errors);
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
            errors.push(dataImages.errors);
        }

        const resTemplates = await fetch(`${process.env.SERVER}/api/templates`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: 'same-origin',
        });
        const dataTemplates = await resTemplates.json();
        if (dataTemplates.success) {
            templates = dataTemplates.data;
        } else {
            errors.push(dataTemplates.errors);
        }
    }

    return {
        props: {
            settings,
            pages,
            templates,
            images,
            errors,
            session,
        },
    };
}
