import React from 'react';

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
import Layout from './Layout/Layout';
import { useBuilder } from '../../context/builder';
import AccountRender from './Account/AccountRender';
import AccountPreview from './Account/AccountPreview';
import Account from './Account/Account';

function ComponentDispatcher({ element, mode = 'render', images, setImages }) {
    const { device,
        updateElement,
        updateLayout } = useBuilder();

    switch (element.type) {
    case 'account':
        return mode === 'render' ? (
            <AccountRender element={element} />
        ) : mode === 'preview' ? (
            <AccountPreview
                element={element}
                device={device}
            />
        ) : (
            <Account
                element={element}
                device={device}
                onElementValueChange={updateElement}
            />
        );
    case 'button':
        return mode === 'render' ? (
            <ButtonRender element={element} />
        ) : mode === 'preview' ? (
            <ButtonPreview
                element={element}
                device={device}
            />
        ) : (
            <Button
                element={element}
                device={device}
                onElementValueChange={updateElement}
            />
        );
    case 'image':
        return mode === 'render' ? (
            <ImageRender element={element} />
        ) : mode === 'preview' ? (
            <ImagePreview
                element={element}
                device={device}
            />
        ) : (
            <Image
                element={element}
                device={device}
                onElementValueChange={updateElement}
                images={images}
                setImages={setImages}
            />
        );
    case 'layout':
        return (
            <Layout
                element={element}
                device={device}
                onElementValueChange={updateLayout}
            />
        );
    case 'link':
        return mode === 'render' ? (
            <LinkRender element={element} />
        ) : mode === 'preview' ? (
            <LinkPreview
                element={element}
                device={device}
            />
        ) : (
            <Link
                element={element}
                device={device}
                onElementValueChange={updateElement}
            />
        );
    case 'logo':
        return mode === 'render' ? (
            <LogoRender element={element} />
        ) : mode === 'preview' ? (
            <LogoPreview
                element={element}
                device={device}
            />
        ) : (
            <Logo
                element={element}
                device={device}
                onElementValueChange={updateElement}
            />
        );
    case 'menu':
        return mode === 'render' ? (
            <MenuRender element={element} />
        ) : mode === 'preview' ? (
            <MenuPreview
                element={element}
                device={device}
            />
        ) : (
            <Menu
                element={element}
                device={device}
                onElementValueChange={updateElement}
            />
        );
    case 'text':
        return mode === 'render' ? (
            <TextRender element={element} />
        ) : mode === 'preview' ? (
            <TextPreview
                element={element}
                device={device}
            />
        ) : (
            <Text
                element={element}
                device={device}
                onElementValueChange={updateElement}
            />
        );
    case 'title':
        return mode === 'render' ? (
            <TitleRender element={element} />
        ) : mode === 'preview' ? (
            <TitlePreview
                element={element}
                device={device}
            />
        ) : (
            <Title
                element={element}
                device={device}
                onElementValueChange={updateElement}
            />
        );
    default:
        return <></>;
    }
}

export default React.memo(ComponentDispatcher);
