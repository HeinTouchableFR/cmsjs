import React, {
    useEffect, useState,
} from 'react';
import Head from 'next/head';
import { useIntl } from 'react-intl';
import DarkModeButton from 'components/Button/DarkModeButton/DarkModeButton';
import Input from 'components/Form/Input/Input';
import Button from 'components/Button/Button';
import { useInstall } from 'context/install';
import styles from './Install.module.scss';

export default function Install() {
    const intl = useIntl();
    const { value: install } = useInstall();

    const [form, setForm] = useState({
        installToken: '',
        sitename: '',
        email: '',
        password: '',
        lastname: '',
        firstname: '',
    });
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState('installation');

    useEffect(() => {
        if (install) {
            setForm({
                ...form, installToken: install.installToken,
            });
        }
    }, [install]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const resInstall = await fetch('/api/install', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                installToken: form.installToken,
                sitename: form.sitename,
                email: form.email,
                password: form.password,
                lastname: form.lastname,
                firstname: form.firstname,
            }),
        });
        const { success } = await resInstall.json();
        if (success) {
            setStep('success');
        }
        setLoading(false);
    };

    const handleConnexionClick = () => {
        window.location.assign('/admin');
    };

    const handleChange = (e, data) => {
        setForm({
            ...form,
            [data.name]: data.value ? data.value : data.checked,
        });
    };

    return (
        <>
            <Head>
                <title>
                    {intl.formatMessage({
                        id: 'page.addNew', defaultMessage: 'Add a new page',
                    })}
                </title>
            </Head>
            <div className={`${styles.cms_core}`}>
                <p className={`${styles.logo}`}>CMS</p>
                {
                    step === 'installation'
                        ? (
                            <div className={`${styles.body}`}>
                                <div className={`${styles.title}`}>
                                    <h1>
                                        {intl.formatMessage({
                                            id: 'welcome', defaultMessage: 'Welcome',
                                        })}
                                    </h1>
                                    <DarkModeButton />
                                </div>
                                <p>
                                    {intl.formatMessage({
                                        id: 'install.info', defaultMessage: 'Welcome to the installation of your website. You just have to fill in the information below and you will be ready to create your website like a boss!',
                                    })}
                                </p>
                                <div className={`${styles.title}`}>
                                    <h2>
                                        {intl.formatMessage({
                                            id: 'install.informations', defaultMessage: 'Welcome',
                                        })}
                                    </h2>
                                </div>
                                <p>
                                    {intl.formatMessage({
                                        id: 'install.reassurance', defaultMessage: 'Please fill in the following information. Don\'t worry, you can change them later.',
                                    })}
                                </p>
                                <form onSubmit={handleSubmit}>
                                    <Input
                                        label={intl.formatMessage({
                                            id: 'sitename', defaultMessage: 'Site name',
                                        })}
                                        name='sitename'
                                        required
                                        onChange={handleChange}
                                    />
                                    <Input
                                        label={intl.formatMessage({
                                            id: 'mailAddress', defaultMessage: 'Mail address',
                                        })}
                                        name='email'
                                        required
                                        onChange={handleChange}
                                    />
                                    <Input
                                        type='password'
                                        label={intl.formatMessage({
                                            id: 'password', defaultMessage: 'Password',
                                        })}
                                        name='password'
                                        required
                                        onChange={handleChange}
                                    />
                                    <Input
                                        label={intl.formatMessage({
                                            id: 'lastname', defaultMessage: 'Last name',
                                        })}
                                        name='lastname'
                                        required
                                        onChange={handleChange}
                                    />
                                    <Input
                                        label={intl.formatMessage({
                                            id: 'firstname', defaultMessage: 'First name',
                                        })}
                                        name='firstname'
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
                            </div>
                        )
                        : (
                            <div className={`${styles.body}`}>
                                <div className={`${styles.title}`}>
                                    <h1>
                                        {intl.formatMessage({
                                            id: 'wow', defaultMessage: 'Wow !',
                                        })}
                                    </h1>
                                    <DarkModeButton />
                                </div>
                                <p>
                                    {intl.formatMessage({
                                        id: 'install.success', defaultMessage: 'Your site is now installed. Have fun :)',
                                    })}
                                </p>
                                <table className={`${styles.install_success}`}>
                                    <tbody>
                                        <tr>
                                            <th>
                                                {intl.formatMessage({
                                                id: 'mailAddress', defaultMessage: 'Mail address',
                                            })}
                                            </th>
                                            <td>{form.email}</td>
                                        </tr>
                                        <tr>
                                            <th>
                                                {intl.formatMessage({
                                                id: 'password', defaultMessage: 'Password',
                                            })}
                                            </th>
                                            <td>
                                                <p>
                                                    <em>
                                                        {intl.formatMessage({
                                                        id: 'install.chosenPassword', defaultMessage: 'The password you have chosen.',
                                                    })}
                                                    </em>
                                                </p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <Button
                                    label={intl.formatMessage({
                                        id: 'login', defaultMessage: 'Login',
                                    })}
                                    type='button'
                                    onClick={handleConnexionClick}
                                />
                            </div>
                        )
                }
            </div>
        </>
    );
}
