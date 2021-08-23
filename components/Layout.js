import React, { useState, useEffect } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { Sun, Moon } from 'react-feather'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { currentDayName } from '../utils/dateUtils'

import BlackLivesMatter from './BlackLivesMatter'

const menu = [
  {
    path: '/',
    name: 'About me',
    target: '_self',
  },
  {
    path: '/blog',
    name: 'Blog',
    target: '_self',
  },
  {
    path: '/gears',
    name: 'Gears',
    target: '_self',
  },
  {
    path: 'https://drive.google.com/file/d/1cZqU5jDKdtLYUIO2gC7UnXFzCqqbGY7r/view?usp=sharing',
    name: 'Resume',
    target: '_blank',
  }
]
const SHORTCUTS = ['Digit0', 'Digit1', 'Digit2']
const avatar = `https://images.weserv.nl/?url=https://unavatar.now.sh/twitter/nav_devl&w=150`
const SALUTS = [
  'Hey you.',
  'Welcome.',
  'Howdy.',
  'Ahoy!',
  `What's up?`,
  `How's life?`,
  '👋',
  'Long time no see.',
  'Yo!',
  'Hiya!',
  `G'day mate!`,
  'Sup?'
]

function Layout({ children, isHomepage, secondaryPage }) {
  const router = useRouter()
  const onLoadTheme = typeof localStorage !== 'undefined' && localStorage.getItem('BLOG_THEME')
  const [theme, setTheme] = useState(onLoadTheme)
  const [mounted, setMounted] = useState(false)
  const [salut] = useState(SALUTS[Math.floor(Math.random() * SALUTS.length)])
  const switchTheme = () => {
    const setTo = theme === 'dark' ? 'light' : 'dark'

    setTheme(setTo)
  }

  function triggerShortcut(e) {
    if (SHORTCUTS.includes(e.code)) {
      // Split code to get only the number
      const code = e.code.split('t')[1]

      // Get route from menu
      const { path } = menu[code]

      router.push(path)
    }
  }

  useEffect(() => {
    document.addEventListener('keypress', triggerShortcut)

    if (onLoadTheme) return

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme('dark')
    }
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)

    localStorage.setItem('BLOG_THEME', theme)

    setMounted(true)
  }, [theme])

  const containerProps = {
    ...isHomepage && { md: 12 },
    ...!isHomepage && { md: 8, mdOffset: 2 },
  }

  if (!mounted) return <div />

  return (
    <>

      <div className="top-menu">
        <Row>
          <Col xs={10}>
            <ul>
              <li className="logo">
                <Link href="/" as="/">
                  <a>
                    <img src={avatar} />
                  </a>
                </Link>
              </li>

              {menu.map(({ path, name, target }) => (
                <li key={name}>
                  <Link href={path} as={path}>
                    <a target={target}>{name}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          <Col xs={2} style={{ textAlign: 'right' }}>
            <button className="theme-switch-button" onClick={() => switchTheme()}>
              {theme === 'dark' ? <Sun /> : <Moon />}
            </button>
          </Col>
        </Row>
      </div>

      <Grid>
        <Row>
          <Col {...containerProps}>
            {!secondaryPage && (
              <div style={{ textAlign: 'center' }}>
                <h1 className="blog-title">
                  {salut}
                </h1>

                <p className="entry-description">
                  Engineer + product enthusiast who binge watches TV shows during coffee break.
                </p>
              </div>
            )}

            {children}

            {(
              <div className="bottom-mobile-nav">
                <Row>
                  <Col xs={6} />

                  <Col xs={6}>
                    <button className="theme-switch-button-mobile" onClick={() => switchTheme()}>
                      {theme === 'dark' ? (
                        <>
                          <Sun /> Light
                        </>
                      ) : (
                        <>
                          <Moon /> Dark
                        </>
                      )}
                    </button>
                  </Col>
                </Row>
              </div>
            )}
          </Col>
        </Row>
      </Grid>

      <footer>
        <div>No tracking. No ads. Happy {currentDayName()}! 💙</div>
        <div>Credits to <a href="https://twitter.com/telmo">Telmo</a> for the code 🎉</div>
        <div>&copy; {new Date().getFullYear()}</div>
      </footer>
    </>
  )
}

export default Layout
