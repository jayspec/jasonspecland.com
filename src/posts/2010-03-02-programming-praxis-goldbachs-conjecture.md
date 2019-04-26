---
id: 72
title: 'Programming Praxis: Goldbach&#8217;s Conjecture'
date: 2010-03-02T22:26:26-04:00
author: jason
layout: post
guid: http://jasonspecland.azurewebsites.net/?p=72
permalink: /2010/03/02/programming-praxis-goldbachs-conjecture/
ljID:
  - "997"
categories:
  - Programming
tags:
  - c
  - geek
  - praxis
  - Programming
---
Since I mentioned in my last post that I live in fear of the tech interview, I decided to do something about it rather than live in fear. To that end, I subscribed to a website called Programming Praxis, which publishes short programming problems to sharpen your saw on. (Well, I&#8217;d actually been a subscriber for a while, but it&#8217;s just now that I&#8217;ve actually took the time to do my own saw sharpening.)

Geek Content Ahead. Feel Free to Ignore.

[Today&#8217;s Praxis](http://programmingpraxis.com/2010/03/02/goldbachs-conjecture/) is on the [Goldbach Conjecture](http://en.wikipedia.org/wiki/Goldbach_conjecture) which states that any even number greater than 2 can be expressed as the sum of two primes. The challenge is to write a program that will take in an even number, and spit out the two primes that can be added together to make it.

I realize my solution is extremely naive, but it&#8217;s the first time in a long time that I&#8217;ve actually worked on programming problems other than &#8220;get data from database a, transform it somehow, and put it in database b.&#8221; Also, for extra difficulty (and speed, although my algorithm is the real speed hangup in this case) I wrote it in C.

For the one or two people still reading, here is my extremely naive solution, cobbled together while watching West Side Story on TCM.

[sourcecode language=&#8221;cpp&#8221;]  
#include <stdio.h>  
#include <stdlib.h>

void show_usage();  
unsigned long *create\_sieve\_to_number(unsigned long number);

int main (int argc, const char * argv[]) {

if (argc != 2) {  
show_usage();  
return -1;  
}

unsigned long number = atol(argv[1]);

if ((number % 2) != 0) {  
show_usage();  
return -1;  
}

unsigned long *sieve = create\_sieve\_to_number(number);

for (unsigned long i = 2; i < number; i++) { if (sieve[i] == 1) { for (unsigned long j = i; j < number; j++) { if (sieve[j] == 1) { if (i + j == number) { printf("Solution found: %d + %d\n", i, j); return 0; } } } } } printf("no solution found! pick up your Fields Medal!\n"); return 0; } void show\_usage(void) { printf("usage: goldbach [even number]\n"); } unsigned long \*create\_sieve\_to\_number(unsigned long number) { unsigned long \*sieve; sieve = (unsigned long \*)malloc(sizeof(unsigned long) \* (number + 1)); for (int i = 0; i < number; i++) { sieve[i] = 1; } for (unsigned long i = 2; i < number; i++) { if (sieve[i] == 1) { for (unsigned long j = i * i; j < number; j = j + i) { sieve[j] = 0; } } } return sieve; } [/sourcecode] **Edit:** See what happens when you&#8217;re watching TV when you&#8217;re doing your homework? The flags marking numbers as prime can be a bool (or even a bit) and most certainly does _not_ have to be an unsigned long. Yay for massive, massive wastes of memory! (But hey, I _was_ watching West Side Story&#8230;)