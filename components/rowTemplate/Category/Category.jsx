import { ActionButton, ActionButtonNoLink } from 'components/Button/ActionButton/ActionButton';

export default function Category({ item, url, parentCategory, dash = '', handleDelete }) {
    if (parentCategory) {
        dash += ' — ';
    }

    return (
        <>
            <tr className={'tr'}>
                <td scope='row' className={'td'}>
                    {item._id}
                </td>
                <td className={'td'}>
                    {parentCategory ? dash : ''} {item.name}
                </td>
                <td className={'td'}>
                    <ActionButton url={url} style={'show'} icon={'fa-eye'} action={'show'} id={item._id} />
                    <ActionButton url={url} style={'edit'} icon={'fa-pen'} action={'edit'} id={item._id} />
                    <ActionButtonNoLink style={'delete'} icon={'fa-trash'} onClick={() => handleDelete(item)} />
                </td>
            </tr>
            {item.childCategoriesData &&
                item.childCategoriesData.map((child) => (
                    <Category handleDelete={handleDelete} item={child} url={url} parentCategory={item} dash={dash} key={child._id} />
                ))}
        </>
    );
}
