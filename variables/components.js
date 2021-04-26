export default class defaultComponents {
    static defaultButton(intl) {
        return {
            tag: '<button>',
            label: intl.formatMessage({
                id: 'button', defaultMessage: 'button',
            }),
            color: 'teal',
            type: 'button',
            defaultValue: {
                text: `${intl.formatMessage({
                    id: 'button.default', defaultMessage: 'My button',
                })}`,
                url: '#',
                alignment: 'left',
                button: {
                    background: {
                        normal: '#5a2fdd',
                        hover: '#422291',
                    },
                    border: {
                        normal: {
                            type: 'solid',
                            width: {
                                top: '1',
                                right: '1',
                                bottom: '1',
                                left: '1',
                            },
                            radius: {
                                unit: 'px',
                                top: '5',
                                right: '5',
                                bottom: '5',
                                left: '5',
                            },
                            color: '#5a2fdd',
                        },
                        hover: {
                            type: 'solid',
                            width: {
                                top: '1',
                                right: '1',
                                bottom: '1',
                                left: '1',
                            },
                            radius: {
                                unit: 'px',
                                top: '5',
                                right: '5',
                                bottom: '5',
                                left: '5',
                            },
                            color: '#422291',
                        },
                    },
                    padding: {
                        unit: 'px',
                        top: '10',
                        left: '20',
                        right: '20',
                        bottom: '10',
                    },
                },
                desktop: {
                    typo: {
                        family: 'Roboto',
                        size: {
                            unit: 'rem',
                            value: '1',
                        },
                        weight: '300',
                        transform: 'initial',
                        style: 'normal',
                        decoration: '',
                        lineHeight: {
                            unit: 'em',
                            value: '1',
                        },
                        letterSpacing: '0',
                        color: {
                            normal: '#FFFFFF',
                            hover: '#FFFFFF',
                        },
                    },
                    styles: {
                        background: {
                            normal: '',
                            hover: '',
                        },
                        border: {
                            normal: {
                                type: 'none',
                                width: {
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0,
                                },
                                radius: {
                                    unit: 'px',
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0,
                                },
                                color: 'inherit',
                            },
                            hover: {
                                type: 'none',
                                width: {
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0,
                                },
                                radius: {
                                    unit: 'px',
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0,
                                },
                                color: 'inherit',
                            },
                        },
                    },
                    animation: {
                        name: 'none',
                        duration: '1s',
                        delay: '0',
                    },
                },
                tablet: {
                    typo: {
                        family: '',
                        size: {
                            unit: '',
                            value: '',
                        },
                        weight: '',
                        transform: '',
                        style: '',
                        decoration: '',
                        lineHeight: {
                            unit: '',
                            value: '',
                        },
                        letterSpacing: '',
                        color: {
                            normal: '',
                            hover: '',
                        },
                    },
                    styles: {
                        background: {
                            normal: '',
                            hover: '',
                        },
                        border: {
                            normal: {
                                type: '',
                                width: {
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                radius: {
                                    unit: '',
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                color: '',
                            },
                            hover: {
                                type: '',
                                width: {
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                radius: {
                                    unit: '',
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                color: '',
                            },
                        },
                    },
                    animation: {
                        name: '',
                        duration: '',
                        delay: '',
                    },
                },
                mobile: {
                    typo: {
                        family: '',
                        size: {
                            unit: '',
                            value: '',
                        },
                        weight: '',
                        transform: '',
                        style: '',
                        decoration: '',
                        lineHeight: {
                            unit: '',
                            value: '',
                        },
                        letterSpacing: '',
                        color: {
                            normal: '',
                            hover: '',
                        },
                    },
                    styles: {
                        background: {
                            normal: '',
                            hover: '',
                        },
                        border: {
                            normal: {
                                type: '',
                                width: {
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                radius: {
                                    unit: '',
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                color: '',
                            },
                            hover: {
                                type: '',
                                width: {
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                radius: {
                                    unit: '',
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                color: '',
                            },
                        },
                    },
                    animation: {
                        name: '',
                        duration: '',
                        delay: '',
                    },
                },
                styles: {
                    textShadow: {
                        color: '',
                        blur: '10',
                        horizontal: '0',
                        vertical: '10',
                    },
                },
            },
        };
    }

    static defaultTitle(intl) {
        return {
            tag: '<h1>',
            label: intl.formatMessage({
                id: 'title', defaultMessage: 'Title',
            }),
            color: 'blue',
            type: 'title',
            defaultValue: {
                text: `${intl.formatMessage({
                    id: 'title.default', defaultMessage: 'My great title',
                })}`,
                tag: 'h2',
                alignment: 'left',
                desktop: {
                    typo: {
                        family: 'Roboto',
                        size: {
                            unit: 'px',
                            value: '42',
                        },
                        weight: '600',
                        transform: 'initial',
                        style: 'normal',
                        decoration: '',
                        lineHeight: {
                            unit: 'em',
                            value: '1',
                        },
                        letterSpacing: '0',
                        color: {
                            normal: '#CC3E33',
                            hover: '#CC7E5A',
                        },
                    },
                    styles: {
                        background: {
                            normal: '',
                            hover: '',
                        },
                        border: {
                            normal: {
                                type: 'none',
                                width: {
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0,
                                },
                                radius: {
                                    unit: 'px',
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0,
                                },
                                color: 'inherit',
                            },
                            hover: {
                                type: 'none',
                                width: {
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0,
                                },
                                radius: {
                                    unit: 'px',
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0,
                                },
                                color: 'inherit',
                            },
                        },
                    },
                    animation: {
                        name: 'none',
                        duration: '1s',
                        delay: '0',
                    },
                },
                tablet: {
                    typo: {
                        family: '',
                        size: {
                            unit: '',
                            value: '',
                        },
                        weight: '',
                        transform: '',
                        style: '',
                        decoration: '',
                        lineHeight: {
                            unit: '',
                            value: '',
                        },
                        letterSpacing: '',
                        color: {
                            normal: '',
                            hover: '',
                        },
                    },
                    styles: {
                        background: {
                            normal: '',
                            hover: '',
                        },
                        border: {
                            normal: {
                                type: '',
                                width: {
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                radius: {
                                    unit: '',
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                color: '',
                            },
                            hover: {
                                type: '',
                                width: {
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                radius: {
                                    unit: '',
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                color: '',
                            },
                        },
                    },
                    animation: {
                        name: '',
                        duration: '',
                        delay: '',
                    },
                },
                mobile: {
                    typo: {
                        family: '',
                        size: {
                            unit: '',
                            value: '',
                        },
                        weight: '',
                        transform: '',
                        style: '',
                        decoration: '',
                        lineHeight: {
                            unit: '',
                            value: '',
                        },
                        letterSpacing: '',
                        color: {
                            normal: '',
                            hover: '',
                        },
                    },
                    styles: {
                        background: {
                            normal: '',
                            hover: '',
                        },
                        border: {
                            normal: {
                                type: '',
                                width: {
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                radius: {
                                    unit: '',
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                color: '',
                            },
                            hover: {
                                type: '',
                                width: {
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                radius: {
                                    unit: '',
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                color: '',
                            },
                        },
                    },
                    animation: {
                        name: '',
                        duration: '',
                        delay: '',
                    },
                },
                styles: {
                    textShadow: {
                        color: '',
                        blur: '10',
                        horizontal: '0',
                        vertical: '10',
                    },
                },
            },
        };
    }

    static defaultText(intl) {
        return {
            tag: '<p>',
            label: intl.formatMessage({
                id: 'textEditor', defaultMessage: 'Text',
            }),
            color: 'violet',
            type: 'text',
            defaultValue: {
                text: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>',
                alignment: 'left',
                desktop: {
                    typo: {
                        family: 'Roboto',
                        size: {
                            unit: 'px',
                            value: '16',
                        },
                        weight: '300',
                        transform: 'initial',
                        style: 'normal',
                        decoration: '',
                        lineHeight: {
                            unit: 'em',
                            value: '1',
                        },
                        letterSpacing: '0',
                        color: {
                            normal: '#000',
                            hover: '#000',
                        },
                    },
                    styles: {
                        background: {
                            normal: '',
                            hover: '',
                        },
                        border: {
                            normal: {
                                type: 'none',
                                width: {
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0,
                                },
                                radius: {
                                    unit: 'px',
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0,
                                },
                                color: 'inherit',
                            },
                            hover: {
                                type: 'none',
                                width: {
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0,
                                },
                                radius: {
                                    unit: 'px',
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0,
                                },
                                color: 'inherit',
                            },
                        },
                    },
                    animation: {
                        name: 'none',
                        duration: '1s',
                        delay: '0',
                    },
                },
                tablet: {
                    typo: {
                        family: '',
                        size: {
                            unit: '',
                            value: '',
                        },
                        weight: '',
                        transform: '',
                        style: '',
                        decoration: '',
                        lineHeight: {
                            unit: '',
                            value: '',
                        },
                        letterSpacing: '',
                        color: {
                            normal: '',
                            hover: '',
                        },
                    },
                    styles: {
                        background: {
                            normal: '',
                            hover: '',
                        },
                        border: {
                            normal: {
                                type: '',
                                width: {
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                radius: {
                                    unit: '',
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                color: '',
                            },
                            hover: {
                                type: '',
                                width: {
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                radius: {
                                    unit: '',
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                color: '',
                            },
                        },
                    },
                    animation: {
                        name: '',
                        duration: '',
                        delay: '',
                    },
                },
                mobile: {
                    typo: {
                        family: '',
                        size: {
                            unit: '',
                            value: '',
                        },
                        weight: '',
                        transform: '',
                        style: '',
                        decoration: '',
                        lineHeight: {
                            unit: '',
                            value: '',
                        },
                        letterSpacing: '',
                        color: {
                            normal: '',
                            hover: '',
                        },
                    },
                    styles: {
                        background: {
                            normal: '',
                            hover: '',
                        },
                        border: {
                            normal: {
                                type: '',
                                width: {
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                radius: {
                                    unit: '',
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                color: '',
                            },
                            hover: {
                                type: '',
                                width: {
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                radius: {
                                    unit: '',
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                color: '',
                            },
                        },
                    },
                    animation: {
                        name: '',
                        duration: '',
                        delay: '',
                    },
                },
            },
        };
    }

    static defaultImage(intl) {
        return {
            tag: '<img/>',
            label: intl.formatMessage({
                id: 'image', defaultMessage: 'Image',
            }),
            color: 'orange',
            type: 'image',
            defaultValue: {
                image: {
                    url: '/placeholder.png',
                    name: 'placeholder.png',
                    originalName: 'placeholder.png',
                },
                alignment: 'left',
                desktop: {
                    image: {
                        size: {
                            width: {
                                unit: '%',
                                value: '100',
                            },
                            maxWidth: {
                                unit: '%',
                                value: '100',
                            },
                            height: {
                                unit: 'px',
                                value: 'auto',
                            },
                        },
                        opacity: {
                            normal: '1',
                            hover: '',
                        },
                    },
                    styles: {
                        background: {
                            normal: '',
                            hover: '',
                        },
                        border: {
                            normal: {
                                type: 'none',
                                width: {
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0,
                                },
                                radius: {
                                    unit: 'px',
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0,
                                },
                                color: 'inherit',
                            },
                            hover: {
                                type: 'none',
                                width: {
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0,
                                },
                                radius: {
                                    unit: 'px',
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0,
                                },
                                color: 'inherit',
                            },
                        },
                    },
                    animation: {
                        name: 'none',
                        duration: '1s',
                        delay: '0',
                    },
                },
                tablet: {
                    image: {
                        size: {
                            width: {
                                unit: '',
                                value: '',
                            },
                            maxWidth: {
                                unit: '',
                                value: '',
                            },
                            height: {
                                unit: '',
                                value: '',
                            },
                        },
                        opacity: {
                            normal: '',
                            hover: '',
                        },
                    },
                    styles: {
                        background: {
                            normal: '',
                            hover: '',
                        },
                        border: {
                            normal: {
                                type: '',
                                width: {
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                radius: {
                                    unit: '',
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                color: '',
                            },
                            hover: {
                                type: '',
                                width: {
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                radius: {
                                    unit: '',
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                color: '',
                            },
                        },
                    },
                    animation: {
                        name: '',
                        duration: '',
                        delay: '',
                    },
                },
                mobile: {
                    image: {
                        size: {
                            width: {
                                unit: '',
                                value: '',
                            },
                            maxWidth: {
                                unit: '',
                                value: '',
                            },
                            height: {
                                unit: '',
                                value: '',
                            },
                        },
                        opacity: {
                            normal: '',
                            hover: '',
                        },
                    },
                    styles: {
                        background: {
                            normal: '',
                            hover: '',
                        },
                        border: {
                            normal: {
                                type: '',
                                width: {
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                radius: {
                                    unit: '',
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                color: '',
                            },
                            hover: {
                                type: '',
                                width: {
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                radius: {
                                    unit: '',
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                color: '',
                            },
                        },
                    },
                    animation: {
                        name: '',
                        duration: '',
                        delay: '',
                    },
                },
            },
        };
    }

    static defaultLink(intl) {
        return {
            tag: '<Link>',
            label: intl.formatMessage({
                id: 'link', defaultMessage: 'link',
            }),
            color: 'purple',
            type: 'link',
            defaultValue: {
                text: `${intl.formatMessage({
                    id: 'link.default', defaultMessage: 'My great link',
                })}`,
                url: '#',
                alignment: 'left',
                desktop: {
                    typo: {
                        family: 'Roboto',
                        size: {
                            unit: 'px',
                            value: '16',
                        },
                        weight: '300',
                        transform: 'initial',
                        style: 'normal',
                        decoration: ['underline'],
                        lineHeight: {
                            unit: 'em',
                            value: '1',
                        },
                        letterSpacing: '0',
                        color: {
                            normal: '#5a2fdd',
                            hover: '#222222',
                        },
                    },
                    styles: {
                        background: {
                            normal: '',
                            hover: '',
                        },
                        border: {
                            normal: {
                                type: 'none',
                                width: {
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0,
                                },
                                radius: {
                                    unit: 'px',
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0,
                                },
                                color: 'inherit',
                            },
                            hover: {
                                type: 'none',
                                width: {
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0,
                                },
                                radius: {
                                    unit: 'px',
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0,
                                },
                                color: 'inherit',
                            },
                        },
                    },
                    animation: {
                        name: 'none',
                        duration: '1s',
                        delay: '0',
                    },
                },
                tablet: {
                    typo: {
                        family: '',
                        size: {
                            unit: '',
                            value: '',
                        },
                        weight: '',
                        transform: '',
                        style: '',
                        decoration: '',
                        lineHeight: {
                            unit: '',
                            value: '',
                        },
                        letterSpacing: '',
                        color: {
                            normal: '',
                            hover: '',
                        },
                    },
                    styles: {
                        background: {
                            normal: '',
                            hover: '',
                        },
                        border: {
                            normal: {
                                type: '',
                                width: {
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                radius: {
                                    unit: '',
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                color: '',
                            },
                            hover: {
                                type: '',
                                width: {
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                radius: {
                                    unit: '',
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                color: '',
                            },
                        },
                    },
                    animation: {
                        name: '',
                        duration: '',
                        delay: '',
                    },
                },
                mobile: {
                    typo: {
                        family: '',
                        size: {
                            unit: '',
                            value: '',
                        },
                        weight: '',
                        transform: '',
                        style: '',
                        decoration: '',
                        lineHeight: {
                            unit: '',
                            value: '',
                        },
                        letterSpacing: '',
                        color: {
                            normal: '',
                            hover: '',
                        },
                    },
                    styles: {
                        background: {
                            normal: '',
                            hover: '',
                        },
                        border: {
                            normal: {
                                type: '',
                                width: {
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                radius: {
                                    unit: '',
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                color: '',
                            },
                            hover: {
                                type: '',
                                width: {
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                radius: {
                                    unit: '',
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                color: '',
                            },
                        },
                    },
                    animation: {
                        name: '',
                        duration: '',
                        delay: '',
                    },
                },
                styles: {
                    textShadow: {
                        color: '',
                        blur: '10',
                        horizontal: '0',
                        vertical: '10',
                    },
                },
            },
        };
    }

    static defaultLogo(intl) {
        return {
            tag: '<img/>',
            label: intl.formatMessage({
                id: 'logo', defaultMessage: 'Logo',
            }),
            color: 'blue',
            type: 'logo',
            defaultValue: {
                alignment: 'left',
                desktop: {
                    image: {
                        size: {
                            width: {
                                unit: '%',
                                value: '100',
                            },
                            maxWidth: {
                                unit: '%',
                                value: '100',
                            },
                            height: {
                                unit: 'px',
                                value: 'auto',
                            },
                        },
                        opacity: {
                            normal: '1',
                            hover: '',
                        },
                    },
                    styles: {
                        background: {
                            normal: '',
                            hover: '',
                        },
                        border: {
                            normal: {
                                type: 'none',
                                width: {
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0,
                                },
                                radius: {
                                    unit: 'px',
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0,
                                },
                                color: 'inherit',
                            },
                            hover: {
                                type: 'none',
                                width: {
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0,
                                },
                                radius: {
                                    unit: 'px',
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0,
                                },
                                color: 'inherit',
                            },
                        },
                    },
                    animation: {
                        name: 'none',
                        duration: '1s',
                        delay: '0',
                    },
                },
                tablet: {
                    image: {
                        size: {
                            width: {
                                unit: '',
                                value: '',
                            },
                            maxWidth: {
                                unit: '',
                                value: '',
                            },
                            height: {
                                unit: '',
                                value: '',
                            },
                        },
                        opacity: {
                            normal: '',
                            hover: '',
                        },
                    },
                    styles: {
                        background: {
                            normal: '',
                            hover: '',
                        },
                        border: {
                            normal: {
                                type: '',
                                width: {
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                radius: {
                                    unit: '',
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                color: '',
                            },
                            hover: {
                                type: '',
                                width: {
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                radius: {
                                    unit: '',
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                color: '',
                            },
                        },
                    },
                    animation: {
                        name: '',
                        duration: '',
                        delay: '',
                    },
                },
                mobile: {
                    image: {
                        size: {
                            width: {
                                unit: '',
                                value: '',
                            },
                            maxWidth: {
                                unit: '',
                                value: '',
                            },
                            height: {
                                unit: '',
                                value: '',
                            },
                        },
                        opacity: {
                            normal: '',
                            hover: '',
                        },
                    },
                    styles: {
                        background: {
                            normal: '',
                            hover: '',
                        },
                        border: {
                            normal: {
                                type: '',
                                width: {
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                radius: {
                                    unit: '',
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                color: '',
                            },
                            hover: {
                                type: '',
                                width: {
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                radius: {
                                    unit: '',
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                color: '',
                            },
                        },
                    },
                    animation: {
                        name: '',
                        duration: '',
                        delay: '',
                    },
                },
            },
        };
    }

    static defaultMenu(intl) {
        return {
            tag: '<nav/>',
            label: intl.formatMessage({
                id: 'menu', defaultMessage: 'Menu',
            }),
            color: 'yellow',
            type: 'menu',
            defaultValue: {
                menu: {
                    value: 'jBAOJwV8A1DWnzkP5PEQ',
                },
                alignment: 'flex-end',
                desktop: {
                    typo: {
                        family: 'Roboto',
                        size: {
                            unit: 'px',
                            value: '18',
                        },
                        weight: '500',
                        transform: 'initial',
                        style: 'normal',
                        decoration: '',
                        lineHeight: {
                            unit: 'em',
                            value: '1',
                        },
                        letterSpacing: '0',
                        color: {
                            normal: '#000',
                            hover: '#ff792d',
                        },
                    },
                    styles: {
                        background: {
                            normal: '',
                            hover: '',
                        },
                        border: {
                            normal: {
                                type: 'none',
                                width: {
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0,
                                },
                                radius: {
                                    unit: 'px',
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0,
                                },
                                color: 'inherit',
                            },
                            hover: {
                                type: 'none',
                                width: {
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0,
                                },
                                radius: {
                                    unit: 'px',
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0,
                                },
                                color: 'inherit',
                            },
                        },
                    },
                    animation: {
                        name: 'none',
                        duration: '1s',
                        delay: '0',
                    },
                },
                tablet: {
                    typo: {
                        family: '',
                        size: {
                            unit: '',
                            value: '',
                        },
                        weight: '',
                        transform: '',
                        style: '',
                        decoration: '',
                        lineHeight: {
                            unit: '',
                            value: '',
                        },
                        letterSpacing: '',
                        color: {
                            normal: '',
                            hover: '',
                        },
                    },
                    styles: {
                        background: {
                            normal: '',
                            hover: '',
                        },
                        border: {
                            normal: {
                                type: '',
                                width: {
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                radius: {
                                    unit: '',
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                color: '',
                            },
                            hover: {
                                type: '',
                                width: {
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                radius: {
                                    unit: '',
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                color: '',
                            },
                        },
                    },
                    animation: {
                        name: '',
                        duration: '',
                        delay: '',
                    },
                },
                mobile: {
                    typo: {
                        family: '',
                        size: {
                            unit: '',
                            value: '',
                        },
                        weight: '',
                        transform: '',
                        style: '',
                        decoration: '',
                        lineHeight: {
                            unit: '',
                            value: '',
                        },
                        letterSpacing: '',
                        color: {
                            normal: '',
                            hover: '',
                        },
                    },
                    styles: {
                        background: {
                            normal: '',
                            hover: '',
                        },
                        border: {
                            normal: {
                                type: '',
                                width: {
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                radius: {
                                    unit: '',
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                color: '',
                            },
                            hover: {
                                type: '',
                                width: {
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                radius: {
                                    unit: '',
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                color: '',
                            },
                        },
                    },
                    animation: {
                        name: '',
                        duration: '',
                        delay: '',
                    },
                },
            },
        };
    }

    static pageComponents(intl) {
        return [
            this.defaultButton(intl),
            this.defaultImage(intl),
            this.defaultLink(intl),
            this.defaultText(intl),
            this.defaultTitle(intl),

        ];
    }

    static templateComponents(intl) {
        return [
            this.defaultButton(intl),
            this.defaultImage(intl),
            this.defaultLogo(intl),
            this.defaultMenu(intl),
            this.defaultText(intl),
            this.defaultTitle(intl),
        ];
    }
}
