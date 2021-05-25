import React from 'react';
import IconButton from 'components/Button/IconButton/IconButton';

export default function Template({ item }) {
    return (
        <>
            <tr>
                <td>
                    {item.id}
                </td>
                <td>
                    {item.name}
                </td>
                <td>
                    <IconButton action={`/admin/templates/${item.id}`} icon={'fas fa-edit'} />
                </td>
            </tr>
        </>
    );
}
