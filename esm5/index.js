import { __assign, __read, __spread, __values } from "tslib";
import { BehaviorSubject } from 'rxjs';
import { MapleColorHelper } from './helpers/color.helper';
import { MAPLE_PROP_EXTENSION_MAP } from './property-extension-map';
import { getMapleUtilityClassMap, getMapleUtilityVariableMap, } from './utility-class-map';
import { MAPLE_VAR_ALERT } from './variables/alert';
import { MAPLE_VAR_BREAKPOINT } from './variables/breakpoint';
import { MAPLE_VAR_BUTTON } from './variables/button';
import { MAPLE_VAR_COLOR } from './variables/color';
import { MAPLE_VAR_FONT_FAMILY } from './variables/font-family';
import { MAPLE_VAR_FONT_SIZE } from './variables/font-size';
import { MAPLE_VAR_FONT_WEIGHT } from './variables/font-weight';
import { MAPLE_VAR_MAX_WIDTH } from './variables/max-width';
import { MAPLE_VAR_SPACER } from './variables/spacer';
import { MAPLE_VAR_TRANSITION } from './variables/transition';
// Define a global CACHE to collect selectors and maps on breakpoint keys
var CACHE = {};
var BREAKPOINT = {
    media: {},
};
var STYLE_ELEMENTS = {};
var STR_EMPTY = '';
var STR_SPACE = ' ';
var STR_DOT = '.';
var STR_UP = 'up';
var STR_DOWN = 'down';
var SEP_MEDIA = '-';
var SEP_SELECTOR = ':';
var SEP_UTIL_KEY = ':';
var SEP_UTIL_VAL = '=';
var SEP_NO_SPACE = '<';
var SEP_OUTER_SPACE = '<<';
var IMPORTANT = '!';
var WILDCARD = '*';
var PREFIX_MAPLE_PROP = '_';
var SUFFIX_MEDIA_UP = SEP_MEDIA + STR_UP;
var SUFFIX_MEDIA_DOWN = SEP_MEDIA + STR_DOWN;
var R_SELECTOR_RESERVED = /(\.|\+|\~|\<|\>|\[|\]|\(|\)|\!|\:|\,|\=|\||\%|\#|\*|\"|\/)/g;
var R_ESCAPE_RESERVED = '\\$1';
var R_SEP_NO_SPACE = /\</g;
var R_SEP_SEL_SPACE = /\>\>/g;
var R_SEP_SEL_SPACE_ALL = /(\<|\>\>)/g;
var R_SEP_VAL_SPACE = /\|/g;
var R_SEP_UTIL_VAL = /=(?:.(?!=))+$/;
var R_SEP_UTIL_KEY = /\:(?:.(?!\:))+$/;
var R_CUSTOM = /\((.*?)\)/;
var R_WILDCARD = /\*/g;
var R_EXTRACT_CLASS = /class\=\"([\s\S]+?)\"/g;
var R_UNIFIY = /\=(?=[^.]*$)/;
var preInitClassList = [];
var isInitialized = false;
var isMapleEnabled = true;
var doc;
var esc = function (selector) {
    return selector.replace(R_SELECTOR_RESERVED, R_ESCAPE_RESERVED);
};
var Maple = /** @class */ (function () {
    function Maple() {
    }
    // Find min and max breakpoints
    Maple.setMinAndMaxBreakpoints = function () {
        var breakpointKeys = Object.keys(Maple.breakpointMap);
        var breakpoints = breakpointKeys
            .map(function (key) { return ({
            key: key,
            size: parseFloat(Maple.breakpointMap[key]),
        }); })
            .sort(function (a, b) { return a.size - b.size; });
        BREAKPOINT.minKey = breakpoints[0].key;
        BREAKPOINT.maxKey = breakpoints[breakpoints.length - 1].key;
        BREAKPOINT.minMedia = BREAKPOINT.minKey + SUFFIX_MEDIA_UP;
        breakpoints.forEach(function (bp, i) {
            var next = breakpoints[i + 1];
            BREAKPOINT.media[bp.key + SUFFIX_MEDIA_UP] = bp.size;
            if (next) {
                // Uses 0.02px rather than 0.01px to work around a current rounding bug in Safari.
                // See https://bugs.webkit.org/show_bug.cgi?id=178261
                BREAKPOINT.media[bp.key + SUFFIX_MEDIA_DOWN] = next.size - 0.02;
            }
        });
    };
    Maple.createDomElements = function (styleElements, prefix, document) {
        if (prefix === void 0) { prefix = 'maple'; }
        // Prepare style element on head
        var docHead = (document || doc).getElementsByTagName('head')[0];
        var breakpoints = Object.keys(BREAKPOINT.media)
            .sort(function (a, b) { return BREAKPOINT.media[a] - BREAKPOINT.media[b]; })
            .sort(function (a, b) { return a.indexOf(SUFFIX_MEDIA_UP); });
        breakpoints
            .slice(breakpoints.indexOf(BREAKPOINT.minMedia), breakpoints.length)
            .concat(breakpoints.slice(0, breakpoints.indexOf(BREAKPOINT.minMedia)))
            .forEach(function (key) {
            styleElements[key] = doc.createElement('style');
            styleElements[key].setAttribute('id', prefix + "-" + key);
            docHead.appendChild(styleElements[key]);
        });
    };
    Maple.extendProperties = function () {
        Maple.utilPrefixList.forEach(function (def) {
            Maple.utilClassMap[def.prefix] = Maple.utilClassMap[def.prefix] || {};
            Maple.utilClassMap[def.prefix][WILDCARD] = {};
            Object.keys(def.map).forEach(function (key) {
                Maple.utilClassMap[def.prefix][key] = {};
                def.props.forEach(function (prop) {
                    var _a;
                    Maple.utilClassMap[def.prefix][WILDCARD] = __assign(__assign({}, Maple.utilClassMap[def.prefix][WILDCARD]), (_a = {}, _a[prop] = WILDCARD, _a));
                    Maple.utilClassMap[def.prefix][key][prop] = def.map[key];
                });
            });
        });
    };
    Maple.getSelectors = function (media, selKey, utilKey, utilVal, _selector, important) {
        if (media === void 0) { media = STR_EMPTY; }
        if (selKey === void 0) { selKey = STR_EMPTY; }
        if (utilKey === void 0) { utilKey = STR_EMPTY; }
        if (utilVal === void 0) { utilVal = STR_EMPTY; }
        if (_selector === void 0) { _selector = STR_EMPTY; }
        if (important === void 0) { important = false; }
        var maple = Maple.utilClassMap[selKey] || {};
        _selector = (maple._selector || '') + _selector;
        var parentSelector = selKey.includes(SEP_OUTER_SPACE)
            ? selKey.split(SEP_OUTER_SPACE).pop().split(R_SEP_SEL_SPACE_ALL).shift()
            : STR_EMPTY;
        var baseSel = [
            media || STR_EMPTY,
            maple._selector ? SEP_SELECTOR : STR_EMPTY,
            selKey,
            utilKey ? SEP_UTIL_KEY : STR_EMPTY,
            utilKey,
            utilVal ? SEP_UTIL_VAL : STR_EMPTY,
        ].join(STR_EMPTY);
        return _selector
            .split(/,\s*/)
            .map(function (selector) {
            return [
                parentSelector ? parentSelector + STR_SPACE : STR_EMPTY,
                utilVal ? STR_DOT : STR_EMPTY,
                utilVal ? esc(baseSel + utilVal) : "[class*=\"" + baseSel + "\"]",
                utilVal && important ? esc(IMPORTANT) : STR_EMPTY,
                maple._selector || !selKey || selKey.charAt(0) === SEP_NO_SPACE
                    ? STR_EMPTY
                    : STR_SPACE,
                maple._selector
                    ? STR_EMPTY
                    : selKey
                        .replace(SEP_OUTER_SPACE + parentSelector, STR_EMPTY)
                        .replace(R_SEP_SEL_SPACE, STR_SPACE)
                        .replace(R_SEP_NO_SPACE, STR_EMPTY),
                selector.trim().charAt(0) === SEP_NO_SPACE ? STR_EMPTY : STR_SPACE,
                selector
                    .trim()
                    .replace(R_SEP_SEL_SPACE, STR_SPACE)
                    .replace(R_SEP_NO_SPACE, STR_EMPTY),
            ].join(STR_EMPTY);
        })
            .join(',');
    };
    Maple.cache = function (media, selector, mapToBeCached) {
        var _a;
        if (!mapToBeCached) {
            throw new Error("Property map not found for selector: " + selector);
        }
        var cacheKey = "" + media + selector + JSON.stringify(mapToBeCached);
        if (!CACHE[cacheKey]) {
            Maple.tempCache[media] = Maple.tempCache[media] || {};
            Maple.tempCache[media] = __assign(__assign({}, Maple.tempCache[media]), (_a = {}, _a[selector] = __assign(__assign({}, (Maple.tempCache[media][selector] || {})), mapToBeCached), _a));
            CACHE[cacheKey] = 1;
        }
    };
    Maple.styles = function (media) {
        var e_1, _a, e_2, _b;
        var cacheItem = Maple.tempCache[media];
        if (!cacheItem) {
            return STR_EMPTY;
        }
        var selectors = Object.keys(cacheItem);
        if (selectors.length === 0) {
            return STR_EMPTY;
        }
        var breakpointParts = media.split(SEP_MEDIA);
        var breakpointDir = breakpointParts[1];
        var mediaQuery = breakpointDir === STR_UP ? 'min-width' : 'max-width';
        var result = [];
        // open media query
        if (media !== BREAKPOINT.minMedia) {
            result.push("@media (" + mediaQuery + ": " + BREAKPOINT.media[media] + "px) {");
        }
        try {
            for (var selectors_1 = __values(selectors), selectors_1_1 = selectors_1.next(); !selectors_1_1.done; selectors_1_1 = selectors_1.next()) {
                var selector = selectors_1_1.value;
                var propMap = cacheItem[selector];
                if (!propMap) {
                    continue;
                }
                var propMapKeys = Object.keys(propMap).filter(function (p) { return p !== IMPORTANT; });
                if (propMapKeys.length === 0) {
                    continue;
                }
                // open selector
                result.push(selector + "{");
                try {
                    // fill selector with properties
                    for (var propMapKeys_1 = (e_2 = void 0, __values(propMapKeys)), propMapKeys_1_1 = propMapKeys_1.next(); !propMapKeys_1_1.done; propMapKeys_1_1 = propMapKeys_1.next()) {
                        var prop = propMapKeys_1_1.value;
                        var val = propMap[prop].toString();
                        var important = val.indexOf(IMPORTANT) < 0 && propMap[IMPORTANT]
                            ? ' !important'
                            : STR_EMPTY;
                        result.push(Maple.propExtensionMap[prop]
                            ? Maple.propExtensionMap[prop](val, important)
                            : prop + ":" + val + important + ";");
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (propMapKeys_1_1 && !propMapKeys_1_1.done && (_b = propMapKeys_1.return)) _b.call(propMapKeys_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                // close selector
                result.push("}");
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (selectors_1_1 && !selectors_1_1.done && (_a = selectors_1.return)) _a.call(selectors_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        // close media query
        if (media !== BREAKPOINT.minMedia) {
            result.push("}");
        }
        return result.length > 2 ? result.join(STR_EMPTY) : STR_EMPTY;
    };
    Maple.generateWhitelist = function (whitelist) {
        var e_3, _a, e_4, _b, e_5, _c;
        if (whitelist === void 0) { whitelist = []; }
        var classList = [];
        try {
            for (var whitelist_1 = __values(whitelist), whitelist_1_1 = whitelist_1.next(); !whitelist_1_1.done; whitelist_1_1 = whitelist_1.next()) {
                var utilKey = whitelist_1_1.value;
                if (!Maple.utilClassMap[utilKey]) {
                    classList.push(utilKey);
                    continue;
                }
                var props = Object.keys(Maple.utilClassMap[utilKey]);
                try {
                    for (var props_1 = (e_4 = void 0, __values(props)), props_1_1 = props_1.next(); !props_1_1.done; props_1_1 = props_1.next()) {
                        var utilVal = props_1_1.value;
                        if (utilVal.charAt(0) === PREFIX_MAPLE_PROP) {
                            continue;
                        }
                        var breakpoints = Object.keys(Maple.breakpointMap);
                        try {
                            for (var breakpoints_1 = (e_5 = void 0, __values(breakpoints)), breakpoints_1_1 = breakpoints_1.next(); !breakpoints_1_1.done; breakpoints_1_1 = breakpoints_1.next()) {
                                var bp = breakpoints_1_1.value;
                                var mediaUp = bp + SUFFIX_MEDIA_UP;
                                var mediaDown = bp + SUFFIX_MEDIA_DOWN;
                                var utilClass = SEP_UTIL_KEY + utilKey + SEP_UTIL_VAL + utilVal;
                                if (mediaUp in BREAKPOINT.media) {
                                    classList.push(mediaUp + utilClass);
                                }
                                if (mediaDown in BREAKPOINT.media) {
                                    classList.push(mediaDown + utilClass);
                                }
                            }
                        }
                        catch (e_5_1) { e_5 = { error: e_5_1 }; }
                        finally {
                            try {
                                if (breakpoints_1_1 && !breakpoints_1_1.done && (_c = breakpoints_1.return)) _c.call(breakpoints_1);
                            }
                            finally { if (e_5) throw e_5.error; }
                        }
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (props_1_1 && !props_1_1.done && (_b = props_1.return)) _b.call(props_1);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (whitelist_1_1 && !whitelist_1_1.done && (_a = whitelist_1.return)) _a.call(whitelist_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        Maple.fly(preInitClassList.concat(classList));
    };
    Maple.splitLastOccurrence = function (str, key) {
        var pos = str.lastIndexOf(key);
        var result = [];
        var firstPart = str.substring(0, pos);
        var lastPart = str.substring(pos + key.length);
        if (firstPart) {
            result.push(firstPart);
        }
        if (lastPart) {
            result.push(lastPart);
        }
        return result;
    };
    Maple.splitFirstOccurrence = function (str, key) {
        var pos = str.indexOf(key);
        var result = [];
        var firstPart = str.substring(0, pos);
        var lastPart = str.substring(pos + key.length);
        if (firstPart) {
            result.push(firstPart);
        }
        if (lastPart) {
            result.push(lastPart);
        }
        return result;
    };
    Maple.init = function (document, enabled, utilClassMap, whitelist, variables, utilPrefixList, propExtensionMap) {
        if (utilClassMap === void 0) { utilClassMap = {}; }
        if (variables === void 0) { variables = Maple.variables; }
        if (utilPrefixList === void 0) { utilPrefixList = []; }
        if (propExtensionMap === void 0) { propExtensionMap = {}; }
        isMapleEnabled = enabled;
        if (isMapleEnabled === false) {
            return;
        }
        doc = document;
        if (isInitialized === false) {
            isInitialized = true;
            Maple.variables = __assign(__assign({}, Maple.variables), variables);
            MapleColorHelper.generateAlphaColors(Maple.variables.color);
            Maple.utilClassMap = __assign(__assign({}, getMapleUtilityClassMap(Maple.variables)), utilClassMap);
            Maple.utilPrefixList = __spread(getMapleUtilityVariableMap(Maple.variables), utilPrefixList);
            Maple.propExtensionMap = __assign(__assign({}, MAPLE_PROP_EXTENSION_MAP), propExtensionMap);
            Maple.breakpointMap = __assign({}, Maple.variables.breakpoint);
            Maple.setMinAndMaxBreakpoints();
            Maple.createDomElements(STYLE_ELEMENTS);
            Maple.extendProperties();
            Maple.generateWhitelist(whitelist);
            this.onInit$.next(true);
        }
    };
    Maple.findAndFly = function (str) {
        if (isMapleEnabled === false) {
            return;
        }
        if (str) {
            Maple.fly((str.match(R_EXTRACT_CLASS) || [])
                .join(' ')
                .replace(/class\=\"/g, '')
                .replace(/"/g, ''));
        }
    };
    Maple.fly = function (classList) {
        var e_6, _a;
        if (isMapleEnabled === false) {
            return;
        }
        if (isInitialized === false) {
            preInitClassList = preInitClassList.concat(classList);
            return;
        }
        if (!classList || classList.length === 0) {
            return;
        }
        var rawCacheKey = Array.isArray(classList)
            ? classList.join(' ')
            : classList;
        if (Maple.rawCache[rawCacheKey]) {
            return;
        }
        Maple.rawCache[rawCacheKey] = 1;
        if (Array.isArray(classList) === false) {
            classList = classList.split(/\s+/g);
        }
        classList = Maple.unifyUtilityClass(classList);
        Maple.tempCache = {};
        var _loop_1 = function (classItem) {
            var _a;
            // Check whether the styles will have !important flag or not
            var important = classItem.charAt(classItem.length - 1) === IMPORTANT;
            var classItemWithoutImportant = classItem.replace(IMPORTANT, STR_EMPTY);
            var parts = Maple.splitLastOccurrence(classItemWithoutImportant, SEP_UTIL_VAL);
            // Extract utility value
            var utilVal = parts.length === 1 ? null : parts.pop();
            // Extract media query
            var media = Object.keys(BREAKPOINT.media).find(function (key) { return classItem.indexOf(key) === 0; }) || BREAKPOINT.minMedia;
            parts = Maple.splitFirstOccurrence(parts.join(STR_EMPTY), media)
                .join(STR_EMPTY)
                .split(SEP_UTIL_KEY)
                .filter(function (p) { return !!p; });
            // Exact utility class
            var utilKey = parts.length >= 1 ? parts.pop() : null;
            // Extract selector
            var selKey = parts.join(SEP_UTIL_KEY);
            // Get style map
            var maple = Maple.utilClassMap[utilKey];
            // Without a style map we can't create styles
            if (!maple) {
                return "continue";
            }
            // Cache default styles with selector
            if (maple._default) {
                Object.keys(maple._default).forEach(function (mediaItem) {
                    Maple.cache(mediaItem, Maple.getSelectors(null, selKey, utilKey, null, maple._selector, important), __assign(__assign({}, maple._common), maple[maple._default[mediaItem]]));
                });
            }
            // Cache utility styles with selector
            if (utilVal) {
                var c = classItem.replace(IMPORTANT, STR_EMPTY);
                var ucm = Maple.utilClassMap;
                //#region Wildcard selectors
                // *:util-key
                // *:util-key=util-val
                // *.selector:util-key=util-val
                // *:selector-key:util-key=util-val
                var wcMedia = c.replace(media, WILDCARD);
                // media:*
                // media.selector:*
                // media:selector-key:*
                var wcutilKey = c.replace(R_SEP_UTIL_KEY, ":" + WILDCARD);
                // media:util-key=*
                // media.selector:util-key=*
                // media:selector-key:util-key=*
                var wcutilVal = c.replace(R_SEP_UTIL_VAL, "=" + WILDCARD);
                // *:*
                // *.selector:*
                // *:selector-key:*
                var wcMediaKey = wcMedia.replace(R_SEP_UTIL_KEY, ":" + WILDCARD);
                // *:util-key=*
                // *.selector:util-key=*
                // *:selector-key:util-key=*
                var wcMediaVal = wcutilVal.replace(media, WILDCARD);
                //#endregion
                var selector = Maple.getSelectors(media, selKey, utilKey, utilVal, maple._selector, important);
                Maple.cache(media, selector, __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({}, maple._common), maple[utilVal]), JSON.parse(JSON.stringify(maple[utilVal.replace(R_CUSTOM, WILDCARD)] || {}).replace(R_WILDCARD, utilKey === 'content'
                    ? utilVal.replace(R_CUSTOM, '$1')
                    : utilVal.replace(R_CUSTOM, '$1').replace(R_SEP_VAL_SPACE, ' ')))), (ucm[wcMediaKey] || {})), (ucm[wcutilKey] || {})), (ucm[wcMediaVal] || {})), (ucm[wcutilVal] || {})), (ucm[wcMedia] || {})), (ucm[c] || {})), (_a = {}, _a[IMPORTANT] = important, _a)));
            }
        };
        try {
            for (var classList_1 = __values(classList), classList_1_1 = classList_1.next(); !classList_1_1.done; classList_1_1 = classList_1.next()) {
                var classItem = classList_1_1.value;
                _loop_1(classItem);
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (classList_1_1 && !classList_1_1.done && (_a = classList_1.return)) _a.call(classList_1);
            }
            finally { if (e_6) throw e_6.error; }
        }
        //#region Generate styles
        // Generate min media query styles
        var minMediaStyles = Maple.styles(BREAKPOINT.minMedia);
        if (minMediaStyles) {
            Maple.appendStyle(STYLE_ELEMENTS, BREAKPOINT.minMedia, minMediaStyles, false);
        }
        // Generate media query styles
        var mediaQueryStyles = {};
        Object.keys(Maple.tempCache).forEach(function (key) {
            if (key !== BREAKPOINT.minMedia) {
                mediaQueryStyles[key] = mediaQueryStyles[key] || '';
                mediaQueryStyles[key] += Maple.styles(key);
            }
        });
        Object.keys(mediaQueryStyles).forEach(function (key) {
            return Maple.appendStyle(STYLE_ELEMENTS, key, mediaQueryStyles[key], false);
        });
        //#endregion
    };
    Maple.unifyUtilityClass = function (classList) {
        var classes = classList.reduce(function (acc, prev) {
            var existingStyleIndex = acc.findIndex(function (p) {
                return ((p || '').split(R_UNIFIY) || [])[0] ===
                    ((prev || '').split(R_UNIFIY) || [])[0];
            });
            if (existingStyleIndex < 0) {
                acc.push(prev);
            }
            else {
                acc[existingStyleIndex] = prev;
            }
            return acc;
        }, []);
        return classes;
    };
    Maple.appendStyle = function (styleElements, bp, style, silent) {
        if (silent === void 0) { silent = true; }
        styleElements[bp].appendChild(doc.createTextNode(style));
        if (!silent) {
            Maple.onStyleAppend$.next({ bp: bp, style: style });
        }
    };
    Maple.isMediaValid = function (media) {
        return media in BREAKPOINT.media;
    };
    Maple.isBreakpointValid = function (breakpoint) {
        return breakpoint in Maple.breakpointMap;
    };
    Maple.isMediaMatchesWithBreakpoint = function (media, breakpoint) {
        if (!Maple.isBreakpointValid(breakpoint) || !Maple.isMediaValid(media)) {
            return false;
        }
        var mediaSize = BREAKPOINT.media[media];
        var breakpointSize = parseFloat(Maple.breakpointMap[breakpoint]);
        if (media.includes(SUFFIX_MEDIA_DOWN)) {
            return breakpointSize <= mediaSize;
        }
        if (media.includes(SUFFIX_MEDIA_UP)) {
            return breakpointSize >= mediaSize;
        }
        return false;
    };
    Maple.getValidMediaMap = function () {
        return __assign({}, BREAKPOINT.media);
    };
    Maple.getMinMedia = function () {
        return BREAKPOINT.minMedia;
    };
    Maple.getMinBreakpoint = function () {
        return BREAKPOINT.minKey;
    };
    Maple.getMappedMediaOrMin = function (media) {
        return Maple.isMediaValid(media) ? media : Maple.getMinMedia();
    };
    Maple.getMappedMediaOrNull = function (media) {
        return Maple.isMediaValid(media) ? media : null;
    };
    Maple.getMappedBreakpointOrMin = function (breakpoint) {
        return Maple.isBreakpointValid(breakpoint)
            ? breakpoint
            : Maple.getMinBreakpoint();
    };
    Maple.getMappedBreakpointOrNull = function (breakpoint) {
        return Maple.isBreakpointValid(breakpoint) ? breakpoint : null;
    };
    Maple.getVariables = function () {
        return __assign({}, Maple.variables);
    };
    Maple.fillInTheGaps = function (breakpointMap) {
        var fullBreakpointMap = Maple.getVariables().breakpoint;
        var keys = Object.keys(fullBreakpointMap);
        var minKey = keys.find(function (key) { return key in breakpointMap; });
        return keys
            .sort(function (a, b) { return fullBreakpointMap[a] - fullBreakpointMap[b]; })
            .reduce(function (acc, key, i) {
            var _a, _b;
            var nextKey = keys[i + 1];
            if (key in acc === false) {
                acc = __assign(__assign({}, acc), (_a = {}, _a[key] = key in breakpointMap ? breakpointMap[key] : breakpointMap[minKey], _a));
            }
            if (nextKey && !breakpointMap[nextKey]) {
                acc = __assign(__assign({}, acc), (_b = {}, _b[nextKey] = acc[key], _b));
            }
            return acc;
        }, {});
    };
    Maple.isBreakpointMap = function (breakpointMap) {
        if (typeof breakpointMap === 'object' && breakpointMap !== null) {
            return Object.keys(Maple.getVariables().breakpoint).some(function (key) { return breakpointMap && key in breakpointMap; });
        }
        return false;
    };
    Maple.variables = {
        breakpoint: MAPLE_VAR_BREAKPOINT,
        color: MAPLE_VAR_COLOR,
        fontFamily: MAPLE_VAR_FONT_FAMILY,
        fontSize: MAPLE_VAR_FONT_SIZE,
        fontWeight: MAPLE_VAR_FONT_WEIGHT,
        maxWidth: MAPLE_VAR_MAX_WIDTH,
        spacer: MAPLE_VAR_SPACER,
        transition: MAPLE_VAR_TRANSITION,
        button: MAPLE_VAR_BUTTON,
        alert: MAPLE_VAR_ALERT,
    };
    Maple.breakpointMap = {};
    Maple.utilClassMap = {};
    Maple.utilPrefixList = [];
    Maple.propExtensionMap = {};
    Maple.rawCache = {};
    Maple.tempCache = {};
    Maple.onStyleAppend$ = new BehaviorSubject(null);
    Maple.onInit$ = new BehaviorSubject(false);
    return Maple;
}());
export { Maple };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXBsZS8iLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRXBFLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsMEJBQTBCLEdBQzNCLE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzlELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUU5RCx5RUFBeUU7QUFDekUsSUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ2pCLElBQU0sVUFBVSxHQUFRO0lBQ3RCLEtBQUssRUFBRSxFQUFFO0NBQ1YsQ0FBQztBQUNGLElBQU0sY0FBYyxHQUFHLEVBQUUsQ0FBQztBQUUxQixJQUFNLFNBQVMsR0FBRyxFQUFFLENBQUM7QUFD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QUEsYUFBYSxJQUFJLEdBQUcsSUFBSSxhQUFhLEVBQXJDLENBQXFDLENBQy9DLENBQUM7U0FDSDtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQWpvQmMsZUFBUyxHQUF1QjtRQUM3QyxVQUFVLEVBQUUsb0JBQW9CO1FBQ2hDLEtBQUssRUFBRSxlQUFlO1FBQ3RCLFVBQVUsRUFBRSxxQkFBcUI7UUFDakMsUUFBUSxFQUFFLG1CQUFtQjtRQUM3QixVQUFVLEVBQUUscUJBQXFCO1FBQ2pDLFFBQVEsRUFBRSxtQkFBbUI7UUFDN0IsTUFBTSxFQUFFLGdCQUFnQjtRQUN4QixVQUFVLEVBQUUsb0JBQW9CO1FBQ2hDLE1BQU0sRUFBRSxnQkFBZ0I7UUFDeEIsS0FBSyxFQUFFLGVBQWU7S0FDdkIsQ0FBQztJQUNhLG1CQUFhLEdBQVEsRUFBRSxDQUFDO0lBQ3hCLGtCQUFZLEdBQVEsRUFBRSxDQUFDO0lBQ3ZCLG9CQUFjLEdBQWUsRUFBRSxDQUFDO0lBQ2hDLHNCQUFnQixHQUFRLEVBQUUsQ0FBQztJQUMzQixjQUFRLEdBQVEsRUFBRSxDQUFDO0lBQ25CLGVBQVMsR0FBUSxFQUFFLENBQUM7SUFDckIsb0JBQWMsR0FBeUIsSUFBSSxlQUFlLENBQ3RFLElBQUksQ0FDTCxDQUFDO0lBQ1ksYUFBTyxHQUE2QixJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQTZtQi9FLFlBQUM7Q0FBQSxBQW5vQkQsSUFtb0JDO1NBbm9CWSxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBNYXBsZUNvbG9ySGVscGVyIH0gZnJvbSAnLi9oZWxwZXJzL2NvbG9yLmhlbHBlcic7XG5pbXBvcnQgeyBNQVBMRV9QUk9QX0VYVEVOU0lPTl9NQVAgfSBmcm9tICcuL3Byb3BlcnR5LWV4dGVuc2lvbi1tYXAnO1xuaW1wb3J0IHsgTWFwbGVWYXJpYWJsZU1vZGVsIH0gZnJvbSAnLi90eXBlcy92YXJpYWJsZXMubW9kZWwnO1xuaW1wb3J0IHtcbiAgZ2V0TWFwbGVVdGlsaXR5Q2xhc3NNYXAsXG4gIGdldE1hcGxlVXRpbGl0eVZhcmlhYmxlTWFwLFxufSBmcm9tICcuL3V0aWxpdHktY2xhc3MtbWFwJztcbmltcG9ydCB7IE1BUExFX1ZBUl9BTEVSVCB9IGZyb20gJy4vdmFyaWFibGVzL2FsZXJ0JztcbmltcG9ydCB7IE1BUExFX1ZBUl9CUkVBS1BPSU5UIH0gZnJvbSAnLi92YXJpYWJsZXMvYnJlYWtwb2ludCc7XG5pbXBvcnQgeyBNQVBMRV9WQVJfQlVUVE9OIH0gZnJvbSAnLi92YXJpYWJsZXMvYnV0dG9uJztcbmltcG9ydCB7IE1BUExFX1ZBUl9DT0xPUiB9IGZyb20gJy4vdmFyaWFibGVzL2NvbG9yJztcbmltcG9ydCB7IE1BUExFX1ZBUl9GT05UX0ZBTUlMWSB9IGZyb20gJy4vdmFyaWFibGVzL2ZvbnQtZmFtaWx5JztcbmltcG9ydCB7IE1BUExFX1ZBUl9GT05UX1NJWkUgfSBmcm9tICcuL3ZhcmlhYmxlcy9mb250LXNpemUnO1xuaW1wb3J0IHsgTUFQTEVfVkFSX0ZPTlRfV0VJR0hUIH0gZnJvbSAnLi92YXJpYWJsZXMvZm9udC13ZWlnaHQnO1xuaW1wb3J0IHsgTUFQTEVfVkFSX01BWF9XSURUSCB9IGZyb20gJy4vdmFyaWFibGVzL21heC13aWR0aCc7XG5pbXBvcnQgeyBNQVBMRV9WQVJfU1BBQ0VSIH0gZnJvbSAnLi92YXJpYWJsZXMvc3BhY2VyJztcbmltcG9ydCB7IE1BUExFX1ZBUl9UUkFOU0lUSU9OIH0gZnJvbSAnLi92YXJpYWJsZXMvdHJhbnNpdGlvbic7XG5cbi8vIERlZmluZSBhIGdsb2JhbCBDQUNIRSB0byBjb2xsZWN0IHNlbGVjdG9ycyBhbmQgbWFwcyBvbiBicmVha3BvaW50IGtleXNcbmNvbnN0IENBQ0hFID0ge307XG5jb25zdCBCUkVBS1BPSU5UOiBhbnkgPSB7XG4gIG1lZGlhOiB7fSxcbn07XG5jb25zdCBTVFlMRV9FTEVNRU5UUyA9IHt9O1xuXG5jb25zdCBTVFJfRU1QVFkgPSAnJztcbmNvbnN0IFNUUl9TUEFDRSA9ICcgJztcbmNvbnN0IFNUUl9ET1QgPSAnLic7XG5jb25zdCBTVFJfVVAgPSAndXAnO1xuY29uc3QgU1RSX0RPV04gPSAnZG93bic7XG5jb25zdCBTRVBfTUVESUEgPSAnLSc7XG5jb25zdCBTRVBfU0VMRUNUT1IgPSAnOic7XG5jb25zdCBTRVBfVVRJTF9LRVkgPSAnOic7XG5jb25zdCBTRVBfVVRJTF9WQUwgPSAnPSc7XG5jb25zdCBTRVBfTk9fU1BBQ0UgPSAnPCc7XG5jb25zdCBTRVBfT1VURVJfU1BBQ0UgPSAnPDwnO1xuY29uc3QgSU1QT1JUQU5UID0gJyEnO1xuY29uc3QgV0lMRENBUkQgPSAnKic7XG5cbmNvbnN0IFBSRUZJWF9NQVBMRV9QUk9QID0gJ18nO1xuY29uc3QgU1VGRklYX01FRElBX1VQID0gU0VQX01FRElBICsgU1RSX1VQO1xuY29uc3QgU1VGRklYX01FRElBX0RPV04gPSBTRVBfTUVESUEgKyBTVFJfRE9XTjtcblxuY29uc3QgUl9TRUxFQ1RPUl9SRVNFUlZFRCA9IC8oXFwufFxcK3xcXH58XFw8fFxcPnxcXFt8XFxdfFxcKHxcXCl8XFwhfFxcOnxcXCx8XFw9fFxcfHxcXCV8XFwjfFxcKnxcXFwifFxcLykvZztcbmNvbnN0IFJfRVNDQVBFX1JFU0VSVkVEID0gJ1xcXFwkMSc7XG5jb25zdCBSX1NFUF9OT19TUEFDRSA9IC9cXDwvZztcbmNvbnN0IFJfU0VQX1NFTF9TUEFDRSA9IC9cXD5cXD4vZztcbmNvbnN0IFJfU0VQX1NFTF9TUEFDRV9BTEwgPSAvKFxcPHxcXD5cXD4pL2c7XG5jb25zdCBSX1NFUF9WQUxfU1BBQ0UgPSAvXFx8L2c7XG5jb25zdCBSX1NFUF9VVElMX1ZBTCA9IC89KD86Lig/IT0pKSskLztcbmNvbnN0IFJfU0VQX1VUSUxfS0VZID0gL1xcOig/Oi4oPyFcXDopKSskLztcbmNvbnN0IFJfQ1VTVE9NID0gL1xcKCguKj8pXFwpLztcbmNvbnN0IFJfV0lMRENBUkQgPSAvXFwqL2c7XG5jb25zdCBSX0VYVFJBQ1RfQ0xBU1MgPSAvY2xhc3NcXD1cXFwiKFtcXHNcXFNdKz8pXFxcIi9nO1xuY29uc3QgUl9VTklGSVkgPSAvXFw9KD89W14uXSokKS87XG5cbmxldCBwcmVJbml0Q2xhc3NMaXN0ID0gW107XG5sZXQgaXNJbml0aWFsaXplZCA9IGZhbHNlO1xubGV0IGlzTWFwbGVFbmFibGVkID0gdHJ1ZTtcbmxldCBkb2M7XG5cbmNvbnN0IGVzYyA9IChzZWxlY3Rvcjogc3RyaW5nKSA9PlxuICBzZWxlY3Rvci5yZXBsYWNlKFJfU0VMRUNUT1JfUkVTRVJWRUQsIFJfRVNDQVBFX1JFU0VSVkVEKTtcblxuZXhwb3J0IGNsYXNzIE1hcGxlIHtcbiAgcHJpdmF0ZSBzdGF0aWMgdmFyaWFibGVzOiBNYXBsZVZhcmlhYmxlTW9kZWwgPSB7XG4gICAgYnJlYWtwb2ludDogTUFQTEVfVkFSX0JSRUFLUE9JTlQsXG4gICAgY29sb3I6IE1BUExFX1ZBUl9DT0xPUixcbiAgICBmb250RmFtaWx5OiBNQVBMRV9WQVJfRk9OVF9GQU1JTFksXG4gICAgZm9udFNpemU6IE1BUExFX1ZBUl9GT05UX1NJWkUsXG4gICAgZm9udFdlaWdodDogTUFQTEVfVkFSX0ZPTlRfV0VJR0hULFxuICAgIG1heFdpZHRoOiBNQVBMRV9WQVJfTUFYX1dJRFRILFxuICAgIHNwYWNlcjogTUFQTEVfVkFSX1NQQUNFUixcbiAgICB0cmFuc2l0aW9uOiBNQVBMRV9WQVJfVFJBTlNJVElPTixcbiAgICBidXR0b246IE1BUExFX1ZBUl9CVVRUT04sXG4gICAgYWxlcnQ6IE1BUExFX1ZBUl9BTEVSVCxcbiAgfTtcbiAgcHJpdmF0ZSBzdGF0aWMgYnJlYWtwb2ludE1hcDogYW55ID0ge307XG4gIHByaXZhdGUgc3RhdGljIHV0aWxDbGFzc01hcDogYW55ID0ge307XG4gIHByaXZhdGUgc3RhdGljIHV0aWxQcmVmaXhMaXN0OiBBcnJheTxhbnk+ID0gW107XG4gIHByaXZhdGUgc3RhdGljIHByb3BFeHRlbnNpb25NYXA6IGFueSA9IHt9O1xuICBwcml2YXRlIHN0YXRpYyByYXdDYWNoZTogYW55ID0ge307XG4gIHByaXZhdGUgc3RhdGljIHRlbXBDYWNoZTogYW55ID0ge307XG4gIHB1YmxpYyBzdGF0aWMgb25TdHlsZUFwcGVuZCQ6IEJlaGF2aW9yU3ViamVjdDxhbnk+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChcbiAgICBudWxsLFxuICApO1xuICBwdWJsaWMgc3RhdGljIG9uSW5pdCQ6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoZmFsc2UpO1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgLy8gRmluZCBtaW4gYW5kIG1heCBicmVha3BvaW50c1xuICBwcml2YXRlIHN0YXRpYyBzZXRNaW5BbmRNYXhCcmVha3BvaW50cygpIHtcbiAgICBjb25zdCBicmVha3BvaW50S2V5czogQXJyYXk8c3RyaW5nPiA9IE9iamVjdC5rZXlzKE1hcGxlLmJyZWFrcG9pbnRNYXApO1xuICAgIGNvbnN0IGJyZWFrcG9pbnRzID0gYnJlYWtwb2ludEtleXNcbiAgICAgIC5tYXAoKGtleSkgPT4gKHtcbiAgICAgICAga2V5LFxuICAgICAgICBzaXplOiBwYXJzZUZsb2F0KE1hcGxlLmJyZWFrcG9pbnRNYXBba2V5XSksXG4gICAgICB9KSlcbiAgICAgIC5zb3J0KChhLCBiKSA9PiBhLnNpemUgLSBiLnNpemUpO1xuXG4gICAgQlJFQUtQT0lOVC5taW5LZXkgPSBicmVha3BvaW50c1swXS5rZXk7XG4gICAgQlJFQUtQT0lOVC5tYXhLZXkgPSBicmVha3BvaW50c1ticmVha3BvaW50cy5sZW5ndGggLSAxXS5rZXk7XG4gICAgQlJFQUtQT0lOVC5taW5NZWRpYSA9IEJSRUFLUE9JTlQubWluS2V5ICsgU1VGRklYX01FRElBX1VQO1xuXG4gICAgYnJlYWtwb2ludHMuZm9yRWFjaCgoYnA6IGFueSwgaTogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBuZXh0ID0gYnJlYWtwb2ludHNbaSArIDFdO1xuICAgICAgQlJFQUtQT0lOVC5tZWRpYVticC5rZXkgKyBTVUZGSVhfTUVESUFfVVBdID0gYnAuc2l6ZTtcbiAgICAgIGlmIChuZXh0KSB7XG4gICAgICAgIC8vIFVzZXMgMC4wMnB4IHJhdGhlciB0aGFuIDAuMDFweCB0byB3b3JrIGFyb3VuZCBhIGN1cnJlbnQgcm91bmRpbmcgYnVnIGluIFNhZmFyaS5cbiAgICAgICAgLy8gU2VlIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xNzgyNjFcbiAgICAgICAgQlJFQUtQT0lOVC5tZWRpYVticC5rZXkgKyBTVUZGSVhfTUVESUFfRE9XTl0gPSBuZXh0LnNpemUgLSAwLjAyO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGVEb21FbGVtZW50cyhcbiAgICBzdHlsZUVsZW1lbnRzOiBhbnksXG4gICAgcHJlZml4ID0gJ21hcGxlJyxcbiAgICBkb2N1bWVudD8sXG4gICkge1xuICAgIC8vIFByZXBhcmUgc3R5bGUgZWxlbWVudCBvbiBoZWFkXG4gICAgY29uc3QgZG9jSGVhZCA9IChkb2N1bWVudCB8fCBkb2MpLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gICAgY29uc3QgYnJlYWtwb2ludHMgPSBPYmplY3Qua2V5cyhCUkVBS1BPSU5ULm1lZGlhKVxuICAgICAgLnNvcnQoKGEsIGIpID0+IEJSRUFLUE9JTlQubWVkaWFbYV0gLSBCUkVBS1BPSU5ULm1lZGlhW2JdKVxuICAgICAgLnNvcnQoKGEsIGIpID0+IGEuaW5kZXhPZihTVUZGSVhfTUVESUFfVVApKTtcblxuICAgIGJyZWFrcG9pbnRzXG4gICAgICAuc2xpY2UoYnJlYWtwb2ludHMuaW5kZXhPZihCUkVBS1BPSU5ULm1pbk1lZGlhKSwgYnJlYWtwb2ludHMubGVuZ3RoKVxuICAgICAgLmNvbmNhdChicmVha3BvaW50cy5zbGljZSgwLCBicmVha3BvaW50cy5pbmRleE9mKEJSRUFLUE9JTlQubWluTWVkaWEpKSlcbiAgICAgIC5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgc3R5bGVFbGVtZW50c1trZXldID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICAgIHN0eWxlRWxlbWVudHNba2V5XS5zZXRBdHRyaWJ1dGUoJ2lkJywgYCR7cHJlZml4fS0ke2tleX1gKTtcbiAgICAgICAgZG9jSGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnRzW2tleV0pO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBleHRlbmRQcm9wZXJ0aWVzKCkge1xuICAgIE1hcGxlLnV0aWxQcmVmaXhMaXN0LmZvckVhY2goKGRlZjogYW55KSA9PiB7XG4gICAgICBNYXBsZS51dGlsQ2xhc3NNYXBbZGVmLnByZWZpeF0gPSBNYXBsZS51dGlsQ2xhc3NNYXBbZGVmLnByZWZpeF0gfHwge307XG4gICAgICBNYXBsZS51dGlsQ2xhc3NNYXBbZGVmLnByZWZpeF1bV0lMRENBUkRdID0ge307XG4gICAgICBPYmplY3Qua2V5cyhkZWYubWFwKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgTWFwbGUudXRpbENsYXNzTWFwW2RlZi5wcmVmaXhdW2tleV0gPSB7fTtcbiAgICAgICAgZGVmLnByb3BzLmZvckVhY2goKHByb3ApID0+IHtcbiAgICAgICAgICBNYXBsZS51dGlsQ2xhc3NNYXBbZGVmLnByZWZpeF1bV0lMRENBUkRdID0ge1xuICAgICAgICAgICAgLi4uTWFwbGUudXRpbENsYXNzTWFwW2RlZi5wcmVmaXhdW1dJTERDQVJEXSxcbiAgICAgICAgICAgIFtwcm9wXTogV0lMRENBUkQsXG4gICAgICAgICAgfTtcbiAgICAgICAgICBNYXBsZS51dGlsQ2xhc3NNYXBbZGVmLnByZWZpeF1ba2V5XVtwcm9wXSA9IGRlZi5tYXBba2V5XTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGdldFNlbGVjdG9ycyhcbiAgICBtZWRpYTogc3RyaW5nID0gU1RSX0VNUFRZLFxuICAgIHNlbEtleTogc3RyaW5nID0gU1RSX0VNUFRZLFxuICAgIHV0aWxLZXk6IHN0cmluZyA9IFNUUl9FTVBUWSxcbiAgICB1dGlsVmFsOiBzdHJpbmcgPSBTVFJfRU1QVFksXG4gICAgX3NlbGVjdG9yOiBzdHJpbmcgPSBTVFJfRU1QVFksXG4gICAgaW1wb3J0YW50ID0gZmFsc2UsXG4gICkge1xuICAgIGNvbnN0IG1hcGxlID0gTWFwbGUudXRpbENsYXNzTWFwW3NlbEtleV0gfHwge307XG4gICAgX3NlbGVjdG9yID0gKG1hcGxlLl9zZWxlY3RvciB8fCAnJykgKyBfc2VsZWN0b3I7XG5cbiAgICBjb25zdCBwYXJlbnRTZWxlY3RvciA9IHNlbEtleS5pbmNsdWRlcyhTRVBfT1VURVJfU1BBQ0UpXG4gICAgICA/IHNlbEtleS5zcGxpdChTRVBfT1VURVJfU1BBQ0UpLnBvcCgpLnNwbGl0KFJfU0VQX1NFTF9TUEFDRV9BTEwpLnNoaWZ0KClcbiAgICAgIDogU1RSX0VNUFRZO1xuXG4gICAgY29uc3QgYmFzZVNlbCA9IFtcbiAgICAgIG1lZGlhIHx8IFNUUl9FTVBUWSxcbiAgICAgIG1hcGxlLl9zZWxlY3RvciA/IFNFUF9TRUxFQ1RPUiA6IFNUUl9FTVBUWSxcbiAgICAgIHNlbEtleSxcbiAgICAgIHV0aWxLZXkgPyBTRVBfVVRJTF9LRVkgOiBTVFJfRU1QVFksXG4gICAgICB1dGlsS2V5LFxuICAgICAgdXRpbFZhbCA/IFNFUF9VVElMX1ZBTCA6IFNUUl9FTVBUWSxcbiAgICBdLmpvaW4oU1RSX0VNUFRZKTtcblxuICAgIHJldHVybiBfc2VsZWN0b3JcbiAgICAgIC5zcGxpdCgvLFxccyovKVxuICAgICAgLm1hcCgoc2VsZWN0b3IpID0+XG4gICAgICAgIFtcbiAgICAgICAgICBwYXJlbnRTZWxlY3RvciA/IHBhcmVudFNlbGVjdG9yICsgU1RSX1NQQUNFIDogU1RSX0VNUFRZLFxuICAgICAgICAgIHV0aWxWYWwgPyBTVFJfRE9UIDogU1RSX0VNUFRZLFxuICAgICAgICAgIHV0aWxWYWwgPyBlc2MoYmFzZVNlbCArIHV0aWxWYWwpIDogYFtjbGFzcyo9XCIke2Jhc2VTZWx9XCJdYCxcbiAgICAgICAgICB1dGlsVmFsICYmIGltcG9ydGFudCA/IGVzYyhJTVBPUlRBTlQpIDogU1RSX0VNUFRZLFxuICAgICAgICAgIG1hcGxlLl9zZWxlY3RvciB8fCAhc2VsS2V5IHx8IHNlbEtleS5jaGFyQXQoMCkgPT09IFNFUF9OT19TUEFDRVxuICAgICAgICAgICAgPyBTVFJfRU1QVFlcbiAgICAgICAgICAgIDogU1RSX1NQQUNFLFxuICAgICAgICAgIG1hcGxlLl9zZWxlY3RvclxuICAgICAgICAgICAgPyBTVFJfRU1QVFlcbiAgICAgICAgICAgIDogc2VsS2V5XG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoU0VQX09VVEVSX1NQQUNFICsgcGFyZW50U2VsZWN0b3IsIFNUUl9FTVBUWSlcbiAgICAgICAgICAgICAgICAucmVwbGFjZShSX1NFUF9TRUxfU1BBQ0UsIFNUUl9TUEFDRSlcbiAgICAgICAgICAgICAgICAucmVwbGFjZShSX1NFUF9OT19TUEFDRSwgU1RSX0VNUFRZKSxcbiAgICAgICAgICBzZWxlY3Rvci50cmltKCkuY2hhckF0KDApID09PSBTRVBfTk9fU1BBQ0UgPyBTVFJfRU1QVFkgOiBTVFJfU1BBQ0UsXG4gICAgICAgICAgc2VsZWN0b3JcbiAgICAgICAgICAgIC50cmltKClcbiAgICAgICAgICAgIC5yZXBsYWNlKFJfU0VQX1NFTF9TUEFDRSwgU1RSX1NQQUNFKVxuICAgICAgICAgICAgLnJlcGxhY2UoUl9TRVBfTk9fU1BBQ0UsIFNUUl9FTVBUWSksXG4gICAgICAgIF0uam9pbihTVFJfRU1QVFkpLFxuICAgICAgKVxuICAgICAgLmpvaW4oJywnKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGNhY2hlKG1lZGlhOiBzdHJpbmcsIHNlbGVjdG9yOiBzdHJpbmcsIG1hcFRvQmVDYWNoZWQ6IGFueSkge1xuICAgIGlmICghbWFwVG9CZUNhY2hlZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBQcm9wZXJ0eSBtYXAgbm90IGZvdW5kIGZvciBzZWxlY3RvcjogJHtzZWxlY3Rvcn1gKTtcbiAgICB9XG5cbiAgICBjb25zdCBjYWNoZUtleSA9IGAke21lZGlhfSR7c2VsZWN0b3J9JHtKU09OLnN0cmluZ2lmeShtYXBUb0JlQ2FjaGVkKX1gO1xuICAgIGlmICghQ0FDSEVbY2FjaGVLZXldKSB7XG4gICAgICBNYXBsZS50ZW1wQ2FjaGVbbWVkaWFdID0gTWFwbGUudGVtcENhY2hlW21lZGlhXSB8fCB7fTtcbiAgICAgIE1hcGxlLnRlbXBDYWNoZVttZWRpYV0gPSB7XG4gICAgICAgIC4uLk1hcGxlLnRlbXBDYWNoZVttZWRpYV0sXG4gICAgICAgIFtzZWxlY3Rvcl06IHtcbiAgICAgICAgICAuLi4oTWFwbGUudGVtcENhY2hlW21lZGlhXVtzZWxlY3Rvcl0gfHwge30pLFxuICAgICAgICAgIC4uLm1hcFRvQmVDYWNoZWQsXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgICAgQ0FDSEVbY2FjaGVLZXldID0gMTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBzdHlsZXMobWVkaWE6IHN0cmluZykge1xuICAgIGNvbnN0IGNhY2hlSXRlbSA9IE1hcGxlLnRlbXBDYWNoZVttZWRpYV07XG4gICAgaWYgKCFjYWNoZUl0ZW0pIHtcbiAgICAgIHJldHVybiBTVFJfRU1QVFk7XG4gICAgfVxuXG4gICAgY29uc3Qgc2VsZWN0b3JzID0gT2JqZWN0LmtleXMoY2FjaGVJdGVtKTtcblxuICAgIGlmIChzZWxlY3RvcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gU1RSX0VNUFRZO1xuICAgIH1cblxuICAgIGNvbnN0IGJyZWFrcG9pbnRQYXJ0cyA9IG1lZGlhLnNwbGl0KFNFUF9NRURJQSk7XG4gICAgY29uc3QgYnJlYWtwb2ludERpciA9IGJyZWFrcG9pbnRQYXJ0c1sxXTtcbiAgICBjb25zdCBtZWRpYVF1ZXJ5ID0gYnJlYWtwb2ludERpciA9PT0gU1RSX1VQID8gJ21pbi13aWR0aCcgOiAnbWF4LXdpZHRoJztcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcblxuICAgIC8vIG9wZW4gbWVkaWEgcXVlcnlcbiAgICBpZiAobWVkaWEgIT09IEJSRUFLUE9JTlQubWluTWVkaWEpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGBAbWVkaWEgKCR7bWVkaWFRdWVyeX06ICR7QlJFQUtQT0lOVC5tZWRpYVttZWRpYV19cHgpIHtgKTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IHNlbGVjdG9yIG9mIHNlbGVjdG9ycykge1xuICAgICAgY29uc3QgcHJvcE1hcCA9IGNhY2hlSXRlbVtzZWxlY3Rvcl07XG4gICAgICBpZiAoIXByb3BNYXApIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHByb3BNYXBLZXlzID0gT2JqZWN0LmtleXMocHJvcE1hcCkuZmlsdGVyKChwKSA9PiBwICE9PSBJTVBPUlRBTlQpO1xuICAgICAgaWYgKHByb3BNYXBLZXlzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gb3BlbiBzZWxlY3RvclxuICAgICAgcmVzdWx0LnB1c2goYCR7c2VsZWN0b3J9e2ApO1xuXG4gICAgICAvLyBmaWxsIHNlbGVjdG9yIHdpdGggcHJvcGVydGllc1xuICAgICAgZm9yIChjb25zdCBwcm9wIG9mIHByb3BNYXBLZXlzKSB7XG4gICAgICAgIGNvbnN0IHZhbCA9IHByb3BNYXBbcHJvcF0udG9TdHJpbmcoKTtcbiAgICAgICAgY29uc3QgaW1wb3J0YW50ID1cbiAgICAgICAgICB2YWwuaW5kZXhPZihJTVBPUlRBTlQpIDwgMCAmJiBwcm9wTWFwW0lNUE9SVEFOVF1cbiAgICAgICAgICAgID8gJyAhaW1wb3J0YW50J1xuICAgICAgICAgICAgOiBTVFJfRU1QVFk7XG4gICAgICAgIHJlc3VsdC5wdXNoKFxuICAgICAgICAgIE1hcGxlLnByb3BFeHRlbnNpb25NYXBbcHJvcF1cbiAgICAgICAgICAgID8gTWFwbGUucHJvcEV4dGVuc2lvbk1hcFtwcm9wXSh2YWwsIGltcG9ydGFudClcbiAgICAgICAgICAgIDogYCR7cHJvcH06JHt2YWx9JHtpbXBvcnRhbnR9O2AsXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIC8vIGNsb3NlIHNlbGVjdG9yXG4gICAgICByZXN1bHQucHVzaChgfWApO1xuICAgIH1cblxuICAgIC8vIGNsb3NlIG1lZGlhIHF1ZXJ5XG4gICAgaWYgKG1lZGlhICE9PSBCUkVBS1BPSU5ULm1pbk1lZGlhKSB7XG4gICAgICByZXN1bHQucHVzaChgfWApO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0Lmxlbmd0aCA+IDIgPyByZXN1bHQuam9pbihTVFJfRU1QVFkpIDogU1RSX0VNUFRZO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgZ2VuZXJhdGVXaGl0ZWxpc3Qod2hpdGVsaXN0OiBBcnJheTxzdHJpbmc+ID0gW10pIHtcbiAgICBjb25zdCBjbGFzc0xpc3QgPSBbXTtcbiAgICBmb3IgKGNvbnN0IHV0aWxLZXkgb2Ygd2hpdGVsaXN0KSB7XG4gICAgICBpZiAoIU1hcGxlLnV0aWxDbGFzc01hcFt1dGlsS2V5XSkge1xuICAgICAgICBjbGFzc0xpc3QucHVzaCh1dGlsS2V5KTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHByb3BzID0gT2JqZWN0LmtleXMoTWFwbGUudXRpbENsYXNzTWFwW3V0aWxLZXldKTtcbiAgICAgIGZvciAoY29uc3QgdXRpbFZhbCBvZiBwcm9wcykge1xuICAgICAgICBpZiAodXRpbFZhbC5jaGFyQXQoMCkgPT09IFBSRUZJWF9NQVBMRV9QUk9QKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBicmVha3BvaW50cyA9IE9iamVjdC5rZXlzKE1hcGxlLmJyZWFrcG9pbnRNYXApO1xuICAgICAgICBmb3IgKGNvbnN0IGJwIG9mIGJyZWFrcG9pbnRzKSB7XG4gICAgICAgICAgY29uc3QgbWVkaWFVcCA9IGJwICsgU1VGRklYX01FRElBX1VQO1xuICAgICAgICAgIGNvbnN0IG1lZGlhRG93biA9IGJwICsgU1VGRklYX01FRElBX0RPV047XG4gICAgICAgICAgY29uc3QgdXRpbENsYXNzID0gU0VQX1VUSUxfS0VZICsgdXRpbEtleSArIFNFUF9VVElMX1ZBTCArIHV0aWxWYWw7XG4gICAgICAgICAgaWYgKG1lZGlhVXAgaW4gQlJFQUtQT0lOVC5tZWRpYSkge1xuICAgICAgICAgICAgY2xhc3NMaXN0LnB1c2gobWVkaWFVcCArIHV0aWxDbGFzcyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChtZWRpYURvd24gaW4gQlJFQUtQT0lOVC5tZWRpYSkge1xuICAgICAgICAgICAgY2xhc3NMaXN0LnB1c2gobWVkaWFEb3duICsgdXRpbENsYXNzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgTWFwbGUuZmx5KHByZUluaXRDbGFzc0xpc3QuY29uY2F0KGNsYXNzTGlzdCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgc3BsaXRMYXN0T2NjdXJyZW5jZShzdHIsIGtleSkge1xuICAgIGNvbnN0IHBvcyA9IHN0ci5sYXN0SW5kZXhPZihrZXkpO1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgIGNvbnN0IGZpcnN0UGFydCA9IHN0ci5zdWJzdHJpbmcoMCwgcG9zKTtcbiAgICBjb25zdCBsYXN0UGFydCA9IHN0ci5zdWJzdHJpbmcocG9zICsga2V5Lmxlbmd0aCk7XG4gICAgaWYgKGZpcnN0UGFydCkge1xuICAgICAgcmVzdWx0LnB1c2goZmlyc3RQYXJ0KTtcbiAgICB9XG4gICAgaWYgKGxhc3RQYXJ0KSB7XG4gICAgICByZXN1bHQucHVzaChsYXN0UGFydCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBzcGxpdEZpcnN0T2NjdXJyZW5jZShzdHIsIGtleSkge1xuICAgIGNvbnN0IHBvcyA9IHN0ci5pbmRleE9mKGtleSk7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgY29uc3QgZmlyc3RQYXJ0ID0gc3RyLnN1YnN0cmluZygwLCBwb3MpO1xuICAgIGNvbnN0IGxhc3RQYXJ0ID0gc3RyLnN1YnN0cmluZyhwb3MgKyBrZXkubGVuZ3RoKTtcbiAgICBpZiAoZmlyc3RQYXJ0KSB7XG4gICAgICByZXN1bHQucHVzaChmaXJzdFBhcnQpO1xuICAgIH1cbiAgICBpZiAobGFzdFBhcnQpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGxhc3RQYXJ0KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaW5pdChcbiAgICBkb2N1bWVudCxcbiAgICBlbmFibGVkOiBib29sZWFuLFxuICAgIHV0aWxDbGFzc01hcDogYW55ID0ge30sXG4gICAgd2hpdGVsaXN0OiBBcnJheTxzdHJpbmc+LFxuICAgIHZhcmlhYmxlczogTWFwbGVWYXJpYWJsZU1vZGVsID0gTWFwbGUudmFyaWFibGVzLFxuICAgIHV0aWxQcmVmaXhMaXN0OiBBcnJheTxhbnk+ID0gW10sXG4gICAgcHJvcEV4dGVuc2lvbk1hcDogYW55ID0ge30sXG4gICkge1xuICAgIGlzTWFwbGVFbmFibGVkID0gZW5hYmxlZDtcbiAgICBpZiAoaXNNYXBsZUVuYWJsZWQgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGRvYyA9IGRvY3VtZW50O1xuICAgIGlmIChpc0luaXRpYWxpemVkID09PSBmYWxzZSkge1xuICAgICAgaXNJbml0aWFsaXplZCA9IHRydWU7XG4gICAgICBNYXBsZS52YXJpYWJsZXMgPSB7XG4gICAgICAgIC4uLk1hcGxlLnZhcmlhYmxlcyxcbiAgICAgICAgLi4udmFyaWFibGVzLFxuICAgICAgfTtcbiAgICAgIE1hcGxlQ29sb3JIZWxwZXIuZ2VuZXJhdGVBbHBoYUNvbG9ycyhNYXBsZS52YXJpYWJsZXMuY29sb3IpO1xuICAgICAgTWFwbGUudXRpbENsYXNzTWFwID0ge1xuICAgICAgICAuLi5nZXRNYXBsZVV0aWxpdHlDbGFzc01hcChNYXBsZS52YXJpYWJsZXMpLFxuICAgICAgICAuLi51dGlsQ2xhc3NNYXAsXG4gICAgICB9O1xuICAgICAgTWFwbGUudXRpbFByZWZpeExpc3QgPSBbXG4gICAgICAgIC4uLmdldE1hcGxlVXRpbGl0eVZhcmlhYmxlTWFwKE1hcGxlLnZhcmlhYmxlcyksXG4gICAgICAgIC4uLnV0aWxQcmVmaXhMaXN0LFxuICAgICAgXTtcbiAgICAgIE1hcGxlLnByb3BFeHRlbnNpb25NYXAgPSB7XG4gICAgICAgIC4uLk1BUExFX1BST1BfRVhURU5TSU9OX01BUCxcbiAgICAgICAgLi4ucHJvcEV4dGVuc2lvbk1hcCxcbiAgICAgIH07XG4gICAgICBNYXBsZS5icmVha3BvaW50TWFwID0ge1xuICAgICAgICAuLi5NYXBsZS52YXJpYWJsZXMuYnJlYWtwb2ludCxcbiAgICAgIH07XG4gICAgICBNYXBsZS5zZXRNaW5BbmRNYXhCcmVha3BvaW50cygpO1xuICAgICAgTWFwbGUuY3JlYXRlRG9tRWxlbWVudHMoU1RZTEVfRUxFTUVOVFMpO1xuICAgICAgTWFwbGUuZXh0ZW5kUHJvcGVydGllcygpO1xuICAgICAgTWFwbGUuZ2VuZXJhdGVXaGl0ZWxpc3Qod2hpdGVsaXN0KTtcbiAgICAgIHRoaXMub25Jbml0JC5uZXh0KHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZmluZEFuZEZseShzdHI6IHN0cmluZykge1xuICAgIGlmIChpc01hcGxlRW5hYmxlZCA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHN0cikge1xuICAgICAgTWFwbGUuZmx5KFxuICAgICAgICAoc3RyLm1hdGNoKFJfRVhUUkFDVF9DTEFTUykgfHwgW10pXG4gICAgICAgICAgLmpvaW4oJyAnKVxuICAgICAgICAgIC5yZXBsYWNlKC9jbGFzc1xcPVxcXCIvZywgJycpXG4gICAgICAgICAgLnJlcGxhY2UoL1wiL2csICcnKSxcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBmbHkoY2xhc3NMaXN0OiBhbnkpIHtcbiAgICBpZiAoaXNNYXBsZUVuYWJsZWQgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChpc0luaXRpYWxpemVkID09PSBmYWxzZSkge1xuICAgICAgcHJlSW5pdENsYXNzTGlzdCA9IHByZUluaXRDbGFzc0xpc3QuY29uY2F0KGNsYXNzTGlzdCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFjbGFzc0xpc3QgfHwgY2xhc3NMaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHJhd0NhY2hlS2V5ID0gQXJyYXkuaXNBcnJheShjbGFzc0xpc3QpXG4gICAgICA/IGNsYXNzTGlzdC5qb2luKCcgJylcbiAgICAgIDogY2xhc3NMaXN0O1xuXG4gICAgaWYgKE1hcGxlLnJhd0NhY2hlW3Jhd0NhY2hlS2V5XSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBNYXBsZS5yYXdDYWNoZVtyYXdDYWNoZUtleV0gPSAxO1xuICAgIGlmIChBcnJheS5pc0FycmF5KGNsYXNzTGlzdCkgPT09IGZhbHNlKSB7XG4gICAgICBjbGFzc0xpc3QgPSBjbGFzc0xpc3Quc3BsaXQoL1xccysvZyk7XG4gICAgfVxuXG4gICAgY2xhc3NMaXN0ID0gTWFwbGUudW5pZnlVdGlsaXR5Q2xhc3MoY2xhc3NMaXN0KTtcblxuICAgIE1hcGxlLnRlbXBDYWNoZSA9IHt9O1xuXG4gICAgZm9yIChjb25zdCBjbGFzc0l0ZW0gb2YgY2xhc3NMaXN0KSB7XG4gICAgICAvLyBDaGVjayB3aGV0aGVyIHRoZSBzdHlsZXMgd2lsbCBoYXZlICFpbXBvcnRhbnQgZmxhZyBvciBub3RcbiAgICAgIGNvbnN0IGltcG9ydGFudCA9IGNsYXNzSXRlbS5jaGFyQXQoY2xhc3NJdGVtLmxlbmd0aCAtIDEpID09PSBJTVBPUlRBTlQ7XG4gICAgICBjb25zdCBjbGFzc0l0ZW1XaXRob3V0SW1wb3J0YW50ID0gY2xhc3NJdGVtLnJlcGxhY2UoSU1QT1JUQU5ULCBTVFJfRU1QVFkpO1xuXG4gICAgICBsZXQgcGFydHMgPSBNYXBsZS5zcGxpdExhc3RPY2N1cnJlbmNlKFxuICAgICAgICBjbGFzc0l0ZW1XaXRob3V0SW1wb3J0YW50LFxuICAgICAgICBTRVBfVVRJTF9WQUwsXG4gICAgICApO1xuXG4gICAgICAvLyBFeHRyYWN0IHV0aWxpdHkgdmFsdWVcbiAgICAgIGNvbnN0IHV0aWxWYWwgPSBwYXJ0cy5sZW5ndGggPT09IDEgPyBudWxsIDogcGFydHMucG9wKCk7XG5cbiAgICAgIC8vIEV4dHJhY3QgbWVkaWEgcXVlcnlcbiAgICAgIGNvbnN0IG1lZGlhID1cbiAgICAgICAgT2JqZWN0LmtleXMoQlJFQUtQT0lOVC5tZWRpYSkuZmluZChcbiAgICAgICAgICAoa2V5OiBzdHJpbmcpID0+IGNsYXNzSXRlbS5pbmRleE9mKGtleSkgPT09IDAsXG4gICAgICAgICkgfHwgQlJFQUtQT0lOVC5taW5NZWRpYTtcblxuICAgICAgcGFydHMgPSBNYXBsZS5zcGxpdEZpcnN0T2NjdXJyZW5jZShwYXJ0cy5qb2luKFNUUl9FTVBUWSksIG1lZGlhKVxuICAgICAgICAuam9pbihTVFJfRU1QVFkpXG4gICAgICAgIC5zcGxpdChTRVBfVVRJTF9LRVkpXG4gICAgICAgIC5maWx0ZXIoKHA6IHN0cmluZykgPT4gISFwKTtcblxuICAgICAgLy8gRXhhY3QgdXRpbGl0eSBjbGFzc1xuICAgICAgY29uc3QgdXRpbEtleSA9IHBhcnRzLmxlbmd0aCA+PSAxID8gcGFydHMucG9wKCkgOiBudWxsO1xuXG4gICAgICAvLyBFeHRyYWN0IHNlbGVjdG9yXG4gICAgICBjb25zdCBzZWxLZXkgPSBwYXJ0cy5qb2luKFNFUF9VVElMX0tFWSk7XG5cbiAgICAgIC8vIEdldCBzdHlsZSBtYXBcbiAgICAgIGNvbnN0IG1hcGxlID0gTWFwbGUudXRpbENsYXNzTWFwW3V0aWxLZXldO1xuXG4gICAgICAvLyBXaXRob3V0IGEgc3R5bGUgbWFwIHdlIGNhbid0IGNyZWF0ZSBzdHlsZXNcbiAgICAgIGlmICghbWFwbGUpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIENhY2hlIGRlZmF1bHQgc3R5bGVzIHdpdGggc2VsZWN0b3JcbiAgICAgIGlmIChtYXBsZS5fZGVmYXVsdCkge1xuICAgICAgICBPYmplY3Qua2V5cyhtYXBsZS5fZGVmYXVsdCkuZm9yRWFjaCgobWVkaWFJdGVtKSA9PiB7XG4gICAgICAgICAgTWFwbGUuY2FjaGUoXG4gICAgICAgICAgICBtZWRpYUl0ZW0sXG4gICAgICAgICAgICBNYXBsZS5nZXRTZWxlY3RvcnMoXG4gICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgIHNlbEtleSxcbiAgICAgICAgICAgICAgdXRpbEtleSxcbiAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgbWFwbGUuX3NlbGVjdG9yLFxuICAgICAgICAgICAgICBpbXBvcnRhbnQsXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAuLi5tYXBsZS5fY29tbW9uLFxuICAgICAgICAgICAgICAuLi5tYXBsZVttYXBsZS5fZGVmYXVsdFttZWRpYUl0ZW1dXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIENhY2hlIHV0aWxpdHkgc3R5bGVzIHdpdGggc2VsZWN0b3JcbiAgICAgIGlmICh1dGlsVmFsKSB7XG4gICAgICAgIGNvbnN0IGMgPSBjbGFzc0l0ZW0ucmVwbGFjZShJTVBPUlRBTlQsIFNUUl9FTVBUWSk7XG4gICAgICAgIGNvbnN0IHVjbSA9IE1hcGxlLnV0aWxDbGFzc01hcDtcblxuICAgICAgICAvLyNyZWdpb24gV2lsZGNhcmQgc2VsZWN0b3JzXG4gICAgICAgIC8vICo6dXRpbC1rZXlcbiAgICAgICAgLy8gKjp1dGlsLWtleT11dGlsLXZhbFxuICAgICAgICAvLyAqLnNlbGVjdG9yOnV0aWwta2V5PXV0aWwtdmFsXG4gICAgICAgIC8vICo6c2VsZWN0b3Ita2V5OnV0aWwta2V5PXV0aWwtdmFsXG4gICAgICAgIGNvbnN0IHdjTWVkaWEgPSBjLnJlcGxhY2UobWVkaWEsIFdJTERDQVJEKTtcblxuICAgICAgICAvLyBtZWRpYToqXG4gICAgICAgIC8vIG1lZGlhLnNlbGVjdG9yOipcbiAgICAgICAgLy8gbWVkaWE6c2VsZWN0b3Ita2V5OipcbiAgICAgICAgY29uc3Qgd2N1dGlsS2V5ID0gYy5yZXBsYWNlKFJfU0VQX1VUSUxfS0VZLCBgOiR7V0lMRENBUkR9YCk7XG5cbiAgICAgICAgLy8gbWVkaWE6dXRpbC1rZXk9KlxuICAgICAgICAvLyBtZWRpYS5zZWxlY3Rvcjp1dGlsLWtleT0qXG4gICAgICAgIC8vIG1lZGlhOnNlbGVjdG9yLWtleTp1dGlsLWtleT0qXG4gICAgICAgIGNvbnN0IHdjdXRpbFZhbCA9IGMucmVwbGFjZShSX1NFUF9VVElMX1ZBTCwgYD0ke1dJTERDQVJEfWApO1xuXG4gICAgICAgIC8vICo6KlxuICAgICAgICAvLyAqLnNlbGVjdG9yOipcbiAgICAgICAgLy8gKjpzZWxlY3Rvci1rZXk6KlxuICAgICAgICBjb25zdCB3Y01lZGlhS2V5ID0gd2NNZWRpYS5yZXBsYWNlKFJfU0VQX1VUSUxfS0VZLCBgOiR7V0lMRENBUkR9YCk7XG5cbiAgICAgICAgLy8gKjp1dGlsLWtleT0qXG4gICAgICAgIC8vICouc2VsZWN0b3I6dXRpbC1rZXk9KlxuICAgICAgICAvLyAqOnNlbGVjdG9yLWtleTp1dGlsLWtleT0qXG4gICAgICAgIGNvbnN0IHdjTWVkaWFWYWwgPSB3Y3V0aWxWYWwucmVwbGFjZShtZWRpYSwgV0lMRENBUkQpO1xuICAgICAgICAvLyNlbmRyZWdpb25cblxuICAgICAgICBjb25zdCBzZWxlY3RvciA9IE1hcGxlLmdldFNlbGVjdG9ycyhcbiAgICAgICAgICBtZWRpYSxcbiAgICAgICAgICBzZWxLZXksXG4gICAgICAgICAgdXRpbEtleSxcbiAgICAgICAgICB1dGlsVmFsLFxuICAgICAgICAgIG1hcGxlLl9zZWxlY3RvcixcbiAgICAgICAgICBpbXBvcnRhbnQsXG4gICAgICAgICk7XG5cbiAgICAgICAgTWFwbGUuY2FjaGUobWVkaWEsIHNlbGVjdG9yLCB7XG4gICAgICAgICAgLi4ubWFwbGUuX2NvbW1vbixcbiAgICAgICAgICAuLi5tYXBsZVt1dGlsVmFsXSxcbiAgICAgICAgICAuLi5KU09OLnBhcnNlKFxuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoXG4gICAgICAgICAgICAgIG1hcGxlW3V0aWxWYWwucmVwbGFjZShSX0NVU1RPTSwgV0lMRENBUkQpXSB8fCB7fSxcbiAgICAgICAgICAgICkucmVwbGFjZShcbiAgICAgICAgICAgICAgUl9XSUxEQ0FSRCxcbiAgICAgICAgICAgICAgdXRpbEtleSA9PT0gJ2NvbnRlbnQnXG4gICAgICAgICAgICAgICAgPyB1dGlsVmFsLnJlcGxhY2UoUl9DVVNUT00sICckMScpXG4gICAgICAgICAgICAgICAgOiB1dGlsVmFsLnJlcGxhY2UoUl9DVVNUT00sICckMScpLnJlcGxhY2UoUl9TRVBfVkFMX1NQQUNFLCAnICcpLFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICApLFxuICAgICAgICAgIC4uLih1Y21bd2NNZWRpYUtleV0gfHwge30pLFxuICAgICAgICAgIC4uLih1Y21bd2N1dGlsS2V5XSB8fCB7fSksXG4gICAgICAgICAgLi4uKHVjbVt3Y01lZGlhVmFsXSB8fCB7fSksXG4gICAgICAgICAgLi4uKHVjbVt3Y3V0aWxWYWxdIHx8IHt9KSxcbiAgICAgICAgICAuLi4odWNtW3djTWVkaWFdIHx8IHt9KSxcbiAgICAgICAgICAuLi4odWNtW2NdIHx8IHt9KSxcbiAgICAgICAgICBbSU1QT1JUQU5UXTogaW1wb3J0YW50LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyNyZWdpb24gR2VuZXJhdGUgc3R5bGVzXG4gICAgLy8gR2VuZXJhdGUgbWluIG1lZGlhIHF1ZXJ5IHN0eWxlc1xuICAgIGNvbnN0IG1pbk1lZGlhU3R5bGVzID0gTWFwbGUuc3R5bGVzKEJSRUFLUE9JTlQubWluTWVkaWEpO1xuICAgIGlmIChtaW5NZWRpYVN0eWxlcykge1xuICAgICAgTWFwbGUuYXBwZW5kU3R5bGUoXG4gICAgICAgIFNUWUxFX0VMRU1FTlRTLFxuICAgICAgICBCUkVBS1BPSU5ULm1pbk1lZGlhLFxuICAgICAgICBtaW5NZWRpYVN0eWxlcyxcbiAgICAgICAgZmFsc2UsXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIEdlbmVyYXRlIG1lZGlhIHF1ZXJ5IHN0eWxlc1xuICAgIGNvbnN0IG1lZGlhUXVlcnlTdHlsZXMgPSB7fTtcbiAgICBPYmplY3Qua2V5cyhNYXBsZS50ZW1wQ2FjaGUpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgaWYgKGtleSAhPT0gQlJFQUtQT0lOVC5taW5NZWRpYSkge1xuICAgICAgICBtZWRpYVF1ZXJ5U3R5bGVzW2tleV0gPSBtZWRpYVF1ZXJ5U3R5bGVzW2tleV0gfHwgJyc7XG4gICAgICAgIG1lZGlhUXVlcnlTdHlsZXNba2V5XSArPSBNYXBsZS5zdHlsZXMoa2V5KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBPYmplY3Qua2V5cyhtZWRpYVF1ZXJ5U3R5bGVzKS5mb3JFYWNoKChrZXkpID0+XG4gICAgICBNYXBsZS5hcHBlbmRTdHlsZShTVFlMRV9FTEVNRU5UUywga2V5LCBtZWRpYVF1ZXJ5U3R5bGVzW2tleV0sIGZhbHNlKSxcbiAgICApO1xuICAgIC8vI2VuZHJlZ2lvblxuICB9XG5cbiAgcHVibGljIHN0YXRpYyB1bmlmeVV0aWxpdHlDbGFzcyhjbGFzc0xpc3QpIHtcbiAgICBjb25zdCBjbGFzc2VzID0gY2xhc3NMaXN0LnJlZHVjZSgoYWNjLCBwcmV2KSA9PiB7XG4gICAgICBjb25zdCBleGlzdGluZ1N0eWxlSW5kZXggPSBhY2MuZmluZEluZGV4KFxuICAgICAgICAocCkgPT5cbiAgICAgICAgICAoKHAgfHwgJycpLnNwbGl0KFJfVU5JRklZKSB8fCBbXSlbMF0gPT09XG4gICAgICAgICAgKChwcmV2IHx8ICcnKS5zcGxpdChSX1VOSUZJWSkgfHwgW10pWzBdLFxuICAgICAgKTtcbiAgICAgIGlmIChleGlzdGluZ1N0eWxlSW5kZXggPCAwKSB7XG4gICAgICAgIGFjYy5wdXNoKHByZXYpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWNjW2V4aXN0aW5nU3R5bGVJbmRleF0gPSBwcmV2O1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCBbXSk7XG4gICAgcmV0dXJuIGNsYXNzZXM7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGFwcGVuZFN0eWxlKFxuICAgIHN0eWxlRWxlbWVudHM6IGFueSxcbiAgICBicDogc3RyaW5nLFxuICAgIHN0eWxlOiBzdHJpbmcsXG4gICAgc2lsZW50ID0gdHJ1ZSxcbiAgKSB7XG4gICAgc3R5bGVFbGVtZW50c1ticF0uYXBwZW5kQ2hpbGQoZG9jLmNyZWF0ZVRleHROb2RlKHN0eWxlKSk7XG5cbiAgICBpZiAoIXNpbGVudCkge1xuICAgICAgTWFwbGUub25TdHlsZUFwcGVuZCQubmV4dCh7IGJwLCBzdHlsZSB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGlzTWVkaWFWYWxpZChtZWRpYTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIG1lZGlhIGluIEJSRUFLUE9JTlQubWVkaWE7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGlzQnJlYWtwb2ludFZhbGlkKGJyZWFrcG9pbnQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBicmVha3BvaW50IGluIE1hcGxlLmJyZWFrcG9pbnRNYXA7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGlzTWVkaWFNYXRjaGVzV2l0aEJyZWFrcG9pbnQoXG4gICAgbWVkaWE6IHN0cmluZyxcbiAgICBicmVha3BvaW50OiBzdHJpbmcsXG4gICk6IGJvb2xlYW4ge1xuICAgIGlmICghTWFwbGUuaXNCcmVha3BvaW50VmFsaWQoYnJlYWtwb2ludCkgfHwgIU1hcGxlLmlzTWVkaWFWYWxpZChtZWRpYSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBtZWRpYVNpemUgPSBCUkVBS1BPSU5ULm1lZGlhW21lZGlhXTtcbiAgICBjb25zdCBicmVha3BvaW50U2l6ZSA9IHBhcnNlRmxvYXQoTWFwbGUuYnJlYWtwb2ludE1hcFticmVha3BvaW50XSk7XG5cbiAgICBpZiAobWVkaWEuaW5jbHVkZXMoU1VGRklYX01FRElBX0RPV04pKSB7XG4gICAgICByZXR1cm4gYnJlYWtwb2ludFNpemUgPD0gbWVkaWFTaXplO1xuICAgIH1cblxuICAgIGlmIChtZWRpYS5pbmNsdWRlcyhTVUZGSVhfTUVESUFfVVApKSB7XG4gICAgICByZXR1cm4gYnJlYWtwb2ludFNpemUgPj0gbWVkaWFTaXplO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0VmFsaWRNZWRpYU1hcCgpOiBhbnkge1xuICAgIHJldHVybiB7IC4uLkJSRUFLUE9JTlQubWVkaWEgfTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TWluTWVkaWEoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gQlJFQUtQT0lOVC5taW5NZWRpYTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TWluQnJlYWtwb2ludCgpOiBzdHJpbmcge1xuICAgIHJldHVybiBCUkVBS1BPSU5ULm1pbktleTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TWFwcGVkTWVkaWFPck1pbihtZWRpYTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gTWFwbGUuaXNNZWRpYVZhbGlkKG1lZGlhKSA/IG1lZGlhIDogTWFwbGUuZ2V0TWluTWVkaWEoKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TWFwcGVkTWVkaWFPck51bGwobWVkaWE6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIE1hcGxlLmlzTWVkaWFWYWxpZChtZWRpYSkgPyBtZWRpYSA6IG51bGw7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldE1hcHBlZEJyZWFrcG9pbnRPck1pbihicmVha3BvaW50OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBNYXBsZS5pc0JyZWFrcG9pbnRWYWxpZChicmVha3BvaW50KVxuICAgICAgPyBicmVha3BvaW50XG4gICAgICA6IE1hcGxlLmdldE1pbkJyZWFrcG9pbnQoKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TWFwcGVkQnJlYWtwb2ludE9yTnVsbChicmVha3BvaW50OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBNYXBsZS5pc0JyZWFrcG9pbnRWYWxpZChicmVha3BvaW50KSA/IGJyZWFrcG9pbnQgOiBudWxsO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRWYXJpYWJsZXMoKTogTWFwbGVWYXJpYWJsZU1vZGVsIHtcbiAgICByZXR1cm4geyAuLi5NYXBsZS52YXJpYWJsZXMgfTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZmlsbEluVGhlR2FwcyhicmVha3BvaW50TWFwKTogYW55IHtcbiAgICBjb25zdCBmdWxsQnJlYWtwb2ludE1hcCA9IE1hcGxlLmdldFZhcmlhYmxlcygpLmJyZWFrcG9pbnQ7XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGZ1bGxCcmVha3BvaW50TWFwKTtcbiAgICBjb25zdCBtaW5LZXkgPSBrZXlzLmZpbmQoKGtleSkgPT4ga2V5IGluIGJyZWFrcG9pbnRNYXApO1xuICAgIHJldHVybiBrZXlzXG4gICAgICAuc29ydCgoYSwgYikgPT4gZnVsbEJyZWFrcG9pbnRNYXBbYV0gLSBmdWxsQnJlYWtwb2ludE1hcFtiXSlcbiAgICAgIC5yZWR1Y2UoKGFjYywga2V5LCBpKSA9PiB7XG4gICAgICAgIGNvbnN0IG5leHRLZXkgPSBrZXlzW2kgKyAxXTtcbiAgICAgICAgaWYgKGtleSBpbiBhY2MgPT09IGZhbHNlKSB7XG4gICAgICAgICAgYWNjID0ge1xuICAgICAgICAgICAgLi4uYWNjLFxuICAgICAgICAgICAgW2tleV06XG4gICAgICAgICAgICAgIGtleSBpbiBicmVha3BvaW50TWFwID8gYnJlYWtwb2ludE1hcFtrZXldIDogYnJlYWtwb2ludE1hcFttaW5LZXldLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5leHRLZXkgJiYgIWJyZWFrcG9pbnRNYXBbbmV4dEtleV0pIHtcbiAgICAgICAgICBhY2MgPSB7XG4gICAgICAgICAgICAuLi5hY2MsXG4gICAgICAgICAgICBbbmV4dEtleV06IGFjY1trZXldLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgIH0sIHt9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaXNCcmVha3BvaW50TWFwKGJyZWFrcG9pbnRNYXApOiBhbnkge1xuICAgIGlmICh0eXBlb2YgYnJlYWtwb2ludE1hcCA9PT0gJ29iamVjdCcgJiYgYnJlYWtwb2ludE1hcCAhPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKE1hcGxlLmdldFZhcmlhYmxlcygpLmJyZWFrcG9pbnQpLnNvbWUoXG4gICAgICAgIChrZXkpID0+IGJyZWFrcG9pbnRNYXAgJiYga2V5IGluIGJyZWFrcG9pbnRNYXAsXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiJdfQ==