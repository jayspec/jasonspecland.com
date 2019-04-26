---
id: 602
title: 'A Dog Named &#8216;Cat&#8217;: What Happens When You Name a SharePoint Field &#8216;DisplayName&#8217;?'
date: 2016-09-19T10:45:34-04:00
author: jason
layout: post
guid: http://jasonspecland.azurewebsites.net/?p=602
permalink: /2016/09/19/a-dog-named-cat-what-happens-when-you-name-a-sharepoint-field-displayname/
categories:
  - SharePoint
---
<blockquote class="twitter-tweet" data-partner="tweetdeck">
  <p dir="ltr" lang="en">
    <a href="https://twitter.com/jayspectech">@jayspectech</a> You have a devious mind! That&#8217;s like naming your dog, &#8220;Cat&#8221;. I love it!
  </p>
  
  <p>
    — Bob German (@Bob1German) <a href="https://twitter.com/Bob1German/status/776810967183323136">September 16, 2016</a>
  </p>
</blockquote>



Sometimes I feel bad for junior front-end developers who think they have a decent handle on things, and then get thrown into the world of SharePoint. They don&#8217;t have the SharePoint Spidey-sense that tells them something simple is going to go horribly wrong.

I was called on to assist a junior developer who was tearing his hair out trying to do simple CRUD operations on list items in SharePoint in an Angular application. I&#8217;d already written a (somewhat) simplifying Angular service to deal with most of the annoying parts of the REST API, so I was baffled that he was having so much trouble with it.

So I stepped into the code with him, making sure he was calling my service correctly. He was. I began to panic. Was there a bug in my service? I stepped into the service code. Everything looked fine, and SharePoint returned the proper &#8220;201 CREATED&#8221; response. But every field except one was being set.

The name of that field was &#8220;DisplayName&#8221;.

Curious.

I proceeded to create a new Custom List called &#8220;TestThisBug.&#8221; I created a field called &#8220;DisplayName&#8221; and another field called &#8220;FooDisplayName.&#8221; 

[<img src="http://jasonspecland.azurewebsites.net/wp-content/uploads/2016/09/SP2013-DisplayName-Bug-in-Interface.png" alt="sp2013-displayname-bug-in-interface" width="924" height="1027" class="alignnone size-full wp-image-606" srcset="/wp-content/uploads/2016/09/SP2013-DisplayName-Bug-in-Interface.png 924w, /wp-content/uploads/2016/09/SP2013-DisplayName-Bug-in-Interface-270x300.png 270w, /wp-content/uploads/2016/09/SP2013-DisplayName-Bug-in-Interface-768x854.png 768w, /wp-content/uploads/2016/09/SP2013-DisplayName-Bug-in-Interface-921x1024.png 921w, /wp-content/uploads/2016/09/SP2013-DisplayName-Bug-in-Interface-676x751.png 676w" sizes="(max-width: 924px) 100vw, 924px" />](http://jasonspecland.azurewebsites.net/wp-content/uploads/2016/09/SP2013-DisplayName-Bug-in-Interface.png)

Simple, right? Then I tried to get the fields via the REST API.

[<img class="alignnone size-full wp-image-607" src="http://jasonspecland.azurewebsites.net/wp-content/uploads/2016/09/SP2013-DisplayName-Bug-in-REST.png" alt="sp2013-displayname-bug-in-rest" width="1411" height="1031" srcset="/wp-content/uploads/2016/09/SP2013-DisplayName-Bug-in-REST.png 1411w, /wp-content/uploads/2016/09/SP2013-DisplayName-Bug-in-REST-300x219.png 300w, /wp-content/uploads/2016/09/SP2013-DisplayName-Bug-in-REST-768x561.png 768w, /wp-content/uploads/2016/09/SP2013-DisplayName-Bug-in-REST-1024x748.png 1024w, /wp-content/uploads/2016/09/SP2013-DisplayName-Bug-in-REST-676x494.png 676w" sizes="(max-width: 1411px) 100vw, 1411px" />](http://jasonspecland.azurewebsites.net/wp-content/uploads/2016/09/SP2013-DisplayName-Bug-in-REST.png)

The field did not appear. Curiouser and curiouser.

I tweeted the tweet above, and told the developer to name the field something else and be on his way. I wondered, &#8220;What if we try the same operations using the JSOM?&#8221;

So, on my SharePoint 2013 VM, I fired up a Site Collection, created my list, and wrote me some JSOM code. I wrote some code that will get that list item, select a few fields (including &#8220;DisplayName&#8221;) and just display it in a table.

[<img src="http://jasonspecland.azurewebsites.net/wp-content/uploads/2016/09/SP2013-Every-Field-But-DisplayName.png" alt="sp2013-every-field-but-displayname" width="1181" height="600" class="alignnone size-full wp-image-608" srcset="/wp-content/uploads/2016/09/SP2013-Every-Field-But-DisplayName.png 1181w, /wp-content/uploads/2016/09/SP2013-Every-Field-But-DisplayName-300x152.png 300w, /wp-content/uploads/2016/09/SP2013-Every-Field-But-DisplayName-768x390.png 768w, /wp-content/uploads/2016/09/SP2013-Every-Field-But-DisplayName-1024x520.png 1024w, /wp-content/uploads/2016/09/SP2013-Every-Field-But-DisplayName-676x343.png 676w" sizes="(max-width: 1181px) 100vw, 1181px" />](http://jasonspecland.azurewebsites.net/wp-content/uploads/2016/09/SP2013-Every-Field-But-DisplayName.png)

I got every field I asked for, except for &#8220;DisplayName&#8221; which was silently disregarded. When I tried to ask for it directly via `get_item('DisplayName')` I was told it wasn&#8217;t initialized, despite the fact that I&#8217;d explicitly requested it.

[<img src="http://jasonspecland.azurewebsites.net/wp-content/uploads/2016/09/SP2013-Uninitialized-Property-JSOM.png" alt="sp2013-uninitialized-property-jsom" width="1208" height="155" class="alignnone size-full wp-image-610" srcset="/wp-content/uploads/2016/09/SP2013-Uninitialized-Property-JSOM.png 1208w, /wp-content/uploads/2016/09/SP2013-Uninitialized-Property-JSOM-300x38.png 300w, /wp-content/uploads/2016/09/SP2013-Uninitialized-Property-JSOM-768x99.png 768w, /wp-content/uploads/2016/09/SP2013-Uninitialized-Property-JSOM-1024x131.png 1024w, /wp-content/uploads/2016/09/SP2013-Uninitialized-Property-JSOM-676x87.png 676w" sizes="(max-width: 1208px) 100vw, 1208px" />](http://jasonspecland.azurewebsites.net/wp-content/uploads/2016/09/SP2013-Uninitialized-Property-JSOM.png)

I began to wonder if I would run into the same _creation_ issue my coworker was encountering. I wrote some more JSOM code to actually create a list item with the &#8220;DisplayName&#8221; field set. And, even more strangely&#8230; It worked!

[<img src="http://jasonspecland.azurewebsites.net/wp-content/uploads/2016/09/SP2013-Succesfully-Created-Item-with-JSOM.png" alt="sp2013-succesfully-created-item-with-jsom" width="916" height="491" class="alignnone size-full wp-image-609" srcset="/wp-content/uploads/2016/09/SP2013-Succesfully-Created-Item-with-JSOM.png 916w, /wp-content/uploads/2016/09/SP2013-Succesfully-Created-Item-with-JSOM-300x161.png 300w, /wp-content/uploads/2016/09/SP2013-Succesfully-Created-Item-with-JSOM-768x412.png 768w, /wp-content/uploads/2016/09/SP2013-Succesfully-Created-Item-with-JSOM-676x362.png 676w" sizes="(max-width: 916px) 100vw, 916px" />](http://jasonspecland.azurewebsites.net/wp-content/uploads/2016/09/SP2013-Succesfully-Created-Item-with-JSOM.png)

I then logged on to my Office 365 Dev Tenant to see if this is still an issue.

[<img src="http://jasonspecland.azurewebsites.net/wp-content/uploads/2016/09/O365-DisplayName-Bug-in-REST.png" alt="o365-displayname-bug-in-rest" width="1409" height="1025" class="alignnone size-full wp-image-619" srcset="/wp-content/uploads/2016/09/O365-DisplayName-Bug-in-REST.png 1409w, /wp-content/uploads/2016/09/O365-DisplayName-Bug-in-REST-300x218.png 300w, /wp-content/uploads/2016/09/O365-DisplayName-Bug-in-REST-768x559.png 768w, /wp-content/uploads/2016/09/O365-DisplayName-Bug-in-REST-1024x745.png 1024w, /wp-content/uploads/2016/09/O365-DisplayName-Bug-in-REST-676x492.png 676w" sizes="(max-width: 1409px) 100vw, 1409px" />](http://jasonspecland.azurewebsites.net/wp-content/uploads/2016/09/O365-DisplayName-Bug-in-REST.png)

[<img src="http://jasonspecland.azurewebsites.net/wp-content/uploads/2016/09/O365-DisplayName-Bug-With-JSOM-Added-Item.png" alt="o365-displayname-bug-with-jsom-added-item" width="1407" height="680" class="alignnone size-full wp-image-605" srcset="/wp-content/uploads/2016/09/O365-DisplayName-Bug-With-JSOM-Added-Item.png 1407w, /wp-content/uploads/2016/09/O365-DisplayName-Bug-With-JSOM-Added-Item-300x145.png 300w, /wp-content/uploads/2016/09/O365-DisplayName-Bug-With-JSOM-Added-Item-768x371.png 768w, /wp-content/uploads/2016/09/O365-DisplayName-Bug-With-JSOM-Added-Item-1024x495.png 1024w, /wp-content/uploads/2016/09/O365-DisplayName-Bug-With-JSOM-Added-Item-676x327.png 676w" sizes="(max-width: 1407px) 100vw, 1407px" />](http://jasonspecland.azurewebsites.net/wp-content/uploads/2016/09/O365-DisplayName-Bug-With-JSOM-Added-Item.png)

Yup! Sure is! You can see here that I can get the field name from the list via `list.get_fields()`, but when I return list items, the field is not returned, despite explicitly requesting it. You can also see that the &#8220;DisplayName&#8221; field that is returned from `get_fields()` doesn&#8217;t have any super-secret internal name that I&#8217;m missing.

But, as before, adding a list item with that field via JSOM works just fine:

[<img src="http://jasonspecland.azurewebsites.net/wp-content/uploads/2016/09/O365-DisplayName-Bug-With-JSOM-Added-Item.png" alt="o365-displayname-bug-with-jsom-added-item" width="1407" height="680" class="alignnone size-full wp-image-605" srcset="/wp-content/uploads/2016/09/O365-DisplayName-Bug-With-JSOM-Added-Item.png 1407w, /wp-content/uploads/2016/09/O365-DisplayName-Bug-With-JSOM-Added-Item-300x145.png 300w, /wp-content/uploads/2016/09/O365-DisplayName-Bug-With-JSOM-Added-Item-768x371.png 768w, /wp-content/uploads/2016/09/O365-DisplayName-Bug-With-JSOM-Added-Item-1024x495.png 1024w, /wp-content/uploads/2016/09/O365-DisplayName-Bug-With-JSOM-Added-Item-676x327.png 676w" sizes="(max-width: 1407px) 100vw, 1407px" />](http://jasonspecland.azurewebsites.net/wp-content/uploads/2016/09/O365-DisplayName-Bug-With-JSOM-Added-Item.png)

So, kids, I guess the moral of this story is pretty simple: Don&#8217;t name your fields &#8220;DisplayName.&#8221; 

Here&#8217;s the bug-test JSOM code.