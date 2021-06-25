import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-flexbox-grid'
import dynamic from 'next/dynamic'

import Layout from '../components/Layout'
import Icon from '../components/Icon'
import { PRESENT } from '../constants/Stack'

function About() {
  return (
    <>
      <Layout secondaryPage>
        <div style={{ marginTop: 50 }}>
          <h1 className="main-h1 about-h1">
            Hey, I'm Naveen Honest Raj.
          </h1>

          <div className="about-intro">
            <Row>
              <Col md={12}>
                <p>Coding was not something I learnt to do or was chosen out of the options I had, it was something I was comfortable doing. More than comfort there was one quality that moulded to be the person I am today, it was thirst to be better.</p>

                <h3>What I've worked with so far</h3>

                <Row style={{ marginTop: 30 }}>
                  {PRESENT.map(s => (
                    <Col md={2} xs={4} key={s} style={{ textAlign: 'center', marginBottom: 20 }}>
                      <Icon type={s} />
                      <div className="stack-name">{s}</div>
                    </Col>
                  ))}
                </Row>
                <p>An introvert, confined to close circles, brainy, these are some of the words that became my identity during my school and college days. I was good in adapting to a coding language and picked up the technologies fast. I spent most of my leisure exploring the internet and learning whatever I could. I like reading and gaining knowledge from the broad world of internet in my personal space away from the crowd and their noise, but for my music and my beloved machine.</p>

                <p>The people I looked upto inspired me in a lot of ways to become the better human I am today. They were the ones who guided me to pursue a career in what I loved doing most, coding!</p>
              </Col>
            </Row>

            <p className="special">Follow me on {' '}
            <a href="https://twitter.com/nav_devl" target="_blank" rel="noopener noreferrer nofollow">
              Twitter
            </a>. That's where I usually hangout.</p>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default About
