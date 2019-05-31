---
title: 'The Result of my Cheapo Blog Experiment'
date: 2019-05-30
author: jason
layout: post
permalink: /2019/05/30/the-result-of-my-cheapo-blog-experiment
---

Much has changed since I decided that I'd like to save money on my blog hosting costs.

Most notably, I started working for Microsoft.  If I thought I was spoiled by my $150/month MSDN allowance... Man, oh, man, an MS Internal Subscription is very "kid in a candy store."

After a bunch of fits and starts, I follwed the path of least resistance:  I exported the blog from WordPress, and created a static site with [Gatsby](https://www.gatsbyjs.org/).

At first I considered using ASP.NET Core and Cosmos DB.  Cosmos is wonderful, but expensive.  I remembered [what Scott Hanselman said about not requiring a database](https://www.hanselman.com/blog/CloudDatabaseNoSQLNahJustUseCSVsAndCsvHelper.aspx).  Cosmos is awesome if you need NoSQL with instant, worldwide replication and guaranteed throughput.  My humble blog needs no such luxuries.

While I was pondering this, Microsoft released a better, cheaper option:  [Static website hosting in storage accounts](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-static-website). This is awesome because storage accounts, especially with locally redundant storage, are super-cheap.  

There were still a few challenges to overcome.  I wanted to do both HTTPS and use my custom domain, which storage account static hosting doesn't allow.  So I stuck the lowest level of Azure CDN in front of it.  For a relatively low-traffic website, the cost of that won't be an issue.

I've been having all kinds of fun with Gatsby itself.  Rewriting all of my website's widgets in React has been kind of a fun challenge.

To update the blog, I've got an Azure DevOps project setup to automatically rebuild the site whenever I commit to master.  The pipeline runs Gatsby, and sticks the resulting static HTML into my storage account.  Easy peasy...

Okay, not *quite* so easy-peasy.  In order to get completely off of WordPress, I had to get my *wife's* blog onto Gatsby as well.  The translation from her WordPress to Gatsby was no more difficult than my own.  But now I have to teach my non-technical wife how to use Markdown, Visual Studio Code, and Git.  To her eternal credit, she seems game for the idea.  We shall see how game she is once she tries to post her first post-migration post.  I may have been penny wise and pound foolish in this regard...

However, it does appear that I was extremely penny wise, indeed.  Only half-way through the billing month, but my monthly spend so far is forecast to be $2.07.  Way, *way* down from the $100+/month I was spending to host Wordpress.



