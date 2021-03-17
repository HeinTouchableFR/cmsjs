import React from 'react';
import { Button } from 'components/Button/Button';
import {NoLinkButton} from 'components/Button/NoLinkButton/NoLinkButton';
import styles from 'components/Table/Table.module.scss'

export default function Attribute({ item, url, handleDelete }) {
    return (
        <>
            <tr className={`${styles.tr}`}>
                <td scope='row' className={`${styles.td}`}>
                    {item._id}
                </td>
                <td className={`${styles.td}`}>{item.name}</td>
                <td className={`${styles.td}`}>{item.values.length}</td>
                <td className={`${styles.td}`}>
                    <Button url={url} style={'show'} icon={'fa-eye'} action={'show'} id={item._id} />
                    <Button url={url} style={'edit'} icon={'fa-pen'} action={'edit'} id={item._id} />
                    <NoLinkButton style={'delete'} icon={'fa-trash'} onClick={() => handleDelete(item)} />
                </td>
            </tr>
        </>
    );
}
