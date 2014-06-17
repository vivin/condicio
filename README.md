<p align="right">
   <img src="https://travis-ci.org/vivin/condicio.png?branch=develop" alt="Condicio Build Status" />&nbsp;
   <a href='https://coveralls.io/r/vivin/condicio?branch=develop'><img src='https://coveralls.io/repos/vivin/condicio/badge.png?branch=develop' alt='Condicio Coverage Status' /></a>
</p>

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

All you need is `condicio.js` or `condicio.min.js` from the `dist` directory. Simply include that in your code and you're good to go. Condicio is UMD-compatible, so you can use it with RequireJS or node, if you wish. Condicio is also [available](https://www.npmjs.org/package/condicio) from npm.

Examples
--------

Checking an argument:

    function divide(numerator, denominator) {
        condicio.checkArgument(denominator != 0);
        ...
    }

Ensuring an argument is not `null`:

    function frobulateGromulator(droob) {
        condicio.checkNotNull(droob, "Droob cannot be null!");
        ...
    }

Ensuring that arguments are of a specific type:

    function render(name, callback) {
        condicio.checkIsString(name);
        condicio.checkIsFunction(callback, "{0} callback must be a function.", [name]);
        ...
    }

API
---

All functions take an optional `message` and `arguments` parameter. `message` can be provided for custom error messages. `arguments` is an array of values than can be used for interpolation.
For example, if `message` is `"The argument must be {0} and {1}"`, and `arguments` is the array `["one", "two"]`, then the interpolated error-message will be `"The argument must be one and two"`.
This is useful for custom, dynamic, error-messages.

The API exposes the following exceptions:

 - `condicio.IllegalArgumentException`: Thrown when an invalid or illegal argument is supplied.
 - `condicio.IllegalStateException`: Thrown when the state of the calling instance or context is invalid.
 - `condicio.NullReferenceException`: Thrown when a reference is `null`.
 - `condicio.UndefinedReferenceException`: Thrown when a reference is `undefined`.
 - `condicio.IndexOutOfBoundsException`: Thrown when an index is out of bounds.
 - `condicio.PropertyNotFoundException`: Thrown when a property is not found on an object.
 - `condicio.InvalidTypeException`: Thrown if an argument is of an invalid type.

These are full-fledged [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) objects.

The API supports the following functions to check your arguments or the state of the calling-instance or context:

**checkArgument**(expression, *[message, [arguments]]*)

Ensures that the `expression` involving one or more arguments to the function is `true`. If `expression` is `false`, a `condicio.IllegalArgumentException` will be thrown.

---

**checkState**(expression, *[message, [arguments]]*)

Ensures that the `expression` involving the state of the **calling** instance or context, but **not** involving any parameters to the calling function, is `true`. If `expression` is `false`, a `condicio.IllegalStateException` will be thrown.

---

**checkNotNull**(reference, *[message, [arguments]]*)

Ensures that `reference` is not `null`. Throws a `condicio.NullReferenceException` if `reference` is `null`.

---

**checkNotUndefined**(reference, *[message, [arguments]]*)

Ensures that `reference` is not `undefined`. Throws a `condicio.UndefinedReferenceException` if `reference` is `undefined`.

---

**checkElementIndex**(index, size, *[message, [arguments]]*)

Ensures that `index` specifies a valid *element* in an array or string of size `size`. Valid indexes range from `0` to `size - 1`. Throws `condicio.IndexOutOfBoundsException` if `index` is negative or not less than `size`. Throws `condicio.IllegalArgumentException` if `size` is negative.

---

**checkPositionIndex**(index, size, *[message, [arguments]]*)

Ensures that `index` specifies a valid *position* in an array or string of size `size`. Valid positions range from `0` to `size`. This precondition is typically used to test for a valid position to add a *new* element.Throws `condicio. IndexOutOfBoundsException` if `index` is negative or greater than `size`. Throws `IllegalArgumentException` is `size` is negative.

---

**checkPositionIndexes**(start, end, size, *[message, [arguments]]*)

Ensures that `start` and `end` specify valid *positions* in an array or string of size `size`, and are in order.  Throws `condicio.IndexOutOfBoundsException` if either index is negative or is greater than `size`, or if `end` is less than `start`. Throws `condicio.IllegalArgumentException` if `size` is negative.

---

**checkObjectDirectProperty**(object, property, *[message, [arguments]]*)

Ensures that the property `property` exists and is a direct property of `object`. Throws `condicio.PropertyNotFoundException` if the property is not a direct property of `object`.

---

**checkObjectProperty**(object, property, *[message, [arguments]]*)

Ensures that the property `property` exists and is a property (direct or inherited via prototype chain) of `object`. Throws `condicio.PropertyNotFoundException` if the property is not a property (direct or inherited via prototype chain) of `object`.

---

**checkIsBoolean**(object, *[message, [arguments]]*)

Ensures that `object` is a [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean). Throws `condicio.InvalidTypeException` if `object` is not a `boolean`.

---

**checkIsNumber**(object, *[message, [arguments]]*)

Ensures that `object` is a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number). Throws `condicio.InvalidTypeException` if `object` is not a `number`.

---

**checkIsString**(object, *[message, [arguments]]*)

Ensures that `object` is a [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String). Throws `condicio.InvalidTypeException` if `object` is not a `string`.

---

**checkIsArray**(object, *[message, [arguments]]*)

Ensures that `object` is an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array). Throws `condicio.InvalidTypeException` if `object` is not a `array`.

---

**checkIsObject**(object, *[message, [arguments]]*)

Ensures that `object` is an [`object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object). Throws `condicio.InvalidTypeException` if `object` is not a `object`.

---

**checkIsFunction**(object, *[message, [arguments]]*)

Ensures that `object` is a [`function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Functions/Function). Throws `condicio.InvalidTypeException` if `object` is not a `function`.
