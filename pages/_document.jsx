import Document, {
    Html, Head, Main, NextScript,
} from 'next/document';
import { resetServerContext } from 'react-beautiful-dnd';
import React from 'react';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const page = await ctx.renderPage();
        const initialProps = await Document.getInitialProps(ctx);
        resetServerContext();
        return {
            ...initialProps, ...page,
        };
    }

    render() {
        return (
            <Html>
                <Head>
                    <link
                        rel='stylesheet'
                        href='https://pro.fontawesome.com/releases/v5.10.0/css/all.css'
                        integrity='sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p'
                        crossOrigin='anonymous'
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
