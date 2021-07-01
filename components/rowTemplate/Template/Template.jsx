import React from 'react';
import IconButton from 'components/Button/IconButton/IconButton';
import { useIntl } from 'react-intl';

export default function Template({ item }) {
    const intl = useIntl();

    return (
        <>
            <tr>
                <td>
                    {item.title}
                </td>
                <td>
                    {item.postType.toLowerCase()
                        .replace(/\w/, (firstLetter) => firstLetter.toUpperCase())}
                </td>
                <td>{item.author && item.author.name}</td>
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
                        action={`/admin/posts/${item.id}`}
                        icon='fas fa-edit'
                    />
                </td>
            </tr>
        </>
    );
}
