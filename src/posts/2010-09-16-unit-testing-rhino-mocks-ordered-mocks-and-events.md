---
id: 188
title: 'Unit Testing: Rhino Mocks, Ordered Mocks, and Events'
date: 2010-09-16T12:23:11-04:00
author: jason
layout: post
guid: http://jasonspecland.azurewebsites.net/?p=188
permalink: /2010/09/16/unit-testing-rhino-mocks-ordered-mocks-and-events/
ljID:
  - "1023"
categories:
  - Programming
tags:
  - c
  - geek
  - Programming
  - rhino mocks
  - unit testing
---
Tired of all that improv show talk? Well, now it&#8217;s time for me to get my geek on. Non-computer geeks feel free to tune out. This is actually more along the lines of &#8220;put it out there for the sake of future Googlers&#8221; than a serious discussion.

I&#8217;ve had test-first religion for some time now, but deadlines have made me something of a lapsed tester. After finding a pretty bad-ass bug in my code, I got religion again, admitted I was a sinner, and went forward in Testing. I am redeeming myself by writing a few hundred unit tests of already existing code.

My preferred mock framework is Rhino Mocks. Now I&#8217;m all about the AAA (Arrange, Act, Assert) syntax. 99.9% of my tests (seriously, I&#8217;ve got over a thousand of them) are AAA. Most of my tests are unordered. I just want to test that something was called, and I don&#8217;t care what was called before or after it.

But you can&#8217;t do AAA syntax when you&#8217;re doing ordered tests. It hasn&#8217;t been a problem thus far, but I ran into a problem when I started testing objects that hooked up events in the constructor: So my code looked like this:

[sourcecode language=&#8221;c#&#8221;]  
namespace RhinoMocksOrdredWithEvents {  
public interface IOrderedThing {  
void FirstThing();  
void SecondThing();  
void SomethingElse();  
event EventHandler<EventArgs> OnThingHappened;  
}

public class MyTestClass {

private IOrderedThing MyOrderedThing { get; set; }

public MyTestClass(IOrderedThing orderedThing) {  
MyOrderedThing = orderedThing;  
MyOrderedThing.OnThingHappened += new EventHandler<EventArgs>(MyOrderedThing_OnThingHappened);  
MyOrderedThing.SomethingElse();  
}

public void DoThingsInOrder() {

MyOrderedThing.SomethingElse();

MyOrderedThing.FirstThing();  
MyOrderedThing.SecondThing();  
}

private void MyOrderedThing_OnThingHappened(object sender, EventArgs e) {  
return;  
}

}  
}  
[/sourcecode]

And here&#8217;s the test to make sure that FirstThing() and SecondThing() are called in order:

[sourcecode language=&#8221;c#&#8221;]  
namespace RhinoMocksOrdredWithEvents {  
[TestClass]  
public class OrderedMockTests { 

[TestMethod]  
public void TestThingsAreRunInOrder() {  
// Arrange  
MockRepository mocks = new MockRepository(); 

IOrderedThing mockOrderedThing = mocks.DynamicMock<IOrderedThing>(); 

MyTestClass classUnderTest = new MyTestClass(mockOrderedThing); 

using (mocks.Record()) {  
using (mocks.Ordered()) {  
mockOrderedThing.Expect(thing => thing.FirstThing());  
mockOrderedThing.Expect(thing => thing.SecondThing());  
}  
} 

mockOrderedThing.Replay(); 

// Act  
classUnderTest.DoThingsInOrder(); 

// Assert  
mockOrderedThing.VerifyAllExpectations();  
}  
}  
}  
[/sourcecode]

Be not fooled by my spurious use of the //Arange, //Act, and //Assert comments. This is most definitely not the AAA syntax.

So when I tried to run this test, I got the following error:

``<br />
Test method<br />
RhinoMocksOrdredWithEvents.OrderedMockTests.TestThingsAreRunInOrder<br />
threw exception:<br />
Rhino.Mocks.Exceptions.ExpectationViolationException:<br />
IOrderedThing.add_OnThingHappened(System.EventHandler`1[System.EventArgs]);<br />
Expected #1, Actual #0..<br />
`` 

What what what!? I never told Rhino Mocks that I expected the event to be wired! And anyway, it _is_ wired, right there in the constructor, see? Then I comment out the event hookup, and the test works! So off I sauntered to the Rhino Mocks mailing list all like, &#8220;Hey guys, I don&#8217;t mean to be all smug and stuff, but all y&#8217;all got a bug.&#8221;

Thankfully, [Tim Barcz](http://devlicio.us/blogs/tim_barcz/) on the mailing list set me straight.

Yes, Virginia, you _can_ do the AAA syntax in an ordered mock, and this is how you do it:

[sourcecode language=&#8221;c#&#8221;]  
namespace RhinoMocksOrdredWithEvents {  
[TestClass]  
public class OrderedMockTests {

[TestMethod]  
public void TestThingsAreRunInOrder() {  
// Arrange  
//MockRepository mocks = new MockRepository();

IOrderedThing mockOrderedThing = MockRepository.GenerateMock<IOrderedThing>();

MyTestClass classUnderTest = new MyTestClass(mockOrderedThing);

mockOrderedThing.GetMockRepository().Ordered();

mockOrderedThing.Expect(thing => thing.FirstThing());  
mockOrderedThing.Expect(thing => thing.SecondThing());

// Act  
classUnderTest.DoThingsInOrder();

// Assert  
mockOrderedThing.VerifyAllExpectations();

}  
}  
}  
[/sourcecode]

Which works no matter what strange stuff you want to do in the constructor.

Much thanks to Tim Barcz for setting me straight. Here is [the original thread on the Rhino Mocks mailing list](http://groups.google.com/group/rhinomocks/browse_thread/thread/7bfe0b3e2fc59baf/2dbbdc920e78f10a#2dbbdc920e78f10a).