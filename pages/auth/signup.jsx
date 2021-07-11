import {
    getCsrfToken, getProviders, signIn,
} from 'next-auth/client';
import React, {
    useEffect, useState,
} from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';

export default function SignUp({ csrfToken, providers, errorsType }) {
    const auth = Object.values(providers).filter((provider) => provider.id !== 'credentials');
    const [errors, setErrors] = useState(null);
    const intl = useIntl();

    useEffect(() => {
        switch (errorsType) {
        case 'CredentialsSignin':
            setErrors({
                message: intl.formatMessage({
                    id: 'auth.CredentialsSignin',
                    defaultMessage: 'Sign in failed. Check the details you provided are correct.',
                }),
            });
            break;
        case 'Default':
            setErrors({
                message: intl.formatMessage({
                    id: 'auth.Default',
                    defaultMessage: 'Unable to sign in.',
                }),
            });
            break;
        case 'EmailSignin':
            setErrors({
                message: intl.formatMessage({
                    id: 'auth.EmailSignin',
                    defaultMessage: 'Check your email address.',
                }),
            });
            break;
        case 'OAuthAccountNotLinked':
            setErrors({
                message: intl.formatMessage({
                    id: 'auth.OAuthAccountNotLinked',
                    defaultMessage: 'To confirm your identity, sign in with the same account you used originally.',
                }),
            });
            break;
        case 'OAuthSignin':
            setErrors({
                message: intl.formatMessage({
                    id: 'auth.OAuthSignin',
                    defaultMessage: 'Try signing with a different account.',
                }),
            });
            break;
        case 'OAuthCallback':
            setErrors({
                message: intl.formatMessage({
                    id: 'auth.OAuthSignin',
                    defaultMessage: 'Try signing with a different account.',
                }),
            });
            break;
        case 'OAuthCreateAccount':
            setErrors({
                message: intl.formatMessage({
                    id: 'auth.OAuthSignin',
                    defaultMessage: 'Try signing with a different account.',
                }),
            });
            break;
        case 'EmailCreateAccount':
            setErrors({
                message: intl.formatMessage({
                    id: 'auth.OAuthSignin',
                    defaultMessage: 'Try signing with a different account.',
                }),
            });
            break;
        case 'Callback':
            setErrors({
                message: intl.formatMessage({
                    id: 'auth.OAuthSignin',
                    defaultMessage: 'Try signing with a different account.',
                }),
            });
            break;
        default:
            setErrors(null);
            break;
        }
    }, [errorsType, intl]);

    return (
        <>
            <div className='limiter'>
                <div
                    className='container_auth'
                >
                    <div className='wrap-auth'>
                        <form
                            className='auth-form'
                            method='post'
                            action={`${process.env.SERVER}/api/auth/callback/credentials`}
                        >
                            <input
                                name='csrfToken'
                                type='hidden'
                                defaultValue={csrfToken}
                            />
                            <span className='form-title'>
                                {
                                    intl.formatMessage({
                                        id: 'auth.register',
                                        defaultMessage: 'Register',
                                    })
                                }
                            </span>
                            {(errors && errors.message) && (
                                <div className='container-errors'>
                                    <div className='wrap-errors'>
                                        <div className='errors-bg' />
                                        <div
                                            className='error'
                                        >
                                            {errors.message}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {auth.map((provider) => (
                                <button
                                    className={`btn-${provider.id}`}
                                    key={provider.id}
                                    onClick={() => signIn(provider.id)}
                                    type='button'
                                >
                                    <i className={`fab fa-${provider.id}`} />
                                    {provider.name}
                                </button>
                            ))}
                            <div
                                className='form-input'
                            >
                                <span className='label'>
                                    {
                                        intl.formatMessage({
                                            id: 'mailAddress',
                                            defaultMessage: 'Mail adress',
                                        })
                                    }
                                </span>
                                <input
                                    type='text'
                                    name='username'
                                    required
                                />
                                <span
                                    className='icon'
                                    data-symbol='&#xf206;'
                                />
                            </div>
                            <div
                                className='form-input'
                            >
                                <span className='label'>
                                    {
                                        intl.formatMessage({
                                            id: 'password',
                                            defaultMessage: 'Password',
                                        })
                                    }
                                </span>
                                <input
                                    type='password'
                                    name='password'
                                    required
                                />
                                <span
                                    className='icon'
                                    data-symbol='&#xf190;'
                                />
                            </div>
                            <div
                                className='form-input'
                            >
                                <span className='label'>
                                    {
                                        intl.formatMessage({
                                            id: 'password.confirm',
                                            defaultMessage: 'Confirm password',
                                        })
                                    }
                                </span>
                                <input
                                    type='password'
                                    name='confirmpassword'
                                    required
                                />
                                <span
                                    className='icon'
                                    data-symbol='&#xf190;'
                                />
                            </div>
                            <div className='container-auth-btn'>
                                <div className='wrap-auth-btn'>
                                    <div className='auth-form-bgbtn' />
                                    <button
                                        className='form-btn'
                                        type='submit'
                                    >
                                        {
                                            intl.formatMessage({
                                                id: 'auth.register',
                                                defaultMessage: 'Register',
                                            })
                                        }
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

SignUp.propTypes = {
    csrfToken: PropTypes.string.isRequired,
    providers: PropTypes.shape({
    }).isRequired,
    errorsType: PropTypes.string,
};

SignUp.defaultProps = {
    errorsType: '',
};

export async function getServerSideProps(ctx) {
    const providers = await getProviders();
    const errorsType = ctx.query.error || '';
    return {
        props: {
            csrfToken: await getCsrfToken(ctx),
            providers,
            errorsType,
        },
    };
}
