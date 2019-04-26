---
id: 435
title: 'More SharePoint Annoyances: User Field Defined in XML Not Appearing in ListData.svc REST/Odata Output'
date: 2012-10-18T12:51:12-04:00
author: jason
layout: post
guid: http://jasonspecland.azurewebsites.net/?p=435
permalink: /2012/10/18/more-sharepoint-annoyances-user-field-defined-in-xml-not-appearing-in-listdata-svc-restodata-output/
snapFB:
  - 's:132:"a:1:{i:0;a:3:{s:10:"AttachPost";s:1:"1";s:10:"SNAPformat";s:41:"New post has been published on %SITENAME%";s:8:"isPosted";s:1:"1";}}";'
snapTR:
  - 's:136:"a:1:{i:0;a:4:{s:12:"apTRPostType";s:1:"T";s:11:"SNAPTformat";s:7:"%TITLE%";s:10:"SNAPformat";s:10:"%FULLTEXT%";s:8:"isPosted";s:1:"1";}}";'
snapTW:
  - 's:81:"a:1:{i:0;a:2:{s:10:"SNAPformat";s:16:"%TITLE% - %SURL%";s:8:"isPosted";s:1:"1";}}";'
snapEdIT:
  - "1"
categories:
  - SharePoint
---
Here&#8217;s another one my improv peeps can ignore.

So here&#8217;s the deal: My company has declared that they&#8217;re going to be moving our SharePoint installation to Office 365 some time in the not-too-distant future. There go my farm solutions. Add to that the fact that SharePoint 2013 is deprecating the sandbox and the writing on the wall says I&#8217;d better learn JavaScript ASAP.

So I work on a sandbox solution (since I&#8217;m still on 2010) to deploy some lists, with an included web part that uses JavaScript to query ListData.svc (and do neat stuff with the interface using knockout).

I have a User field in one of the lists called &#8220;Owner.&#8221; However, when I query ListData.svc, it doesn&#8217;t appear. (No, it&#8217;s not deferred. It&#8217;s just not there. The OwnerId field isn&#8217;t there, either.)  I bang my head against the wall a bit.  Then I add another User field to my site columns, content type, and list in Visual Studio.  Still no dice.

Then I think to add a field using the plain-old web interface.  Suddenly it works.  Could I have been defining my User columns incorrectly all this time?

[sourcecode language=&#8221;xml&#8221;]  
<Field ID="{E8B706A1-5990-41AA-A6C7-E95AE2BA13F9}" Name="WorkPlanItemOwner" DisplayName="Work Plan Item Owner" Type="User" Group="PMO Project Tracking" />  
[/sourcecode]

(I changed the name of the column, in case &#8220;Owner&#8221; was a reserved word in OData or something. Don&#8217;t judge! I was desperate!)

Apparently, all this time I&#8217;d been missing the List=&#8221;UserInfo&#8221; parameter in my list definitions. And the only&#8230; **ONLY** symptom I&#8217;ve ever seen from this is that the field doesn&#8217;t appear when queried via the REST interface.

Once again, SharePoint has driven me to distraction (and blog posting).