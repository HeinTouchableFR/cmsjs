import React, {
    useEffect, useState,
} from 'react';
import styles from 'components/Modal/Modal.module.scss';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';

export default function Modal({ closeIcon, open, trigger, onClose, onOpen, children, name }) {
    const [render, setRender] = useState(false);
    let domNode;
    useEffect(() => {
        if (open) {
            domNode = document.getElementById(name);
            if (!domNode) {
                domNode = document.createElement('div');
                domNode.classList.add(styles.ui);
                domNode.id = name;
                const modal = document.createElement('div');
                modal.classList.add(styles.modal);
                domNode.append(modal);
                document.body.append(domNode);
            }
            setRender(true);
        } else {
            domNode = document.getElementById(name);
            if (domNode) {
                setRender(false);
                domNode.remove();
            }
        }
    }, [open]);

    return (
        <>
            {trigger}
            {render && createPortal(
                <>
                    {closeIcon && (
                    <span
                        onClick={onClose}
                        onKeyDown={onClose}
                        role='button'
                        className={`${styles.close} las la-times`}
                        tabIndex={-1}
                    />
                    )}
                    {children}
                </>, document.getElementById(name).firstChild)}
        </>
    );
}

Modal.Header = Header;
Modal.Content = Content;
Modal.Footer = Footer;

Modal.propTypes = {
    open: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    closeIcon: PropTypes.bool,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    trigger: PropTypes.shape({
    }).isRequired,
};

Modal.defaultProps = {
    closeIcon: false,
    onOpen: () => {
    },
    onClose: () => {
    },
};
