import React from 'react';
import {FormattedMessage} from 'react-intl';
import styles from 'components/Table/Table.module.scss'

export default function Table({labels, children}) {

    return (
        <div className={styles.table_responsive}>
            <table className={`${styles.table}`}>
                <thead className={`${styles.thead}`}>
                <tr className={styles.tr}>
                    {labels &&
                    labels.map((label) => (
                        <td className={styles.td} scope='col' key={label.id}>
                            <FormattedMessage id={label.id} defaultMessage={label.defaultMessage}/>
                        </td>
                    ))}
                </tr>
                </thead>
                <tbody>{children}</tbody>
            </table>
        </div>
    );
}
