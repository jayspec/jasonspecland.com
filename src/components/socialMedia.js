import React from "react"
import SocialLogo from "social-logos"

const SocialMedia = () => (
    <div className="widget widget_wpcom_social_media_icons_widget">
        <div className="widget-content">
            <h3 className="widget-title">Social</h3>
            <ul>
                <li><a href="https://twitter.com/@jayspec/" target="_blank"><SocialLogo icon="twitter" /><span className="screen-reader-text">View @jayspec’s profile on Twitter</span></a></li>
                <li><a href="https://www.instagram.com/jspecland/" target="_blank"><SocialLogo icon="instagram" /><span className="screen-reader-text">View jspecland’s profile on Instagram</span></a></li>
                <li><a href="https://www.facebook.com/jspecland/" target="_blank"><SocialLogo icon="facebook" /><span className="screen-reader-text">View jspecland’s profile on Facebook</span></a></li>
                <li><a href="https://www.linkedin.com/in/jasonspecland/" target="_blank"><SocialLogo icon="linkedin" /><span className="screen-reader-text">View jasonspecland’s profile on LinkedIn</span></a></li>
            </ul>
        </div>
        <div className="clear"></div>
    </div>
)
export default SocialMedia
