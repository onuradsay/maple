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
        const breakpoints = Object.keys(BREAKPOINT.media).sort((a, b) => BREAKPOINT.media[a] - BREAKPOINT.media[b]);
        const breakpointsUp = breakpoints.filter((key) => key.includes(SUFFIX_MEDIA_UP));
        const breakpointsDown = breakpoints.filter((key) => key.includes(SUFFIX_MEDIA_DOWN));
        breakpointsUp.concat(breakpointsDown.reverse()).forEach((key) => {
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
    static getSelectors(media = STR_EMPTY, selKey = STR_EMPTY, utilKey = STR_EMPTY, utilVal = STR_EMPTY, 
    // tslint:disable-next-line: variable-name
    _selector = STR_EMPTY, important = false) {
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
    static convertUtilClassMapToRtl(utilityClass, isRtl) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXBsZS8iLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdkMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFcEUsT0FBTyxFQUNMLHVCQUF1QixFQUN2QiwwQkFBMEIsR0FDM0IsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDcEQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRTlELCtFQUErRTtBQUMvRSxNQUFNLFVBQVUsR0FBUTtJQUN0QixLQUFLLEVBQUUsRUFBRTtDQUNWLENBQUM7QUFDRixNQUFNLGNBQWMsR0FBRyxFQUFFLENBQUM7QUFFMUIsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDO0FBQ3JCLE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQztBQUN0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ZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE1hcGxlQ29sb3JIZWxwZXIgfSBmcm9tICcuL2hlbHBlcnMvY29sb3IuaGVscGVyJztcbmltcG9ydCB7IE1BUExFX1BST1BfRVhURU5TSU9OX01BUCB9IGZyb20gJy4vcHJvcGVydHktZXh0ZW5zaW9uLW1hcCc7XG5pbXBvcnQgeyBNYXBsZVZhcmlhYmxlTW9kZWwgfSBmcm9tICcuL3R5cGVzL3ZhcmlhYmxlcy5tb2RlbCc7XG5pbXBvcnQge1xuICBnZXRNYXBsZVV0aWxpdHlDbGFzc01hcCxcbiAgZ2V0TWFwbGVVdGlsaXR5VmFyaWFibGVNYXAsXG59IGZyb20gJy4vdXRpbGl0eS1jbGFzcy1tYXAnO1xuaW1wb3J0IHsgTUFQTEVfVkFSX0FMRVJUIH0gZnJvbSAnLi92YXJpYWJsZXMvYWxlcnQnO1xuaW1wb3J0IHsgTUFQTEVfVkFSX0JSRUFLUE9JTlQgfSBmcm9tICcuL3ZhcmlhYmxlcy9icmVha3BvaW50JztcbmltcG9ydCB7IE1BUExFX1ZBUl9CVVRUT04gfSBmcm9tICcuL3ZhcmlhYmxlcy9idXR0b24nO1xuaW1wb3J0IHsgTUFQTEVfVkFSX0NPTE9SIH0gZnJvbSAnLi92YXJpYWJsZXMvY29sb3InO1xuaW1wb3J0IHsgTUFQTEVfVkFSX0ZPTlRfRkFNSUxZIH0gZnJvbSAnLi92YXJpYWJsZXMvZm9udC1mYW1pbHknO1xuaW1wb3J0IHsgTUFQTEVfVkFSX0ZPTlRfU0laRSB9IGZyb20gJy4vdmFyaWFibGVzL2ZvbnQtc2l6ZSc7XG5pbXBvcnQgeyBNQVBMRV9WQVJfRk9OVF9XRUlHSFQgfSBmcm9tICcuL3ZhcmlhYmxlcy9mb250LXdlaWdodCc7XG5pbXBvcnQgeyBNQVBMRV9WQVJfTUFYX1dJRFRIIH0gZnJvbSAnLi92YXJpYWJsZXMvbWF4LXdpZHRoJztcbmltcG9ydCB7IE1BUExFX1ZBUl9TUEFDRVIgfSBmcm9tICcuL3ZhcmlhYmxlcy9zcGFjZXInO1xuaW1wb3J0IHsgTUFQTEVfVkFSX1RSQU5TSVRJT04gfSBmcm9tICcuL3ZhcmlhYmxlcy90cmFuc2l0aW9uJztcblxuLy8gRGVmaW5lIGEgZ2xvYmFsIE1hcGxlLkNBQ0hFIHRvIGNvbGxlY3Qgc2VsZWN0b3JzIGFuZCBtYXBzIG9uIGJyZWFrcG9pbnQga2V5c1xuY29uc3QgQlJFQUtQT0lOVDogYW55ID0ge1xuICBtZWRpYToge30sXG59O1xuY29uc3QgU1RZTEVfRUxFTUVOVFMgPSB7fTtcblxuY29uc3QgU1RSX0VNUFRZID0gJyc7XG5jb25zdCBTVFJfU1BBQ0UgPSAnICc7XG5jb25zdCBTVFJfRE9UID0gJy4nO1xuY29uc3QgU1RSX1VQID0gJ3VwJztcbmNvbnN0IFNUUl9ET1dOID0gJ2Rvd24nO1xuY29uc3QgU0VQX01FRElBID0gJy0nO1xuY29uc3QgU0VQX1NFTEVDVE9SID0gJzonO1xuY29uc3QgU0VQX1VUSUxfS0VZID0gJzonO1xuY29uc3QgU0VQX1VUSUxfVkFMID0gJz0nO1xuY29uc3QgU0VQX05PX1NQQUNFID0gJzwnO1xuY29uc3QgU0VQX09VVEVSX1NQQUNFID0gJzw8JztcbmNvbnN0IElNUE9SVEFOVCA9ICchJztcbmNvbnN0IFdJTERDQVJEID0gJyonO1xuXG5jb25zdCBQUkVGSVhfTUFQTEVfUFJPUCA9ICdfJztcbmNvbnN0IFNVRkZJWF9NRURJQV9VUCA9IFNFUF9NRURJQSArIFNUUl9VUDtcbmNvbnN0IFNVRkZJWF9NRURJQV9ET1dOID0gU0VQX01FRElBICsgU1RSX0RPV047XG5cbmNvbnN0IFJfU0VMRUNUT1JfUkVTRVJWRUQgPVxuICAvKFxcLnxcXCt8XFx+fFxcPHxcXD58XFxbfFxcXXxcXCh8XFwpfFxcIXxcXDp8XFwsfFxcPXxcXHx8XFwlfFxcI3xcXCp8XFxcInxcXC8pL2c7XG5jb25zdCBSX0VTQ0FQRV9SRVNFUlZFRCA9ICdcXFxcJDEnO1xuY29uc3QgUl9TRVBfTk9fU1BBQ0UgPSAvXFw8L2c7XG5jb25zdCBSX1NFUF9TRUxfU1BBQ0UgPSAvXFw+XFw+L2c7XG5jb25zdCBSX1NFUF9TRUxfU1BBQ0VfQUxMID0gLyhcXDx8XFw+XFw+KS9nO1xuY29uc3QgUl9TRVBfVkFMX1NQQUNFID0gL1xcfC9nO1xuY29uc3QgUl9TRVBfVVRJTF9WQUwgPSAvPSg/Oi4oPyE9KSkrJC87XG5jb25zdCBSX1NFUF9VVElMX0tFWSA9IC9cXDooPzouKD8hXFw6KSkrJC87XG5jb25zdCBSX0NVU1RPTSA9IC9cXCgoLio/KVxcKS87XG5jb25zdCBSX1dJTERDQVJEID0gL1xcKi9nO1xuY29uc3QgUl9FWFRSQUNUX0NMQVNTID0gL2NsYXNzXFw9XFxcIihbXFxzXFxTXSs/KVxcXCIvZztcbmNvbnN0IFJfVU5JRklZID0gL1xcPSg/PVteLl0qJCkvO1xuXG5sZXQgcHJlSW5pdENsYXNzTGlzdCA9IFtdO1xubGV0IGlzTWFwbGVFbmFibGVkID0gdHJ1ZTtcbmxldCBkb2M7XG5cbmNvbnN0IGVzYyA9IChzZWxlY3Rvcjogc3RyaW5nKSA9PlxuICBzZWxlY3Rvci5yZXBsYWNlKFJfU0VMRUNUT1JfUkVTRVJWRUQsIFJfRVNDQVBFX1JFU0VSVkVEKTtcblxuZXhwb3J0IGNsYXNzIE1hcGxlIHtcbiAgcHJpdmF0ZSBzdGF0aWMgQ0FDSEUgPSB7fTtcbiAgcHJpdmF0ZSBzdGF0aWMgdmFyaWFibGVzOiBNYXBsZVZhcmlhYmxlTW9kZWwgPSB7XG4gICAgYnJlYWtwb2ludDogTUFQTEVfVkFSX0JSRUFLUE9JTlQsXG4gICAgY29sb3I6IE1BUExFX1ZBUl9DT0xPUixcbiAgICBmb250RmFtaWx5OiBNQVBMRV9WQVJfRk9OVF9GQU1JTFksXG4gICAgZm9udFNpemU6IE1BUExFX1ZBUl9GT05UX1NJWkUsXG4gICAgZm9udFdlaWdodDogTUFQTEVfVkFSX0ZPTlRfV0VJR0hULFxuICAgIG1heFdpZHRoOiBNQVBMRV9WQVJfTUFYX1dJRFRILFxuICAgIHNwYWNlcjogTUFQTEVfVkFSX1NQQUNFUixcbiAgICB0cmFuc2l0aW9uOiBNQVBMRV9WQVJfVFJBTlNJVElPTixcbiAgICBidXR0b246IE1BUExFX1ZBUl9CVVRUT04sXG4gICAgYWxlcnQ6IE1BUExFX1ZBUl9BTEVSVCxcbiAgfTtcbiAgcHJpdmF0ZSBzdGF0aWMgYnJlYWtwb2ludE1hcDogYW55ID0ge307XG4gIHByaXZhdGUgc3RhdGljIHV0aWxDbGFzc01hcDogYW55ID0ge307XG4gIHByaXZhdGUgc3RhdGljIHV0aWxQcmVmaXhMaXN0OiBBcnJheTxhbnk+ID0gW107XG4gIHByaXZhdGUgc3RhdGljIHByb3BFeHRlbnNpb25NYXA6IGFueSA9IHt9O1xuICBwcml2YXRlIHN0YXRpYyByYXdDYWNoZTogYW55ID0ge307XG4gIHByaXZhdGUgc3RhdGljIHRlbXBDYWNoZTogYW55ID0ge307XG4gIHB1YmxpYyBzdGF0aWMgb25TdHlsZUFwcGVuZCQ6IEJlaGF2aW9yU3ViamVjdDxhbnk+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChcbiAgICBudWxsLFxuICApO1xuICBwdWJsaWMgc3RhdGljIG9uSW5pdCQ6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoZmFsc2UpO1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgLy8gRmluZCBtaW4gYW5kIG1heCBicmVha3BvaW50c1xuICBwcml2YXRlIHN0YXRpYyBzZXRNaW5BbmRNYXhCcmVha3BvaW50cygpOiB2b2lkIHtcbiAgICBjb25zdCBicmVha3BvaW50S2V5czogQXJyYXk8c3RyaW5nPiA9IE9iamVjdC5rZXlzKE1hcGxlLmJyZWFrcG9pbnRNYXApO1xuICAgIGNvbnN0IGJyZWFrcG9pbnRzID0gYnJlYWtwb2ludEtleXNcbiAgICAgIC5tYXAoKGtleSkgPT4gKHtcbiAgICAgICAga2V5LFxuICAgICAgICBzaXplOiBwYXJzZUZsb2F0KE1hcGxlLmJyZWFrcG9pbnRNYXBba2V5XSksXG4gICAgICB9KSlcbiAgICAgIC5zb3J0KChhLCBiKSA9PiBhLnNpemUgLSBiLnNpemUpO1xuXG4gICAgQlJFQUtQT0lOVC5taW5LZXkgPSBicmVha3BvaW50c1swXS5rZXk7XG4gICAgQlJFQUtQT0lOVC5tYXhLZXkgPSBicmVha3BvaW50c1ticmVha3BvaW50cy5sZW5ndGggLSAxXS5rZXk7XG4gICAgQlJFQUtQT0lOVC5taW5NZWRpYSA9IEJSRUFLUE9JTlQubWluS2V5ICsgU1VGRklYX01FRElBX1VQO1xuXG4gICAgYnJlYWtwb2ludHMuZm9yRWFjaCgoYnA6IGFueSwgaTogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBuZXh0ID0gYnJlYWtwb2ludHNbaSArIDFdO1xuICAgICAgQlJFQUtQT0lOVC5tZWRpYVticC5rZXkgKyBTVUZGSVhfTUVESUFfVVBdID0gYnAuc2l6ZTtcbiAgICAgIGlmIChuZXh0KSB7XG4gICAgICAgIC8vIFVzZXMgMC4wMnB4IHJhdGhlciB0aGFuIDAuMDFweCB0byB3b3JrIGFyb3VuZCBhIGN1cnJlbnQgcm91bmRpbmcgYnVnIGluIFNhZmFyaS5cbiAgICAgICAgLy8gU2VlIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xNzgyNjFcbiAgICAgICAgQlJFQUtQT0lOVC5tZWRpYVticC5rZXkgKyBTVUZGSVhfTUVESUFfRE9XTl0gPSBuZXh0LnNpemUgLSAwLjAyO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGVEb21FbGVtZW50cyhcbiAgICBzdHlsZUVsZW1lbnRzOiBhbnksXG4gICAgcHJlZml4OiBzdHJpbmcgPSAnbWFwbGUnLFxuICAgIGRvY3VtZW50PzogYW55LFxuICApOiB2b2lkIHtcbiAgICAvLyBQcmVwYXJlIHN0eWxlIGVsZW1lbnQgb24gaGVhZFxuICAgIGNvbnN0IGRvY0hlYWQgPSAoZG9jdW1lbnQgfHwgZG9jKS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xuICAgIGNvbnN0IGJyZWFrcG9pbnRzID0gT2JqZWN0LmtleXMoQlJFQUtQT0lOVC5tZWRpYSkuc29ydChcbiAgICAgIChhLCBiKSA9PiBCUkVBS1BPSU5ULm1lZGlhW2FdIC0gQlJFQUtQT0lOVC5tZWRpYVtiXSxcbiAgICApO1xuICAgIGNvbnN0IGJyZWFrcG9pbnRzVXAgPSBicmVha3BvaW50cy5maWx0ZXIoKGtleSkgPT5cbiAgICAgIGtleS5pbmNsdWRlcyhTVUZGSVhfTUVESUFfVVApLFxuICAgICk7XG4gICAgY29uc3QgYnJlYWtwb2ludHNEb3duID0gYnJlYWtwb2ludHMuZmlsdGVyKChrZXkpID0+XG4gICAgICBrZXkuaW5jbHVkZXMoU1VGRklYX01FRElBX0RPV04pLFxuICAgICk7XG5cbiAgICBicmVha3BvaW50c1VwLmNvbmNhdChicmVha3BvaW50c0Rvd24ucmV2ZXJzZSgpKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGNvbnN0IHN0eWxlSWQgPSBgJHtwcmVmaXh9LSR7a2V5fWA7XG4gICAgICBjb25zdCBlbCA9IGRvYy5nZXRFbGVtZW50QnlJZChzdHlsZUlkKTtcbiAgICAgIGlmICghIWVsKSB7XG4gICAgICAgIGRvY0hlYWQucmVtb3ZlQ2hpbGQoZWwpO1xuICAgICAgfVxuICAgICAgc3R5bGVFbGVtZW50c1trZXldID0gKGRvYyBhcyBEb2N1bWVudCkuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgIChzdHlsZUVsZW1lbnRzW2tleV0gYXMgSFRNTEVsZW1lbnQpLnNldEF0dHJpYnV0ZSgnaWQnLCBzdHlsZUlkKTtcbiAgICAgIGRvY0hlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50c1trZXldKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGV4dGVuZFByb3BlcnRpZXMoKTogdm9pZCB7XG4gICAgTWFwbGUudXRpbFByZWZpeExpc3QuZm9yRWFjaCgoZGVmOiBhbnkpID0+IHtcbiAgICAgIE1hcGxlLnV0aWxDbGFzc01hcFtkZWYucHJlZml4XSA9IE1hcGxlLnV0aWxDbGFzc01hcFtkZWYucHJlZml4XSB8fCB7fTtcbiAgICAgIE1hcGxlLnV0aWxDbGFzc01hcFtkZWYucHJlZml4XVtXSUxEQ0FSRF0gPSB7fTtcbiAgICAgIE9iamVjdC5rZXlzKGRlZi5tYXApLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBNYXBsZS51dGlsQ2xhc3NNYXBbZGVmLnByZWZpeF1ba2V5XSA9IHt9O1xuICAgICAgICBkZWYucHJvcHMuZm9yRWFjaCgocHJvcCkgPT4ge1xuICAgICAgICAgIE1hcGxlLnV0aWxDbGFzc01hcFtkZWYucHJlZml4XVtXSUxEQ0FSRF0gPSB7XG4gICAgICAgICAgICAuLi5NYXBsZS51dGlsQ2xhc3NNYXBbZGVmLnByZWZpeF1bV0lMRENBUkRdLFxuICAgICAgICAgICAgW3Byb3BdOiBXSUxEQ0FSRCxcbiAgICAgICAgICB9O1xuICAgICAgICAgIE1hcGxlLnV0aWxDbGFzc01hcFtkZWYucHJlZml4XVtrZXldW3Byb3BdID0gZGVmLm1hcFtrZXldO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgZ2V0U2VsZWN0b3JzKFxuICAgIG1lZGlhOiBzdHJpbmcgPSBTVFJfRU1QVFksXG4gICAgc2VsS2V5OiBzdHJpbmcgPSBTVFJfRU1QVFksXG4gICAgdXRpbEtleTogc3RyaW5nID0gU1RSX0VNUFRZLFxuICAgIHV0aWxWYWw6IHN0cmluZyA9IFNUUl9FTVBUWSxcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IHZhcmlhYmxlLW5hbWVcbiAgICBfc2VsZWN0b3I6IHN0cmluZyA9IFNUUl9FTVBUWSxcbiAgICBpbXBvcnRhbnQ6IGJvb2xlYW4gPSBmYWxzZSxcbiAgKTogc3RyaW5nIHtcbiAgICBjb25zdCBtYXBsZSA9IE1hcGxlLnV0aWxDbGFzc01hcFtzZWxLZXldIHx8IHt9O1xuICAgIF9zZWxlY3RvciA9IChtYXBsZS5fc2VsZWN0b3IgfHwgJycpICsgX3NlbGVjdG9yO1xuXG4gICAgY29uc3QgcGFyZW50U2VsZWN0b3IgPSBzZWxLZXkuaW5jbHVkZXMoU0VQX09VVEVSX1NQQUNFKVxuICAgICAgPyBzZWxLZXkuc3BsaXQoU0VQX09VVEVSX1NQQUNFKS5wb3AoKS5zcGxpdChSX1NFUF9TRUxfU1BBQ0VfQUxMKS5zaGlmdCgpXG4gICAgICA6IFNUUl9FTVBUWTtcblxuICAgIGNvbnN0IGJhc2VTZWwgPSBbXG4gICAgICBtZWRpYSB8fCBTVFJfRU1QVFksXG4gICAgICBtYXBsZS5fc2VsZWN0b3IgPyBTRVBfU0VMRUNUT1IgOiBTVFJfRU1QVFksXG4gICAgICBzZWxLZXksXG4gICAgICB1dGlsS2V5ID8gU0VQX1VUSUxfS0VZIDogU1RSX0VNUFRZLFxuICAgICAgdXRpbEtleSxcbiAgICAgIHV0aWxWYWwgPyBTRVBfVVRJTF9WQUwgOiBTVFJfRU1QVFksXG4gICAgXS5qb2luKFNUUl9FTVBUWSk7XG5cbiAgICByZXR1cm4gX3NlbGVjdG9yXG4gICAgICAuc3BsaXQoLyxcXHMqLylcbiAgICAgIC5tYXAoKHNlbGVjdG9yKSA9PlxuICAgICAgICBbXG4gICAgICAgICAgcGFyZW50U2VsZWN0b3IgPyBwYXJlbnRTZWxlY3RvciArIFNUUl9TUEFDRSA6IFNUUl9FTVBUWSxcbiAgICAgICAgICB1dGlsVmFsID8gU1RSX0RPVCA6IFNUUl9FTVBUWSxcbiAgICAgICAgICB1dGlsVmFsID8gZXNjKGJhc2VTZWwgKyB1dGlsVmFsKSA6IGBbY2xhc3MqPVwiJHtiYXNlU2VsfVwiXWAsXG4gICAgICAgICAgdXRpbFZhbCAmJiBpbXBvcnRhbnQgPyBlc2MoSU1QT1JUQU5UKSA6IFNUUl9FTVBUWSxcbiAgICAgICAgICBtYXBsZS5fc2VsZWN0b3IgfHwgIXNlbEtleSB8fCBzZWxLZXkuY2hhckF0KDApID09PSBTRVBfTk9fU1BBQ0VcbiAgICAgICAgICAgID8gU1RSX0VNUFRZXG4gICAgICAgICAgICA6IFNUUl9TUEFDRSxcbiAgICAgICAgICBtYXBsZS5fc2VsZWN0b3JcbiAgICAgICAgICAgID8gU1RSX0VNUFRZXG4gICAgICAgICAgICA6IHNlbEtleVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKFNFUF9PVVRFUl9TUEFDRSArIHBhcmVudFNlbGVjdG9yLCBTVFJfRU1QVFkpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoUl9TRVBfU0VMX1NQQUNFLCBTVFJfU1BBQ0UpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoUl9TRVBfTk9fU1BBQ0UsIFNUUl9FTVBUWSksXG4gICAgICAgICAgc2VsZWN0b3IudHJpbSgpLmNoYXJBdCgwKSA9PT0gU0VQX05PX1NQQUNFID8gU1RSX0VNUFRZIDogU1RSX1NQQUNFLFxuICAgICAgICAgIHNlbGVjdG9yXG4gICAgICAgICAgICAudHJpbSgpXG4gICAgICAgICAgICAucmVwbGFjZShSX1NFUF9TRUxfU1BBQ0UsIFNUUl9TUEFDRSlcbiAgICAgICAgICAgIC5yZXBsYWNlKFJfU0VQX05PX1NQQUNFLCBTVFJfRU1QVFkpLFxuICAgICAgICBdLmpvaW4oU1RSX0VNUFRZKSxcbiAgICAgIClcbiAgICAgIC5qb2luKCcsJyk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBjYWNoZShcbiAgICBtZWRpYTogc3RyaW5nLFxuICAgIHNlbGVjdG9yOiBzdHJpbmcsXG4gICAgbWFwVG9CZUNhY2hlZDogYW55LFxuICApOiB2b2lkIHtcbiAgICBpZiAoIW1hcFRvQmVDYWNoZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUHJvcGVydHkgbWFwIG5vdCBmb3VuZCBmb3Igc2VsZWN0b3I6ICR7c2VsZWN0b3J9YCk7XG4gICAgfVxuXG4gICAgY29uc3QgY2FjaGVLZXkgPSBgJHttZWRpYX0ke3NlbGVjdG9yfSR7SlNPTi5zdHJpbmdpZnkobWFwVG9CZUNhY2hlZCl9YDtcbiAgICBpZiAoIU1hcGxlLkNBQ0hFW2NhY2hlS2V5XSkge1xuICAgICAgTWFwbGUudGVtcENhY2hlW21lZGlhXSA9IE1hcGxlLnRlbXBDYWNoZVttZWRpYV0gfHwge307XG4gICAgICBNYXBsZS50ZW1wQ2FjaGVbbWVkaWFdID0ge1xuICAgICAgICAuLi5NYXBsZS50ZW1wQ2FjaGVbbWVkaWFdLFxuICAgICAgICBbc2VsZWN0b3JdOiB7XG4gICAgICAgICAgLi4uKE1hcGxlLnRlbXBDYWNoZVttZWRpYV1bc2VsZWN0b3JdIHx8IHt9KSxcbiAgICAgICAgICAuLi5tYXBUb0JlQ2FjaGVkLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICAgIE1hcGxlLkNBQ0hFW2NhY2hlS2V5XSA9IDE7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgc3R5bGVzKG1lZGlhOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IGNhY2hlSXRlbSA9IE1hcGxlLnRlbXBDYWNoZVttZWRpYV07XG4gICAgaWYgKCFjYWNoZUl0ZW0pIHtcbiAgICAgIHJldHVybiBTVFJfRU1QVFk7XG4gICAgfVxuXG4gICAgY29uc3Qgc2VsZWN0b3JzID0gT2JqZWN0LmtleXMoY2FjaGVJdGVtKTtcblxuICAgIGlmIChzZWxlY3RvcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gU1RSX0VNUFRZO1xuICAgIH1cblxuICAgIGNvbnN0IGJyZWFrcG9pbnRQYXJ0cyA9IG1lZGlhLnNwbGl0KFNFUF9NRURJQSk7XG4gICAgY29uc3QgYnJlYWtwb2ludERpciA9IGJyZWFrcG9pbnRQYXJ0c1sxXTtcbiAgICBjb25zdCBtZWRpYVF1ZXJ5ID0gYnJlYWtwb2ludERpciA9PT0gU1RSX1VQID8gJ21pbi13aWR0aCcgOiAnbWF4LXdpZHRoJztcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcblxuICAgIC8vIG9wZW4gbWVkaWEgcXVlcnlcbiAgICBpZiAobWVkaWEgIT09IEJSRUFLUE9JTlQubWluTWVkaWEpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGBAbWVkaWEgKCR7bWVkaWFRdWVyeX06ICR7QlJFQUtQT0lOVC5tZWRpYVttZWRpYV19cHgpIHtgKTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IHNlbGVjdG9yIG9mIHNlbGVjdG9ycykge1xuICAgICAgY29uc3QgcHJvcE1hcCA9IGNhY2hlSXRlbVtzZWxlY3Rvcl07XG4gICAgICBpZiAoIXByb3BNYXApIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHByb3BNYXBLZXlzID0gT2JqZWN0LmtleXMocHJvcE1hcCkuZmlsdGVyKChwKSA9PiBwICE9PSBJTVBPUlRBTlQpO1xuICAgICAgaWYgKHByb3BNYXBLZXlzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gb3BlbiBzZWxlY3RvclxuICAgICAgcmVzdWx0LnB1c2goYCR7c2VsZWN0b3J9e2ApO1xuXG4gICAgICAvLyBmaWxsIHNlbGVjdG9yIHdpdGggcHJvcGVydGllc1xuICAgICAgZm9yIChjb25zdCBwcm9wIG9mIHByb3BNYXBLZXlzKSB7XG4gICAgICAgIGNvbnN0IHZhbCA9IHByb3BNYXBbcHJvcF0udG9TdHJpbmcoKTtcbiAgICAgICAgY29uc3QgaW1wb3J0YW50ID1cbiAgICAgICAgICB2YWwuaW5kZXhPZihJTVBPUlRBTlQpIDwgMCAmJiBwcm9wTWFwW0lNUE9SVEFOVF1cbiAgICAgICAgICAgID8gJyAhaW1wb3J0YW50J1xuICAgICAgICAgICAgOiBTVFJfRU1QVFk7XG4gICAgICAgIHJlc3VsdC5wdXNoKFxuICAgICAgICAgIE1hcGxlLnByb3BFeHRlbnNpb25NYXBbcHJvcF1cbiAgICAgICAgICAgID8gTWFwbGUucHJvcEV4dGVuc2lvbk1hcFtwcm9wXSh2YWwsIGltcG9ydGFudClcbiAgICAgICAgICAgIDogYCR7cHJvcH06JHt2YWx9JHtpbXBvcnRhbnR9O2AsXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIC8vIGNsb3NlIHNlbGVjdG9yXG4gICAgICByZXN1bHQucHVzaChgfWApO1xuICAgIH1cblxuICAgIC8vIGNsb3NlIG1lZGlhIHF1ZXJ5XG4gICAgaWYgKG1lZGlhICE9PSBCUkVBS1BPSU5ULm1pbk1lZGlhKSB7XG4gICAgICByZXN1bHQucHVzaChgfWApO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0Lmxlbmd0aCA+IDIgPyByZXN1bHQuam9pbihTVFJfRU1QVFkpIDogU1RSX0VNUFRZO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgZ2VuZXJhdGVXaGl0ZWxpc3Qod2hpdGVsaXN0OiBBcnJheTxzdHJpbmc+ID0gW10pOiB2b2lkIHtcbiAgICBjb25zdCBjbGFzc0xpc3QgPSBbXTtcbiAgICBmb3IgKGNvbnN0IHV0aWxLZXkgb2Ygd2hpdGVsaXN0KSB7XG4gICAgICBpZiAoIU1hcGxlLnV0aWxDbGFzc01hcFt1dGlsS2V5XSkge1xuICAgICAgICBjbGFzc0xpc3QucHVzaCh1dGlsS2V5KTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHByb3BzID0gT2JqZWN0LmtleXMoTWFwbGUudXRpbENsYXNzTWFwW3V0aWxLZXldKTtcbiAgICAgIGZvciAoY29uc3QgdXRpbFZhbCBvZiBwcm9wcykge1xuICAgICAgICBpZiAodXRpbFZhbC5jaGFyQXQoMCkgPT09IFBSRUZJWF9NQVBMRV9QUk9QKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBicmVha3BvaW50cyA9IE9iamVjdC5rZXlzKE1hcGxlLmJyZWFrcG9pbnRNYXApO1xuICAgICAgICBmb3IgKGNvbnN0IGJwIG9mIGJyZWFrcG9pbnRzKSB7XG4gICAgICAgICAgY29uc3QgbWVkaWFVcCA9IGJwICsgU1VGRklYX01FRElBX1VQO1xuICAgICAgICAgIGNvbnN0IG1lZGlhRG93biA9IGJwICsgU1VGRklYX01FRElBX0RPV047XG4gICAgICAgICAgY29uc3QgdXRpbENsYXNzID0gU0VQX1VUSUxfS0VZICsgdXRpbEtleSArIFNFUF9VVElMX1ZBTCArIHV0aWxWYWw7XG4gICAgICAgICAgaWYgKG1lZGlhVXAgaW4gQlJFQUtQT0lOVC5tZWRpYSkge1xuICAgICAgICAgICAgY2xhc3NMaXN0LnB1c2gobWVkaWFVcCArIHV0aWxDbGFzcyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChtZWRpYURvd24gaW4gQlJFQUtQT0lOVC5tZWRpYSkge1xuICAgICAgICAgICAgY2xhc3NMaXN0LnB1c2gobWVkaWFEb3duICsgdXRpbENsYXNzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgTWFwbGUuZmx5KHByZUluaXRDbGFzc0xpc3QuY29uY2F0KGNsYXNzTGlzdCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgc3BsaXRMYXN0T2NjdXJyZW5jZShzdHI6IHN0cmluZywga2V5OiBzdHJpbmcpOiBBcnJheTxzdHJpbmc+IHtcbiAgICBjb25zdCBwb3MgPSBzdHIubGFzdEluZGV4T2Yoa2V5KTtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICBjb25zdCBmaXJzdFBhcnQgPSBzdHIuc3Vic3RyaW5nKDAsIHBvcyk7XG4gICAgY29uc3QgbGFzdFBhcnQgPSBzdHIuc3Vic3RyaW5nKHBvcyArIGtleS5sZW5ndGgpO1xuICAgIGlmIChmaXJzdFBhcnQpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGZpcnN0UGFydCk7XG4gICAgfVxuICAgIGlmIChsYXN0UGFydCkge1xuICAgICAgcmVzdWx0LnB1c2gobGFzdFBhcnQpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgc3BsaXRGaXJzdE9jY3VycmVuY2Uoc3RyOiBzdHJpbmcsIGtleTogc3RyaW5nKTogQXJyYXk8c3RyaW5nPiB7XG4gICAgY29uc3QgcG9zID0gc3RyLmluZGV4T2Yoa2V5KTtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICBjb25zdCBmaXJzdFBhcnQgPSBzdHIuc3Vic3RyaW5nKDAsIHBvcyk7XG4gICAgY29uc3QgbGFzdFBhcnQgPSBzdHIuc3Vic3RyaW5nKHBvcyArIGtleS5sZW5ndGgpO1xuICAgIGlmIChmaXJzdFBhcnQpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGZpcnN0UGFydCk7XG4gICAgfVxuICAgIGlmIChsYXN0UGFydCkge1xuICAgICAgcmVzdWx0LnB1c2gobGFzdFBhcnQpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpbml0KFxuICAgIGRvY3VtZW50OiBhbnksXG4gICAgZW5hYmxlZDogYm9vbGVhbixcbiAgICB1dGlsQ2xhc3NNYXA6IGFueSA9IHt9LFxuICAgIHdoaXRlbGlzdDogQXJyYXk8c3RyaW5nPixcbiAgICB2YXJpYWJsZXM6IE1hcGxlVmFyaWFibGVNb2RlbCA9IE1hcGxlLnZhcmlhYmxlcyxcbiAgICBpc1J0bDogYm9vbGVhbiA9IGZhbHNlLFxuICAgIHV0aWxQcmVmaXhMaXN0OiBBcnJheTxhbnk+ID0gW10sXG4gICAgcHJvcEV4dGVuc2lvbk1hcDogYW55ID0ge30sXG4gICk6IHZvaWQge1xuICAgIGlzTWFwbGVFbmFibGVkID0gZW5hYmxlZDtcbiAgICBpZiAoaXNNYXBsZUVuYWJsZWQgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGRvYyA9IGRvY3VtZW50O1xuICAgIE1hcGxlLkNBQ0hFID0ge307XG4gICAgTWFwbGUudmFyaWFibGVzID0ge1xuICAgICAgLi4uTWFwbGUudmFyaWFibGVzLFxuICAgICAgLi4udmFyaWFibGVzLFxuICAgIH07XG4gICAgTWFwbGVDb2xvckhlbHBlci5nZW5lcmF0ZUFscGhhQ29sb3JzKE1hcGxlLnZhcmlhYmxlcy5jb2xvcik7XG4gICAgTWFwbGUudXRpbENsYXNzTWFwID0ge1xuICAgICAgLi4uZ2V0TWFwbGVVdGlsaXR5Q2xhc3NNYXAoTWFwbGUudmFyaWFibGVzKSxcbiAgICAgIC4uLnV0aWxDbGFzc01hcCxcbiAgICB9O1xuICAgIE1hcGxlLnV0aWxQcmVmaXhMaXN0ID0gW1xuICAgICAgLi4uZ2V0TWFwbGVVdGlsaXR5VmFyaWFibGVNYXAoTWFwbGUudmFyaWFibGVzKSxcbiAgICAgIC4uLnV0aWxQcmVmaXhMaXN0LFxuICAgIF07XG4gICAgTWFwbGUucHJvcEV4dGVuc2lvbk1hcCA9IHtcbiAgICAgIC4uLk1BUExFX1BST1BfRVhURU5TSU9OX01BUCxcbiAgICAgIC4uLnByb3BFeHRlbnNpb25NYXAsXG4gICAgfTtcbiAgICBNYXBsZS5icmVha3BvaW50TWFwID0ge1xuICAgICAgLi4uTWFwbGUudmFyaWFibGVzLmJyZWFrcG9pbnQsXG4gICAgfTtcbiAgICBNYXBsZS5zZXRNaW5BbmRNYXhCcmVha3BvaW50cygpO1xuICAgIE1hcGxlLmNyZWF0ZURvbUVsZW1lbnRzKFNUWUxFX0VMRU1FTlRTKTtcbiAgICBNYXBsZS5leHRlbmRQcm9wZXJ0aWVzKCk7XG4gICAgTWFwbGUudXRpbENsYXNzTWFwID0gTWFwbGUuY29udmVydFV0aWxDbGFzc01hcFRvUnRsKFxuICAgICAgTWFwbGUudXRpbENsYXNzTWFwLFxuICAgICAgaXNSdGwsXG4gICAgKTtcbiAgICBNYXBsZS5nZW5lcmF0ZVdoaXRlbGlzdCh3aGl0ZWxpc3QpO1xuICAgIHRoaXMub25Jbml0JC5uZXh0KHRydWUpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBmaW5kQW5kRmx5KHN0cjogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKGlzTWFwbGVFbmFibGVkID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoc3RyKSB7XG4gICAgICBNYXBsZS5mbHkoXG4gICAgICAgIChzdHIubWF0Y2goUl9FWFRSQUNUX0NMQVNTKSB8fCBbXSlcbiAgICAgICAgICAuam9pbignICcpXG4gICAgICAgICAgLnJlcGxhY2UoL2NsYXNzXFw9XFxcIi9nLCAnJylcbiAgICAgICAgICAucmVwbGFjZSgvXCIvZywgJycpLFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNvbnZlcnRVdGlsQ2xhc3NNYXBUb1J0bChcbiAgICB1dGlsaXR5Q2xhc3M6IGFueSxcbiAgICBpc1J0bDogYm9vbGVhbixcbiAgKTogYW55IHtcbiAgICBpZiAoIWlzUnRsKSB7XG4gICAgICByZXR1cm4gdXRpbGl0eUNsYXNzO1xuICAgIH1cbiAgICBjb25zdCBkYXRhID0ge307XG4gICAgT2JqZWN0LmtleXModXRpbGl0eUNsYXNzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdXRpbGl0eUNsYXNzW2tleV07XG4gICAgICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZS5ydGwpIHtcbiAgICAgICAgT2JqZWN0LmtleXModmFsdWUucnRsKS5yZWR1Y2UoKHJ0bFZhbHVlLCBydGxLZXkpID0+IHtcbiAgICAgICAgICBydGxWYWx1ZVtydGxLZXldID0gdmFsdWUucnRsW3J0bEtleV07XG4gICAgICAgIH0sIHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgaWYgKGtleS5pbmNsdWRlcygnbGVmdCcpKSB7XG4gICAgICAgICAgY29uc3QgcmVwbGFjZWRLZXkgPSBrZXkucmVwbGFjZSgnbGVmdCcsICdyaWdodCcpO1xuICAgICAgICAgIGRhdGFbcmVwbGFjZWRLZXldID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5LmluY2x1ZGVzKCdyaWdodCcpKSB7XG4gICAgICAgICAgY29uc3QgcmVwbGFjZWRLZXkgPSBrZXkucmVwbGFjZSgncmlnaHQnLCAnbGVmdCcpO1xuICAgICAgICAgIGRhdGFbcmVwbGFjZWRLZXldID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGF0YVtrZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgdmFsdWUuaW5jbHVkZXMoJ2xlZnQnKSkge1xuICAgICAgICAgIGRhdGFba2V5XSA9IHZhbHVlLnJlcGxhY2UoJ2xlZnQnLCAncmlnaHQnKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHZhbHVlLmluY2x1ZGVzKCdyaWdodCcpKSB7XG4gICAgICAgICAgZGF0YVtrZXldID0gdmFsdWUucmVwbGFjZSgncmlnaHQnLCAnbGVmdCcpO1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiZcbiAgICAgICAgICBrZXkgPT09ICd0cmFuc2Zvcm0nICYmXG4gICAgICAgICAgdmFsdWUuaW5jbHVkZXMoJ3RyYW5zbGF0ZScpICYmXG4gICAgICAgICAgIVsnWSgnLCAnWignXS5zb21lKCh0KSA9PiB2YWx1ZS5pbmNsdWRlcyh0KSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgZGF0YVtrZXldID0gdmFsdWVcbiAgICAgICAgICAgIC5zcGxpdCgnICcpXG4gICAgICAgICAgICAubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHNwbGl0dGVkVmFsdWUgPSBpdGVtLnNwbGl0KCcoJyk7XG4gICAgICAgICAgICAgIHNwbGl0dGVkVmFsdWVbMV0gPVxuICAgICAgICAgICAgICAgIHNwbGl0dGVkVmFsdWVbMV0gJiYgc3BsaXR0ZWRWYWx1ZVsxXS5zdGFydHNXaXRoKCctJylcbiAgICAgICAgICAgICAgICAgID8gc3BsaXR0ZWRWYWx1ZVsxXS5yZXBsYWNlKCctJywgJygnKVxuICAgICAgICAgICAgICAgICAgOiBzcGxpdHRlZFZhbHVlWzFdXG4gICAgICAgICAgICAgICAgICA/ICcoLScgKyBzcGxpdHRlZFZhbHVlWzFdXG4gICAgICAgICAgICAgICAgICA6ICcnO1xuXG4gICAgICAgICAgICAgIHJldHVybiBzcGxpdHRlZFZhbHVlWzBdICsgc3BsaXR0ZWRWYWx1ZVsxXTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuam9pbignICcpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBmaXhlZFV0aWxpdHkgPSBNYXBsZS5jb252ZXJ0VXRpbENsYXNzTWFwVG9SdGwoXG4gICAgICAgICAgeyAuLi52YWx1ZSB9LFxuICAgICAgICAgIGlzUnRsLFxuICAgICAgICApO1xuICAgICAgICBkYXRhW2tleV0gPSB7IC4uLmZpeGVkVXRpbGl0eSB9O1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBmbHkoY2xhc3NMaXN0OiBhbnkpOiB2b2lkIHtcbiAgICBpZiAoaXNNYXBsZUVuYWJsZWQgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghcHJlSW5pdENsYXNzTGlzdC5sZW5ndGgpIHtcbiAgICAgIHByZUluaXRDbGFzc0xpc3QgPSBwcmVJbml0Q2xhc3NMaXN0LmNvbmNhdChjbGFzc0xpc3QpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghY2xhc3NMaXN0IHx8IGNsYXNzTGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCByYXdDYWNoZUtleSA9IEFycmF5LmlzQXJyYXkoY2xhc3NMaXN0KVxuICAgICAgPyBjbGFzc0xpc3Quam9pbignICcpXG4gICAgICA6IGNsYXNzTGlzdDtcblxuICAgIGlmIChNYXBsZS5yYXdDYWNoZVtyYXdDYWNoZUtleV0pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgTWFwbGUucmF3Q2FjaGVbcmF3Q2FjaGVLZXldID0gMTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShjbGFzc0xpc3QpID09PSBmYWxzZSkge1xuICAgICAgY2xhc3NMaXN0ID0gY2xhc3NMaXN0LnNwbGl0KC9cXHMrL2cpO1xuICAgIH1cblxuICAgIGNsYXNzTGlzdCA9IE1hcGxlLnVuaWZ5VXRpbGl0eUNsYXNzKGNsYXNzTGlzdCk7XG5cbiAgICBNYXBsZS50ZW1wQ2FjaGUgPSB7fTtcblxuICAgIGZvciAoY29uc3QgY2xhc3NJdGVtIG9mIGNsYXNzTGlzdCkge1xuICAgICAgLy8gQ2hlY2sgd2hldGhlciB0aGUgc3R5bGVzIHdpbGwgaGF2ZSAhaW1wb3J0YW50IGZsYWcgb3Igbm90XG4gICAgICBjb25zdCBpbXBvcnRhbnQgPSBjbGFzc0l0ZW0uY2hhckF0KGNsYXNzSXRlbS5sZW5ndGggLSAxKSA9PT0gSU1QT1JUQU5UO1xuICAgICAgY29uc3QgY2xhc3NJdGVtV2l0aG91dEltcG9ydGFudCA9IGNsYXNzSXRlbS5yZXBsYWNlKElNUE9SVEFOVCwgU1RSX0VNUFRZKTtcblxuICAgICAgbGV0IHBhcnRzID0gTWFwbGUuc3BsaXRMYXN0T2NjdXJyZW5jZShcbiAgICAgICAgY2xhc3NJdGVtV2l0aG91dEltcG9ydGFudCxcbiAgICAgICAgU0VQX1VUSUxfVkFMLFxuICAgICAgKTtcblxuICAgICAgLy8gRXh0cmFjdCB1dGlsaXR5IHZhbHVlXG4gICAgICBjb25zdCB1dGlsVmFsID0gcGFydHMubGVuZ3RoID09PSAxID8gbnVsbCA6IHBhcnRzLnBvcCgpO1xuXG4gICAgICAvLyBFeHRyYWN0IG1lZGlhIHF1ZXJ5XG4gICAgICBjb25zdCBtZWRpYSA9XG4gICAgICAgIE9iamVjdC5rZXlzKEJSRUFLUE9JTlQubWVkaWEpLmZpbmQoXG4gICAgICAgICAgKGtleTogc3RyaW5nKSA9PiBjbGFzc0l0ZW0uaW5kZXhPZihrZXkpID09PSAwLFxuICAgICAgICApIHx8IEJSRUFLUE9JTlQubWluTWVkaWE7XG5cbiAgICAgIHBhcnRzID0gTWFwbGUuc3BsaXRGaXJzdE9jY3VycmVuY2UocGFydHMuam9pbihTVFJfRU1QVFkpLCBtZWRpYSlcbiAgICAgICAgLmpvaW4oU1RSX0VNUFRZKVxuICAgICAgICAuc3BsaXQoU0VQX1VUSUxfS0VZKVxuICAgICAgICAuZmlsdGVyKChwOiBzdHJpbmcpID0+ICEhcCk7XG5cbiAgICAgIC8vIEV4YWN0IHV0aWxpdHkgY2xhc3NcbiAgICAgIGNvbnN0IHV0aWxLZXkgPSBwYXJ0cy5sZW5ndGggPj0gMSA/IHBhcnRzLnBvcCgpIDogbnVsbDtcblxuICAgICAgLy8gRXh0cmFjdCBzZWxlY3RvclxuICAgICAgY29uc3Qgc2VsS2V5ID0gcGFydHMuam9pbihTRVBfVVRJTF9LRVkpO1xuXG4gICAgICAvLyBHZXQgc3R5bGUgbWFwXG4gICAgICBjb25zdCBtYXBsZSA9IE1hcGxlLnV0aWxDbGFzc01hcFt1dGlsS2V5XTtcblxuICAgICAgLy8gV2l0aG91dCBhIHN0eWxlIG1hcCB3ZSBjYW4ndCBjcmVhdGUgc3R5bGVzXG4gICAgICBpZiAoIW1hcGxlKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBDYWNoZSBkZWZhdWx0IHN0eWxlcyB3aXRoIHNlbGVjdG9yXG4gICAgICBpZiAobWFwbGUuX2RlZmF1bHQpIHtcbiAgICAgICAgT2JqZWN0LmtleXMobWFwbGUuX2RlZmF1bHQpLmZvckVhY2goKG1lZGlhSXRlbSkgPT4ge1xuICAgICAgICAgIE1hcGxlLmNhY2hlKFxuICAgICAgICAgICAgbWVkaWFJdGVtLFxuICAgICAgICAgICAgTWFwbGUuZ2V0U2VsZWN0b3JzKFxuICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICBzZWxLZXksXG4gICAgICAgICAgICAgIHV0aWxLZXksXG4gICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgIG1hcGxlLl9zZWxlY3RvcixcbiAgICAgICAgICAgICAgaW1wb3J0YW50LFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgLi4ubWFwbGUuX2NvbW1vbixcbiAgICAgICAgICAgICAgLi4ubWFwbGVbbWFwbGUuX2RlZmF1bHRbbWVkaWFJdGVtXV0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBDYWNoZSB1dGlsaXR5IHN0eWxlcyB3aXRoIHNlbGVjdG9yXG4gICAgICBpZiAodXRpbFZhbCkge1xuICAgICAgICBjb25zdCBjID0gY2xhc3NJdGVtLnJlcGxhY2UoSU1QT1JUQU5ULCBTVFJfRU1QVFkpO1xuICAgICAgICBjb25zdCB1Y20gPSBNYXBsZS51dGlsQ2xhc3NNYXA7XG5cbiAgICAgICAgLy8jcmVnaW9uIFdpbGRjYXJkIHNlbGVjdG9yc1xuICAgICAgICAvLyAqOnV0aWwta2V5XG4gICAgICAgIC8vICo6dXRpbC1rZXk9dXRpbC12YWxcbiAgICAgICAgLy8gKi5zZWxlY3Rvcjp1dGlsLWtleT11dGlsLXZhbFxuICAgICAgICAvLyAqOnNlbGVjdG9yLWtleTp1dGlsLWtleT11dGlsLXZhbFxuICAgICAgICBjb25zdCB3Y01lZGlhID0gYy5yZXBsYWNlKG1lZGlhLCBXSUxEQ0FSRCk7XG5cbiAgICAgICAgLy8gbWVkaWE6KlxuICAgICAgICAvLyBtZWRpYS5zZWxlY3RvcjoqXG4gICAgICAgIC8vIG1lZGlhOnNlbGVjdG9yLWtleToqXG4gICAgICAgIGNvbnN0IHdjdXRpbEtleSA9IGMucmVwbGFjZShSX1NFUF9VVElMX0tFWSwgYDoke1dJTERDQVJEfWApO1xuXG4gICAgICAgIC8vIG1lZGlhOnV0aWwta2V5PSpcbiAgICAgICAgLy8gbWVkaWEuc2VsZWN0b3I6dXRpbC1rZXk9KlxuICAgICAgICAvLyBtZWRpYTpzZWxlY3Rvci1rZXk6dXRpbC1rZXk9KlxuICAgICAgICBjb25zdCB3Y3V0aWxWYWwgPSBjLnJlcGxhY2UoUl9TRVBfVVRJTF9WQUwsIGA9JHtXSUxEQ0FSRH1gKTtcblxuICAgICAgICAvLyAqOipcbiAgICAgICAgLy8gKi5zZWxlY3RvcjoqXG4gICAgICAgIC8vICo6c2VsZWN0b3Ita2V5OipcbiAgICAgICAgY29uc3Qgd2NNZWRpYUtleSA9IHdjTWVkaWEucmVwbGFjZShSX1NFUF9VVElMX0tFWSwgYDoke1dJTERDQVJEfWApO1xuXG4gICAgICAgIC8vICo6dXRpbC1rZXk9KlxuICAgICAgICAvLyAqLnNlbGVjdG9yOnV0aWwta2V5PSpcbiAgICAgICAgLy8gKjpzZWxlY3Rvci1rZXk6dXRpbC1rZXk9KlxuICAgICAgICBjb25zdCB3Y01lZGlhVmFsID0gd2N1dGlsVmFsLnJlcGxhY2UobWVkaWEsIFdJTERDQVJEKTtcbiAgICAgICAgLy8jZW5kcmVnaW9uXG5cbiAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSBNYXBsZS5nZXRTZWxlY3RvcnMoXG4gICAgICAgICAgbWVkaWEsXG4gICAgICAgICAgc2VsS2V5LFxuICAgICAgICAgIHV0aWxLZXksXG4gICAgICAgICAgdXRpbFZhbCxcbiAgICAgICAgICBtYXBsZS5fc2VsZWN0b3IsXG4gICAgICAgICAgaW1wb3J0YW50LFxuICAgICAgICApO1xuXG4gICAgICAgIE1hcGxlLmNhY2hlKG1lZGlhLCBzZWxlY3Rvciwge1xuICAgICAgICAgIC4uLm1hcGxlLl9jb21tb24sXG4gICAgICAgICAgLi4ubWFwbGVbdXRpbFZhbF0sXG4gICAgICAgICAgLi4uSlNPTi5wYXJzZShcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KFxuICAgICAgICAgICAgICBtYXBsZVt1dGlsVmFsLnJlcGxhY2UoUl9DVVNUT00sIFdJTERDQVJEKV0gfHwge30sXG4gICAgICAgICAgICApLnJlcGxhY2UoXG4gICAgICAgICAgICAgIFJfV0lMRENBUkQsXG4gICAgICAgICAgICAgIHV0aWxLZXkgPT09ICdjb250ZW50J1xuICAgICAgICAgICAgICAgID8gdXRpbFZhbC5yZXBsYWNlKFJfQ1VTVE9NLCAnJDEnKVxuICAgICAgICAgICAgICAgIDogdXRpbFZhbC5yZXBsYWNlKFJfQ1VTVE9NLCAnJDEnKS5yZXBsYWNlKFJfU0VQX1ZBTF9TUEFDRSwgJyAnKSxcbiAgICAgICAgICAgICksXG4gICAgICAgICAgKSxcbiAgICAgICAgICAuLi4odWNtW3djTWVkaWFLZXldIHx8IHt9KSxcbiAgICAgICAgICAuLi4odWNtW3djdXRpbEtleV0gfHwge30pLFxuICAgICAgICAgIC4uLih1Y21bd2NNZWRpYVZhbF0gfHwge30pLFxuICAgICAgICAgIC4uLih1Y21bd2N1dGlsVmFsXSB8fCB7fSksXG4gICAgICAgICAgLi4uKHVjbVt3Y01lZGlhXSB8fCB7fSksXG4gICAgICAgICAgLi4uKHVjbVtjXSB8fCB7fSksXG4gICAgICAgICAgW0lNUE9SVEFOVF06IGltcG9ydGFudCxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8jcmVnaW9uIEdlbmVyYXRlIHN0eWxlc1xuICAgIC8vIEdlbmVyYXRlIG1pbiBtZWRpYSBxdWVyeSBzdHlsZXNcbiAgICBjb25zdCBtaW5NZWRpYVN0eWxlcyA9IE1hcGxlLnN0eWxlcyhCUkVBS1BPSU5ULm1pbk1lZGlhKTtcbiAgICBpZiAobWluTWVkaWFTdHlsZXMpIHtcbiAgICAgIE1hcGxlLmFwcGVuZFN0eWxlKFxuICAgICAgICBTVFlMRV9FTEVNRU5UUyxcbiAgICAgICAgQlJFQUtQT0lOVC5taW5NZWRpYSxcbiAgICAgICAgbWluTWVkaWFTdHlsZXMsXG4gICAgICAgIGZhbHNlLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBHZW5lcmF0ZSBtZWRpYSBxdWVyeSBzdHlsZXNcbiAgICBjb25zdCBtZWRpYVF1ZXJ5U3R5bGVzID0ge307XG4gICAgT2JqZWN0LmtleXMoTWFwbGUudGVtcENhY2hlKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGlmIChrZXkgIT09IEJSRUFLUE9JTlQubWluTWVkaWEpIHtcbiAgICAgICAgbWVkaWFRdWVyeVN0eWxlc1trZXldID0gbWVkaWFRdWVyeVN0eWxlc1trZXldIHx8ICcnO1xuICAgICAgICBtZWRpYVF1ZXJ5U3R5bGVzW2tleV0gKz0gTWFwbGUuc3R5bGVzKGtleSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgT2JqZWN0LmtleXMobWVkaWFRdWVyeVN0eWxlcykuZm9yRWFjaCgoa2V5KSA9PlxuICAgICAgTWFwbGUuYXBwZW5kU3R5bGUoU1RZTEVfRUxFTUVOVFMsIGtleSwgbWVkaWFRdWVyeVN0eWxlc1trZXldLCBmYWxzZSksXG4gICAgKTtcbiAgICAvLyNlbmRyZWdpb25cbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgdW5pZnlVdGlsaXR5Q2xhc3MoY2xhc3NMaXN0OiBBcnJheTxzdHJpbmc+KTogQXJyYXk8c3RyaW5nPiB7XG4gICAgY29uc3QgY2xhc3NlcyA9IGNsYXNzTGlzdC5yZWR1Y2UoKGFjYywgcHJldikgPT4ge1xuICAgICAgY29uc3QgZXhpc3RpbmdTdHlsZUluZGV4ID0gYWNjLmZpbmRJbmRleChcbiAgICAgICAgKHApID0+XG4gICAgICAgICAgKChwIHx8ICcnKS5zcGxpdChSX1VOSUZJWSkgfHwgW10pWzBdID09PVxuICAgICAgICAgICgocHJldiB8fCAnJykuc3BsaXQoUl9VTklGSVkpIHx8IFtdKVswXSxcbiAgICAgICk7XG4gICAgICBpZiAoZXhpc3RpbmdTdHlsZUluZGV4IDwgMCkge1xuICAgICAgICBhY2MucHVzaChwcmV2KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFjY1tleGlzdGluZ1N0eWxlSW5kZXhdID0gcHJldjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhY2M7XG4gICAgfSwgW10pO1xuICAgIHJldHVybiBjbGFzc2VzO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBhcHBlbmRTdHlsZShcbiAgICBzdHlsZUVsZW1lbnRzOiBhbnksXG4gICAgYnA6IHN0cmluZyxcbiAgICBzdHlsZTogc3RyaW5nLFxuICAgIHNpbGVudDogYm9vbGVhbiA9IHRydWUsXG4gICk6IHZvaWQge1xuICAgIHN0eWxlRWxlbWVudHNbYnBdLmFwcGVuZENoaWxkKGRvYy5jcmVhdGVUZXh0Tm9kZShzdHlsZSkpO1xuXG4gICAgaWYgKCFzaWxlbnQpIHtcbiAgICAgIE1hcGxlLm9uU3R5bGVBcHBlbmQkLm5leHQoeyBicCwgc3R5bGUgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpc01lZGlhVmFsaWQobWVkaWE6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBtZWRpYSBpbiBCUkVBS1BPSU5ULm1lZGlhO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpc0JyZWFrcG9pbnRWYWxpZChicmVha3BvaW50OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gYnJlYWtwb2ludCBpbiBNYXBsZS5icmVha3BvaW50TWFwO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpc01lZGlhTWF0Y2hlc1dpdGhCcmVha3BvaW50KFxuICAgIG1lZGlhOiBzdHJpbmcsXG4gICAgYnJlYWtwb2ludDogc3RyaW5nLFxuICApOiBib29sZWFuIHtcbiAgICBpZiAoIU1hcGxlLmlzQnJlYWtwb2ludFZhbGlkKGJyZWFrcG9pbnQpIHx8ICFNYXBsZS5pc01lZGlhVmFsaWQobWVkaWEpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgbWVkaWFTaXplID0gQlJFQUtQT0lOVC5tZWRpYVttZWRpYV07XG4gICAgY29uc3QgYnJlYWtwb2ludFNpemUgPSBwYXJzZUZsb2F0KE1hcGxlLmJyZWFrcG9pbnRNYXBbYnJlYWtwb2ludF0pO1xuXG4gICAgaWYgKG1lZGlhLmluY2x1ZGVzKFNVRkZJWF9NRURJQV9ET1dOKSkge1xuICAgICAgcmV0dXJuIGJyZWFrcG9pbnRTaXplIDw9IG1lZGlhU2l6ZTtcbiAgICB9XG5cbiAgICBpZiAobWVkaWEuaW5jbHVkZXMoU1VGRklYX01FRElBX1VQKSkge1xuICAgICAgcmV0dXJuIGJyZWFrcG9pbnRTaXplID49IG1lZGlhU2l6ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldFZhbGlkTWVkaWFNYXAoKTogYW55IHtcbiAgICByZXR1cm4geyAuLi5CUkVBS1BPSU5ULm1lZGlhIH07XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldE1pbk1lZGlhKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIEJSRUFLUE9JTlQubWluTWVkaWE7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldE1pbkJyZWFrcG9pbnQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gQlJFQUtQT0lOVC5taW5LZXk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldE1hcHBlZE1lZGlhT3JNaW4obWVkaWE6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIE1hcGxlLmlzTWVkaWFWYWxpZChtZWRpYSkgPyBtZWRpYSA6IE1hcGxlLmdldE1pbk1lZGlhKCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldE1hcHBlZE1lZGlhT3JOdWxsKG1lZGlhOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBNYXBsZS5pc01lZGlhVmFsaWQobWVkaWEpID8gbWVkaWEgOiBudWxsO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRNYXBwZWRCcmVha3BvaW50T3JNaW4oYnJlYWtwb2ludDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gTWFwbGUuaXNCcmVha3BvaW50VmFsaWQoYnJlYWtwb2ludClcbiAgICAgID8gYnJlYWtwb2ludFxuICAgICAgOiBNYXBsZS5nZXRNaW5CcmVha3BvaW50KCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldE1hcHBlZEJyZWFrcG9pbnRPck51bGwoYnJlYWtwb2ludDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gTWFwbGUuaXNCcmVha3BvaW50VmFsaWQoYnJlYWtwb2ludCkgPyBicmVha3BvaW50IDogbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0VmFyaWFibGVzKCk6IE1hcGxlVmFyaWFibGVNb2RlbCB7XG4gICAgcmV0dXJuIHsgLi4uTWFwbGUudmFyaWFibGVzIH07XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGZpbGxJblRoZUdhcHMoYnJlYWtwb2ludE1hcDogYW55KTogYW55IHtcbiAgICBjb25zdCBmdWxsQnJlYWtwb2ludE1hcCA9IE1hcGxlLmdldFZhcmlhYmxlcygpLmJyZWFrcG9pbnQ7XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGZ1bGxCcmVha3BvaW50TWFwKTtcbiAgICBjb25zdCBtaW5LZXkgPSBrZXlzLmZpbmQoKGtleSkgPT4ga2V5IGluIGJyZWFrcG9pbnRNYXApO1xuICAgIHJldHVybiBrZXlzXG4gICAgICAuc29ydCgoYSwgYikgPT4gZnVsbEJyZWFrcG9pbnRNYXBbYV0gLSBmdWxsQnJlYWtwb2ludE1hcFtiXSlcbiAgICAgIC5yZWR1Y2UoKGFjYywga2V5LCBpKSA9PiB7XG4gICAgICAgIGNvbnN0IG5leHRLZXkgPSBrZXlzW2kgKyAxXTtcbiAgICAgICAgaWYgKGtleSBpbiBhY2MgPT09IGZhbHNlKSB7XG4gICAgICAgICAgYWNjID0ge1xuICAgICAgICAgICAgLi4uYWNjLFxuICAgICAgICAgICAgW2tleV06XG4gICAgICAgICAgICAgIGtleSBpbiBicmVha3BvaW50TWFwID8gYnJlYWtwb2ludE1hcFtrZXldIDogYnJlYWtwb2ludE1hcFttaW5LZXldLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5leHRLZXkgJiYgIWJyZWFrcG9pbnRNYXBbbmV4dEtleV0pIHtcbiAgICAgICAgICBhY2MgPSB7XG4gICAgICAgICAgICAuLi5hY2MsXG4gICAgICAgICAgICBbbmV4dEtleV06IGFjY1trZXldLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgIH0sIHt9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaXNCcmVha3BvaW50TWFwKGJyZWFrcG9pbnRNYXA6IGFueSk6IGFueSB7XG4gICAgaWYgKHR5cGVvZiBicmVha3BvaW50TWFwID09PSAnb2JqZWN0JyAmJiBicmVha3BvaW50TWFwICE9PSBudWxsKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXMoTWFwbGUuZ2V0VmFyaWFibGVzKCkuYnJlYWtwb2ludCkuc29tZShcbiAgICAgICAgKGtleSkgPT4gYnJlYWtwb2ludE1hcCAmJiBrZXkgaW4gYnJlYWtwb2ludE1hcCxcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIl19