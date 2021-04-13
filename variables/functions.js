export const colorChange = (item, device, setItem, onChange, color, key, mode, location) => {
    const updated = {
        ...item,
        content: {
            ...item.content,
            [device]: {
                ...item.content[device],
                [location]: {
                    ...item.content[device][location],
                    [key]: {
                        ...item.content[device][location][key],
                        [mode]: color,
                    },
                },
            },
        },
    };
    setItem(updated);
    onChange(updated);
};

export const handleChange = (_e, data, item, setItem, onChange) => {
    const updated = {
        ...item,
        content: {
            ...item.content,
            [data.name]: data.value,
        },
    };
    setItem(updated);
    onChange(updated);
};

export const changeTypo = (_e, data, item, device, setItem, onChange) => {
    const updated = {
        ...item,
        content: {
            ...item.content,
            [device]: {
                ...item.content[device],
                typo: {
                    ...item.content[device].typo,
                    [data.name]: data.value,
                },
            },
        },
    };
    setItem(updated);
    onChange(updated);
};

export const changeTypoUnit = (unit, key, item, device, setItem, onChange) => {
    let sizeTypo = '';

    if (key === 'size') {
        if (unit === 'px') {
            sizeTypo = '42';
        } else {
            sizeTypo = '3';
        }
    } else {
        sizeTypo = '1';
    }

    const updated = {
        ...item,
        content: {
            ...item.content,
            [device]: {
                ...item.content[device],
                typo: {
                    ...item.content[device].typo,
                    [key]: {
                        unit,
                        value: sizeTypo,
                    },
                },
            },
        },
    };
    setItem(updated);
    onChange(updated);
};

export const changeTypoWithKey = (_e, data, key, item, device, setItem, onChange) => {
    const updated = {
        ...item,
        content: {
            ...item.content,
            [device]: {
                ...item.content[device],
                typo: {
                    ...item.content[device].typo,
                    [key]: {
                        ...item.content[device].typo[key],
                        [data.name]: data.value,
                    },
                },
            },
        },
    };
    setItem(updated);
    onChange(updated);
};

export const changeAnimation = (_e, data, item, device, setItem, onChange) => {
    const updated = {
        ...item,
        content: {
            ...item.content,
            [device]: {
                ...item.content[device],
                animation: {
                    ...item.content[device].animation,
                    [data.name]: data.value,
                },
            },
        },
    };
    setItem(updated);
    onChange(updated);
};

export const changeStyle = (_e, data, key, item, device, setItem, onChange) => {
    const updated = {
        ...item,
        styles: {
            ...item.styles,
            [device]: {
                ...item.styles[device],
                [key]: {
                    ...item.styles[device][key],
                    [data.name]: data.value,
                },
            },
        },
    };
    setItem(updated);
    onChange(updated);
};

export const changeStyleUnit = (unit, key, item, device, setItem, onChange) => {
    const updated = {
        ...item,
        styles: {
            ...item.styles,
            [device]: {
                ...item.styles[device],
                [key]: {
                    unit,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                },
            },
        },
    };
    setItem(updated);
    onChange(updated);
};

export const changeBorder = (_e, data, key, mode, item, device, setItem, onChange) => {
    const updated = {
        ...item,
        content: {
            ...item.content,
            [device]: {
                ...item.content[device],
                styles: {
                    ...item.content[device].styles,
                    border: {
                        ...item.content[device].styles.border,
                        [mode]: {
                            ...item.content[device].styles.border[mode],
                            [key]: {
                                ...item.content[device].styles.border[mode][key],
                                [data.name]: data.value,
                            },
                        },
                    },
                },
            },
        },
    };
    setItem(updated);
    onChange(updated);
};

export const changeBorderRadiusUnit = (unit, mode, item, device, setItem, onChange) => {
    const updated = {
        ...item,
        content: {
            ...item.content,
            [device]: {
                ...item.content[device],
                styles: {
                    ...item.content[device].styles,
                    border: {
                        ...item.content[device].styles.border,
                        [mode]: {
                            ...item.content[device].styles.border[mode],
                            radius: {
                                ...item.content[device].styles.border[mode].radius,
                                unit,
                            },
                        },
                    },
                },
            },
        },
    };
    setItem(updated);
    onChange(updated);
};

export const changeBorderType = (_e, data, mode, item, device, setItem, onChange) => {
    const updated = {
        ...item,
        content: {
            ...item.content,
            [device]: {
                ...item.content[device],
                styles: {
                    ...item.content[device].styles,
                    border: {
                        ...item.content[device].styles.border,
                        [mode]: {
                            ...item.content[device].styles.border[mode],
                            [data.name]: data.value,
                        },
                    },
                },
            },
        },
    };
    setItem(updated);
    onChange(updated);
};

export const changeBorderColor = (color, mode, item, device, setItem, onChange) => {
    const updated = {
        ...item,
        content: {
            ...item.content,
            [device]: {
                ...item.content[device],
                styles: {
                    ...item.content[device].styles,
                    border: {
                        ...item.content[device].styles.border,
                        [mode]: {
                            ...item.content[device].styles.border[mode],
                            color,
                        },
                    },
                },
            },
        },
    };
    setItem(updated);
    onChange(updated);
};

export const changeImageValueUnit = (unit, key, value, item, device, setItem, onChange) => {
    let data = '';
    if (unit === 'px') {
        if (value === 'height') {
            data = 'auto';
        } else {
            data = '300';
        }
    } else {
        data = '100';
    }

    const updated = {
        ...item,
        content: {
            ...item.content,
            [device]: {
                ...item.content[device],
                image: {
                    ...item.content[device].image,
                    [key]: {
                        ...item.content[device].image[key],
                        [value]: {
                            ...item.content[device].image[key][value],
                            unit,
                            value: data,
                        },
                    },
                },
            },
        },
    };
    setItem(updated);
    onChange(updated);
};

export const changeImageValue = (e, data, key, value, item, device, setItem, onChange) => {
    const updated = {
        ...item,
        content: {
            ...item.content,
            [device]: {
                ...item.content[device],
                image: {
                    ...item.content[device].image,
                    [key]: {
                        ...item.content[device].image[key],
                        [value]: {
                            ...item.content[device].image[key][value],
                            [data.name]: data.value,
                        },
                    },
                },
            },
        },
    };
    setItem(updated);
    onChange(updated);
};

export const changeOpacity = (e, data, key, mode, item, device, setItem, onChange) => {
    const updated = {
        ...item,
        content: {
            ...item.content,
            [device]: {
                ...item.content[device],
                image: {
                    ...item.content[device].image,
                    [key]: {
                        ...item.content[device].image[key],
                        [mode]: data.value,
                    },
                },
            },
        },
    };
    setItem(updated);
    onChange(updated);
};

export const change = (_e, data, item, setItem, onChange) => {
    const updated = {
        ...item,
        content: {
            ...item.content,
            [data.name]: data.value,
        },
    };
    setItem(updated);
    onChange(updated);
};

export const changeImage = (file, item, setItem, onChange) => {
    const updated = {
        ...item,
        content: {
            ...item.content,
            image: file,
        },
    };
    setItem(updated);
    onChange(updated);
};
