import React from 'react';
import Link from 'next/link';

export default function Item({item}) {

    return <li className={"nav__menu_item"}>
        <Link href={`${item.slug}`}>
            <a>{item.label}</a>
        </Link>
        {item.child.length > 0 &&
        <ul className={"sub"}>
            {item.child.map(item => <Item key={item.slug} item={item}/>)}
        </ul>
        }
    </li>
}
