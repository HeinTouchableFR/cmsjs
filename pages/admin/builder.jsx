import React from 'react';
import Builder from '../../container/Builder/builder';

export default function Index() {
    //Page a créer ou modifier
    const page = {};
    page.nom = 'Ma super Page';
    page.contenu = {};
    page.contenu.dispositions = [];

    return (
        <>
            <Builder page={page} />
        </>
    );
}
