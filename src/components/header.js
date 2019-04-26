import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteMetadata }) => (
    <div className="header-cover section bg-dark-light no-padding">
      <div className="header section">
        <div className="header-inner section-inner">
          <div className="blog-info">
            <h2 className="blog-title"><a href="/">{siteMetadata.title}</a></h2>
            <h3 className="blog-description">{siteMetadata.description}</h3>
          </div>
        </div>
      </div>
    </div>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
