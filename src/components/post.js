import React from "react"
import { Link } from "gatsby"
import { DiscussionEmbed } from "disqus-react"
import { reactAI } from "react-appinsights"

export default function Post ({post}) {
    // Create config for Disqus commenting engine
    const disqusConfig = {
        shortname: 'jasonspecland',
        config: { identifier: post.frontmatter.permalink }
    }

    // Log this page view into Application Insights
    let appInsights = reactAI.appInsights;
    appInsights.trackPageView({name: post.frontmatter.title, uri: post.frontmatter.permalink});
    
    let dateDisplay = (
        <div className="post-meta">
            <span className="post-date">{post.frontmatter.date}</span>
        </div>
    )

    let disqusDisplay = (
        <DiscussionEmbed {...disqusConfig} />
    )

    if (post.frontmatter.layout === "page") {
        dateDisplay = (<div></div>)
        disqusDisplay = (<div></div>)
    }
    return (
    <div className="posts">
        <div id={`post-${post.id}`} className={`post-${post.id} post type-post status-publish format-standard hentry`}>
            <div className="post-header">
                <h1 className="post-title"><Link to={post.frontmatter.permalink}><span dangerouslySetInnerHTML={{ __html: post.frontmatter.title }}></span></Link></h1>
                {dateDisplay}
            </div>
            <div className="post-content" dangerouslySetInnerHTML={{ __html: post.html }}></div>
            <div className="clear"></div>
            {disqusDisplay}
        </div>
    </div>
    )
}
