import React from 'react';
import { Button } from 'components/Button/Button';
import {NoLinkButton} from '../../Button/NoLinkButton/NoLinkButton';
import styles from 'components/Table/Table.module.scss'

export default function Category({ item, url, parentCategory, dash = '', handleDelete }) {
    if (parentCategory) {
        dash += ' — ';
    }

    return (
        <>
            <tr className={`${styles.tr}`}>
                <td scope='row' className={`${styles.td}`}>
                    {item._id}
                </td>
                <td className={`${styles.td}`}>
                    {parentCategory ? dash : ''} {item.name}
                </td>
                <td className={`${styles.td}`}>
                    <Button url={url} style={'show'} icon={'fa-eye'} action={'show'} id={item._id} />
                    <Button url={url} style={'edit'} icon={'fa-pen'} action={'edit'} id={item._id} />
                    <NoLinkButton style={'delete'} icon={'fa-trash'} onClick={() => handleDelete(item)} />
                </td>
            </tr>
            {item.childCategoriesData &&
                item.childCategoriesData.map((child) => (
                    <Category handleDelete={handleDelete} item={child} url={url} parentCategory={item} dash={dash} key={child._id} />
                ))}
        </>
    );
}
