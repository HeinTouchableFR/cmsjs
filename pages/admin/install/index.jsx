import React, {
    useEffect, useState,
} from 'react';
import {useIntl} from 'react-intl';
import {useRouter} from 'next/router';
import {useSettings} from 'context/settings';
import Card from 'components/Cards/Card/Card';
import Input from 'components/Form/Input/Input';
import DarkModeButton from 'components/Button/DarkModeButton/DarkModeButton';
import Button from 'components/Button/Button';

export default function Index() {
    const {settings} = useSettings();
    const intl = useIntl();
    const router = useRouter();

    const [form, setForm] = useState({
        installToken: '',
        sitename: '',
        email: '',
        password: '',
        lastname: '',
        firstname: '',
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (settings.installToken) {
            setForm({
                ...form, installToken: settings.installToken,
            });
        }
    }, [settings]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true);
        const resInstall = await fetch('/api/install', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                installToken: settings.installToken,
                sitename: form.sitename,
                email: form.email,
                password: form.password,
                lastname: form.lastname,
                firstname: form.firstname,
            }),
        });
        const {success} = await resInstall.json();
        if (success) {
            window.location.assign('/admin');
        }
        setLoading(false);
    };

    const handleChange = (e, data) => {
        setForm({
            ...form,
            [data.name]: data.value ? data.value : data.checked,
        });
    };

    return (
        <>

            <Card>
                <Card.Header
                    title={intl.formatMessage({
                        id: 'welcome', defaultMessage: 'Welcome',
                    })}
                />
                <Card.Body>
                    <DarkModeButton />
                    <form onSubmit={handleSubmit}>
                        <Input
                            label={intl.formatMessage({
                                id: 'sitename', defaultMessage: 'Site name',
                            })}
                            name='sitename'
                            placeholder={intl.formatMessage({
                                id: 'sitename', defaultMessage: 'Site name',
                            })}
                            required
                            onChange={handleChange}
                        />
                        <Input
                            label={intl.formatMessage({
                                id: 'mailAddress', defaultMessage: 'Mail address',
                            })}
                            name='email'
                            placeholder={intl.formatMessage({
                                id: 'mailAddress', defaultMessage: 'Mail address',
                            })}
                            required
                            onChange={handleChange}
                        />
                        <Input
                            type='password'
                            label={intl.formatMessage({
                                id: 'password', defaultMessage: 'Password',
                            })}
                            name='password'
                            placeholder={intl.formatMessage({
                                id: 'password', defaultMessage: 'Password',
                            })}
                            required
                            onChange={handleChange}
                        />
                        <Input
                            label={intl.formatMessage({
                                id: 'lastname', defaultMessage: 'Last name',
                            })}
                            name='lastname'
                            placeholder={intl.formatMessage({
                                id: 'lastname', defaultMessage: 'Last name',
                            })}
                            required
                            onChange={handleChange}
                        />
                        <Input
                            label={intl.formatMessage({
                                id: 'firstname', defaultMessage: 'First name',
                            })}
                            name='firstname'
                            placeholder={intl.formatMessage({
                                id: 'firstname', defaultMessage: 'First name',
                            })}
                            required
                            onChange={handleChange}
                        />
                        <Button
                            label={intl.formatMessage({
                                id: 'install', defaultMessage: 'Install',
                            })}
                            loading={loading}
                            type='submit'
                        />
                    </form>
                </Card.Body>
            </Card>
        </>
    );
}
