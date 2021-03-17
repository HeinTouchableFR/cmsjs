import React from 'react';
import { Button } from 'components/Button/Button';
import {NoLinkButton} from 'components/Button/NoLinkButton/NoLinkButton';

export default function Product({ item, url, handleDelete }) {
    return (
        <>
            <tr className={'tr'}>
                <td scope='row' className={'td'}>
                    {item._id}
                </td>
                <td scope='row' className={'td'}>
                    <img src={item.productImage ? item.productImage.url : '/empty.png'} alt={'Product image ' + item.name} width={120} height={120} />
                </td>
                <td className={'td'}>{item.name}</td>
                <td className={'td'}>{item.price} €</td>
                <td className={'td'}>
                    <Button url={url} style={'show'} icon={'fa-eye'} action={'show'} id={item._id} />
                    <Button url={url} style={'edit'} icon={'fa-pen'} action={'edit'} id={item._id} />
                    <NoLinkButton style={'delete'} icon={'fa-trash'} onClick={() => handleDelete(item)} />
                </td>
            </tr>
        </>
    );
}
