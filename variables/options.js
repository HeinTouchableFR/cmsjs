import {css} from '@emotion/react';
import React from 'react';

export const tagsOptions = [
    {key: 'H1', text: 'H1', value: 'h1'},
    {key: 'H2', text: 'H2', value: 'h2'},
    {key: 'H3', text: 'H3', value: 'h3'},
    {key: 'H4', text: 'H4', value: 'h4'},
    {key: 'H5', text: 'H5', value: 'h5'},
    {
        key: 'H6',
        text: 'H6',
        value: 'h6',
    },
];

export const alignmentsOptions = [
    {key: 'Left', text: 'Left', value: 'left'},
    {key: 'Center', text: 'Center', value: 'center'},
    {key: 'Right', text: 'Right', value: 'right'},
    {key: 'Justified', text: 'Justified', value: 'justify'},
];

export const fontsOptions = [
    {key: 'Abril Fatface',
        text: 'Abril Fatface',
        value: 'Abril Fatface',
        content: (
            <span
                css={css`
                        font-family: Abril Fatface;
                        font-weight: normal;
                    `}
            >
                    Abril Fatface
                </span>
        ),
    },
    {
        key: 'Alegreya',
        text: 'Alegreya',
        value: 'Alegreya',
        content: (
            <span
                css={css`
                        font-family: Alegreya;
                        font-weight: normal;
                    `}
            >
                    Alegreya
                </span>
        ),
    },
    {
        key: 'Archivo',
        text: 'Archivo',
        value: 'Archivo',
        content: (
            <span
                css={css`
                        font-family: Archivo;
                        font-weight: normal;
                    `}
            >
                    Archivo
                </span>
        ),
    },
    {
        key: 'B612',
        text: 'B612',
        value: 'B612',
        content: (
            <span
                css={css`
                        font-family: B612;
                        font-weight: normal;
                    `}
            >
                    B612
                </span>
        ),
    },
    {
        key: 'BioRhyme',
        text: 'BioRhyme',
        value: 'BioRhyme',
        content: (
            <span
                css={css`
                        font-family: BioRhyme;
                        font-weight: normal;
                    `}
            >
                    BioRhyme
                </span>
        ),
    },
    {
        key: 'Cairo',
        text: 'Cairo',
        value: 'Cairo',
        content: (
            <span
                css={css`
                        font-family: Cairo;
                        font-weight: normal;
                    `}
            >
                    Cairo
                </span>
        ),
    },
    {
        key: 'Coiny',
        text: 'Coiny',
        value: 'Coiny',
        content: (
            <span
                css={css`
                        font-family: Coiny;
                        font-weight: normal;
                    `}
            >
                    Coiny
                </span>
        ),
    },
    {
        key: 'Cormorant',
        text: 'Cormorant',
        value: 'Cormorant',
        content: (
            <span
                css={css`
                        font-family: Cormorant;
                        font-weight: normal;
                    `}
            >
                    Cormorant
                </span>
        ),
    },
    {
        key: 'Crimson Text',
        text: 'Crimson Text',
        value: 'Crimson Text',
        content: (
            <span
                css={css`
                        font-family: Crimson Text;
                        font-weight: normal;
                    `}
            >
                    Crimson Text
                </span>
        ),
    },
    {
        key: 'Frank Ruhl Libre',
        text: 'Frank Ruhl Libre',
        value: 'Frank Ruhl Libre',
        content: (
            <span
                css={css`
                        font-family: Frank Ruhl Libre;
                        font-weight: normal;
                    `}
            >
                    Frank Ruhl Libre
                </span>
        ),
    },
    {
        key: 'IBM Plex Serif',
        text: 'IBM Plex Serif',
        value: 'IBM Plex Serif',
        content: (
            <span
                css={css`
                        font-family: IBM Plex Serif;
                        font-weight: normal;
                    `}
            >
                    IBM Plex Serif
                </span>
        ),
    },
    {
        key: 'Impact',
        text: 'Impact',
        value: 'Impact',
        content: (
            <span
                css={css`
                        font-family: Impact;
                        font-weight: normal;
                    `}
            >
                    Impact
                </span>
        ),
    },
    {
        key: 'Karla',
        text: 'Karla',
        value: 'Karla',
        content: (
            <span
                css={css`
                        font-family: Karla;
                        font-weight: normal;
                    `}
            >
                    Karla
                </span>
        ),
    },
    {
        key: 'Lora',
        text: 'Lora',
        value: 'Lora',
        content: (
            <span
                css={css`
                        font-family: Lora;
                        font-weight: normal;
                    `}
            >
                    Lora
                </span>
        ),
    },
    {
        key: 'Montserrat',
        text: 'Montserrat',
        value: 'Montserrat',
        content: (
            <span
                css={css`
                        font-family: Montserrat;
                        font-weight: normal;
                    `}
            >
                    Montserrat
                </span>
        ),
    },
    {
        key: 'Muli',
        text: 'Muli',
        value: 'Muli',
        content: (
            <span
                css={css`
                        font-family: Muli;
                        font-weight: normal;
                    `}
            >
                    Muli
                </span>
        ),
    },
    {
        key: 'Playfair Display',
        text: 'Playfair Display',
        value: 'Playfair Display',
        content: (
            <span
                css={css`
                        font-family: Playfair Display;
                        font-weight: normal;
                    `}
            >
                    Playfair Display
                </span>
        ),
    },
    {
        key: 'PT Banana Split',
        text: 'PT Banana Split',
        value: 'PT Banana Split',
        content: (
            <span
                css={css`
                        font-family: PT Banana Split;
                        font-weight: normal;
                    `}
            >
                    PT Banana Split
                </span>
        ),
    },
    {
        key: 'Roboto',
        text: 'Roboto',
        value: 'Roboto',
        content: (
            <span
                css={css`
                        font-family: Roboto;
                        font-weight: normal;
                    `}
            >
                    Roboto
                </span>
        ),
    },
    {
        key: 'Spectral',
        text: 'Spectral',
        value: 'Spectral',
        content: (
            <span
                css={css`
                        font-family: Spectral;
                        font-weight: normal;
                    `}
            >
                    Spectral
                </span>
        ),
    },
    {
        key: 'Titillium Web',
        text: 'Titillium Web',
        value: 'Titillium Web',
        content: (
            <span
                css={css`
                        font-family: Titillium Web;
                        font-weight: normal;
                    `}
            >
                    Titillium Web
                </span>
        ),
    },
    {
        key: 'TrashHand',
        text: 'TrashHand',
        value: 'TrashHand',
        content: (
            <span
                css={css`
                        font-family: TrashHand;
                        font-weight: normal;
                    `}
            >
                    TrashHand
                </span>
        ),
    },
    {
        key: 'Ubuntu',
        text: 'Ubuntu',
        value: 'Ubuntu',
        content: (
            <span
                css={css`
                        font-family: Ubuntu;
                        font-weight: normal;
                    `}
            >
                    Ubuntu
                </span>
        ),
    },
    {
        key: 'Varela',
        text: 'Varela',
        value: 'Varela',
        content: (
            <span
                css={css`
                        font-family: Varela;
                        font-weight: normal;
                    `}
            >
                    Varela
                </span>
        ),
    },
    {
        key: 'Vollkorn',
        text: 'Vollkorn',
        value: 'Vollkorn',
        content: (
            <span
                css={css`
                        font-family: Vollkorn;
                        font-weight: normal;
                    `}
            >
                    Vollkorn
                </span>
        ),
    },
];

export const transformsOptions = [
    {key: 'Default', text: 'Default', value: 'initial'},
    {key: 'Uppercase', text: 'Uppercase', value: 'uppercase', content: (<span css={css`text-transform: uppercase;`}>Uppercase</span>)},
    {key: 'Lowercase', text: 'Lowercase', value: 'lowercase', content: (<span css={css`text-transform: lowercase;`}>Lowercase</span>)},
    {key: 'Capitalize', text: 'Capitalize', value: 'capitalize', content: (<span css={css`text-transform: capitalize;`}>Capitalize</span>)},
    {key: 'Normal', text: 'Normal', value: 'normal', content: (<span css={css`text-transform: normal;`}>Normal</span>)},
];

export const stylesOptions = [
    {key: 'Normal', text: 'Normal', value: 'normal', content: (<span css={css`font-style: normal;`}>Normal</span>)},
    {key: 'Italic', text: 'Italic', value: 'italic', content: (<span css={css`font-style: italic;`}>Italic</span>)},
    {key: 'Oblique', text: 'Oblique', value: 'oblique', content: (<span css={css`font-style: oblique;`}>Oblique</span>)},
];

export const decorationsOptions = [
    {key: 'Underline', text: 'Underline', value: 'underline', content: (<span css={css`text-decoration: underline;`}>Underline</span>)},
    {key: 'Overline', text: 'Overline', value: 'overline', content: (<span css={css`text-decoration: overline;`}>Overline</span>)},
    {key: 'Line Through', text: 'Line Through', value: 'line-through', content: (<span css={css`text-decoration: line-through;`}>Line Through</span>)},
];

export const weightsOptions = [
    {key: '100', text: '100', value: '100'},
    {key: '200', text: '200', value: '200'},
    {key: '300', text: '300', value: '300'},
    {key: '400', text: '400', value: '400'},
    {key: '500', text: '500', value: '500'},
    {key: '600', text: '600', value: '600'},
    {key: '700', text: '700', value: '700'},
    {key: '800', text: '800', value: '800'},
    {key: '900', text: '900', value: '900'},
    {key: 'Normal', text: 'Normal', value: 'normal'},
    {key: 'Bold', text: 'Bold', value: 'bold'},
];

export const borderOptions = [
    {key: 'None', text: 'None', value: 'none'},
    {key: 'Solid', text: 'Solid', value: 'solid'},
    {key: 'Double', text: 'Double', value: 'double'},
    {key: 'Dotted', text: 'Dotted', value: 'dotted'},
    {key: 'Dashed', text: 'Dashed', value: 'dashed'},
    {key: 'Groove', text: 'Groove', value: 'groove'},
];

export const animationsOptions = [
    {key: 'None', text: 'None', value: 'none'},
    {key: 'Fade In', text: 'Fade In', value: 'fadeIn'},
    {key: 'Fade In Up', text: 'Fade In Up', value: 'fadeInUp'},
    {key: 'Fade In Left', text: 'Fade In Left', value: 'fadeInLeft'},
    {key: 'Fade In Right', text: 'Fade In Right', value: 'fadeInRight'},
    {key: 'Fade Down', text: 'Fade Down', value: 'fadeInDown'},
    {key: 'Zoom In', text: 'Zoom In', value: 'zoomIn'},
    {key: 'Zoom In Up', text: 'Zoom In Up', value: 'zoomInUp'},
    {key: 'Zoom In Left', text: 'Zoom In Left', value: 'zoomInLeft'},
    {key: 'Zoom In Right', text: 'Zoom In Right', value: 'zoomInRight'},
    {key: 'Zoom Down', text: 'Zoom Down', value: 'zoomInDown'},
    {key: 'Bounce', text: 'Bounce', value: 'bounce'},
    {key: 'Bounce In', text: 'Bounce In', value: 'bounceIn'},
    {key: 'Bounce In Up', text: 'Bounce In Up', value: 'bounceInUp'},
    {key: 'Bounce In Left', text: 'Bounce In Left', value: 'bounceInLeft'},
    {key: 'Bounce In Right', text: 'Bounce In Right', value: 'bounceInRight'},
    {key: 'Bounce In Down', text: 'Bounce In Down', value: 'bounceInDown'},
    {key: 'Slide In Up', text: 'Slide In Up', value: 'slideInUp'},
    {key: 'Slide In Left', text: 'Slide In Left', value: 'slideInLeft'},
    {key: 'Slide In Right', text: 'Slide In Right', value: 'slideInRight'},
    {key: 'Slide In Down', text: 'Slide In Down', value: 'slideInDown'},
    {key: 'Rotate In', text: 'Rotate In', value: 'rotateIn'},
    {key: 'Rotate In Up Left', text: 'Rotate In Up Left', value: 'rotateInUpLeft'},
    {key: 'Rotate In Up Right', text: 'Rotate In Up Right', value: 'rotateInUpRight'},
    {key: 'Rotate In Down Left', text: 'Rotate In Down Left', value: 'rotateInDownLeft'},
    {key: 'Rotate In Down Right', text: 'Rotate In Down Right', value: 'rotateInDownRight'},
    {key: 'Roll In', text: 'Roll In', value: 'rollIn'},
    {key: 'Light Speed In', text: 'Light Speed In', value: 'lightSpeedIn'},
    {key: 'Flash', text: 'Flash', value: 'flash'},
    {key: 'Pulse', text: 'Pluse', value: 'pulse'},
    {key: 'Rubber Band', text: 'Rubber Band', value: 'rubberBand'},
    {key: 'Shake', text: 'Shake', value: 'shake'},
    {key: 'Head Shake', text: 'Head Shake', value: 'headShake'},
    {key: 'Swing', text: 'Swing', value: 'swing'},
    {key: 'Tada', text: 'Tada', value: 'tada'},
    {key: 'Wobble', text: 'Wobble', value: 'wobble'},
    {key: 'Jello', text: 'Jello', value: 'jello'},
]

export const durationsOptions = [
    {key: 'Slow', text: 'Slow', value: '2s'},
    {key: 'Normal', text: 'Normal', value: '1s'},
    {key: 'Fast', text: 'Fast', value: '0.75s'},
]
