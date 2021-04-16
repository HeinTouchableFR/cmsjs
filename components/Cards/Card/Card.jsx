import React from 'react';
import styles from 'components/Cards/Card/Card.module.scss';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';

export default function Card({ color, children }) {
    const elements = React.Children.map(children, (child) => React.cloneElement(child, {
    }));

    return (
        <div className={`${styles.card} ${color && styles[color]}`}>
            {elements}
        </div>
    );
}

Card.Header = Header;
Card.Body = Body;
Card.Footer = Footer;
