import React from 'react';
import Button from 'components/Button/Button';

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
                    <Button action={`/admin/${url}/show/${item._id}`} icon={'las la-eye'} />
                    <Button action={`/admin/${url}/edit/${item._id}`} icon={'las la-edit'} />
                    <Button action={() => handleDelete(item)} icon={'las la-trash-alt'} />
                </td>
            </tr>
        </>
    );
}
