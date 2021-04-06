import React from 'react';
import { Button } from 'components/Button/Button';

export default function Template({ item, url }) {
    return (
        <>
            <tr>
                <td>
                    {item._id}
                </td>
                <td>
                    {item.name}
                </td>
                <td>
                    <Button action={`/admin/${url}/edit/${item._id}`} icon={'las la-edit'} />
                </td>
            </tr>
        </>
    );
}
