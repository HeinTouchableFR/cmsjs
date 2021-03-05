import React from 'react';
import { useIntl } from 'react-intl';

import { ActionButton, ActionButtonNoLink } from 'components/Button/ActionButton/ActionButton';

export default function Page({ item, url, parentPage, tiret = '', handleDelete }) {
    const intl = useIntl();

    if (parentPage) {
        tiret += ' — ';
    }

    return (
        <>
            <tr className={'tr'}>
                <td className={'td title'}>
                    {parentPage ? tiret : ''} {item.title}
                </td>
                <td className={'td'}>{item.author}</td>
                <td className={'td'}>
                    {item.updated
                        ? `${intl.formatMessage({ id: 'updated', defaultMessage: 'Updated' })} \n ${new Date(
                              item.updated
                          ).toLocaleDateString()}  ${new Date(item.updated).toLocaleTimeString()}`
                        : `${intl.formatMessage({ id: 'published', defaultMessage: 'Published' })} \n ${new Date(
                              item.published
                          ).toLocaleDateString()}  ${new Date(item.published).toLocaleTimeString()}`}
                </td>
                <td className={'td'}>
                    <ActionButton url={`${process.env.URL}/${item.slug}`} style={'show'} icon={'fa-eye'} id={item._id} />
                    <ActionButton url={url} style={'edit'} icon={'fa-pen'} action={'edit'} id={item._id} />
                    <ActionButtonNoLink style={'delete'} icon={'fa-trash'} onClick={() => handleDelete(item, item.childPages.length === 0)} />
                </td>
            </tr>
            {item.childPagesData &&
                item.childPagesData.map((itemE) => (
                    <Page handleDelete={handleDelete} item={itemE} url={url} parentPage={item} tiret={tiret} key={itemE._id} />
                ))}
        </>
    );
}
