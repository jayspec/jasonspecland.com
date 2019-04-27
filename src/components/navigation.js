import React from "react"
import {StaticQuery, Link, graphql} from "gatsby"

const Navigation = ({}) => (
    <div className="navigation section no-padding bg-dark">
        <div className="navigation-inner section-inner">
            <ul className="blog-menu">
            <StaticQuery
                    query={graphql`
                    query {
                        allMarkdownRemark(limit: 10, sort: { order: ASC, fields: [frontmatter___order] }, filter: { frontmatter: { layout: {eq: "page" } } }) {
                            edges {
                              node {
                                frontmatter {
                                    id
                                    title
                                    layout
                                    permalink
                                }
                              }
                            }
                          }
                        }`}
                    render={data => {
                        const menuItems = data.allMarkdownRemark.edges;
                        return menuItems.map(menuItem => {
                            const fm = menuItem.node.frontmatter;
                            return (<li key={fm.id} className="page_item"><Link to={fm.permalink}>{fm.title}</Link></li>)
                        })
                    }}
                />
            </ul>
            <div className="clear"></div>
        </div>
    </div>
)

export default Navigation