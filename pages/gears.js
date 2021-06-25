import React from 'react'

import Layout from '../components/Layout'
import { USES } from '../constants/Uses'

function Uses({ og }) {
  return (
    <>
      <Layout secondaryPage>
        <h1 className="main-h1">What I use.</h1>

        <div className="uses-intro">
          <p>I often get asked about what's my setup as well as what
          I use to share all the tips I usually post on {' '}
          <a href="https://twitter.com/nav_devl" target="_blank" rel="noopener noreferrer nofollow">
            Twitter
          </a>, {' '}
          so here it is.</p>
        </div>

        {USES.map(({ title, stack }) => (
          <ul className="uses-list" key={title}>
            <li className="head">{title}</li>

            {stack.map(({ name, description, link }) => (
              <li key={name}>
                <a href={link} target="_blank" rel="noopener noreferrer nofollow">{name}</a>
                <span>{description}</span>
              </li>
            ))}
          </ul>
        ))}
      </Layout>
    </>
  )
}

Uses.getInitialProps = () => {
  return {
    data: {
      og: {
        description: "What Naveen Honest Raj uses on a daily basis.",
        image: "https://naveenhonestraj.in/og/uses.png"
      }
    }
  }
}

export default Uses
