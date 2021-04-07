import Document, { Html, Head, Main, NextScript } from 'next/document';
import { resetServerContext } from 'react-beautiful-dnd';
import React from 'react';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const page = await ctx.renderPage();
        const initialProps = await Document.getInitialProps(ctx);
        resetServerContext();
        return { ...initialProps, ...page };
    }

    render() {
        return (
            <Html>
                <Head>
                    <link rel="stylesheet" href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css"/>
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
