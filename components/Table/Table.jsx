import React from 'react';
import { FormattedMessage } from 'react-intl';

export default function Table({ labels, children }) {

    return (
        <table className={'table tableStriped'}>
            <thead className={'thead'}>
                <tr>
                    {labels &&
                        labels.map((label) => (
                            <th className='th' scope='col' key={label.id}>
                                <FormattedMessage id={label.id} defaultMessage={label.defaultMessage} />
                            </th>
                        ))}
                </tr>
            </thead>
            <tbody className={'tbody'}>{children}</tbody>
        </table>
    );
}
