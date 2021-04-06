import React from 'react';
import { Button } from 'components/Button/Button';

export default function Product({ item, url, handleDelete }) {
    return (
        <>
            <tr>
                <td>
                    {item._id}
                </td>
                <td>
                    <img src={item.productImage ? item.productImage.url : '/empty.png'} alt={'Product image ' + item.name} width={120} height={120} />
                </td>
                <td>{item.name}</td>
                <td>{item.price} €</td>
                <td>
                    <Button action={`/admin/${url}/show/${item._id}`} icon={'las la-eye'} />
                    <Button action={`/admin/${url}/edit/${item._id}`} icon={'las la-edit'} />
                    <Button action={() => handleDelete(item)} icon={'las la-trash-alt'} />
                </td>
            </tr>
        </>
    );
}
