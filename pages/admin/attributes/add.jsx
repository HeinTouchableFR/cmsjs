import React, {
    useState, useEffect,
} from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import Card from 'components/Cards/Card/Card';
import Admin from 'container/Admin/Admin';
import Button from 'components/Button/Button';
import Input from 'components/Form/Input/Input';
import Checkbox from 'components/Form/Checkbox/Checkbox';
import IconButton from 'components/Button/IconButton/IconButton';

export default function Add() {
    const intl = useIntl();
    const url = 'attributes';

    const [form, setForm] = useState({
        name: '', values: [], filter: false,
    });
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
        const errs = validate();
        setErrors(errs);
        setIsSubmitting(true);
    };

    const validate = () => {
        const err = {};

        if (!form.name) {
            err.name = 'This field is required';
        }

        return err;
    };

    const handleChange = (e, data) => {
        setForm({
            ...form,
            [data.name]: data.value,
        });
    };

    const handleAddValue = () => {
        setForm({
            ...form,
            values: [...form.values, {
                _id: `new-${new Date().getTime()}`, name: '',
            }],
        });
    };

    return (
        <>
            <Head>
                <title>
                    {intl.formatMessage({
                        id: 'add.new.attribute', defaultMessage: 'Add a new attribute',
                    })}
                </title>
            </Head>
            <Admin>
                <Card
                    color='brown'
                >
                    <Card.Header
                        title={intl.formatMessage({
                            id: 'add.new.attribute', defaultMessage: 'Add a new attribute',
                        })}
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
                                required
                                onChange={handleChange}
                            />
                            <Checkbox
                                label={intl.formatMessage({
                                    id: 'used.filter', defaultMessage: 'Use the attribute as a product search filter',
                                })}
                                name='filter'
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
                                    id: 'add', defaultMessage: 'Add',
                                })}
                            />
                        </form>
                    </Card.Body>
                </Card>
            </Admin>
        </>
    );
}

const Value = ({item, form, setForm}) => {
    const intl = useIntl();
    const handleChange = (e, data) => {
        item = {
            ...item, [data.name]: data.value ? data.value : data.checked,
        };

        setForm({
            ...form, values: form.values.map((i) => (i._id === item._id ? item : i)),
        });
    };

    const handleDelete = () => {
        setForm({
            ...form, values: form.values.filter((i) => i._id !== item._id),
        });
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
