'use strict';

var kolmafia = require('kolmafia');
var zlib_ash = require('zlib.ash');
var philter_util_ash = require('philter.util.ash');

/**
 * @file Defines base types for API requests and responses.
 */
function isValidRequestMethod(value) {
  return value === 'get' || value === 'patch' || value === 'post';
}
function isRequestBasePropertyName(value) {
  return value === 'method' || value === 'path';
}
/**
 * Converts a flat object to a `RequestBase`.
 *
 * A server should call this on the return value of `formFields()`
 * (analogous to `request.body` in Express.js).
 * @param wrappedRequest Wrapped request object
 * @throws {Error} If any `RequestBase` properties are missing or invalid
 */
function unwrapDeserializedRequest(wrappedRequest) {
  // Cast to Partial<> so that TypeScript type-checks our property access
  var uncheckedRequest = wrappedRequest;
  if (typeof uncheckedRequest.method !== 'string') {
    throw new Error('Missing URL/form parameter: method');
  } else if (!isValidRequestMethod(uncheckedRequest.method)) {
    throw new Error("Invalid URL/form parameter: method=".concat(uncheckedRequest.method));
  }
  if (typeof uncheckedRequest.path !== 'string') {
    throw new Error('Missing URL/form parameter: path');
  }
  var request = {};
  for (var _i2 = 0, _Object$keys2 = Object.keys(wrappedRequest); _i2 < _Object$keys2.length; _i2++) {
    var key = _Object$keys2[_i2];
    // Known keys are passed as-is.
    // All other keys are deserialized.
    request[key] = isRequestBasePropertyName(key) ? wrappedRequest[key] : JSON.parse(wrappedRequest[key]);
  }
  return request;
}

/**
 * @file Defines routes for Cleanup Tables.
 */
var CLEANUP_TABLES_CATEGORIZED_ROUTE = '/cleanup-tables/categorized';
var CLEANUP_TABLES_UNCATEGORIZED_ROUTE = '/cleanup-tables/uncategorized';

/**
 * @file Defines requests and responses for Philter settings.
 */
var CONFIG_ROUTE = '/config';

/**
 * @file Defines requests and responses for the player's inventory state.
 */
var INVENTORY_ROUTE = '/inventory';

/**
 * @file Defines requests and responses for rulesets.
 */
var RULESET_ROUTE = '/ruleset';

/**
 * @file Endpoint for general statistics about Philter.
 */
var STATISTICS_ROUTE = '/statistics';

/**
 * @file Provides constants necessary for piecing the application together.
 */
/**
 * Relative path to the directory that contains assets (HTML, CSS, JS) for
 * Philter Manager.
 */
var RELAY_DIR = '/philter-manager';
/**
 * Name of the entrypoint HTML file.
 * The relay API script will serve this page to the user.
 */
var RELAY_HTML_FILE = 'philter-manager.index.html';
/**
 * Relative path to the HTML skeleton page for Philter Manager.
 * The relay API script will serve this page to the user.
 */
var RELAY_HTML_PATH = "".concat(RELAY_DIR, "/").concat(RELAY_HTML_FILE);

/**
 * Object whose keys are string values that make up the `CleanupAction` type.
 * Also used to check at runtime if a string belongs to `CleanupAction`.
 * The values are unused; they can be anything.
 */
var _cleanupActions = Object.freeze({
  AUTO: 0,
  BREAK: 0,
  CLAN: 0,
  CLST: 0,
  DISC: 0,
  DISP: 0,
  GIFT: 0,
  KEEP: 0,
  MAKE: 0,
  MALL: 0,
  PULV: 0,
  TODO: 0,
  UNTN: 0,
  USE: 0
});
/**
 * Checks if the given value is a valid `CleanupAction` type.
 */
var isCleanupAction = value => typeof value === 'string' && Object.prototype.hasOwnProperty.call(_cleanupActions, value);

/**
 * @file Provides methods for logging colored text.
 */
function error(message) {
  zlib_ash.vprint(message, kolmafia.isDarkMode() ? '#ff0033' : '#cc0033', 1);
}
function warn(message) {
  zlib_ash.vprint(message, kolmafia.isDarkMode() ? '#cc9900' : '#cc6600', 2);
}
function success(message) {
  zlib_ash.vprint(message, kolmafia.isDarkMode() ? '#00cc00' : '#008000', 2);
}
function debug(message) {
  zlib_ash.vprint(message, '#808080', 6);
}

function checkProjectUpdates() {
  // Check version! This will check both scripts and data files.
  // This code is at base level so that the relay script's importation will automatically cause it to be run.
  var PROJECT_NAME = 'Loathing-Associates-Scripting-Society-philter-trunk-release';
  if (kolmafia.svnExists(PROJECT_NAME) && kolmafia.getProperty('_svnUpdated') === 'false' && kolmafia.getProperty('_ocdUpdated') !== 'true') {
    if (!kolmafia.svnAtHead(PROJECT_NAME)) {
      warn('Philter has become outdated. Automatically updating from SVN...');
      kolmafia.cliExecute("svn update ".concat(PROJECT_NAME));
      success("On the script's next invocation it will be up to date.");
    }
    kolmafia.setProperty('_ocdUpdated', 'true');
  }
}

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
}
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), Object.defineProperty(e, "prototype", {
    writable: false
  }), e;
}
function _createForOfIteratorHelper(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e) {
      t && (r = t);
      var n = 0,
        F = function () {};
      return {
        s: F,
        n: function () {
          return n >= r.length ? {
            done: true
          } : {
            done: false,
            value: r[n++]
          };
        },
        e: function (r) {
          throw r;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o,
    a = true,
    u = false;
  return {
    s: function () {
      t = t.call(r);
    },
    n: function () {
      var r = t.next();
      return a = r.done, r;
    },
    e: function (r) {
      u = true, o = r;
    },
    f: function () {
      try {
        a || null == t.return || t.return();
      } finally {
        if (u) throw o;
      }
    }
  };
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t, e;
}
function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = true,
      o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = true, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return r;
  };
  var t,
    r = {},
    e = Object.prototype,
    n = e.hasOwnProperty,
    o = "function" == typeof Symbol ? Symbol : {},
    i = o.iterator || "@@iterator",
    a = o.asyncIterator || "@@asyncIterator",
    u = o.toStringTag || "@@toStringTag";
  function c(t, r, e, n) {
    return Object.defineProperty(t, r, {
      value: e,
      enumerable: !n,
      configurable: !n,
      writable: !n
    });
  }
  try {
    c({}, "");
  } catch (t) {
    c = function (t, r, e) {
      return t[r] = e;
    };
  }
  function h(r, e, n, o) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype);
    return c(a, "_invoke", function (r, e, n) {
      var o = 1;
      return function (i, a) {
        if (3 === o) throw Error("Generator is already running");
        if (4 === o) {
          if ("throw" === i) throw a;
          return {
            value: t,
            done: true
          };
        }
        for (n.method = i, n.arg = a;;) {
          var u = n.delegate;
          if (u) {
            var c = d(u, n);
            if (c) {
              if (c === f) continue;
              return c;
            }
          }
          if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
            if (1 === o) throw o = 4, n.arg;
            n.dispatchException(n.arg);
          } else "return" === n.method && n.abrupt("return", n.arg);
          o = 3;
          var h = s(r, e, n);
          if ("normal" === h.type) {
            if (o = n.done ? 4 : 2, h.arg === f) continue;
            return {
              value: h.arg,
              done: n.done
            };
          }
          "throw" === h.type && (o = 4, n.method = "throw", n.arg = h.arg);
        }
      };
    }(r, n, new Context(o || [])), true), a;
  }
  function s(t, r, e) {
    try {
      return {
        type: "normal",
        arg: t.call(r, e)
      };
    } catch (t) {
      return {
        type: "throw",
        arg: t
      };
    }
  }
  r.wrap = h;
  var f = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var l = {};
  c(l, i, function () {
    return this;
  });
  var p = Object.getPrototypeOf,
    y = p && p(p(x([])));
  y && y !== e && n.call(y, i) && (l = y);
  var v = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(l);
  function g(t) {
    ["next", "throw", "return"].forEach(function (r) {
      c(t, r, function (t) {
        return this._invoke(r, t);
      });
    });
  }
  function AsyncIterator(t, r) {
    function e(o, i, a, u) {
      var c = s(t[o], t, i);
      if ("throw" !== c.type) {
        var h = c.arg,
          f = h.value;
        return f && "object" == typeof f && n.call(f, "__await") ? r.resolve(f.__await).then(function (t) {
          e("next", t, a, u);
        }, function (t) {
          e("throw", t, a, u);
        }) : r.resolve(f).then(function (t) {
          h.value = t, a(h);
        }, function (t) {
          return e("throw", t, a, u);
        });
      }
      u(c.arg);
    }
    var o;
    c(this, "_invoke", function (t, n) {
      function i() {
        return new r(function (r, o) {
          e(t, n, r, o);
        });
      }
      return o = o ? o.then(i, i) : i();
    }, true);
  }
  function d(r, e) {
    var n = e.method,
      o = r.i[n];
    if (o === t) return e.delegate = null, "throw" === n && r.i.return && (e.method = "return", e.arg = t, d(r, e), "throw" === e.method) || "return" !== n && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + n + "' method")), f;
    var i = s(o, r.i, e.arg);
    if ("throw" === i.type) return e.method = "throw", e.arg = i.arg, e.delegate = null, f;
    var a = i.arg;
    return a ? a.done ? (e[r.r] = a.value, e.next = r.n, "return" !== e.method && (e.method = "next", e.arg = t), e.delegate = null, f) : a : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, f);
  }
  function w(t) {
    this.tryEntries.push(t);
  }
  function m(r) {
    var e = r[4] || {};
    e.type = "normal", e.arg = t, r[4] = e;
  }
  function Context(t) {
    this.tryEntries = [[-1]], t.forEach(w, this), this.reset(true);
  }
  function x(r) {
    if (null != r) {
      var e = r[i];
      if (e) return e.call(r);
      if ("function" == typeof r.next) return r;
      if (!isNaN(r.length)) {
        var o = -1,
          a = function e() {
            for (; ++o < r.length;) if (n.call(r, o)) return e.value = r[o], e.done = false, e;
            return e.value = t, e.done = true, e;
          };
        return a.next = a;
      }
    }
    throw new TypeError(typeof r + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, c(v, "constructor", GeneratorFunctionPrototype), c(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = c(GeneratorFunctionPrototype, u, "GeneratorFunction"), r.isGeneratorFunction = function (t) {
    var r = "function" == typeof t && t.constructor;
    return !!r && (r === GeneratorFunction || "GeneratorFunction" === (r.displayName || r.name));
  }, r.mark = function (t) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, c(t, u, "GeneratorFunction")), t.prototype = Object.create(v), t;
  }, r.awrap = function (t) {
    return {
      __await: t
    };
  }, g(AsyncIterator.prototype), c(AsyncIterator.prototype, a, function () {
    return this;
  }), r.AsyncIterator = AsyncIterator, r.async = function (t, e, n, o, i) {
    void 0 === i && (i = Promise);
    var a = new AsyncIterator(h(t, e, n, o), i);
    return r.isGeneratorFunction(e) ? a : a.next().then(function (t) {
      return t.done ? t.value : a.next();
    });
  }, g(v), c(v, u, "Generator"), c(v, i, function () {
    return this;
  }), c(v, "toString", function () {
    return "[object Generator]";
  }), r.keys = function (t) {
    var r = Object(t),
      e = [];
    for (var n in r) e.unshift(n);
    return function t() {
      for (; e.length;) if ((n = e.pop()) in r) return t.value = n, t.done = false, t;
      return t.done = true, t;
    };
  }, r.values = x, Context.prototype = {
    constructor: Context,
    reset: function (r) {
      if (this.prev = this.next = 0, this.sent = this._sent = t, this.done = false, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(m), !r) for (var e in this) "t" === e.charAt(0) && n.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = t);
    },
    stop: function () {
      this.done = true;
      var t = this.tryEntries[0][4];
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function (r) {
      if (this.done) throw r;
      var e = this;
      function n(t) {
        a.type = "throw", a.arg = r, e.next = t;
      }
      for (var o = e.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i[4],
          u = this.prev,
          c = i[1],
          h = i[2];
        if (-1 === i[0]) return n("end"), false;
        if (!c && !h) throw Error("try statement without catch or finally");
        if (null != i[0] && i[0] <= u) {
          if (u < c) return this.method = "next", this.arg = t, n(c), true;
          if (u < h) return n(h), false;
        }
      }
    },
    abrupt: function (t, r) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var n = this.tryEntries[e];
        if (n[0] > -1 && n[0] <= this.prev && this.prev < n[2]) {
          var o = n;
          break;
        }
      }
      o && ("break" === t || "continue" === t) && o[0] <= r && r <= o[2] && (o = null);
      var i = o ? o[4] : {};
      return i.type = t, i.arg = r, o ? (this.method = "next", this.next = o[2], f) : this.complete(i);
    },
    complete: function (t, r) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && r && (this.next = r), f;
    },
    finish: function (t) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var e = this.tryEntries[r];
        if (e[2] === t) return this.complete(e[4], e[3]), m(e), f;
      }
    },
    catch: function (t) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var e = this.tryEntries[r];
        if (e[0] === t) {
          var n = e[4];
          if ("throw" === n.type) {
            var o = n.arg;
            m(e);
          }
          return o;
        }
      }
      throw Error("illegal catch attempt");
    },
    delegateYield: function (r, e, n) {
      return this.delegate = {
        i: x(r),
        r: e,
        n: n
      }, "next" === this.method && (this.arg = t), f;
    }
  }, r;
}
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (String )(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

/**
 * Factory function for functions that parse a text file into a Map using
 * KoLmafia's file I/O API.
 * Any comments and empty lines in the text file are ignored.
 * @param parse Callback used to parse each row.
 *    The callback may accept the following arguments:
 *
 *    - `row`: Array of strings representing each cell
 *    - `rowNum`: Row number, _starts at 1_
 *    - `filename`: Path to the text file being parsed
 *
 *    The callback must return a tuple of `[key, value]`.
 *    If the row is malformed, the callback may throw an exception.
 * @return Function that accepts a file name as a parameter, and returns a Map.
 *    If the file cannot be found or is empty, this function will return an
 *    empty map.
 */
function createMapLoader(parse) {
  return filename => {
    var entries = new Map();
    var rawData = kolmafia.fileToArray(filename);
    for (var _i = 0, _Object$keys = Object.keys(rawData); _i < _Object$keys.length; _i++) {
      var indexStr = _Object$keys[_i];
      var row = rawData[indexStr].split('\t');
      var _parse = parse(row, Number(indexStr), filename),
        _parse2 = _slicedToArray(_parse, 2),
        key = _parse2[0],
        value = _parse2[1];
      entries.set(key, value);
    }
    return entries.size ? entries : null;
  };
}
/**
 * Encodes an item object as a string for saving to a data (TXT) file.
 */
function encodeItem(item) {
  return "[".concat(kolmafia.toInt(item), "]").concat(item.name);
}
/**
 * Converts an object to a Map, converting each key to an `Item` object.
 * @param items Object whose keys are item names
 * @return Mapping of Item to amount
 */
function toItemMap(items) {
  return new Map(Object.keys(items).map(itemStr => [Item.get(itemStr), items[itemStr]]));
}

/**
 * Loads a cleanup ruleset from a text file into a Map.
 * @param filename Path to the data file
 * @return Map of each item to its cleanup rule. If the user's cleanup ruleset
 *    file is empty or missing, returns `null`.
 * @throws {TypeError} If the file contains invalid data
 */
var loadCleanupRulesetFile = createMapLoader((_ref, _, filename) => {
  var _ref2 = _slicedToArray(_ref, 5),
    itemName = _ref2[0],
    action = _ref2[1],
    keepAmountStr = _ref2[2],
    info = _ref2[3],
    message = _ref2[4];
  if (!isCleanupAction(action)) {
    throw new TypeError("".concat(action, " is not a valid cleanup action (file: ").concat(filename, ", entry: ").concat(itemName, ")"));
  }
  var rule;
  if (action === 'GIFT') {
    rule = {
      action: action,
      recipent: info,
      message: message
    };
  } else if (action === 'MAKE') {
    rule = {
      action: action,
      targetItem: info,
      shouldUseCreatableOnly: kolmafia.toBoolean(message)
    };
  } else if (action === 'MALL') {
    var minPrice = Number(info);
    if (!Number.isInteger(minPrice)) {
      throw new TypeError("Invalid minimum price ".concat(minPrice, " for MALL rule (file: ").concat(filename, ", entry: ").concat(itemName, ")"));
    }
    rule = {
      action: action,
      minPrice: minPrice
    };
  } else if (action === 'TODO') {
    // Curiously, Philter stores the message in the 'info' field
    rule = {
      action: action,
      message: info
    };
  } else {
    rule = {
      action: action
    };
  }
  var keepAmount = Number(keepAmountStr);
  if (!Number.isInteger(keepAmount)) {
    throw new TypeError("Invalid keep amount ".concat(keepAmountStr, " (file: ").concat(filename, ", entry: ").concat(itemName, ")"));
  }
  if (keepAmount > 0) {
    rule.keepAmount = keepAmount;
  }
  return [kolmafia.toItem(itemName), rule];
});
/**
 * Saves a Map containing a cleanup ruleset to a text file.
 * @param filepath Path to the data file
 * @param cleanupRulesMap Map of each item to its item info
 */
function saveCleanupRulesetFile(filepath, cleanupRulesMap) {
  // Sort entries by item ID in ascending order when saving
  var buffer = Array.from(cleanupRulesMap.entries()).sort((_ref3, _ref4) => {
    var _ref5 = _slicedToArray(_ref3, 1),
      itemA = _ref5[0];
    var _ref6 = _slicedToArray(_ref4, 1),
      itemB = _ref6[0];
    return kolmafia.toInt(itemA) - kolmafia.toInt(itemB);
  }).map(_ref7 => {
    var _ref8 = _slicedToArray(_ref7, 2),
      item = _ref8[0],
      rule = _ref8[1];
    var info = '',
      message = '';
    if (rule.action === 'GIFT') {
      info = rule.recipent;
      message = rule.message;
    } else if (rule.action === 'MAKE') {
      info = rule.targetItem;
      message = String(rule.shouldUseCreatableOnly);
    } else if (rule.action === 'MALL') {
      info = rule.minPrice ? String(rule.minPrice) : '';
    } else if (rule.action === 'TODO') {
      info = rule.message;
    }
    return [encodeItem(item), rule.action, rule.keepAmount || 0, info, message].join('\t');
  }).join('\n');
  return kolmafia.bufferToFile(buffer, filepath);
}

/**
 * Checks if an item can be cleaned up by Philter.
 *
 * Generally, this rejects most items that cannot be put in the display case
 * (e.g. quest items). However, several items that Philter knows how to handle
 * are exempt from this rule.
 * @param item Item to check
 * @return Whether the item can be cleaned up by Philter
 */
function isCleanable(it) {
  // For some reason Item.get("none") is displayable
  if (it === Item.get('none')) return false;
  if (Item.get(["Boris's key", "Jarlsberg's key", "Richard's star key", "Sneaky Pete's key", 'digital key', "the Slug Lord's map", "Dr. Hobo's map", "Dolphin King's map", 'Degrassi Knoll shopping list', '31337 scroll', 'dead mimic', "fisherman's sack", 'fish-oil smoke bomb', 'vial of squid ink', 'potion of fishy speed', 'blessed large box']).includes(it)) {
    return true;
  }
  // Let these hide in your inventory until it is time for them to strike!
  // TODO: Revisit how this is handled.
  // Since a player can have multiple DNOTC boxes from different years, and we
  // don't know the associated year of a DNOTC box, our best bet is to try
  // opening them all.
  if (it === Item.get('DNOTC Box')) {
    var today = kolmafia.todayToString();
    if (today.slice(4, 6) === '12' && Number(today.slice(6, 8)) < 25) {
      return false;
    }
  }
  return kolmafia.isDisplayable(it);
}

/**
 * @file Tools for loading and manipulating Philter configuration.
 */
/**
 * Namespace object that maps each config key to their ZLib variable name.
 */
var CONFIG_NAMES = Object.freeze({
  emptyClosetMode: 'BaleOCD_EmptyCloset',
  simulateOnly: 'BaleOCD_Sim',
  mallPricingMode: 'BaleOCD_Pricing',
  mallMultiName: 'BaleOCD_MallMulti',
  mallMultiKmailMessage: 'BaleOCD_MultiMessage',
  canUseMallMulti: 'BaleOCD_UseMallMulti',
  dataFileName: 'BaleOCD_DataFile',
  stockFileName: 'BaleOCD_StockFile'
});
/**
 * Sets up default values for config variables (powered by ZLib).
 */
function setDefaultConfig() {
  zlib_ash.setvar(CONFIG_NAMES.mallMultiName, '');
  zlib_ash.setvar(CONFIG_NAMES.canUseMallMulti, true);
  zlib_ash.setvar(CONFIG_NAMES.mallMultiKmailMessage, 'Mall multi dump');
  zlib_ash.setvar(CONFIG_NAMES.dataFileName, kolmafia.myName());
  zlib_ash.setvar(CONFIG_NAMES.stockFileName, kolmafia.myName());
  zlib_ash.setvar(CONFIG_NAMES.mallPricingMode, 'auto');
  zlib_ash.setvar(CONFIG_NAMES.simulateOnly, false);
  zlib_ash.setvar(CONFIG_NAMES.emptyClosetMode, kolmafia.toInt(0)); // Needed to coerce JS number to ASH int
  // ZLib variables that are not exposed yet
  // TODO: Load and save these variables, too
  // Should items be acquired for stock (0: no, 1: yes)
  zlib_ash.setvar('BaleOCD_Stock', kolmafia.toInt(0)); // Needed to coerce JS number to ASH int
  // Should Hangk's Storange be emptied? (0: no, 1: yes)
  zlib_ash.setvar('BaleOCD_EmptyHangks', kolmafia.toInt(0)); // Needed to coerce JS number to ASH int
  // Whether to mallsell any uncategorized items (DANGEROUS)
  zlib_ash.setvar('BaleOCD_MallDangerously', false);
  // Controls whether to run OCD-Cleanup if the player is in Ronin/Hardcore.
  // -"ask": Ask the user
  // -"never": Never run if in Ronin/Hardcore
  // -"always": Always run, even if in Ronin/Hardcore
  zlib_ash.setvar('BaleOCD_RunIfRoninOrHC', 'ask');
}
// TODO: Validate the return values of getvar(). If they have unexpected values,
// print a warning and use default values
// TODO: Print debug message for each config loaded
function loadCleanupConfig() {
  var emptyClosetMode = parseInt(zlib_ash.getvar(CONFIG_NAMES.emptyClosetMode));
  var mallPricingMode = zlib_ash.getvar(CONFIG_NAMES.mallPricingMode);
  // TODO: Load more ZLib vars here
  // (we don't have to expose them via the web UI; we can only expose configs we
  // want to allow editing)
  return {
    emptyClosetMode: emptyClosetMode === 0 || emptyClosetMode === -1 ? emptyClosetMode : 0,
    simulateOnly: kolmafia.toBoolean(zlib_ash.getvar(CONFIG_NAMES.simulateOnly)),
    mallPricingMode: mallPricingMode === 'auto' || mallPricingMode === 'max' ? mallPricingMode : 'auto',
    mallMultiName: zlib_ash.getvar(CONFIG_NAMES.mallMultiName),
    mallMultiKmailMessage: zlib_ash.getvar(CONFIG_NAMES.mallMultiKmailMessage),
    canUseMallMulti: kolmafia.toBoolean(zlib_ash.getvar(CONFIG_NAMES.canUseMallMulti)),
    dataFileName: zlib_ash.getvar(CONFIG_NAMES.dataFileName),
    stockFileName: zlib_ash.getvar(CONFIG_NAMES.stockFileName)
  };
}
function saveCleanupConfig(config) {
  var serializedConfig = {};
  for (var _i = 0, _Object$keys = Object.keys(config); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    var varName = CONFIG_NAMES[key];
    if (varName === undefined) {
      throw new Error("Cannot find ZLib config name for config key '".concat(key, "'"));
    }
    serializedConfig[varName] = String(config[key]);
  }
  philter_util_ash._updateZlibVars(serializedConfig);
}

/**
 * Loads a stocking ruleset from a text file into a map.
 * @param fileName Path to the data file
 * @return Map of each item to its stocking rule. If the user's stocking ruleset
 *    file is empty or missing, returns `null`.
 * @throws {TypeError} If the file contains invalid data
 */
var loadStockingRulesetFile = createMapLoader((_ref, _, fileName) => {
  var _ref2 = _slicedToArray(_ref, 4),
    itemName = _ref2[0],
    type = _ref2[1],
    amountStr = _ref2[2],
    _ref2$ = _ref2[3],
    category = _ref2$ === void 0 ? '' : _ref2$;
  var amount = Number(amountStr);
  if (!Number.isInteger(amount)) {
    throw new TypeError("Invalid stock-up amount (".concat(amount, ") for item '").concat(itemName, "' in file '").concat(fileName, "'"));
  }
  return [kolmafia.toItem(itemName), {
    type: type,
    amount: amount,
    category: category
  }];
});
/**
 * Saves a map containing a stocking ruleset to a text file.
 * @param filepath Path to the data file
 * @param stockingRulesMap Map of each item to its stocking rule
 */
function saveStockingRulesetFile(filepath, stockingRulesMap) {
  // Sort entries by item ID in ascending order when saving
  var buffer = Array.from(stockingRulesMap.entries()).sort((_ref3, _ref4) => {
    var _ref5 = _slicedToArray(_ref3, 1),
      itemA = _ref5[0];
    var _ref6 = _slicedToArray(_ref4, 1),
      itemB = _ref6[0];
    return kolmafia.toInt(itemA) - kolmafia.toInt(itemB);
  }).map(_ref7 => {
    var _ref8 = _slicedToArray(_ref7, 2),
      item = _ref8[0],
      rule = _ref8[1];
    return [encodeItem(item), rule.type, rule.amount, rule.category].join('\t');
  }).join('\n');
  if (!kolmafia.bufferToFile(buffer, filepath)) {
    throw new Error("Failed to save to ".concat(filepath));
  }
}

/**
 * @file Tools for managing `PhilterConfig` objects.
 */
/**
 * Get the full file name of a cleanup ruleset file, including the prefix and
 * file extension.
 */
function getFullDataFileName(fileNameComponent) {
    return `OCDdata_${fileNameComponent}.txt`;
}
/**
 * Get the full file name of a cleanup stocking ruleset file, including the
 * prefix and file extension.
 */
function getFullStockFileName(fileNameComponent) {
    return `OCDstock_${fileNameComponent}.txt`;
}

/**
 * @file Tools for managing `CleanupRuleset` objects.
 */
/**
 * Loads the cleanup ruleset from the ruleset file of the current player.
 * @return Map of each item to its cleanup rule. If the user's cleanup ruleset
 *    file is empty or missing, returns `null`.
 */
function loadCleanupRulesetForCurrentPlayer() {
    let cleanupRulesMap = loadCleanupRulesetFile(getFullDataFileName(zlib_ash.getvar(CONFIG_NAMES.dataFileName)));
    if (!cleanupRulesMap || cleanupRulesMap.size === 0) {
        // Legacy file name
        // TODO: We inherited this from OCD Inventory Manager. Since nobody seems to
        // be using this anymore, we can probably remove it.
        cleanupRulesMap = loadCleanupRulesetFile(`OCD_${kolmafia.myName()}.txt`);
    }
    return cleanupRulesMap;
}
/**
 * Writes the stocking ruleset to the ruleset file of the current player.
 * @param cleanupRulesMap Stocking ruleset to save
 */
function saveCleanupRulesetForCurrentPlayer(cleanupRulesMap) {
    return saveCleanupRulesetFile(getFullDataFileName(zlib_ash.getvar(CONFIG_NAMES.dataFileName)), cleanupRulesMap);
}

/**
 * @file General-purpose utilities for KoLmafia scripts.
 */
const _MONTH_STR = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];
/**
 * Converts a given date to Common Log Format string.
 */
function formatDateClf(date) {
    // Example format: 05/Apr/2021:15:22:30 +0900
    const dd = String(date.getDate()).padStart(2, '0');
    const mon = _MONTH_STR[date.getMonth()];
    const yyyy = date.getFullYear();
    const hh = String(date.getHours()).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');
    const tzOffset = date.getTimezoneOffset();
    const tz_hh = String(Math.floor(Math.abs(tzOffset) / 60)).padStart(2, '0');
    const tz_mm = String(Math.abs(tzOffset) % 60).padStart(2, '0');
    // Displayed time zone sign must be reversed
    const timezone = `${tzOffset >= 0 ? '-' : '+'}${tz_hh}${tz_mm}`;
    return `${dd}/${mon}/${yyyy}:${hh}:${mm}:${ss} ${timezone}`;
}
/**
 * Converts a regular JavaScript object keyed by item IDs to an ES6 Map keyed by
 * `Item` objects.
 */
function idMappingToItemMap(itemMapping) {
    return new Map(Object.keys(itemMapping).map(itemId => [
        Item.get(Number(itemId)),
        itemMapping[itemId],
    ]));
}
/**
 * Converts an ES6 Map keyed by `Item` objects to a regular JavaScript object
 * keyed by item IDs.
 */
function itemMapToIdMapping(itemMap) {
    const itemMapping = {};
    for (const [item, value] of itemMap) {
        itemMapping[kolmafia.toInt(item)] = value;
    }
    return itemMapping;
}

/**
 * @file Tools for managing `InventoryState` objects.
 */
/**
 * Returns an ES6 Map of all items in the current player's display case.
 */
function getDisplayCaseMap() {
    // There is no equivalent of getInventory(), getCloset(), etc.
    const displayCaseMap = new Map();
    if (kolmafia.haveDisplay()) {
        for (const item of Item.all()) {
            const amount = kolmafia.displayAmount(item);
            if (amount > 0) {
                displayCaseMap.set(item, amount);
            }
        }
    }
    return displayCaseMap;
}
/**
 * Retrieves the player's current inventory state.
 */
function getInventoryStateMaps() {
    return {
        closet: toItemMap(kolmafia.getCloset()),
        displayCase: getDisplayCaseMap(),
        inventory: toItemMap(kolmafia.getInventory()),
        storage: toItemMap(kolmafia.getStorage()),
    };
}
/**
 * Retrieves the player's current inventory state.
 */
function getInventoryState() {
    return {
        closet: itemMapToIdMapping(toItemMap(kolmafia.getCloset())),
        displayCase: itemMapToIdMapping(getDisplayCaseMap()),
        inventory: itemMapToIdMapping(toItemMap(kolmafia.getInventory())),
        storage: itemMapToIdMapping(toItemMap(kolmafia.getStorage())),
    };
}
/**
 * Retrieves the player's current inventory state, as well as a set of all
 * items in inventory/closet/display case/storage.
 * (the latter is a performance optimization).
 * @return `Tuple of [InventoryState, InventoryStateMap]`.
 *    `itemsSeen` is a `Set<Item>` containing all items in `InventoryState`
 */
function getInventoryStateWithMaps() {
    const inventoryStateMap = getInventoryStateMaps();
    return [
        {
            closet: itemMapToIdMapping(inventoryStateMap.closet),
            displayCase: itemMapToIdMapping(inventoryStateMap.displayCase),
            inventory: itemMapToIdMapping(inventoryStateMap.inventory),
            storage: itemMapToIdMapping(inventoryStateMap.storage),
        },
        inventoryStateMap,
    ];
}

/**
 * @file Tools for managing `ItemInfo` objects.
 */
const BREAKABLE_ITEMS = Item.get([
    'BRICKO hat',
    'BRICKO sword',
    'BRICKO pants',
]);
function isBreakable(item) {
    return BREAKABLE_ITEMS.includes(item);
}
/** Cache used by `isCraftable()` */
const CRAFTABLES = new Set();
/**
 * Checks if the given item can be crafted into another item.
 * @param item Item to check
 * @return Whether `item` is an ingredient
 */
function isCraftable(item) {
    if (CRAFTABLES.size === 0) {
        // Populate the cache on first call
        const rawCrafty = kolmafia.fileToArray('data/concoctions.txt');
        for (const key of Object.keys(rawCrafty)) {
            const row = rawCrafty[key].split('\t');
            // We assume that concoctions.txt looks like this:
            //
            //    <produced item> <TAB> <crafting method> <TAB> <tab-separated list of ingredients>
            const [, , ...ingredients] = row;
            for (const ingredientName of ingredients) {
                CRAFTABLES.add(kolmafia.toItem(ingredientName));
            }
        }
        for (const item of Item.get([
            'hot nuggets',
            'cold nuggets',
            'spooky nuggets',
            'stench nuggets',
            'sleaze nuggets',
            'titanium assault umbrella',
        ])) {
            CRAFTABLES.add(item);
        }
    }
    return CRAFTABLES.has(item);
}
const USELESS_POWDER = Item.get('useless powder');
const MALUSABLES = new Set(Item.get([
    'twinkly powder',
    'hot powder',
    'cold powder',
    'spooky powder',
    'stench powder',
    'sleaze powder',
    'twinkly nuggets',
    'hot nuggets',
    'cold nuggets',
    'spooky nuggets',
    'stench nuggets',
    'sleaze nuggets',
    'sewer nuggets',
    'floaty sand',
    'floaty pebbles',
    'floaty gravel',
]));
function isPulverizable(item) {
    const pulvy = toItemMap(kolmafia.getRelated(item, 'pulverize'));
    return !pulvy.has(USELESS_POWDER) && (pulvy.size > 0 || MALUSABLES.has(item));
}
/**
 * Converts a native `Item` to an `ItemInfo` object.
 */
function toItemInfo(item) {
    return {
        canAutosell: item.discardable && kolmafia.autosellPrice(item) > 0,
        canBreak: isBreakable(item),
        canCloset: kolmafia.isDisplayable(item),
        canDiscard: item.discardable,
        canDisplay: kolmafia.isDisplayable(item),
        canGift: kolmafia.isGiftable(item),
        canMake: isCraftable(item),
        canMall: item.tradeable,
        canPulverize: isPulverizable(item),
        canStash: kolmafia.isGiftable(item),
        canUntinker: kolmafia.craftType(item) === 'Meatpasting',
        canUse: item.usable || item.multi,
        descid: item.descid,
        id: kolmafia.toInt(item),
        image: item.image,
        isMallPriceAtMinimum: kolmafia.historicalPrice(item) <= Math.max(kolmafia.autosellPrice(item) * 2, 100),
        isTradable: item.tradeable,
        mallPrice: kolmafia.historicalPrice(item) || null,
        name: item.name,
    };
}

/**
 * @file Tools for managing `StockingRuleset` objects.
 */
/**
 * Loads the stocking ruleset from the stocking ruleset file of the current
 * player.
 * @return Map of each item to its stocking rule. If the user's stocking ruleset
 *    file is empty or missing, returns `null`.
 */
function loadStockingRulesetForCurrentPlayer() {
    return loadStockingRulesetFile(getFullStockFileName(zlib_ash.getvar(CONFIG_NAMES.stockFileName)));
}

var _marked = /*#__PURE__*/_regeneratorRuntime().mark(lexer),
  _marked2 = /*#__PURE__*/_regeneratorRuntime().mark(flatten);
/*! Path-to-RegExp | MIT License | https://github.com/pillarjs/path-to-regexp */ // @ts-nocheck
var DEFAULT_DELIMITER = "/";
var NOOP_VALUE = value => value;
var ID_START = /^(?:[\$A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CD\uA7D0\uA7D1\uA7D3\uA7D5-\uA7DC\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDDC0-\uDDF3\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDD4A-\uDD65\uDD6F-\uDD85\uDE80-\uDEA9\uDEB0\uDEB1\uDEC2-\uDEC4\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61\uDF80-\uDF89\uDF8B\uDF8E\uDF90-\uDFB5\uDFB7\uDFD1\uDFD3]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8\uDFC0-\uDFE0]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD80E\uD80F\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46\uDC60-\uDFFF]|\uD810[\uDC00-\uDFFA]|\uD811[\uDC00-\uDE46]|\uD818[\uDD00-\uDD1D]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDD40-\uDD6C\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDCFF-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDDD0-\uDDED\uDDF0\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])$/;
var ID_CONTINUE = /^(?:[\$0-9A-Z_a-z\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05EF-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u07FD\u0800-\u082D\u0840-\u085B\u0860-\u086A\u0870-\u0887\u0889-\u088E\u0897-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u09FE\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B55-\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3C-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C5D\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDD\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1-\u0CF3\u0D00-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D81-\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECE\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1715\u171F-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u180F-\u1819\u1820-\u1878\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1ABF-\u1ACE\u1B00-\u1B4C\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CBF\u1CD0-\u1CD2\u1CD4-\u1CFA\u1D00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CD\uA7D0\uA7D1\uA7D3\uA7D5-\uA7DC\uA7F2-\uA827\uA82C\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF65-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDDC0-\uDDF3\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD27\uDD30-\uDD39\uDD40-\uDD65\uDD69-\uDD6D\uDD6F-\uDD85\uDE80-\uDEA9\uDEAB\uDEAC\uDEB0\uDEB1\uDEC2-\uDEC4\uDEFC-\uDF1C\uDF27\uDF30-\uDF50\uDF70-\uDF85\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC00-\uDC46\uDC66-\uDC75\uDC7F-\uDCBA\uDCC2\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD44-\uDD47\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDC9-\uDDCC\uDDCE-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E-\uDE41\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3B-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74\uDF80-\uDF89\uDF8B\uDF8E\uDF90-\uDFB5\uDFB7-\uDFC0\uDFC2\uDFC5\uDFC7-\uDFCA\uDFCC-\uDFD3\uDFE1\uDFE2]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC5E-\uDC61\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB8\uDEC0-\uDEC9\uDED0-\uDEE3\uDF00-\uDF1A\uDF1D-\uDF2B\uDF30-\uDF39\uDF40-\uDF46]|\uD806[\uDC00-\uDC3A\uDCA0-\uDCE9\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD35\uDD37\uDD38\uDD3B-\uDD43\uDD50-\uDD59\uDDA0-\uDDA7\uDDAA-\uDDD7\uDDDA-\uDDE1\uDDE3\uDDE4\uDE00-\uDE3E\uDE47\uDE50-\uDE99\uDE9D\uDEB0-\uDEF8\uDFC0-\uDFE0\uDFF0-\uDFF9]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD8E\uDD90\uDD91\uDD93-\uDD98\uDDA0-\uDDA9\uDEE0-\uDEF6\uDF00-\uDF10\uDF12-\uDF3A\uDF3E-\uDF42\uDF50-\uDF5A\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD80E\uD80F\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC40-\uDC55\uDC60-\uDFFF]|\uD810[\uDC00-\uDFFA]|\uD811[\uDC00-\uDE46]|\uD818[\uDD00-\uDD39]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDE70-\uDEBE\uDEC0-\uDEC9\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDD40-\uDD6C\uDD70-\uDD79\uDE40-\uDE7F\uDF00-\uDF4A\uDF4F-\uDF87\uDF8F-\uDF9F\uDFE0\uDFE1\uDFE3\uDFE4\uDFF0\uDFF1]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDCFF-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD833[\uDCF0-\uDCF9\uDF00-\uDF2D\uDF30-\uDF46]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A\uDC30-\uDC6D\uDC8F\uDD00-\uDD2C\uDD30-\uDD3D\uDD40-\uDD49\uDD4E\uDE90-\uDEAE\uDEC0-\uDEF9]|\uD839[\uDCD0-\uDCF9\uDDD0-\uDDFA\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4B\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD83E[\uDFF0-\uDFF9]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF]|\uDB40[\uDD00-\uDDEF])$/;
var DEBUG_URL = "https://git.new/pathToRegexpError";
var SIMPLE_TOKENS = {
  // Groups.
  "{": "{",
  "}": "}",
  // Reserved.
  "(": "(",
  ")": ")",
  "[": "[",
  "]": "]",
  "+": "+",
  "?": "?",
  "!": "!"
};
/**
 * Escape a regular expression string.
 */
function escape(str) {
  return str.replace(/[.+*?^${}()[\]|/\\]/g, "\\$&");
}
/**
 * Tokenize input string.
 */
function lexer(str) {
  var chars, i, name, value, type, _value, _value2;
  return _regeneratorRuntime().wrap(function lexer$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        name = function _name() {
          var value = "";
          if (ID_START.test(chars[++i])) {
            value += chars[i];
            while (ID_CONTINUE.test(chars[++i])) {
              value += chars[i];
            }
          } else if (chars[i] === '"') {
            var pos = i;
            while (i < chars.length) {
              if (chars[++i] === '"') {
                i++;
                pos = 0;
                break;
              }
              if (chars[i] === "\\") {
                value += chars[++i];
              } else {
                value += chars[i];
              }
            }
            if (pos) {
              throw new TypeError("Unterminated quote at ".concat(pos, ": ").concat(DEBUG_URL));
            }
          }
          if (!value) {
            throw new TypeError("Missing parameter name at ".concat(i, ": ").concat(DEBUG_URL));
          }
          return value;
        };
        chars = _toConsumableArray(str);
        i = 0;
      case 3:
        if (!(i < chars.length)) {
          _context.next = 32;
          break;
        }
        value = chars[i];
        type = SIMPLE_TOKENS[value];
        if (!type) {
          _context.next = 11;
          break;
        }
        _context.next = 9;
        return {
          type: type,
          index: i++,
          value: value
        };
      case 9:
        _context.next = 30;
        break;
      case 11:
        if (!(value === "\\")) {
          _context.next = 16;
          break;
        }
        _context.next = 14;
        return {
          type: "ESCAPED",
          index: i++,
          value: chars[i++]
        };
      case 14:
        _context.next = 30;
        break;
      case 16:
        if (!(value === ":")) {
          _context.next = 22;
          break;
        }
        _value = name();
        _context.next = 20;
        return {
          type: "PARAM",
          index: i,
          value: _value
        };
      case 20:
        _context.next = 30;
        break;
      case 22:
        if (!(value === "*")) {
          _context.next = 28;
          break;
        }
        _value2 = name();
        _context.next = 26;
        return {
          type: "WILDCARD",
          index: i,
          value: _value2
        };
      case 26:
        _context.next = 30;
        break;
      case 28:
        _context.next = 30;
        return {
          type: "CHAR",
          index: i,
          value: chars[i++]
        };
      case 30:
        _context.next = 3;
        break;
      case 32:
        return _context.abrupt("return", {
          type: "END",
          index: i,
          value: ""
        });
      case 33:
      case "end":
        return _context.stop();
    }
  }, _marked);
}
var Iter = /*#__PURE__*/function () {
  function Iter(tokens) {
    _classCallCheck(this, Iter);
    this.tokens = tokens;
  }
  return _createClass(Iter, [{
    key: "peek",
    value: function peek() {
      if (!this._peek) {
        var next = this.tokens.next();
        this._peek = next.value;
      }
      return this._peek;
    }
  }, {
    key: "tryConsume",
    value: function tryConsume(type) {
      var token = this.peek();
      if (token.type !== type) return;
      this._peek = undefined; // Reset after consumed.
      return token.value;
    }
  }, {
    key: "consume",
    value: function consume(type) {
      var value = this.tryConsume(type);
      if (value !== undefined) return value;
      var _this$peek = this.peek(),
        nextType = _this$peek.type,
        index = _this$peek.index;
      throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type, ": ").concat(DEBUG_URL));
    }
  }, {
    key: "text",
    value: function text() {
      var result = "";
      var value;
      while (value = this.tryConsume("CHAR") || this.tryConsume("ESCAPED")) {
        result += value;
      }
      return result;
    }
  }]);
}();
/**
 * Tokenized path instance.
 */
var TokenData = /*#__PURE__*/_createClass(function TokenData(tokens) {
  _classCallCheck(this, TokenData);
  this.tokens = tokens;
});
/**
 * Parse a string for the raw tokens.
 */
function parse(str) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$encodePath = options.encodePath,
    encodePath = _options$encodePath === void 0 ? NOOP_VALUE : _options$encodePath;
  var it = new Iter(lexer(str));
  function consume(endType) {
    var tokens = [];
    while (true) {
      var path = it.text();
      if (path) tokens.push({
        type: "text",
        value: encodePath(path)
      });
      var param = it.tryConsume("PARAM");
      if (param) {
        tokens.push({
          type: "param",
          name: param
        });
        continue;
      }
      var wildcard = it.tryConsume("WILDCARD");
      if (wildcard) {
        tokens.push({
          type: "wildcard",
          name: wildcard
        });
        continue;
      }
      var open = it.tryConsume("{");
      if (open) {
        tokens.push({
          type: "group",
          tokens: consume("}")
        });
        continue;
      }
      it.consume(endType);
      return tokens;
    }
  }
  var tokens = consume("END");
  return new TokenData(tokens);
}
/**
 * Transform a path into a match function.
 */
function match(path) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$decode = options.decode,
    decode = _options$decode === void 0 ? decodeURIComponent : _options$decode,
    _options$delimiter2 = options.delimiter,
    delimiter = _options$delimiter2 === void 0 ? DEFAULT_DELIMITER : _options$delimiter2;
  var _pathToRegexp = pathToRegexp(path, options),
    regexp = _pathToRegexp.regexp,
    keys = _pathToRegexp.keys;
  var decoders = keys.map(key => {
    if (decode === false) return NOOP_VALUE;
    if (key.type === "param") return decode;
    return value => value.split(delimiter).map(decode);
  });
  return function match(input) {
    var m = regexp.exec(input);
    if (!m) return false;
    var path = m[0];
    var params = Object.create(null);
    for (var _i = 1; _i < m.length; _i++) {
      if (m[_i] === undefined) continue;
      var key = keys[_i - 1];
      var decoder = decoders[_i - 1];
      params[key.name] = decoder(m[_i]);
    }
    return {
      path: path,
      params: params
    };
  };
}
function pathToRegexp(path) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$delimiter3 = options.delimiter,
    delimiter = _options$delimiter3 === void 0 ? DEFAULT_DELIMITER : _options$delimiter3,
    _options$end = options.end,
    end = _options$end === void 0 ? true : _options$end,
    _options$sensitive = options.sensitive,
    sensitive = _options$sensitive === void 0 ? false : _options$sensitive,
    _options$trailing = options.trailing,
    trailing = _options$trailing === void 0 ? true : _options$trailing;
  var keys = [];
  var sources = [];
  var flags = sensitive ? "" : "i";
  var paths = Array.isArray(path) ? path : [path];
  var items = paths.map(path => path instanceof TokenData ? path : parse(path, options));
  var _iterator2 = _createForOfIteratorHelper(items),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var tokens = _step2.value.tokens;
      var _iterator3 = _createForOfIteratorHelper(flatten(tokens, 0, [])),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var seq = _step3.value;
          var _regexp = sequenceToRegExp(seq, delimiter, keys);
          sources.push(_regexp);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  var pattern = "^(?:".concat(sources.join("|"), ")");
  if (trailing) pattern += "(?:".concat(escape(delimiter), "$)?");
  pattern += end ? "$" : "(?=".concat(escape(delimiter), "|$)");
  var regexp = new RegExp(pattern, flags);
  return {
    regexp: regexp,
    keys: keys
  };
}
/**
 * Generate a flat list of sequence tokens from the given tokens.
 */
function flatten(tokens, index, init) {
  var token, fork, _iterator4, _step4, seq;
  return _regeneratorRuntime().wrap(function flatten$(_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        if (!(index === tokens.length)) {
          _context2.next = 4;
          break;
        }
        _context2.next = 3;
        return init;
      case 3:
        return _context2.abrupt("return", _context2.sent);
      case 4:
        token = tokens[index];
        if (!(token.type === "group")) {
          _context2.next = 25;
          break;
        }
        fork = init.slice();
        _iterator4 = _createForOfIteratorHelper(flatten(token.tokens, 0, fork));
        _context2.prev = 8;
        _iterator4.s();
      case 10:
        if ((_step4 = _iterator4.n()).done) {
          _context2.next = 15;
          break;
        }
        seq = _step4.value;
        return _context2.delegateYield(flatten(tokens, index + 1, seq), "t0", 13);
      case 13:
        _context2.next = 10;
        break;
      case 15:
        _context2.next = 20;
        break;
      case 17:
        _context2.prev = 17;
        _context2.t1 = _context2["catch"](8);
        _iterator4.e(_context2.t1);
      case 20:
        _context2.prev = 20;
        _iterator4.f();
        return _context2.finish(20);
      case 23:
        _context2.next = 26;
        break;
      case 25:
        init.push(token);
      case 26:
        return _context2.delegateYield(flatten(tokens, index + 1, init), "t2", 27);
      case 27:
      case "end":
        return _context2.stop();
    }
  }, _marked2, null, [[8, 17, 20, 23]]);
}
/**
 * Transform a flat sequence of tokens into a regular expression.
 */
function sequenceToRegExp(tokens, delimiter, keys) {
  var result = "";
  var backtrack = "";
  var isSafeSegmentParam = true;
  for (var _i2 = 0; _i2 < tokens.length; _i2++) {
    var token = tokens[_i2];
    if (token.type === "text") {
      result += escape(token.value);
      backtrack += token.value;
      isSafeSegmentParam || (isSafeSegmentParam = token.value.includes(delimiter));
      continue;
    }
    if (token.type === "param" || token.type === "wildcard") {
      if (!isSafeSegmentParam && !backtrack) {
        throw new TypeError("Missing text after \"".concat(token.name, "\": ").concat(DEBUG_URL));
      }
      if (token.type === "param") {
        result += "(".concat(negate(delimiter, isSafeSegmentParam ? "" : backtrack), "+)");
      } else {
        result += "([\\s\\S]+)";
      }
      keys.push(token);
      backtrack = "";
      isSafeSegmentParam = false;
      continue;
    }
  }
  return result;
}
function negate(delimiter, backtrack) {
  if (backtrack.length < 2) {
    if (delimiter.length < 2) return "[^".concat(escape(delimiter + backtrack), "]");
    return "(?:(?!".concat(escape(delimiter), ")[^").concat(escape(backtrack), "])");
  }
  if (delimiter.length < 2) {
    return "(?:(?!".concat(escape(backtrack), ")[^").concat(escape(delimiter), "])");
  }
  return "(?:(?!".concat(escape(backtrack), "|").concat(escape(delimiter), ")[\\s\\S])");
}

function decode(val) {
  try {
    return decodeURIComponent(val);
  } catch (_unused) {
    return val;
  }
}
function matchRoute(route, baseUrl, options, pathname, parentParams) {
  var matchResult;
  var childMatches;
  var childIndex = 0;
  return {
    next: function next(routeToSkip) {
      if (route === routeToSkip) {
        return {
          done: true,
          value: false
        };
      }
      if (!matchResult) {
        var rt = route;
        var end = !rt.children;
        if (!rt.match) {
          rt.match = match(rt.path || '', _objectSpread2({
            end: end
          }, options));
        }
        matchResult = rt.match(pathname);
        if (matchResult) {
          var _matchResult = matchResult,
            path = _matchResult.path;
          matchResult.path = !end && path.charAt(path.length - 1) === '/' ? path.substr(1) : path;
          matchResult.params = _objectSpread2(_objectSpread2({}, parentParams), matchResult.params);
          return {
            done: false,
            value: {
              route: route,
              baseUrl: baseUrl,
              path: matchResult.path,
              params: matchResult.params
            }
          };
        }
      }
      if (matchResult && route.children) {
        while (childIndex < route.children.length) {
          if (!childMatches) {
            var childRoute = route.children[childIndex];
            childRoute.parent = route;
            childMatches = matchRoute(childRoute, baseUrl + matchResult.path, options, pathname.substr(matchResult.path.length), matchResult.params);
          }
          var childMatch = childMatches.next(routeToSkip);
          if (!childMatch.done) {
            return {
              done: false,
              value: childMatch.value
            };
          }
          childMatches = null;
          childIndex++;
        }
      }
      return {
        done: true,
        value: false
      };
    }
  };
}
function resolveRoute(context, params) {
  if (typeof context.route.action === 'function') {
    return context.route.action(context, params);
  }
  return undefined;
}
function isChildRoute(parentRoute, childRoute) {
  var route = childRoute;
  while (route) {
    route = route.parent;
    if (route === parentRoute) {
      return true;
    }
  }
  return false;
}
var UniversalRouterSync = /*#__PURE__*/function () {
  function UniversalRouterSync(routes, options) {
    _classCallCheck(this, UniversalRouterSync);
    if (!routes || _typeof(routes) !== 'object') {
      throw new TypeError('Invalid routes');
    }
    this.options = _objectSpread2({
      decode: decode
    }, options);
    this.baseUrl = this.options.baseUrl || '';
    this.root = Array.isArray(routes) ? {
      path: '',
      children: routes,
      parent: null
    } : routes;
    this.root.parent = null;
  }
  /**
   * Traverses the list of routes in the order they are defined until it finds
   * the first route that matches provided URL path string and whose action function
   * returns anything other than `null` or `undefined`.
   */
  return _createClass(UniversalRouterSync, [{
    key: "resolve",
    value: function resolve(pathnameOrContext) {
      var context = _objectSpread2(_objectSpread2({
        router: this
      }, this.options.context), typeof pathnameOrContext === 'string' ? {
        pathname: pathnameOrContext
      } : pathnameOrContext);
      var matchResult = matchRoute(this.root, this.baseUrl, this.options, context.pathname.substr(this.baseUrl.length));
      var resolve = this.options.resolveRoute || resolveRoute;
      var matches;
      var nextMatches;
      var currentContext = context;
      function next(resume) {
        var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !matches.done && matches.value.route;
        var prevResult = arguments.length > 2 ? arguments[2] : undefined;
        var routeToSkip = prevResult === null && !matches.done && matches.value.route;
        matches = nextMatches || matchResult.next(routeToSkip);
        nextMatches = null;
        if (!resume) {
          if (matches.done || !isChildRoute(parent, matches.value.route)) {
            nextMatches = matches;
            return null;
          }
        }
        if (matches.done) {
          var error = new Error('Route not found');
          error.status = 404;
          throw error;
        }
        currentContext = _objectSpread2(_objectSpread2({}, context), matches.value);
        var result = resolve(currentContext, matches.value.params);
        if (result !== null && result !== undefined) {
          return result;
        }
        return next(resume, parent, result);
      }
      context['next'] = next;
      try {
        return next(true, this.root);
      } catch (error) {
        if (this.options.errorHandler) {
          return this.options.errorHandler(error, currentContext);
        }
        throw error;
      }
    }
  }]);
}();

/**
 * Utility function for validating a context object that universal-router passes
 * to each route handler.
 */
function isValidContext(context) {
    return (typeof context === "object" && context !== null && "content" in context);
}
/**
 * Creates a route for typed-router in a declarative, type-safe manner.
 */
function createRoute(path, handlers) {
    return {
        path,
        action(context) {
            if (!isValidContext(context)) {
                throw new Error("Invalid context");
            }
            const method = context.content.method;
            if (Object.prototype.hasOwnProperty.call(handlers, method)) {
                const handler = handlers[method];
                return handler(context.content);
            }
            else {
                return {
                    error: {
                        code: 405,
                        message: "Method not allowed",
                        content: JSON.stringify(context.content)
                    }
                };
            }
        }
    };
}
/**
 * Factory function for typed-router, accepting explicit parameters.
 */
function createRouter(routes, options) {
    return new UniversalRouterSync(routes, {
        errorHandler(error) {
            return { error: { code: error.status || 500, message: error.message } };
        },
        ...options
    });
}

/**
 * @file Routes for the app
 */
const routes = [
    createRoute(CLEANUP_TABLES_CATEGORIZED_ROUTE, {
        get() {
            const cleanupRulesMap = loadCleanupRulesetForCurrentPlayer();
            if (!cleanupRulesMap || cleanupRulesMap.size === 0) {
                throw new Error('All item information is corrupted or missing. Either you have not yet saved any item data or you lost it.');
            }
            const [inventory, inventoryMaps] = getInventoryStateWithMaps();
            const categorizedItems = new Set(cleanupRulesMap.keys());
            for (const key of Object.keys(inventoryMaps)) {
                const itemMap = inventoryMaps[key];
                for (const item of itemMap.keys()) {
                    categorizedItems.add(item);
                }
            }
            return {
                result: {
                    cleanupRules: itemMapToIdMapping(cleanupRulesMap),
                    inventory,
                    items: Array.from(categorizedItems, item => toItemInfo(item)),
                },
            };
        },
    }),
    createRoute(CLEANUP_TABLES_UNCATEGORIZED_ROUTE, {
        get: () => {
            const cleanupRulesMap = loadCleanupRulesetForCurrentPlayer() || new Map();
            const [inventory, inventoryMaps] = getInventoryStateWithMaps();
            const uncategorizedItems = new Set();
            for (const key of Object.keys(inventoryMaps)) {
                const itemMap = inventoryMaps[key];
                for (const item of itemMap.keys()) {
                    if (!cleanupRulesMap.has(item) && isCleanable(item)) {
                        uncategorizedItems.add(item);
                    }
                }
            }
            return {
                result: {
                    cleanupRules: itemMapToIdMapping(cleanupRulesMap),
                    inventory,
                    items: Array.from(uncategorizedItems, item => toItemInfo(item)),
                },
            };
        },
    }),
    createRoute(RULESET_ROUTE, {
        post(params) {
            const cleanupRulesMap = idMappingToItemMap(params.cleanupRules);
            const success = saveCleanupRulesetForCurrentPlayer(cleanupRulesMap);
            return success
                ? { result: { success } }
                : { error: { code: 500, message: 'Cannot save cleanup ruleset' } };
        },
    }),
    createRoute(CONFIG_ROUTE, {
        get: () => ({ result: loadCleanupConfig() }),
        post(request) {
            const config = request.config;
            if (request.shouldCopyDataFiles) {
                if (config.dataFileName !== zlib_ash.getvar(CONFIG_NAMES.dataFileName)) {
                    // "Copy" file even if the original stocking file is missing or empty
                    if (!saveCleanupRulesetFile(getFullDataFileName(config.dataFileName), loadCleanupRulesetForCurrentPlayer() ||
                        new Map())) {
                        throw new Error(`Cannot copy cleanup ruleset from ${CONFIG_NAMES.dataFileName} to ${config.dataFileName}`);
                    }
                }
                if (config.stockFileName !== zlib_ash.getvar(CONFIG_NAMES.stockFileName)) {
                    // "Copy" file even if the original stocking file is missing or empty
                    saveStockingRulesetFile(getFullStockFileName(config.stockFileName), loadStockingRulesetForCurrentPlayer() ||
                        new Map());
                }
            }
            saveCleanupConfig(config);
            return { result: { success: true } };
        },
    }),
    createRoute(INVENTORY_ROUTE, {
        get: () => ({ result: getInventoryState() }),
    }),
    createRoute(STATISTICS_ROUTE, {
        get: () => {
            const cleanupRulesMap = loadCleanupRulesetForCurrentPlayer() || new Map();
            const [, inventoryMaps] = getInventoryStateWithMaps();
            const categorizedItemCounts = {
                AUTO: 0,
                BREAK: 0,
                CLAN: 0,
                CLST: 0,
                DISC: 0,
                DISP: 0,
                GIFT: 0,
                KEEP: 0,
                MAKE: 0,
                MALL: 0,
                PULV: 0,
                TODO: 0,
                UNTN: 0,
                USE: 0,
            };
            for (const rule of cleanupRulesMap.values()) {
                ++categorizedItemCounts[rule.action];
            }
            const uncategorizedItems = new Set();
            for (const key of Object.keys(inventoryMaps)) {
                const itemMap = inventoryMaps[key];
                for (const item of itemMap.keys()) {
                    if (!cleanupRulesMap.has(item) && isCleanable(item)) {
                        uncategorizedItems.add(item);
                    }
                }
            }
            return {
                result: {
                    categorizedItemCounts,
                    uncategorizedItemCount: uncategorizedItems.size,
                },
            };
        },
    }),
];

/**
 * Sends a response to the client. If the value is not a string, it is
 * serialized using `JSON.stringify()`.
 *
 * This is a thin wrapper around `write()`.
 * The generic type argument can be used to type-check the value being passed.
 */
function send(value) {
    // JSON.stringify() can return undefined if the input is undefined.
    // TypeScript currently doesn't check this, so we must do so manually.
    if (value === undefined) {
        throw new TypeError('Cannot send undefined');
    }
    const str = typeof value === 'string' ? value : JSON.stringify(value);
    kolmafia.write(str);
}
/**
 * Parses the URL and form submission parameters in the current request.
 *
 * - The `relay=true` parameter is stripped.
 * - All other parameters are parsed as JSON, except for `path` and `method`.
 * @return Object that contains the deserialized parameters.
 *    If there are no parameters (i.e. the request is from a direct link),
 *    returns `null` instead.
 */
function parseRequestParameters() {
    const { relay, ...rest } = kolmafia.formFields();
    if (relay !== 'true') {
        throw new Error("Missing expected 'relay' parameter. Has KoLmafia's relay script protocol changed?");
    }
    if (Object.keys(rest).length === 0)
        return null;
    return unwrapDeserializedRequest(rest);
}
/**
 * Generate a HTML page that immediately redirects the client to the URL.
 * This is needed because we can't respond with HTTP redirect codes.
 */
function generateRedirectPage(url) {
    return ('<!DOCTYPE html>' +
        '<html>' +
        `<head><meta http-equiv="refresh" content="0;url=${url}"></head>` +
        `<body>If your browser does not redirect you immediately, <a href="${url}">click here</a></body>` +
        '</html>');
}
function main() {
    // TODO: Add require() to kolmafia-types if possible
    // @ts-ignore
    const __filename = require.main.id;
    const safeScriptPath = __filename.replace(/(.*?)(?=\/relay\/)/i, '');
    debug(`Started ${safeScriptPath}...`);
    const startTime = kolmafia.gametimeToInt();
    setDefaultConfig();
    checkProjectUpdates();
    let requestParameters;
    try {
        const router = createRouter(routes);
        requestParameters = parseRequestParameters();
        if (requestParameters === null) {
            // If there are no URL parameters, this is probably a request made by a
            // user navigating to our app.
            // We send the HTML skeleton of the Philter Manager.
            send(generateRedirectPage(RELAY_HTML_PATH));
        }
        else {
            send(router.resolve({
                pathname: requestParameters.path,
                content: requestParameters,
            }));
        }
    }
    catch (e) {
        send({ error: { code: 500, message: String(e) } });
        // Interestingly, KoLmafia will still return a response if the script aborts
        // or throws after calling send(). Unfortunately, the stack trace is all but
        // lost at this point, so there's little point in re-throwing the exception.
        error(`[${safeScriptPath}] ${e instanceof Error ? e : '[ERROR] ' + e}`);
    }
    const endTime = kolmafia.gametimeToInt();
    const clfDate = formatDateClf(new Date());
    const name = kolmafia.myName() || '-';
    let extraComment;
    if (requestParameters) {
        const { method, path } = requestParameters || {};
        extraComment = `simulated method: ${method}, path: ${path}`;
    }
    else {
        extraComment = 'home page requested';
    }
    debug(`${name} [${clfDate}] "${safeScriptPath} HTTP" (${extraComment})`);
    debug(`Took ${endTime - startTime}ms to generate response`);
}

exports.main = main;
