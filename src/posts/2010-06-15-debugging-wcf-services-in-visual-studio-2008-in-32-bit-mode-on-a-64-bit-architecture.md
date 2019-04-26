---
id: 100
title: Debugging WCF Services In Visual Studio 2008 in 32-bit Mode on a 64-bit Architecture
date: 2010-06-15T10:25:59-04:00
author: jason
layout: post
guid: http://jasonspecland.azurewebsites.net/?p=100
permalink: /2010/06/15/debugging-wcf-services-in-visual-studio-2008-in-32-bit-mode-on-a-64-bit-architecture/
ljID:
  - "1002"
categories:
  - Programming
tags:
  - .net
  - geek
  - microsoft
  - Programming
  - visual studio
---
This is for my own reference, (and for the sake of anyone Googling) since this has been driving me crazy for months. Feel free to ignore if you&#8217;re not a geek. Feel free to correct it if you are.

When building a WCF project for the x86 architecture on an x64 machine/OS (like, say, Windows 7), you will get a BadFormatException when you try to debug it. This is because WcfSvcHost.exe will run in the mode defined by your architecture, regardless of your particular build environment. Microsoft says that this is working as intended. I say boloney, but I&#8217;m a VS version behind now. (I haven&#8217;t tested VS 2010 yet.)

[Here is a link to part of the solution.](https://connect.microsoft.com/VisualStudio/feedback/details/349510/vs2008-incorrectly-launches-x64-version-of-wcfsvchost-for-x86-debugging?wa=wsignin1.0#)

`<br />
corflags /32BIT+ WcfSvcHost.exe<br />
` 

However, the signature of this assembly is now broken, and won&#8217;t load. So to bypass that:

`<br />
sn -Vr WcfSvcHost.exe<br />
` 

to remove strong name signature verification.

**DANGER:**  
Don&#8217;t do that unless you know what you&#8217;re doing! That opens up a _huge_ security risk. Do not do that in a production environment! Only do it on your dev box!

Why not just build the app in x64 or (even better) Any CPU? Because I can&#8217;t get Oracle.DataAccess in 64-bit.