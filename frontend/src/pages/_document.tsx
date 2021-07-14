import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="pt-BR">
        <Head>
          <meta name="description" content="Cálcule o seu valor para cobrar em seus futuros jobs na plataforma" />
          <meta name="keywords" content="Jobs, trabalhos, freelancer, freelas, desenvolvimento" />
          <meta name="application-name" content="PWA JobsManager" />

          <meta name="apple-mobile-web-app-title" content="JobsManager" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="mobile-web-app-capable" content="yes" />

          <meta name="msapplication-navbutton-color" content="#064E3B" />
          <meta name="msapplication-TileColor" content="#fff" />
          <meta name="msapplication-TileImage" content="/images/icons/ms-icon-144x144.png" />
          <meta name="msapplication-config" content="/images/icons/browserconfig.xml" />
          <meta name="theme-color" content="#fff" />

          <link rel="apple-touch-icon" href="/images/icons/apple-icon.png" />
          <link rel="apple-touch-icon" sizes="76x76" href="/images/icons/apple-icon-76x76.png" />
          <link rel="apple-touch-icon" sizes="120x120" href="/images/icons/apple-icon-120x120.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/images/icons/apple-icon-152x152.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/images/icons/apple-icon-180x180.png" />

          <link rel="icon" sizes="192x192" href="/images/icons/android-icon-192x192.png" />
          <link rel="icon" sizes="144x144" href="/images/icons/android-icon-144x144.png" />

          <link rel="icon" type="image/png" sizes="32x32" href="/images/icons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/images/icons/favicon-16x16.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/images/icons/favicon-96x96.png" />
          <link rel="shortcut icon" href="/images/favicon.ico" />
          <link rel="mask-icon" color="#5bbad5" href="/images/icons/safari-pinned-tab.svg" />
          <link rel="manifest" href="/manifest.json" />

          <meta property="og:url" content="https://localhost:3000/" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="JobsManager" />
          <meta property="og:site_name" content="JobsManager" />
          <meta property="og:description" content="Cálcule o seu valor para cobrar em seus futuros jobs na plataforma" />
          <meta property="og:image" content="https://localhost:3000/images/rede-social.jpg" />
          <meta property="og:image:secure_url" content="https://localhost:3000/images/rede-social.jpg" />
          <meta property="og:image:alt" content="Thumbnail" />
          <meta property="og:image:type" content="image/jpg" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />

          <meta name="twitter:title" content="JobsManager" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="JobsManager" />
          <meta name="twitter:creator" content="@aln_maurofranco" />
          <meta name="twitter:image" content="http://localhost:3000/images/rede-social.jpg" />
          <meta name="twitter:image:src" content="http://localhost:3000/images/rede-social.jpg" />
          <meta name="twitter:image:alt" content="Thumbnail" />
          <meta name="twitter:image:width" content="1200" />
          <meta name="twitter:image:height" content="620" />

          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
