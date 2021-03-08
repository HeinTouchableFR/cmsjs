import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Button, Card, Form, Input } from 'semantic-ui-react';

import Header from 'components/Header/Header';
import Content from 'components/Content/Content';
import { ActionButtonNoLink } from 'components/Button/Button';

export default function Modifier({ item }) {
    const url = 'attributes';

    const [form, setForm] = useState({ _id: item._id, name: item.name, values: item.values, filter: item.filter, newValues: [], deleteValues: [] });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                update();
            } else {
                setIsSubmitting(false);
            }
        }
    }, [errors]);

    const update = async () => {
        try {
            const res = await fetch(`${process.env.URL}/api/${url}/${form._id}`, {
                method: 'PUT',
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
            newValues: [...form.newValues, { _id: 'new-' + new Date().getTime(), name: ''}],
        });
    };

    return (
        <>
            <Head>
                <title>Edit attribute {item.name}</title>
            </Head>
            <Header>
                <Content title='Attributes' icon='fa-cubes' url={url} action={"edit"}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Input
                            fluid
                            error={errors.name ? { content: 'This field is required', pointing: 'below' } : null}
                            label='Name'
                            placeholder='Name'
                            name='name'
                            defaultValue={item.name}
                            onChange={handleChange}
                        />
                        <Form.Checkbox
                            label="Use the attribute as a product search filter"
                            name='filter'
                            defaultChecked={item.filter}
                            onChange={handleChange}
                        />
                        {form.values.map((item) => (
                            <Value key={item._id} item={item} setForm={setForm} form={form} />
                        ))}
                        {form.newValues.map((item) => (
                            <Value key={item._id} item={item} setForm={setForm} form={form} type='newValues' />
                        ))}
                        <Button type='button' color='teal' onClick={handleAddValue}>
                            Add a value
                        </Button>
                        <Button type='submit'>Edit</Button>
                    </Form>
                </Content>
            </Header>
        </>
    );
}

const Value = function ({ item, form, setForm, type = 'values' }) {
    const handleChange = (e, data) => {
        item = { ...item, [data.name]: data.value ? data.value : data.checked };

        switch (type) {
            case 'values':
                setForm({ ...form, values: form.values.map((i) => (i._id === item._id ? item : i)) });
                break;
            case 'newValues':
                setForm({ ...form, newValues: form.newValues.map((i) => (i._id === item._id ? item : i)) });
                break;
        }
    };

    const handleDelete = function () {
        switch (type) {
            case 'values':
                setForm({ ...form, deleteValues: [...form.deleteValues, item], values: form.values.filter((i) => i._id !== item._id) });
                break;
            case 'newValues':
                setForm({ ...form, newValues: form.newValues.filter((i) => i._id !== item._id) });
                break;
        }
    };

    return (
        <Card fluid color='teal'>
            <Card.Content header={item.name} />
            <Card.Content>
                <Input fluid label='Name' placeholder='Name' name='name' defaultValue={item.name} required onChange={handleChange} />
            </Card.Content>
            <Card.Content extra>
                <ActionButtonNoLink type='button' style={'supprimer'} icon={'fa-trash'} onClick={handleDelete} />
            </Card.Content>
        </Card>
    );
};

export async function getServerSideProps({ params }) {
    const { id } = params;

    let item = {};

    await axios
        .get(process.env.URL + '/api/attributes/' + id)
        .then((res) => {
            item = res.data.data;
        })
        .catch(() => {});

    return {
        props: { item },
    };
}
