import React, { useState } from 'react';
import DarkModeButton from 'components/Button/DarkModeButton/DarkModeButton';
import Modal from 'components/Modal/Modal';
import Multiple from '../../../components/FileManager/Button/Multiple/Multiple';
import Button from '../../../components/Button/Button';

export default function Index() {
    const [open, setOpen] = useState(false);
    const trigger = (
        <Multiple
            onClick={() => setOpen(true)}
            files={[]}
        />
    );
    return (
        <>
            <DarkModeButton />
            <div className='sandbox-container'>
                <Modal
                    closeIcon
                    trigger={trigger}
                    open={open}
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    name='modal'
                >
                    <Modal.Header
                        title='Mon super titre'
                        icon='la-archive'
                    />
                    <Modal.Content>
                        <p>Faire cuire le riz dans 15 cl d'eau : porter à ébullition 2 minutes et laisser gonfler 10 minutes à petit feu couvert. Laisser refroidir.</p>
                        <p>Faire bouillir le vinaigre de riz avec le sucre et le sel. Laisser refroidir. Incorporer l'assaisonnement au riz.</p>
                    </Modal.Content>
                    <Modal.Footer>
                        <Button
                            loading
                            label='Mon bouton'
                        />
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
}
