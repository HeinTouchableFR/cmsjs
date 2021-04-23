import React from 'react';
import { useIntl } from 'react-intl';
import IconButton from 'components/Button/IconButton/IconButton';

export default function Page({item, url, handleDelete}) {
    const intl = useIntl();

    return (
        <>
            <tr>
                <td>
                    {item.title}
                </td>
                <td>{item.author}</td>
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
                        action={`${process.env.URL}/${item.slug}`}
                        icon='las la-eye'
                        target='_blank'
                    />
                    <IconButton
                        action={`/admin/${url}/edit/${item.id}`}
                        icon='las la-edit'
                    />
                    <IconButton
                        action={() => handleDelete(item, item.childPages.length === 0)}
                        icon='las la-trash-alt'
                    />
                </td>
            </tr>
        </>
    );
}
