import React from 'react'
import matter from 'gray-matter'
import Link from 'next/link'
import Head from 'next/head'
import { Row, Col } from 'react-flexbox-grid'

import Layout from '../components/Layout'

function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const today  = new Date(date);

  return today.toLocaleDateString("en-US", options);
}

function freshWriting(date) {
  const writingDate = new Date(date).getTime()
  const today = new Date().getTime()

  return today - writingDate < (60 * 60 * 1000 * 24 * 2) // 2 days old
}

function Blogpage({ writings }) {
  return (
    <>
      <Layout isBlogpage>
        <Row>
          {writings.map(({ document, slug }) => {
            const { data: { title, og, date } } = document

            return (
              <Col md={12} key={slug}>
                <div className="writing-row" key={title}>
                  <Row>
                    <Col md={12}>
                      <div className="writing-date">{formatDate(date)}</div>
                    </Col>

                    <Col md={12}>
                      <Link href="/posts/[slug]" as={`/posts/${slug}`}>
                        <a>
                          {freshWriting(date) && <div className="pulse" />}
                          <span className="writing-title">{title}</span>
                        </a>
                      </Link>
                      <span className="writing-description">{og.description}</span>
                    </Col>
                  </Row>
                </div>
              </Col>
            )
          })}
        </Row>
      </Layout>
    </>
  )
}

Blogpage.getInitialProps = async(context) => {
  const writings = (context => {
    const keys = context.keys()
    const values = keys.map(context)
    const data = keys.map((key, index) => {
      const slug = key
        .replace(/^.*[\\\/]/, '')
        .split('.')
        .slice(0, -1)
        .join('.')
      const value = values[index]
      const document = matter(value.default)
      return { document, slug }
    })

    return data.slice().sort((a, b) => new Date(b.document.data.date) - new Date(a.document.data.date))
  })(require.context('../writings', true, /\.md$/))

  return {
    writings,
  }
}
export default Blogpage
