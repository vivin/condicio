<p align="right">
   <img src="https://travis-ci.org/vivin/condicio.png?branch=master" alt="Condicio Build Status" />&nbsp;
   <a href='https://coveralls.io/r/vivin/condicio?branch=master'><img src='https://coveralls.io/repos/vivin/condicio/badge.png?branch=master' alt='Condicio Coverage Status' /></a>
</p>

Condicio
========

What
----

A simple library similar to [Google's Preconditions](http://docs.guava-libraries.googlecode.com/git/javadoc/com/google/common/base/Preconditions.html) in Guava. The current version is **2.0.0**.

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

There are also functions that return a boolean instead of throwing an exception:

    function render(name, callbackOrString) {
        if(condicio.isFunction(callbackOrString)) {
            ...
        } else if(condicio.isString(callbackOrString)) {
            ...
        } else {
            throw new TypeError("Second argument must be a function or a string.");
        }
    }

API
---

All check functions take an optional `message` and `arguments` parameter. `message` can be provided for custom error messages. `arguments` is an array of values than can be used for interpolation.
For example, if `message` is `"The argument must be {0} and {1}"`, and `arguments` is the array `["one", "two"]`, then the interpolated error-message will be `"The argument must be one and two"`.
This is useful for custom, dynamic, error-messages.

In addition to throwing standard error-types (i.e., `TypeError`, `ReferenceError`, and `RangeError`), the API exposes the following errors:

 - `condicio.IllegalArgumentError`: Thrown when an invalid or illegal argument is supplied.
 - `condicio.IllegalStateError`: Thrown when the state of the calling instance or context is invalid.

These are full-fledged [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) objects.

The API supports the following functions to check your arguments or the state of the calling-instance or context:

**checkArgument**(expression, *[message, [arguments]]*)

Ensures that the `expression` involving one or more arguments to the function is `true`. If `expression` is `false`, a `condicio.IllegalArgumentError` will be thrown.

---

**checkState**(expression, *[message, [arguments]]*)

Ensures that the `expression` involving the state of the **calling** instance or context, but **not** involving any parameters to the calling function, is `true`. If `expression` is `false`, a `condicio.IllegalStateError` will be thrown.

---

**checkNotNull**(reference, *[message, [arguments]]*)

Ensures that `reference` is not `null`. Throws a `TypeError` if `reference` is `null`.

---

**checkNotUndefined**(reference, *[message, [arguments]]*)

Ensures that `reference` is not `undefined`. Throws a `ReferenceError` if `reference` is `undefined`.

---

**checkElementIndex**(index, size, *[message, [arguments]]*)

Ensures that `index` specifies a valid *element* in an array or string of size `size`. Valid indexes range from `0` to `size - 1`. Throws `RangeError` if `index` is negative or not less than `size`. Throws `condicio.IllegalArgumentError` if `size` is negative.

---

**checkPositionIndex**(index, size, *[message, [arguments]]*)

Ensures that `index` specifies a valid *position* in an array or string of size `size`. Valid positions range from `0` to `size`. This precondition is typically used to test for a valid position to add a *new* element.Throws `condicio. RangeError` if `index` is negative or greater than `size`. Throws `IllegalArgumentError` is `size` is negative.

---

**checkPositionIndexes**(start, end, size, *[message, [arguments]]*)

Ensures that `start` and `end` specify valid *positions* in an array or string of size `size`, and are in order.  Throws `RangeError` if either index is negative or is greater than `size`, or if `end` is less than `start`. Throws `condicio.IllegalArgumentError` if `size` is negative.

---

**checkObjectDirectProperty**(object, property, *[message, [arguments]]*)

Ensures that the property `property` exists and is a direct property of `object`. Throws `ReferenceError` if the property is not a direct property of `object`.

---

**checkObjectProperty**(object, property, *[message, [arguments]]*)

Ensures that the property `property` exists and is a property (direct or inherited via prototype chain) of `object`. Throws `ReferenceError` if the property is not a property (direct or inherited via prototype chain) of `object`.

---

**checkIsBoolean**(object, *[message, [arguments]]*)

Ensures that `object` is a [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean). Throws `TypeError` if `object` is not a `boolean`.

---

**checkIsNumber**(object, *[message, [arguments]]*)

Ensures that `object` is a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number). Throws `TypeError` if `object` is not a `number`.

---

**checkIsString**(object, *[message, [arguments]]*)

Ensures that `object` is a [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String). Throws `TypeError` if `object` is not a `string`.

---

**checkIsArray**(object, *[message, [arguments]]*)

Ensures that `object` is an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array). Throws `TypeError` if `object` is not a `array`.

---

**checkIsObject**(object, *[message, [arguments]]*)

Ensures that `object` is an [`object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object). Throws `TypeError` if `object` is not a `object`.

---

**checkIsFunction**(object, *[message, [arguments]]*)

Ensures that `object` is a [`function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Functions/Function). Throws `TypeError` if `object` is not a `function`.

---

**checkIsType**(object, type, *[message, [arguments]]*)

Ensures that `object` is an instance of `type`. Throws `TypeError` if `object` is not an instance of `type`.

---

**isNull**(reference)

Returns true if `reference` is `null`.

---

**isUndefined**(reference)

Returns true if `reference` is `undefined`.

---

**isElementIndexInvalid**(index, size)

Returns true if `index` does not specify a valid *element* in an array or string of size `size`. Valid indexes range from `0` to `size - 1`.

---

**isPositionIndexInvalid**(index, size)

Returns true if `index` does not specify a valid *position* in an array or string of size `size`. Valid positions range from `0` to `size`. This precondition is typically used to test for a valid position to add a *new* element.

---

**arePositionIndexesInvalid**(start, end, size)

Returns true if `start` and `end` do not specify valid *positions* in an array or string of size `size`, and are in order.

---

**isObjectDirectProperty**(object, property)

Returns true if the property `property` exists and is a direct property of `object`.

---

**isObjectProperty**(object, property)

Returns true if the property `property` exists and is a property (direct or inherited via prototype chain) of `object`.

---

**isBoolean**(object)

Returns true if `object` is a [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean).

---

**isNumber**(object)

Returns true if `object` is a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number).

---

**isString**(object)

Returns true if `object` is a [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String).

---

**isArray**(object)

Returns true if `object` is an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).

---

**isObject**(object)

Returns true if `object` is an [`object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object).

---

**isFunction**(object)

Returns true if `object` is a [`function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Functions/Function).

---

**isType**(object, type)

Returns true if `object` is an instance of `type`.
