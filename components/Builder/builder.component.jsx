import React, {useState} from "react";
import Content from "./content.component";
import Navigation from "./navigation.component";
import styles from './builder.module.scss'


export default function Builder({page}) {
    const [dispositions, setDispositions] = useState(page.contenu.dispositions)

    /**
     * Permet d'ajouter une disposition
     */
    const ajouterDisposition = function () {
        const disposition = {}
        disposition.id = new Date().getTime()
        disposition.nbColumns = 0
        disposition.elements = []

        setDispositions([...dispositions, disposition])
    }

    /**
     * Permet de mettre à jour une disposition
     * @param disposition
     */
    const modifierDisposition = function (disposition) {
        setDispositions(dispositions.map(d => d.id === disposition.id ? disposition : d))
    }

    /**
     * Permet de supprimer une disposition
     * @param disposition
     */
    const supprimerDisposition = function (disposition) {
        setDispositions(dispositions.filter(d => d !== disposition))
    }

    return (
        <>
            <div className={styles.builder}>
                <Navigation />
                <Content dispositions={dispositions} setDispositions={setDispositions} ajouterDisposition={ajouterDisposition} modifierDisposition={modifierDisposition} supprimerDisposition={supprimerDisposition} />
            </div>
            </>
    )
}
