import { Link } from "gatsby"
import React from "react"

const Footer = ({ siteMetadata }) => (
    <footer>
        <div className="footer section large-padding bg-dark"></div>
            <div className="footer-inner section-inner">
            </div>
            <div className="clear"></div>
        <div className="credits section bg-dark no-padding">
            <div className="credits-inner section-inner">
                <p className="credits-left">&copy;{new Date().getFullYear()} <Link to={'/'}>{siteMetadata.author}</Link></p>
                <p className="credits-right"><span>Theme by <a href="https://www.andersnoren.se">Anders Noren</a>, Built with <a href="https://gatsbyjs.org">Gatsby</a></span></p>
                <div className="clear"></div>
            </div>
        </div>
    </footer>
)

export default Footer
