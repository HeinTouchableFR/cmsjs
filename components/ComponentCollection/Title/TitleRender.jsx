import React from 'react';
import {css, jsx} from '@emotion/react'
import styled from '@emotion/styled'
import parse from 'html-react-parser';

export default function TitleRender({element}) {

    /*

    typo:
                ,
                styles: {
                    textShadow: {
                        color: '#00FFFFFF',
                        blur: '10',
                        horizontal: '0',
                        vertical: '10'
                    }
                }

     */

    const Title = styled.[element.content.tag](
        {
            color: element.content.styles.color.normal,
            textAlign: element.content.alignment,
            fontSize: element.content.typo.size + "px",
            fontFamily: element.content.typo.family,
            fontWeight: element.content.typo.weight,
            textTransform: element.content.typo.transform,
            fontStyle: element.content.typo.style,
            textDecoration: element.content.typo.decoration,
            lineHeight: element.content.typo.lineHeight,
            letterSpacing: element.content.typo.letterSpacing + 'px',
            transition: 'color .2s',

            '&:hover': css({
                color: element.content.styles.color.hover,
            })
        },
    )

    return (
        <>
            <Title>
                {parse(element.content.text)}
            </Title>
        </>
    );
}
