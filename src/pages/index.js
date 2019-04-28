import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostSummaryCollection from "../components/postSummaryCollection"
import SidebarImage from "../components/sidebarImage"
import SocialMedia from "../components/socialMedia";

import { reactAI } from "react-appinsights"
import { ApplicationInsights } from "@microsoft/applicationinsights-web"

const IndexPage = ({data}) => {
  let appInsights = new ApplicationInsights({
    config: {
      instrumentationKey: "3d91209b-2286-44b6-8dd1-5a1fc5dfee7d",
      extensions: [reactAI],
      extensionConfig: {
        [reactAI.extensionId]: { debug: false }
      }
    }
  })
  appInsights.loadAppInsights();
  appInsights.trackPageView({name: "Index", uri: "/"});

  const posts = data.allMarkdownRemark.edges // data.markdownRemark holds our post data
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

