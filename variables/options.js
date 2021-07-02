import { css } from '@emotion/react';
import React from 'react';
import { FormattedMessage } from 'react-intl';

export const tagsOptions = [
    {
        key: 'H1', text: 'H1', value: 'h1',
    },
    {
        key: 'H2', text: 'H2', value: 'h2',
    },
    {
        key: 'H3', text: 'H3', value: 'h3',
    },
    {
        key: 'H4', text: 'H4', value: 'h4',
    },
    {
        key: 'H5', text: 'H5', value: 'h5',
    },
    {
        key: 'H6', text: 'H6', value: 'h6',
    },
];

export const alignmentsOptions = [
    {
        key: 'left',
        text: <FormattedMessage
            id='builder.left'
            defaultMessage='Left'
            key='builder.left'
        />,
        value: 'left',
        content: <span>
            <FormattedMessage
                id='builder.left'
                defaultMessage='Left'
                key='builder.left'
            />
        </span>,
    },
    {
        key: 'center',
        text: <FormattedMessage
            id='builder.center'
            defaultMessage='Center'
            key='builder.center'
        />,
        value: 'center',
        content: <span>
            <FormattedMessage
                id='builder.center'
                defaultMessage='Center'
                key='builder.center'
            />
        </span>,
    },
    {
        key: 'right',
        text: <FormattedMessage
            id='builder.right'
            defaultMessage='Right'
            key='builder.right'
        />,
        value: 'right',
        content: <span>
            <FormattedMessage
                id='builder.right'
                defaultMessage='Right'
                key='builder.right'
            />
        </span>,
    },
    {
        key: 'justify',
        text: <FormattedMessage
            id='builder.justify'
            defaultMessage='Justify'
            key='builder.justify'
        />,
        value: 'justify',
        content: <span>
            <FormattedMessage
                id='builder.justify'
                defaultMessage='Justify'
                key='builder.justify'
            />
        </span>,
    },
];

export const contentWidthOptions = [
    {
        key: 'box',
        text: <FormattedMessage
            id='builder.layout.box'
            defaultMessage='Box'
            key='builder.layout.box'
        />,
        value: 'box',
        content: <span>
             <FormattedMessage
                 id='builder.layout.box'
                 defaultMessage='Box'
                 key='builder.layout.box'
             />
        </span>,
    },
    {
        key: 'fullWidth',
        text: <FormattedMessage
            id='builder.layout.fullWidth'
            defaultMessage='Full width'
            key='builder.layout.fullWidth'
        />,
        value: 'fullWidth',
        content: <span>
            <FormattedMessage
                id='builder.layout.fullWidth'
                defaultMessage='Full width'
                key='builder.layout.fullWidth'
            />
        </span>,
    },
];

export const flexAlignmentsOptions = [
    {
        key: 'left',
        text: <FormattedMessage
            id='builder.left'
            key='builder.left'
            defaultMessage='Left'
        />,
        value: 'flex-start',
        content: <span>
            <FormattedMessage
                id='builder.left'
                key='builder.left'
                defaultMessage='Left'
            />
        </span>,
    },
    {
        key: 'center',
        text: <FormattedMessage
            id='builder.center'
            key='builder.center'
            defaultMessage='Center'
        />,
        value: 'center',
        content: <span>
            <FormattedMessage
                id='builder.center'
                key='builder.center'
                defaultMessage='Center'
            />
        </span>,
    },
    {
        key: 'right',
        text: <FormattedMessage
            id='builder.right'
            key='builder.right'
            defaultMessage='Right'
        />,
        value: 'flex-end',
        content: <span>
            <FormattedMessage
                id='builder.right'
                key='builder.right'
                defaultMessage='Right'
            />
        </span>,
    },
];

export const fontsOptions = [
    {
        key: 'Abril Fatface',
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
    {
        key: 'default',
        text: <FormattedMessage
            id='builder.transform.default'
            key='builder.transform.default'
            defaultMessage='Default'
        />,
        value: 'initial',
        content: (<span>
            <FormattedMessage
                id='builder.transform.default'
                key='builder.transform.default'
                defaultMessage='Default'
            />
        </span>),
    },
    {
        key: 'uppercase',
        text: <FormattedMessage
            id='builder.transform.uppercase'
            key='builder.transform.uppercase'
            defaultMessage='Uppercase'
        />,
        value: 'uppercase',
        content: (<span css={css`text-transform: uppercase;`}>
            <FormattedMessage
                id='builder.transform.uppercase'
                key='builder.transform.uppercase'
                defaultMessage='Uppercase'
            />
        </span>),
    },
    {
        key: 'lowercase',
        text: <FormattedMessage
            id='builder.transform.lowercase'
            key='builder.transform.lowercase'
            defaultMessage='Lowercase'
        />,
        value: 'lowercase',
        content: (<span css={css`text-transform: lowercase;`}>
            <FormattedMessage
                id='builder.transform.lowercase'
                key='builder.transform.lowercase'
                defaultMessage='Lowercase'
            />
        </span>),
    },
    {
        key: 'capitalize',
        text: <FormattedMessage
            id='builder.transform.capitalize'
            key='builder.transform.capitalize'
            defaultMessage='Capitalize'
        />,
        value: 'capitalize',
        content: (<span css={css`text-transform: capitalize;`}>
            <FormattedMessage
                id='builder.transform.capitalize'
                key='builder.transform.capitalize'
                defaultMessage='Capitalize'
            />
        </span>),
    },
    {
        key: 'normal',
        text: <FormattedMessage
            id='builder.transform.normal'
            key='builder.transform.normal'
            defaultMessage='Normal'
        />,
        value: 'normal',
        content: (<span css={css`text-transform: normal;`}>
            <FormattedMessage
                id='builder.transform.normal'
                key='builder.transform.normal'
                defaultMessage='Normal'
            />
        </span>),
    },
];

export const stylesOptions = [
    {
        key: 'Normal',
        text: <FormattedMessage
            id='builder.style.normal'
            key='builder.style.normal'
            defaultMessage='Normal'
        />,
        value: 'normal',
        content: (<span css={css`font-style: normal;`}>
            <FormattedMessage
                id='builder.style.normal'
                key='builder.style.normal'
                defaultMessage='Normal'
            />
        </span>),
    },
    {
        key: 'Italic',
        text: <FormattedMessage
            id='builder.style.italic'
            key='builder.style.italic'
            defaultMessage='Italic'
        />,
        value: 'italic',
        content: (<span css={css`font-style: italic;`}>
            <FormattedMessage
                id='builder.style.italic'
                key='builder.style.italic'
                defaultMessage='Italic'
            />
        </span>),
    },
    {
        key: 'Oblique',
        text: <FormattedMessage
            id='builder.style.oblique'
            key='builder.style.oblique'
            defaultMessage='Oblique'
        />,
        value: 'oblique',
        content: (<span css={css`font-style: oblique;`}>
            <FormattedMessage
                id='builder.style.oblique'
                key='builder.style.oblique'
                defaultMessage='Oblique'
            />
        </span>),
    },
];

export const decorationsOptions = [
    {
        key: 'Underline',
        text: <FormattedMessage
            id='builder.decoration.underline'
            key='builder.decoration.underline'
            defaultMessage='Underline'
        />,
        value: 'underline',
        content: (<span css={css`text-decoration: underline;`}>
            <FormattedMessage
                id='builder.decoration.underline'
                key='builder.decoration.underline'
                defaultMessage='Underline'
            />
        </span>),
    },
    {
        key: 'Overline',
        text: <FormattedMessage
            id='builder.decoration.overline'
            key='builder.decoration.overline'
            defaultMessage='Overline'
        />,
        value: 'overline',
        content: (<span css={css`text-decoration: overline;`}>
            <FormattedMessage
                id='builder.decoration.overline'
                key='builder.decoration.overline'
                defaultMessage='Overline'
            />
        </span>),
    },
    {
        key: 'Line Through',
        text: <FormattedMessage
            id='builder.decoration.lineThrough'
            key='builder.decoration.lineThrough'
            defaultMessage='Line Through'
        />,
        value: 'line-through',
        content: (<span css={css`text-decoration: line-through;`}>
            <FormattedMessage
                id='builder.decoration.lineThrough'
                key='builder.decoration.lineThrough'
                defaultMessage='Line Through'
            />
        </span>),
    },
];

export const weightsOptions = [
    {
        key: '100', text: '100', value: '100',
    },
    {
        key: '200', text: '200', value: '200',
    },
    {
        key: '300', text: '300', value: '300',
    },
    {
        key: '400', text: '400', value: '400',
    },
    {
        key: '500', text: '500', value: '500',
    },
    {
        key: '600', text: '600', value: '600',
    },
    {
        key: '700', text: '700', value: '700',
    },
    {
        key: '800', text: '800', value: '800',
    },
    {
        key: '900', text: '900', value: '900',
    },
    {
        key: 'Normal', text: 'Normal', value: 'normal',
    },
    {
        key: 'Bold', text: 'Bold', value: 'bold',
    },
];

export const borderOptions = [
    {
        key: 'None',
        text: <FormattedMessage
            id='builder.border.none'
            key='builder.border.none'
            defaultMessage='None'
        />,
        value: 'none',
        content: <span>
            <FormattedMessage
                id='builder.border.none'
                key='builder.border.none'
                defaultMessage='None'
            />
        </span>,
    },
    {
        key: 'Solid',
        text: <FormattedMessage
            id='builder.border.solid'
            key='builder.border.solid'
            defaultMessage='Solid'
        />,
        value: 'solid',
        content: <span>
            <FormattedMessage
                id='builder.border.solid'
                key='builder.border.solid'
                defaultMessage='Solid'
            />
        </span>,
    },
    {
        key: 'Double',
        text: <FormattedMessage
            id='builder.border.double'
            key='builder.border.double'
            defaultMessage='Double'
        />,
        value: 'double',
        content: <span>
            <FormattedMessage
                id='builder.border.double'
                key='builder.border.double'
                defaultMessage='Double'
            />
        </span>,
    },
    {
        key: 'Dotted',
        text: <FormattedMessage
            id='builder.border.dotted'
            key='builder.border.dotted'
            defaultMessage='Dotted'
        />,
        value: 'dotted',
        content: <span>
            <FormattedMessage
                id='builder.border.dotted'
                key='builder.border.dotted'
                defaultMessage='Dotted'
            />
        </span>,
    },
    {
        key: 'Dashed',
        text: <FormattedMessage
            id='builder.border.dashed'
            key='builder.border.dashed'
            defaultMessage='Dashed'
        />,
        value: 'dashed',
        content: <span>
            <FormattedMessage
                id='builder.border.dashed'
                key='builder.border.dashed'
                defaultMessage='Dashed'
            />
        </span>,
    },
    {
        key: 'Groove',
        text: <FormattedMessage
            id='builder.border.groove'
            key='builder.border.groove'
            defaultMessage='Groove'
        />,
        value: 'groove',
        content: <span>
            <FormattedMessage
                id='builder.border.groove'
                key='builder.border.groove'
                defaultMessage='Groove'
            />
        </span>,
    },
];

export const animationsOptions = [
    {
        key: 'None', text: 'None', value: 'none',
    },
    {
        key: 'Fade In', text: 'Fade In', value: 'fadeIn',
    },
    {
        key: 'Fade In Up', text: 'Fade In Up', value: 'fadeInUp',
    },
    {
        key: 'Fade In Left', text: 'Fade In Left', value: 'fadeInLeft',
    },
    {
        key: 'Fade In Right', text: 'Fade In Right', value: 'fadeInRight',
    },
    {
        key: 'Fade Down', text: 'Fade Down', value: 'fadeInDown',
    },
    {
        key: 'Zoom In', text: 'Zoom In', value: 'zoomIn',
    },
    {
        key: 'Zoom In Up', text: 'Zoom In Up', value: 'zoomInUp',
    },
    {
        key: 'Zoom In Left', text: 'Zoom In Left', value: 'zoomInLeft',
    },
    {
        key: 'Zoom In Right', text: 'Zoom In Right', value: 'zoomInRight',
    },
    {
        key: 'Zoom Down', text: 'Zoom Down', value: 'zoomInDown',
    },
    {
        key: 'Bounce', text: 'Bounce', value: 'bounce',
    },
    {
        key: 'Bounce In', text: 'Bounce In', value: 'bounceIn',
    },
    {
        key: 'Bounce In Up', text: 'Bounce In Up', value: 'bounceInUp',
    },
    {
        key: 'Bounce In Left', text: 'Bounce In Left', value: 'bounceInLeft',
    },
    {
        key: 'Bounce In Right', text: 'Bounce In Right', value: 'bounceInRight',
    },
    {
        key: 'Bounce In Down', text: 'Bounce In Down', value: 'bounceInDown',
    },
    {
        key: 'Slide In Up', text: 'Slide In Up', value: 'slideInUp',
    },
    {
        key: 'Slide In Left', text: 'Slide In Left', value: 'slideInLeft',
    },
    {
        key: 'Slide In Right', text: 'Slide In Right', value: 'slideInRight',
    },
    {
        key: 'Slide In Down', text: 'Slide In Down', value: 'slideInDown',
    },
    {
        key: 'Rotate In', text: 'Rotate In', value: 'rotateIn',
    },
    {
        key: 'Rotate In Up Left', text: 'Rotate In Up Left', value: 'rotateInUpLeft',
    },
    {
        key: 'Rotate In Up Right', text: 'Rotate In Up Right', value: 'rotateInUpRight',
    },
    {
        key: 'Rotate In Down Left', text: 'Rotate In Down Left', value: 'rotateInDownLeft',
    },
    {
        key: 'Rotate In Down Right', text: 'Rotate In Down Right', value: 'rotateInDownRight',
    },
    {
        key: 'Roll In', text: 'Roll In', value: 'rollIn',
    },
    {
        key: 'Light Speed In', text: 'Light Speed In', value: 'lightSpeedIn',
    },
    {
        key: 'Flash', text: 'Flash', value: 'flash',
    },
    {
        key: 'Pulse', text: 'Pluse', value: 'pulse',
    },
    {
        key: 'Rubber Band', text: 'Rubber Band', value: 'rubberBand',
    },
    {
        key: 'Shake', text: 'Shake', value: 'shake',
    },
    {
        key: 'Head Shake', text: 'Head Shake', value: 'headShake',
    },
    {
        key: 'Swing', text: 'Swing', value: 'swing',
    },
    {
        key: 'Tada', text: 'Tada', value: 'tada',
    },
    {
        key: 'Wobble', text: 'Wobble', value: 'wobble',
    },
    {
        key: 'Jello', text: 'Jello', value: 'jello',
    },
];

export const durationsOptions = [
    {
        key: 'Slow',
        text: <FormattedMessage
            id='builder.duration.slow'
            key='builder.duration.slow'
            defaultMessage='Slow'
        />,
        value: 'slow',
        content: <span>
            <FormattedMessage
                id='builder.duration.slow'
                key='builder.duration.slow'
                defaultMessage='Slow'
            />
        </span>,
    },
    {
        key: 'Normal',
        text: <FormattedMessage
            id='builder.duration.normal'
            key='builder.duration.normal'
            defaultMessage='Normal'
        />,
        value: 'normal',
        content: <span>
            <FormattedMessage
                id='builder.duration.normal'
                key='builder.duration.normal'
                defaultMessage='Normal'
            />
        </span>,
    },
    {
        key: 'Fast',
        text: <FormattedMessage
            id='builder.duration.fast'
            key='builder.duration.fast'
            defaultMessage='Fast'
        />,
        value: 'fast',
        content: <span>
            <FormattedMessage
                id='builder.duration.fast'
                key='builder.duration.fast'
                defaultMessage='Fast'
            />
        </span>,
    },
];
