/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import Helmet from "react-helmet"

import Header from "./header"
import Footer from "./footer"
import Navigation from "./navigation"
import "./hemmingway.css"
import "./hemmingway-additional.css"

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet>
          <link rel="stylesheet" id="hemingway_googleFonts-css" href="https://fonts.googleapis.com/css?family=Lato%3A400%2C700%2C400italic%2C700italic%7CRaleway%3A700%2C400" type="text/css" media="all"></link>
        </Helmet>
        <div className="big-wrapper">
          <Header siteMetadata={data.site.siteMetadata} />
          <Navigation />
          <main>{children}</main>
          <Footer siteMetadata={data.site.siteMetadata} />
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
