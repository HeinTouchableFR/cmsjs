import React from 'react';
import IconButton from 'components/Button/IconButton/IconButton';

export default function Category({ item, url, parentCategory, dash = '', handleDelete }) {
    if (parentCategory) {
        dash += ' — ';
    }

    return (
        <>
            <tr>
                <td>
                    {item._id}
                </td>
                <td>
                    {parentCategory ? dash : ''} {item.name}
                </td>
                <td>
                    <IconButton action={`/admin/${url}/show/${item._id}`} icon={'las la-eye'} />
                    <IconButton action={`/admin/${url}/edit/${item._id}`} icon={'las la-edit'} />
                    <IconButton action={() => handleDelete(item)} icon={'las la-trash-alt'} />
                </td>
            </tr>
            {item.childCategoriesData &&
                item.childCategoriesData.map((child) => (
                    <Category handleDelete={handleDelete} item={child} url={url} parentCategory={item} dash={dash} key={child._id} />
                ))}
        </>
    );
}
