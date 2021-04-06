import React from 'react';
import { useIntl } from 'react-intl';
import { Button } from 'components/Button/Button';

export default function Page({ item, url, parentPage, dash = '', handleDelete }) {
    const intl = useIntl();

    if (parentPage) {
        dash += ' — ';
    }

    return (
        <>
            <tr>
                <td>
                    {parentPage ? dash : ''} {item.title}
                </td>
                <td>{item.author}</td>
                <td>
                    {item.updated
                        ? `${intl.formatMessage({ id: 'updated', defaultMessage: 'Updated' })} \n ${new Date(
                              item.updated
                          ).toLocaleDateString()}  ${new Date(item.updated).toLocaleTimeString()}`
                        : `${intl.formatMessage({ id: 'published', defaultMessage: 'Published' })} \n ${new Date(
                              item.published
                          ).toLocaleDateString()}  ${new Date(item.published).toLocaleTimeString()}`}
                </td>
                <td>
                    <Button action={`${process.env.URL}/${item.slug}`} icon={'las la-eye'} target={"_blank"} />
                    <Button action={`/admin/${url}/edit/${item._id}`} icon={'las la-edit'} />
                    <Button action={() => handleDelete(item, item.childPages.length === 0)} icon={'las la-trash-alt'} />
                </td>
            </tr>
            {item.childPagesData &&
                item.childPagesData.map((itemE) => (
                    <Page handleDelete={handleDelete} item={itemE} url={url} parentPage={item} dash={dash} key={itemE._id} />
                ))}
        </>
    );
}
