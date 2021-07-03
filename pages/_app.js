import { IntlProvider } from 'react-intl';
import Router, { useRouter } from 'next/router';
import NProgress from 'nprogress'; // nprogress module
import 'nprogress/nprogress.css'; // styles of nprogress
import 'style/globals.scss';
import 'style/sandbox.scss';
import 'style/tools/reset.scss';

import en from 'intl/lang/en.json';
import fr from 'intl/lang/fr.json';

import {
    useEffect,
    useState,
} from 'react';
import { SiteProvider } from 'context/site';
import { Provider } from 'next-auth/client';

const messages = {
    en,
    fr,
};

// Binding events.
NProgress.configure({
    showSpinner: false,
});
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
    const [language, setLanguage] = useState('en');
    const router = useRouter();

    useEffect(() => {
        setLanguage(router.locale.substr(0, 2));
    }, []);

    return (
        <Provider
            options={{
                clientMaxAge: 0,
                keepAlive: 0,
            }}
            session={pageProps.session}
        >
            <IntlProvider
                locale={language}
                messages={messages[language] ? messages[language] : en}
            >
                <SiteProvider>
                    <Component {...pageProps} />
                </SiteProvider>
            </IntlProvider>
        </Provider>
    );
}

export default MyApp;
