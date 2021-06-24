import Head from 'next/head'

import '../styles/base.css'

function MyApp({ Component, pageProps }) {
  const og = pageProps.data?.og
  const title = pageProps.data?.title

  return (
    <>
      <Head>
        <link href="/favicon.ico" rel="shortcut icon" />
        <link href="/site.webmanifest" rel="manifest" />
        <link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
        <link href="/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
        <link href="/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta property="og:title" content={title || `Naveen Honest Raj | Ruby on Rails Dev | Personal Site`} />
        <meta property="og:site_name" content="Telmo, code & design" />
        <meta property="og:description" content={og ? og.description : `Writing about the tips I usually share on Twitter and some more.`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@telmo" />
        <meta property="og:image" content={og ? og.image : `https://naveenhonestraj.in/og/default.png`} />
        <meta name="monetization" content="$ilp.uphold.com/iRX2HpJ4FRQ3" />

        <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>

        <title>{title || `Naveen Honest Raj | Ruby on Rails Dev | Personal Site`}</title>
      </Head>

      <Component {...pageProps} />
    </>
  )
}

export default MyApp
