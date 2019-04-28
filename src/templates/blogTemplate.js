import React from "react"
import { graphql } from "gatsby"
import Post from "../components/post"
import Layout from "../components/layout"
import SEO from "../components/seo"
import SidebarImage from "../components/sidebarImage"
import SocialMedia from "../components/socialMedia";

import { reactAI } from "react-appinsights"
import { ApplicationInsights } from "@microsoft/applicationinsights-web"

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
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

  return (
    <Layout>
    <SEO title="Home" keywords={[`azure`, `technology`, `comedy`, `improv`]} />
    <div className="wrapper section-inner">
      <div className="content left">
        <Post post={markdownRemark} />
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

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { permalink: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        permalink
        title
        layout
      }
    }
  }
`