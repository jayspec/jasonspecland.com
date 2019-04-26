import React from "react"
import { Link } from "gatsby"

export default function PostSummaryCollection ({posts}) {
  const postSummaries = posts.map((post) => {
    return (
    <div key={post.node.id} className="post-preview post type-post format-standard">
        <div className="post-header">
            <h2 className="post-title"><Link to={post.node.frontmatter.permalink}><span dangerouslySetInnerHTML={{ __html: post.node.frontmatter.title }}></span></Link></h2>
            <div className="post-meta">
                <span className="post-date">{post.node.frontmatter.date}</span>
            </div>
        </div>
        <div className="post-content" dangerouslySetInnerHTML={{ __html: post.node.html }}></div>
    </div>)
  });
  return(
  <div className="posts">
    {postSummaries}
  </div>
  )
}
