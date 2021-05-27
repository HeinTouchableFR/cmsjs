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
import { TemplatesProvider } from 'context/template';
import { SettingsProvider } from 'context/settings';
import { InstallProvider } from 'context/install';
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
        if (typeof window !== 'undefined') {
            setLanguage(window.navigator.language.substr(0, 2));
            localStorage.setItem('locale', window.navigator.language.substr(0, 2));
            if (router.locale !== router.defaultLocale) {
                setLanguage(router.locale.substr(0, 2));
                localStorage.setItem('locale', router.locale.substr(0, 2));
            }
        }
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
                <SettingsProvider>
                    <InstallProvider>
                        <TemplatesProvider>
                            <Component {...pageProps} />
                        </TemplatesProvider>
                    </InstallProvider>
                </SettingsProvider>
            </IntlProvider>
        </Provider>
    );
}

export default MyApp;
