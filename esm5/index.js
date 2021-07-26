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
// Define a global Maple.CACHE to collect selectors and maps on breakpoint keys
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
            var styleId = prefix + "-" + key;
            var el = doc.getElementById(styleId);
            if (!!el) {
                docHead.removeChild(el);
            }
            styleElements[key] = doc.createElement('style');
            styleElements[key].setAttribute('id', styleId);
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
        if (!Maple.CACHE[cacheKey]) {
            Maple.tempCache[media] = Maple.tempCache[media] || {};
            Maple.tempCache[media] = __assign(__assign({}, Maple.tempCache[media]), (_a = {}, _a[selector] = __assign(__assign({}, (Maple.tempCache[media][selector] || {})), mapToBeCached), _a));
            Maple.CACHE[cacheKey] = 1;
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
    Maple.init = function (document, enabled, utilClassMap, whitelist, variables, isRtl, utilPrefixList, propExtensionMap) {
        if (utilClassMap === void 0) { utilClassMap = {}; }
        if (variables === void 0) { variables = Maple.variables; }
        if (isRtl === void 0) { isRtl = false; }
        if (utilPrefixList === void 0) { utilPrefixList = []; }
        if (propExtensionMap === void 0) { propExtensionMap = {}; }
        isMapleEnabled = enabled;
        if (isMapleEnabled === false) {
            return;
        }
        doc = document;
        Maple.CACHE = {};
        Maple.variables = __assign(__assign({}, Maple.variables), variables);
        MapleColorHelper.generateAlphaColors(Maple.variables.color);
        Maple.utilClassMap = __assign(__assign({}, getMapleUtilityClassMap(Maple.variables)), utilClassMap);
        Maple.utilPrefixList = __spread(getMapleUtilityVariableMap(Maple.variables), utilPrefixList);
        Maple.propExtensionMap = __assign(__assign({}, MAPLE_PROP_EXTENSION_MAP), propExtensionMap);
        Maple.breakpointMap = __assign({}, Maple.variables.breakpoint);
        Maple.setMinAndMaxBreakpoints();
        Maple.createDomElements(STYLE_ELEMENTS);
        Maple.extendProperties();
        Maple.utilClassMap = Maple.convertUtilClassMapToRtl(Maple.utilClassMap, isRtl);
        Maple.generateWhitelist(whitelist);
        this.onInit$.next(true);
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
        if (!preInitClassList.length) {
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
    Maple.CACHE = {};
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
    Maple.convertUtilClassMapToRtl = function (utilityClass, isRtl) {
        if (!isRtl) {
            return utilityClass;
        }
        var data = {};
        Object.keys(utilityClass).forEach(function (key) {
            var value = utilityClass[key];
            if (value && typeof value === 'object' && value.rtl) {
                Object.keys(value.rtl).reduce(function (rtlValue, rtlKey) {
                    rtlValue[rtlKey] = value.rtl[rtlKey];
                }, value);
            }
            if (typeof value === 'string' || typeof value === 'number') {
                if (key.includes('left')) {
                    var replacedKey = key.replace('left', 'right');
                    data[replacedKey] = value;
                }
                else if (key.includes('right')) {
                    var replacedKey = key.replace('right', 'left');
                    data[replacedKey] = value;
                }
                else {
                    data[key] = value;
                }
                if (typeof value === 'string' && value.includes('left')) {
                    data[key] = value.replace('left', 'right');
                }
                else if (typeof value === 'string' && value.includes('right')) {
                    data[key] = value.replace('right', 'left');
                }
                else if (typeof value === 'string' &&
                    key === 'transform' &&
                    value.includes('translate') &&
                    !['Y(', 'Z('].some(function (t) { return value.includes(t); })) {
                    data[key] = value
                        .split(' ')
                        .map(function (item) {
                        var splittedValue = item.split('(');
                        splittedValue[1] =
                            splittedValue[1] && splittedValue[1].startsWith('-')
                                ? splittedValue[1].replace('-', '(')
                                : splittedValue[1]
                                    ? '(-' + splittedValue[1]
                                    : '';
                        return splittedValue[0] + splittedValue[1];
                    })
                        .join(' ');
                }
            }
            else {
                var fixedUtility = Maple.convertUtilClassMapToRtl(__assign({}, value), isRtl);
                data[key] = __assign({}, fixedUtility);
            }
        });
        return data;
    };
    return Maple;
}());
export { Maple };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXBsZS8iLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRXBFLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsMEJBQTBCLEdBQzNCLE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzlELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUU5RCwrRUFBK0U7QUFDL0UsSUFBTSxVQUFVLEdBQVE7SUFDdEIsS0FBSyxFQUFFLEVBQUU7Q0FDVixDQUFDO0FBQ0YsSUFBTSxjQUFjLEdBQUcsRUFBRSxDQUFDO0FBRTFCLElBQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUNyQixJQUFNLFNBQVMsR0FBRyxHQUFHLENBQUM7QUFD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Q0FBQyxDQUFDLEVBQUUsQ0FBQzt3QkFFVCxPQUFPLGFBQWEsQ0FBQyxDQUFDLENBQUMsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzdDLENBQUMsQ0FBQzt5QkFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ2Q7YUFDRjtpQkFBTTtnQkFDTCxJQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsd0JBQXdCLGNBQzVDLEtBQUssR0FDVixLQUFLLENBQ04sQ0FBQztnQkFDRixJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFRLFlBQVksQ0FBRSxDQUFDO2FBQ2pDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUMsQ0FBQztJQXFUSixZQUFDO0NBQUEsQUF0c0JELElBc3NCQztTQXRzQlksS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTWFwbGVDb2xvckhlbHBlciB9IGZyb20gJy4vaGVscGVycy9jb2xvci5oZWxwZXInO1xuaW1wb3J0IHsgTUFQTEVfUFJPUF9FWFRFTlNJT05fTUFQIH0gZnJvbSAnLi9wcm9wZXJ0eS1leHRlbnNpb24tbWFwJztcbmltcG9ydCB7IE1hcGxlVmFyaWFibGVNb2RlbCB9IGZyb20gJy4vdHlwZXMvdmFyaWFibGVzLm1vZGVsJztcbmltcG9ydCB7XG4gIGdldE1hcGxlVXRpbGl0eUNsYXNzTWFwLFxuICBnZXRNYXBsZVV0aWxpdHlWYXJpYWJsZU1hcCxcbn0gZnJvbSAnLi91dGlsaXR5LWNsYXNzLW1hcCc7XG5pbXBvcnQgeyBNQVBMRV9WQVJfQUxFUlQgfSBmcm9tICcuL3ZhcmlhYmxlcy9hbGVydCc7XG5pbXBvcnQgeyBNQVBMRV9WQVJfQlJFQUtQT0lOVCB9IGZyb20gJy4vdmFyaWFibGVzL2JyZWFrcG9pbnQnO1xuaW1wb3J0IHsgTUFQTEVfVkFSX0JVVFRPTiB9IGZyb20gJy4vdmFyaWFibGVzL2J1dHRvbic7XG5pbXBvcnQgeyBNQVBMRV9WQVJfQ09MT1IgfSBmcm9tICcuL3ZhcmlhYmxlcy9jb2xvcic7XG5pbXBvcnQgeyBNQVBMRV9WQVJfRk9OVF9GQU1JTFkgfSBmcm9tICcuL3ZhcmlhYmxlcy9mb250LWZhbWlseSc7XG5pbXBvcnQgeyBNQVBMRV9WQVJfRk9OVF9TSVpFIH0gZnJvbSAnLi92YXJpYWJsZXMvZm9udC1zaXplJztcbmltcG9ydCB7IE1BUExFX1ZBUl9GT05UX1dFSUdIVCB9IGZyb20gJy4vdmFyaWFibGVzL2ZvbnQtd2VpZ2h0JztcbmltcG9ydCB7IE1BUExFX1ZBUl9NQVhfV0lEVEggfSBmcm9tICcuL3ZhcmlhYmxlcy9tYXgtd2lkdGgnO1xuaW1wb3J0IHsgTUFQTEVfVkFSX1NQQUNFUiB9IGZyb20gJy4vdmFyaWFibGVzL3NwYWNlcic7XG5pbXBvcnQgeyBNQVBMRV9WQVJfVFJBTlNJVElPTiB9IGZyb20gJy4vdmFyaWFibGVzL3RyYW5zaXRpb24nO1xuXG4vLyBEZWZpbmUgYSBnbG9iYWwgTWFwbGUuQ0FDSEUgdG8gY29sbGVjdCBzZWxlY3RvcnMgYW5kIG1hcHMgb24gYnJlYWtwb2ludCBrZXlzXG5jb25zdCBCUkVBS1BPSU5UOiBhbnkgPSB7XG4gIG1lZGlhOiB7fSxcbn07XG5jb25zdCBTVFlMRV9FTEVNRU5UUyA9IHt9O1xuXG5jb25zdCBTVFJfRU1QVFkgPSAnJztcbmNvbnN0IFNUUl9TUEFDRSA9ICcgJztcbmNvbnN0IFNUUl9ET1QgPSAnLic7XG5jb25zdCBTVFJfVVAgPSAndXAnO1xuY29uc3QgU1RSX0RPV04gPSAnZG93bic7XG5jb25zdCBTRVBfTUVESUEgPSAnLSc7XG5jb25zdCBTRVBfU0VMRUNUT1IgPSAnOic7XG5jb25zdCBTRVBfVVRJTF9LRVkgPSAnOic7XG5jb25zdCBTRVBfVVRJTF9WQUwgPSAnPSc7XG5jb25zdCBTRVBfTk9fU1BBQ0UgPSAnPCc7XG5jb25zdCBTRVBfT1VURVJfU1BBQ0UgPSAnPDwnO1xuY29uc3QgSU1QT1JUQU5UID0gJyEnO1xuY29uc3QgV0lMRENBUkQgPSAnKic7XG5cbmNvbnN0IFBSRUZJWF9NQVBMRV9QUk9QID0gJ18nO1xuY29uc3QgU1VGRklYX01FRElBX1VQID0gU0VQX01FRElBICsgU1RSX1VQO1xuY29uc3QgU1VGRklYX01FRElBX0RPV04gPSBTRVBfTUVESUEgKyBTVFJfRE9XTjtcblxuY29uc3QgUl9TRUxFQ1RPUl9SRVNFUlZFRCA9IC8oXFwufFxcK3xcXH58XFw8fFxcPnxcXFt8XFxdfFxcKHxcXCl8XFwhfFxcOnxcXCx8XFw9fFxcfHxcXCV8XFwjfFxcKnxcXFwifFxcLykvZztcbmNvbnN0IFJfRVNDQVBFX1JFU0VSVkVEID0gJ1xcXFwkMSc7XG5jb25zdCBSX1NFUF9OT19TUEFDRSA9IC9cXDwvZztcbmNvbnN0IFJfU0VQX1NFTF9TUEFDRSA9IC9cXD5cXD4vZztcbmNvbnN0IFJfU0VQX1NFTF9TUEFDRV9BTEwgPSAvKFxcPHxcXD5cXD4pL2c7XG5jb25zdCBSX1NFUF9WQUxfU1BBQ0UgPSAvXFx8L2c7XG5jb25zdCBSX1NFUF9VVElMX1ZBTCA9IC89KD86Lig/IT0pKSskLztcbmNvbnN0IFJfU0VQX1VUSUxfS0VZID0gL1xcOig/Oi4oPyFcXDopKSskLztcbmNvbnN0IFJfQ1VTVE9NID0gL1xcKCguKj8pXFwpLztcbmNvbnN0IFJfV0lMRENBUkQgPSAvXFwqL2c7XG5jb25zdCBSX0VYVFJBQ1RfQ0xBU1MgPSAvY2xhc3NcXD1cXFwiKFtcXHNcXFNdKz8pXFxcIi9nO1xuY29uc3QgUl9VTklGSVkgPSAvXFw9KD89W14uXSokKS87XG5cbmxldCBwcmVJbml0Q2xhc3NMaXN0ID0gW107XG5sZXQgaXNNYXBsZUVuYWJsZWQgPSB0cnVlO1xubGV0IGRvYztcblxuY29uc3QgZXNjID0gKHNlbGVjdG9yOiBzdHJpbmcpID0+XG4gIHNlbGVjdG9yLnJlcGxhY2UoUl9TRUxFQ1RPUl9SRVNFUlZFRCwgUl9FU0NBUEVfUkVTRVJWRUQpO1xuXG5leHBvcnQgY2xhc3MgTWFwbGUge1xuICBwcml2YXRlIHN0YXRpYyBDQUNIRSA9IHt9O1xuICBwcml2YXRlIHN0YXRpYyB2YXJpYWJsZXM6IE1hcGxlVmFyaWFibGVNb2RlbCA9IHtcbiAgICBicmVha3BvaW50OiBNQVBMRV9WQVJfQlJFQUtQT0lOVCxcbiAgICBjb2xvcjogTUFQTEVfVkFSX0NPTE9SLFxuICAgIGZvbnRGYW1pbHk6IE1BUExFX1ZBUl9GT05UX0ZBTUlMWSxcbiAgICBmb250U2l6ZTogTUFQTEVfVkFSX0ZPTlRfU0laRSxcbiAgICBmb250V2VpZ2h0OiBNQVBMRV9WQVJfRk9OVF9XRUlHSFQsXG4gICAgbWF4V2lkdGg6IE1BUExFX1ZBUl9NQVhfV0lEVEgsXG4gICAgc3BhY2VyOiBNQVBMRV9WQVJfU1BBQ0VSLFxuICAgIHRyYW5zaXRpb246IE1BUExFX1ZBUl9UUkFOU0lUSU9OLFxuICAgIGJ1dHRvbjogTUFQTEVfVkFSX0JVVFRPTixcbiAgICBhbGVydDogTUFQTEVfVkFSX0FMRVJULFxuICB9O1xuICBwcml2YXRlIHN0YXRpYyBicmVha3BvaW50TWFwOiBhbnkgPSB7fTtcbiAgcHJpdmF0ZSBzdGF0aWMgdXRpbENsYXNzTWFwOiBhbnkgPSB7fTtcbiAgcHJpdmF0ZSBzdGF0aWMgdXRpbFByZWZpeExpc3Q6IEFycmF5PGFueT4gPSBbXTtcbiAgcHJpdmF0ZSBzdGF0aWMgcHJvcEV4dGVuc2lvbk1hcDogYW55ID0ge307XG4gIHByaXZhdGUgc3RhdGljIHJhd0NhY2hlOiBhbnkgPSB7fTtcbiAgcHJpdmF0ZSBzdGF0aWMgdGVtcENhY2hlOiBhbnkgPSB7fTtcbiAgcHVibGljIHN0YXRpYyBvblN0eWxlQXBwZW5kJDogQmVoYXZpb3JTdWJqZWN0PGFueT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFxuICAgIG51bGwsXG4gICk7XG4gIHB1YmxpYyBzdGF0aWMgb25Jbml0JDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICAvLyBGaW5kIG1pbiBhbmQgbWF4IGJyZWFrcG9pbnRzXG4gIHByaXZhdGUgc3RhdGljIHNldE1pbkFuZE1heEJyZWFrcG9pbnRzKCkge1xuICAgIGNvbnN0IGJyZWFrcG9pbnRLZXlzOiBBcnJheTxzdHJpbmc+ID0gT2JqZWN0LmtleXMoTWFwbGUuYnJlYWtwb2ludE1hcCk7XG4gICAgY29uc3QgYnJlYWtwb2ludHMgPSBicmVha3BvaW50S2V5c1xuICAgICAgLm1hcCgoa2V5KSA9PiAoe1xuICAgICAgICBrZXksXG4gICAgICAgIHNpemU6IHBhcnNlRmxvYXQoTWFwbGUuYnJlYWtwb2ludE1hcFtrZXldKSxcbiAgICAgIH0pKVxuICAgICAgLnNvcnQoKGEsIGIpID0+IGEuc2l6ZSAtIGIuc2l6ZSk7XG5cbiAgICBCUkVBS1BPSU5ULm1pbktleSA9IGJyZWFrcG9pbnRzWzBdLmtleTtcbiAgICBCUkVBS1BPSU5ULm1heEtleSA9IGJyZWFrcG9pbnRzW2JyZWFrcG9pbnRzLmxlbmd0aCAtIDFdLmtleTtcbiAgICBCUkVBS1BPSU5ULm1pbk1lZGlhID0gQlJFQUtQT0lOVC5taW5LZXkgKyBTVUZGSVhfTUVESUFfVVA7XG5cbiAgICBicmVha3BvaW50cy5mb3JFYWNoKChicDogYW55LCBpOiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IG5leHQgPSBicmVha3BvaW50c1tpICsgMV07XG4gICAgICBCUkVBS1BPSU5ULm1lZGlhW2JwLmtleSArIFNVRkZJWF9NRURJQV9VUF0gPSBicC5zaXplO1xuICAgICAgaWYgKG5leHQpIHtcbiAgICAgICAgLy8gVXNlcyAwLjAycHggcmF0aGVyIHRoYW4gMC4wMXB4IHRvIHdvcmsgYXJvdW5kIGEgY3VycmVudCByb3VuZGluZyBidWcgaW4gU2FmYXJpLlxuICAgICAgICAvLyBTZWUgaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTE3ODI2MVxuICAgICAgICBCUkVBS1BPSU5ULm1lZGlhW2JwLmtleSArIFNVRkZJWF9NRURJQV9ET1dOXSA9IG5leHQuc2l6ZSAtIDAuMDI7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZURvbUVsZW1lbnRzKFxuICAgIHN0eWxlRWxlbWVudHM6IGFueSxcbiAgICBwcmVmaXggPSAnbWFwbGUnLFxuICAgIGRvY3VtZW50PyxcbiAgKSB7XG4gICAgLy8gUHJlcGFyZSBzdHlsZSBlbGVtZW50IG9uIGhlYWRcbiAgICBjb25zdCBkb2NIZWFkID0gKGRvY3VtZW50IHx8IGRvYykuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcbiAgICBjb25zdCBicmVha3BvaW50cyA9IE9iamVjdC5rZXlzKEJSRUFLUE9JTlQubWVkaWEpXG4gICAgICAuc29ydCgoYSwgYikgPT4gQlJFQUtQT0lOVC5tZWRpYVthXSAtIEJSRUFLUE9JTlQubWVkaWFbYl0pXG4gICAgICAuc29ydCgoYSwgYikgPT4gYS5pbmRleE9mKFNVRkZJWF9NRURJQV9VUCkpO1xuXG4gICAgYnJlYWtwb2ludHNcbiAgICAgIC5zbGljZShicmVha3BvaW50cy5pbmRleE9mKEJSRUFLUE9JTlQubWluTWVkaWEpLCBicmVha3BvaW50cy5sZW5ndGgpXG4gICAgICAuY29uY2F0KGJyZWFrcG9pbnRzLnNsaWNlKDAsIGJyZWFrcG9pbnRzLmluZGV4T2YoQlJFQUtQT0lOVC5taW5NZWRpYSkpKVxuICAgICAgLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBjb25zdCBzdHlsZUlkID0gYCR7cHJlZml4fS0ke2tleX1gO1xuICAgICAgICBjb25zdCBlbCA9IGRvYy5nZXRFbGVtZW50QnlJZChzdHlsZUlkKTtcbiAgICAgICAgaWYgKCEhZWwpIHtcbiAgICAgICAgICBkb2NIZWFkLnJlbW92ZUNoaWxkKGVsKTtcbiAgICAgICAgfVxuICAgICAgICBzdHlsZUVsZW1lbnRzW2tleV0gPSAoZG9jIGFzIERvY3VtZW50KS5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgICAoc3R5bGVFbGVtZW50c1trZXldIGFzIEhUTUxFbGVtZW50KS5zZXRBdHRyaWJ1dGUoJ2lkJywgc3R5bGVJZCk7XG4gICAgICAgIGRvY0hlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50c1trZXldKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgZXh0ZW5kUHJvcGVydGllcygpIHtcbiAgICBNYXBsZS51dGlsUHJlZml4TGlzdC5mb3JFYWNoKChkZWY6IGFueSkgPT4ge1xuICAgICAgTWFwbGUudXRpbENsYXNzTWFwW2RlZi5wcmVmaXhdID0gTWFwbGUudXRpbENsYXNzTWFwW2RlZi5wcmVmaXhdIHx8IHt9O1xuICAgICAgTWFwbGUudXRpbENsYXNzTWFwW2RlZi5wcmVmaXhdW1dJTERDQVJEXSA9IHt9O1xuICAgICAgT2JqZWN0LmtleXMoZGVmLm1hcCkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIE1hcGxlLnV0aWxDbGFzc01hcFtkZWYucHJlZml4XVtrZXldID0ge307XG4gICAgICAgIGRlZi5wcm9wcy5mb3JFYWNoKChwcm9wKSA9PiB7XG4gICAgICAgICAgTWFwbGUudXRpbENsYXNzTWFwW2RlZi5wcmVmaXhdW1dJTERDQVJEXSA9IHtcbiAgICAgICAgICAgIC4uLk1hcGxlLnV0aWxDbGFzc01hcFtkZWYucHJlZml4XVtXSUxEQ0FSRF0sXG4gICAgICAgICAgICBbcHJvcF06IFdJTERDQVJELFxuICAgICAgICAgIH07XG4gICAgICAgICAgTWFwbGUudXRpbENsYXNzTWFwW2RlZi5wcmVmaXhdW2tleV1bcHJvcF0gPSBkZWYubWFwW2tleV07XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBnZXRTZWxlY3RvcnMoXG4gICAgbWVkaWE6IHN0cmluZyA9IFNUUl9FTVBUWSxcbiAgICBzZWxLZXk6IHN0cmluZyA9IFNUUl9FTVBUWSxcbiAgICB1dGlsS2V5OiBzdHJpbmcgPSBTVFJfRU1QVFksXG4gICAgdXRpbFZhbDogc3RyaW5nID0gU1RSX0VNUFRZLFxuICAgIF9zZWxlY3Rvcjogc3RyaW5nID0gU1RSX0VNUFRZLFxuICAgIGltcG9ydGFudCA9IGZhbHNlLFxuICApIHtcbiAgICBjb25zdCBtYXBsZSA9IE1hcGxlLnV0aWxDbGFzc01hcFtzZWxLZXldIHx8IHt9O1xuICAgIF9zZWxlY3RvciA9IChtYXBsZS5fc2VsZWN0b3IgfHwgJycpICsgX3NlbGVjdG9yO1xuXG4gICAgY29uc3QgcGFyZW50U2VsZWN0b3IgPSBzZWxLZXkuaW5jbHVkZXMoU0VQX09VVEVSX1NQQUNFKVxuICAgICAgPyBzZWxLZXkuc3BsaXQoU0VQX09VVEVSX1NQQUNFKS5wb3AoKS5zcGxpdChSX1NFUF9TRUxfU1BBQ0VfQUxMKS5zaGlmdCgpXG4gICAgICA6IFNUUl9FTVBUWTtcblxuICAgIGNvbnN0IGJhc2VTZWwgPSBbXG4gICAgICBtZWRpYSB8fCBTVFJfRU1QVFksXG4gICAgICBtYXBsZS5fc2VsZWN0b3IgPyBTRVBfU0VMRUNUT1IgOiBTVFJfRU1QVFksXG4gICAgICBzZWxLZXksXG4gICAgICB1dGlsS2V5ID8gU0VQX1VUSUxfS0VZIDogU1RSX0VNUFRZLFxuICAgICAgdXRpbEtleSxcbiAgICAgIHV0aWxWYWwgPyBTRVBfVVRJTF9WQUwgOiBTVFJfRU1QVFksXG4gICAgXS5qb2luKFNUUl9FTVBUWSk7XG5cbiAgICByZXR1cm4gX3NlbGVjdG9yXG4gICAgICAuc3BsaXQoLyxcXHMqLylcbiAgICAgIC5tYXAoKHNlbGVjdG9yKSA9PlxuICAgICAgICBbXG4gICAgICAgICAgcGFyZW50U2VsZWN0b3IgPyBwYXJlbnRTZWxlY3RvciArIFNUUl9TUEFDRSA6IFNUUl9FTVBUWSxcbiAgICAgICAgICB1dGlsVmFsID8gU1RSX0RPVCA6IFNUUl9FTVBUWSxcbiAgICAgICAgICB1dGlsVmFsID8gZXNjKGJhc2VTZWwgKyB1dGlsVmFsKSA6IGBbY2xhc3MqPVwiJHtiYXNlU2VsfVwiXWAsXG4gICAgICAgICAgdXRpbFZhbCAmJiBpbXBvcnRhbnQgPyBlc2MoSU1QT1JUQU5UKSA6IFNUUl9FTVBUWSxcbiAgICAgICAgICBtYXBsZS5fc2VsZWN0b3IgfHwgIXNlbEtleSB8fCBzZWxLZXkuY2hhckF0KDApID09PSBTRVBfTk9fU1BBQ0VcbiAgICAgICAgICAgID8gU1RSX0VNUFRZXG4gICAgICAgICAgICA6IFNUUl9TUEFDRSxcbiAgICAgICAgICBtYXBsZS5fc2VsZWN0b3JcbiAgICAgICAgICAgID8gU1RSX0VNUFRZXG4gICAgICAgICAgICA6IHNlbEtleVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKFNFUF9PVVRFUl9TUEFDRSArIHBhcmVudFNlbGVjdG9yLCBTVFJfRU1QVFkpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoUl9TRVBfU0VMX1NQQUNFLCBTVFJfU1BBQ0UpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoUl9TRVBfTk9fU1BBQ0UsIFNUUl9FTVBUWSksXG4gICAgICAgICAgc2VsZWN0b3IudHJpbSgpLmNoYXJBdCgwKSA9PT0gU0VQX05PX1NQQUNFID8gU1RSX0VNUFRZIDogU1RSX1NQQUNFLFxuICAgICAgICAgIHNlbGVjdG9yXG4gICAgICAgICAgICAudHJpbSgpXG4gICAgICAgICAgICAucmVwbGFjZShSX1NFUF9TRUxfU1BBQ0UsIFNUUl9TUEFDRSlcbiAgICAgICAgICAgIC5yZXBsYWNlKFJfU0VQX05PX1NQQUNFLCBTVFJfRU1QVFkpLFxuICAgICAgICBdLmpvaW4oU1RSX0VNUFRZKSxcbiAgICAgIClcbiAgICAgIC5qb2luKCcsJyk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBjYWNoZShtZWRpYTogc3RyaW5nLCBzZWxlY3Rvcjogc3RyaW5nLCBtYXBUb0JlQ2FjaGVkOiBhbnkpIHtcbiAgICBpZiAoIW1hcFRvQmVDYWNoZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUHJvcGVydHkgbWFwIG5vdCBmb3VuZCBmb3Igc2VsZWN0b3I6ICR7c2VsZWN0b3J9YCk7XG4gICAgfVxuXG4gICAgY29uc3QgY2FjaGVLZXkgPSBgJHttZWRpYX0ke3NlbGVjdG9yfSR7SlNPTi5zdHJpbmdpZnkobWFwVG9CZUNhY2hlZCl9YDtcbiAgICBpZiAoIU1hcGxlLkNBQ0hFW2NhY2hlS2V5XSkge1xuICAgICAgTWFwbGUudGVtcENhY2hlW21lZGlhXSA9IE1hcGxlLnRlbXBDYWNoZVttZWRpYV0gfHwge307XG4gICAgICBNYXBsZS50ZW1wQ2FjaGVbbWVkaWFdID0ge1xuICAgICAgICAuLi5NYXBsZS50ZW1wQ2FjaGVbbWVkaWFdLFxuICAgICAgICBbc2VsZWN0b3JdOiB7XG4gICAgICAgICAgLi4uKE1hcGxlLnRlbXBDYWNoZVttZWRpYV1bc2VsZWN0b3JdIHx8IHt9KSxcbiAgICAgICAgICAuLi5tYXBUb0JlQ2FjaGVkLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICAgIE1hcGxlLkNBQ0hFW2NhY2hlS2V5XSA9IDE7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgc3R5bGVzKG1lZGlhOiBzdHJpbmcpIHtcbiAgICBjb25zdCBjYWNoZUl0ZW0gPSBNYXBsZS50ZW1wQ2FjaGVbbWVkaWFdO1xuICAgIGlmICghY2FjaGVJdGVtKSB7XG4gICAgICByZXR1cm4gU1RSX0VNUFRZO1xuICAgIH1cblxuICAgIGNvbnN0IHNlbGVjdG9ycyA9IE9iamVjdC5rZXlzKGNhY2hlSXRlbSk7XG5cbiAgICBpZiAoc2VsZWN0b3JzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIFNUUl9FTVBUWTtcbiAgICB9XG5cbiAgICBjb25zdCBicmVha3BvaW50UGFydHMgPSBtZWRpYS5zcGxpdChTRVBfTUVESUEpO1xuICAgIGNvbnN0IGJyZWFrcG9pbnREaXIgPSBicmVha3BvaW50UGFydHNbMV07XG4gICAgY29uc3QgbWVkaWFRdWVyeSA9IGJyZWFrcG9pbnREaXIgPT09IFNUUl9VUCA/ICdtaW4td2lkdGgnIDogJ21heC13aWR0aCc7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG5cbiAgICAvLyBvcGVuIG1lZGlhIHF1ZXJ5XG4gICAgaWYgKG1lZGlhICE9PSBCUkVBS1BPSU5ULm1pbk1lZGlhKSB7XG4gICAgICByZXN1bHQucHVzaChgQG1lZGlhICgke21lZGlhUXVlcnl9OiAke0JSRUFLUE9JTlQubWVkaWFbbWVkaWFdfXB4KSB7YCk7XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBzZWxlY3RvciBvZiBzZWxlY3RvcnMpIHtcbiAgICAgIGNvbnN0IHByb3BNYXAgPSBjYWNoZUl0ZW1bc2VsZWN0b3JdO1xuICAgICAgaWYgKCFwcm9wTWFwKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwcm9wTWFwS2V5cyA9IE9iamVjdC5rZXlzKHByb3BNYXApLmZpbHRlcigocCkgPT4gcCAhPT0gSU1QT1JUQU5UKTtcbiAgICAgIGlmIChwcm9wTWFwS2V5cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIG9wZW4gc2VsZWN0b3JcbiAgICAgIHJlc3VsdC5wdXNoKGAke3NlbGVjdG9yfXtgKTtcblxuICAgICAgLy8gZmlsbCBzZWxlY3RvciB3aXRoIHByb3BlcnRpZXNcbiAgICAgIGZvciAoY29uc3QgcHJvcCBvZiBwcm9wTWFwS2V5cykge1xuICAgICAgICBjb25zdCB2YWwgPSBwcm9wTWFwW3Byb3BdLnRvU3RyaW5nKCk7XG4gICAgICAgIGNvbnN0IGltcG9ydGFudCA9XG4gICAgICAgICAgdmFsLmluZGV4T2YoSU1QT1JUQU5UKSA8IDAgJiYgcHJvcE1hcFtJTVBPUlRBTlRdXG4gICAgICAgICAgICA/ICcgIWltcG9ydGFudCdcbiAgICAgICAgICAgIDogU1RSX0VNUFRZO1xuICAgICAgICByZXN1bHQucHVzaChcbiAgICAgICAgICBNYXBsZS5wcm9wRXh0ZW5zaW9uTWFwW3Byb3BdXG4gICAgICAgICAgICA/IE1hcGxlLnByb3BFeHRlbnNpb25NYXBbcHJvcF0odmFsLCBpbXBvcnRhbnQpXG4gICAgICAgICAgICA6IGAke3Byb3B9OiR7dmFsfSR7aW1wb3J0YW50fTtgLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICAvLyBjbG9zZSBzZWxlY3RvclxuICAgICAgcmVzdWx0LnB1c2goYH1gKTtcbiAgICB9XG5cbiAgICAvLyBjbG9zZSBtZWRpYSBxdWVyeVxuICAgIGlmIChtZWRpYSAhPT0gQlJFQUtQT0lOVC5taW5NZWRpYSkge1xuICAgICAgcmVzdWx0LnB1c2goYH1gKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdC5sZW5ndGggPiAyID8gcmVzdWx0LmpvaW4oU1RSX0VNUFRZKSA6IFNUUl9FTVBUWTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGdlbmVyYXRlV2hpdGVsaXN0KHdoaXRlbGlzdDogQXJyYXk8c3RyaW5nPiA9IFtdKSB7XG4gICAgY29uc3QgY2xhc3NMaXN0ID0gW107XG4gICAgZm9yIChjb25zdCB1dGlsS2V5IG9mIHdoaXRlbGlzdCkge1xuICAgICAgaWYgKCFNYXBsZS51dGlsQ2xhc3NNYXBbdXRpbEtleV0pIHtcbiAgICAgICAgY2xhc3NMaXN0LnB1c2godXRpbEtleSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwcm9wcyA9IE9iamVjdC5rZXlzKE1hcGxlLnV0aWxDbGFzc01hcFt1dGlsS2V5XSk7XG4gICAgICBmb3IgKGNvbnN0IHV0aWxWYWwgb2YgcHJvcHMpIHtcbiAgICAgICAgaWYgKHV0aWxWYWwuY2hhckF0KDApID09PSBQUkVGSVhfTUFQTEVfUFJPUCkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYnJlYWtwb2ludHMgPSBPYmplY3Qua2V5cyhNYXBsZS5icmVha3BvaW50TWFwKTtcbiAgICAgICAgZm9yIChjb25zdCBicCBvZiBicmVha3BvaW50cykge1xuICAgICAgICAgIGNvbnN0IG1lZGlhVXAgPSBicCArIFNVRkZJWF9NRURJQV9VUDtcbiAgICAgICAgICBjb25zdCBtZWRpYURvd24gPSBicCArIFNVRkZJWF9NRURJQV9ET1dOO1xuICAgICAgICAgIGNvbnN0IHV0aWxDbGFzcyA9IFNFUF9VVElMX0tFWSArIHV0aWxLZXkgKyBTRVBfVVRJTF9WQUwgKyB1dGlsVmFsO1xuICAgICAgICAgIGlmIChtZWRpYVVwIGluIEJSRUFLUE9JTlQubWVkaWEpIHtcbiAgICAgICAgICAgIGNsYXNzTGlzdC5wdXNoKG1lZGlhVXAgKyB1dGlsQ2xhc3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobWVkaWFEb3duIGluIEJSRUFLUE9JTlQubWVkaWEpIHtcbiAgICAgICAgICAgIGNsYXNzTGlzdC5wdXNoKG1lZGlhRG93biArIHV0aWxDbGFzcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIE1hcGxlLmZseShwcmVJbml0Q2xhc3NMaXN0LmNvbmNhdChjbGFzc0xpc3QpKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIHNwbGl0TGFzdE9jY3VycmVuY2Uoc3RyLCBrZXkpIHtcbiAgICBjb25zdCBwb3MgPSBzdHIubGFzdEluZGV4T2Yoa2V5KTtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICBjb25zdCBmaXJzdFBhcnQgPSBzdHIuc3Vic3RyaW5nKDAsIHBvcyk7XG4gICAgY29uc3QgbGFzdFBhcnQgPSBzdHIuc3Vic3RyaW5nKHBvcyArIGtleS5sZW5ndGgpO1xuICAgIGlmIChmaXJzdFBhcnQpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGZpcnN0UGFydCk7XG4gICAgfVxuICAgIGlmIChsYXN0UGFydCkge1xuICAgICAgcmVzdWx0LnB1c2gobGFzdFBhcnQpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgc3BsaXRGaXJzdE9jY3VycmVuY2Uoc3RyLCBrZXkpIHtcbiAgICBjb25zdCBwb3MgPSBzdHIuaW5kZXhPZihrZXkpO1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgIGNvbnN0IGZpcnN0UGFydCA9IHN0ci5zdWJzdHJpbmcoMCwgcG9zKTtcbiAgICBjb25zdCBsYXN0UGFydCA9IHN0ci5zdWJzdHJpbmcocG9zICsga2V5Lmxlbmd0aCk7XG4gICAgaWYgKGZpcnN0UGFydCkge1xuICAgICAgcmVzdWx0LnB1c2goZmlyc3RQYXJ0KTtcbiAgICB9XG4gICAgaWYgKGxhc3RQYXJ0KSB7XG4gICAgICByZXN1bHQucHVzaChsYXN0UGFydCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGluaXQoXG4gICAgZG9jdW1lbnQsXG4gICAgZW5hYmxlZDogYm9vbGVhbixcbiAgICB1dGlsQ2xhc3NNYXA6IGFueSA9IHt9LFxuICAgIHdoaXRlbGlzdDogQXJyYXk8c3RyaW5nPixcbiAgICB2YXJpYWJsZXM6IE1hcGxlVmFyaWFibGVNb2RlbCA9IE1hcGxlLnZhcmlhYmxlcyxcbiAgICBpc1J0bDogYm9vbGVhbiA9IGZhbHNlLFxuICAgIHV0aWxQcmVmaXhMaXN0OiBBcnJheTxhbnk+ID0gW10sXG4gICAgcHJvcEV4dGVuc2lvbk1hcDogYW55ID0ge31cbiAgKSB7XG4gICAgaXNNYXBsZUVuYWJsZWQgPSBlbmFibGVkO1xuICAgIGlmIChpc01hcGxlRW5hYmxlZCA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZG9jID0gZG9jdW1lbnQ7XG4gICAgTWFwbGUuQ0FDSEUgPSB7fTtcbiAgICBNYXBsZS52YXJpYWJsZXMgPSB7XG4gICAgICAuLi5NYXBsZS52YXJpYWJsZXMsXG4gICAgICAuLi52YXJpYWJsZXMsXG4gICAgfTtcbiAgICBNYXBsZUNvbG9ySGVscGVyLmdlbmVyYXRlQWxwaGFDb2xvcnMoTWFwbGUudmFyaWFibGVzLmNvbG9yKTtcbiAgICBNYXBsZS51dGlsQ2xhc3NNYXAgPSB7XG4gICAgICAuLi5nZXRNYXBsZVV0aWxpdHlDbGFzc01hcChNYXBsZS52YXJpYWJsZXMpLFxuICAgICAgLi4udXRpbENsYXNzTWFwLFxuICAgIH07XG4gICAgTWFwbGUudXRpbFByZWZpeExpc3QgPSBbXG4gICAgICAuLi5nZXRNYXBsZVV0aWxpdHlWYXJpYWJsZU1hcChNYXBsZS52YXJpYWJsZXMpLFxuICAgICAgLi4udXRpbFByZWZpeExpc3QsXG4gICAgXTtcbiAgICBNYXBsZS5wcm9wRXh0ZW5zaW9uTWFwID0ge1xuICAgICAgLi4uTUFQTEVfUFJPUF9FWFRFTlNJT05fTUFQLFxuICAgICAgLi4ucHJvcEV4dGVuc2lvbk1hcCxcbiAgICB9O1xuICAgIE1hcGxlLmJyZWFrcG9pbnRNYXAgPSB7XG4gICAgICAuLi5NYXBsZS52YXJpYWJsZXMuYnJlYWtwb2ludCxcbiAgICB9O1xuICAgIE1hcGxlLnNldE1pbkFuZE1heEJyZWFrcG9pbnRzKCk7XG4gICAgTWFwbGUuY3JlYXRlRG9tRWxlbWVudHMoU1RZTEVfRUxFTUVOVFMpO1xuICAgIE1hcGxlLmV4dGVuZFByb3BlcnRpZXMoKTtcbiAgICBNYXBsZS51dGlsQ2xhc3NNYXAgPSBNYXBsZS5jb252ZXJ0VXRpbENsYXNzTWFwVG9SdGwoXG4gICAgICBNYXBsZS51dGlsQ2xhc3NNYXAsXG4gICAgICBpc1J0bFxuICAgICk7XG4gICAgTWFwbGUuZ2VuZXJhdGVXaGl0ZWxpc3Qod2hpdGVsaXN0KTtcbiAgICB0aGlzLm9uSW5pdCQubmV4dCh0cnVlKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZmluZEFuZEZseShzdHI6IHN0cmluZykge1xuICAgIGlmIChpc01hcGxlRW5hYmxlZCA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHN0cikge1xuICAgICAgTWFwbGUuZmx5KFxuICAgICAgICAoc3RyLm1hdGNoKFJfRVhUUkFDVF9DTEFTUykgfHwgW10pXG4gICAgICAgICAgLmpvaW4oJyAnKVxuICAgICAgICAgIC5yZXBsYWNlKC9jbGFzc1xcPVxcXCIvZywgJycpXG4gICAgICAgICAgLnJlcGxhY2UoL1wiL2csICcnKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNvbnZlcnRVdGlsQ2xhc3NNYXBUb1J0bCA9ICh1dGlsaXR5Q2xhc3MsIGlzUnRsKSA9PiB7XG4gICAgaWYgKCFpc1J0bCkge1xuICAgICAgcmV0dXJuIHV0aWxpdHlDbGFzcztcbiAgICB9XG4gICAgY29uc3QgZGF0YSA9IHt9O1xuICAgIE9iamVjdC5rZXlzKHV0aWxpdHlDbGFzcykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHV0aWxpdHlDbGFzc1trZXldO1xuICAgICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUucnRsKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKHZhbHVlLnJ0bCkucmVkdWNlKChydGxWYWx1ZSwgcnRsS2V5KSA9PiB7XG4gICAgICAgICAgcnRsVmFsdWVbcnRsS2V5XSA9IHZhbHVlLnJ0bFtydGxLZXldO1xuICAgICAgICB9LCB2YWx1ZSk7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICAgIGlmIChrZXkuaW5jbHVkZXMoJ2xlZnQnKSkge1xuICAgICAgICAgIGNvbnN0IHJlcGxhY2VkS2V5ID0ga2V5LnJlcGxhY2UoJ2xlZnQnLCAncmlnaHQnKTtcbiAgICAgICAgICBkYXRhW3JlcGxhY2VkS2V5XSA9IHZhbHVlO1xuICAgICAgICB9IGVsc2UgaWYgKGtleS5pbmNsdWRlcygncmlnaHQnKSkge1xuICAgICAgICAgIGNvbnN0IHJlcGxhY2VkS2V5ID0ga2V5LnJlcGxhY2UoJ3JpZ2h0JywgJ2xlZnQnKTtcbiAgICAgICAgICBkYXRhW3JlcGxhY2VkS2V5XSA9IHZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRhdGFba2V5XSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHZhbHVlLmluY2x1ZGVzKCdsZWZ0JykpIHtcbiAgICAgICAgICBkYXRhW2tleV0gPSB2YWx1ZS5yZXBsYWNlKCdsZWZ0JywgJ3JpZ2h0Jyk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiB2YWx1ZS5pbmNsdWRlcygncmlnaHQnKSkge1xuICAgICAgICAgIGRhdGFba2V5XSA9IHZhbHVlLnJlcGxhY2UoJ3JpZ2h0JywgJ2xlZnQnKTtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmXG4gICAgICAgICAga2V5ID09PSAndHJhbnNmb3JtJyAmJlxuICAgICAgICAgIHZhbHVlLmluY2x1ZGVzKCd0cmFuc2xhdGUnKSAmJlxuICAgICAgICAgICFbJ1koJywgJ1ooJ10uc29tZSgodCkgPT4gdmFsdWUuaW5jbHVkZXModCkpXG4gICAgICAgICkge1xuICAgICAgICAgIGRhdGFba2V5XSA9IHZhbHVlXG4gICAgICAgICAgICAuc3BsaXQoJyAnKVxuICAgICAgICAgICAgLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBzcGxpdHRlZFZhbHVlID0gaXRlbS5zcGxpdCgnKCcpO1xuICAgICAgICAgICAgICBzcGxpdHRlZFZhbHVlWzFdID1cbiAgICAgICAgICAgICAgICBzcGxpdHRlZFZhbHVlWzFdICYmIHNwbGl0dGVkVmFsdWVbMV0uc3RhcnRzV2l0aCgnLScpXG4gICAgICAgICAgICAgICAgICA/IHNwbGl0dGVkVmFsdWVbMV0ucmVwbGFjZSgnLScsICcoJylcbiAgICAgICAgICAgICAgICAgIDogc3BsaXR0ZWRWYWx1ZVsxXVxuICAgICAgICAgICAgICAgICAgPyAnKC0nICsgc3BsaXR0ZWRWYWx1ZVsxXVxuICAgICAgICAgICAgICAgICAgOiAnJztcblxuICAgICAgICAgICAgICByZXR1cm4gc3BsaXR0ZWRWYWx1ZVswXSArIHNwbGl0dGVkVmFsdWVbMV07XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmpvaW4oJyAnKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZml4ZWRVdGlsaXR5ID0gTWFwbGUuY29udmVydFV0aWxDbGFzc01hcFRvUnRsKFxuICAgICAgICAgIHsgLi4udmFsdWUgfSxcbiAgICAgICAgICBpc1J0bFxuICAgICAgICApO1xuICAgICAgICBkYXRhW2tleV0gPSB7IC4uLmZpeGVkVXRpbGl0eSB9O1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBkYXRhO1xuICB9O1xuXG4gIHB1YmxpYyBzdGF0aWMgZmx5KGNsYXNzTGlzdDogYW55KSB7XG4gICAgaWYgKGlzTWFwbGVFbmFibGVkID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIXByZUluaXRDbGFzc0xpc3QubGVuZ3RoKSB7XG4gICAgICBwcmVJbml0Q2xhc3NMaXN0ID0gcHJlSW5pdENsYXNzTGlzdC5jb25jYXQoY2xhc3NMaXN0KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIWNsYXNzTGlzdCB8fCBjbGFzc0xpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcmF3Q2FjaGVLZXkgPSBBcnJheS5pc0FycmF5KGNsYXNzTGlzdClcbiAgICAgID8gY2xhc3NMaXN0LmpvaW4oJyAnKVxuICAgICAgOiBjbGFzc0xpc3Q7XG5cbiAgICBpZiAoTWFwbGUucmF3Q2FjaGVbcmF3Q2FjaGVLZXldKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIE1hcGxlLnJhd0NhY2hlW3Jhd0NhY2hlS2V5XSA9IDE7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY2xhc3NMaXN0KSA9PT0gZmFsc2UpIHtcbiAgICAgIGNsYXNzTGlzdCA9IGNsYXNzTGlzdC5zcGxpdCgvXFxzKy9nKTtcbiAgICB9XG5cbiAgICBjbGFzc0xpc3QgPSBNYXBsZS51bmlmeVV0aWxpdHlDbGFzcyhjbGFzc0xpc3QpO1xuXG4gICAgTWFwbGUudGVtcENhY2hlID0ge307XG5cbiAgICBmb3IgKGNvbnN0IGNsYXNzSXRlbSBvZiBjbGFzc0xpc3QpIHtcbiAgICAgIC8vIENoZWNrIHdoZXRoZXIgdGhlIHN0eWxlcyB3aWxsIGhhdmUgIWltcG9ydGFudCBmbGFnIG9yIG5vdFxuICAgICAgY29uc3QgaW1wb3J0YW50ID0gY2xhc3NJdGVtLmNoYXJBdChjbGFzc0l0ZW0ubGVuZ3RoIC0gMSkgPT09IElNUE9SVEFOVDtcbiAgICAgIGNvbnN0IGNsYXNzSXRlbVdpdGhvdXRJbXBvcnRhbnQgPSBjbGFzc0l0ZW0ucmVwbGFjZShJTVBPUlRBTlQsIFNUUl9FTVBUWSk7XG5cbiAgICAgIGxldCBwYXJ0cyA9IE1hcGxlLnNwbGl0TGFzdE9jY3VycmVuY2UoXG4gICAgICAgIGNsYXNzSXRlbVdpdGhvdXRJbXBvcnRhbnQsXG4gICAgICAgIFNFUF9VVElMX1ZBTCxcbiAgICAgICk7XG5cbiAgICAgIC8vIEV4dHJhY3QgdXRpbGl0eSB2YWx1ZVxuICAgICAgY29uc3QgdXRpbFZhbCA9IHBhcnRzLmxlbmd0aCA9PT0gMSA/IG51bGwgOiBwYXJ0cy5wb3AoKTtcblxuICAgICAgLy8gRXh0cmFjdCBtZWRpYSBxdWVyeVxuICAgICAgY29uc3QgbWVkaWEgPVxuICAgICAgICBPYmplY3Qua2V5cyhCUkVBS1BPSU5ULm1lZGlhKS5maW5kKFxuICAgICAgICAgIChrZXk6IHN0cmluZykgPT4gY2xhc3NJdGVtLmluZGV4T2Yoa2V5KSA9PT0gMCxcbiAgICAgICAgKSB8fCBCUkVBS1BPSU5ULm1pbk1lZGlhO1xuXG4gICAgICBwYXJ0cyA9IE1hcGxlLnNwbGl0Rmlyc3RPY2N1cnJlbmNlKHBhcnRzLmpvaW4oU1RSX0VNUFRZKSwgbWVkaWEpXG4gICAgICAgIC5qb2luKFNUUl9FTVBUWSlcbiAgICAgICAgLnNwbGl0KFNFUF9VVElMX0tFWSlcbiAgICAgICAgLmZpbHRlcigocDogc3RyaW5nKSA9PiAhIXApO1xuXG4gICAgICAvLyBFeGFjdCB1dGlsaXR5IGNsYXNzXG4gICAgICBjb25zdCB1dGlsS2V5ID0gcGFydHMubGVuZ3RoID49IDEgPyBwYXJ0cy5wb3AoKSA6IG51bGw7XG5cbiAgICAgIC8vIEV4dHJhY3Qgc2VsZWN0b3JcbiAgICAgIGNvbnN0IHNlbEtleSA9IHBhcnRzLmpvaW4oU0VQX1VUSUxfS0VZKTtcblxuICAgICAgLy8gR2V0IHN0eWxlIG1hcFxuICAgICAgY29uc3QgbWFwbGUgPSBNYXBsZS51dGlsQ2xhc3NNYXBbdXRpbEtleV07XG5cbiAgICAgIC8vIFdpdGhvdXQgYSBzdHlsZSBtYXAgd2UgY2FuJ3QgY3JlYXRlIHN0eWxlc1xuICAgICAgaWYgKCFtYXBsZSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gQ2FjaGUgZGVmYXVsdCBzdHlsZXMgd2l0aCBzZWxlY3RvclxuICAgICAgaWYgKG1hcGxlLl9kZWZhdWx0KSB7XG4gICAgICAgIE9iamVjdC5rZXlzKG1hcGxlLl9kZWZhdWx0KS5mb3JFYWNoKChtZWRpYUl0ZW0pID0+IHtcbiAgICAgICAgICBNYXBsZS5jYWNoZShcbiAgICAgICAgICAgIG1lZGlhSXRlbSxcbiAgICAgICAgICAgIE1hcGxlLmdldFNlbGVjdG9ycyhcbiAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgc2VsS2V5LFxuICAgICAgICAgICAgICB1dGlsS2V5LFxuICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICBtYXBsZS5fc2VsZWN0b3IsXG4gICAgICAgICAgICAgIGltcG9ydGFudCxcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIC4uLm1hcGxlLl9jb21tb24sXG4gICAgICAgICAgICAgIC4uLm1hcGxlW21hcGxlLl9kZWZhdWx0W21lZGlhSXRlbV1dLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gQ2FjaGUgdXRpbGl0eSBzdHlsZXMgd2l0aCBzZWxlY3RvclxuICAgICAgaWYgKHV0aWxWYWwpIHtcbiAgICAgICAgY29uc3QgYyA9IGNsYXNzSXRlbS5yZXBsYWNlKElNUE9SVEFOVCwgU1RSX0VNUFRZKTtcbiAgICAgICAgY29uc3QgdWNtID0gTWFwbGUudXRpbENsYXNzTWFwO1xuXG4gICAgICAgIC8vI3JlZ2lvbiBXaWxkY2FyZCBzZWxlY3RvcnNcbiAgICAgICAgLy8gKjp1dGlsLWtleVxuICAgICAgICAvLyAqOnV0aWwta2V5PXV0aWwtdmFsXG4gICAgICAgIC8vICouc2VsZWN0b3I6dXRpbC1rZXk9dXRpbC12YWxcbiAgICAgICAgLy8gKjpzZWxlY3Rvci1rZXk6dXRpbC1rZXk9dXRpbC12YWxcbiAgICAgICAgY29uc3Qgd2NNZWRpYSA9IGMucmVwbGFjZShtZWRpYSwgV0lMRENBUkQpO1xuXG4gICAgICAgIC8vIG1lZGlhOipcbiAgICAgICAgLy8gbWVkaWEuc2VsZWN0b3I6KlxuICAgICAgICAvLyBtZWRpYTpzZWxlY3Rvci1rZXk6KlxuICAgICAgICBjb25zdCB3Y3V0aWxLZXkgPSBjLnJlcGxhY2UoUl9TRVBfVVRJTF9LRVksIGA6JHtXSUxEQ0FSRH1gKTtcblxuICAgICAgICAvLyBtZWRpYTp1dGlsLWtleT0qXG4gICAgICAgIC8vIG1lZGlhLnNlbGVjdG9yOnV0aWwta2V5PSpcbiAgICAgICAgLy8gbWVkaWE6c2VsZWN0b3Ita2V5OnV0aWwta2V5PSpcbiAgICAgICAgY29uc3Qgd2N1dGlsVmFsID0gYy5yZXBsYWNlKFJfU0VQX1VUSUxfVkFMLCBgPSR7V0lMRENBUkR9YCk7XG5cbiAgICAgICAgLy8gKjoqXG4gICAgICAgIC8vICouc2VsZWN0b3I6KlxuICAgICAgICAvLyAqOnNlbGVjdG9yLWtleToqXG4gICAgICAgIGNvbnN0IHdjTWVkaWFLZXkgPSB3Y01lZGlhLnJlcGxhY2UoUl9TRVBfVVRJTF9LRVksIGA6JHtXSUxEQ0FSRH1gKTtcblxuICAgICAgICAvLyAqOnV0aWwta2V5PSpcbiAgICAgICAgLy8gKi5zZWxlY3Rvcjp1dGlsLWtleT0qXG4gICAgICAgIC8vICo6c2VsZWN0b3Ita2V5OnV0aWwta2V5PSpcbiAgICAgICAgY29uc3Qgd2NNZWRpYVZhbCA9IHdjdXRpbFZhbC5yZXBsYWNlKG1lZGlhLCBXSUxEQ0FSRCk7XG4gICAgICAgIC8vI2VuZHJlZ2lvblxuXG4gICAgICAgIGNvbnN0IHNlbGVjdG9yID0gTWFwbGUuZ2V0U2VsZWN0b3JzKFxuICAgICAgICAgIG1lZGlhLFxuICAgICAgICAgIHNlbEtleSxcbiAgICAgICAgICB1dGlsS2V5LFxuICAgICAgICAgIHV0aWxWYWwsXG4gICAgICAgICAgbWFwbGUuX3NlbGVjdG9yLFxuICAgICAgICAgIGltcG9ydGFudCxcbiAgICAgICAgKTtcblxuICAgICAgICBNYXBsZS5jYWNoZShtZWRpYSwgc2VsZWN0b3IsIHtcbiAgICAgICAgICAuLi5tYXBsZS5fY29tbW9uLFxuICAgICAgICAgIC4uLm1hcGxlW3V0aWxWYWxdLFxuICAgICAgICAgIC4uLkpTT04ucGFyc2UoXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeShcbiAgICAgICAgICAgICAgbWFwbGVbdXRpbFZhbC5yZXBsYWNlKFJfQ1VTVE9NLCBXSUxEQ0FSRCldIHx8IHt9LFxuICAgICAgICAgICAgKS5yZXBsYWNlKFxuICAgICAgICAgICAgICBSX1dJTERDQVJELFxuICAgICAgICAgICAgICB1dGlsS2V5ID09PSAnY29udGVudCdcbiAgICAgICAgICAgICAgICA/IHV0aWxWYWwucmVwbGFjZShSX0NVU1RPTSwgJyQxJylcbiAgICAgICAgICAgICAgICA6IHV0aWxWYWwucmVwbGFjZShSX0NVU1RPTSwgJyQxJykucmVwbGFjZShSX1NFUF9WQUxfU1BBQ0UsICcgJyksXG4gICAgICAgICAgICApLFxuICAgICAgICAgICksXG4gICAgICAgICAgLi4uKHVjbVt3Y01lZGlhS2V5XSB8fCB7fSksXG4gICAgICAgICAgLi4uKHVjbVt3Y3V0aWxLZXldIHx8IHt9KSxcbiAgICAgICAgICAuLi4odWNtW3djTWVkaWFWYWxdIHx8IHt9KSxcbiAgICAgICAgICAuLi4odWNtW3djdXRpbFZhbF0gfHwge30pLFxuICAgICAgICAgIC4uLih1Y21bd2NNZWRpYV0gfHwge30pLFxuICAgICAgICAgIC4uLih1Y21bY10gfHwge30pLFxuICAgICAgICAgIFtJTVBPUlRBTlRdOiBpbXBvcnRhbnQsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vI3JlZ2lvbiBHZW5lcmF0ZSBzdHlsZXNcbiAgICAvLyBHZW5lcmF0ZSBtaW4gbWVkaWEgcXVlcnkgc3R5bGVzXG4gICAgY29uc3QgbWluTWVkaWFTdHlsZXMgPSBNYXBsZS5zdHlsZXMoQlJFQUtQT0lOVC5taW5NZWRpYSk7XG4gICAgaWYgKG1pbk1lZGlhU3R5bGVzKSB7XG4gICAgICBNYXBsZS5hcHBlbmRTdHlsZShcbiAgICAgICAgU1RZTEVfRUxFTUVOVFMsXG4gICAgICAgIEJSRUFLUE9JTlQubWluTWVkaWEsXG4gICAgICAgIG1pbk1lZGlhU3R5bGVzLFxuICAgICAgICBmYWxzZSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gR2VuZXJhdGUgbWVkaWEgcXVlcnkgc3R5bGVzXG4gICAgY29uc3QgbWVkaWFRdWVyeVN0eWxlcyA9IHt9O1xuICAgIE9iamVjdC5rZXlzKE1hcGxlLnRlbXBDYWNoZSkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBpZiAoa2V5ICE9PSBCUkVBS1BPSU5ULm1pbk1lZGlhKSB7XG4gICAgICAgIG1lZGlhUXVlcnlTdHlsZXNba2V5XSA9IG1lZGlhUXVlcnlTdHlsZXNba2V5XSB8fCAnJztcbiAgICAgICAgbWVkaWFRdWVyeVN0eWxlc1trZXldICs9IE1hcGxlLnN0eWxlcyhrZXkpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIE9iamVjdC5rZXlzKG1lZGlhUXVlcnlTdHlsZXMpLmZvckVhY2goKGtleSkgPT5cbiAgICAgIE1hcGxlLmFwcGVuZFN0eWxlKFNUWUxFX0VMRU1FTlRTLCBrZXksIG1lZGlhUXVlcnlTdHlsZXNba2V5XSwgZmFsc2UpLFxuICAgICk7XG4gICAgLy8jZW5kcmVnaW9uXG4gIH1cblxuICBwdWJsaWMgc3RhdGljIHVuaWZ5VXRpbGl0eUNsYXNzKGNsYXNzTGlzdCkge1xuICAgIGNvbnN0IGNsYXNzZXMgPSBjbGFzc0xpc3QucmVkdWNlKChhY2MsIHByZXYpID0+IHtcbiAgICAgIGNvbnN0IGV4aXN0aW5nU3R5bGVJbmRleCA9IGFjYy5maW5kSW5kZXgoXG4gICAgICAgIChwKSA9PlxuICAgICAgICAgICgocCB8fCAnJykuc3BsaXQoUl9VTklGSVkpIHx8IFtdKVswXSA9PT1cbiAgICAgICAgICAoKHByZXYgfHwgJycpLnNwbGl0KFJfVU5JRklZKSB8fCBbXSlbMF0sXG4gICAgICApO1xuICAgICAgaWYgKGV4aXN0aW5nU3R5bGVJbmRleCA8IDApIHtcbiAgICAgICAgYWNjLnB1c2gocHJldik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhY2NbZXhpc3RpbmdTdHlsZUluZGV4XSA9IHByZXY7XG4gICAgICB9XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0sIFtdKTtcbiAgICByZXR1cm4gY2xhc3NlcztcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgYXBwZW5kU3R5bGUoXG4gICAgc3R5bGVFbGVtZW50czogYW55LFxuICAgIGJwOiBzdHJpbmcsXG4gICAgc3R5bGU6IHN0cmluZyxcbiAgICBzaWxlbnQgPSB0cnVlLFxuICApIHtcbiAgICBzdHlsZUVsZW1lbnRzW2JwXS5hcHBlbmRDaGlsZChkb2MuY3JlYXRlVGV4dE5vZGUoc3R5bGUpKTtcblxuICAgIGlmICghc2lsZW50KSB7XG4gICAgICBNYXBsZS5vblN0eWxlQXBwZW5kJC5uZXh0KHsgYnAsIHN0eWxlIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaXNNZWRpYVZhbGlkKG1lZGlhOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbWVkaWEgaW4gQlJFQUtQT0lOVC5tZWRpYTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaXNCcmVha3BvaW50VmFsaWQoYnJlYWtwb2ludDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGJyZWFrcG9pbnQgaW4gTWFwbGUuYnJlYWtwb2ludE1hcDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaXNNZWRpYU1hdGNoZXNXaXRoQnJlYWtwb2ludChcbiAgICBtZWRpYTogc3RyaW5nLFxuICAgIGJyZWFrcG9pbnQ6IHN0cmluZyxcbiAgKTogYm9vbGVhbiB7XG4gICAgaWYgKCFNYXBsZS5pc0JyZWFrcG9pbnRWYWxpZChicmVha3BvaW50KSB8fCAhTWFwbGUuaXNNZWRpYVZhbGlkKG1lZGlhKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IG1lZGlhU2l6ZSA9IEJSRUFLUE9JTlQubWVkaWFbbWVkaWFdO1xuICAgIGNvbnN0IGJyZWFrcG9pbnRTaXplID0gcGFyc2VGbG9hdChNYXBsZS5icmVha3BvaW50TWFwW2JyZWFrcG9pbnRdKTtcblxuICAgIGlmIChtZWRpYS5pbmNsdWRlcyhTVUZGSVhfTUVESUFfRE9XTikpIHtcbiAgICAgIHJldHVybiBicmVha3BvaW50U2l6ZSA8PSBtZWRpYVNpemU7XG4gICAgfVxuXG4gICAgaWYgKG1lZGlhLmluY2x1ZGVzKFNVRkZJWF9NRURJQV9VUCkpIHtcbiAgICAgIHJldHVybiBicmVha3BvaW50U2l6ZSA+PSBtZWRpYVNpemU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRWYWxpZE1lZGlhTWFwKCk6IGFueSB7XG4gICAgcmV0dXJuIHsgLi4uQlJFQUtQT0lOVC5tZWRpYSB9O1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRNaW5NZWRpYSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBCUkVBS1BPSU5ULm1pbk1lZGlhO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRNaW5CcmVha3BvaW50KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIEJSRUFLUE9JTlQubWluS2V5O1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRNYXBwZWRNZWRpYU9yTWluKG1lZGlhOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBNYXBsZS5pc01lZGlhVmFsaWQobWVkaWEpID8gbWVkaWEgOiBNYXBsZS5nZXRNaW5NZWRpYSgpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRNYXBwZWRNZWRpYU9yTnVsbChtZWRpYTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gTWFwbGUuaXNNZWRpYVZhbGlkKG1lZGlhKSA/IG1lZGlhIDogbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TWFwcGVkQnJlYWtwb2ludE9yTWluKGJyZWFrcG9pbnQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIE1hcGxlLmlzQnJlYWtwb2ludFZhbGlkKGJyZWFrcG9pbnQpXG4gICAgICA/IGJyZWFrcG9pbnRcbiAgICAgIDogTWFwbGUuZ2V0TWluQnJlYWtwb2ludCgpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRNYXBwZWRCcmVha3BvaW50T3JOdWxsKGJyZWFrcG9pbnQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIE1hcGxlLmlzQnJlYWtwb2ludFZhbGlkKGJyZWFrcG9pbnQpID8gYnJlYWtwb2ludCA6IG51bGw7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldFZhcmlhYmxlcygpOiBNYXBsZVZhcmlhYmxlTW9kZWwge1xuICAgIHJldHVybiB7IC4uLk1hcGxlLnZhcmlhYmxlcyB9O1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBmaWxsSW5UaGVHYXBzKGJyZWFrcG9pbnRNYXApOiBhbnkge1xuICAgIGNvbnN0IGZ1bGxCcmVha3BvaW50TWFwID0gTWFwbGUuZ2V0VmFyaWFibGVzKCkuYnJlYWtwb2ludDtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoZnVsbEJyZWFrcG9pbnRNYXApO1xuICAgIGNvbnN0IG1pbktleSA9IGtleXMuZmluZCgoa2V5KSA9PiBrZXkgaW4gYnJlYWtwb2ludE1hcCk7XG4gICAgcmV0dXJuIGtleXNcbiAgICAgIC5zb3J0KChhLCBiKSA9PiBmdWxsQnJlYWtwb2ludE1hcFthXSAtIGZ1bGxCcmVha3BvaW50TWFwW2JdKVxuICAgICAgLnJlZHVjZSgoYWNjLCBrZXksIGkpID0+IHtcbiAgICAgICAgY29uc3QgbmV4dEtleSA9IGtleXNbaSArIDFdO1xuICAgICAgICBpZiAoa2V5IGluIGFjYyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBhY2MgPSB7XG4gICAgICAgICAgICAuLi5hY2MsXG4gICAgICAgICAgICBba2V5XTpcbiAgICAgICAgICAgICAga2V5IGluIGJyZWFrcG9pbnRNYXAgPyBicmVha3BvaW50TWFwW2tleV0gOiBicmVha3BvaW50TWFwW21pbktleV0sXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV4dEtleSAmJiAhYnJlYWtwb2ludE1hcFtuZXh0S2V5XSkge1xuICAgICAgICAgIGFjYyA9IHtcbiAgICAgICAgICAgIC4uLmFjYyxcbiAgICAgICAgICAgIFtuZXh0S2V5XTogYWNjW2tleV0sXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgfSwge30pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpc0JyZWFrcG9pbnRNYXAoYnJlYWtwb2ludE1hcCk6IGFueSB7XG4gICAgaWYgKHR5cGVvZiBicmVha3BvaW50TWFwID09PSAnb2JqZWN0JyAmJiBicmVha3BvaW50TWFwICE9PSBudWxsKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXMoTWFwbGUuZ2V0VmFyaWFibGVzKCkuYnJlYWtwb2ludCkuc29tZShcbiAgICAgICAgKGtleSkgPT4gYnJlYWtwb2ludE1hcCAmJiBrZXkgaW4gYnJlYWtwb2ludE1hcCxcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIl19