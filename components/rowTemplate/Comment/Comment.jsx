import React from 'react';
import { useIntl } from 'react-intl';
import IconButton from 'components/Button/IconButton/IconButton';

export default function Comment({ item, handleDelete }) {
    const intl = useIntl();

    return (
        <>
            <tr>
                <td>
                    {item.author && item.author.name}
                    <p>{item.author.email}</p>
                </td>
                <td>
                    {
                        item.parent && (
                            <p>
                                {`${intl.formatMessage({
                                id: 'inReplyTo', defaultMessage: 'In reply to',
                            })}`}
                                <a
                                    href={`${process.env.SERVER}/${item.post.slug}/#${item.id}`}
                                    target='_blank'
                                    rel='noreferrer'
                                >
                                    {
                                        item.parent.author.name
                                    }
                                </a>
                            </p>
                        )
                    }
                    {item.content}
                </td>
                <td>
                    <a
                        href={`${process.env.SERVER}/${item.post.slug}`}
                        target='_blank'
                        rel='noreferrer'
                    >
                        {
                            item.post.title
                        }
                    </a>
                </td>
                <td>
                    {
                        `${intl.formatMessage({
                            id: 'published', defaultMessage: 'Published',
                        })} \n ${new Date(item.published).toLocaleDateString()}  ${new Date(item.published).toLocaleTimeString()}`
                    }
                </td>
                <td>
                    <IconButton
                        action={() => handleDelete(item)}
                        icon='fas fa-trash-alt'
                    />
                </td>
            </tr>
        </>
    );
}
