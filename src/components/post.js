import React from "react"
import { Link } from "gatsby"

export default function Post ({post}) {
    return (
    <div className="posts">
        <div id={`post-${post.id}`} className={`post-${post.id} post type-post status-publish format-standard hentry`}>
            <div className="post-header">
                <h1 className="post-title"><Link to={post.frontmatter.permalink}><span dangerouslySetInnerHTML={{ __html: post.frontmatter.title }}></span></Link></h1>
                <div className="post-meta">
                    <span className="post-date">{post.frontmatter.date}</span>
                </div>
            </div>
            <div className="post-content" dangerouslySetInnerHTML={{ __html: post.html }}></div>
            <div className="clear"></div>
        </div>
    </div>
    )
}
