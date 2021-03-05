import React, {useEffect, useState} from 'react'
import reactCSS from 'reactcss'
import {SketchPicker} from 'react-color'

export default function ColorPicker({defaultColor = '#FF0000', onColorChange}) {
    const [state, setState] = useState({
        displayColorPicker: false,
        color: defaultColor,
    })

    useEffect(function () {
        setState({
            displayColorPicker: false,
            color: defaultColor,
        })
    }, [defaultColor])

    const handleClick = () => {
        setState({...state, displayColorPicker: !state.displayColorPicker})
    };

    const handleClose = () => {
        setState({...state, displayColorPicker: false})
    };

    const handleChange = (color) => {
        onColorChange(color.hex)
        setState({...state, color: color.hex})
    };

    const styles = reactCSS({
        'default': {
            color: {
                width: '36px',
                height: '14px',
                borderRadius: '2px',
                background: `${state.color}`,
            },
            swatch: {
                padding: '5px',
                background: '#fff',
                borderRadius: '1px',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                display: 'inline-block',
                cursor: 'pointer',
            },
            popover: {
                position: 'absolute',
                zIndex: '2',
            },
            cover: {
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
            },
        },
    });

    return (
        <div>
            <div style={styles.swatch} onClick={handleClick}>
                <div style={styles.color}/>
            </div>
            {state.displayColorPicker ? <div style={styles.popover}>
                <div style={styles.cover} onClick={handleClose}/>
                <SketchPicker color={state.color} onChange={handleChange}/>
            </div> : null}

        </div>
    )

}
