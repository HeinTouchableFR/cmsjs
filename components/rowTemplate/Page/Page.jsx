import React from 'react';
import { useIntl } from 'react-intl';
import IconButton from 'components/Button/IconButton/IconButton';

export default function Page({item, handleDelete}) {
    const intl = useIntl();

    return (
        <>
            <tr>
                <td>
                    {item.title}
                </td>
                <td>{item.author && item.author.displayName}</td>
                <td>
                    {item.updated
                        ? `${intl.formatMessage({
                            id: 'updated', defaultMessage: 'Updated',
                        })} \n ${new Date(item.updated).toLocaleDateString()}  ${new Date(item.updated).toLocaleTimeString()}`
                        : `${intl.formatMessage({
                            id: 'published', defaultMessage: 'Published',
                        })} \n ${new Date(item.published).toLocaleDateString()}  ${new Date(item.published).toLocaleTimeString()}`}
                </td>
                <td>
                    <IconButton
                        action={`${process.env.SERVER}/${item.slug}`}
                        icon='fas fa-eye'
                        target='_blank'
                    />
                    <IconButton
                        action={`/admin/pages/${item.id}`}
                        icon='fas fa-edit'
                    />
                    <IconButton
                        action={() => handleDelete(item)}
                        icon='fas fa-trash-alt'
                    />
                </td>
            </tr>
        </>
    );
}
