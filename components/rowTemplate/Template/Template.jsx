import React from 'react';
import { Button } from 'components/Button/Button';
import styles from 'components/Table/Table.module.scss'

export default function Template({ item, url }) {
    return (
        <>
            <tr className={`${styles.tr}`}>
                <td scope='row' className={`${styles.td}`}>
                    {item._id}
                </td>
                <td className={`${styles.td}`}>
                    {item.name}
                </td>
                <td className={`${styles.td}`}>
                    <Button url={url} style={'edit'} icon={'fa-pen'} action={'edit'} id={item._id} />
                </td>
            </tr>
        </>
    );
}
