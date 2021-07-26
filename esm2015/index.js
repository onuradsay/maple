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
const BREAKPOINT = {
    media: {},
};
const STYLE_ELEMENTS = {};
const STR_EMPTY = '';
const STR_SPACE = ' ';
const STR_DOT = '.';
const STR_UP = 'up';
const STR_DOWN = 'down';
const SEP_MEDIA = '-';
const SEP_SELECTOR = ':';
const SEP_UTIL_KEY = ':';
const SEP_UTIL_VAL = '=';
const SEP_NO_SPACE = '<';
const SEP_OUTER_SPACE = '<<';
const IMPORTANT = '!';
const WILDCARD = '*';
const PREFIX_MAPLE_PROP = '_';
const SUFFIX_MEDIA_UP = SEP_MEDIA + STR_UP;
const SUFFIX_MEDIA_DOWN = SEP_MEDIA + STR_DOWN;
const R_SELECTOR_RESERVED = /(\.|\+|\~|\<|\>|\[|\]|\(|\)|\!|\:|\,|\=|\||\%|\#|\*|\"|\/)/g;
const R_ESCAPE_RESERVED = '\\$1';
const R_SEP_NO_SPACE = /\</g;
const R_SEP_SEL_SPACE = /\>\>/g;
const R_SEP_SEL_SPACE_ALL = /(\<|\>\>)/g;
const R_SEP_VAL_SPACE = /\|/g;
const R_SEP_UTIL_VAL = /=(?:.(?!=))+$/;
const R_SEP_UTIL_KEY = /\:(?:.(?!\:))+$/;
const R_CUSTOM = /\((.*?)\)/;
const R_WILDCARD = /\*/g;
const R_EXTRACT_CLASS = /class\=\"([\s\S]+?)\"/g;
const R_UNIFIY = /\=(?=[^.]*$)/;
let preInitClassList = [];
let isMapleEnabled = true;
let doc;
const esc = (selector) => selector.replace(R_SELECTOR_RESERVED, R_ESCAPE_RESERVED);
export class Maple {
    constructor() { }
    // Find min and max breakpoints
    static setMinAndMaxBreakpoints() {
        const breakpointKeys = Object.keys(Maple.breakpointMap);
        const breakpoints = breakpointKeys
            .map((key) => ({
            key,
            size: parseFloat(Maple.breakpointMap[key]),
        }))
            .sort((a, b) => a.size - b.size);
        BREAKPOINT.minKey = breakpoints[0].key;
        BREAKPOINT.maxKey = breakpoints[breakpoints.length - 1].key;
        BREAKPOINT.minMedia = BREAKPOINT.minKey + SUFFIX_MEDIA_UP;
        breakpoints.forEach((bp, i) => {
            const next = breakpoints[i + 1];
            BREAKPOINT.media[bp.key + SUFFIX_MEDIA_UP] = bp.size;
            if (next) {
                // Uses 0.02px rather than 0.01px to work around a current rounding bug in Safari.
                // See https://bugs.webkit.org/show_bug.cgi?id=178261
                BREAKPOINT.media[bp.key + SUFFIX_MEDIA_DOWN] = next.size - 0.02;
            }
        });
    }
    static createDomElements(styleElements, prefix = 'maple', document) {
        // Prepare style element on head
        const docHead = (document || doc).getElementsByTagName('head')[0];
        const breakpoints = Object.keys(BREAKPOINT.media)
            .sort((a, b) => BREAKPOINT.media[a] - BREAKPOINT.media[b])
            .sort((a, b) => a.indexOf(SUFFIX_MEDIA_UP));
        breakpoints
            .slice(breakpoints.indexOf(BREAKPOINT.minMedia), breakpoints.length)
            .concat(breakpoints.slice(0, breakpoints.indexOf(BREAKPOINT.minMedia)))
            .forEach((key) => {
            const styleId = `${prefix}-${key}`;
            const el = doc.getElementById(styleId);
            if (!!el) {
                docHead.removeChild(el);
            }
            styleElements[key] = doc.createElement('style');
            styleElements[key].setAttribute('id', styleId);
            docHead.appendChild(styleElements[key]);
        });
    }
    static extendProperties() {
        Maple.utilPrefixList.forEach((def) => {
            Maple.utilClassMap[def.prefix] = Maple.utilClassMap[def.prefix] || {};
            Maple.utilClassMap[def.prefix][WILDCARD] = {};
            Object.keys(def.map).forEach((key) => {
                Maple.utilClassMap[def.prefix][key] = {};
                def.props.forEach((prop) => {
                    Maple.utilClassMap[def.prefix][WILDCARD] = Object.assign(Object.assign({}, Maple.utilClassMap[def.prefix][WILDCARD]), { [prop]: WILDCARD });
                    Maple.utilClassMap[def.prefix][key][prop] = def.map[key];
                });
            });
        });
    }
    static getSelectors(media = STR_EMPTY, selKey = STR_EMPTY, utilKey = STR_EMPTY, utilVal = STR_EMPTY, _selector = STR_EMPTY, important = false) {
        const maple = Maple.utilClassMap[selKey] || {};
        _selector = (maple._selector || '') + _selector;
        const parentSelector = selKey.includes(SEP_OUTER_SPACE)
            ? selKey.split(SEP_OUTER_SPACE).pop().split(R_SEP_SEL_SPACE_ALL).shift()
            : STR_EMPTY;
        const baseSel = [
            media || STR_EMPTY,
            maple._selector ? SEP_SELECTOR : STR_EMPTY,
            selKey,
            utilKey ? SEP_UTIL_KEY : STR_EMPTY,
            utilKey,
            utilVal ? SEP_UTIL_VAL : STR_EMPTY,
        ].join(STR_EMPTY);
        return _selector
            .split(/,\s*/)
            .map((selector) => [
            parentSelector ? parentSelector + STR_SPACE : STR_EMPTY,
            utilVal ? STR_DOT : STR_EMPTY,
            utilVal ? esc(baseSel + utilVal) : `[class*="${baseSel}"]`,
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
        ].join(STR_EMPTY))
            .join(',');
    }
    static cache(media, selector, mapToBeCached) {
        if (!mapToBeCached) {
            throw new Error(`Property map not found for selector: ${selector}`);
        }
        const cacheKey = `${media}${selector}${JSON.stringify(mapToBeCached)}`;
        if (!Maple.CACHE[cacheKey]) {
            Maple.tempCache[media] = Maple.tempCache[media] || {};
            Maple.tempCache[media] = Object.assign(Object.assign({}, Maple.tempCache[media]), { [selector]: Object.assign(Object.assign({}, (Maple.tempCache[media][selector] || {})), mapToBeCached) });
            Maple.CACHE[cacheKey] = 1;
        }
    }
    static styles(media) {
        const cacheItem = Maple.tempCache[media];
        if (!cacheItem) {
            return STR_EMPTY;
        }
        const selectors = Object.keys(cacheItem);
        if (selectors.length === 0) {
            return STR_EMPTY;
        }
        const breakpointParts = media.split(SEP_MEDIA);
        const breakpointDir = breakpointParts[1];
        const mediaQuery = breakpointDir === STR_UP ? 'min-width' : 'max-width';
        const result = [];
        // open media query
        if (media !== BREAKPOINT.minMedia) {
            result.push(`@media (${mediaQuery}: ${BREAKPOINT.media[media]}px) {`);
        }
        for (const selector of selectors) {
            const propMap = cacheItem[selector];
            if (!propMap) {
                continue;
            }
            const propMapKeys = Object.keys(propMap).filter((p) => p !== IMPORTANT);
            if (propMapKeys.length === 0) {
                continue;
            }
            // open selector
            result.push(`${selector}{`);
            // fill selector with properties
            for (const prop of propMapKeys) {
                const val = propMap[prop].toString();
                const important = val.indexOf(IMPORTANT) < 0 && propMap[IMPORTANT]
                    ? ' !important'
                    : STR_EMPTY;
                result.push(Maple.propExtensionMap[prop]
                    ? Maple.propExtensionMap[prop](val, important)
                    : `${prop}:${val}${important};`);
            }
            // close selector
            result.push(`}`);
        }
        // close media query
        if (media !== BREAKPOINT.minMedia) {
            result.push(`}`);
        }
        return result.length > 2 ? result.join(STR_EMPTY) : STR_EMPTY;
    }
    static generateWhitelist(whitelist = []) {
        const classList = [];
        for (const utilKey of whitelist) {
            if (!Maple.utilClassMap[utilKey]) {
                classList.push(utilKey);
                continue;
            }
            const props = Object.keys(Maple.utilClassMap[utilKey]);
            for (const utilVal of props) {
                if (utilVal.charAt(0) === PREFIX_MAPLE_PROP) {
                    continue;
                }
                const breakpoints = Object.keys(Maple.breakpointMap);
                for (const bp of breakpoints) {
                    const mediaUp = bp + SUFFIX_MEDIA_UP;
                    const mediaDown = bp + SUFFIX_MEDIA_DOWN;
                    const utilClass = SEP_UTIL_KEY + utilKey + SEP_UTIL_VAL + utilVal;
                    if (mediaUp in BREAKPOINT.media) {
                        classList.push(mediaUp + utilClass);
                    }
                    if (mediaDown in BREAKPOINT.media) {
                        classList.push(mediaDown + utilClass);
                    }
                }
            }
        }
        Maple.fly(preInitClassList.concat(classList));
    }
    static splitLastOccurrence(str, key) {
        const pos = str.lastIndexOf(key);
        const result = [];
        const firstPart = str.substring(0, pos);
        const lastPart = str.substring(pos + key.length);
        if (firstPart) {
            result.push(firstPart);
        }
        if (lastPart) {
            result.push(lastPart);
        }
        return result;
    }
    static splitFirstOccurrence(str, key) {
        const pos = str.indexOf(key);
        const result = [];
        const firstPart = str.substring(0, pos);
        const lastPart = str.substring(pos + key.length);
        if (firstPart) {
            result.push(firstPart);
        }
        if (lastPart) {
            result.push(lastPart);
        }
        return result;
    }
    static init(document, enabled, utilClassMap = {}, whitelist, variables = Maple.variables, isRtl = false, utilPrefixList = [], propExtensionMap = {}) {
        isMapleEnabled = enabled;
        if (isMapleEnabled === false) {
            return;
        }
        doc = document;
        Maple.CACHE = {};
        Maple.variables = Object.assign(Object.assign({}, Maple.variables), variables);
        MapleColorHelper.generateAlphaColors(Maple.variables.color);
        Maple.utilClassMap = Object.assign(Object.assign({}, getMapleUtilityClassMap(Maple.variables)), utilClassMap);
        Maple.utilPrefixList = [
            ...getMapleUtilityVariableMap(Maple.variables),
            ...utilPrefixList,
        ];
        Maple.propExtensionMap = Object.assign(Object.assign({}, MAPLE_PROP_EXTENSION_MAP), propExtensionMap);
        Maple.breakpointMap = Object.assign({}, Maple.variables.breakpoint);
        Maple.setMinAndMaxBreakpoints();
        Maple.createDomElements(STYLE_ELEMENTS);
        Maple.extendProperties();
        Maple.utilClassMap = Maple.convertUtilClassMapToRtl(Maple.utilClassMap, isRtl);
        Maple.generateWhitelist(whitelist);
        this.onInit$.next(true);
    }
    static findAndFly(str) {
        if (isMapleEnabled === false) {
            return;
        }
        if (str) {
            Maple.fly((str.match(R_EXTRACT_CLASS) || [])
                .join(' ')
                .replace(/class\=\"/g, '')
                .replace(/"/g, ''));
        }
    }
    static fly(classList) {
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
        const rawCacheKey = Array.isArray(classList)
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
        for (const classItem of classList) {
            // Check whether the styles will have !important flag or not
            const important = classItem.charAt(classItem.length - 1) === IMPORTANT;
            const classItemWithoutImportant = classItem.replace(IMPORTANT, STR_EMPTY);
            let parts = Maple.splitLastOccurrence(classItemWithoutImportant, SEP_UTIL_VAL);
            // Extract utility value
            const utilVal = parts.length === 1 ? null : parts.pop();
            // Extract media query
            const media = Object.keys(BREAKPOINT.media).find((key) => classItem.indexOf(key) === 0) || BREAKPOINT.minMedia;
            parts = Maple.splitFirstOccurrence(parts.join(STR_EMPTY), media)
                .join(STR_EMPTY)
                .split(SEP_UTIL_KEY)
                .filter((p) => !!p);
            // Exact utility class
            const utilKey = parts.length >= 1 ? parts.pop() : null;
            // Extract selector
            const selKey = parts.join(SEP_UTIL_KEY);
            // Get style map
            const maple = Maple.utilClassMap[utilKey];
            // Without a style map we can't create styles
            if (!maple) {
                continue;
            }
            // Cache default styles with selector
            if (maple._default) {
                Object.keys(maple._default).forEach((mediaItem) => {
                    Maple.cache(mediaItem, Maple.getSelectors(null, selKey, utilKey, null, maple._selector, important), Object.assign(Object.assign({}, maple._common), maple[maple._default[mediaItem]]));
                });
            }
            // Cache utility styles with selector
            if (utilVal) {
                const c = classItem.replace(IMPORTANT, STR_EMPTY);
                const ucm = Maple.utilClassMap;
                //#region Wildcard selectors
                // *:util-key
                // *:util-key=util-val
                // *.selector:util-key=util-val
                // *:selector-key:util-key=util-val
                const wcMedia = c.replace(media, WILDCARD);
                // media:*
                // media.selector:*
                // media:selector-key:*
                const wcutilKey = c.replace(R_SEP_UTIL_KEY, `:${WILDCARD}`);
                // media:util-key=*
                // media.selector:util-key=*
                // media:selector-key:util-key=*
                const wcutilVal = c.replace(R_SEP_UTIL_VAL, `=${WILDCARD}`);
                // *:*
                // *.selector:*
                // *:selector-key:*
                const wcMediaKey = wcMedia.replace(R_SEP_UTIL_KEY, `:${WILDCARD}`);
                // *:util-key=*
                // *.selector:util-key=*
                // *:selector-key:util-key=*
                const wcMediaVal = wcutilVal.replace(media, WILDCARD);
                //#endregion
                const selector = Maple.getSelectors(media, selKey, utilKey, utilVal, maple._selector, important);
                Maple.cache(media, selector, Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, maple._common), maple[utilVal]), JSON.parse(JSON.stringify(maple[utilVal.replace(R_CUSTOM, WILDCARD)] || {}).replace(R_WILDCARD, utilKey === 'content'
                    ? utilVal.replace(R_CUSTOM, '$1')
                    : utilVal.replace(R_CUSTOM, '$1').replace(R_SEP_VAL_SPACE, ' ')))), (ucm[wcMediaKey] || {})), (ucm[wcutilKey] || {})), (ucm[wcMediaVal] || {})), (ucm[wcutilVal] || {})), (ucm[wcMedia] || {})), (ucm[c] || {})), { [IMPORTANT]: important }));
            }
        }
        //#region Generate styles
        // Generate min media query styles
        const minMediaStyles = Maple.styles(BREAKPOINT.minMedia);
        if (minMediaStyles) {
            Maple.appendStyle(STYLE_ELEMENTS, BREAKPOINT.minMedia, minMediaStyles, false);
        }
        // Generate media query styles
        const mediaQueryStyles = {};
        Object.keys(Maple.tempCache).forEach((key) => {
            if (key !== BREAKPOINT.minMedia) {
                mediaQueryStyles[key] = mediaQueryStyles[key] || '';
                mediaQueryStyles[key] += Maple.styles(key);
            }
        });
        Object.keys(mediaQueryStyles).forEach((key) => Maple.appendStyle(STYLE_ELEMENTS, key, mediaQueryStyles[key], false));
        //#endregion
    }
    static unifyUtilityClass(classList) {
        const classes = classList.reduce((acc, prev) => {
            const existingStyleIndex = acc.findIndex((p) => ((p || '').split(R_UNIFIY) || [])[0] ===
                ((prev || '').split(R_UNIFIY) || [])[0]);
            if (existingStyleIndex < 0) {
                acc.push(prev);
            }
            else {
                acc[existingStyleIndex] = prev;
            }
            return acc;
        }, []);
        return classes;
    }
    static appendStyle(styleElements, bp, style, silent = true) {
        styleElements[bp].appendChild(doc.createTextNode(style));
        if (!silent) {
            Maple.onStyleAppend$.next({ bp, style });
        }
    }
    static isMediaValid(media) {
        return media in BREAKPOINT.media;
    }
    static isBreakpointValid(breakpoint) {
        return breakpoint in Maple.breakpointMap;
    }
    static isMediaMatchesWithBreakpoint(media, breakpoint) {
        if (!Maple.isBreakpointValid(breakpoint) || !Maple.isMediaValid(media)) {
            return false;
        }
        const mediaSize = BREAKPOINT.media[media];
        const breakpointSize = parseFloat(Maple.breakpointMap[breakpoint]);
        if (media.includes(SUFFIX_MEDIA_DOWN)) {
            return breakpointSize <= mediaSize;
        }
        if (media.includes(SUFFIX_MEDIA_UP)) {
            return breakpointSize >= mediaSize;
        }
        return false;
    }
    static getValidMediaMap() {
        return Object.assign({}, BREAKPOINT.media);
    }
    static getMinMedia() {
        return BREAKPOINT.minMedia;
    }
    static getMinBreakpoint() {
        return BREAKPOINT.minKey;
    }
    static getMappedMediaOrMin(media) {
        return Maple.isMediaValid(media) ? media : Maple.getMinMedia();
    }
    static getMappedMediaOrNull(media) {
        return Maple.isMediaValid(media) ? media : null;
    }
    static getMappedBreakpointOrMin(breakpoint) {
        return Maple.isBreakpointValid(breakpoint)
            ? breakpoint
            : Maple.getMinBreakpoint();
    }
    static getMappedBreakpointOrNull(breakpoint) {
        return Maple.isBreakpointValid(breakpoint) ? breakpoint : null;
    }
    static getVariables() {
        return Object.assign({}, Maple.variables);
    }
    static fillInTheGaps(breakpointMap) {
        const fullBreakpointMap = Maple.getVariables().breakpoint;
        const keys = Object.keys(fullBreakpointMap);
        const minKey = keys.find((key) => key in breakpointMap);
        return keys
            .sort((a, b) => fullBreakpointMap[a] - fullBreakpointMap[b])
            .reduce((acc, key, i) => {
            const nextKey = keys[i + 1];
            if (key in acc === false) {
                acc = Object.assign(Object.assign({}, acc), { [key]: key in breakpointMap ? breakpointMap[key] : breakpointMap[minKey] });
            }
            if (nextKey && !breakpointMap[nextKey]) {
                acc = Object.assign(Object.assign({}, acc), { [nextKey]: acc[key] });
            }
            return acc;
        }, {});
    }
    static isBreakpointMap(breakpointMap) {
        if (typeof breakpointMap === 'object' && breakpointMap !== null) {
            return Object.keys(Maple.getVariables().breakpoint).some((key) => breakpointMap && key in breakpointMap);
        }
        return false;
    }
}
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
Maple.convertUtilClassMapToRtl = (utilityClass, isRtl) => {
    if (!isRtl) {
        return utilityClass;
    }
    const data = {};
    Object.keys(utilityClass).forEach((key) => {
        const value = utilityClass[key];
        if (value && typeof value === 'object' && value.rtl) {
            Object.keys(value.rtl).reduce((rtlValue, rtlKey) => {
                rtlValue[rtlKey] = value.rtl[rtlKey];
            }, value);
        }
        if (typeof value === 'string' || typeof value === 'number') {
            if (key.includes('left')) {
                const replacedKey = key.replace('left', 'right');
                data[replacedKey] = value;
            }
            else if (key.includes('right')) {
                const replacedKey = key.replace('right', 'left');
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
                !['Y(', 'Z('].some((t) => value.includes(t))) {
                data[key] = value
                    .split(' ')
                    .map((item) => {
                    const splittedValue = item.split('(');
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
            const fixedUtility = Maple.convertUtilClassMapToRtl(Object.assign({}, value), isRtl);
            data[key] = Object.assign({}, fixedUtility);
        }
    });
    return data;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXBsZS8iLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdkMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFcEUsT0FBTyxFQUNMLHVCQUF1QixFQUN2QiwwQkFBMEIsR0FDM0IsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDcEQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRTlELCtFQUErRTtBQUMvRSxNQUFNLFVBQVUsR0FBUTtJQUN0QixLQUFLLEVBQUUsRUFBRTtDQUNWLENBQUM7QUFDRixNQUFNLGNBQWMsR0FBRyxFQUFFLENBQUM7QUFFMUIsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDO0FBQ3JCLE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQztBQUN0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aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTWFwbGVDb2xvckhlbHBlciB9IGZyb20gJy4vaGVscGVycy9jb2xvci5oZWxwZXInO1xuaW1wb3J0IHsgTUFQTEVfUFJPUF9FWFRFTlNJT05fTUFQIH0gZnJvbSAnLi9wcm9wZXJ0eS1leHRlbnNpb24tbWFwJztcbmltcG9ydCB7IE1hcGxlVmFyaWFibGVNb2RlbCB9IGZyb20gJy4vdHlwZXMvdmFyaWFibGVzLm1vZGVsJztcbmltcG9ydCB7XG4gIGdldE1hcGxlVXRpbGl0eUNsYXNzTWFwLFxuICBnZXRNYXBsZVV0aWxpdHlWYXJpYWJsZU1hcCxcbn0gZnJvbSAnLi91dGlsaXR5LWNsYXNzLW1hcCc7XG5pbXBvcnQgeyBNQVBMRV9WQVJfQUxFUlQgfSBmcm9tICcuL3ZhcmlhYmxlcy9hbGVydCc7XG5pbXBvcnQgeyBNQVBMRV9WQVJfQlJFQUtQT0lOVCB9IGZyb20gJy4vdmFyaWFibGVzL2JyZWFrcG9pbnQnO1xuaW1wb3J0IHsgTUFQTEVfVkFSX0JVVFRPTiB9IGZyb20gJy4vdmFyaWFibGVzL2J1dHRvbic7XG5pbXBvcnQgeyBNQVBMRV9WQVJfQ09MT1IgfSBmcm9tICcuL3ZhcmlhYmxlcy9jb2xvcic7XG5pbXBvcnQgeyBNQVBMRV9WQVJfRk9OVF9GQU1JTFkgfSBmcm9tICcuL3ZhcmlhYmxlcy9mb250LWZhbWlseSc7XG5pbXBvcnQgeyBNQVBMRV9WQVJfRk9OVF9TSVpFIH0gZnJvbSAnLi92YXJpYWJsZXMvZm9udC1zaXplJztcbmltcG9ydCB7IE1BUExFX1ZBUl9GT05UX1dFSUdIVCB9IGZyb20gJy4vdmFyaWFibGVzL2ZvbnQtd2VpZ2h0JztcbmltcG9ydCB7IE1BUExFX1ZBUl9NQVhfV0lEVEggfSBmcm9tICcuL3ZhcmlhYmxlcy9tYXgtd2lkdGgnO1xuaW1wb3J0IHsgTUFQTEVfVkFSX1NQQUNFUiB9IGZyb20gJy4vdmFyaWFibGVzL3NwYWNlcic7XG5pbXBvcnQgeyBNQVBMRV9WQVJfVFJBTlNJVElPTiB9IGZyb20gJy4vdmFyaWFibGVzL3RyYW5zaXRpb24nO1xuXG4vLyBEZWZpbmUgYSBnbG9iYWwgTWFwbGUuQ0FDSEUgdG8gY29sbGVjdCBzZWxlY3RvcnMgYW5kIG1hcHMgb24gYnJlYWtwb2ludCBrZXlzXG5jb25zdCBCUkVBS1BPSU5UOiBhbnkgPSB7XG4gIG1lZGlhOiB7fSxcbn07XG5jb25zdCBTVFlMRV9FTEVNRU5UUyA9IHt9O1xuXG5jb25zdCBTVFJfRU1QVFkgPSAnJztcbmNvbnN0IFNUUl9TUEFDRSA9ICcgJztcbmNvbnN0IFNUUl9ET1QgPSAnLic7XG5jb25zdCBTVFJfVVAgPSAndXAnO1xuY29uc3QgU1RSX0RPV04gPSAnZG93bic7XG5jb25zdCBTRVBfTUVESUEgPSAnLSc7XG5jb25zdCBTRVBfU0VMRUNUT1IgPSAnOic7XG5jb25zdCBTRVBfVVRJTF9LRVkgPSAnOic7XG5jb25zdCBTRVBfVVRJTF9WQUwgPSAnPSc7XG5jb25zdCBTRVBfTk9fU1BBQ0UgPSAnPCc7XG5jb25zdCBTRVBfT1VURVJfU1BBQ0UgPSAnPDwnO1xuY29uc3QgSU1QT1JUQU5UID0gJyEnO1xuY29uc3QgV0lMRENBUkQgPSAnKic7XG5cbmNvbnN0IFBSRUZJWF9NQVBMRV9QUk9QID0gJ18nO1xuY29uc3QgU1VGRklYX01FRElBX1VQID0gU0VQX01FRElBICsgU1RSX1VQO1xuY29uc3QgU1VGRklYX01FRElBX0RPV04gPSBTRVBfTUVESUEgKyBTVFJfRE9XTjtcblxuY29uc3QgUl9TRUxFQ1RPUl9SRVNFUlZFRCA9IC8oXFwufFxcK3xcXH58XFw8fFxcPnxcXFt8XFxdfFxcKHxcXCl8XFwhfFxcOnxcXCx8XFw9fFxcfHxcXCV8XFwjfFxcKnxcXFwifFxcLykvZztcbmNvbnN0IFJfRVNDQVBFX1JFU0VSVkVEID0gJ1xcXFwkMSc7XG5jb25zdCBSX1NFUF9OT19TUEFDRSA9IC9cXDwvZztcbmNvbnN0IFJfU0VQX1NFTF9TUEFDRSA9IC9cXD5cXD4vZztcbmNvbnN0IFJfU0VQX1NFTF9TUEFDRV9BTEwgPSAvKFxcPHxcXD5cXD4pL2c7XG5jb25zdCBSX1NFUF9WQUxfU1BBQ0UgPSAvXFx8L2c7XG5jb25zdCBSX1NFUF9VVElMX1ZBTCA9IC89KD86Lig/IT0pKSskLztcbmNvbnN0IFJfU0VQX1VUSUxfS0VZID0gL1xcOig/Oi4oPyFcXDopKSskLztcbmNvbnN0IFJfQ1VTVE9NID0gL1xcKCguKj8pXFwpLztcbmNvbnN0IFJfV0lMRENBUkQgPSAvXFwqL2c7XG5jb25zdCBSX0VYVFJBQ1RfQ0xBU1MgPSAvY2xhc3NcXD1cXFwiKFtcXHNcXFNdKz8pXFxcIi9nO1xuY29uc3QgUl9VTklGSVkgPSAvXFw9KD89W14uXSokKS87XG5cbmxldCBwcmVJbml0Q2xhc3NMaXN0ID0gW107XG5sZXQgaXNNYXBsZUVuYWJsZWQgPSB0cnVlO1xubGV0IGRvYztcblxuY29uc3QgZXNjID0gKHNlbGVjdG9yOiBzdHJpbmcpID0+XG4gIHNlbGVjdG9yLnJlcGxhY2UoUl9TRUxFQ1RPUl9SRVNFUlZFRCwgUl9FU0NBUEVfUkVTRVJWRUQpO1xuXG5leHBvcnQgY2xhc3MgTWFwbGUge1xuICBwcml2YXRlIHN0YXRpYyBDQUNIRSA9IHt9O1xuICBwcml2YXRlIHN0YXRpYyB2YXJpYWJsZXM6IE1hcGxlVmFyaWFibGVNb2RlbCA9IHtcbiAgICBicmVha3BvaW50OiBNQVBMRV9WQVJfQlJFQUtQT0lOVCxcbiAgICBjb2xvcjogTUFQTEVfVkFSX0NPTE9SLFxuICAgIGZvbnRGYW1pbHk6IE1BUExFX1ZBUl9GT05UX0ZBTUlMWSxcbiAgICBmb250U2l6ZTogTUFQTEVfVkFSX0ZPTlRfU0laRSxcbiAgICBmb250V2VpZ2h0OiBNQVBMRV9WQVJfRk9OVF9XRUlHSFQsXG4gICAgbWF4V2lkdGg6IE1BUExFX1ZBUl9NQVhfV0lEVEgsXG4gICAgc3BhY2VyOiBNQVBMRV9WQVJfU1BBQ0VSLFxuICAgIHRyYW5zaXRpb246IE1BUExFX1ZBUl9UUkFOU0lUSU9OLFxuICAgIGJ1dHRvbjogTUFQTEVfVkFSX0JVVFRPTixcbiAgICBhbGVydDogTUFQTEVfVkFSX0FMRVJULFxuICB9O1xuICBwcml2YXRlIHN0YXRpYyBicmVha3BvaW50TWFwOiBhbnkgPSB7fTtcbiAgcHJpdmF0ZSBzdGF0aWMgdXRpbENsYXNzTWFwOiBhbnkgPSB7fTtcbiAgcHJpdmF0ZSBzdGF0aWMgdXRpbFByZWZpeExpc3Q6IEFycmF5PGFueT4gPSBbXTtcbiAgcHJpdmF0ZSBzdGF0aWMgcHJvcEV4dGVuc2lvbk1hcDogYW55ID0ge307XG4gIHByaXZhdGUgc3RhdGljIHJhd0NhY2hlOiBhbnkgPSB7fTtcbiAgcHJpdmF0ZSBzdGF0aWMgdGVtcENhY2hlOiBhbnkgPSB7fTtcbiAgcHVibGljIHN0YXRpYyBvblN0eWxlQXBwZW5kJDogQmVoYXZpb3JTdWJqZWN0PGFueT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFxuICAgIG51bGwsXG4gICk7XG4gIHB1YmxpYyBzdGF0aWMgb25Jbml0JDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICAvLyBGaW5kIG1pbiBhbmQgbWF4IGJyZWFrcG9pbnRzXG4gIHByaXZhdGUgc3RhdGljIHNldE1pbkFuZE1heEJyZWFrcG9pbnRzKCkge1xuICAgIGNvbnN0IGJyZWFrcG9pbnRLZXlzOiBBcnJheTxzdHJpbmc+ID0gT2JqZWN0LmtleXMoTWFwbGUuYnJlYWtwb2ludE1hcCk7XG4gICAgY29uc3QgYnJlYWtwb2ludHMgPSBicmVha3BvaW50S2V5c1xuICAgICAgLm1hcCgoa2V5KSA9PiAoe1xuICAgICAgICBrZXksXG4gICAgICAgIHNpemU6IHBhcnNlRmxvYXQoTWFwbGUuYnJlYWtwb2ludE1hcFtrZXldKSxcbiAgICAgIH0pKVxuICAgICAgLnNvcnQoKGEsIGIpID0+IGEuc2l6ZSAtIGIuc2l6ZSk7XG5cbiAgICBCUkVBS1BPSU5ULm1pbktleSA9IGJyZWFrcG9pbnRzWzBdLmtleTtcbiAgICBCUkVBS1BPSU5ULm1heEtleSA9IGJyZWFrcG9pbnRzW2JyZWFrcG9pbnRzLmxlbmd0aCAtIDFdLmtleTtcbiAgICBCUkVBS1BPSU5ULm1pbk1lZGlhID0gQlJFQUtQT0lOVC5taW5LZXkgKyBTVUZGSVhfTUVESUFfVVA7XG5cbiAgICBicmVha3BvaW50cy5mb3JFYWNoKChicDogYW55LCBpOiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IG5leHQgPSBicmVha3BvaW50c1tpICsgMV07XG4gICAgICBCUkVBS1BPSU5ULm1lZGlhW2JwLmtleSArIFNVRkZJWF9NRURJQV9VUF0gPSBicC5zaXplO1xuICAgICAgaWYgKG5leHQpIHtcbiAgICAgICAgLy8gVXNlcyAwLjAycHggcmF0aGVyIHRoYW4gMC4wMXB4IHRvIHdvcmsgYXJvdW5kIGEgY3VycmVudCByb3VuZGluZyBidWcgaW4gU2FmYXJpLlxuICAgICAgICAvLyBTZWUgaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTE3ODI2MVxuICAgICAgICBCUkVBS1BPSU5ULm1lZGlhW2JwLmtleSArIFNVRkZJWF9NRURJQV9ET1dOXSA9IG5leHQuc2l6ZSAtIDAuMDI7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZURvbUVsZW1lbnRzKFxuICAgIHN0eWxlRWxlbWVudHM6IGFueSxcbiAgICBwcmVmaXggPSAnbWFwbGUnLFxuICAgIGRvY3VtZW50PyxcbiAgKSB7XG4gICAgLy8gUHJlcGFyZSBzdHlsZSBlbGVtZW50IG9uIGhlYWRcbiAgICBjb25zdCBkb2NIZWFkID0gKGRvY3VtZW50IHx8IGRvYykuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcbiAgICBjb25zdCBicmVha3BvaW50cyA9IE9iamVjdC5rZXlzKEJSRUFLUE9JTlQubWVkaWEpXG4gICAgICAuc29ydCgoYSwgYikgPT4gQlJFQUtQT0lOVC5tZWRpYVthXSAtIEJSRUFLUE9JTlQubWVkaWFbYl0pXG4gICAgICAuc29ydCgoYSwgYikgPT4gYS5pbmRleE9mKFNVRkZJWF9NRURJQV9VUCkpO1xuXG4gICAgYnJlYWtwb2ludHNcbiAgICAgIC5zbGljZShicmVha3BvaW50cy5pbmRleE9mKEJSRUFLUE9JTlQubWluTWVkaWEpLCBicmVha3BvaW50cy5sZW5ndGgpXG4gICAgICAuY29uY2F0KGJyZWFrcG9pbnRzLnNsaWNlKDAsIGJyZWFrcG9pbnRzLmluZGV4T2YoQlJFQUtQT0lOVC5taW5NZWRpYSkpKVxuICAgICAgLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBjb25zdCBzdHlsZUlkID0gYCR7cHJlZml4fS0ke2tleX1gO1xuICAgICAgICBjb25zdCBlbCA9IGRvYy5nZXRFbGVtZW50QnlJZChzdHlsZUlkKTtcbiAgICAgICAgaWYgKCEhZWwpIHtcbiAgICAgICAgICBkb2NIZWFkLnJlbW92ZUNoaWxkKGVsKTtcbiAgICAgICAgfVxuICAgICAgICBzdHlsZUVsZW1lbnRzW2tleV0gPSAoZG9jIGFzIERvY3VtZW50KS5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgICAoc3R5bGVFbGVtZW50c1trZXldIGFzIEhUTUxFbGVtZW50KS5zZXRBdHRyaWJ1dGUoJ2lkJywgc3R5bGVJZCk7XG4gICAgICAgIGRvY0hlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50c1trZXldKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgZXh0ZW5kUHJvcGVydGllcygpIHtcbiAgICBNYXBsZS51dGlsUHJlZml4TGlzdC5mb3JFYWNoKChkZWY6IGFueSkgPT4ge1xuICAgICAgTWFwbGUudXRpbENsYXNzTWFwW2RlZi5wcmVmaXhdID0gTWFwbGUudXRpbENsYXNzTWFwW2RlZi5wcmVmaXhdIHx8IHt9O1xuICAgICAgTWFwbGUudXRpbENsYXNzTWFwW2RlZi5wcmVmaXhdW1dJTERDQVJEXSA9IHt9O1xuICAgICAgT2JqZWN0LmtleXMoZGVmLm1hcCkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIE1hcGxlLnV0aWxDbGFzc01hcFtkZWYucHJlZml4XVtrZXldID0ge307XG4gICAgICAgIGRlZi5wcm9wcy5mb3JFYWNoKChwcm9wKSA9PiB7XG4gICAgICAgICAgTWFwbGUudXRpbENsYXNzTWFwW2RlZi5wcmVmaXhdW1dJTERDQVJEXSA9IHtcbiAgICAgICAgICAgIC4uLk1hcGxlLnV0aWxDbGFzc01hcFtkZWYucHJlZml4XVtXSUxEQ0FSRF0sXG4gICAgICAgICAgICBbcHJvcF06IFdJTERDQVJELFxuICAgICAgICAgIH07XG4gICAgICAgICAgTWFwbGUudXRpbENsYXNzTWFwW2RlZi5wcmVmaXhdW2tleV1bcHJvcF0gPSBkZWYubWFwW2tleV07XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBnZXRTZWxlY3RvcnMoXG4gICAgbWVkaWE6IHN0cmluZyA9IFNUUl9FTVBUWSxcbiAgICBzZWxLZXk6IHN0cmluZyA9IFNUUl9FTVBUWSxcbiAgICB1dGlsS2V5OiBzdHJpbmcgPSBTVFJfRU1QVFksXG4gICAgdXRpbFZhbDogc3RyaW5nID0gU1RSX0VNUFRZLFxuICAgIF9zZWxlY3Rvcjogc3RyaW5nID0gU1RSX0VNUFRZLFxuICAgIGltcG9ydGFudCA9IGZhbHNlLFxuICApIHtcbiAgICBjb25zdCBtYXBsZSA9IE1hcGxlLnV0aWxDbGFzc01hcFtzZWxLZXldIHx8IHt9O1xuICAgIF9zZWxlY3RvciA9IChtYXBsZS5fc2VsZWN0b3IgfHwgJycpICsgX3NlbGVjdG9yO1xuXG4gICAgY29uc3QgcGFyZW50U2VsZWN0b3IgPSBzZWxLZXkuaW5jbHVkZXMoU0VQX09VVEVSX1NQQUNFKVxuICAgICAgPyBzZWxLZXkuc3BsaXQoU0VQX09VVEVSX1NQQUNFKS5wb3AoKS5zcGxpdChSX1NFUF9TRUxfU1BBQ0VfQUxMKS5zaGlmdCgpXG4gICAgICA6IFNUUl9FTVBUWTtcblxuICAgIGNvbnN0IGJhc2VTZWwgPSBbXG4gICAgICBtZWRpYSB8fCBTVFJfRU1QVFksXG4gICAgICBtYXBsZS5fc2VsZWN0b3IgPyBTRVBfU0VMRUNUT1IgOiBTVFJfRU1QVFksXG4gICAgICBzZWxLZXksXG4gICAgICB1dGlsS2V5ID8gU0VQX1VUSUxfS0VZIDogU1RSX0VNUFRZLFxuICAgICAgdXRpbEtleSxcbiAgICAgIHV0aWxWYWwgPyBTRVBfVVRJTF9WQUwgOiBTVFJfRU1QVFksXG4gICAgXS5qb2luKFNUUl9FTVBUWSk7XG5cbiAgICByZXR1cm4gX3NlbGVjdG9yXG4gICAgICAuc3BsaXQoLyxcXHMqLylcbiAgICAgIC5tYXAoKHNlbGVjdG9yKSA9PlxuICAgICAgICBbXG4gICAgICAgICAgcGFyZW50U2VsZWN0b3IgPyBwYXJlbnRTZWxlY3RvciArIFNUUl9TUEFDRSA6IFNUUl9FTVBUWSxcbiAgICAgICAgICB1dGlsVmFsID8gU1RSX0RPVCA6IFNUUl9FTVBUWSxcbiAgICAgICAgICB1dGlsVmFsID8gZXNjKGJhc2VTZWwgKyB1dGlsVmFsKSA6IGBbY2xhc3MqPVwiJHtiYXNlU2VsfVwiXWAsXG4gICAgICAgICAgdXRpbFZhbCAmJiBpbXBvcnRhbnQgPyBlc2MoSU1QT1JUQU5UKSA6IFNUUl9FTVBUWSxcbiAgICAgICAgICBtYXBsZS5fc2VsZWN0b3IgfHwgIXNlbEtleSB8fCBzZWxLZXkuY2hhckF0KDApID09PSBTRVBfTk9fU1BBQ0VcbiAgICAgICAgICAgID8gU1RSX0VNUFRZXG4gICAgICAgICAgICA6IFNUUl9TUEFDRSxcbiAgICAgICAgICBtYXBsZS5fc2VsZWN0b3JcbiAgICAgICAgICAgID8gU1RSX0VNUFRZXG4gICAgICAgICAgICA6IHNlbEtleVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKFNFUF9PVVRFUl9TUEFDRSArIHBhcmVudFNlbGVjdG9yLCBTVFJfRU1QVFkpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoUl9TRVBfU0VMX1NQQUNFLCBTVFJfU1BBQ0UpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoUl9TRVBfTk9fU1BBQ0UsIFNUUl9FTVBUWSksXG4gICAgICAgICAgc2VsZWN0b3IudHJpbSgpLmNoYXJBdCgwKSA9PT0gU0VQX05PX1NQQUNFID8gU1RSX0VNUFRZIDogU1RSX1NQQUNFLFxuICAgICAgICAgIHNlbGVjdG9yXG4gICAgICAgICAgICAudHJpbSgpXG4gICAgICAgICAgICAucmVwbGFjZShSX1NFUF9TRUxfU1BBQ0UsIFNUUl9TUEFDRSlcbiAgICAgICAgICAgIC5yZXBsYWNlKFJfU0VQX05PX1NQQUNFLCBTVFJfRU1QVFkpLFxuICAgICAgICBdLmpvaW4oU1RSX0VNUFRZKSxcbiAgICAgIClcbiAgICAgIC5qb2luKCcsJyk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBjYWNoZShtZWRpYTogc3RyaW5nLCBzZWxlY3Rvcjogc3RyaW5nLCBtYXBUb0JlQ2FjaGVkOiBhbnkpIHtcbiAgICBpZiAoIW1hcFRvQmVDYWNoZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUHJvcGVydHkgbWFwIG5vdCBmb3VuZCBmb3Igc2VsZWN0b3I6ICR7c2VsZWN0b3J9YCk7XG4gICAgfVxuXG4gICAgY29uc3QgY2FjaGVLZXkgPSBgJHttZWRpYX0ke3NlbGVjdG9yfSR7SlNPTi5zdHJpbmdpZnkobWFwVG9CZUNhY2hlZCl9YDtcbiAgICBpZiAoIU1hcGxlLkNBQ0hFW2NhY2hlS2V5XSkge1xuICAgICAgTWFwbGUudGVtcENhY2hlW21lZGlhXSA9IE1hcGxlLnRlbXBDYWNoZVttZWRpYV0gfHwge307XG4gICAgICBNYXBsZS50ZW1wQ2FjaGVbbWVkaWFdID0ge1xuICAgICAgICAuLi5NYXBsZS50ZW1wQ2FjaGVbbWVkaWFdLFxuICAgICAgICBbc2VsZWN0b3JdOiB7XG4gICAgICAgICAgLi4uKE1hcGxlLnRlbXBDYWNoZVttZWRpYV1bc2VsZWN0b3JdIHx8IHt9KSxcbiAgICAgICAgICAuLi5tYXBUb0JlQ2FjaGVkLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICAgIE1hcGxlLkNBQ0hFW2NhY2hlS2V5XSA9IDE7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgc3R5bGVzKG1lZGlhOiBzdHJpbmcpIHtcbiAgICBjb25zdCBjYWNoZUl0ZW0gPSBNYXBsZS50ZW1wQ2FjaGVbbWVkaWFdO1xuICAgIGlmICghY2FjaGVJdGVtKSB7XG4gICAgICByZXR1cm4gU1RSX0VNUFRZO1xuICAgIH1cblxuICAgIGNvbnN0IHNlbGVjdG9ycyA9IE9iamVjdC5rZXlzKGNhY2hlSXRlbSk7XG5cbiAgICBpZiAoc2VsZWN0b3JzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIFNUUl9FTVBUWTtcbiAgICB9XG5cbiAgICBjb25zdCBicmVha3BvaW50UGFydHMgPSBtZWRpYS5zcGxpdChTRVBfTUVESUEpO1xuICAgIGNvbnN0IGJyZWFrcG9pbnREaXIgPSBicmVha3BvaW50UGFydHNbMV07XG4gICAgY29uc3QgbWVkaWFRdWVyeSA9IGJyZWFrcG9pbnREaXIgPT09IFNUUl9VUCA/ICdtaW4td2lkdGgnIDogJ21heC13aWR0aCc7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG5cbiAgICAvLyBvcGVuIG1lZGlhIHF1ZXJ5XG4gICAgaWYgKG1lZGlhICE9PSBCUkVBS1BPSU5ULm1pbk1lZGlhKSB7XG4gICAgICByZXN1bHQucHVzaChgQG1lZGlhICgke21lZGlhUXVlcnl9OiAke0JSRUFLUE9JTlQubWVkaWFbbWVkaWFdfXB4KSB7YCk7XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBzZWxlY3RvciBvZiBzZWxlY3RvcnMpIHtcbiAgICAgIGNvbnN0IHByb3BNYXAgPSBjYWNoZUl0ZW1bc2VsZWN0b3JdO1xuICAgICAgaWYgKCFwcm9wTWFwKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwcm9wTWFwS2V5cyA9IE9iamVjdC5rZXlzKHByb3BNYXApLmZpbHRlcigocCkgPT4gcCAhPT0gSU1QT1JUQU5UKTtcbiAgICAgIGlmIChwcm9wTWFwS2V5cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIG9wZW4gc2VsZWN0b3JcbiAgICAgIHJlc3VsdC5wdXNoKGAke3NlbGVjdG9yfXtgKTtcblxuICAgICAgLy8gZmlsbCBzZWxlY3RvciB3aXRoIHByb3BlcnRpZXNcbiAgICAgIGZvciAoY29uc3QgcHJvcCBvZiBwcm9wTWFwS2V5cykge1xuICAgICAgICBjb25zdCB2YWwgPSBwcm9wTWFwW3Byb3BdLnRvU3RyaW5nKCk7XG4gICAgICAgIGNvbnN0IGltcG9ydGFudCA9XG4gICAgICAgICAgdmFsLmluZGV4T2YoSU1QT1JUQU5UKSA8IDAgJiYgcHJvcE1hcFtJTVBPUlRBTlRdXG4gICAgICAgICAgICA/ICcgIWltcG9ydGFudCdcbiAgICAgICAgICAgIDogU1RSX0VNUFRZO1xuICAgICAgICByZXN1bHQucHVzaChcbiAgICAgICAgICBNYXBsZS5wcm9wRXh0ZW5zaW9uTWFwW3Byb3BdXG4gICAgICAgICAgICA/IE1hcGxlLnByb3BFeHRlbnNpb25NYXBbcHJvcF0odmFsLCBpbXBvcnRhbnQpXG4gICAgICAgICAgICA6IGAke3Byb3B9OiR7dmFsfSR7aW1wb3J0YW50fTtgLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICAvLyBjbG9zZSBzZWxlY3RvclxuICAgICAgcmVzdWx0LnB1c2goYH1gKTtcbiAgICB9XG5cbiAgICAvLyBjbG9zZSBtZWRpYSBxdWVyeVxuICAgIGlmIChtZWRpYSAhPT0gQlJFQUtQT0lOVC5taW5NZWRpYSkge1xuICAgICAgcmVzdWx0LnB1c2goYH1gKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdC5sZW5ndGggPiAyID8gcmVzdWx0LmpvaW4oU1RSX0VNUFRZKSA6IFNUUl9FTVBUWTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGdlbmVyYXRlV2hpdGVsaXN0KHdoaXRlbGlzdDogQXJyYXk8c3RyaW5nPiA9IFtdKSB7XG4gICAgY29uc3QgY2xhc3NMaXN0ID0gW107XG4gICAgZm9yIChjb25zdCB1dGlsS2V5IG9mIHdoaXRlbGlzdCkge1xuICAgICAgaWYgKCFNYXBsZS51dGlsQ2xhc3NNYXBbdXRpbEtleV0pIHtcbiAgICAgICAgY2xhc3NMaXN0LnB1c2godXRpbEtleSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwcm9wcyA9IE9iamVjdC5rZXlzKE1hcGxlLnV0aWxDbGFzc01hcFt1dGlsS2V5XSk7XG4gICAgICBmb3IgKGNvbnN0IHV0aWxWYWwgb2YgcHJvcHMpIHtcbiAgICAgICAgaWYgKHV0aWxWYWwuY2hhckF0KDApID09PSBQUkVGSVhfTUFQTEVfUFJPUCkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYnJlYWtwb2ludHMgPSBPYmplY3Qua2V5cyhNYXBsZS5icmVha3BvaW50TWFwKTtcbiAgICAgICAgZm9yIChjb25zdCBicCBvZiBicmVha3BvaW50cykge1xuICAgICAgICAgIGNvbnN0IG1lZGlhVXAgPSBicCArIFNVRkZJWF9NRURJQV9VUDtcbiAgICAgICAgICBjb25zdCBtZWRpYURvd24gPSBicCArIFNVRkZJWF9NRURJQV9ET1dOO1xuICAgICAgICAgIGNvbnN0IHV0aWxDbGFzcyA9IFNFUF9VVElMX0tFWSArIHV0aWxLZXkgKyBTRVBfVVRJTF9WQUwgKyB1dGlsVmFsO1xuICAgICAgICAgIGlmIChtZWRpYVVwIGluIEJSRUFLUE9JTlQubWVkaWEpIHtcbiAgICAgICAgICAgIGNsYXNzTGlzdC5wdXNoKG1lZGlhVXAgKyB1dGlsQ2xhc3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobWVkaWFEb3duIGluIEJSRUFLUE9JTlQubWVkaWEpIHtcbiAgICAgICAgICAgIGNsYXNzTGlzdC5wdXNoKG1lZGlhRG93biArIHV0aWxDbGFzcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIE1hcGxlLmZseShwcmVJbml0Q2xhc3NMaXN0LmNvbmNhdChjbGFzc0xpc3QpKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIHNwbGl0TGFzdE9jY3VycmVuY2Uoc3RyLCBrZXkpIHtcbiAgICBjb25zdCBwb3MgPSBzdHIubGFzdEluZGV4T2Yoa2V5KTtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICBjb25zdCBmaXJzdFBhcnQgPSBzdHIuc3Vic3RyaW5nKDAsIHBvcyk7XG4gICAgY29uc3QgbGFzdFBhcnQgPSBzdHIuc3Vic3RyaW5nKHBvcyArIGtleS5sZW5ndGgpO1xuICAgIGlmIChmaXJzdFBhcnQpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGZpcnN0UGFydCk7XG4gICAgfVxuICAgIGlmIChsYXN0UGFydCkge1xuICAgICAgcmVzdWx0LnB1c2gobGFzdFBhcnQpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgc3BsaXRGaXJzdE9jY3VycmVuY2Uoc3RyLCBrZXkpIHtcbiAgICBjb25zdCBwb3MgPSBzdHIuaW5kZXhPZihrZXkpO1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgIGNvbnN0IGZpcnN0UGFydCA9IHN0ci5zdWJzdHJpbmcoMCwgcG9zKTtcbiAgICBjb25zdCBsYXN0UGFydCA9IHN0ci5zdWJzdHJpbmcocG9zICsga2V5Lmxlbmd0aCk7XG4gICAgaWYgKGZpcnN0UGFydCkge1xuICAgICAgcmVzdWx0LnB1c2goZmlyc3RQYXJ0KTtcbiAgICB9XG4gICAgaWYgKGxhc3RQYXJ0KSB7XG4gICAgICByZXN1bHQucHVzaChsYXN0UGFydCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGluaXQoXG4gICAgZG9jdW1lbnQsXG4gICAgZW5hYmxlZDogYm9vbGVhbixcbiAgICB1dGlsQ2xhc3NNYXA6IGFueSA9IHt9LFxuICAgIHdoaXRlbGlzdDogQXJyYXk8c3RyaW5nPixcbiAgICB2YXJpYWJsZXM6IE1hcGxlVmFyaWFibGVNb2RlbCA9IE1hcGxlLnZhcmlhYmxlcyxcbiAgICBpc1J0bDogYm9vbGVhbiA9IGZhbHNlLFxuICAgIHV0aWxQcmVmaXhMaXN0OiBBcnJheTxhbnk+ID0gW10sXG4gICAgcHJvcEV4dGVuc2lvbk1hcDogYW55ID0ge31cbiAgKSB7XG4gICAgaXNNYXBsZUVuYWJsZWQgPSBlbmFibGVkO1xuICAgIGlmIChpc01hcGxlRW5hYmxlZCA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZG9jID0gZG9jdW1lbnQ7XG4gICAgTWFwbGUuQ0FDSEUgPSB7fTtcbiAgICBNYXBsZS52YXJpYWJsZXMgPSB7XG4gICAgICAuLi5NYXBsZS52YXJpYWJsZXMsXG4gICAgICAuLi52YXJpYWJsZXMsXG4gICAgfTtcbiAgICBNYXBsZUNvbG9ySGVscGVyLmdlbmVyYXRlQWxwaGFDb2xvcnMoTWFwbGUudmFyaWFibGVzLmNvbG9yKTtcbiAgICBNYXBsZS51dGlsQ2xhc3NNYXAgPSB7XG4gICAgICAuLi5nZXRNYXBsZVV0aWxpdHlDbGFzc01hcChNYXBsZS52YXJpYWJsZXMpLFxuICAgICAgLi4udXRpbENsYXNzTWFwLFxuICAgIH07XG4gICAgTWFwbGUudXRpbFByZWZpeExpc3QgPSBbXG4gICAgICAuLi5nZXRNYXBsZVV0aWxpdHlWYXJpYWJsZU1hcChNYXBsZS52YXJpYWJsZXMpLFxuICAgICAgLi4udXRpbFByZWZpeExpc3QsXG4gICAgXTtcbiAgICBNYXBsZS5wcm9wRXh0ZW5zaW9uTWFwID0ge1xuICAgICAgLi4uTUFQTEVfUFJPUF9FWFRFTlNJT05fTUFQLFxuICAgICAgLi4ucHJvcEV4dGVuc2lvbk1hcCxcbiAgICB9O1xuICAgIE1hcGxlLmJyZWFrcG9pbnRNYXAgPSB7XG4gICAgICAuLi5NYXBsZS52YXJpYWJsZXMuYnJlYWtwb2ludCxcbiAgICB9O1xuICAgIE1hcGxlLnNldE1pbkFuZE1heEJyZWFrcG9pbnRzKCk7XG4gICAgTWFwbGUuY3JlYXRlRG9tRWxlbWVudHMoU1RZTEVfRUxFTUVOVFMpO1xuICAgIE1hcGxlLmV4dGVuZFByb3BlcnRpZXMoKTtcbiAgICBNYXBsZS51dGlsQ2xhc3NNYXAgPSBNYXBsZS5jb252ZXJ0VXRpbENsYXNzTWFwVG9SdGwoXG4gICAgICBNYXBsZS51dGlsQ2xhc3NNYXAsXG4gICAgICBpc1J0bFxuICAgICk7XG4gICAgTWFwbGUuZ2VuZXJhdGVXaGl0ZWxpc3Qod2hpdGVsaXN0KTtcbiAgICB0aGlzLm9uSW5pdCQubmV4dCh0cnVlKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZmluZEFuZEZseShzdHI6IHN0cmluZykge1xuICAgIGlmIChpc01hcGxlRW5hYmxlZCA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHN0cikge1xuICAgICAgTWFwbGUuZmx5KFxuICAgICAgICAoc3RyLm1hdGNoKFJfRVhUUkFDVF9DTEFTUykgfHwgW10pXG4gICAgICAgICAgLmpvaW4oJyAnKVxuICAgICAgICAgIC5yZXBsYWNlKC9jbGFzc1xcPVxcXCIvZywgJycpXG4gICAgICAgICAgLnJlcGxhY2UoL1wiL2csICcnKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNvbnZlcnRVdGlsQ2xhc3NNYXBUb1J0bCA9ICh1dGlsaXR5Q2xhc3MsIGlzUnRsKSA9PiB7XG4gICAgaWYgKCFpc1J0bCkge1xuICAgICAgcmV0dXJuIHV0aWxpdHlDbGFzcztcbiAgICB9XG4gICAgY29uc3QgZGF0YSA9IHt9O1xuICAgIE9iamVjdC5rZXlzKHV0aWxpdHlDbGFzcykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHV0aWxpdHlDbGFzc1trZXldO1xuICAgICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUucnRsKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKHZhbHVlLnJ0bCkucmVkdWNlKChydGxWYWx1ZSwgcnRsS2V5KSA9PiB7XG4gICAgICAgICAgcnRsVmFsdWVbcnRsS2V5XSA9IHZhbHVlLnJ0bFtydGxLZXldO1xuICAgICAgICB9LCB2YWx1ZSk7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICAgIGlmIChrZXkuaW5jbHVkZXMoJ2xlZnQnKSkge1xuICAgICAgICAgIGNvbnN0IHJlcGxhY2VkS2V5ID0ga2V5LnJlcGxhY2UoJ2xlZnQnLCAncmlnaHQnKTtcbiAgICAgICAgICBkYXRhW3JlcGxhY2VkS2V5XSA9IHZhbHVlO1xuICAgICAgICB9IGVsc2UgaWYgKGtleS5pbmNsdWRlcygncmlnaHQnKSkge1xuICAgICAgICAgIGNvbnN0IHJlcGxhY2VkS2V5ID0ga2V5LnJlcGxhY2UoJ3JpZ2h0JywgJ2xlZnQnKTtcbiAgICAgICAgICBkYXRhW3JlcGxhY2VkS2V5XSA9IHZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRhdGFba2V5XSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHZhbHVlLmluY2x1ZGVzKCdsZWZ0JykpIHtcbiAgICAgICAgICBkYXRhW2tleV0gPSB2YWx1ZS5yZXBsYWNlKCdsZWZ0JywgJ3JpZ2h0Jyk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiB2YWx1ZS5pbmNsdWRlcygncmlnaHQnKSkge1xuICAgICAgICAgIGRhdGFba2V5XSA9IHZhbHVlLnJlcGxhY2UoJ3JpZ2h0JywgJ2xlZnQnKTtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmXG4gICAgICAgICAga2V5ID09PSAndHJhbnNmb3JtJyAmJlxuICAgICAgICAgIHZhbHVlLmluY2x1ZGVzKCd0cmFuc2xhdGUnKSAmJlxuICAgICAgICAgICFbJ1koJywgJ1ooJ10uc29tZSgodCkgPT4gdmFsdWUuaW5jbHVkZXModCkpXG4gICAgICAgICkge1xuICAgICAgICAgIGRhdGFba2V5XSA9IHZhbHVlXG4gICAgICAgICAgICAuc3BsaXQoJyAnKVxuICAgICAgICAgICAgLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBzcGxpdHRlZFZhbHVlID0gaXRlbS5zcGxpdCgnKCcpO1xuICAgICAgICAgICAgICBzcGxpdHRlZFZhbHVlWzFdID1cbiAgICAgICAgICAgICAgICBzcGxpdHRlZFZhbHVlWzFdICYmIHNwbGl0dGVkVmFsdWVbMV0uc3RhcnRzV2l0aCgnLScpXG4gICAgICAgICAgICAgICAgICA/IHNwbGl0dGVkVmFsdWVbMV0ucmVwbGFjZSgnLScsICcoJylcbiAgICAgICAgICAgICAgICAgIDogc3BsaXR0ZWRWYWx1ZVsxXVxuICAgICAgICAgICAgICAgICAgPyAnKC0nICsgc3BsaXR0ZWRWYWx1ZVsxXVxuICAgICAgICAgICAgICAgICAgOiAnJztcblxuICAgICAgICAgICAgICByZXR1cm4gc3BsaXR0ZWRWYWx1ZVswXSArIHNwbGl0dGVkVmFsdWVbMV07XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmpvaW4oJyAnKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZml4ZWRVdGlsaXR5ID0gTWFwbGUuY29udmVydFV0aWxDbGFzc01hcFRvUnRsKFxuICAgICAgICAgIHsgLi4udmFsdWUgfSxcbiAgICAgICAgICBpc1J0bFxuICAgICAgICApO1xuICAgICAgICBkYXRhW2tleV0gPSB7IC4uLmZpeGVkVXRpbGl0eSB9O1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBkYXRhO1xuICB9O1xuXG4gIHB1YmxpYyBzdGF0aWMgZmx5KGNsYXNzTGlzdDogYW55KSB7XG4gICAgaWYgKGlzTWFwbGVFbmFibGVkID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIXByZUluaXRDbGFzc0xpc3QubGVuZ3RoKSB7XG4gICAgICBwcmVJbml0Q2xhc3NMaXN0ID0gcHJlSW5pdENsYXNzTGlzdC5jb25jYXQoY2xhc3NMaXN0KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIWNsYXNzTGlzdCB8fCBjbGFzc0xpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcmF3Q2FjaGVLZXkgPSBBcnJheS5pc0FycmF5KGNsYXNzTGlzdClcbiAgICAgID8gY2xhc3NMaXN0LmpvaW4oJyAnKVxuICAgICAgOiBjbGFzc0xpc3Q7XG5cbiAgICBpZiAoTWFwbGUucmF3Q2FjaGVbcmF3Q2FjaGVLZXldKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIE1hcGxlLnJhd0NhY2hlW3Jhd0NhY2hlS2V5XSA9IDE7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY2xhc3NMaXN0KSA9PT0gZmFsc2UpIHtcbiAgICAgIGNsYXNzTGlzdCA9IGNsYXNzTGlzdC5zcGxpdCgvXFxzKy9nKTtcbiAgICB9XG5cbiAgICBjbGFzc0xpc3QgPSBNYXBsZS51bmlmeVV0aWxpdHlDbGFzcyhjbGFzc0xpc3QpO1xuXG4gICAgTWFwbGUudGVtcENhY2hlID0ge307XG5cbiAgICBmb3IgKGNvbnN0IGNsYXNzSXRlbSBvZiBjbGFzc0xpc3QpIHtcbiAgICAgIC8vIENoZWNrIHdoZXRoZXIgdGhlIHN0eWxlcyB3aWxsIGhhdmUgIWltcG9ydGFudCBmbGFnIG9yIG5vdFxuICAgICAgY29uc3QgaW1wb3J0YW50ID0gY2xhc3NJdGVtLmNoYXJBdChjbGFzc0l0ZW0ubGVuZ3RoIC0gMSkgPT09IElNUE9SVEFOVDtcbiAgICAgIGNvbnN0IGNsYXNzSXRlbVdpdGhvdXRJbXBvcnRhbnQgPSBjbGFzc0l0ZW0ucmVwbGFjZShJTVBPUlRBTlQsIFNUUl9FTVBUWSk7XG5cbiAgICAgIGxldCBwYXJ0cyA9IE1hcGxlLnNwbGl0TGFzdE9jY3VycmVuY2UoXG4gICAgICAgIGNsYXNzSXRlbVdpdGhvdXRJbXBvcnRhbnQsXG4gICAgICAgIFNFUF9VVElMX1ZBTCxcbiAgICAgICk7XG5cbiAgICAgIC8vIEV4dHJhY3QgdXRpbGl0eSB2YWx1ZVxuICAgICAgY29uc3QgdXRpbFZhbCA9IHBhcnRzLmxlbmd0aCA9PT0gMSA/IG51bGwgOiBwYXJ0cy5wb3AoKTtcblxuICAgICAgLy8gRXh0cmFjdCBtZWRpYSBxdWVyeVxuICAgICAgY29uc3QgbWVkaWEgPVxuICAgICAgICBPYmplY3Qua2V5cyhCUkVBS1BPSU5ULm1lZGlhKS5maW5kKFxuICAgICAgICAgIChrZXk6IHN0cmluZykgPT4gY2xhc3NJdGVtLmluZGV4T2Yoa2V5KSA9PT0gMCxcbiAgICAgICAgKSB8fCBCUkVBS1BPSU5ULm1pbk1lZGlhO1xuXG4gICAgICBwYXJ0cyA9IE1hcGxlLnNwbGl0Rmlyc3RPY2N1cnJlbmNlKHBhcnRzLmpvaW4oU1RSX0VNUFRZKSwgbWVkaWEpXG4gICAgICAgIC5qb2luKFNUUl9FTVBUWSlcbiAgICAgICAgLnNwbGl0KFNFUF9VVElMX0tFWSlcbiAgICAgICAgLmZpbHRlcigocDogc3RyaW5nKSA9PiAhIXApO1xuXG4gICAgICAvLyBFeGFjdCB1dGlsaXR5IGNsYXNzXG4gICAgICBjb25zdCB1dGlsS2V5ID0gcGFydHMubGVuZ3RoID49IDEgPyBwYXJ0cy5wb3AoKSA6IG51bGw7XG5cbiAgICAgIC8vIEV4dHJhY3Qgc2VsZWN0b3JcbiAgICAgIGNvbnN0IHNlbEtleSA9IHBhcnRzLmpvaW4oU0VQX1VUSUxfS0VZKTtcblxuICAgICAgLy8gR2V0IHN0eWxlIG1hcFxuICAgICAgY29uc3QgbWFwbGUgPSBNYXBsZS51dGlsQ2xhc3NNYXBbdXRpbEtleV07XG5cbiAgICAgIC8vIFdpdGhvdXQgYSBzdHlsZSBtYXAgd2UgY2FuJ3QgY3JlYXRlIHN0eWxlc1xuICAgICAgaWYgKCFtYXBsZSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gQ2FjaGUgZGVmYXVsdCBzdHlsZXMgd2l0aCBzZWxlY3RvclxuICAgICAgaWYgKG1hcGxlLl9kZWZhdWx0KSB7XG4gICAgICAgIE9iamVjdC5rZXlzKG1hcGxlLl9kZWZhdWx0KS5mb3JFYWNoKChtZWRpYUl0ZW0pID0+IHtcbiAgICAgICAgICBNYXBsZS5jYWNoZShcbiAgICAgICAgICAgIG1lZGlhSXRlbSxcbiAgICAgICAgICAgIE1hcGxlLmdldFNlbGVjdG9ycyhcbiAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgc2VsS2V5LFxuICAgICAgICAgICAgICB1dGlsS2V5LFxuICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICBtYXBsZS5fc2VsZWN0b3IsXG4gICAgICAgICAgICAgIGltcG9ydGFudCxcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIC4uLm1hcGxlLl9jb21tb24sXG4gICAgICAgICAgICAgIC4uLm1hcGxlW21hcGxlLl9kZWZhdWx0W21lZGlhSXRlbV1dLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gQ2FjaGUgdXRpbGl0eSBzdHlsZXMgd2l0aCBzZWxlY3RvclxuICAgICAgaWYgKHV0aWxWYWwpIHtcbiAgICAgICAgY29uc3QgYyA9IGNsYXNzSXRlbS5yZXBsYWNlKElNUE9SVEFOVCwgU1RSX0VNUFRZKTtcbiAgICAgICAgY29uc3QgdWNtID0gTWFwbGUudXRpbENsYXNzTWFwO1xuXG4gICAgICAgIC8vI3JlZ2lvbiBXaWxkY2FyZCBzZWxlY3RvcnNcbiAgICAgICAgLy8gKjp1dGlsLWtleVxuICAgICAgICAvLyAqOnV0aWwta2V5PXV0aWwtdmFsXG4gICAgICAgIC8vICouc2VsZWN0b3I6dXRpbC1rZXk9dXRpbC12YWxcbiAgICAgICAgLy8gKjpzZWxlY3Rvci1rZXk6dXRpbC1rZXk9dXRpbC12YWxcbiAgICAgICAgY29uc3Qgd2NNZWRpYSA9IGMucmVwbGFjZShtZWRpYSwgV0lMRENBUkQpO1xuXG4gICAgICAgIC8vIG1lZGlhOipcbiAgICAgICAgLy8gbWVkaWEuc2VsZWN0b3I6KlxuICAgICAgICAvLyBtZWRpYTpzZWxlY3Rvci1rZXk6KlxuICAgICAgICBjb25zdCB3Y3V0aWxLZXkgPSBjLnJlcGxhY2UoUl9TRVBfVVRJTF9LRVksIGA6JHtXSUxEQ0FSRH1gKTtcblxuICAgICAgICAvLyBtZWRpYTp1dGlsLWtleT0qXG4gICAgICAgIC8vIG1lZGlhLnNlbGVjdG9yOnV0aWwta2V5PSpcbiAgICAgICAgLy8gbWVkaWE6c2VsZWN0b3Ita2V5OnV0aWwta2V5PSpcbiAgICAgICAgY29uc3Qgd2N1dGlsVmFsID0gYy5yZXBsYWNlKFJfU0VQX1VUSUxfVkFMLCBgPSR7V0lMRENBUkR9YCk7XG5cbiAgICAgICAgLy8gKjoqXG4gICAgICAgIC8vICouc2VsZWN0b3I6KlxuICAgICAgICAvLyAqOnNlbGVjdG9yLWtleToqXG4gICAgICAgIGNvbnN0IHdjTWVkaWFLZXkgPSB3Y01lZGlhLnJlcGxhY2UoUl9TRVBfVVRJTF9LRVksIGA6JHtXSUxEQ0FSRH1gKTtcblxuICAgICAgICAvLyAqOnV0aWwta2V5PSpcbiAgICAgICAgLy8gKi5zZWxlY3Rvcjp1dGlsLWtleT0qXG4gICAgICAgIC8vICo6c2VsZWN0b3Ita2V5OnV0aWwta2V5PSpcbiAgICAgICAgY29uc3Qgd2NNZWRpYVZhbCA9IHdjdXRpbFZhbC5yZXBsYWNlKG1lZGlhLCBXSUxEQ0FSRCk7XG4gICAgICAgIC8vI2VuZHJlZ2lvblxuXG4gICAgICAgIGNvbnN0IHNlbGVjdG9yID0gTWFwbGUuZ2V0U2VsZWN0b3JzKFxuICAgICAgICAgIG1lZGlhLFxuICAgICAgICAgIHNlbEtleSxcbiAgICAgICAgICB1dGlsS2V5LFxuICAgICAgICAgIHV0aWxWYWwsXG4gICAgICAgICAgbWFwbGUuX3NlbGVjdG9yLFxuICAgICAgICAgIGltcG9ydGFudCxcbiAgICAgICAgKTtcblxuICAgICAgICBNYXBsZS5jYWNoZShtZWRpYSwgc2VsZWN0b3IsIHtcbiAgICAgICAgICAuLi5tYXBsZS5fY29tbW9uLFxuICAgICAgICAgIC4uLm1hcGxlW3V0aWxWYWxdLFxuICAgICAgICAgIC4uLkpTT04ucGFyc2UoXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeShcbiAgICAgICAgICAgICAgbWFwbGVbdXRpbFZhbC5yZXBsYWNlKFJfQ1VTVE9NLCBXSUxEQ0FSRCldIHx8IHt9LFxuICAgICAgICAgICAgKS5yZXBsYWNlKFxuICAgICAgICAgICAgICBSX1dJTERDQVJELFxuICAgICAgICAgICAgICB1dGlsS2V5ID09PSAnY29udGVudCdcbiAgICAgICAgICAgICAgICA/IHV0aWxWYWwucmVwbGFjZShSX0NVU1RPTSwgJyQxJylcbiAgICAgICAgICAgICAgICA6IHV0aWxWYWwucmVwbGFjZShSX0NVU1RPTSwgJyQxJykucmVwbGFjZShSX1NFUF9WQUxfU1BBQ0UsICcgJyksXG4gICAgICAgICAgICApLFxuICAgICAgICAgICksXG4gICAgICAgICAgLi4uKHVjbVt3Y01lZGlhS2V5XSB8fCB7fSksXG4gICAgICAgICAgLi4uKHVjbVt3Y3V0aWxLZXldIHx8IHt9KSxcbiAgICAgICAgICAuLi4odWNtW3djTWVkaWFWYWxdIHx8IHt9KSxcbiAgICAgICAgICAuLi4odWNtW3djdXRpbFZhbF0gfHwge30pLFxuICAgICAgICAgIC4uLih1Y21bd2NNZWRpYV0gfHwge30pLFxuICAgICAgICAgIC4uLih1Y21bY10gfHwge30pLFxuICAgICAgICAgIFtJTVBPUlRBTlRdOiBpbXBvcnRhbnQsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vI3JlZ2lvbiBHZW5lcmF0ZSBzdHlsZXNcbiAgICAvLyBHZW5lcmF0ZSBtaW4gbWVkaWEgcXVlcnkgc3R5bGVzXG4gICAgY29uc3QgbWluTWVkaWFTdHlsZXMgPSBNYXBsZS5zdHlsZXMoQlJFQUtQT0lOVC5taW5NZWRpYSk7XG4gICAgaWYgKG1pbk1lZGlhU3R5bGVzKSB7XG4gICAgICBNYXBsZS5hcHBlbmRTdHlsZShcbiAgICAgICAgU1RZTEVfRUxFTUVOVFMsXG4gICAgICAgIEJSRUFLUE9JTlQubWluTWVkaWEsXG4gICAgICAgIG1pbk1lZGlhU3R5bGVzLFxuICAgICAgICBmYWxzZSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gR2VuZXJhdGUgbWVkaWEgcXVlcnkgc3R5bGVzXG4gICAgY29uc3QgbWVkaWFRdWVyeVN0eWxlcyA9IHt9O1xuICAgIE9iamVjdC5rZXlzKE1hcGxlLnRlbXBDYWNoZSkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBpZiAoa2V5ICE9PSBCUkVBS1BPSU5ULm1pbk1lZGlhKSB7XG4gICAgICAgIG1lZGlhUXVlcnlTdHlsZXNba2V5XSA9IG1lZGlhUXVlcnlTdHlsZXNba2V5XSB8fCAnJztcbiAgICAgICAgbWVkaWFRdWVyeVN0eWxlc1trZXldICs9IE1hcGxlLnN0eWxlcyhrZXkpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIE9iamVjdC5rZXlzKG1lZGlhUXVlcnlTdHlsZXMpLmZvckVhY2goKGtleSkgPT5cbiAgICAgIE1hcGxlLmFwcGVuZFN0eWxlKFNUWUxFX0VMRU1FTlRTLCBrZXksIG1lZGlhUXVlcnlTdHlsZXNba2V5XSwgZmFsc2UpLFxuICAgICk7XG4gICAgLy8jZW5kcmVnaW9uXG4gIH1cblxuICBwdWJsaWMgc3RhdGljIHVuaWZ5VXRpbGl0eUNsYXNzKGNsYXNzTGlzdCkge1xuICAgIGNvbnN0IGNsYXNzZXMgPSBjbGFzc0xpc3QucmVkdWNlKChhY2MsIHByZXYpID0+IHtcbiAgICAgIGNvbnN0IGV4aXN0aW5nU3R5bGVJbmRleCA9IGFjYy5maW5kSW5kZXgoXG4gICAgICAgIChwKSA9PlxuICAgICAgICAgICgocCB8fCAnJykuc3BsaXQoUl9VTklGSVkpIHx8IFtdKVswXSA9PT1cbiAgICAgICAgICAoKHByZXYgfHwgJycpLnNwbGl0KFJfVU5JRklZKSB8fCBbXSlbMF0sXG4gICAgICApO1xuICAgICAgaWYgKGV4aXN0aW5nU3R5bGVJbmRleCA8IDApIHtcbiAgICAgICAgYWNjLnB1c2gocHJldik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhY2NbZXhpc3RpbmdTdHlsZUluZGV4XSA9IHByZXY7XG4gICAgICB9XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0sIFtdKTtcbiAgICByZXR1cm4gY2xhc3NlcztcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgYXBwZW5kU3R5bGUoXG4gICAgc3R5bGVFbGVtZW50czogYW55LFxuICAgIGJwOiBzdHJpbmcsXG4gICAgc3R5bGU6IHN0cmluZyxcbiAgICBzaWxlbnQgPSB0cnVlLFxuICApIHtcbiAgICBzdHlsZUVsZW1lbnRzW2JwXS5hcHBlbmRDaGlsZChkb2MuY3JlYXRlVGV4dE5vZGUoc3R5bGUpKTtcblxuICAgIGlmICghc2lsZW50KSB7XG4gICAgICBNYXBsZS5vblN0eWxlQXBwZW5kJC5uZXh0KHsgYnAsIHN0eWxlIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaXNNZWRpYVZhbGlkKG1lZGlhOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbWVkaWEgaW4gQlJFQUtQT0lOVC5tZWRpYTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaXNCcmVha3BvaW50VmFsaWQoYnJlYWtwb2ludDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGJyZWFrcG9pbnQgaW4gTWFwbGUuYnJlYWtwb2ludE1hcDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaXNNZWRpYU1hdGNoZXNXaXRoQnJlYWtwb2ludChcbiAgICBtZWRpYTogc3RyaW5nLFxuICAgIGJyZWFrcG9pbnQ6IHN0cmluZyxcbiAgKTogYm9vbGVhbiB7XG4gICAgaWYgKCFNYXBsZS5pc0JyZWFrcG9pbnRWYWxpZChicmVha3BvaW50KSB8fCAhTWFwbGUuaXNNZWRpYVZhbGlkKG1lZGlhKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IG1lZGlhU2l6ZSA9IEJSRUFLUE9JTlQubWVkaWFbbWVkaWFdO1xuICAgIGNvbnN0IGJyZWFrcG9pbnRTaXplID0gcGFyc2VGbG9hdChNYXBsZS5icmVha3BvaW50TWFwW2JyZWFrcG9pbnRdKTtcblxuICAgIGlmIChtZWRpYS5pbmNsdWRlcyhTVUZGSVhfTUVESUFfRE9XTikpIHtcbiAgICAgIHJldHVybiBicmVha3BvaW50U2l6ZSA8PSBtZWRpYVNpemU7XG4gICAgfVxuXG4gICAgaWYgKG1lZGlhLmluY2x1ZGVzKFNVRkZJWF9NRURJQV9VUCkpIHtcbiAgICAgIHJldHVybiBicmVha3BvaW50U2l6ZSA+PSBtZWRpYVNpemU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRWYWxpZE1lZGlhTWFwKCk6IGFueSB7XG4gICAgcmV0dXJuIHsgLi4uQlJFQUtQT0lOVC5tZWRpYSB9O1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRNaW5NZWRpYSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBCUkVBS1BPSU5ULm1pbk1lZGlhO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRNaW5CcmVha3BvaW50KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIEJSRUFLUE9JTlQubWluS2V5O1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRNYXBwZWRNZWRpYU9yTWluKG1lZGlhOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBNYXBsZS5pc01lZGlhVmFsaWQobWVkaWEpID8gbWVkaWEgOiBNYXBsZS5nZXRNaW5NZWRpYSgpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRNYXBwZWRNZWRpYU9yTnVsbChtZWRpYTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gTWFwbGUuaXNNZWRpYVZhbGlkKG1lZGlhKSA/IG1lZGlhIDogbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TWFwcGVkQnJlYWtwb2ludE9yTWluKGJyZWFrcG9pbnQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIE1hcGxlLmlzQnJlYWtwb2ludFZhbGlkKGJyZWFrcG9pbnQpXG4gICAgICA/IGJyZWFrcG9pbnRcbiAgICAgIDogTWFwbGUuZ2V0TWluQnJlYWtwb2ludCgpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRNYXBwZWRCcmVha3BvaW50T3JOdWxsKGJyZWFrcG9pbnQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIE1hcGxlLmlzQnJlYWtwb2ludFZhbGlkKGJyZWFrcG9pbnQpID8gYnJlYWtwb2ludCA6IG51bGw7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldFZhcmlhYmxlcygpOiBNYXBsZVZhcmlhYmxlTW9kZWwge1xuICAgIHJldHVybiB7IC4uLk1hcGxlLnZhcmlhYmxlcyB9O1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBmaWxsSW5UaGVHYXBzKGJyZWFrcG9pbnRNYXApOiBhbnkge1xuICAgIGNvbnN0IGZ1bGxCcmVha3BvaW50TWFwID0gTWFwbGUuZ2V0VmFyaWFibGVzKCkuYnJlYWtwb2ludDtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoZnVsbEJyZWFrcG9pbnRNYXApO1xuICAgIGNvbnN0IG1pbktleSA9IGtleXMuZmluZCgoa2V5KSA9PiBrZXkgaW4gYnJlYWtwb2ludE1hcCk7XG4gICAgcmV0dXJuIGtleXNcbiAgICAgIC5zb3J0KChhLCBiKSA9PiBmdWxsQnJlYWtwb2ludE1hcFthXSAtIGZ1bGxCcmVha3BvaW50TWFwW2JdKVxuICAgICAgLnJlZHVjZSgoYWNjLCBrZXksIGkpID0+IHtcbiAgICAgICAgY29uc3QgbmV4dEtleSA9IGtleXNbaSArIDFdO1xuICAgICAgICBpZiAoa2V5IGluIGFjYyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBhY2MgPSB7XG4gICAgICAgICAgICAuLi5hY2MsXG4gICAgICAgICAgICBba2V5XTpcbiAgICAgICAgICAgICAga2V5IGluIGJyZWFrcG9pbnRNYXAgPyBicmVha3BvaW50TWFwW2tleV0gOiBicmVha3BvaW50TWFwW21pbktleV0sXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV4dEtleSAmJiAhYnJlYWtwb2ludE1hcFtuZXh0S2V5XSkge1xuICAgICAgICAgIGFjYyA9IHtcbiAgICAgICAgICAgIC4uLmFjYyxcbiAgICAgICAgICAgIFtuZXh0S2V5XTogYWNjW2tleV0sXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgfSwge30pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpc0JyZWFrcG9pbnRNYXAoYnJlYWtwb2ludE1hcCk6IGFueSB7XG4gICAgaWYgKHR5cGVvZiBicmVha3BvaW50TWFwID09PSAnb2JqZWN0JyAmJiBicmVha3BvaW50TWFwICE9PSBudWxsKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXMoTWFwbGUuZ2V0VmFyaWFibGVzKCkuYnJlYWtwb2ludCkuc29tZShcbiAgICAgICAgKGtleSkgPT4gYnJlYWtwb2ludE1hcCAmJiBrZXkgaW4gYnJlYWtwb2ludE1hcCxcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIl19