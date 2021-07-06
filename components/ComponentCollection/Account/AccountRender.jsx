import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import {
    styleDiv,
    typoStyle,
    colorStyle,
} from 'variables/renderFunctions';
import PropTypes from 'prop-types';
import {
    signIn, useSession,
} from 'next-auth/client';
import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';

export default function AccountRender({ element }) {
    const { ref, inView, entry } = useInView({
        triggerOnce: true,
    });
    const intl = useIntl();

    const [session] = useSession();
    const router = useRouter();

    const Button = styled.button({
        display: 'inline-block',
        ...colorStyle('desktop', 'normal', element),
        textAlign: element.content.alignment,
        ...typoStyle('desktop', element),
        transition: 'color .2s',
        cursor: 'pointer',
        '&:hover': {
            ...colorStyle('desktop', 'hover', element),
        },
        '@media (max-width: 1024px)': css({
            ...typoStyle('tablet', element),
            ...colorStyle('tablet', 'normal', element),
            '&:hover': {
                ...colorStyle('tablet', 'hover', element),
            },
        }),
        '@media (max-width: 768px)': css({
            ...typoStyle('mobile', element),
            ...colorStyle('mobile', 'normal', element),
            '&:hover': {
                ...colorStyle('mobile', 'hover', element),
            },
        }),
    });

    const Icon = styled.a`
        margin-right: 10px;
    `;

    const align = css({
        textAlign: element.content.alignment,
    });

    useEffect(() => {
        if (entry) {
            if (inView && element.content.animation.name !== 'none') {
                const timer = setInterval(() => {
                    entry.target.classList.add('animated');
                    entry.target.classList.add(element.content.animation.name);
                    entry.target.classList.remove('invisible');

                    if (element.content.animation.duration !== 'normal') {
                        entry.target.classList.add(`animated-${element.content.animation.duration}`);
                    }
                }, element.content.animation.delay);
                return () => clearInterval(timer);
            }
        }
        return null;
    }, [inView]);

    const goToAccount = () => {
        router.push(`${process.env.SERVER}/account`);
    };

    return (
        <>
            <div
                ref={ref}
                css={css`
                    ${styleDiv(element)};
                    ${align}
                 `}
                className={element.content.animation.name !== 'none' ? 'invisible' : ''}
            >
                {
                    session
                        ? (
                            <Button
                                onClick={() => goToAccount()}
                            >
                                <Icon className='fas fa-user-circle' />
                                {
                                    intl.formatMessage({
                                        id: 'account.my', defaultMessage: 'My account',
                                    })
                                }
                            </Button>
                        )
                        : (
                            <Button
                                onClick={() => signIn()}
                            >
                                <Icon className='fas fa-user-circle' />
                                {
                                    intl.formatMessage({
                                        id: 'auth.signIn', defaultMessage: 'Sign In',
                                    })
                                }
                            </Button>
                        )
                }
            </div>
        </>
    );
}

AccountRender.propTypes = {
    element: PropTypes.shape({
        content: PropTypes.shape({
            alignment: PropTypes.string.isRequired,
            animation: PropTypes.shape({
                name: PropTypes.string,
                duration: PropTypes.string,
                delay: PropTypes.string,
            }),
        }).isRequired,
        styles: PropTypes.shape({
        }).isRequired,
    }).isRequired,
};
