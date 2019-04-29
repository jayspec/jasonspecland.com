import React from "react"
import { Link } from "gatsby"
import { DiscussionEmbed } from "disqus-react"
import PageTracker from "../lib/pageTracker"

export default class Post extends React.Component {
    constructor(props) {
        super(props)
        this.state = { pageTracker: undefined }
    }

    componentDidMount() {
        let pageTracker
        if (this.state.pageTracker) {
          pageTracker = this.state.pageTracker
        } else {
          pageTracker = new PageTracker()
          this.setState({ pageTracker: pageTracker })
        }
        pageTracker.trackPageView("Index", "/")
    }
    
    render() {
        const post = this.props.post

        // Create config for Disqus commenting engine
        const disqusConfig = {
            shortname: 'jasonspecland',
            config: { identifier: post.frontmatter.permalink }
        }    
        
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
}
