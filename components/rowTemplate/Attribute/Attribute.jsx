import React from 'react';
import { Button, ActionButtonNoLink } from 'components/Button/Button';

export default function Attribute({ item, url, handleDelete }) {
    return (
        <>
            <tr className={'tr'}>
                <td scope='row' className={'td'}>
                    {item._id}
                </td>
                <td className={'td'}>{item.name}</td>
                <td className={'td'}>{item.values.length}</td>
                <td className={'td'}>
                    <Button url={url} style={'show'} icon={'fa-eye'} action={'show'} id={item._id} />
                    <Button url={url} style={'edit'} icon={'fa-pen'} action={'edit'} id={item._id} />
                    <ActionButtonNoLink style={'delete'} icon={'fa-trash'} onClick={() => handleDelete(item)} />
                </td>
            </tr>
        </>
    );
}
