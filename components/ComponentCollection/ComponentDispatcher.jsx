import React, {useEffect, useState} from 'react';

//Components
import TitleRender from './Title/TitleRender';
import TitlePreview from './Title/TitlePreview';
import Title from './Title/Title';
import TextRender from './Text/TextRender';
import TextPreview from './Text/TextPreview';
import Text from './Text/Text';
import ImageRender from './Image/ImageRender';
import ImagePreview from './Image/ImagePreview';
import Image from './Image/Image';
import LogoRender from './Logo/LogoRender';
import LogoPreview from './Logo/LogoPreview';
import Logo from './Logo/Logo';
import MenuRender from './Menu/MenuRender';
import MenuPreview from './Menu/MenuPreview';
import Menu from './Menu/Menu';

export default function ComponentDispatcher({element, device = "desktop", mode = "render", onElementValueChange, images, setImages, nav}) {
    const [type, setType] = useState(element.type);

    useEffect(
        function () {
            setType(element.type);
        },
        [element]
    );
    switch (type) {
        case "title":
            return mode === "render" ? <TitleRender element={element}/> : (mode === "preview" ?
                <TitlePreview element={element} device={device}/> :
                <Title element={element} device={device} onElementValueChange={onElementValueChange}/>)
            break;
        case "text":
            return mode === "render" ? <TextRender element={element}/> : (mode === "preview" ?
                <TextPreview element={element} device={device}/> :
                <Text element={element} device={device} onElementValueChange={onElementValueChange}/>)
            break;
        case "image":
            return mode === "render" ? <ImageRender element={element}/> : (mode === "preview" ?
                <ImagePreview element={element} device={device}/> :
                <Image element={element} device={device} onElementValueChange={onElementValueChange} images={images}
                       setImages={setImages}/>)
        case "logo":
            return mode === "render" ? <LogoRender element={element}/> : (mode === "preview" ?
                <LogoPreview element={element} device={device}/> :
                <Logo element={element} device={device} onElementValueChange={onElementValueChange}/>)
            break;
        case "menu":
            return mode === "render" ? <MenuRender element={element} nav={nav} /> : (mode === "preview" ?
                <MenuPreview element={element} device={device}/> :
                <Menu element={element} device={device} onElementValueChange={onElementValueChange}/>)
            break;
        default:
            return <></>
            break;
    }
}
