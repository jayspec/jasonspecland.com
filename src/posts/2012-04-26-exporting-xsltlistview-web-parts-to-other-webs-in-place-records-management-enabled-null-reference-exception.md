---
id: 401
title: Exporting XSLTListView Web Parts to Other Webs + In Place Records Management Enabled = Null Reference Exception
date: 2012-04-26T11:27:38-04:00
author: jason
layout: post
guid: http://jasonspecland.azurewebsites.net/?p=401
permalink: /2012/04/26/exporting-xsltlistview-web-parts-to-other-webs-in-place-records-management-enabled-null-reference-exception/
tumblrize_post-type:
  - regular
snapEdIT:
  - "1"
categories:
  - SharePoint
tags:
  - bugs
  - code
  - frustration
  - in place records management
  - Programming
  - sharepoint
  - xsltlistviewwebpart
---
Here&#8217;s the scenario: In SharePoint, you want to view one or more lists from one web in a site collection in a different web on the same site collection. What do you do? That&#8217;s easy: You go to SharePoint Designer, go to the original list view, export the XSLTListView web part that represents that view, load it into your other web and place it in whatever web part page you&#8217;d like. Boom. Dashboard.

Unless, of course, you&#8217;ve got the In Place Records Management feature enabled. In that case, you&#8217;re screwed. Everything will look fine for a while. But eventually, all of the views of your original list will fail. You will see the dreaded:

`<br />
Server Error in '/' Application.<br />
________________________________________<br />
Object reference not set to an instance of an object.<br />
Description: An unhandled exception occurred during the execution of the current web request. Please review the stack trace for more information about the error and where it originated in the code.` 

Exception Details: System.NullReferenceException: Object reference not set to an instance of an object.

Source Error:  
An unhandled exception was generated during the execution of the current web request. Information regarding the origin and location of the exception can be identified using the exception stack trace below.

Stack Trace:

[NullReferenceException: Object reference not set to an instance of an object.]  
Microsoft.Office.RecordsManagement.RecordsRepository.Records.GetCachedAllowManualRecordDeclarationSetting(CachedList list, Hashtable siteProperties) +3  
Microsoft.Office.RecordsManagement.Controls.<>c\_\_DisplayClass1.b\_\_0() +164  
Microsoft.Office.Server.Utilities.MonitoredScopeWrapper.RunWithMonitoredScope(Action code) +39  
Microsoft.Office.RecordsManagement.Controls.DeclareRecordAction.GetDeclareRecordInfo() +158  
Microsoft.Office.RecordsManagement.Controls.InPlaceRecordsRibbon.Page_PreRenderComplete(Object sender, EventArgs e) +74  
System.EventHandler.Invoke(Object sender, EventArgs e) +0  
System.Web.UI.Page.OnPreRenderComplete(EventArgs e) +11058669  
System.Web.UI.Page.ProcessRequestMain(Boolean includeStagesBeforeAsyncPoint, Boolean includeStagesAfterAsyncPoint) +3671

Why, SharePoint!? WHY!? (Seriously, if I had a nickel for every time I shouted that&#8230;)

Well, with the help of our good friend [.NET Reflector](http://www.reflector.net/ ".NET Reflector"), let&#8217;s take a closer look at that stack trace, shall we?

Microsoft.Office.RecordsManagement lives in Microsoft.Office.Policy.dll. I open it up and take a look at `GetCachedAllowManualRecordDeclarationSetting(CachedList list, Hashtable siteProperties)`. Not much there&#8230;

[sourcecode language=&#8221;csharp&#8221;]  
internal static bool GetCachedAllowManualRecordDeclarationSetting(CachedList list, Hashtable siteProperties)  
{  
if (list.RecordsUseListSetting)  
{  
return list.RecordsAllowManualDeclareSetting;  
}  
return GetCachedAllowManualDeclarationSiteSetting(siteProperties);  
}  
[/sourcecode]

Nothing that&#8217;s going to throw a NullReferenceException unless the cached list itself is null. So let&#8217;s travel up the stack a bit to `Microsoft.Office.RecordsManagement.Controls.<>c__DisplayClass1.b__0()`.

[sourcecode language=&#8221;csharp&#8221;]  
public void <GetDeclareRecordInfo>b__0()  
{  
SPList list = SPContext.Current.List;  
if (list != null)  
{  
CachedArea rootArea = CacheManager.GetManagerForContextSite().ObjectFactory.RootArea;  
CachedList cachedList = CommonUtilities.GetCachedList(SPContext.Current.Web, SPContext.Current.ListId);  
if (list != null) // <- WTF!? (This comment added by me.) { this.declareRecord.iprList = Records.GetCachedAllowManualRecordDeclarationSetting(cachedList, rootArea.Properties); if (this.declareRecord.iprList) { this.declareRecord.userHasRights = Records.CachedDoesUserHavePermissionsToDeclare(list, rootArea.Properties); } } } } [/sourcecode] Ah HA! The cached list **is** null! The inner null check is clearly meant to check the null-ness of cachedList and not list! So, thanks to a clear, obvious bug in SharePoint, you can&#8217;t use XSLTListView Web Parts on other webs in your site collection if In Place Records Management is turned on. Unfortunately, the only solution is to turn it off.

Note: I upgraded my development SharePoint instance to the February 2012 CU. This bug still exists in assembly file version 14.0.6116.5000.