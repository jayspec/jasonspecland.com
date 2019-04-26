---
id: 771
title: 'My New Project: The Cheapo Blog'
date: 2018-08-13T10:45:04-04:00
author: jason
layout: post
guid: https://jasonspecland.com/?p=771
permalink: /2018/08/13/my-new-project-the-cheapo-blog/
categories:
  - Programming
---
I work for BlueMetal, and we&#8217;re a big Microsoft partner. In fact, we&#8217;ve been partner of the year for the past three years running. That means that I build a lot of stuff in the Azure cloud. I&#8217;ve come to like it a great deal. I&#8217;m amazed by how simple it is to create super-powerful infrastructure at the click of a mouse, or the deployment of an ARM template.

I was so impressed with Azure that I moved my personal WordPress blogs from Dreamhost to Azure. That&#8230; was a bit of a mistake. Not because the performance was bad. It was quite good, in fact. But the problem is that even when sharing an App Service Plan between all of my blogs, using the Azure cloud as a private person who is not a corporation can get a bit expensive. My WordPress hosting costs shot up from about $10.99/mo. to about $80. Now, I had a ridiculous deal on Dreamhost. (Crazy Domain Insane, I believe they called it.) I&#8217;m certainly getting a bit better performance, and I could trivially scale it up. But that&#8217;s a lot of cash to spend every month.

A reasonable person would say, &#8220;Dang, let me migrate my blogs right the heck back to Dreamhost!&#8221; I am not a reasonable person.

Using only Azure resources, can I create a new blogging system that has performance that&#8217;s equal to or better than my WordPress blog, while still being way, way cheaper? I bet I can. It won&#8217;t be functionally competitive with the gigantic WordPress ecosystem, but I don&#8217;t use most of the stuff in the gigantic WordPress ecosystem. I&#8217;m just a simple country blogger.

Now let&#8217;s add another degree of difficulty on to this project. At work, I have a Visual Studio Enterprise subscription, with that delicious $150/month in Azure credits at my disposal. And let me tell you, I use that stuff **all the time**. In fact, since I&#8217;m working on different projects with different configurations, I don&#8217;t develop on my work laptop anymore. Any time I need a new work environment, I build one from scratch by building out a new VM in the Azure cloud. Easy peasy!

The downside is that I&#8217;m used to mindlessly building infrastructure on Azure, but never having to deal with the bill. For this project, I&#8217;m going to see if I can do this entirely on my own, with only my own money, using absolutely no resources that belong to my employer, and nothing that is unlicensed in any way.

There are several challenges involved in this. The first one is most obvious: I don&#8217;t actually have a Windows PC at home! What can I say, my family went all-in on the Mac a few years ago. My instinct would be to just fire up an Azure VM with Visual Studio and RDP right into it. But that would eat up a fair amount of money that I don&#8217;t want to spend.

Fortunately, my Mac is entirely capable of writing .NET Core web services using either Visual Studio for Mac or Visual Studio Code. I fooled around with Visual Studio for Mac for a little bit and it didn&#8217;t thrill me. It&#8217;s great for Unity (which I&#8217;ve dabbled in) and Xamarin (which I haven&#8217;t). But I&#8217;m building web apps, and VS Code is extremely capable for my purposes, so I&#8217;m going to go with that.

And so begins the adventure! Wish me luck!