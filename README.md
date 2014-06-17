Condicio
========

What
----

A simple library similar to [Google's Preconditions](http://docs.guava-libraries.googlecode.com/git/javadoc/com/google/common/base/Preconditions.html) in Guava.

Why
---

I got tired of writing boilerplate code to check my arguments and their types, and I didn't want to bring in a huge dependency like jQuery or Underscore simply to do parameter and argument checking. I couldn't really find anything out there that did the job so I decided to roll my own.

How
---

All you need is `condicio.js` or `condicio.min.js` from the `dist` directory. Simply include that in your code and you're good to go. Condicio is UMD-compatible, so you can use it with RequireJS and Node, if you wish.
