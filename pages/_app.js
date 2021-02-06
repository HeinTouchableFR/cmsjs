import Router from "next/router";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress
import { LanguageProvider } from "../intl/LanguageProvider";
import '../style/globals.scss'
import '../style/sandbox.scss'
import '../style/tools/reset.scss'
import 'semantic-ui-css/semantic.min.css'
import 'rsuite/dist/styles/rsuite-default.css';
import 'react-quill/dist/quill.snow.css';

//Binding events.
NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <>
      <LanguageProvider>
        <Component {...pageProps} />
      </LanguageProvider>
    </>
  );
}

export default MyApp;
