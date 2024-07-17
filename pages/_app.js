import Head from 'next/head';
import { useRouter } from 'next/router';

import '../styles/base.css';

function MyApp({ Component, pageProps }) {
  const og = pageProps.data?.og
  const title = pageProps.data?.title
  const baseUrl = "https://naveenhonestraj.in"
  const ogGenPrefix = "http://5.161.75.212/image/get_image?url="
  const { asPath, pathname } = useRouter();

  return (
    <>
      <Head>
        <link href="/favicon.ico" rel="shortcut icon" />
        <link href="/site.webmanifest" rel="manifest" />
        <link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
        <link href="/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
        <link href="/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="description" content={og ? og.description : `Naveen Honest Raj K is a backend engineer from India, who loves to talk about code, life and movies. Most other times, he just stares at the sky and hum to an old song.`} />

        <meta property="og:title" content={title || `Naveen Honest Raj | Backend Engineer - Specialized in Ruby on Rails | Writes about code, life and movies`} />
        <meta property="og:site_name" content="Naveen Honest Raj | Backend Engineer - Specialized in Ruby on Rails" />
        <meta property="og:description" content={og ? og.description : `Naveen Honest Raj K is a backend engineer from India, who loves to talk about code, life and movies. Most other times, he just stares at the sky and hum to an old song.`} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:site" content="@nav_devl" />
        <meta property="twitter:title" content={title || `Naveen Honest Raj | Backend Engineer - Specialized in Ruby on Rails | Writes about code, life and movies`} />
        <meta property="twitter:description" content={og ? og.description : `Naveen Honest Raj K is a backend engineer from India, who loves to talk about code, life and movies. Most other times, he just stares at the sky and hum to an old song.`} />
        <meta property="twitter:image" content={`${ogGenPrefix}${baseUrl}${asPath}`} />

        <meta property="og:image" content={`${ogGenPrefix}${baseUrl}${asPath}`} />

        <title>{title || `Naveen Honest Raj | Backend Engineer - Specialized in Ruby on Rails | Writes about code, life and movies`}</title>
      </Head>

      <Component {...pageProps} />
    </>
  )
}

export default MyApp
