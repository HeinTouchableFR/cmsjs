import React, {
    useEffect, useState,
} from 'react';

// Components
import Image from './Image/Image';
import ImageRender from './Image/ImageRender';
import ImagePreview from './Image/ImagePreview';
import Logo from './Logo/Logo';
import LogoRender from './Logo/LogoRender';
import LogoPreview from './Logo/LogoPreview';
import Link from './Link/Link';
import LinkRender from './Link/LinkRender';
import LinkPreview from './Link/LinkPreview';
import Menu from './Menu/Menu';
import MenuRender from './Menu/MenuRender';
import MenuPreview from './Menu/MenuPreview';
import Text from './Text/Text';
import TextRender from './Text/TextRender';
import TextPreview from './Text/TextPreview';
import Title from './Title/Title';
import TitleRender from './Title/TitleRender';
import TitlePreview from './Title/TitlePreview';
import ButtonRender from './Button/ButtonRender';
import ButtonPreview from './Button/ButtonPreview';
import Button from './Button/Button';
import useDarkMode from 'variables/darkMode';

export default function ComponentDispatcher({ element, device = 'desktop', mode = 'render', onElementValueChange, images, setImages, nav, params, isDarkModeEnable }) {
    const [type, setType] = useState(element.type);
    const theme = useDarkMode(params);

    useEffect(() => {
        setType(element.type);
    },
    [element]);
    switch (type) {
    case 'button':
        return mode === 'render' ? (
            <ButtonRender
                element={element}
                theme={theme}
            />
        ) : mode === 'preview' ? (
            <ButtonPreview
                element={element}
                device={device}
                theme={theme}
            />
        ) : (
            <Button
                element={element}
                device={device}
                onElementValueChange={onElementValueChange}
                isDarkModeEnable={isDarkModeEnable}
            />
        );
    case 'image':
        return mode === 'render' ? (
            <ImageRender
                element={element}
                theme={theme}
            />
        ) : mode === 'preview' ? (
            <ImagePreview
                element={element}
                device={device}
                theme={theme}
            />
        ) : (
            <Image
                element={element}
                device={device}
                onElementValueChange={onElementValueChange}
                images={images}
                setImages={setImages}
                isDarkModeEnable={isDarkModeEnable}
            />
        );
    case 'link':
        return mode === 'render' ? (
            <LinkRender
                element={element}
                theme={theme}
            />
        ) : mode === 'preview' ? (
            <LinkPreview
                element={element}
                device={device}
                theme={theme}
            />
        ) : (
            <Link
                element={element}
                device={device}
                onElementValueChange={onElementValueChange}
                isDarkModeEnable={isDarkModeEnable}
            />
        );
    case 'logo':
        return mode === 'render' ? (
            <LogoRender
                element={element}
                theme={theme}
            />
        ) : mode === 'preview' ? (
            <LogoPreview
                element={element}
                device={device}
                theme={theme}
            />
        ) : (
            <Logo
                element={element}
                device={device}
                onElementValueChange={onElementValueChange}
                isDarkModeEnable={isDarkModeEnable}
            />
        );
    case 'menu':
        return mode === 'render' ? (
            <MenuRender
                element={element}
                nav={nav[element.id] ? JSON.parse(nav[element.id].items) : []}
                theme={theme}
            />
        ) : mode === 'preview' ? (
            <MenuPreview
                element={element}
                device={device}
                theme={theme}
            />
        ) : (
            <Menu
                element={element}
                device={device}
                onElementValueChange={onElementValueChange}
                isDarkModeEnable={isDarkModeEnable}
            />
        );
    case 'text':
        return mode === 'render' ? (
            <TextRender
                element={element}
                theme={theme}
            />
        ) : mode === 'preview' ? (
            <TextPreview
                element={element}
                device={device}
                theme={theme}
            />
        ) : (
            <Text
                element={element}
                device={device}
                onElementValueChange={onElementValueChange}
                isDarkModeEnable={isDarkModeEnable}
            />
        );
    case 'title':
        return mode === 'render' ? (
            <TitleRender
                element={element}
                theme={theme}
            />
        ) : mode === 'preview' ? (
            <TitlePreview
                element={element}
                device={device}
                theme={theme}
            />
        ) : (
            <Title
                element={element}
                device={device}
                onElementValueChange={onElementValueChange}
                isDarkModeEnable={isDarkModeEnable}
            />
        );
    default:
        return <></>;
    }
}
