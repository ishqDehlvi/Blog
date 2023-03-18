import "nprogress/nprogress.css";
import "@styles/app.css";

import type { AppProps } from "next/app";
import Router from "next/router";
import NProgress from "nprogress";
import { SSRProvider } from "react-aria";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const CustomApp = (properties: AppProps) => {
    return (
        <SSRProvider>
            <properties.Component {...properties.pageProps} />
        </SSRProvider>
    );
};

export default CustomApp;
