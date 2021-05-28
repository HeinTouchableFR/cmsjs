import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import styles from './Docs.module.scss';

export default function InSection({ elements }) {
    const intl = useIntl();

    return (
        <>
            <section>
                <h2>
                    {intl.formatMessage({
                        id: 'docs.inSection', defaultMessage: 'In this section',
                    })}
                </h2>
                <div className={styles.sub}>
                    {
                        elements && elements.map((item) => (
                            <div
                                className={styles.item}
                                key={item.key}
                            >
                                <div className={styles.item_title}>
                                    <Link href={item.url}>
                                        {/* eslint-disable-next-line max-len */}
                                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                        <a>
                                            {intl.formatMessage({
                                                id: `docs.${item.label}`, defaultMessage: item.defaultLabel,
                                            })}
                                        </a>
                                    </Link>
                                </div>
                                <section className={styles.item_sub_item}>
                                    {
                                        item.elements && item.elements.map((element) => (
                                            <Link href={element.url} key={element.key}>
                                                {/* eslint-disable-next-line max-len */}
                                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                                <a>
                                                    {intl.formatMessage({
                                                        id: `docs.${element.label}`,
                                                        defaultMessage: element.defaultLabel,
                                                    })}
                                                </a>
                                            </Link>
                                        ))
                                    }
                                </section>
                            </div>
                        ))
                    }
                </div>
            </section>
        </>
    );
}

InSection.propTypes = {
    elements: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
};
