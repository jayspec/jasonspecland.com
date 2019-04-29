import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostSummaryCollection from "../components/postSummaryCollection"
import SidebarImage from "../components/sidebarImage"
import SocialMedia from "../components/socialMedia";

import PageTracker from "../lib/pageTracker"

class IndexPage extends React.Component { 
  constructor(props) {
    super(props)
    this.state = { pageTracker: undefined }
  }

  componentDidMount() {
    let pageTracker
    if (this.state.pageTracker) {
      pageTracker = this.state.pageTracker
    } else {
      pageTracker = new PageTracker()
      this.setState({ pageTracker: pageTracker })
    }
    pageTracker.trackPageView("Index", "/")
  }

  render() {
    const posts = this.props.data.allMarkdownRemark.edges // data.markdownRemark holds our post data
    return (
    <Layout>
      <SEO title="Home" keywords={[`azure`, `technology`, `comedy`, `improv`]} />
      <div className="wrapper section-inner">
        <div className="content left">
          <PostSummaryCollection posts={posts} />
        </div>
        <i>
          <i>
            <div className="sidebar right" role="complementary">
              <SidebarImage />
              <SocialMedia />
            </div>
            <div className="clear"></div>
          </i>
        </i>
      </div>
    </Layout>)
  }
}

export default IndexPage

export const postQuery = graphql`
{
	allMarkdownRemark(limit: 10, sort: { order: DESC, fields: [frontmatter___date] } ) {
    edges {
      node {
        id
        html
        frontmatter {
          title
          permalink
          date(formatString: "MMMM DD, YYYY")
        }
      }
    }
  }
}`

