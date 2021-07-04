import PropTypes from 'prop-types';
import React, {
    useEffect, useState,
} from 'react';
import { useIntl } from 'react-intl';
import styles from './TimeAgo.module.scss';

const terms = [
    {
        time: 45,
        divide: 60,
        text: "moins d'une minute",
    },
    {
        time: 90,
        divide: 60,
        text: 'environ une minute',
    },
    {
        time: 45 * 60,
        divide: 60,
        text: '%d minutes',
    },
    {
        time: 90 * 60,
        divide: 60 * 60,
        text: 'environ une heure',
    },
    {
        time: 24 * 60 * 60,
        divide: 60 * 60,
        text: '%d heures',
    },
    {
        time: 42 * 60 * 60,
        divide: 24 * 60 * 60,
        text: 'environ un jour',
    },
    {
        time: 30 * 24 * 60 * 60,
        divide: 24 * 60 * 60,
        text: '%d jours',
    },
    {
        time: 45 * 24 * 60 * 60,
        divide: 24 * 60 * 60 * 30,
        text: 'environ un mois',
    },
    {
        time: 365 * 24 * 60 * 60,
        divide: 24 * 60 * 60 * 30,
        text: '%d mois',
    },
    {
        time: 365 * 1.5 * 24 * 60 * 60,
        divide: 24 * 60 * 60 * 365,
        text: 'environ un an',
    },
    {
        time: Infinity,
        divide: 24 * 60 * 60 * 365,
        text: '%d ans',
    },
];

export default function TimeAgo({ timestamp }) {
    const intl = useIntl();
    const [text, setText] = useState('');
    const date = new Date(timestamp);

    const updateText = (initialDate) => {
        const seconds = (new Date().getTime() - initialDate.getTime()) / 1000;
        let term = null;
        // eslint-disable-next-line no-restricted-syntax
        for (term of terms) {
            if (Math.abs(seconds) < term.time) {
                break;
            }
        }
        if (seconds >= 0) {
            setText(`Il y a ${term.text.replace('%d', Math.round(seconds / term.divide))}`);
        } else {
            setText(`Dans ${term.text.replace('%d', Math.round(Math.abs(seconds) / term.divide))}`);
        }
        let nextTick = Math.abs(seconds) % term.divide;
        if (nextTick === 0) {
            nextTick = term.divide;
        }
        if (nextTick > 2147482) {
            return;
        }
        window.setTimeout(() => {
            window.requestAnimationFrame(() => {
                updateText(initialDate);
            });
        }, 1000 * nextTick);
    };

    useEffect(() => {
        updateText(date);
    }, []);

    return (
        <div className={styles.timeAgo}>
            <div className={styles.relative}>
                {text}
            </div>
            <div className={styles.full}>
                {
                    intl.formatMessage({
                        id: 'comment.published', defaultMessage: 'On {date} at {time}',
                    }, {
                        date: date.toLocaleDateString(),
                        time: date.toLocaleTimeString(),
                    })
                }
            </div>
        </div>
    );
}

TimeAgo.propTypes = {
    timestamp: PropTypes.string.isRequired,
};

TimeAgo.defaultProps = {
};
