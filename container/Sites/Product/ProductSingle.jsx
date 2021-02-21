import styles from './single.module.scss';
import React from 'react';

export default function ProductSingle({ item }) {
    return (
        <>
            <header className={styles.produit_header}>
                <div>
                    <div className={styles.produit__photos}>
                        <a href='#'>
                            <img className={item.produit__photo} src={item.imageEnAvant ? item.imageEnAvant.url : '/empty.png'} alt={item.nom} />
                        </a>
                    </div>
                </div>
                <div>
                    <h1 className={styles.produit__title}>{item.nom}</h1>
                    <div className={styles.produit__meta}>
                        <div className={styles.produit__price} id='product-price'>
                            {item.prix} €
                        </div>
                    </div>
                    <div className={styles.produit__form} id='produit-form'>
                        <form action='#' className={styles.search_form__form}>
                            <input type='hidden' id='product' name='product' value={item._id} />
                            <input type='hidden' id='variation' name='variation' value='{{ variation ? variation.id : null }}' />
                            <div className={styles.form_group}>
                                <input type='number' className={styles.form_control} id='quantite' value='1' name='quantite' />
                                <label htmlFor='quantite'>Quantité</label>
                            </div>
                            <div className='alert' role='alert' id='product-alerte' />
                            <button type='submit' className={styles.btn} id='produit-form-btn'>
                                Ajouter au panier
                            </button>
                        </form>
                    </div>
                </div>
            </header>
            <div className={styles.produit_body}>
                <h2 className={styles.produit_body__title}>Description</h2>
                <div className={styles.formatted}>{item.description}</div>
            </div>
        </>
    );
}
