import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

const MainDocument = () => {
    return (
        <Html lang="en">
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin={"true"}
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <Script
                strategy="lazyOnload"
                src="https://www.googletagmanager.com/gtag/js?id=G-0TD10KS0VK"
            ></Script>
            <Script strategy="lazyOnload" id="a">
                {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-0TD10KS0VK');
        
    `}
            </Script>
            <body className="font-default">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
};

export default MainDocument;
