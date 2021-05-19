import React, {
    useEffect, useState,
} from 'react';
import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import { firebase } from 'utils/firebaseClient';
import Head from 'next/head';
import DarkModeButton from 'components/Button/DarkModeButton/DarkModeButton';
import Tilt from 'components/Tilt/Tilt';
import { useSettings } from 'context/settings';
import Input from 'components/Form/Input/Input';
import styles from './login.module.scss';
import Button from 'components/Button/Button';

export default function Index() {
    const { value: settings } = useSettings();
    const [logo, setLogo] = useState([]);

    useEffect(() => {
        if (settings.settings) {
            const generalSettings = settings.settings.find((x) => x.id === 'general');
            if (generalSettings) {
                setLogo(generalSettings.logo);
            }
        }
    },
    [settings]);
    const intl = useIntl();

    const [form, setForm] = useState({
        email: '', password: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (isSubmitting) {
            login();
        }
    }, [isSubmitting]);

    const login = async () => {
        try {
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
                .then(async () => {
                    const data = await firebase.auth().signInWithEmailAndPassword(form.email, form.password);
                    res.status(200).json({
                        success: true, data,
                    });
                })
                .catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
            setIsSubmitting(false);
            router.push('/admin/');
        } catch (error) {
            setIsSubmitting(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
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
                <link
                    rel='stylesheet'
                    href='https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css'
                />
                <title>Login</title>
            </Head>
            <div className={styles.container}>
                <DarkModeButton />
                <div className={styles.login_wrapper}>
                    <Tilt
                        className={styles.tilt}
                        scale={1.2}
                        glare
                    >
                        {logo.image && (
                            <img
                                src={logo.image.url}
                                alt='Logo'
                            />
                        )}
                    </Tilt>
                    <form onSubmit={handleSubmit}>
                        <span className={styles.login_title}>
                            {intl.formatMessage({
                                id: 'dashboard.login', defaultMessage: 'Dashboard login',
                            })}
                        </span>
                        <Input
                            name='email'
                            label={intl.formatMessage({
                                id: 'mailAddress', defaultMessage: 'Mail address',
                            })}
                            placeholder={intl.formatMessage({
                                id: 'mailAddress', defaultMessage: 'Mail address',
                            })}
                            required
                            type='email'
                            onChange={handleChange}
                        />
                        <Input
                            name='password'
                            label={intl.formatMessage({
                                id: 'password', defaultMessage: 'Password',
                            })}
                            placeholder={intl.formatMessage({
                                id: 'password', defaultMessage: 'Password',
                            })}
                            required
                            type='password'
                            onChange={handleChange}
                        />
                        <Button
                            label={intl.formatMessage({
                                id: 'login', defaultMessage: 'Login',
                            })}
                            icon='las la-sign-in-alt'
                            type='submit'
                        />
                    </form>
                </div>
            </div>
        </>
    );
}
