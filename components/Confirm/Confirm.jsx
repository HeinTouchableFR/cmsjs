import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal/Modal';
import Button from 'components/Button/Button';

export default function Confirm({ cancelButton, confirmButton, content, onCancel, onConfirm, open, name }) {
    return (
        <>
            <Modal
                name={name}
                open={open}
                onClose={onCancel}
            >
                <Modal.Content>
                    {content}
                </Modal.Content>
                <Modal.Footer>
                    <Button
                        label={cancelButton}
                        onClick={onCancel}
                    />
                    <Button
                        label={confirmButton}
                        onClick={onConfirm}
                    />
                </Modal.Footer>
            </Modal>
        </>
    );
}

Confirm.propTypes = {
    open: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    content: PropTypes.string,
    cancelButton: PropTypes.string,
    confirmButton: PropTypes.string,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
};

Confirm.defaultProps = {
    content: '',
    cancelButton: 'No',
    confirmButton: 'Yes',
    onConfirm: () => {
    },
    onCancel: () => {
    },
};
