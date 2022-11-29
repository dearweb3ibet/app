import { Head, Html, Main, NextScript } from "next/document";

function Document() {
  return (
    <Html>
      <Head>
        <meta
          name="description"
          content="dearweb3ibet - let's move from words to bets on the blockchain!"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default Document;
