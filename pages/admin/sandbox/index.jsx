import React from 'react';
import DarkModeButton from 'components/Button/DarkModeButton/DarkModeButton';
import Card from 'components/Cards/Card/Card';

export default function Index() {
    return (
        <>
            <DarkModeButton />
            <div className='sandbox-container'>
                <Card color={'teal'}>
                    <Card.Header title='Titre de la carte' buttonAction={'/'} buttonLabel={'Mon bouton'} meta={'La petite phrase méta'} />
                    <Card.Body>
                        Le contenu de la carte
                    </Card.Body>
                    <Card.Footer>
                        Footer
                    </Card.Footer>
                </Card>
            </div>
        </>
    );
}
/*

 */
