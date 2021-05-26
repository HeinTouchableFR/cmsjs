import React, {
    useEffect, useState,
} from 'react';
import Head from 'next/head';
import { useIntl } from 'react-intl';
import DarkModeButton from 'components/Button/DarkModeButton/DarkModeButton';
import Input from 'components/Form/Input/Input';
import Button from 'components/Button/Button';
import { useInstall } from 'context/install';
import { useRouter } from 'next/router';
import TextArea from 'components/Form/TextArea/TextArea';
import styles from './Install.module.scss';

export default function Install() {
    const intl = useIntl();
    const router = useRouter();
    const { value: install } = useInstall();

    const [form, setForm] = useState({
        sitename: '',
        email: '',
        password: '',
        lastname: '',
        firstname: '',
        description: '',
        facebook: '',
        instagram: '',
        linkedin: '',
        twitter: '',
    });
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState('installation');
    const [locale, setLocale] = useState('installation');

    useEffect(() => {
        if (install && install.success) {
            if (!install.authorizedToInstall) {
                window.location.assign('/');
            }
        }
    }, [install]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setLocale(window.navigator.language.substr(0, 2));
            if (router.locale !== router.defaultLocale) {
                setLocale(router.locale.substr(0, 2));
            }
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const resInstall = await fetch('/api/install', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sitename: form.sitename,
                email: form.email,
                password: form.password,
                lastname: form.lastname,
                firstname: form.firstname,
                description: form.description,
                facebook: form.facebook,
                instagram: form.instagram,
                linkedin: form.linkedin,
                twitter: form.twitter,
                locale,
                title: JSON.stringify(intl.formatMessage({
                    id: 'default.title',
                    defaultMessage: 'Welcome to the home page of your site',
                })),
                text: JSON.stringify(intl.formatMessage({
                    id: 'default.text',
                    defaultMessage: '<p style="text-align: justify;"><span style="font-family: arial, helvetica, sans-serif;">You can edit the elements already present on this page by clicking on the element to edit, delete existing elements or add new elements.</span></p><p><span style="font-family: arial, helvetica, sans-serif;">Use your creativity to give a unique visual identity to your site.</span></p><p style="text-align: center; line-height: 1.5;"><span style="font-size: 18pt; font-family: arial, helvetica, sans-serif; color: rgb(0, 0, 0);"><strong>Have fun!</strong></span></p>',
                })),
            }),
        });
        const { success } = await resInstall.json();
        if (success) {
            setStep('success');
        }
        setLoading(false);
    };

    const handleConnexionClick = () => {
        window.location.assign('/admin');
    };

    const handleChange = (e, data) => {
        setForm({
            ...form,
            [data.name]: data.value ? data.value : data.checked,
        });
    };

    return (
        <>
            {install.authorizedToInstall && (
                <>
                    <Head>
                        <title>
                            {intl.formatMessage({
                                id: 'page.addNew', defaultMessage: 'Add a new page',
                            })}
                        </title>
                    </Head>
                    <div className={`${styles.cms_core}`}>
                        <p className={`${styles.logo}`}>CMS</p>
                        {
                            step === 'installation'
                                ? (
                                    <div className={`${styles.body}`}>
                                        <div className={`${styles.title}`}>
                                            <h1>
                                                {intl.formatMessage({
                                                    id: 'welcome', defaultMessage: 'Welcome',
                                                })}
                                            </h1>
                                            <DarkModeButton />
                                        </div>
                                        <p>
                                            {intl.formatMessage({
                                                id: 'install.info',
                                                defaultMessage: 'Welcome to the installation of your website. You just have to fill in the information below and you will be ready to create your website like a boss!',
                                            })}
                                        </p>
                                        <div className={`${styles.title}`}>
                                            <h2>
                                                {intl.formatMessage({
                                                    id: 'install.informations', defaultMessage: 'Welcome',
                                                })}
                                            </h2>
                                        </div>
                                        <p>
                                            {intl.formatMessage({
                                                id: 'install.reassurance',
                                                defaultMessage: 'Please fill in the following information. Don\'t worry, you can change them later.',
                                            })}
                                        </p>
                                        <form onSubmit={handleSubmit}>
                                            <Input
                                                label={intl.formatMessage({
                                                    id: 'sitename', defaultMessage: 'Site name',
                                                })}
                                                name='sitename'
                                                required
                                                onChange={handleChange}
                                            />
                                            <Input
                                                label={intl.formatMessage({
                                                    id: 'mailAddress', defaultMessage: 'Mail address',
                                                })}
                                                name='email'
                                                required
                                                onChange={handleChange}
                                            />
                                            <Input
                                                type='password'
                                                label={intl.formatMessage({
                                                    id: 'password', defaultMessage: 'Password',
                                                })}
                                                name='password'
                                                required
                                                onChange={handleChange}
                                            />
                                            <Input
                                                label={intl.formatMessage({
                                                    id: 'lastname', defaultMessage: 'Last name',
                                                })}
                                                name='lastname'
                                                required
                                                onChange={handleChange}
                                            />
                                            <Input
                                                label={intl.formatMessage({
                                                    id: 'firstname', defaultMessage: 'First name',
                                                })}
                                                name='firstname'
                                                required
                                                onChange={handleChange}
                                            />
                                            <div className={`${styles.title}`}>
                                                <h2>
                                                    {intl.formatMessage({
                                                        id: 'install.makeMeKnown', defaultMessage: 'Make me known',
                                                    })}
                                                </h2>
                                            </div>
                                            <p>
                                                {intl.formatMessage({
                                                    id: 'install.seo',
                                                    defaultMessage: 'In order to promote your website, it is important to work on the natural referencing. The natural referencing aims to improve the positioning of your website in the results pages of search engines and increase your visibility. With a good referencing, your website will appear in the first pages of search engines. Search engine optimization is different from paid search engine optimization. You will not have to pay to be positioned. With natural referencing, the progression of your site is up to you. Help your site to be known by filling in the fields below.',
                                                })}
                                            </p>
                                            <TextArea
                                                label={intl.formatMessage({
                                                    id: 'install.description',
                                                    defaultMessage: 'Description of your site, what you do',
                                                })}
                                                tip={intl.formatMessage({
                                                    id: 'install.description.tips',
                                                    defaultMessage: 'This description is the tag that appears in the Google results pages below the title tag.<br/>It corresponds to the few lines of text that indicate what the page is about.<br/>It plays an important role because it is after reading this content that Internet users decide whether or not (and this in a few seconds) to click on the link.  This is the opportunity to make the difference with your competitors and to stand out to attract visitors.<br/><br/><u>The rules of writing:</u><br/>- The meta description should be written in the form of one or two well-constructed, well-spelled sentences with punctuation. It is essential to inspire confidence in Internet users by being able to formulate the content of your page in a clear, concise and clean way.<br/>- Do not make a list of keywords.<br/>- Give a precise marketing argument (why you and not the others).<br/>- Depending on your sector of activity, the use of action verbs is interesting (e.g.: discover, find, buy, rent, book, contact,..) and engaging.',
                                                })}
                                                name='description'
                                                onChange={handleChange}
                                                tipWidth={300}
                                            />
                                            <Input
                                                label='Facebook'
                                                name='facebook'
                                                onChange={handleChange}
                                            />
                                            <Input
                                                label='Twitter'
                                                name='twitter'
                                                onChange={handleChange}
                                            />
                                            <Input
                                                label='Instagram'
                                                name='instagram'
                                                onChange={handleChange}
                                            />
                                            <Input
                                                label='LinkedIn'
                                                name='linkedin'
                                                onChange={handleChange}
                                            />
                                            <Button
                                                label={intl.formatMessage({
                                                    id: 'install', defaultMessage: 'Install',
                                                })}
                                                loading={loading}
                                                type='submit'
                                            />
                                        </form>
                                    </div>
                                )
                                : (
                                    <div className={`${styles.body}`}>
                                        <div className={`${styles.title}`}>
                                            <h1>
                                                {intl.formatMessage({
                                                    id: 'wow', defaultMessage: 'Wow !',
                                                })}
                                            </h1>
                                            <DarkModeButton />
                                        </div>
                                        <p>
                                            {intl.formatMessage({
                                                id: 'install.success',
                                                defaultMessage: 'Your site is now installed. Have fun :)',
                                            })}
                                        </p>
                                        <table className={`${styles.install_success}`}>
                                            <tbody>
                                                <tr>
                                                    <th>
                                                        {intl.formatMessage({
                                                        id: 'mailAddress', defaultMessage: 'Mail address',
                                                    })}
                                                    </th>
                                                    <td>{form.email}</td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        {intl.formatMessage({
                                                        id: 'password', defaultMessage: 'Password',
                                                    })}
                                                    </th>
                                                    <td>
                                                        <p>
                                                            <em>
                                                                {intl.formatMessage({
                                                                id: 'install.chosenPassword',
                                                                defaultMessage: 'The password you have chosen.',
                                                            })}
                                                            </em>
                                                        </p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <Button
                                            label={intl.formatMessage({
                                                id: 'login', defaultMessage: 'Login',
                                            })}
                                            type='button'
                                            onClick={handleConnexionClick}
                                        />
                                    </div>
                                )
                        }
                    </div>
                </>
            )}
        </>
    );
}
