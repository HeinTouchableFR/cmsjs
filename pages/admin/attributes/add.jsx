import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button, Card, Form, Input } from 'semantic-ui-react';

import Header from 'components/Header/Header';
import Content from 'components/Content/Content';
import { ActionButtonNoLink } from 'components/Button/ActionButton/ActionButton';

export default function Add() {
    const url = 'attributes';

    const [form, setForm] = useState({ name: '', values: [], filter: false });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                create();
            } else {
                setIsSubmitting(false);
            }
        }
    }, [errors]);

    const create = async () => {
        try {
            const res = await fetch(`${process.env.URL}/api/${url}`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });
            router.push(`/admin/${url}`);
        } catch (error) {
            console.log(error);
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

        if (!form.name) {
            err.name = 'This field is required';
        }

        return err;
    };

    const handleChange = (e, data) => {
        setForm({
            ...form,
            [data.name]: data.value ? data.value : data.checked,
        });
    };

    const handleAddValue = function () {
        setForm({
            ...form,
            values: [...form.values, { _id: 'new-' + new Date().getTime(), name: '' }],
        });
    };

    return (
        <>
            <Head>
                <title>Add attribute</title>
            </Head>
            <Header>
                <Content title='Attributes' icon='fa-cubes' url={url} action={'add'}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Input
                            fluid
                            error={errors.name ? { content: 'This field is required', pointing: 'below' } : null}
                            label='Name'
                            placeholder='Name'
                            name='name'
                            required
                            onChange={handleChange}
                        />
                        <Form.Checkbox label="Use the attribute as a product search filter" name='filter' onChange={handleChange} />
                        {form.values.map((item) => (
                            <Value key={item._id} item={item} setForm={setForm} form={form} />
                        ))}
                        <Button type='button' color='teal' onClick={handleAddValue}>
                            Add value
                        </Button>
                        <Button type='submit'>Add</Button>
                    </Form>
                </Content>
            </Header>
        </>
    );
}

const Value = function ({ item, form, setForm }) {
    const handleChange = (e, data) => {
        item = { ...item, [data.name]: data.value ? data.value : data.checked };

        setForm({ ...form, values: form.values.map((i) => (i._id === item._id ? item : i)) });
    };

    const handleDelete = function () {
        setForm({ ...form, values: form.values.filter((i) => i._id !== item._id) });
    };

    return (
        <Card fluid color='teal'>
            <Card.Content header={item.name} />
            <Card.Content>
                <Input fluid label='Name' placeholder='Name' name='name' required onChange={handleChange} />
            </Card.Content>
            <Card.Content extra>
                <ActionButtonNoLink type='button' style={'supprimer'} icon={'fa-trash'} onClick={handleDelete} />
            </Card.Content>
        </Card>
    );
};
