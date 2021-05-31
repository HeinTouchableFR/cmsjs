import React, {
    useCallback, useRef, useState,
} from 'react';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import styles from './Admin.module.scss';

export default function Search({ endPoint }) {
    const searchRef = useRef(null);
    const [query, setQuery] = useState('');
    const [active, setActive] = useState(false);
    const [results, setResults] = useState([]);
    const intl = useIntl();

    const searchEndpoint = (q, locale) => `/api/${endPoint}/${locale}/search?q=${q}`;

    const onChange = useCallback((event) => {
        const q = event.target.value;
        setQuery(q);
        if (q.length) {
            fetch(searchEndpoint(q, intl.locale))
                .then((res) => res.json())
                .then((res) => {
                    setResults(res.data);
                });
        } else {
            setResults([]);
        }
    }, [intl.locale]);

    const onClick = useCallback((event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setActive(false);
            window.removeEventListener('click', onClick);
        }
    }, []);

    const onFocus = useCallback(() => {
        setActive(true);
        window.addEventListener('click', onClick);
    }, []);

    return (
        <div className={styles.search}>
            <div
                className={styles.search_wrapper}
                ref={searchRef}
            >
                <span className='fas fa-search' />
                <input
                    className={styles.search}
                    onChange={onChange}
                    onFocus={onFocus}
                    placeholder={intl.formatMessage({
                        id: 'docs.search', defaultMessage: 'Search for',
                    })}
                    type='text'
                    value={query}
                />
            </div>
            { active && results.length > 0 && (
                <ul className={styles.results}>
                    {results.map(({ id, name }) => (
                        <li
                            className={styles.result}
                            key={id}
                        >
                            <Link
                                href={`${process.env.SERVER}/${endPoint}/${id}`}
                            >
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <a>{name}</a>
                            </Link>
                        </li>
                    ))}
                </ul>
            ) }
        </div>
    );
}

Search.propTypes = {
    endPoint: PropTypes.string.isRequired,
};
