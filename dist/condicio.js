/**
 * @preserve
 * condicio.js - A preconditions library for JavaScript similar to Google's Preconditions from Guava
 * Version 2.0.0
 * Written by Vivin Paliath (http://vivin.net)
 * License: BSD License
 * Copyright (C) 2015
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('condicio',[], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.condicio = factory();
    }
}(this, function () {

    var IllegalArgumentError = function (message) {
        this.name = "IllegalArgumentError";
        this.message = message;
    };

    var IllegalStateError = function (message) {
        this.name = "IllegalStateError";
        this.message = message;
    };

    extendError(IllegalArgumentError);
    extendError(IllegalStateError);
    extendError(TypeError);

    function extendError(error) {
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

    function generateError(defaultMessage, message, arguments, exception) {
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
            generateError("Argument does not satisfy expression", message, arguments, IllegalArgumentError);
        }
    }

    function checkElementIndex(index, size, message, arguments) {
        checkIsNumber(index, "Index must be a number");
        checkIsNumber(size, "Size must be a number");
        checkArgument(size >= 0, "Size must be positive; received {0} instead", [size]);

        if(isElementIndexInvalid(index, size)) {
            generateError("Index " + index + " is not a valid index in array of size " + size, message, arguments, RangeError);
        }
    }

    function isElementIndexInvalid(index, size) {
        checkIsNumber(index, "Index must be a number");
        checkIsNumber(size, "Size must be a number");
        checkArgument(size >= 0, "Size must be positive; received {0} instead", [size]);

        return (index < 0 || index >= size);
    }

    function checkNotNull(reference, message, arguments) {
        if(isNull(reference)) {
            generateError("Argument cannot be null", message, arguments, TypeError);
        }
    }

    function isNull(reference) {
        return (reference === null);
    }

    function checkNotUndefined(reference, message, arguments) {
        if(isUndefined(reference)) {
            generateError("Argument cannot be undefined", message, arguments, ReferenceError);
        }
    }

    function isUndefined(reference) {
        return (typeof reference === "undefined");
    }

    function checkPositionIndex(index, size, message, arguments) {
        checkIsNumber(index, "Index must be a number");
        checkIsNumber(size, "Size must be a number");
        checkArgument(size >= 0, "Size must be positive; received {0} instead", [size]);

        if(isPositionIndexInvalid(index, size)) {
            generateError("Index " + index + " is not a valid position in array of size " + size, message, arguments, RangeError);
        }
    }

    function isPositionIndexInvalid(index, size) {
        checkIsNumber(index, "Index must be a number");
        checkIsNumber(size, "Size must be a number");
        checkArgument(size >= 0, "Size must be positive; received {0} instead", [size]);

        return (index < 0 || index > size);
    }

    function checkPositionIndexes(start, end, size, message, arguments) {
        checkIsNumber(start, "Starting index must be a number");
        checkIsNumber(end, "Ending index must be a number");
        checkIsNumber(size, "Size must be a number");
        checkArgument(size >= 0, "Size must be positive; received {0} instead", [size]);

        if(arePositionIndexesInvalid(start, end, size)) {
            generateError("Positions between indexes " + start + " and " + end + " are not valid positions in array of size " + size, message, arguments, RangeError);
        }
    }

    function arePositionIndexesInvalid(start, end, size) {
        checkIsNumber(start, "Starting index must be a number");
        checkIsNumber(end, "Ending index must be a number");
        checkIsNumber(size, "Size must be a number");
        checkArgument(size >= 0, "Size must be positive; received {0} instead", [size]);

        return (start < 0 || end > size || start > end);
    }

    function checkObjectDirectProperty(object, property, message, arguments) {
        checkNotNull(object, "Object parameter cannot be null");
        checkNotUndefined(object, "Object parameter cannot be undefined");
        checkIsString(property, "Property parameter must be a string");

        if(!isObjectDirectProperty(object, property)) {
            generateError("Property '" + property + "' is not a valid, direct property", message, arguments, ReferenceError);
        }
    }

    function isObjectDirectProperty(object, property) {
        checkNotNull(object, "Object parameter cannot be null");
        checkNotUndefined(object, "Object parameter cannot be undefined");
        checkIsString(property, "Property parameter must be a string");

        return object.hasOwnProperty(property);
    }

    function checkObjectProperty(object, property, message, arguments) {
        checkNotNull(object, "Object parameter cannot be null");
        checkNotUndefined(object, "Object parameter cannot be undefined");
        checkIsString(property, "Property parameter must be a string");

        if(!isObjectProperty(object, property)) {
            generateError("Property '" + property + "' is not a valid property", message, arguments, ReferenceError);
        }
    }

    function isObjectProperty(object, property) {
        checkNotNull(object, "Object parameter cannot be null");
        checkNotUndefined(object, "Object parameter cannot be undefined");
        checkIsString(property, "Property parameter must be a string");

        return (property in object);
    }

    function checkState(expression, message, arguments) {
        if(!expression) {
            generateError("State does not satisfy expression", message, arguments, IllegalStateError);
        }
    }

    function checkIsBoolean(object, message, arguments) {
        if(!isBoolean(object)) {
            generateError("Argument is not a boolean", message, arguments, TypeError);
        }
    }

    function isBoolean(object, message) {
        return (typeof object === "boolean");
    }

    function checkIsNumber(object, message, arguments) {
        if(!isNumber(object)) {
            generateError("Argument is not a number", message, arguments, TypeError);
        }
    }

    function isNumber(object) {
        return (typeof object === "number");
    }

    function checkIsString(object, message, arguments) {
        if(!isString(object)) {
            generateError("Argument is not a string", message, arguments, TypeError);
        }
    }

    function isString(object) {
        return (typeof object === "string");
    }

    function checkIsArray(object, message, arguments) {
        if(!isArray(object)) {
            generateError("Argument is not an array", message, arguments, TypeError);
        }
    }

    function isArray(object) {
        return (typeof Array.isArray === "undefined") ? (toString.call(object) === "[object Array]") : Array.isArray(object);
    }

    function checkIsObject(object, message, arguments) {
        if(!isObject(object)) {
            generateError("Argument is not an object", message, arguments, TypeError);
        }
    }

    function isObject(object) {
        return (Object.getPrototypeOf(new Object(object)) === Object.prototype);
    }

    function checkIsFunction(object, message, arguments) {
        if(!isFunction(object)) {
            generateError("Argument is not a function", message, arguments, TypeError);
        }
    }

    function isFunction(object) {
        return (typeof object === "function");
    }

    function checkIsType(object, type, message, arguments) {
        checkNotNull(object, "Object parameter cannot be null");
        checkNotUndefined(object, "Object parameter cannot be undefined");
        checkNotNull(type, "Type parameter cannot be null");
        checkNotUndefined(type, "Type parameter cannot be undefined");
        checkIsFunction(type, "Type parameter must be a function");

        var expectedType = type.toString().replace(/\s/g, "").replace(/^function/, "").replace(/\(.*/, "");

        if(!isType(object, type)) {
            generateError("Argument is not of type " + expectedType, message, arguments, TypeError); 
        }
    }

    function isType(object, type) {
        checkNotNull(object, "Object parameter cannot be null");
        checkNotUndefined(object, "Object parameter cannot be undefined");
        checkNotNull(type, "Type parameter cannot be null");
        checkNotUndefined(type, "Type parameter cannot be undefined");
        checkIsFunction(type, "Type parameter must be a function");

        return (object instanceof type);
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
        checkIsType: checkIsType,
        isElementIndexInvalid: isElementIndexInvalid,
        isNull: isNull,
        isUndefined: isUndefined,
        isPositionIndexInvalid: isPositionIndexInvalid,
        arePositionIndexesInvalid: arePositionIndexesInvalid,
        isObjectDirectProperty: isObjectDirectProperty,
        isObjectProperty: isObjectProperty,
        isBoolean: isBoolean,
        isNumber: isNumber,
        isString: isString,
        isArray: isArray,
        isObject: isObject,
        isFunction: isFunction,
        isType: isType,
        IllegalArgumentError: IllegalArgumentError,
        IllegalStateError: IllegalStateError
    };
}));

