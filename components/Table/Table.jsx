import React from 'react';
import { FormattedMessage } from 'react-intl';
import styles from 'components/Table/Table.module.scss'

export default function Table({ labels, children }) {

    return (
        <table className={`${styles.table} ${styles.tableStriped}`}>
            <thead className={`${styles.thead}`}>
                <tr>
                    {labels &&
                        labels.map((label) => (
                            <th className={`${styles.th}`} scope='col' key={label.id}>
                                <FormattedMessage id={label.id} defaultMessage={label.defaultMessage} />
                            </th>
                        ))}
                </tr>
            </thead>
            <tbody className={`${styles.tbody}`}>{children}</tbody>
        </table>
    );
}
