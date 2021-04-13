import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Button as SementicButton, Card as SementicCard, Form } from 'semantic-ui-react';
import {useIntl} from 'react-intl';
import Button from 'components/Button/Button';
import Card from 'components/Cards/Card/Card';
import Admin from 'container/Admin/Admin';
import Input from 'components/Form/Input/Input';

export default function Modifier({ item }) {
    const intl = useIntl()
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
                <title>{intl.formatMessage({ id: 'edit.attribute', defaultMessage: 'Edit attribute' })} {item.name}</title>
            </Head>
            <Admin>
                <Card title={`${intl.formatMessage({ id: 'edit.attribute', defaultMessage: 'Edit attribute' })} ${item.name}`} buttonLabel={intl.formatMessage({ id: 'back', defaultMessage: 'Back' })} buttonAction={`/admin/${url}`} buttonIcon={"las la-arrow-left"}>
                    <Form onSubmit={handleSubmit}>
                        <Input label={intl.formatMessage({ id: 'name', defaultMessage: 'Name' })} placeholder={intl.formatMessage({ id: 'name', defaultMessage: 'Name' })} name='name' defaultValue={item.name} onChange={handleChange}/>
                        <Form.Checkbox
                            label={intl.formatMessage({ id: 'used.filter', defaultMessage: 'Use the attribute as a product search filter' })}
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
                        <SementicButton type='button' color='teal' onClick={handleAddValue}>
                            {intl.formatMessage({ id: 'add.value', defaultMessage: 'Add value' })}
                        </SementicButton>
                        <SementicButton type='submit'>
                            {intl.formatMessage({ id: 'edit', defaultMessage: 'Edit' })}
                        </SementicButton>
                    </Form>
                </Card>
            </Admin>
        </>
    );
}

const Value = function ({ item, form, setForm, type = 'values' }) {
    const intl = useIntl()
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
        <SementicCard fluid color='teal'>
            <SementicCard.Content header={item.name} />
            <SementicCard.Content>
                <Input label={intl.formatMessage({ id: 'name', defaultMessage: 'Name' })} placeholder={intl.formatMessage({ id: 'name', defaultMessage: 'Name' })} name='name' defaultValue={item.name} required onChange={handleChange} />
            </SementicCard.Content>
            <SementicCard.Content extra>
                <Button action={() => handleDelete()} icon={'las la-trash-alt'} />
            </SementicCard.Content>
        </SementicCard>
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
