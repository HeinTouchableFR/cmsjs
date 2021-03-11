export default class defaultComponents {

    static defaultTitle(intl) {
        return {
            tag: '<h1>',
            label: intl.formatMessage({id: 'title', defaultMessage: 'Title'}),
            color: 'orange',
            type: 'title',
            defaultValue: {
                text: `${intl.formatMessage({id: 'title.default', defaultMessage: 'My great title'})}`,
                tag: 'h2',
                alignment: 'left',
                desktop: {
                    typo: {
                        family: 'Roboto',
                        size: {
                            unit: 'px',
                            value: '42'
                        },
                        weight: '600',
                        transform: 'initial',
                        style: 'normal',
                        decoration: 'none',
                        lineHeight: {
                            unit: 'em',
                            value: '1'
                        },
                        letterSpacing: '0',
                        color: {
                            normal: '#CC3E33',
                            hover: '#CC7E5A',
                        },
                    },
                    styles: {
                        background: {
                            normal: '#FFFFFF00',
                            hover: '#FFFFFF00',
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
                    }
                },
                tablet: {
                    typo: {
                        family: '',
                        size: {
                            unit: '',
                            value: ''
                        },
                        weight: '',
                        transform: '',
                        style: '',
                        decoration: '',
                        lineHeight: {
                            unit: '',
                            value: ''
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
                    }
                },
                mobile: {
                    typo: {
                        family: '',
                        size: {
                            unit: '',
                            value: ''
                        },
                        weight: '',
                        transform: '',
                        style: '',
                        decoration: '',
                        lineHeight: {
                            unit: '',
                            value: ''
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
                    }
                },
                styles: {
                    textShadow: {
                        color: '#FFFFFF00',
                        blur: '10',
                        horizontal: '0',
                        vertical: '10',
                    },
                },
            },
        }
    }

}
