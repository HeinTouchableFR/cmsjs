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
import Field from 'components/Form/Field/Field';
import Dropdown from 'components/Form/Dropdown/Dropdown';
import fetcher from 'utils/fetcher';
import { acceptImageExtension } from 'variables/variables';

export default function Index({ settings, pages, images, templates, errors }) {
    const intl = useIntl();
    const [indexErrors, setIndexErrors] = useState(errors);
    const [session] = useSession();
    const [allImages, setImages] = useState(images);
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
        favicon: {
            type: 'image',
            image: settings.find((x) => x.data === 'favicon').image,
        },
    });
    const [socialForm, setSocialForm] = useState({
        facebook: {
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
    const [readingForm, setReadingForm] = useState({
        homepage: {
            type: 'post',
            value: settings.find((x) => x.data === 'homepage').post.id,
        },
        header: {
            type: 'post',
            value: settings.find((x) => x.data === 'header').post.id,
        },
        footer: {
            type: 'post',
            value: settings.find((x) => x.data === 'footer').post.id,
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

    const handleReadingChange = (_e, data) => {
        const updated = {
            ...readingForm,
            [data.name]: {
                ...readingForm[data.name],
                value: data.value,
            },
        };
        setReadingForm(updated);
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

    const handleFaviconChange = (file) => {
        const updated = {
            ...generalForm,
            favicon: {
                ...generalForm.favicon,
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
                favicon: generalForm.favicon,
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

    const handleSubmitReading = async (e) => {
        e.preventDefault();
        setLoading(true);
        const resSocials = await fetch('/api/settings', {
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
            method: 'PUT',
            body: JSON.stringify({
                homepage: readingForm.homepage,
                header: readingForm.header,
                footer: readingForm.footer,
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

    const pageOptions = [];
    pages.map((item) => pageOptions.push({
        key: item.id.toString(), text: item.title, value: item.id.toString(),
    }));

    const templateHeaderOptions = [];
    templates.map((item) => {
        if (item.postType === 'HEADER') {
            return templateHeaderOptions.push({
                key: item.id.toString(), text: item.title, value: item.id.toString(),
            });
        }
        return null;
    });

    const templateFooterOptions = [];
    templates.map((item) => {
        if (item.postType === 'FOOTER') {
            return templateFooterOptions.push({
                key: item.id.toString(), text: item.title, value: item.id.toString(),
            });
        }
        return null;
    });

    const clearCache = async () => {
        setLoading(true);
        const res = await fetcher(`${process.env.SERVER}/api/cache/clear`, {
        }, 'GET');
        alert(res.data.message);
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
                    <form>
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
                        <Field
                            label={intl.formatMessage({
                                id: 'logo',
                                defaultMessage: 'Logo',
                            })}
                            name='logo'
                        >
                            <FileManager
                                files={allImages}
                                setFiles={setImages}
                                currentFiles={generalForm.logo.image
                                    ? [generalForm.logo.image]
                                    : []}
                                setCurrentFiles={handleLogoChange}
                                acceptFiles={acceptImageExtension
                                    .replace(/['"]+/g, '')
                                    .replace('[', '')
                                    .replace(']', '')}
                            />
                        </Field>
                        <Field
                            label={intl.formatMessage({
                                id: 'favicon',
                                defaultMessage: 'Favicon',
                            })}
                            name='favicon'
                        >
                            <FileManager
                                files={allImages}
                                setFiles={setImages}
                                currentFiles={generalForm.favicon.image
                                    ? [generalForm.favicon.image]
                                    : []}
                                setCurrentFiles={handleFaviconChange}
                                acceptFiles={acceptImageExtension
                                    .replace(/['"]+/g, '')
                                    .replace('[', '')
                                    .replace(']', '')}
                            />
                        </Field>
                        <Button
                            label={intl.formatMessage({
                                id: 'update', defaultMessage: 'Update',
                            })}
                            loading={loading}
                            onClick={handleSubmitGeneral}
                            type='submit'
                        />
                    </form>
                </Tab.Pane>
            ),
        },
        {
            label: intl.formatMessage({
                id: 'settings.reading',
                defaultMessage: 'Reading',
            }),
            render: () => (
                <Tab.Pane>
                    <form>
                        <Dropdown
                            label={intl.formatMessage({
                                id: 'settings.homepage', defaultMessage: 'Home page',
                            })}
                            name='homepage'
                            defaultValue={readingForm.homepage.value.toString()}
                            required
                            options={pageOptions}
                            onChange={handleReadingChange}
                            notClearable
                        />
                        <Dropdown
                            label={intl.formatMessage({
                                id: 'settings.header', defaultMessage: 'Header',
                            })}
                            name='header'
                            defaultValue={readingForm.header.value.toString()}
                            required
                            options={templateHeaderOptions}
                            onChange={handleReadingChange}
                            notClearable
                        />
                        <Dropdown
                            label={intl.formatMessage({
                                id: 'settings.footer', defaultMessage: 'Footer',
                            })}
                            name='footer'
                            defaultValue={readingForm.footer.value.toString()}
                            required
                            options={templateFooterOptions}
                            onChange={handleReadingChange}
                            notClearable
                        />
                        <Button
                            label={intl.formatMessage({
                                id: 'update', defaultMessage: 'Update',
                            })}
                            loading={loading}
                            onClick={handleSubmitReading}
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
                    <form>
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
                            onClick={handleSubmitSocials}
                            type='submit'
                        />
                    </form>
                </Tab.Pane>
            ),
        },
        {
            label: intl.formatMessage({
                id: 'settings.parameters',
                defaultMessage: 'Parameters',
            }),
            render: () => (
                <Tab.Pane>
                    <Button
                        label={intl.formatMessage({
                            id: 'settings.cache', defaultMessage: 'Clear cache',
                        })}
                        loading={loading}
                        onClick={clearCache}
                        type='button'
                    />
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
        const resPages = await fetch(`${process.env.SERVER}/api/posts?type=PAGE`, {
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
            settings = dataSettings.result.data;
        } else {
            errors.push(dataSettings.errors);
        }

        const encodedFileTypes = encodeURIComponent(acceptImageExtension);
        const resImages = await fetch(`${process.env.SERVER}/api/files?mimeType=${encodedFileTypes}`, {
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

        const resHeader = await fetch(`${process.env.SERVER}/api/posts?type=HEADER`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: 'same-origin',
        });
        const dataHeader = await resHeader.json();
        if (dataHeader.success) {
            templates = dataHeader.data;
        } else {
            errors.push(dataHeader.errors);
        }

        const resFooter = await fetch(`${process.env.SERVER}/api/posts?type=FOOTER`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: 'same-origin',
        });
        const dataFooter = await resFooter.json();
        if (dataFooter.success) {
            templates = [...templates, ...dataFooter.data];
        } else {
            errors.push(dataFooter.errors);
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
