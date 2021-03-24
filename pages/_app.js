import { IntlProvider } from 'react-intl';
import Router, { useRouter } from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
import 'semantic-ui-css/semantic.min.css';
import 'style/globals.scss';
import 'style/sandbox.scss';
import 'style/tools/reset.scss';

import en from 'intl/lang/en.json';
import fr from 'intl/lang/fr.json';
import { AuthProvider } from 'authentication/authContext';
import {SiteNameProvider} from 'context/siteName';
import {HeaderProvider} from 'context/header';

const messages = {
    en: en,
    fr: fr,
};

//Binding events.
NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
    const router = useRouter();
    const language = router.locale.substr(0, 2);

    return (
        <IntlProvider locale={language} messages={messages[language]}>
            <AuthProvider>
                <SiteNameProvider>
                    <HeaderProvider>
                        <Component {...pageProps} />
                    </HeaderProvider>
                </SiteNameProvider>
            </AuthProvider>
        </IntlProvider>
    );
}

export default MyApp;
