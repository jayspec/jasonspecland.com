---
id: 388
title: Hyper-V VM Not Starting Due to Insufficient RAM, Even Though You Have Enough? Kill googlecrashhandler.exe
date: 2012-02-13T11:01:31-04:00
author: jason
layout: post
guid: http://jasonspecland.azurewebsites.net/?p=388
permalink: /2012/02/13/hyper-v-vm-not-starting-due-to-insufficient-ram-even-though-you-have-enough-kill-googlecrashhandler-exe/
snapEdIT:
  - "1"
categories:
  - Programming
tags:
  - geek
  - google
  - hyper-v
  - sharepoint
---
So this morning I start up my computer, and start up my SharePoint Development VM. I get a message saying that my VM won&#8217;t start. It says &#8220;Unable to allocate 6144 MB of RAM: Insufficient resources exist to complete the requested service. (0x800705AA).&#8221;

Well naturally I like to give my SharePoint VM lots of RAM, but 6144 is right around the amount that is actually free. So I lower it to 4096 MB. Task Manager tells me I have more than enough free RAM to do that. But I try to start it up&#8230; No dice. I lower it to 2048 MB. It starts all right, but running SharePoint + SQL Server + Visual Studio on 2 GB of RAM is not something I relish.

Finally, my Google-Fu was powerful enough to show me [newly-posted answer on TechNet](http://social.technet.microsoft.com/Forums/en-US/winserverhyperv/thread/31eab821-a7fd-40b4-9f3a-08a13fc1bc22).

googlecrashhandler.exe? Really!? Well, seems silly, but anything&#8217;s worth a try. I kill the 2 processes and boom. My VM starts with 6 GB of RAM, just like always.

I&#8217;m writing this up for two reasons: Primarily, I&#8217;m putting this out there so Google can grab it and save my fellow devs from frustration. But secondarily, as a SharePoint developer, it&#8217;s not often that I have cause to direct WTF&#8217;s at a party other than Microsoft.

Hey, Google: WTF!?