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

        <meta property="og:title" content={title || `Naveen Honest Raj | Backend Engineer - Specialized in Ruby on Rails | Writes about code, life and movies`} />
        <meta property="og:site_name" content="Naveen Honest Raj | Backend Engineer - Specialized in Ruby on Rails" />
        <meta property="og:description" content={og ? og.description : `Naveen Honest Raj K is a backend engineer from India, who loves to talk about code, life and movies. Most other times, he just stares at the sky and hum to an old song.`} />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@nav_devl" />
        <meta property="og:image" content={og ? og.image : `https://naveenhonestraj.in/og/default.png`} />

        <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>

        <title>{title || `Naveen Honest Raj | Backend Engineer - Specialized in Ruby on Rails | Writes about code, life and movies`}</title>
      </Head>

      <Component {...pageProps} />
    </>
  )
}

export default MyApp
