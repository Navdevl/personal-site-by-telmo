import matter from 'gray-matter'
import Link from 'next/link'
import React from 'react'
import { BookOpen } from 'react-feather'
import ReactMarkdown from 'react-markdown'
import ProgressBar from 'react-scroll-progress-bar'
import readingTime from 'reading-time'

import CodeBlock from '../../components/CodeBlock'
import Layout from '../../components/Layout'

function Writing({ content, data }) {
  const frontmatter = data
  const { title, author } = frontmatter
  // const avatar = `https://images.weserv.nl/?url=https://unavatar.now.sh/twitter/${author.twitter}&w=120`
  const avatar = `https://unavatar.io/x/${author.twitter}?w=120`
  const { text } = readingTime(content)

  return (
    <>
      <div className="writing-progress">
        <ProgressBar height="5px" />
      </div>

      <Layout secondaryPage noHead>
        <div style={{ marginTop: 50 }} className="article-body">
          <Link href="/blog" as="/blog">
            <a className="back-button">
              back
            </a>
          </Link>

          <h1 className="main-h1">{title}</h1>

          <div className="reading-time">
            <BookOpen size="16px" />
            {text}
          </div>

          <div className="author">
            <a href={`https://twitter.com/${author.twitter}`} target="_blank" rel="noopener noreferrer nofollow">
              <img src={avatar} />
              {author.name}
            </a>
          </div>

          <div className="writing-container">
            <ReactMarkdown
              source={content}
              escapeHtml={false}
              renderers={{
                code: CodeBlock,
                link: props => {
                  if (!props.href.startsWith('http')) {
                    return <a href={props.href} rel="nofollow noreferrer noopener">{props.children}</a>;
                  }

                  return <a href={props.href} rel="nofollow noreferrer noopener" target="_blank">{props.children}</a>;
                }
              }}
            />

            <div />

            <div className="hope-liked">
              Hope you liked this article. Open up any discussion by hitting me up on Twitter.

              <br />

              — Naveen Honest Raj
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

Writing.getInitialProps = async (context) => {
  const { slug } = context.query
  const content = await import(`../../writings/${slug}.md`)
  const data = matter(content.default)

  return { ...data }
}

export default Writing
