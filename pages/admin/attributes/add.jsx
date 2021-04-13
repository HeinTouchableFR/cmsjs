import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button as SementicButton, Card as SementicCard, Form } from 'semantic-ui-react';
import {useIntl} from 'react-intl';
import Card from 'components/Cards/Card/Card';
import Admin from 'container/Admin/Admin';
import Button from 'components/Button/Button';
import Input from 'components/Form/Input/Input';

export default function Add() {
    const intl = useIntl()
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
                <title>{intl.formatMessage({ id: 'add.new.attribute', defaultMessage: 'Add a new attribute' })}</title>
            </Head>
            <Admin>
                <Card title={intl.formatMessage({ id: 'add.new.attribute', defaultMessage: 'Add a new attribute' })} buttonLabel={intl.formatMessage({ id: 'back', defaultMessage: 'Back' })} buttonAction={`/admin/${url}`} buttonIcon={"las la-arrow-left"}>
                    <Form onSubmit={handleSubmit}>
                        <Input label={intl.formatMessage({ id: 'name', defaultMessage: 'Name' })} placeholder={intl.formatMessage({ id: 'name', defaultMessage: 'Name' })} name='name' required onChange={handleChange}/>
                        <Form.Checkbox label={intl.formatMessage({ id: 'used.filter', defaultMessage: 'Use the attribute as a product search filter' })} name='filter' onChange={handleChange} />
                        {form.values.map((item) => (
                            <Value key={item._id} item={item} setForm={setForm} form={form} />
                        ))}
                        <SementicButton type='button' color='teal' onClick={handleAddValue}>
                            {intl.formatMessage({ id: 'add.value', defaultMessage: 'Add value' })}
                        </SementicButton>
                        <SementicButton type='submit'>
                            {intl.formatMessage({ id: 'add', defaultMessage: 'Add' })}
                        </SementicButton>
                    </Form>
                </Card>
            </Admin>
        </>
    );
}

const Value = function ({ item, form, setForm }) {
    const intl = useIntl()
    const handleChange = (e, data) => {
        item = { ...item, [data.name]: data.value ? data.value : data.checked };

        setForm({ ...form, values: form.values.map((i) => (i._id === item._id ? item : i)) });
    };

    const handleDelete = function () {
        setForm({ ...form, values: form.values.filter((i) => i._id !== item._id) });
    };

    return (
        <SementicCard fluid color='teal'>
            <SementicCard.Content header={item.name} />
            <SementicCard.Content>
                <Input label={intl.formatMessage({ id: 'name', defaultMessage: 'Name' })} placeholder={intl.formatMessage({ id: 'name', defaultMessage: 'Name' })} name='name' required onChange={handleChange} />
            </SementicCard.Content>
            <SementicCard.Content extra>
                <Button action={() => handleDelete()} icon={'las la-trash-alt'} />
            </SementicCard.Content>
        </SementicCard>
    );
};
