import React from "react";
import styles from './builder.module.scss'

export default function Disposition({disposition, modifierDisposition, supprimerDisposition}) {



    const structures = []
    for (let i = 1; i < 7; i++) {
        const structure = {}
        structure.id = new Date().getTime() + i
        structure.nbColumns = i
        structures.push(structure)
    }

    /**
     * Permet de générer le bouton de la structure cible
     * Bouton qui montre la forme de la structure
     * @param structure
     * @return {button}
     */
    const genererStructurePreview = function (structure) {
        const n = structure.nbColumns; // Or something else

        const handleClick = function () {
            definirStructureDisposition(structure)
        }

        return <button className={`${styles.disposition__btn} ${styles.structure}`}
                       onClick={handleClick}>
            {
                [...Array(n)].map((e, i) => <span className={`${styles.structure__element}`}
                                                  key={new Date().getTime() + i}>+</span>)
            }
        </button>
    }

    /**
     * Permet de définir la structure de la disposition
     * @param structure
     */
    const definirStructureDisposition = function (structure) {
        disposition.nbColumns = structure.nbColumns

        /**
         * Permet de générer des éléments et un sous élément
         * En fonction du nombre de colonnes de la disposition
         */
        for (let j = 1; j <= disposition.nbColumns; j++) {
            const element = {}
            element.id = new Date().getTime() + j
            element.subs = []

            const sub = {}
            sub.id = new Date().getTime() + j * 10
            sub.content = null
            sub.item = {}

            element.subs.push(sub)
            disposition.elements.push(element)

        }

        modifierDisposition(disposition)
    }

    /**
     * Permet d'ajouter un élément
     * @param element
     */
    const ajouterSousElement = function (element) {
        const sub = {}
        sub.id = new Date().getTime() + 10
        sub.content = null
        sub.item = {}

        element.subs.push(sub)
        disposition.elements.filter(e => e.id === element.id ? element : e)

        modifierDisposition(disposition)
    }

    /**
     * Permet de supprimer un sous élément
     * @param element
     * @param sousElement
     */
    const supprimerSousElement = function (element, sousElement) {
        element.subs = element.subs.filter(e => e.id !== sousElement.id)
        modifierDisposition(disposition)
    }

    return (
        <div className={`${styles.disposition}`}>

            {disposition.nbColumns > 0 ?
                <div className={`${styles.disposition__container}`}>
                    {
                        disposition.elements && disposition.elements.map(element =>
                            <Elements key={"element-" + element.id} disposition={disposition} element={element}
                                      ajouterSousElement={ajouterSousElement}
                                      supprimerSousElement={supprimerSousElement}/>
                        )
                    }
                </div>
                :
                <div className={`${styles.disposition__no_columns}`}>
                    <p>Choissez une structure</p>
                    <ul>
                        {structures && structures.map(structure => <li key={structure.id}>
                            {genererStructurePreview(structure)}
                        </li>)}
                    </ul>
                </div>
            }
            <button className={`${styles.disposition__remove_btn}`}
                    onClick={() => supprimerDisposition(disposition)}>X
            </button>
        </div>
    )
}


function Elements({element, onClick, ajouterSousElement, supprimerSousElement}) {

    const handleSupprimerSousElement = function (e) {
        supprimerSousElement(element, e)
    }

    return <>
        <div className={styles.element}>
            {
                element.subs && element.subs.map(sub => sub.content ?
                    <ElementPlein key={"full-" + sub.id} sub={sub} supprimerSousElement={handleSupprimerSousElement}
                                  onClick={onClick}/>

                    :
                    <ElementVide key={"empty-" + sub.id} sub={sub} supprimerSousElement={handleSupprimerSousElement}
                                 onClick={onClick}/>
                )
            }
            <button key={"btn-elements" + element.id} className={styles.disposition__ajouter_element}
                    onClick={() => ajouterSousElement(element)}>+
            </button>
        </div>
    </>
}

function ElementVide({sub, supprimerSousElement}) {

    return <>
        <div className={styles.disposition__empty}>
            +
            <button key={"btn-empty" + sub.id} onClick={() => supprimerSousElement(sub)}
                    className={styles.disposition__remove_sub}>X</button>
        </div>
    </>
}

function ElementPlein({sub, supprimerSousElement}) {

    return <>
        <div onClick={handleClick} className="disposition__element-full ql-editor">
            <div dangerouslySetInnerHTML={{__html: sub.content}}/>
            <button key={"btn-full" + sub.id} onClick={() => supprimerSousElement(sub)}
                    className="disposition__remove-sub-btn">X
            </button>
        </div>
    </>


}
