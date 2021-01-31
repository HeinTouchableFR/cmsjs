import '../style/globals.css'
import 'semantic-ui-css/semantic.min.css'
import 'rsuite/dist/styles/rsuite-default.css';

import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
//Binding events.
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({Component, pageProps}) {
    return <><Component {...pageProps} /></>
}

export default MyApp
