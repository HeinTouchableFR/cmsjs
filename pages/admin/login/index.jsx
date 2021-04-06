import React, {useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import {useRouter} from 'next/router';
import Tilt from 'react-tilt'
import {firebase} from 'utils/firebaseClient';
import {useLogo} from 'context/logo';
import styles from './login.module.scss';
import {Form, Icon} from 'semantic-ui-react';
import Head from 'next/head';

export default function Index() {
    const {logo} = useLogo()
    const intl = useIntl();

    const [form, setForm] = useState({email: '', password: ''});
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
            router.push(`/admin/`);
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
                <link rel="stylesheet" href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css"/>
                <title>Login</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.login_wrapper}>
                    <Tilt className={styles.tilt} options={{max: 25}}>
                        {logo.image && <img src={logo.image.url} alt="Logo"/>}
                    </Tilt>
                    <Form onSubmit={handleSubmit}>
                        <span className={styles.login_title}>
                            {intl.formatMessage({ id: 'dashboard.login', defaultMessage: 'Dashboard login' })}
                        </span>
                        <Form.Input name="email" fluid iconPosition='left' placeholder={intl.formatMessage({ id: 'mailAddress', defaultMessage: 'Mail address' })} required type="email" onChange={handleChange}>
                            <Icon name='at' />
                            <input />
                        </Form.Input>
                        <Form.Input name="password" fluid iconPosition='left' placeholder={intl.formatMessage({ id: 'password', defaultMessage: 'Password' })} required type="password" onChange={handleChange}>
                            <Icon name='key' />
                            <input />
                        </Form.Input>
                        <button>
                            {intl.formatMessage({ id: 'login', defaultMessage: 'Login' })}
                            <i className="las la-sign-in-alt" />
                        </button>
                    </Form>
                </div>
            </div>
        </>
    );
}
