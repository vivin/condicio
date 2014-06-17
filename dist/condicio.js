/**
 * @preserve
 * condicio.js - A preconditions library for JavaScript similar to Google's Preconditions from Guava
 * Version 1.0.0
 * Written by Vivin Paliath (http://vivin.net)
 * License: BSD License
 * Copyright (C) 2014
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('condicio',factory)
    } else {
        root.condicio = factory();
    }
}(this, function () {

    var IllegalArgumentException = function (message) {
        this.name = "IllegalArgumentException";
        this.message = message;
    };

    var IllegalStateException = function (message) {
        this.name = "IllegalStateException";
        this.message = message;
    };

    var NullReferenceException = function (message) {
        this.name = "NullReferenceException";
        this.message = message;
    };

    var UndefinedReferenceException = function (message) {
        this.name = "UndefinedReferenceException";
        this.message = message;
    };

    var IndexOutOfBoundsException = function (message) {
        this.name = "IndexOutOfBoundsException";
        this.message = message;
    };

    var PropertyNotFoundException = function (message) {
        this.name = "PropertyNotFoundException";
        this.message = message;
    };

    var InvalidTypeException = function (message) {
        this.name = "InvalidTypeException";
        this.message = message;
    };

    extendException(IllegalArgumentException);
    extendException(IllegalStateException);
    extendException(NullReferenceException);
    extendException(UndefinedReferenceException);
    extendException(IndexOutOfBoundsException);
    extendException(PropertyNotFoundException);
    extendException(InvalidTypeException);

    function extendException(error) {
        error.prototype = new Error();
        error.prototype.constructor = error;
    }

    function interpolateMessage(message, arguments) {
        var placeholders = message.match(/\{[0-9]+\}/g);
        for(var placeholder in placeholders) if(placeholders.hasOwnProperty(placeholder)) {
            var index = placeholder.replace(/\D/g, "");
            message = message.replace(new RegExp("\\{" + index + "\\}", "g"), arguments[index]);
        }

        return message;
    }

    function generateException(defaultMessage, message, arguments, exception) {
        if(typeof message === "undefined" || message === null) {
            throw new exception(defaultMessage);
        } else if(typeof arguments === "undefined" || arguments === null) {
            checkIsString(message, "If message is provided, it must be a string");
            throw new exception(message);
        } else {
            checkIsArray(arguments, "If arguments is provided, it must be an array");
            throw new exception(interpolateMessage(message, arguments));
        }
    }

    function checkArgument(expression, message, arguments) {
        if(!expression) {
            generateException("Argument does not satisfy expression", message, arguments, IllegalArgumentException);
        }
    }

    function checkElementIndex(index, size, message, arguments) {
        checkIsNumber(index, "Index must be a number");
        checkIsNumber(size, "Size must be a number");
        checkArgument(size >= 0, "Size must be positive; received {0} instead", [size]);

        if(index < 0 || index >= size) {
            generateException("Index " + index + " is not a valid index in array of size " + size, message, arguments, IndexOutOfBoundsException);
        }
    }

    function checkNotNull(reference, message, arguments) {
        if(reference === null) {
            generateException("Argument cannot be null", message, arguments, NullReferenceException);
        }
    }

    function checkNotUndefined(object, message, arguments) {
        if(typeof object === "undefined") {
            generateException("Argument cannot be undefined", message, arguments, UndefinedReferenceException);
        }
    }

    function checkPositionIndex(index, size, message, arguments) {
        checkIsNumber(index, "Index must be a number");
        checkIsNumber(size, "Size must be a number");
        checkArgument(size >= 0, "Size must be positive; received {0} instead", [size]);

        if(index < 0 || index > size) {
            generateException("Index " + index + " is not a valid position in array of size " + size, message, arguments, IndexOutOfBoundsException);
        }
    }

    function checkPositionIndexes(start, end, size, message, arguments) {
        checkIsNumber(start, "Starting index must be a number");
        checkIsNumber(end, "Ending index must be a number");
        checkIsNumber(size, "Size must be a number");
        checkArgument(size >= 0, "Size must be positive; received {0} instead", [size]);

        if(start < 0 || end > size || start > end) {
            generateException("Positions between indexes " + start + " and " + end + " are not valid positions in array of size " + size, message, arguments, IndexOutOfBoundsException);
        }
    }

    function checkObjectDirectProperty(object, property, message, arguments) {
        checkNotNull(object, "Object parameter cannot be null");
        checkIsObject(object, "Object parameter must actually be an object");
        checkIsString(property, "Property parameter must be a string");

        if(!object.hasOwnProperty(property)) {
            generateException("Property '" + property + "' is not a valid, direct property", message, arguments, PropertyNotFoundException);
        }
    }

    function checkObjectProperty(object, property, message, arguments) {
        checkNotNull(object, "Object parameter cannot be null");
        checkIsObject(object, "Object parameter must actually be an object");
        checkIsString(property, "Property parameter must be a string");

        if(!(property in object)) {
            generateException("Property '" + property + "' is not a valid property", message, arguments, PropertyNotFoundException);
        }
    }

    function checkState(expression, message, arguments) {
        if(!expression) {
            generateException("State does not satisfy expression", message, arguments, IllegalStateException);
        }
    }

    function checkIsBoolean(object, message, arguments) {
        if(typeof object !== "boolean") {
            generateException("Argument is not a boolean", message, arguments, InvalidTypeException);
        }
    }

    function checkIsNumber(object, message, arguments) {
        if(typeof object !== "number") {
            generateException("Argument is not a number", message, arguments, InvalidTypeException);
        }
    }

    function checkIsString(object, message, arguments) {
        if(typeof object !== "string") {
            generateException("Argument is not a string", message, arguments, InvalidTypeException);
        }
    }

    function checkIsArray(object, message, arguments) {
        var isArray = typeof Array.isArray === "undefined" ? (toString.call(object) === "[object Array]") : Array.isArray(object);
        if(!isArray) {
            generateException("Argument is not an array", message, arguments, InvalidTypeException);
        }
    }

    function checkIsObject(object, message, arguments) {
        if(toString.call(object) !== "[object Object]") {
            generateException("Argument is not an object", message, arguments, InvalidTypeException);
        }
    }

    function checkIsFunction(object, message, arguments) {
        if(typeof object !== "function") {
            generateException("Argument is not a function", message, arguments, InvalidTypeException);
        }
    }

    return {
        checkArgument: checkArgument,
        checkElementIndex: checkElementIndex,
        checkNotNull: checkNotNull,
        checkNotUndefined: checkNotUndefined,
        checkPositionIndex: checkPositionIndex,
        checkPositionIndexes: checkPositionIndexes,
        checkObjectDirectProperty: checkObjectDirectProperty,
        checkObjectProperty: checkObjectProperty,
        checkState: checkState,
        checkIsBoolean: checkIsBoolean,
        checkIsNumber: checkIsNumber,
        checkIsString: checkIsString,
        checkIsArray: checkIsArray,
        checkIsObject: checkIsObject,
        checkIsFunction: checkIsFunction,
        IllegalArgumentException: IllegalArgumentException,
        IllegalStateException: IllegalStateException,
        NullReferenceException: NullReferenceException,
        UndefinedReferenceException: UndefinedReferenceException,
        IndexOutOfBoundsException: IndexOutOfBoundsException,
        PropertyNotFoundException: PropertyNotFoundException,
        InvalidTypeException: InvalidTypeException
    };
}));

