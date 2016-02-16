var isFunction;
var ObjProto   = Object.prototype;
var nativeKeys = Object.keys;
//ie 9+
var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
    'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

//ie 11 and Safari 8
if (typeof /./ != 'function' && typeof Int8Array != 'object') {
    isFunction = function(obj) {
        return typeof obj == 'function' || false;
    };
}

var optimizeCb = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
        case 1: return function(value) {
            return func.call(context, value);
        };
        case 2: return function(value, other) {
            return func.call(context, value, other);
        };
        case 3: return function(value, index, collection) {
            return func.call(context, value, index, collection);
        };
        case 4: return function(accumulator, value, index, collection) {
            return func.call(context, accumulator, value, index, collection);
        };
    }
    return function() {
        return func.apply(context, arguments);
    };
};

/**
 *
 _.each([1, 2, 3], alert);
 => alerts each number in turn...
 _.each({one: 1, two: 2, three: 3}, alert);
 => alerts each number value in turn...
 * @param obj
 * @param iteratee
 * @param context
 * @returns {*}
 * @private
 */
var _each = function(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    if (isArrayLike(obj)) {
        for (i = 0, length = obj.length; i < length; i++) {
            iteratee(obj[i], i, obj);
        }
    } else {
        var keys = _.keys(obj);
        for (i = 0, length = keys.length; i < length; i++) {
            iteratee(obj[keys[i]], keys[i], obj);
        }
    }
    return obj;
};

var _isNumber = function(obj){
    "use strict";
    return toString.call(obj) === '[object Number]';
};

var _isNaN = function(obj) {
    return _isNumber(obj) && obj !== +obj;
};

var _has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
};

var _isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
};

var _isArray = function(obj) {
    return toString.call(obj) === '[object Array]';
};

var _keys = function(obj) {
    if (!_isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_has(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
};

var _values = function(obj) {
    var keys = _keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
        values[i] = obj[keys[i]];
    }
    return values;
};

var _identity = function(value) {
    return value;
};

var _extendOwn = createAssigner(_keys);

var _matcher = function(attrs) {
    attrs = _.extendOwn({}, attrs);
    return function(obj) {
        return _.isMatch(obj, attrs);
    };
};

var cb = function(value, context, argCount) {
    if (value == null) return _identity;
    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    if (_.isObject(value)) return _.matcher(value);
    return _.property(value);
};

var _findIndex = createPredicateIndexFinder(1);

var _sortedIndex = function(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = getLength(array);
    while (low < high) {
        var mid = Math.floor((low + high) / 2);
        if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
};

var _indexOf = createIndexFinder(1, _findIndex, _sortedIndex);

//contains([1, 2, 3], 3);
var _contains = function(obj, item, fromIndex, guard) {
    if (!isArrayLike(obj)) obj = _values(obj);
    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
    return _indexOf(obj, item, fromIndex) >= 0;
};


var property = function(key) {
    return function(obj) {
        return obj == null ? void 0 : obj[key];
    };
};

var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
var getLength = property('length');
var isArrayLike = function(collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
};

//检索对象的所有属性的名称
var _allKeys = function(obj) {
    if (!_isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
};

var createAssigner = function(keysFunc, undefinedOnly) {
    return function(obj) {
        var length = arguments.length;
        if (length < 2 || obj == null) return obj;
        for (var index = 1; index < length; index++) {
            var source = arguments[index],
                keys = keysFunc(source),
                l = keys.length;
            for (var i = 0; i < l; i++) {
                var key = keys[i];
                if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
            }
        }
        return obj;
    };
};

var _extend = createAssigner();

// Generator function to create the indexOf and lastIndexOf functions
function createIndexFinder(dir, predicateFind, sortedIndex) {
    return function(array, item, idx) {
        var i = 0, length = getLength(array);
        if (typeof idx == 'number') {
            if (dir > 0) {
                i = idx >= 0 ? idx : Math.max(idx + length, i);
            } else {
                length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
            }
        } else if (sortedIndex && idx && length) {
            idx = sortedIndex(array, item);
            return array[idx] === item ? idx : -1;
        }
        if (item !== item) {
            idx = predicateFind(slice.call(array, i, length), _isNaN);
            return idx >= 0 ? idx + i : -1;
        }
        for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
            if (array[idx] === item) return idx;
        }
        return -1;
    };
}

function createPredicateIndexFinder(dir) {
    return function(array, predicate, context) {
        predicate = cb(predicate, context);
        var length = getLength(array);
        var index = dir > 0 ? 0 : length - 1;
        for (; index >= 0 && index < length; index += dir) {
            if (predicate(array[index], index, array)) return index;
        }
        return -1;
    };
}

function collectNonEnumProps(obj, keys) {
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = (isFunction(constructor) && constructor.prototype) || ObjProto;

    // Constructor is a special case.
    var prop = 'constructor';
    if (_has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

    while (nonEnumIdx--) {
        prop = nonEnumerableProps[nonEnumIdx];
        if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
            keys.push(prop);
        }
    }
}

function clone(obj){
    if (!_isObject(obj)) return obj;
    return _isArray(obj) ? obj.slice() : _.extend({}, obj);
}