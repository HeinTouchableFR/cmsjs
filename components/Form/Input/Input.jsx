import React from 'react';
import styles from 'components/Form/Input/Input.module.scss'

export default function Input({label, name, placeholder, type = "text", required}) {

    return (
        <>
            <div className={`${styles.field}`}>
                <label>{label}</label>
                <div className={``}>
                    <input type={type} placeholder={placeholder} name={name} required={required}/>
                </div>
            </div>
        </>
    );
}
