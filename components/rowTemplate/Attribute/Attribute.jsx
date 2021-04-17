import React from 'react';
import IconButton from 'components/Button/IconButton/IconButton';

export default function Attribute({ item, url, handleDelete }) {
    return (
        <>
            <tr>
                <td>
                    {item._id}
                </td>
                <td>{item.name}</td>
                <td>{item.values.length}</td>
                <td>
                    <IconButton action={`/admin/${url}/show/${item._id}`} icon={'las la-eye'} />
                    <IconButton action={`/admin/${url}/edit/${item._id}`} icon={'las la-edit'} />
                    <IconButton action={() => handleDelete(item)} icon={'las la-trash-alt'} />
                </td>
            </tr>
        </>
    );
}
