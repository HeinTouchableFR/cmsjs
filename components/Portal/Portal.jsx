import {
    useEffect, useState,
} from 'react';
import styles from 'components/Portal/Portal.module.scss';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import Pallet from './Pallet';

export default function Portal({ open, onClose, transition, children, top, left }) {
    let domNode;

    const [render, setRender] = useState(false);

    /**
     * Allows to create or delete the Dom portal and trigger animations
     */
    useEffect(() => {
        if (open) {
            domNode = document.getElementById('portal');
            if (!domNode) {
                domNode = document.createElement('div');
                domNode.classList.add(styles.portal);
                domNode.classList.add(styles[transition.animation]);
                domNode.style.animationDuration = `${transition.duration}ms`
                domNode.id = 'portal';
                document.body.append(domNode);
            }
            domNode.classList.remove(styles.out);
            domNode.classList.add(styles.in);
            setRender(true);
        } else {
            domNode = document.getElementById('portal');
            if (domNode) {
                domNode.classList.remove(styles.in);
                domNode.classList.add(styles.out);
                const timer = setTimeout(() => {
                    setRender(false);
                    domNode.remove();
                }, transition.duration);
                return () => clearTimeout(timer);
            }
        }
    }, [open]);

    /**
     * Allows to change the position of the window according to the click
     */
    useEffect(() => {
        domNode = document.getElementById('portal');
        if (domNode) {
            domNode.style.top = `${top}px`;
            domNode.style.left = `${left}px`;
        }
    }, [top, left]);

    /**
     * Allows to close the window when clicking outside
     */
    useEffect(() => {
        function handleClickOutside(event) {
            domNode = document.getElementById('portal');
            if (domNode && !domNode.contains(event.target)) {
                onClose(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (render && createPortal(children, document.getElementById('portal')));
}

Portal.Pallet = Pallet

Portal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    transition: PropTypes.shape({
        animation: PropTypes.string.isRequired,
        duration: PropTypes.number,
    }),
};

Portal.defaultProps = {
    transition: {
        animation: 'fly_down', duration: 500,
    },
};
