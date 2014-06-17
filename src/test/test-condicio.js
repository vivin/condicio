/**
 * Tests for condicio.js
 * Created on 6/5/14.
 */

test('Test checkArgument succeeds with true expression', function() {
    equal(condicio.checkArgument(true), undefined, "checkArgument must not fail if 'true' is passed in.");
    equal(condicio.checkArgument("1" === "1"), undefined, "checkArgument must not fail on true condition.");

    var val = 10;
    equal(condicio.checkArgument(val === 10), undefined, "checkArgument must not fail on true condition");
});

test('Test checkArgument fails with false expression', function() {
    throws(function() {
        condicio.checkArgument(false);
    }, condicio.IllegalArgumentException, "checkArgument must throw an exception if 'false' is passed in.");

    throws(function() {
        condicio.checkArgument("1" === "2");
    }, condicio.IllegalArgumentException, "checkArgument must throw an exception on false condition.");

    var val = 10;
    throws(function() {
        condicio.checkArgument(val === 20);
    }, condicio.IllegalArgumentException, "checkArgument must throw an exception on false condition.");
});

test('Test checkArgument throws exception with the proper message and with proper interpolation', function() {
    try {
        condicio.checkArgument(false);
    } catch(e) {
        equal(e.message, "Argument does not satisfy expression", "Exception message must match");
    }

    try {
        condicio.checkArgument(false, "Argument failed because of blah");
    } catch(e) {
        equal(e.message, "Argument failed because of blah", "Exception message must match");
    }

    try {
        condicio.checkArgument(false, "Argument failed because of {0} and {1}", ["this", "that"]);
    } catch(e) {
        equal(e.message, "Argument failed because of this and that", "Exception message must match");
    }
});

test('Test checkElementIndex succeeds with valid index', function() {
    equal(condicio.checkElementIndex(0, 1), undefined, "checkElementIndex must not fail for index 0 in array of size 1");
    equal(condicio.checkElementIndex(0, 2), undefined, "checkElementIndex must not fail for index 0 in array of size 2");
    equal(condicio.checkElementIndex(1, 2), undefined, "checkElementIndex must not fail for index 1 in array of size 2");
    equal(condicio.checkElementIndex(5, 10), undefined, "checkElementIndex must not fail for index 5 in array of size 10");
});

test('Test checkElementIndex fails with invalid index and size', function() {
    throws(function() {
        condicio.checkElementIndex("0", 3);
    }, condicio.InvalidTypeException, "checkElementIndex must fail if index is not a number");

    throws(function() {
       condicio.checkElementIndex(0, "3");
    }, condicio.InvalidTypeException, "checkElementIndex must fail if size is not a number");

    throws(function() {
        condicio.checkElementIndex(0, -1);
    }, condicio.IllegalArgumentException, "checkElementIndex must fail for index 0 in array of size -1");

    throws(function() {
        condicio.checkElementIndex(-1, 0);
    }, condicio.IndexOutOfBoundsException, "checkElementIndex must fail for index -1 in array of size 0");

    throws(function() {
        condicio.checkElementIndex(0, 0);
    }, condicio.IndexOutOfBoundsException, "checkElementIndex must fail for index 0 in array of size 0");

    throws(function() {
        condicio.checkElementIndex(1, 0);
    }, condicio.IndexOutOfBoundsException, "checkElementIndex must fail for index 1 in array of size 0");

    throws(function() {
        condicio.checkElementIndex(1, 1);
    }, condicio.IndexOutOfBoundsException, "checkElementIndex must fail for index 1 in array of size 1");

    throws(function() {
        condicio.checkElementIndex(6, 3);
    }, condicio.IndexOutOfBoundsException, "checkElementIndex must fail for index 6 in array of size 3");
});

test('Test checkElementIndex throws exception with the proper message and with proper interpolation', function() {
    try {
        condicio.checkElementIndex(6, 3);
    } catch(e) {
        equal(e.message, "Index 6 is not a valid index in array of size 3", "Exception message must match");
    }

    try {
        condicio.checkElementIndex(10, 5, "I like turtles");
    } catch(e) {
        equal(e.message, "I like turtles", "Exception message must match");
    }

    try {
        condicio.checkElementIndex(10, 5, "{0} is not a valid index for array of size {1}", [10, 5])
    } catch(e) {
        equal(e.message, "10 is not a valid index for array of size 5", "Exception message must match");
    }
});

test('Test checkNotNull succeeds with non-null reference', function() {
    equal(condicio.checkNotNull("not null"), undefined, "checkNotnull must not fail for a non-null reference");
    equal(condicio.checkNotNull(undefined), undefined, "checkNotNull must not fail for undefined");
});

test('Test checkNotNull fails with a null reference', function() {
    throws(function() {
        condicio.checkNotNull(null);
    }, condicio.NullReferenceException, "Must throw an exception when argument is null");

    var b = null;
    throws(function() {
        condicio.checkNotNull(b);
    }, condicio.NullReferenceException, "Must throw an exception when argument is null");

});

test('Test checkNotNull throws exception with the proper message and with proper interpolation', function() {
    try {
        condicio.checkNotNull(null);
    } catch(e) {
        equal(e.message, "Argument cannot be null", "Exception message must match");
    }

    try {
        condicio.checkNotNull(null, "Invalid index");
    } catch(e) {
        equal(e.message, "Invalid index", "Exception message must match");
    }

    try {
        condicio.checkNotNull(null, "Argument cannot be {0}", ["rabbits"]);
    } catch(e) {
        equal(e.message, "Argument cannot be rabbits", "Exception message must match");
    }
});

test('Test checkNotUndefined succeeds with non-undefined value', function() {
    equal(condicio.checkNotUndefined("not undefined"), undefined, "checkNotUndefined must not fail for a non-undefined value");
    equal(condicio.checkNotUndefined(null), undefined, "checkNotUndefined must not fail for a null value");
});

test('Test checkNotUndefined fails with an undefined value', function() {
    throws(function() {
        condicio.checkNotUndefined(undefined)
    }, condicio.UndefinedReferenceException, "Must throw exception when argument is undefined");

    var b;
    throws(function() {
        condicio.checkNotUndefined(b)
    }, condicio.UndefinedReferenceException, "Must throw exception when argument is undefined");

});

test('Test checkNotUndefined throws exception with the proper message and with proper interpolation', function() {
    try {
        condicio.checkNotUndefined(undefined);
    } catch(e) {
        equal(e.message, "Argument cannot be undefined", "Exception message must match");
    }

    try {
        condicio.checkNotUndefined(undefined, "Cannot be undefined");
    } catch(e) {
        equal(e.message, "Cannot be undefined", "Exception message must match");
    }

    try {
        condicio.checkNotUndefined(undefined, "Argument cannot be {0}", ["puppies"]);
    } catch(e) {
        equal(e.message, "Argument cannot be puppies", "Exception message must match");
    }
});

test('Test checkPositionIndex succeeds with valid position', function() {
    equal(condicio.checkPositionIndex(0, 0), undefined, "checkPositionIndex must not fail for position 0 in array of size 0");
    equal(condicio.checkPositionIndex(0, 1), undefined, "checkPositionIndex must not fail for position 0 in array of size 1");
    equal(condicio.checkPositionIndex(1, 1), undefined, "checkPositionIndex must not fail for position 1 in array of size 1");
});

test('Test checkPositionIndex fails with invalid position and size', function() {
    throws(function() {
        condicio.checkPositionIndex("0", 3);
    }, condicio.InvalidTypeException, "checkPositionIndex must fail if index is not a number");

    throws(function() {
       condicio.checkPositionIndex(0, "3");
    }, condicio.InvalidTypeException, "checkPositionIndex must fail if size is not a number");

    throws(function() {
        condicio.checkPositionIndex(0, -1);
    }, condicio.IllegalArgumentException, "checkPositionIndex must fail for position 0 in array of size -1");

    throws(function() {
        condicio.checkPositionIndex(-1, 0);
    }, condicio.IndexOutOfBoundsException, "checkPositionIndex must fail for position -1 in array of size 0");

    throws(function() {
        condicio.checkPositionIndex(1, 0);
    }, condicio.IndexOutOfBoundsException, "checkPositionIndex must fail for position 1 in array of size 0");

    throws(function() {
        condicio.checkPositionIndex(12, 5);
    }, condicio.IndexOutOfBoundsException, "checkPositionIndex must fail for position 12 in array of size 5");
});

test('Test checkPositionIndex throws exception with proper message and with proper interpolation', function() {
    try {
        condicio.checkPositionIndex(12, 5);
    } catch(e) {
        equal(e.message, "Index 12 is not a valid position in array of size 5", "Exception message must match");
    }

    try {
        condicio.checkPositionIndex(12, 5, "Position is not valid");
    } catch(e) {
        equal(e.message, "Position is not valid", "Exception message must match");
    }

    try {
        condicio.checkPositionIndex(12, 5, "{0} is not a valid position in array of size {1}", [12, 5]);
    } catch(e) {
        equal(e.message, "12 is not a valid position in array of size 5", "Exception message must match");
    }
});

test('Test checkPositionIndexes succeeds with valid start and end', function() {
    equal(condicio.checkPositionIndexes(0, 0, 0), undefined, "checkPositionIndexes must not fail for start 0, end 0, and size 0");
    equal(condicio.checkPositionIndexes(0, 1, 1), undefined, "checkPositionIndexes must not fail for start 0, end 1, and size 1");
    equal(condicio.checkPositionIndexes(1, 1, 1), undefined, "checkPositionIndexes must not fail for start 1, end 1, and size 1");
    equal(condicio.checkPositionIndexes(0, 10, 10), undefined, "checkPositionIndexes must not fail for start 0, end 10, and size 10");
    equal(condicio.checkPositionIndexes(1, 9, 10), undefined, "checkPositionIndexes must not fail for start 1, end 9, and size 10");
});

test('Test checkPositionIndexes fails with invalid start, end, and size', function() {
    throws(function() {
        condicio.checkPositionIndexes("0", 0, 0);
    }, condicio.InvalidTypeException, "checkPositionIndexes must fail if start is not a number");

    throws(function() {
        condicio.checkPositionIndexes(0, "0", 0);
    }, condicio.InvalidTypeException, "checkPositionIndexes must fail if end is not a number");

    throws(function() {
        condicio.checkPositionIndexes(0, 0, "0");
    }, condicio.InvalidTypeException, "checkPositionIndexes must fail if size is not a number");

    throws(function() {
        condicio.checkPositionIndexes(0, 0, -1);
    }, condicio.IllegalArgumentException, "checkPositionIndexes must fail for start 0, end 0, and size -1");

    throws(function() {
        condicio.checkPositionIndexes(-1, 0, 0);
    }, condicio.IndexOutOfBoundsException, "checkPositionIndexes must fail for start -1, end 0, and size 0");

    throws(function() {
        condicio.checkPositionIndexes(0, 1, 0);
    }, condicio.IndexOutOfBoundsException, "checkPositionIndexes must fail for start 0, end 1, and size 0");

    throws(function() {
        condicio.checkPositionIndexes(1, 0, 0);
    }, condicio.IndexOutOfBoundsException, "checkPositionIndexes must fail for start 1, end 0, and size 0");

    throws(function() {
        condicio.checkPositionIndexes(1, 1, 0);
    }, condicio.IndexOutOfBoundsException, "checkPositionIndexes must fail for start 1, end 0, and size 0");

    throws(function() {
        condicio.checkPositionIndexes(0, 2, 1);
    }, condicio.IndexOutOfBoundsException, "checkPositionIndexes must fail for start 0, end 2, and size 1");

    throws(function() {
        condicio.checkPositionIndexes(10, 0, 10);
    }, condicio.IndexOutOfBoundsException, "checkPositionIndexes must fail for start 10, end 0, and size 10");

    throws(function() {
        condicio.checkPositionIndexes(9, 1, 10);
    }, condicio.IndexOutOfBoundsException, "checkPositionIndexes must fail for start 9, end 1, and size 10");

    throws(function() {
        condicio.checkPositionIndexes(9, 11, 10);
    }, condicio.IndexOutOfBoundsException, "checkPositionIndexes must fail for start 9, end 11, and size 10");

    throws(function() {
        condicio.checkPositionIndexes(-1, 9, 10);
    }, condicio.IndexOutOfBoundsException, "checkPositionIndexes must fail for start -1, end 9, and size 10");
});

test('Test checkPositionIndexes throws exception with proper message and with proper interpolation', function() {
    try {
        condicio.checkPositionIndexes(9, 11, 10);
    } catch(e) {
        equal(e.message, "Positions between indexes 9 and 11 are not valid positions in array of size 10", "Exception message must match");
    }

    try {
        condicio.checkPositionIndexes(9, 11, 10, "Positions are not valid")
    } catch(e) {
        equal(e.message, "Positions are not valid", "Exception message must match");
    }

    try {
        condicio.checkPositionIndexes(9, 11, 10, "Positions {0} and {1} are not valid in array of size {2}", [9, 11, 10])
    } catch(e) {
        equal(e.message, "Positions 9 and 11 are not valid in array of size 10", "Exception message must match");
    }
});

test('Test checkObjectDirectProperty succeeds with valid property', function() {
    equal(condicio.checkObjectDirectProperty({prop: "prop"}, "prop"), undefined, "checkObjectProperty must not fail with object and valid property");

    var Prototype = function() {
        this.prototypeProperty = "prototypeProperty";
    };

    var MyObject = function() {
        this.objectProperty = "objectProperty";
    };

    MyObject.prototype = new Prototype();
    var object = new MyObject();

    equal(condicio.checkObjectDirectProperty(object, "objectProperty"), undefined, "checkObjectProperty must not fail with object and valid property");
});

test('Test checkObjectDirectProperty fails with invalid property', function() {
    throws(function() {
        condicio.checkObjectDirectProperty(null, "prop");
    }, condicio.NullReferenceException, "checkObjectDirectProperty must fail if null object is passed in as a parameter");

    throws(function() {
        condicio.checkObjectDirectProperty(function(){}, "prop");
    }, condicio.InvalidTypeException, "checkObjectDirectProperty must fail if non-object is passed in as a parameter");

    throws(function() {
        condicio.checkObjectDirectProperty({}, 0);
    }, condicio.InvalidTypeException, "checkObjectDirectProperty must fail if non-string is passed in as a property name");

    throws(function() {
        condicio.checkObjectDirectProperty({}, "prop");
    }, condicio.PropertyNotFoundException, "checkObjectDirectProperty must fail with object and invalid property");

    var Prototype = function() {
        this.prototypeProperty = "prototypeProperty";
    };

    var MyObject = function() {
        this.objectProperty = "objectProperty";
    };

    MyObject.prototype = new Prototype();
    var object = new MyObject();

    throws(function() {
        condicio.checkObjectDirectProperty(object, "prototypeProperty");
    }, condicio.PropertyNotFoundException, "checkObjectDirectProperty must fail with object and inherited property");
});

test('Test checkObjectDirectProperty throws exception with proper message and with proper interpolation', function() {
    try {
        condicio.checkObjectDirectProperty({}, "prop")
    } catch(e) {
        equal(e.message, "Property 'prop' is not a valid, direct property", "Exception message must match");
    }

    try {
        condicio.checkObjectDirectProperty({}, "prop", "Property is not valid");
    } catch(e) {
        equal(e.message, "Property is not valid", "Exception message must match");
    }

    try {
        condicio.checkObjectDirectProperty({}, "prop", "{0} is not a valid property", ["prop"]);
    } catch(e) {
        equal(e.message, "prop is not a valid property", "Exception message must match");
    }
});

test('Test checkObjectProperty succeeds with valid property', function() {
    equal(condicio.checkObjectProperty({prop: "prop"}, "prop"), undefined, "checkObjectProperty must not fail with object and valid property");

    var Prototype = function() {
        this.prototypeProperty = "prototypeProperty";
    };

    var MyObject = function() {
        this.objectProperty = "objectProperty";
    };

    MyObject.prototype = new Prototype();
    var object = new MyObject();

    equal(condicio.checkObjectProperty(object, "prototypeProperty"), undefined, "checkObjectProperty must not fail with object and inherited property");
    equal(condicio.checkObjectProperty(object, "objectProperty"), undefined, "checkObjectProperty must not fail with object and direct property");
});

test('Test checkObjectProperty fails with invalid property', function() {
    throws(function() {
        condicio.checkObjectProperty(null, "prop");
    }, condicio.NullReferenceException, "checkObjectProperty must fail if null object is passed in as a parameter");

    throws(function() {
        condicio.checkObjectProperty(function(){}, "prop");
    }, condicio.InvalidTypeException, "checkObjectProperty must fail if non-object is passed in as a parameter");

    throws(function() {
        condicio.checkObjectProperty({}, 0);
    }, condicio.InvalidTypeException, "checkObjectProperty must fail if non-string is passed in as a property name");

    throws(function() {
        condicio.checkObjectProperty({}, "prop");
    }, condicio.PropertyNotFoundException, "checkObjectProperty must fail with object and invalid property");

    throws(function() {
        condicio.checkObjectProperty({}, "prop");
    }, condicio.PropertyNotFoundException, "checkObjectProperty must fail with object and invalid property");

    var Prototype = function() {
        this.prototypeProperty = "prototypeProperty";
    };

    var MyObject = function() {
        this.objectProperty = "objectProperty";
    };

    MyObject.prototype = new Prototype();
    var object = new MyObject();

    throws(function() {
        condicio.checkObjectProperty(object, "someProperty");
    }, condicio.PropertyNotFoundException, "checkObjectDirectProperty must fail with object and invalid property");
});

test('Test checkObjectProperty throws exception with proper message and with proper interpolation', function() {
    try {
        condicio.checkObjectProperty({}, "prop")
    } catch(e) {
        equal(e.message, "Property 'prop' is not a valid property", "Exception message must match");
    }

    try {
        condicio.checkObjectProperty({}, "prop", "Property is not valid");
    } catch(e) {
        equal(e.message, "Property is not valid", "Exception message must match");
    }

    try {
        condicio.checkObjectProperty({}, "prop", "{0} is not a valid property", ["prop"]);
    } catch(e) {
        equal(e.message, "prop is not a valid property", "Exception message must match");
    }
});

test('Test checkState succeeds with true expression', function() {
    equal(condicio.checkState(true), undefined, "checkState must not fail if 'true' is passed in.");
    equal(condicio.checkState("1" === "1"), undefined, "checkState must not fail on true condition.");

    var val = 10;
    equal(condicio.checkState(val === 10), undefined, "checkState must not fail on true condition");
});

test('Test checkState fails with false expression', function() {
    throws(function() {
        condicio.checkState(false);
    }, condicio.IllegalStateException, "checkState must throw an exception if 'false' is passed in.");

    throws(function() {
        condicio.checkState("1" === "2");
    }, condicio.IllegalStateException, "checkState must throw an exception on false condition.");

    var val = 10;
    throws(function() {
        condicio.checkState(val === 20);
    }, condicio.IllegalStateException, "checkState must throw an exception on false condition.");
});

test('Test checkState throws exception with the proper message and with proper interpolation', function() {
    try {
        condicio.checkState(false);
    } catch(e) {
        equal(e.message, "State does not satisfy expression", "Exception message must match");
    }

    try {
        condicio.checkState(false, "Someone set us up the bomb");
    } catch(e) {
        equal(e.message, "Someone set us up the bomb", "Exception message must match");
    }

    try {
        condicio.checkState(false, "State failed because of {0} and {1}", ["this", "that"]);
    } catch(e) {
        equal(e.message, "State failed because of this and that", "Exception message must match");
    }
});

test('Test checkIsBoolean succeeds with boolean value', function() {
    equal(condicio.checkIsBoolean(true), undefined, "'true' must be a boolean.");
    equal(condicio.checkIsBoolean(false), undefined, "'false' must be a boolean.");

    var a = true;
    var b = false;

    equal(condicio.checkIsBoolean(a), undefined, "Boolean variable must be a boolean");
    equal(condicio.checkIsBoolean(b), undefined, "Boolean variable must be a boolean");
});

test('Test checkIsBoolean fails with non-boolean value', function() {
    throws(function() {
        condicio.checkIsBoolean("true");
    }, condicio.InvalidTypeException, "checkIsBoolean must fail for a non-boolean value");
});

test('Test checkIsBoolean throws exception with the proper message and with proper interpolation', function() {
    try {
        condicio.checkIsBoolean("true");
    } catch(e) {
        equal(e.message, "Argument is not a boolean", "Exception message must match");
    }

    try {
        condicio.checkIsBoolean("true", "Not a boolean");
    } catch(e) {
        equal(e.message, "Not a boolean", "Exception message must match");
    }

    try {
        condicio.checkIsBoolean("true", "I wanted a {0}", ["boolean"]);
    } catch(e) {
        equal(e.message, "I wanted a boolean", "Exception message must match");
    }
});

test('Test checkIsNumber succeeds with number value', function() {
    equal(condicio.checkIsNumber(1), undefined, "1 must be a number");
    equal(condicio.checkIsNumber(0.1), undefined, "0.1 must be a number");
    equal(condicio.checkIsNumber(-1), undefined, "-1 must be a number");
    equal(condicio.checkIsNumber(3e10), undefined, "3e10 must be a number");

});

test('Test checkIsNumber fails with non-number value', function() {
    throws(function() {
        condicio.checkIsNumber("1.0");
    }, condicio.InvalidTypeException, "checkIsNumber must fail for non-number value");

    throws(function() {
        condicio.checkIsNumber({});
    }, condicio.InvalidTypeException, "checkIsNumber must fail for non-number value");

});

test('Test checkIsNumber throws exception with the proper message and with proper interpolation', function() {
    try {
        condicio.checkIsNumber("1.0");
    } catch(e) {
        equal(e.message, "Argument is not a number", "Exception message must match");
    }

    try {
        condicio.checkIsNumber(NaN, "Not a number");
    } catch(e) {
        equal(e.message, "Not a number", "Exception message must match");
    }

    try {
        condicio.checkIsNumber(NaN, "I expected a {0}", ["number"]);
    } catch(e) {
        equal(e.message, "I expected a number", "Exception message must match");
    }
});

test('Test checkIsString succeeds with string value', function() {
    equal(condicio.checkIsString(""), undefined, "Empty string must be a string");
    equal(condicio.checkIsString("hello"), undefined, "String must be a string");
});

test('Test checkIsString fails with non-string value', function() {
    throws(function() {
        condicio.checkIsString(5);
    }, condicio.InvalidTypeException, "checkIsString must fail for non-string value");
});

test('Test checkIsString throws exception with the proper message and with proper interpolation', function() {
    try {
        condicio.checkIsString(1.0);
    } catch(e) {
        equal(e.message, "Argument is not a string", "Exception message must match");
    }

    try {
        condicio.checkIsString("1", "Not a string");
    } catch(e) {
        equal(e.message, "Not a string", "Exception message must match");
    }

    try {
        condicio.checkIsString("1", "I was expecting a {0}", ["string"]);
    } catch(e) {
        equal(e.message, "I was expecting a string", "Exception message must match");
    }
});

test('Test checkIsArray succeeds with array', function() {
    equal(condicio.checkIsArray([]), undefined, "[] must be an array");
    equal(condicio.checkIsArray(new Array()), undefined, "new Array() must be an array");
    equal(condicio.checkIsArray([0, 1, 2]), undefined, "[0, 1, 2] must be an array");
});

test('Test checkIsArray fails for non-array value', function() {
    throws(function() {
        condicio.checkIsArray({});
    }, condicio.InvalidTypeException, "checkIsArray must fail for non-array value");
});

test('Test checkIsArray throws exception with the proper message and with proper interpolation', function() {
    try {
        condicio.checkIsArray({});
    } catch(e) {
        equal(e.message, "Argument is not an array", "Exception message must match");
    }

    try {
        condicio.checkIsArray({}, "Not an array");
    } catch(e) {
        equal(e.message, "Not an array", "Exception message must match");
    }

    try {
        condicio.checkIsArray({}, "I wanted an {0}", ["array"]);
    } catch(e) {
        equal(e.message, "I wanted an array", "Exception message must match");
    }
});

test('Test checkIsObject succeeds with objects', function() {
    equal(condicio.checkIsObject({}), undefined, "{} must be an object");

    function obj(prop) {
        this.prop = prop;
    }

    var myObj = new obj("prop");

    equal(condicio.checkIsObject(myObj), undefined, "Object must be an object");
});

test('Test checkIsObject fails with non-object value', function() {
    throws(function() {
        condicio.checkIsObject([]);
    }, condicio.InvalidTypeException, "checkIsObject must fail for non-object value");
});

test('Test checkIsArray throws exception with the proper message and with proper interpolation', function() {
    try {
        condicio.checkIsObject([]);
    } catch(e) {
        equal(e.message, "Argument is not an object", "Exception message must match");
    }

    try {
        condicio.checkIsObject([], "Not an object");
    } catch(e) {
        equal(e.message, "Not an object", "Exception message must match");
    }

    try {
        condicio.checkIsObject([], "I expected an {0}", ["object"]);
    } catch(e) {
        equal(e.message, "I expected an object", "Exception message must match");
    }
});

test('Test checkIsFunction succeeds with functions', function() {
    equal(condicio.checkIsFunction(function() {}), undefined, "checkIsFunction must succeed with anonymous function");

    function myFunction() {
    }
    equal(condicio.checkIsFunction(myFunction), undefined, "checkIsFunction must succeed with named function");

    var functionRef = function() {
    };
    equal(condicio.checkIsFunction(functionRef), undefined, "checkIsFunction must succeed with function reference");
});

test('Test checkIsFunction fails with non-function value', function() {
    throws(function() {
        condicio.checkIsFunction({});
    }, condicio.InvalidTypeException, "checkIsFunction must fail with non-function value");
});

test('Test checkIsFunction throws exception with the proper message and with proper interpolation', function() {
    try {
        condicio.checkIsFunction([]);
    } catch(e) {
        equal(e.message, "Argument is not a function", "Exception message must match");
    }

    try {
        condicio.checkIsFunction({}, "Not a function");
    } catch(e) {
        equal(e.message, "Not a function", "Exception message must match");
    }

    try {
        condicio.checkIsFunction({}, "I want a rabbit", ["rabbit"]);
    } catch(e) {
        equal(e.message, "I want a rabbit", "Exception message must match");
    }
});

test('Test interpolation errors out if invalid arguments are provided', function() {
    throws(function() {
        condicio.checkArgument(false, function(){});
    }, condicio.InvalidTypeException, "Interpolation must fail if the error message is not a string");

    throws(function() {
        condicio.checkArgument(false, "Error", "not an array");
    }, condicio.InvalidTypeException, "Interpolation must fail if the arguments argument is not an array");
});
