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
        var breakpoints = Object.keys(BREAKPOINT.media).sort(function (a, b) { return BREAKPOINT.media[a] - BREAKPOINT.media[b]; });
        var breakpointsUp = breakpoints.filter(function (key) {
            return key.includes(SUFFIX_MEDIA_UP);
        });
        var breakpointsDown = breakpoints.filter(function (key) {
            return key.includes(SUFFIX_MEDIA_DOWN);
        });
        breakpointsUp.concat(breakpointsDown.reverse()).forEach(function (key) {
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
    Maple.getSelectors = function (media, selKey, utilKey, utilVal, 
    // tslint:disable-next-line: variable-name
    _selector, important) {
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
    return Maple;
}());
export { Maple };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXBsZS8iLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRXBFLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsMEJBQTBCLEdBQzNCLE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzlELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUU5RCwrRUFBK0U7QUFDL0UsSUFBTSxVQUFVLEdBQVE7SUFDdEIsS0FBSyxFQUFFLEVBQUU7Q0FDVixDQUFDO0FBQ0YsSUFBTSxjQUFjLEdBQUcsRUFBRSxDQUFDO0FBRTFCLElBQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUNyQixJQUFNLFNBQVMsR0FBRyxHQUFHLENBQUM7QUFD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QkFBZ0I7UUFDeEIsVUFBVSxFQUFFLG9CQUFvQjtRQUNoQyxNQUFNLEVBQUUsZ0JBQWdCO1FBQ3hCLEtBQUssRUFBRSxlQUFlO0tBQ3ZCLENBQUM7SUFDYSxtQkFBYSxHQUFRLEVBQUUsQ0FBQztJQUN4QixrQkFBWSxHQUFRLEVBQUUsQ0FBQztJQUN2QixvQkFBYyxHQUFlLEVBQUUsQ0FBQztJQUNoQyxzQkFBZ0IsR0FBUSxFQUFFLENBQUM7SUFDM0IsY0FBUSxHQUFRLEVBQUUsQ0FBQztJQUNuQixlQUFTLEdBQVEsRUFBRSxDQUFDO0lBQ3JCLG9CQUFjLEdBQXlCLElBQUksZUFBZSxDQUN0RSxJQUFJLENBQ0wsQ0FBQztJQUNZLGFBQU8sR0FBNkIsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7SUEwckIvRSxZQUFDO0NBQUEsQUFqdEJELElBaXRCQztTQWp0QlksS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTWFwbGVDb2xvckhlbHBlciB9IGZyb20gJy4vaGVscGVycy9jb2xvci5oZWxwZXInO1xuaW1wb3J0IHsgTUFQTEVfUFJPUF9FWFRFTlNJT05fTUFQIH0gZnJvbSAnLi9wcm9wZXJ0eS1leHRlbnNpb24tbWFwJztcbmltcG9ydCB7IE1hcGxlVmFyaWFibGVNb2RlbCB9IGZyb20gJy4vdHlwZXMvdmFyaWFibGVzLm1vZGVsJztcbmltcG9ydCB7XG4gIGdldE1hcGxlVXRpbGl0eUNsYXNzTWFwLFxuICBnZXRNYXBsZVV0aWxpdHlWYXJpYWJsZU1hcCxcbn0gZnJvbSAnLi91dGlsaXR5LWNsYXNzLW1hcCc7XG5pbXBvcnQgeyBNQVBMRV9WQVJfQUxFUlQgfSBmcm9tICcuL3ZhcmlhYmxlcy9hbGVydCc7XG5pbXBvcnQgeyBNQVBMRV9WQVJfQlJFQUtQT0lOVCB9IGZyb20gJy4vdmFyaWFibGVzL2JyZWFrcG9pbnQnO1xuaW1wb3J0IHsgTUFQTEVfVkFSX0JVVFRPTiB9IGZyb20gJy4vdmFyaWFibGVzL2J1dHRvbic7XG5pbXBvcnQgeyBNQVBMRV9WQVJfQ09MT1IgfSBmcm9tICcuL3ZhcmlhYmxlcy9jb2xvcic7XG5pbXBvcnQgeyBNQVBMRV9WQVJfRk9OVF9GQU1JTFkgfSBmcm9tICcuL3ZhcmlhYmxlcy9mb250LWZhbWlseSc7XG5pbXBvcnQgeyBNQVBMRV9WQVJfRk9OVF9TSVpFIH0gZnJvbSAnLi92YXJpYWJsZXMvZm9udC1zaXplJztcbmltcG9ydCB7IE1BUExFX1ZBUl9GT05UX1dFSUdIVCB9IGZyb20gJy4vdmFyaWFibGVzL2ZvbnQtd2VpZ2h0JztcbmltcG9ydCB7IE1BUExFX1ZBUl9NQVhfV0lEVEggfSBmcm9tICcuL3ZhcmlhYmxlcy9tYXgtd2lkdGgnO1xuaW1wb3J0IHsgTUFQTEVfVkFSX1NQQUNFUiB9IGZyb20gJy4vdmFyaWFibGVzL3NwYWNlcic7XG5pbXBvcnQgeyBNQVBMRV9WQVJfVFJBTlNJVElPTiB9IGZyb20gJy4vdmFyaWFibGVzL3RyYW5zaXRpb24nO1xuXG4vLyBEZWZpbmUgYSBnbG9iYWwgTWFwbGUuQ0FDSEUgdG8gY29sbGVjdCBzZWxlY3RvcnMgYW5kIG1hcHMgb24gYnJlYWtwb2ludCBrZXlzXG5jb25zdCBCUkVBS1BPSU5UOiBhbnkgPSB7XG4gIG1lZGlhOiB7fSxcbn07XG5jb25zdCBTVFlMRV9FTEVNRU5UUyA9IHt9O1xuXG5jb25zdCBTVFJfRU1QVFkgPSAnJztcbmNvbnN0IFNUUl9TUEFDRSA9ICcgJztcbmNvbnN0IFNUUl9ET1QgPSAnLic7XG5jb25zdCBTVFJfVVAgPSAndXAnO1xuY29uc3QgU1RSX0RPV04gPSAnZG93bic7XG5jb25zdCBTRVBfTUVESUEgPSAnLSc7XG5jb25zdCBTRVBfU0VMRUNUT1IgPSAnOic7XG5jb25zdCBTRVBfVVRJTF9LRVkgPSAnOic7XG5jb25zdCBTRVBfVVRJTF9WQUwgPSAnPSc7XG5jb25zdCBTRVBfTk9fU1BBQ0UgPSAnPCc7XG5jb25zdCBTRVBfT1VURVJfU1BBQ0UgPSAnPDwnO1xuY29uc3QgSU1QT1JUQU5UID0gJyEnO1xuY29uc3QgV0lMRENBUkQgPSAnKic7XG5cbmNvbnN0IFBSRUZJWF9NQVBMRV9QUk9QID0gJ18nO1xuY29uc3QgU1VGRklYX01FRElBX1VQID0gU0VQX01FRElBICsgU1RSX1VQO1xuY29uc3QgU1VGRklYX01FRElBX0RPV04gPSBTRVBfTUVESUEgKyBTVFJfRE9XTjtcblxuY29uc3QgUl9TRUxFQ1RPUl9SRVNFUlZFRCA9XG4gIC8oXFwufFxcK3xcXH58XFw8fFxcPnxcXFt8XFxdfFxcKHxcXCl8XFwhfFxcOnxcXCx8XFw9fFxcfHxcXCV8XFwjfFxcKnxcXFwifFxcLykvZztcbmNvbnN0IFJfRVNDQVBFX1JFU0VSVkVEID0gJ1xcXFwkMSc7XG5jb25zdCBSX1NFUF9OT19TUEFDRSA9IC9cXDwvZztcbmNvbnN0IFJfU0VQX1NFTF9TUEFDRSA9IC9cXD5cXD4vZztcbmNvbnN0IFJfU0VQX1NFTF9TUEFDRV9BTEwgPSAvKFxcPHxcXD5cXD4pL2c7XG5jb25zdCBSX1NFUF9WQUxfU1BBQ0UgPSAvXFx8L2c7XG5jb25zdCBSX1NFUF9VVElMX1ZBTCA9IC89KD86Lig/IT0pKSskLztcbmNvbnN0IFJfU0VQX1VUSUxfS0VZID0gL1xcOig/Oi4oPyFcXDopKSskLztcbmNvbnN0IFJfQ1VTVE9NID0gL1xcKCguKj8pXFwpLztcbmNvbnN0IFJfV0lMRENBUkQgPSAvXFwqL2c7XG5jb25zdCBSX0VYVFJBQ1RfQ0xBU1MgPSAvY2xhc3NcXD1cXFwiKFtcXHNcXFNdKz8pXFxcIi9nO1xuY29uc3QgUl9VTklGSVkgPSAvXFw9KD89W14uXSokKS87XG5cbmxldCBwcmVJbml0Q2xhc3NMaXN0ID0gW107XG5sZXQgaXNNYXBsZUVuYWJsZWQgPSB0cnVlO1xubGV0IGRvYztcblxuY29uc3QgZXNjID0gKHNlbGVjdG9yOiBzdHJpbmcpID0+XG4gIHNlbGVjdG9yLnJlcGxhY2UoUl9TRUxFQ1RPUl9SRVNFUlZFRCwgUl9FU0NBUEVfUkVTRVJWRUQpO1xuXG5leHBvcnQgY2xhc3MgTWFwbGUge1xuICBwcml2YXRlIHN0YXRpYyBDQUNIRSA9IHt9O1xuICBwcml2YXRlIHN0YXRpYyB2YXJpYWJsZXM6IE1hcGxlVmFyaWFibGVNb2RlbCA9IHtcbiAgICBicmVha3BvaW50OiBNQVBMRV9WQVJfQlJFQUtQT0lOVCxcbiAgICBjb2xvcjogTUFQTEVfVkFSX0NPTE9SLFxuICAgIGZvbnRGYW1pbHk6IE1BUExFX1ZBUl9GT05UX0ZBTUlMWSxcbiAgICBmb250U2l6ZTogTUFQTEVfVkFSX0ZPTlRfU0laRSxcbiAgICBmb250V2VpZ2h0OiBNQVBMRV9WQVJfRk9OVF9XRUlHSFQsXG4gICAgbWF4V2lkdGg6IE1BUExFX1ZBUl9NQVhfV0lEVEgsXG4gICAgc3BhY2VyOiBNQVBMRV9WQVJfU1BBQ0VSLFxuICAgIHRyYW5zaXRpb246IE1BUExFX1ZBUl9UUkFOU0lUSU9OLFxuICAgIGJ1dHRvbjogTUFQTEVfVkFSX0JVVFRPTixcbiAgICBhbGVydDogTUFQTEVfVkFSX0FMRVJULFxuICB9O1xuICBwcml2YXRlIHN0YXRpYyBicmVha3BvaW50TWFwOiBhbnkgPSB7fTtcbiAgcHJpdmF0ZSBzdGF0aWMgdXRpbENsYXNzTWFwOiBhbnkgPSB7fTtcbiAgcHJpdmF0ZSBzdGF0aWMgdXRpbFByZWZpeExpc3Q6IEFycmF5PGFueT4gPSBbXTtcbiAgcHJpdmF0ZSBzdGF0aWMgcHJvcEV4dGVuc2lvbk1hcDogYW55ID0ge307XG4gIHByaXZhdGUgc3RhdGljIHJhd0NhY2hlOiBhbnkgPSB7fTtcbiAgcHJpdmF0ZSBzdGF0aWMgdGVtcENhY2hlOiBhbnkgPSB7fTtcbiAgcHVibGljIHN0YXRpYyBvblN0eWxlQXBwZW5kJDogQmVoYXZpb3JTdWJqZWN0PGFueT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFxuICAgIG51bGwsXG4gICk7XG4gIHB1YmxpYyBzdGF0aWMgb25Jbml0JDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICAvLyBGaW5kIG1pbiBhbmQgbWF4IGJyZWFrcG9pbnRzXG4gIHByaXZhdGUgc3RhdGljIHNldE1pbkFuZE1heEJyZWFrcG9pbnRzKCk6IHZvaWQge1xuICAgIGNvbnN0IGJyZWFrcG9pbnRLZXlzOiBBcnJheTxzdHJpbmc+ID0gT2JqZWN0LmtleXMoTWFwbGUuYnJlYWtwb2ludE1hcCk7XG4gICAgY29uc3QgYnJlYWtwb2ludHMgPSBicmVha3BvaW50S2V5c1xuICAgICAgLm1hcCgoa2V5KSA9PiAoe1xuICAgICAgICBrZXksXG4gICAgICAgIHNpemU6IHBhcnNlRmxvYXQoTWFwbGUuYnJlYWtwb2ludE1hcFtrZXldKSxcbiAgICAgIH0pKVxuICAgICAgLnNvcnQoKGEsIGIpID0+IGEuc2l6ZSAtIGIuc2l6ZSk7XG5cbiAgICBCUkVBS1BPSU5ULm1pbktleSA9IGJyZWFrcG9pbnRzWzBdLmtleTtcbiAgICBCUkVBS1BPSU5ULm1heEtleSA9IGJyZWFrcG9pbnRzW2JyZWFrcG9pbnRzLmxlbmd0aCAtIDFdLmtleTtcbiAgICBCUkVBS1BPSU5ULm1pbk1lZGlhID0gQlJFQUtQT0lOVC5taW5LZXkgKyBTVUZGSVhfTUVESUFfVVA7XG5cbiAgICBicmVha3BvaW50cy5mb3JFYWNoKChicDogYW55LCBpOiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IG5leHQgPSBicmVha3BvaW50c1tpICsgMV07XG4gICAgICBCUkVBS1BPSU5ULm1lZGlhW2JwLmtleSArIFNVRkZJWF9NRURJQV9VUF0gPSBicC5zaXplO1xuICAgICAgaWYgKG5leHQpIHtcbiAgICAgICAgLy8gVXNlcyAwLjAycHggcmF0aGVyIHRoYW4gMC4wMXB4IHRvIHdvcmsgYXJvdW5kIGEgY3VycmVudCByb3VuZGluZyBidWcgaW4gU2FmYXJpLlxuICAgICAgICAvLyBTZWUgaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTE3ODI2MVxuICAgICAgICBCUkVBS1BPSU5ULm1lZGlhW2JwLmtleSArIFNVRkZJWF9NRURJQV9ET1dOXSA9IG5leHQuc2l6ZSAtIDAuMDI7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZURvbUVsZW1lbnRzKFxuICAgIHN0eWxlRWxlbWVudHM6IGFueSxcbiAgICBwcmVmaXg6IHN0cmluZyA9ICdtYXBsZScsXG4gICAgZG9jdW1lbnQ/OiBhbnksXG4gICk6IHZvaWQge1xuICAgIC8vIFByZXBhcmUgc3R5bGUgZWxlbWVudCBvbiBoZWFkXG4gICAgY29uc3QgZG9jSGVhZCA9IChkb2N1bWVudCB8fCBkb2MpLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gICAgY29uc3QgYnJlYWtwb2ludHMgPSBPYmplY3Qua2V5cyhCUkVBS1BPSU5ULm1lZGlhKS5zb3J0KFxuICAgICAgKGEsIGIpID0+IEJSRUFLUE9JTlQubWVkaWFbYV0gLSBCUkVBS1BPSU5ULm1lZGlhW2JdLFxuICAgICk7XG4gICAgY29uc3QgYnJlYWtwb2ludHNVcCA9IGJyZWFrcG9pbnRzLmZpbHRlcigoa2V5KSA9PlxuICAgICAga2V5LmluY2x1ZGVzKFNVRkZJWF9NRURJQV9VUCksXG4gICAgKTtcbiAgICBjb25zdCBicmVha3BvaW50c0Rvd24gPSBicmVha3BvaW50cy5maWx0ZXIoKGtleSkgPT5cbiAgICAgIGtleS5pbmNsdWRlcyhTVUZGSVhfTUVESUFfRE9XTiksXG4gICAgKTtcblxuICAgIGJyZWFrcG9pbnRzVXAuY29uY2F0KGJyZWFrcG9pbnRzRG93bi5yZXZlcnNlKCkpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgY29uc3Qgc3R5bGVJZCA9IGAke3ByZWZpeH0tJHtrZXl9YDtcbiAgICAgIGNvbnN0IGVsID0gZG9jLmdldEVsZW1lbnRCeUlkKHN0eWxlSWQpO1xuICAgICAgaWYgKCEhZWwpIHtcbiAgICAgICAgZG9jSGVhZC5yZW1vdmVDaGlsZChlbCk7XG4gICAgICB9XG4gICAgICBzdHlsZUVsZW1lbnRzW2tleV0gPSAoZG9jIGFzIERvY3VtZW50KS5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgKHN0eWxlRWxlbWVudHNba2V5XSBhcyBIVE1MRWxlbWVudCkuc2V0QXR0cmlidXRlKCdpZCcsIHN0eWxlSWQpO1xuICAgICAgZG9jSGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnRzW2tleV0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgZXh0ZW5kUHJvcGVydGllcygpOiB2b2lkIHtcbiAgICBNYXBsZS51dGlsUHJlZml4TGlzdC5mb3JFYWNoKChkZWY6IGFueSkgPT4ge1xuICAgICAgTWFwbGUudXRpbENsYXNzTWFwW2RlZi5wcmVmaXhdID0gTWFwbGUudXRpbENsYXNzTWFwW2RlZi5wcmVmaXhdIHx8IHt9O1xuICAgICAgTWFwbGUudXRpbENsYXNzTWFwW2RlZi5wcmVmaXhdW1dJTERDQVJEXSA9IHt9O1xuICAgICAgT2JqZWN0LmtleXMoZGVmLm1hcCkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIE1hcGxlLnV0aWxDbGFzc01hcFtkZWYucHJlZml4XVtrZXldID0ge307XG4gICAgICAgIGRlZi5wcm9wcy5mb3JFYWNoKChwcm9wKSA9PiB7XG4gICAgICAgICAgTWFwbGUudXRpbENsYXNzTWFwW2RlZi5wcmVmaXhdW1dJTERDQVJEXSA9IHtcbiAgICAgICAgICAgIC4uLk1hcGxlLnV0aWxDbGFzc01hcFtkZWYucHJlZml4XVtXSUxEQ0FSRF0sXG4gICAgICAgICAgICBbcHJvcF06IFdJTERDQVJELFxuICAgICAgICAgIH07XG4gICAgICAgICAgTWFwbGUudXRpbENsYXNzTWFwW2RlZi5wcmVmaXhdW2tleV1bcHJvcF0gPSBkZWYubWFwW2tleV07XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBnZXRTZWxlY3RvcnMoXG4gICAgbWVkaWE6IHN0cmluZyA9IFNUUl9FTVBUWSxcbiAgICBzZWxLZXk6IHN0cmluZyA9IFNUUl9FTVBUWSxcbiAgICB1dGlsS2V5OiBzdHJpbmcgPSBTVFJfRU1QVFksXG4gICAgdXRpbFZhbDogc3RyaW5nID0gU1RSX0VNUFRZLFxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogdmFyaWFibGUtbmFtZVxuICAgIF9zZWxlY3Rvcjogc3RyaW5nID0gU1RSX0VNUFRZLFxuICAgIGltcG9ydGFudDogYm9vbGVhbiA9IGZhbHNlLFxuICApOiBzdHJpbmcge1xuICAgIGNvbnN0IG1hcGxlID0gTWFwbGUudXRpbENsYXNzTWFwW3NlbEtleV0gfHwge307XG4gICAgX3NlbGVjdG9yID0gKG1hcGxlLl9zZWxlY3RvciB8fCAnJykgKyBfc2VsZWN0b3I7XG5cbiAgICBjb25zdCBwYXJlbnRTZWxlY3RvciA9IHNlbEtleS5pbmNsdWRlcyhTRVBfT1VURVJfU1BBQ0UpXG4gICAgICA/IHNlbEtleS5zcGxpdChTRVBfT1VURVJfU1BBQ0UpLnBvcCgpLnNwbGl0KFJfU0VQX1NFTF9TUEFDRV9BTEwpLnNoaWZ0KClcbiAgICAgIDogU1RSX0VNUFRZO1xuXG4gICAgY29uc3QgYmFzZVNlbCA9IFtcbiAgICAgIG1lZGlhIHx8IFNUUl9FTVBUWSxcbiAgICAgIG1hcGxlLl9zZWxlY3RvciA/IFNFUF9TRUxFQ1RPUiA6IFNUUl9FTVBUWSxcbiAgICAgIHNlbEtleSxcbiAgICAgIHV0aWxLZXkgPyBTRVBfVVRJTF9LRVkgOiBTVFJfRU1QVFksXG4gICAgICB1dGlsS2V5LFxuICAgICAgdXRpbFZhbCA/IFNFUF9VVElMX1ZBTCA6IFNUUl9FTVBUWSxcbiAgICBdLmpvaW4oU1RSX0VNUFRZKTtcblxuICAgIHJldHVybiBfc2VsZWN0b3JcbiAgICAgIC5zcGxpdCgvLFxccyovKVxuICAgICAgLm1hcCgoc2VsZWN0b3IpID0+XG4gICAgICAgIFtcbiAgICAgICAgICBwYXJlbnRTZWxlY3RvciA/IHBhcmVudFNlbGVjdG9yICsgU1RSX1NQQUNFIDogU1RSX0VNUFRZLFxuICAgICAgICAgIHV0aWxWYWwgPyBTVFJfRE9UIDogU1RSX0VNUFRZLFxuICAgICAgICAgIHV0aWxWYWwgPyBlc2MoYmFzZVNlbCArIHV0aWxWYWwpIDogYFtjbGFzcyo9XCIke2Jhc2VTZWx9XCJdYCxcbiAgICAgICAgICB1dGlsVmFsICYmIGltcG9ydGFudCA/IGVzYyhJTVBPUlRBTlQpIDogU1RSX0VNUFRZLFxuICAgICAgICAgIG1hcGxlLl9zZWxlY3RvciB8fCAhc2VsS2V5IHx8IHNlbEtleS5jaGFyQXQoMCkgPT09IFNFUF9OT19TUEFDRVxuICAgICAgICAgICAgPyBTVFJfRU1QVFlcbiAgICAgICAgICAgIDogU1RSX1NQQUNFLFxuICAgICAgICAgIG1hcGxlLl9zZWxlY3RvclxuICAgICAgICAgICAgPyBTVFJfRU1QVFlcbiAgICAgICAgICAgIDogc2VsS2V5XG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoU0VQX09VVEVSX1NQQUNFICsgcGFyZW50U2VsZWN0b3IsIFNUUl9FTVBUWSlcbiAgICAgICAgICAgICAgICAucmVwbGFjZShSX1NFUF9TRUxfU1BBQ0UsIFNUUl9TUEFDRSlcbiAgICAgICAgICAgICAgICAucmVwbGFjZShSX1NFUF9OT19TUEFDRSwgU1RSX0VNUFRZKSxcbiAgICAgICAgICBzZWxlY3Rvci50cmltKCkuY2hhckF0KDApID09PSBTRVBfTk9fU1BBQ0UgPyBTVFJfRU1QVFkgOiBTVFJfU1BBQ0UsXG4gICAgICAgICAgc2VsZWN0b3JcbiAgICAgICAgICAgIC50cmltKClcbiAgICAgICAgICAgIC5yZXBsYWNlKFJfU0VQX1NFTF9TUEFDRSwgU1RSX1NQQUNFKVxuICAgICAgICAgICAgLnJlcGxhY2UoUl9TRVBfTk9fU1BBQ0UsIFNUUl9FTVBUWSksXG4gICAgICAgIF0uam9pbihTVFJfRU1QVFkpLFxuICAgICAgKVxuICAgICAgLmpvaW4oJywnKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGNhY2hlKFxuICAgIG1lZGlhOiBzdHJpbmcsXG4gICAgc2VsZWN0b3I6IHN0cmluZyxcbiAgICBtYXBUb0JlQ2FjaGVkOiBhbnksXG4gICk6IHZvaWQge1xuICAgIGlmICghbWFwVG9CZUNhY2hlZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBQcm9wZXJ0eSBtYXAgbm90IGZvdW5kIGZvciBzZWxlY3RvcjogJHtzZWxlY3Rvcn1gKTtcbiAgICB9XG5cbiAgICBjb25zdCBjYWNoZUtleSA9IGAke21lZGlhfSR7c2VsZWN0b3J9JHtKU09OLnN0cmluZ2lmeShtYXBUb0JlQ2FjaGVkKX1gO1xuICAgIGlmICghTWFwbGUuQ0FDSEVbY2FjaGVLZXldKSB7XG4gICAgICBNYXBsZS50ZW1wQ2FjaGVbbWVkaWFdID0gTWFwbGUudGVtcENhY2hlW21lZGlhXSB8fCB7fTtcbiAgICAgIE1hcGxlLnRlbXBDYWNoZVttZWRpYV0gPSB7XG4gICAgICAgIC4uLk1hcGxlLnRlbXBDYWNoZVttZWRpYV0sXG4gICAgICAgIFtzZWxlY3Rvcl06IHtcbiAgICAgICAgICAuLi4oTWFwbGUudGVtcENhY2hlW21lZGlhXVtzZWxlY3Rvcl0gfHwge30pLFxuICAgICAgICAgIC4uLm1hcFRvQmVDYWNoZWQsXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgICAgTWFwbGUuQ0FDSEVbY2FjaGVLZXldID0gMTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBzdHlsZXMobWVkaWE6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3QgY2FjaGVJdGVtID0gTWFwbGUudGVtcENhY2hlW21lZGlhXTtcbiAgICBpZiAoIWNhY2hlSXRlbSkge1xuICAgICAgcmV0dXJuIFNUUl9FTVBUWTtcbiAgICB9XG5cbiAgICBjb25zdCBzZWxlY3RvcnMgPSBPYmplY3Qua2V5cyhjYWNoZUl0ZW0pO1xuXG4gICAgaWYgKHNlbGVjdG9ycy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBTVFJfRU1QVFk7XG4gICAgfVxuXG4gICAgY29uc3QgYnJlYWtwb2ludFBhcnRzID0gbWVkaWEuc3BsaXQoU0VQX01FRElBKTtcbiAgICBjb25zdCBicmVha3BvaW50RGlyID0gYnJlYWtwb2ludFBhcnRzWzFdO1xuICAgIGNvbnN0IG1lZGlhUXVlcnkgPSBicmVha3BvaW50RGlyID09PSBTVFJfVVAgPyAnbWluLXdpZHRoJyA6ICdtYXgtd2lkdGgnO1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuXG4gICAgLy8gb3BlbiBtZWRpYSBxdWVyeVxuICAgIGlmIChtZWRpYSAhPT0gQlJFQUtQT0lOVC5taW5NZWRpYSkge1xuICAgICAgcmVzdWx0LnB1c2goYEBtZWRpYSAoJHttZWRpYVF1ZXJ5fTogJHtCUkVBS1BPSU5ULm1lZGlhW21lZGlhXX1weCkge2ApO1xuICAgIH1cblxuICAgIGZvciAoY29uc3Qgc2VsZWN0b3Igb2Ygc2VsZWN0b3JzKSB7XG4gICAgICBjb25zdCBwcm9wTWFwID0gY2FjaGVJdGVtW3NlbGVjdG9yXTtcbiAgICAgIGlmICghcHJvcE1hcCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcHJvcE1hcEtleXMgPSBPYmplY3Qua2V5cyhwcm9wTWFwKS5maWx0ZXIoKHApID0+IHAgIT09IElNUE9SVEFOVCk7XG4gICAgICBpZiAocHJvcE1hcEtleXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBvcGVuIHNlbGVjdG9yXG4gICAgICByZXN1bHQucHVzaChgJHtzZWxlY3Rvcn17YCk7XG5cbiAgICAgIC8vIGZpbGwgc2VsZWN0b3Igd2l0aCBwcm9wZXJ0aWVzXG4gICAgICBmb3IgKGNvbnN0IHByb3Agb2YgcHJvcE1hcEtleXMpIHtcbiAgICAgICAgY29uc3QgdmFsID0gcHJvcE1hcFtwcm9wXS50b1N0cmluZygpO1xuICAgICAgICBjb25zdCBpbXBvcnRhbnQgPVxuICAgICAgICAgIHZhbC5pbmRleE9mKElNUE9SVEFOVCkgPCAwICYmIHByb3BNYXBbSU1QT1JUQU5UXVxuICAgICAgICAgICAgPyAnICFpbXBvcnRhbnQnXG4gICAgICAgICAgICA6IFNUUl9FTVBUWTtcbiAgICAgICAgcmVzdWx0LnB1c2goXG4gICAgICAgICAgTWFwbGUucHJvcEV4dGVuc2lvbk1hcFtwcm9wXVxuICAgICAgICAgICAgPyBNYXBsZS5wcm9wRXh0ZW5zaW9uTWFwW3Byb3BdKHZhbCwgaW1wb3J0YW50KVxuICAgICAgICAgICAgOiBgJHtwcm9wfToke3ZhbH0ke2ltcG9ydGFudH07YCxcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgLy8gY2xvc2Ugc2VsZWN0b3JcbiAgICAgIHJlc3VsdC5wdXNoKGB9YCk7XG4gICAgfVxuXG4gICAgLy8gY2xvc2UgbWVkaWEgcXVlcnlcbiAgICBpZiAobWVkaWEgIT09IEJSRUFLUE9JTlQubWluTWVkaWEpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGB9YCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQubGVuZ3RoID4gMiA/IHJlc3VsdC5qb2luKFNUUl9FTVBUWSkgOiBTVFJfRU1QVFk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBnZW5lcmF0ZVdoaXRlbGlzdCh3aGl0ZWxpc3Q6IEFycmF5PHN0cmluZz4gPSBbXSk6IHZvaWQge1xuICAgIGNvbnN0IGNsYXNzTGlzdCA9IFtdO1xuICAgIGZvciAoY29uc3QgdXRpbEtleSBvZiB3aGl0ZWxpc3QpIHtcbiAgICAgIGlmICghTWFwbGUudXRpbENsYXNzTWFwW3V0aWxLZXldKSB7XG4gICAgICAgIGNsYXNzTGlzdC5wdXNoKHV0aWxLZXkpO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcHJvcHMgPSBPYmplY3Qua2V5cyhNYXBsZS51dGlsQ2xhc3NNYXBbdXRpbEtleV0pO1xuICAgICAgZm9yIChjb25zdCB1dGlsVmFsIG9mIHByb3BzKSB7XG4gICAgICAgIGlmICh1dGlsVmFsLmNoYXJBdCgwKSA9PT0gUFJFRklYX01BUExFX1BST1ApIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGJyZWFrcG9pbnRzID0gT2JqZWN0LmtleXMoTWFwbGUuYnJlYWtwb2ludE1hcCk7XG4gICAgICAgIGZvciAoY29uc3QgYnAgb2YgYnJlYWtwb2ludHMpIHtcbiAgICAgICAgICBjb25zdCBtZWRpYVVwID0gYnAgKyBTVUZGSVhfTUVESUFfVVA7XG4gICAgICAgICAgY29uc3QgbWVkaWFEb3duID0gYnAgKyBTVUZGSVhfTUVESUFfRE9XTjtcbiAgICAgICAgICBjb25zdCB1dGlsQ2xhc3MgPSBTRVBfVVRJTF9LRVkgKyB1dGlsS2V5ICsgU0VQX1VUSUxfVkFMICsgdXRpbFZhbDtcbiAgICAgICAgICBpZiAobWVkaWFVcCBpbiBCUkVBS1BPSU5ULm1lZGlhKSB7XG4gICAgICAgICAgICBjbGFzc0xpc3QucHVzaChtZWRpYVVwICsgdXRpbENsYXNzKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG1lZGlhRG93biBpbiBCUkVBS1BPSU5ULm1lZGlhKSB7XG4gICAgICAgICAgICBjbGFzc0xpc3QucHVzaChtZWRpYURvd24gKyB1dGlsQ2xhc3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBNYXBsZS5mbHkocHJlSW5pdENsYXNzTGlzdC5jb25jYXQoY2xhc3NMaXN0KSk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBzcGxpdExhc3RPY2N1cnJlbmNlKHN0cjogc3RyaW5nLCBrZXk6IHN0cmluZyk6IEFycmF5PHN0cmluZz4ge1xuICAgIGNvbnN0IHBvcyA9IHN0ci5sYXN0SW5kZXhPZihrZXkpO1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgIGNvbnN0IGZpcnN0UGFydCA9IHN0ci5zdWJzdHJpbmcoMCwgcG9zKTtcbiAgICBjb25zdCBsYXN0UGFydCA9IHN0ci5zdWJzdHJpbmcocG9zICsga2V5Lmxlbmd0aCk7XG4gICAgaWYgKGZpcnN0UGFydCkge1xuICAgICAgcmVzdWx0LnB1c2goZmlyc3RQYXJ0KTtcbiAgICB9XG4gICAgaWYgKGxhc3RQYXJ0KSB7XG4gICAgICByZXN1bHQucHVzaChsYXN0UGFydCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBzcGxpdEZpcnN0T2NjdXJyZW5jZShzdHI6IHN0cmluZywga2V5OiBzdHJpbmcpOiBBcnJheTxzdHJpbmc+IHtcbiAgICBjb25zdCBwb3MgPSBzdHIuaW5kZXhPZihrZXkpO1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgIGNvbnN0IGZpcnN0UGFydCA9IHN0ci5zdWJzdHJpbmcoMCwgcG9zKTtcbiAgICBjb25zdCBsYXN0UGFydCA9IHN0ci5zdWJzdHJpbmcocG9zICsga2V5Lmxlbmd0aCk7XG4gICAgaWYgKGZpcnN0UGFydCkge1xuICAgICAgcmVzdWx0LnB1c2goZmlyc3RQYXJ0KTtcbiAgICB9XG4gICAgaWYgKGxhc3RQYXJ0KSB7XG4gICAgICByZXN1bHQucHVzaChsYXN0UGFydCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGluaXQoXG4gICAgZG9jdW1lbnQ6IGFueSxcbiAgICBlbmFibGVkOiBib29sZWFuLFxuICAgIHV0aWxDbGFzc01hcDogYW55ID0ge30sXG4gICAgd2hpdGVsaXN0OiBBcnJheTxzdHJpbmc+LFxuICAgIHZhcmlhYmxlczogTWFwbGVWYXJpYWJsZU1vZGVsID0gTWFwbGUudmFyaWFibGVzLFxuICAgIGlzUnRsOiBib29sZWFuID0gZmFsc2UsXG4gICAgdXRpbFByZWZpeExpc3Q6IEFycmF5PGFueT4gPSBbXSxcbiAgICBwcm9wRXh0ZW5zaW9uTWFwOiBhbnkgPSB7fSxcbiAgKTogdm9pZCB7XG4gICAgaXNNYXBsZUVuYWJsZWQgPSBlbmFibGVkO1xuICAgIGlmIChpc01hcGxlRW5hYmxlZCA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZG9jID0gZG9jdW1lbnQ7XG4gICAgTWFwbGUuQ0FDSEUgPSB7fTtcbiAgICBNYXBsZS52YXJpYWJsZXMgPSB7XG4gICAgICAuLi5NYXBsZS52YXJpYWJsZXMsXG4gICAgICAuLi52YXJpYWJsZXMsXG4gICAgfTtcbiAgICBNYXBsZUNvbG9ySGVscGVyLmdlbmVyYXRlQWxwaGFDb2xvcnMoTWFwbGUudmFyaWFibGVzLmNvbG9yKTtcbiAgICBNYXBsZS51dGlsQ2xhc3NNYXAgPSB7XG4gICAgICAuLi5nZXRNYXBsZVV0aWxpdHlDbGFzc01hcChNYXBsZS52YXJpYWJsZXMpLFxuICAgICAgLi4udXRpbENsYXNzTWFwLFxuICAgIH07XG4gICAgTWFwbGUudXRpbFByZWZpeExpc3QgPSBbXG4gICAgICAuLi5nZXRNYXBsZVV0aWxpdHlWYXJpYWJsZU1hcChNYXBsZS52YXJpYWJsZXMpLFxuICAgICAgLi4udXRpbFByZWZpeExpc3QsXG4gICAgXTtcbiAgICBNYXBsZS5wcm9wRXh0ZW5zaW9uTWFwID0ge1xuICAgICAgLi4uTUFQTEVfUFJPUF9FWFRFTlNJT05fTUFQLFxuICAgICAgLi4ucHJvcEV4dGVuc2lvbk1hcCxcbiAgICB9O1xuICAgIE1hcGxlLmJyZWFrcG9pbnRNYXAgPSB7XG4gICAgICAuLi5NYXBsZS52YXJpYWJsZXMuYnJlYWtwb2ludCxcbiAgICB9O1xuICAgIE1hcGxlLnNldE1pbkFuZE1heEJyZWFrcG9pbnRzKCk7XG4gICAgTWFwbGUuY3JlYXRlRG9tRWxlbWVudHMoU1RZTEVfRUxFTUVOVFMpO1xuICAgIE1hcGxlLmV4dGVuZFByb3BlcnRpZXMoKTtcbiAgICBNYXBsZS51dGlsQ2xhc3NNYXAgPSBNYXBsZS5jb252ZXJ0VXRpbENsYXNzTWFwVG9SdGwoXG4gICAgICBNYXBsZS51dGlsQ2xhc3NNYXAsXG4gICAgICBpc1J0bCxcbiAgICApO1xuICAgIE1hcGxlLmdlbmVyYXRlV2hpdGVsaXN0KHdoaXRlbGlzdCk7XG4gICAgdGhpcy5vbkluaXQkLm5leHQodHJ1ZSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGZpbmRBbmRGbHkoc3RyOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAoaXNNYXBsZUVuYWJsZWQgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChzdHIpIHtcbiAgICAgIE1hcGxlLmZseShcbiAgICAgICAgKHN0ci5tYXRjaChSX0VYVFJBQ1RfQ0xBU1MpIHx8IFtdKVxuICAgICAgICAgIC5qb2luKCcgJylcbiAgICAgICAgICAucmVwbGFjZSgvY2xhc3NcXD1cXFwiL2csICcnKVxuICAgICAgICAgIC5yZXBsYWNlKC9cIi9nLCAnJyksXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY29udmVydFV0aWxDbGFzc01hcFRvUnRsKFxuICAgIHV0aWxpdHlDbGFzczogYW55LFxuICAgIGlzUnRsOiBib29sZWFuLFxuICApOiBhbnkge1xuICAgIGlmICghaXNSdGwpIHtcbiAgICAgIHJldHVybiB1dGlsaXR5Q2xhc3M7XG4gICAgfVxuICAgIGNvbnN0IGRhdGEgPSB7fTtcbiAgICBPYmplY3Qua2V5cyh1dGlsaXR5Q2xhc3MpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSB1dGlsaXR5Q2xhc3Nba2V5XTtcbiAgICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlLnJ0bCkge1xuICAgICAgICBPYmplY3Qua2V5cyh2YWx1ZS5ydGwpLnJlZHVjZSgocnRsVmFsdWUsIHJ0bEtleSkgPT4ge1xuICAgICAgICAgIHJ0bFZhbHVlW3J0bEtleV0gPSB2YWx1ZS5ydGxbcnRsS2V5XTtcbiAgICAgICAgfSwgdmFsdWUpO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgICBpZiAoa2V5LmluY2x1ZGVzKCdsZWZ0JykpIHtcbiAgICAgICAgICBjb25zdCByZXBsYWNlZEtleSA9IGtleS5yZXBsYWNlKCdsZWZ0JywgJ3JpZ2h0Jyk7XG4gICAgICAgICAgZGF0YVtyZXBsYWNlZEtleV0gPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkuaW5jbHVkZXMoJ3JpZ2h0JykpIHtcbiAgICAgICAgICBjb25zdCByZXBsYWNlZEtleSA9IGtleS5yZXBsYWNlKCdyaWdodCcsICdsZWZ0Jyk7XG4gICAgICAgICAgZGF0YVtyZXBsYWNlZEtleV0gPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkYXRhW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiB2YWx1ZS5pbmNsdWRlcygnbGVmdCcpKSB7XG4gICAgICAgICAgZGF0YVtrZXldID0gdmFsdWUucmVwbGFjZSgnbGVmdCcsICdyaWdodCcpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgdmFsdWUuaW5jbHVkZXMoJ3JpZ2h0JykpIHtcbiAgICAgICAgICBkYXRhW2tleV0gPSB2YWx1ZS5yZXBsYWNlKCdyaWdodCcsICdsZWZ0Jyk7XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJlxuICAgICAgICAgIGtleSA9PT0gJ3RyYW5zZm9ybScgJiZcbiAgICAgICAgICB2YWx1ZS5pbmNsdWRlcygndHJhbnNsYXRlJykgJiZcbiAgICAgICAgICAhWydZKCcsICdaKCddLnNvbWUoKHQpID0+IHZhbHVlLmluY2x1ZGVzKHQpKVxuICAgICAgICApIHtcbiAgICAgICAgICBkYXRhW2tleV0gPSB2YWx1ZVxuICAgICAgICAgICAgLnNwbGl0KCcgJylcbiAgICAgICAgICAgIC5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgY29uc3Qgc3BsaXR0ZWRWYWx1ZSA9IGl0ZW0uc3BsaXQoJygnKTtcbiAgICAgICAgICAgICAgc3BsaXR0ZWRWYWx1ZVsxXSA9XG4gICAgICAgICAgICAgICAgc3BsaXR0ZWRWYWx1ZVsxXSAmJiBzcGxpdHRlZFZhbHVlWzFdLnN0YXJ0c1dpdGgoJy0nKVxuICAgICAgICAgICAgICAgICAgPyBzcGxpdHRlZFZhbHVlWzFdLnJlcGxhY2UoJy0nLCAnKCcpXG4gICAgICAgICAgICAgICAgICA6IHNwbGl0dGVkVmFsdWVbMV1cbiAgICAgICAgICAgICAgICAgID8gJygtJyArIHNwbGl0dGVkVmFsdWVbMV1cbiAgICAgICAgICAgICAgICAgIDogJyc7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIHNwbGl0dGVkVmFsdWVbMF0gKyBzcGxpdHRlZFZhbHVlWzFdO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5qb2luKCcgJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGZpeGVkVXRpbGl0eSA9IE1hcGxlLmNvbnZlcnRVdGlsQ2xhc3NNYXBUb1J0bChcbiAgICAgICAgICB7IC4uLnZhbHVlIH0sXG4gICAgICAgICAgaXNSdGwsXG4gICAgICAgICk7XG4gICAgICAgIGRhdGFba2V5XSA9IHsgLi4uZml4ZWRVdGlsaXR5IH07XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGZseShjbGFzc0xpc3Q6IGFueSk6IHZvaWQge1xuICAgIGlmIChpc01hcGxlRW5hYmxlZCA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFwcmVJbml0Q2xhc3NMaXN0Lmxlbmd0aCkge1xuICAgICAgcHJlSW5pdENsYXNzTGlzdCA9IHByZUluaXRDbGFzc0xpc3QuY29uY2F0KGNsYXNzTGlzdCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFjbGFzc0xpc3QgfHwgY2xhc3NMaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHJhd0NhY2hlS2V5ID0gQXJyYXkuaXNBcnJheShjbGFzc0xpc3QpXG4gICAgICA/IGNsYXNzTGlzdC5qb2luKCcgJylcbiAgICAgIDogY2xhc3NMaXN0O1xuXG4gICAgaWYgKE1hcGxlLnJhd0NhY2hlW3Jhd0NhY2hlS2V5XSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBNYXBsZS5yYXdDYWNoZVtyYXdDYWNoZUtleV0gPSAxO1xuICAgIGlmIChBcnJheS5pc0FycmF5KGNsYXNzTGlzdCkgPT09IGZhbHNlKSB7XG4gICAgICBjbGFzc0xpc3QgPSBjbGFzc0xpc3Quc3BsaXQoL1xccysvZyk7XG4gICAgfVxuXG4gICAgY2xhc3NMaXN0ID0gTWFwbGUudW5pZnlVdGlsaXR5Q2xhc3MoY2xhc3NMaXN0KTtcblxuICAgIE1hcGxlLnRlbXBDYWNoZSA9IHt9O1xuXG4gICAgZm9yIChjb25zdCBjbGFzc0l0ZW0gb2YgY2xhc3NMaXN0KSB7XG4gICAgICAvLyBDaGVjayB3aGV0aGVyIHRoZSBzdHlsZXMgd2lsbCBoYXZlICFpbXBvcnRhbnQgZmxhZyBvciBub3RcbiAgICAgIGNvbnN0IGltcG9ydGFudCA9IGNsYXNzSXRlbS5jaGFyQXQoY2xhc3NJdGVtLmxlbmd0aCAtIDEpID09PSBJTVBPUlRBTlQ7XG4gICAgICBjb25zdCBjbGFzc0l0ZW1XaXRob3V0SW1wb3J0YW50ID0gY2xhc3NJdGVtLnJlcGxhY2UoSU1QT1JUQU5ULCBTVFJfRU1QVFkpO1xuXG4gICAgICBsZXQgcGFydHMgPSBNYXBsZS5zcGxpdExhc3RPY2N1cnJlbmNlKFxuICAgICAgICBjbGFzc0l0ZW1XaXRob3V0SW1wb3J0YW50LFxuICAgICAgICBTRVBfVVRJTF9WQUwsXG4gICAgICApO1xuXG4gICAgICAvLyBFeHRyYWN0IHV0aWxpdHkgdmFsdWVcbiAgICAgIGNvbnN0IHV0aWxWYWwgPSBwYXJ0cy5sZW5ndGggPT09IDEgPyBudWxsIDogcGFydHMucG9wKCk7XG5cbiAgICAgIC8vIEV4dHJhY3QgbWVkaWEgcXVlcnlcbiAgICAgIGNvbnN0IG1lZGlhID1cbiAgICAgICAgT2JqZWN0LmtleXMoQlJFQUtQT0lOVC5tZWRpYSkuZmluZChcbiAgICAgICAgICAoa2V5OiBzdHJpbmcpID0+IGNsYXNzSXRlbS5pbmRleE9mKGtleSkgPT09IDAsXG4gICAgICAgICkgfHwgQlJFQUtQT0lOVC5taW5NZWRpYTtcblxuICAgICAgcGFydHMgPSBNYXBsZS5zcGxpdEZpcnN0T2NjdXJyZW5jZShwYXJ0cy5qb2luKFNUUl9FTVBUWSksIG1lZGlhKVxuICAgICAgICAuam9pbihTVFJfRU1QVFkpXG4gICAgICAgIC5zcGxpdChTRVBfVVRJTF9LRVkpXG4gICAgICAgIC5maWx0ZXIoKHA6IHN0cmluZykgPT4gISFwKTtcblxuICAgICAgLy8gRXhhY3QgdXRpbGl0eSBjbGFzc1xuICAgICAgY29uc3QgdXRpbEtleSA9IHBhcnRzLmxlbmd0aCA+PSAxID8gcGFydHMucG9wKCkgOiBudWxsO1xuXG4gICAgICAvLyBFeHRyYWN0IHNlbGVjdG9yXG4gICAgICBjb25zdCBzZWxLZXkgPSBwYXJ0cy5qb2luKFNFUF9VVElMX0tFWSk7XG5cbiAgICAgIC8vIEdldCBzdHlsZSBtYXBcbiAgICAgIGNvbnN0IG1hcGxlID0gTWFwbGUudXRpbENsYXNzTWFwW3V0aWxLZXldO1xuXG4gICAgICAvLyBXaXRob3V0IGEgc3R5bGUgbWFwIHdlIGNhbid0IGNyZWF0ZSBzdHlsZXNcbiAgICAgIGlmICghbWFwbGUpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIENhY2hlIGRlZmF1bHQgc3R5bGVzIHdpdGggc2VsZWN0b3JcbiAgICAgIGlmIChtYXBsZS5fZGVmYXVsdCkge1xuICAgICAgICBPYmplY3Qua2V5cyhtYXBsZS5fZGVmYXVsdCkuZm9yRWFjaCgobWVkaWFJdGVtKSA9PiB7XG4gICAgICAgICAgTWFwbGUuY2FjaGUoXG4gICAgICAgICAgICBtZWRpYUl0ZW0sXG4gICAgICAgICAgICBNYXBsZS5nZXRTZWxlY3RvcnMoXG4gICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgIHNlbEtleSxcbiAgICAgICAgICAgICAgdXRpbEtleSxcbiAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgbWFwbGUuX3NlbGVjdG9yLFxuICAgICAgICAgICAgICBpbXBvcnRhbnQsXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAuLi5tYXBsZS5fY29tbW9uLFxuICAgICAgICAgICAgICAuLi5tYXBsZVttYXBsZS5fZGVmYXVsdFttZWRpYUl0ZW1dXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIENhY2hlIHV0aWxpdHkgc3R5bGVzIHdpdGggc2VsZWN0b3JcbiAgICAgIGlmICh1dGlsVmFsKSB7XG4gICAgICAgIGNvbnN0IGMgPSBjbGFzc0l0ZW0ucmVwbGFjZShJTVBPUlRBTlQsIFNUUl9FTVBUWSk7XG4gICAgICAgIGNvbnN0IHVjbSA9IE1hcGxlLnV0aWxDbGFzc01hcDtcblxuICAgICAgICAvLyNyZWdpb24gV2lsZGNhcmQgc2VsZWN0b3JzXG4gICAgICAgIC8vICo6dXRpbC1rZXlcbiAgICAgICAgLy8gKjp1dGlsLWtleT11dGlsLXZhbFxuICAgICAgICAvLyAqLnNlbGVjdG9yOnV0aWwta2V5PXV0aWwtdmFsXG4gICAgICAgIC8vICo6c2VsZWN0b3Ita2V5OnV0aWwta2V5PXV0aWwtdmFsXG4gICAgICAgIGNvbnN0IHdjTWVkaWEgPSBjLnJlcGxhY2UobWVkaWEsIFdJTERDQVJEKTtcblxuICAgICAgICAvLyBtZWRpYToqXG4gICAgICAgIC8vIG1lZGlhLnNlbGVjdG9yOipcbiAgICAgICAgLy8gbWVkaWE6c2VsZWN0b3Ita2V5OipcbiAgICAgICAgY29uc3Qgd2N1dGlsS2V5ID0gYy5yZXBsYWNlKFJfU0VQX1VUSUxfS0VZLCBgOiR7V0lMRENBUkR9YCk7XG5cbiAgICAgICAgLy8gbWVkaWE6dXRpbC1rZXk9KlxuICAgICAgICAvLyBtZWRpYS5zZWxlY3Rvcjp1dGlsLWtleT0qXG4gICAgICAgIC8vIG1lZGlhOnNlbGVjdG9yLWtleTp1dGlsLWtleT0qXG4gICAgICAgIGNvbnN0IHdjdXRpbFZhbCA9IGMucmVwbGFjZShSX1NFUF9VVElMX1ZBTCwgYD0ke1dJTERDQVJEfWApO1xuXG4gICAgICAgIC8vICo6KlxuICAgICAgICAvLyAqLnNlbGVjdG9yOipcbiAgICAgICAgLy8gKjpzZWxlY3Rvci1rZXk6KlxuICAgICAgICBjb25zdCB3Y01lZGlhS2V5ID0gd2NNZWRpYS5yZXBsYWNlKFJfU0VQX1VUSUxfS0VZLCBgOiR7V0lMRENBUkR9YCk7XG5cbiAgICAgICAgLy8gKjp1dGlsLWtleT0qXG4gICAgICAgIC8vICouc2VsZWN0b3I6dXRpbC1rZXk9KlxuICAgICAgICAvLyAqOnNlbGVjdG9yLWtleTp1dGlsLWtleT0qXG4gICAgICAgIGNvbnN0IHdjTWVkaWFWYWwgPSB3Y3V0aWxWYWwucmVwbGFjZShtZWRpYSwgV0lMRENBUkQpO1xuICAgICAgICAvLyNlbmRyZWdpb25cblxuICAgICAgICBjb25zdCBzZWxlY3RvciA9IE1hcGxlLmdldFNlbGVjdG9ycyhcbiAgICAgICAgICBtZWRpYSxcbiAgICAgICAgICBzZWxLZXksXG4gICAgICAgICAgdXRpbEtleSxcbiAgICAgICAgICB1dGlsVmFsLFxuICAgICAgICAgIG1hcGxlLl9zZWxlY3RvcixcbiAgICAgICAgICBpbXBvcnRhbnQsXG4gICAgICAgICk7XG5cbiAgICAgICAgTWFwbGUuY2FjaGUobWVkaWEsIHNlbGVjdG9yLCB7XG4gICAgICAgICAgLi4ubWFwbGUuX2NvbW1vbixcbiAgICAgICAgICAuLi5tYXBsZVt1dGlsVmFsXSxcbiAgICAgICAgICAuLi5KU09OLnBhcnNlKFxuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoXG4gICAgICAgICAgICAgIG1hcGxlW3V0aWxWYWwucmVwbGFjZShSX0NVU1RPTSwgV0lMRENBUkQpXSB8fCB7fSxcbiAgICAgICAgICAgICkucmVwbGFjZShcbiAgICAgICAgICAgICAgUl9XSUxEQ0FSRCxcbiAgICAgICAgICAgICAgdXRpbEtleSA9PT0gJ2NvbnRlbnQnXG4gICAgICAgICAgICAgICAgPyB1dGlsVmFsLnJlcGxhY2UoUl9DVVNUT00sICckMScpXG4gICAgICAgICAgICAgICAgOiB1dGlsVmFsLnJlcGxhY2UoUl9DVVNUT00sICckMScpLnJlcGxhY2UoUl9TRVBfVkFMX1NQQUNFLCAnICcpLFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICApLFxuICAgICAgICAgIC4uLih1Y21bd2NNZWRpYUtleV0gfHwge30pLFxuICAgICAgICAgIC4uLih1Y21bd2N1dGlsS2V5XSB8fCB7fSksXG4gICAgICAgICAgLi4uKHVjbVt3Y01lZGlhVmFsXSB8fCB7fSksXG4gICAgICAgICAgLi4uKHVjbVt3Y3V0aWxWYWxdIHx8IHt9KSxcbiAgICAgICAgICAuLi4odWNtW3djTWVkaWFdIHx8IHt9KSxcbiAgICAgICAgICAuLi4odWNtW2NdIHx8IHt9KSxcbiAgICAgICAgICBbSU1QT1JUQU5UXTogaW1wb3J0YW50LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyNyZWdpb24gR2VuZXJhdGUgc3R5bGVzXG4gICAgLy8gR2VuZXJhdGUgbWluIG1lZGlhIHF1ZXJ5IHN0eWxlc1xuICAgIGNvbnN0IG1pbk1lZGlhU3R5bGVzID0gTWFwbGUuc3R5bGVzKEJSRUFLUE9JTlQubWluTWVkaWEpO1xuICAgIGlmIChtaW5NZWRpYVN0eWxlcykge1xuICAgICAgTWFwbGUuYXBwZW5kU3R5bGUoXG4gICAgICAgIFNUWUxFX0VMRU1FTlRTLFxuICAgICAgICBCUkVBS1BPSU5ULm1pbk1lZGlhLFxuICAgICAgICBtaW5NZWRpYVN0eWxlcyxcbiAgICAgICAgZmFsc2UsXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIEdlbmVyYXRlIG1lZGlhIHF1ZXJ5IHN0eWxlc1xuICAgIGNvbnN0IG1lZGlhUXVlcnlTdHlsZXMgPSB7fTtcbiAgICBPYmplY3Qua2V5cyhNYXBsZS50ZW1wQ2FjaGUpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgaWYgKGtleSAhPT0gQlJFQUtQT0lOVC5taW5NZWRpYSkge1xuICAgICAgICBtZWRpYVF1ZXJ5U3R5bGVzW2tleV0gPSBtZWRpYVF1ZXJ5U3R5bGVzW2tleV0gfHwgJyc7XG4gICAgICAgIG1lZGlhUXVlcnlTdHlsZXNba2V5XSArPSBNYXBsZS5zdHlsZXMoa2V5KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBPYmplY3Qua2V5cyhtZWRpYVF1ZXJ5U3R5bGVzKS5mb3JFYWNoKChrZXkpID0+XG4gICAgICBNYXBsZS5hcHBlbmRTdHlsZShTVFlMRV9FTEVNRU5UUywga2V5LCBtZWRpYVF1ZXJ5U3R5bGVzW2tleV0sIGZhbHNlKSxcbiAgICApO1xuICAgIC8vI2VuZHJlZ2lvblxuICB9XG5cbiAgcHVibGljIHN0YXRpYyB1bmlmeVV0aWxpdHlDbGFzcyhjbGFzc0xpc3Q6IEFycmF5PHN0cmluZz4pOiBBcnJheTxzdHJpbmc+IHtcbiAgICBjb25zdCBjbGFzc2VzID0gY2xhc3NMaXN0LnJlZHVjZSgoYWNjLCBwcmV2KSA9PiB7XG4gICAgICBjb25zdCBleGlzdGluZ1N0eWxlSW5kZXggPSBhY2MuZmluZEluZGV4KFxuICAgICAgICAocCkgPT5cbiAgICAgICAgICAoKHAgfHwgJycpLnNwbGl0KFJfVU5JRklZKSB8fCBbXSlbMF0gPT09XG4gICAgICAgICAgKChwcmV2IHx8ICcnKS5zcGxpdChSX1VOSUZJWSkgfHwgW10pWzBdLFxuICAgICAgKTtcbiAgICAgIGlmIChleGlzdGluZ1N0eWxlSW5kZXggPCAwKSB7XG4gICAgICAgIGFjYy5wdXNoKHByZXYpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWNjW2V4aXN0aW5nU3R5bGVJbmRleF0gPSBwcmV2O1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCBbXSk7XG4gICAgcmV0dXJuIGNsYXNzZXM7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGFwcGVuZFN0eWxlKFxuICAgIHN0eWxlRWxlbWVudHM6IGFueSxcbiAgICBicDogc3RyaW5nLFxuICAgIHN0eWxlOiBzdHJpbmcsXG4gICAgc2lsZW50OiBib29sZWFuID0gdHJ1ZSxcbiAgKTogdm9pZCB7XG4gICAgc3R5bGVFbGVtZW50c1ticF0uYXBwZW5kQ2hpbGQoZG9jLmNyZWF0ZVRleHROb2RlKHN0eWxlKSk7XG5cbiAgICBpZiAoIXNpbGVudCkge1xuICAgICAgTWFwbGUub25TdHlsZUFwcGVuZCQubmV4dCh7IGJwLCBzdHlsZSB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGlzTWVkaWFWYWxpZChtZWRpYTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIG1lZGlhIGluIEJSRUFLUE9JTlQubWVkaWE7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGlzQnJlYWtwb2ludFZhbGlkKGJyZWFrcG9pbnQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBicmVha3BvaW50IGluIE1hcGxlLmJyZWFrcG9pbnRNYXA7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGlzTWVkaWFNYXRjaGVzV2l0aEJyZWFrcG9pbnQoXG4gICAgbWVkaWE6IHN0cmluZyxcbiAgICBicmVha3BvaW50OiBzdHJpbmcsXG4gICk6IGJvb2xlYW4ge1xuICAgIGlmICghTWFwbGUuaXNCcmVha3BvaW50VmFsaWQoYnJlYWtwb2ludCkgfHwgIU1hcGxlLmlzTWVkaWFWYWxpZChtZWRpYSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBtZWRpYVNpemUgPSBCUkVBS1BPSU5ULm1lZGlhW21lZGlhXTtcbiAgICBjb25zdCBicmVha3BvaW50U2l6ZSA9IHBhcnNlRmxvYXQoTWFwbGUuYnJlYWtwb2ludE1hcFticmVha3BvaW50XSk7XG5cbiAgICBpZiAobWVkaWEuaW5jbHVkZXMoU1VGRklYX01FRElBX0RPV04pKSB7XG4gICAgICByZXR1cm4gYnJlYWtwb2ludFNpemUgPD0gbWVkaWFTaXplO1xuICAgIH1cblxuICAgIGlmIChtZWRpYS5pbmNsdWRlcyhTVUZGSVhfTUVESUFfVVApKSB7XG4gICAgICByZXR1cm4gYnJlYWtwb2ludFNpemUgPj0gbWVkaWFTaXplO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0VmFsaWRNZWRpYU1hcCgpOiBhbnkge1xuICAgIHJldHVybiB7IC4uLkJSRUFLUE9JTlQubWVkaWEgfTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TWluTWVkaWEoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gQlJFQUtQT0lOVC5taW5NZWRpYTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TWluQnJlYWtwb2ludCgpOiBzdHJpbmcge1xuICAgIHJldHVybiBCUkVBS1BPSU5ULm1pbktleTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TWFwcGVkTWVkaWFPck1pbihtZWRpYTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gTWFwbGUuaXNNZWRpYVZhbGlkKG1lZGlhKSA/IG1lZGlhIDogTWFwbGUuZ2V0TWluTWVkaWEoKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TWFwcGVkTWVkaWFPck51bGwobWVkaWE6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIE1hcGxlLmlzTWVkaWFWYWxpZChtZWRpYSkgPyBtZWRpYSA6IG51bGw7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldE1hcHBlZEJyZWFrcG9pbnRPck1pbihicmVha3BvaW50OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBNYXBsZS5pc0JyZWFrcG9pbnRWYWxpZChicmVha3BvaW50KVxuICAgICAgPyBicmVha3BvaW50XG4gICAgICA6IE1hcGxlLmdldE1pbkJyZWFrcG9pbnQoKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TWFwcGVkQnJlYWtwb2ludE9yTnVsbChicmVha3BvaW50OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBNYXBsZS5pc0JyZWFrcG9pbnRWYWxpZChicmVha3BvaW50KSA/IGJyZWFrcG9pbnQgOiBudWxsO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRWYXJpYWJsZXMoKTogTWFwbGVWYXJpYWJsZU1vZGVsIHtcbiAgICByZXR1cm4geyAuLi5NYXBsZS52YXJpYWJsZXMgfTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZmlsbEluVGhlR2FwcyhicmVha3BvaW50TWFwOiBhbnkpOiBhbnkge1xuICAgIGNvbnN0IGZ1bGxCcmVha3BvaW50TWFwID0gTWFwbGUuZ2V0VmFyaWFibGVzKCkuYnJlYWtwb2ludDtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoZnVsbEJyZWFrcG9pbnRNYXApO1xuICAgIGNvbnN0IG1pbktleSA9IGtleXMuZmluZCgoa2V5KSA9PiBrZXkgaW4gYnJlYWtwb2ludE1hcCk7XG4gICAgcmV0dXJuIGtleXNcbiAgICAgIC5zb3J0KChhLCBiKSA9PiBmdWxsQnJlYWtwb2ludE1hcFthXSAtIGZ1bGxCcmVha3BvaW50TWFwW2JdKVxuICAgICAgLnJlZHVjZSgoYWNjLCBrZXksIGkpID0+IHtcbiAgICAgICAgY29uc3QgbmV4dEtleSA9IGtleXNbaSArIDFdO1xuICAgICAgICBpZiAoa2V5IGluIGFjYyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBhY2MgPSB7XG4gICAgICAgICAgICAuLi5hY2MsXG4gICAgICAgICAgICBba2V5XTpcbiAgICAgICAgICAgICAga2V5IGluIGJyZWFrcG9pbnRNYXAgPyBicmVha3BvaW50TWFwW2tleV0gOiBicmVha3BvaW50TWFwW21pbktleV0sXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV4dEtleSAmJiAhYnJlYWtwb2ludE1hcFtuZXh0S2V5XSkge1xuICAgICAgICAgIGFjYyA9IHtcbiAgICAgICAgICAgIC4uLmFjYyxcbiAgICAgICAgICAgIFtuZXh0S2V5XTogYWNjW2tleV0sXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgfSwge30pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpc0JyZWFrcG9pbnRNYXAoYnJlYWtwb2ludE1hcDogYW55KTogYW55IHtcbiAgICBpZiAodHlwZW9mIGJyZWFrcG9pbnRNYXAgPT09ICdvYmplY3QnICYmIGJyZWFrcG9pbnRNYXAgIT09IG51bGwpIHtcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyhNYXBsZS5nZXRWYXJpYWJsZXMoKS5icmVha3BvaW50KS5zb21lKFxuICAgICAgICAoa2V5KSA9PiBicmVha3BvaW50TWFwICYmIGtleSBpbiBicmVha3BvaW50TWFwLFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iXX0=