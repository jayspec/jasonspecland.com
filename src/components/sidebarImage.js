import React from "react"
import { StaticQuery, Link, graphql } from "gatsby"
import Img from "gatsby-image"

const SidebarImage = () => (
    <div className="widget widget_media_image">
        <div className="widget-content">
            <h3 className="widget-title">About Me</h3>
            <Link to="/about">
                <StaticQuery
                    query={graphql`
                    query {
                        placeholderImage: file(relativePath: { eq: "Jason_Specland_160120_788_LG_square_avatar.jpg" }) {
                        childImageSharp {
                            fluid(maxWidth: 300) {
                            ...GatsbyImageSharpFluid
                            }
                        }
                        }
                    }
                    `}
                    render={data => <Img fluid={data.placeholderImage.childImageSharp.fluid} />}
                />
            </Link>
        </div>
        <div className="clear"></div>
    </div>
)

export default SidebarImage
