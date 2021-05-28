import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

export default function InSectionSingle({ elements }) {
    const intl = useIntl();

    return (
        <>
            <section>
                <h2>
                    {intl.formatMessage({
                        id: 'docs.inSection', defaultMessage: 'In this section',
                    })}
                </h2>
                <ul>
                    {
                        elements && elements.map((element) => (
                            <li key={element.key}>
                                <Link href={element.url}>
                                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                    <a>
                                        {intl.formatMessage({
                                            id: `docs.${element.label}`, defaultMessage: element.defaultLabel,
                                        })}
                                    </a>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </section>
        </>
    );
}

InSectionSingle.propTypes = {
    elements: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
};
