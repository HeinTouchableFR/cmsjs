import React from 'react';
import styles from './builder.module.scss';
import AjouterDisposition from './AjouterDisposition';
import Disposition from './Disposition';

export default function Content({
    dispositions,
    setDispositions,
    ajouterDisposition,
    modifierDisposition,
    supprimerDisposition,
    onElementClick,
    currentElement,
    setCurrentElement,
}) {
    /**
     * Permet de réorganiser la lise des dispositions via drag and drop
     * @param list
     * @param startIndex
     * @param endIndex
     * @return {unknown[]}
     */
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    return (
        <>
            <div className={`${styles.content} ${styles.container}`}>
                {dispositions.map((item) => (
                    <Disposition
                        key={item.id}
                        disposition={item}
                        modifierDisposition={modifierDisposition}
                        supprimerDisposition={supprimerDisposition}
                        onElementClick={onElementClick}
                        currentElement={currentElement}
                        setCurrentElement={setCurrentElement}
                    />
                ))}
                <AjouterDisposition handleAddDisposition={ajouterDisposition} />
            </div>
        </>
    );
}
