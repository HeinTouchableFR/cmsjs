import React from 'react';
import IconButton from 'components/Button/IconButton/IconButton';

export default function Template({ item, url }) {
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
                    <IconButton action={`/admin/${url}/edit/${item.id}`} icon={'las la-edit'} />
                </td>
            </tr>
        </>
    );
}
