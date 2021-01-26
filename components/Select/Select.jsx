import styles from './select.module.scss'
import React from "react";
import Select from "react-select";


export default function SelectCustom({items, item, onChange, multi = false}) {

    const handleChange = function (e) {

        if(multi){
            onChange(e.value)
        }else{
            onChange(items[e.value.value])
        }
    }

    const options = []

    if(item){
        items.map((i, k) => i._id !== item._id && options.push({ value: k, label: i.nom }))
    }else{
        items.map((i, k) => options.push({ value: k, label: i.nom }))
    }

    return multi ? <Select options={options} isMulti onChange={value => handleChange({ value })} /> : <Select options={options} onChange={value => handleChange({ value })} />
}

