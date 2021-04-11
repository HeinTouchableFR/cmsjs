import React, {useState} from 'react';
import styles from 'components/Form/Input/Input.module.scss'

export default function Input({label, defaultValue = "", name, placeholder, type = "text", required, onChange, step, min, max, disabled}) {

    const [value, setValue] = useState(defaultValue)

    const handleChange = (e) => {
        setValue(e.target.value)
        if(onChange){
            const data = {name: name, value: e.target.value}
            onChange(e, data)
        }
    }

    return (
        <>
            <div className={`${styles.field} ${required ? styles.required : ''}`}>
                <label>{label}</label>
                <div className={`${styles.ui}`}>
                    <input type={type} placeholder={placeholder} name={name} required={required} onChange={handleChange} value={value ? value : ""} step={step} min={min} max={max} disabled={disabled}/>
                </div>
            </div>
        </>
    );
}
