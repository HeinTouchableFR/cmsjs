import React, {useEffect, useState} from 'react'
import {Button, Form} from 'semantic-ui-react';
import {useRouter} from 'next/router';
import {firebase} from '../../utils/firebaseClient';
import LoginContainer from '../../container/Login/LoginContainer';

export default function Login() {
    const [form, setForm] = useState({email: '', password: ''});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                login();
            } else {
                setIsSubmitting(false);
            }
        }
    }, [errors]);

    const login = async () => {
        try {
            const data = await firebase.auth().signInWithEmailAndPassword(form.email, form.password)
            setIsSubmitting(false);
            router.push(`/admin/`);
        } catch (error) {
            setIsSubmitting(false);
            setErrors(error)
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let errs = validate();
        setErrors(errs);
        setIsSubmitting(true);
    };

    const validate = () => {
        let err = {};

        if (!form.email) {
            err.email = 'This field is required';
        }
        if (!form.password) {
            err.password = 'This field is required';
        }

        return err;
    };

    const handleChange = (e, data) => {
        setForm({
            ...form,
            [data.name]: data.value ? data.value : data.checked,
        });
    };

    return (<>
        <LoginContainer>
            <Form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <Form.Input
                    fluid
                    label='Email address'
                    placeholder='Email address'
                    name='email'
                    type='email'
                    required
                    onChange={handleChange}
                    error={errors.email ? {content: 'This field is required', pointing: 'below'} : null}
                />
                <Form.Input
                    fluid
                    label='Password'
                    placeholder='Password'
                    name='password'
                    type='password'
                    required
                    onChange={handleChange}
                    error={errors.password ? {content: 'This field is required', pointing: 'below'} : null}
                />
                {errors.message && errors.message}
                <Button color={'green'} disabled={isSubmitting} loading={isSubmitting} type='submit'>Connect</Button>
            </Form>
        </LoginContainer>
    </>)
}

