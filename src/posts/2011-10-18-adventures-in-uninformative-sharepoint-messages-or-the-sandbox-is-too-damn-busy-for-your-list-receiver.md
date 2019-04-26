---
id: 337
title: Adventures in Uninformative SharePoint Messages, or The Sandbox is Too Damn Busy for Your List Receiver
date: 2011-10-18T12:58:50-04:00
author: jason
layout: post
guid: http://jasonspecland.azurewebsites.net/?p=337
permalink: /2011/10/18/adventures-in-uninformative-sharepoint-messages-or-the-sandbox-is-too-damn-busy-for-your-list-receiver/
snapEdIT:
  - "1"
categories:
  - SharePoint
tags:
  - error
  - list receier
  - Programming
  - sharepoint
---
Still here? Great. So, here&#8217;s the situation. Tell me if it seems crazy. There are things that, to me as a programmer, don&#8217;t seem crazy at all, while more seasoned SharePoint developers would look at what I was doing and scream, &#8220;Are you _mad_?&#8221; Like iterating through `SPList.Items()` in a foreach loop without first putting them into an `SPListItemCollection`, for example.

Anyway, I have the following situation: A project tracking list, which has a &#8220;Primary Technical Lead&#8221; field and a &#8220;Secondary Technical Lead&#8221; field, both of which are single User-type. I need to create a &#8220;Team Members&#8221; field, which is a multi-User type. Upon creation of that field, I need to populate it with both the value from the Primary and Secondary tech lead fields. Naturally, I chose to implement this one-time setup in the FeatureActivated event receiver.

Additionally, I want to make sure that whenever a tech lead is changed, that that change is reflected in the Team Members field. I also want to make sure that you can&#8217;t delete someone from Team Members if they&#8217;re still a tech lead. Naturally, I chose to implement this as an ItemUpdating event receiver.

Every time I tried to activate the solution, however, I always got the following error:

Unhandled exception was thrown by the sandboxed code wrapper&#8217;s Execute method in the partial trust app domain: The sandboxed code execution request was refused because the Sandboxed Code Host Service was too busy to handle the request.

Well, excuuuuuuuuse me!

Now, I wasn&#8217;t entirely un-clever about this. Of _course_ my ItemUpdating event was firing when I was trying to populate the TeamMembers field. (Okay, I&#8217;m kind of lying. There was a lot of blank &#8220;WTF?&#8221; going on in my head before I realized that the ItemUpdating event was firing. Then I went through the feature activation in the debugger, and noticed that the exception was thrown when I called `SPListItem.Update()` or `SPListItem.SystemUpdate()`, which I tried in desperation.) But my ItemUpdating method should have just quickly exited upon not seeing the fields that it was worried about in the AfterProperties. Still, worried about my logic, I commented out my routine line by line. Until finally, my entire ItemUpdating receiver looked like:

```C#
public override void ItemUpdating(SPItemEventProperties properties) {  
  // Lots of commented-out lines  
  base.ItemUpdating(properties);  
}  
```

And still, Sandbox is Too Damn Busy.

Then I went to the List Receiver&#8217;s Elements.xml file, and commented out the `<Receiver&#8230;><Type>ItemUpdating</Type>&#8230;</Receiver>` part. And lo and behold, the Sandbox would suddenly take my calls again.

I then created the simplest test case. One list. One ItemUpdating event receiver which does nothing. One FeatureActivated event receiver that updates a list item. Activation == game over.

Now I _understand_ why updating a ListItem that has an ItemUpdating receiver from a FeatureActivated receiver might be a problem. But, once again, SharePoint has vomited forth one of the least useful error messages possible.