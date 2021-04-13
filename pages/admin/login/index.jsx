import React, {
    useEffect, useState,
} from 'react';
import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import { firebase } from 'utils/firebaseClient';
import { Form } from 'semantic-ui-react';
import Head from 'next/head';
import { DarkModeButton } from 'components/Button/DarkModeButton/DarkModeButton';
import Tilt from 'components/Tilt/Tilt';
import { useSettings } from 'context/settings';
import Input from 'components/Form/Input/Input';
import styles from './login.module.scss';

export default function Index() {
    const { settings } = useSettings();
    const [logo, setLogo] = useState([]);

    useEffect(() => {
        if (settings.logo) {
            setLogo(settings.logo);
        }
    }, [settings]);
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
            const data = await firebase.auth().signInWithEmailAndPassword(form.email, form.password);
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
                    <Form onSubmit={handleSubmit}>
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
                        <button>
                            {intl.formatMessage({
 id: 'login', defaultMessage: 'Login',
})}
                            <i className='las la-sign-in-alt' />
                        </button>
                    </Form>
                </div>
            </div>
        </>
    );
}
