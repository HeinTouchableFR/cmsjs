import React, {useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import {useRouter} from 'next/router';
import {useSettings} from 'context/settings';
import Card from 'components/Cards/Card/Card';
import {Form} from 'semantic-ui-react';

export default function Index() {
    const {settings} = useSettings()
    const intl = useIntl();
    const router = useRouter()

    const [form, setForm] = useState({
        installToken: '',
        sitename: '',
        email: '',
        password: '',
        lastname: '',
        firstname: '',
    });
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (settings.installToken) {
            setForm({...form, installToken: settings.installToken})
        }
    }, [settings]);

    const handleSubmit = async() => {
        setLoading(true)
        const resInstall = await fetch('/api/install', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                installToken: settings.installToken,
                sitename: "Mon site qui déchire",
                email: "aymericlhomme@orange.fr",
                password: "admin1234",
                lastname: "Lhomme",
                firstname: "Aymeric"
            })
        })
        const {success} = await resInstall.json()
        if(success){
            window.location.assign("/admin");
        }
        setLoading(false)
    }

    const handleChange = (e, data) => {
        setForm({
            ...form,
            [data.name]: data.value ? data.value : data.checked,
        });
    };

    return (
        <>
            <Card title={intl.formatMessage({ id: 'welcome', defaultMessage: 'Welcome' })}>
                <Form onSubmit={handleSubmit}>
                    <Form.Input
                        fluid
                        label={intl.formatMessage({ id: 'sitename', defaultMessage: 'Site name' })}
                        placeholder={intl.formatMessage({ id: 'sitename', defaultMessage: 'Site name' })}
                        onChange={handleChange}
                        name='sitename'
                        required
                    />
                    <Form.Input
                        fluid
                        label={intl.formatMessage({ id: 'mailAddress', defaultMessage: 'Mail address' })}
                        placeholder={intl.formatMessage({ id: 'mailAddress', defaultMessage: 'Mail address' })}
                        onChange={handleChange}
                        name='email'
                        required
                    />
                    <Form.Input
                        fluid
                        label={intl.formatMessage({ id: 'password', defaultMessage: 'Password' })}
                        placeholder={intl.formatMessage({ id: 'password', defaultMessage: 'Password' })}
                        onChange={handleChange}
                        name='password'
                        type='password'
                        required
                    />
                    <Form.Input
                        fluid
                        label={intl.formatMessage({ id: 'lastname', defaultMessage: 'Last name' })}
                        placeholder={intl.formatMessage({ id: 'lastname', defaultMessage: 'Last name' })}
                        onChange={handleChange}
                        name='lastname'
                        required
                    />
                    <Form.Input
                        fluid
                        label={intl.formatMessage({ id: 'firstname', defaultMessage: 'First name' })}
                        placeholder={intl.formatMessage({ id: 'firstname', defaultMessage: 'First name' })}
                        onChange={handleChange}
                        name='firstname'
                        required
                    />
                    <Form.Button loading={loading}>
                        {intl.formatMessage({ id: 'install', defaultMessage: 'Install' })}
                    </Form.Button>
                </Form>
            </Card>
        </>
    );
}
