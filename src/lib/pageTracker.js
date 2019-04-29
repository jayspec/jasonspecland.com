import { reactAI } from "react-appinsights"
import { ApplicationInsights } from "@microsoft/applicationinsights-web"

export default class PageTracker {
    constructor() {
        this.appInsightsInstrumentationKey = "398efc9f-9874-4fd8-a8fa-f3a11b338da9"
        this.appInsights = undefined;
    }

    trackPageView(name, uri) {
        if (!this.appInsights) {
            this.appInsights = new ApplicationInsights({
                config: {
                    instrumentationKey: this.appInsightsInstrumentationKey,
                    extensions: [reactAI],
                    extensionConfig: {
                    [reactAI.extensionId]: { debug: false }
                    }
                }
                })
            this.appInsights.loadAppInsights()
        }
        this.appInsights.trackPageView({name: name, uri: uri})
    }
}