import React, {
    useEffect, useState,
} from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useIntl } from 'react-intl';
import Button from 'components/Button/Button';
import Card from 'components/Cards/Card/Card';
import Admin from 'container/Admin/Admin';
import Input from 'components/Form/Input/Input';
import Checkbox from 'components/Form/Checkbox/Checkbox';
import IconButton from 'components/Button/IconButton/IconButton';

export default function Modifier({ item }) {
    const intl = useIntl();
    const url = 'attributes';

    const [form, setForm] = useState({
        _id: item._id, name: item.name, values: item.values, filter: item.filter, newValues: [], deleteValues: [],
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({
    });
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
        const errs = validate();
        setErrors(errs);
        setIsSubmitting(true);
    };

    const validate = () => {
        const err = {
        };

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

    const handleAddValue = () => {
        setForm({
            ...form,
            newValues: [...form.newValues, {
                _id: `new-${new Date().getTime()}`, name: '',
            }],
        });
    };

    return (
        <>
            <Head>
                <title>
                    {intl.formatMessage({
                        id: 'edit.attribute', defaultMessage: 'Edit attribute',
                    })}
                    {' '}
                    {item.name}
                </title>
            </Head>
            <Admin>
                <Card
                    color='brown'
                >
                    <Card.Header
                        title={`${intl.formatMessage({
                            id: 'edit.attribute', defaultMessage: 'Edit attribute',
                        })} ${item.name}`}
                        buttonLabel={intl.formatMessage({
                            id: 'back', defaultMessage: 'Back',
                        })}
                        buttonAction={`/admin/${url}`}
                        buttonIcon='las la-arrow-left'
                    />
                    <Card.Body>
                        <form onSubmit={handleSubmit}>
                            <Input
                                label={intl.formatMessage({
                                    id: 'name', defaultMessage: 'Name',
                                })}
                                placeholder={intl.formatMessage({
                                    id: 'name', defaultMessage: 'Name',
                                })}
                                name='name'
                                defaultValue={item.name}
                                onChange={handleChange}
                            />
                            <Checkbox
                                label={intl.formatMessage({
                                    id: 'used.filter', defaultMessage: 'Use the attribute as a product search filter',
                                })}
                                name='filter'
                                defaultChecked={item.filters}
                                onChange={handleChange}
                            />
                            {form.values.map((item) => (
                                <Value
                                    key={item._id}
                                    item={item}
                                    setForm={setForm}
                                    form={form}
                                />
                            ))}
                            {form.newValues.map((item) => (
                                <Value
                                    key={item._id}
                                    item={item}
                                    setForm={setForm}
                                    form={form}
                                    type='newValues'
                                />
                            ))}
                            <Button
                                icon='las la-plus'
                                onClick={handleAddValue}
                                label={intl.formatMessage({
                                    id: 'add.value', defaultMessage: 'Add value',
                                })}
                            />
                            <Button
                                type='submit'
                                label={intl.formatMessage({
                                    id: 'edit', defaultMessage: 'Edit',
                                })}
                            />
                        </form>
                    </Card.Body>
                </Card>
            </Admin>
        </>
    );
}

const Value = ({ item, form, setForm, type = 'values' }) => {
    const intl = useIntl();
    const handleChange = (e, data) => {
        item = {
            ...item, [data.name]: data.value ? data.value : data.checked,
        };

        switch (type) {
        case 'values':
            setForm({
                ...form, values: form.values.map((i) => (i._id === item._id ? item : i)),
            });
            break;
        case 'newValues':
            setForm({
                ...form, newValues: form.newValues.map((i) => (i._id === item._id ? item : i)),
            });
            break;
        }
    };

    const handleDelete = () => {
        switch (type) {
        case 'values':
            setForm({
                ...form,
                deleteValues: [...form.deleteValues, item],
                values: form.values.filter((i) => i._id !== item._id),
            });
            break;
        case 'newValues':
            setForm({
                ...form, newValues: form.newValues.filter((i) => i._id !== item._id),
            });
            break;
        }
    };

    return (
        <Card
            color='violet'
        >
            <Card.Header title={item.name} />
            <Card.Body>
                <Input
                    label={intl.formatMessage({
                        id: 'name', defaultMessage: 'Name',
                    })}
                    placeholder={intl.formatMessage({
                        id: 'name', defaultMessage: 'Name',
                    })}
                    name='name'
                    defaultValue={item.name}
                    required
                    onChange={handleChange}
                />
            </Card.Body>
            <Card.Footer>
                <IconButton
                    action={() => handleDelete()}
                    icon='las la-trash-alt'
                />
            </Card.Footer>
        </Card>
    );
};

export async function getServerSideProps({ params }) {
    const { id } = params;

    let item = {
    };

    await axios
        .get(`${process.env.URL}/api/attributes/${id}`)
        .then((res) => {
            item = res.data.data;
        })
        .catch(() => {
        });

    return {
        props: {
            item,
        },
    };
}
