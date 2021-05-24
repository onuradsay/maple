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
let preInitClassListGenerated = false;
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
        return ((maple._selector || selKey || '') + _selector)
            .split(/,\s*/)
            .map((selector) => [
            parentSelector ? parentSelector + STR_SPACE : STR_EMPTY,
            utilVal ? STR_DOT : STR_EMPTY,
            utilVal ? esc(baseSel + utilVal) : `[class*="${baseSel}"]`,
            utilVal && important ? esc(IMPORTANT) : STR_EMPTY,
            maple._selector || !selKey || selKey.charAt(0) === SEP_NO_SPACE
                ? STR_EMPTY
                : STR_SPACE,
            selector.trim().charAt(0) === SEP_NO_SPACE ? STR_EMPTY : STR_SPACE,
            selector
                .trim()
                .replace(SEP_OUTER_SPACE + parentSelector, STR_EMPTY)
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
        preInitClassListGenerated = true;
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
        if (!preInitClassListGenerated) {
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
        return classList.reduce((acc, classItem) => {
            const existingStyleIndex = acc.findIndex((p) => ((p || '').split(R_UNIFIY) || [])[0] ===
                ((classItem || '').split(R_UNIFIY) || [])[0]);
            if (existingStyleIndex < 0) {
                acc.push(classItem);
            }
            else {
                acc[existingStyleIndex] = classItem;
            }
            return acc;
        }, []);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXBsZS8iLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdkMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFcEUsT0FBTyxFQUNMLHVCQUF1QixFQUN2QiwwQkFBMEIsR0FDM0IsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDcEQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRTlELCtFQUErRTtBQUMvRSxNQUFNLFVBQVUsR0FBUTtJQUN0QixLQUFLLEVBQUUsRUFBRTtDQUNWLENBQUM7QUFDRixNQUFNLGNBQWMsR0FBRyxFQUFFLENBQUM7QUFFMUIsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDO0FBQ3JCLE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQztBQUN0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S0FBSyxRQUFRLElBQUksYUFBYSxLQUFLLElBQUksRUFBRTtZQUMvRCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FDdEQsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLGFBQWEsSUFBSSxHQUFHLElBQUksYUFBYSxDQUMvQyxDQUFDO1NBQ0g7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7O0FBeHNCYyxXQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ1gsZUFBUyxHQUF1QjtJQUM3QyxVQUFVLEVBQUUsb0JBQW9CO0lBQ2hDLEtBQUssRUFBRSxlQUFlO0lBQ3RCLFVBQVUsRUFBRSxxQkFBcUI7SUFDakMsUUFBUSxFQUFFLG1CQUFtQjtJQUM3QixVQUFVLEVBQUUscUJBQXFCO0lBQ2pDLFFBQVEsRUFBRSxtQkFBbUI7SUFDN0IsTUFBTSxFQUFFLGdCQUFnQjtJQUN4QixVQUFVLEVBQUUsb0JBQW9CO0lBQ2hDLE1BQU0sRUFBRSxnQkFBZ0I7SUFDeEIsS0FBSyxFQUFFLGVBQWU7Q0FDdkIsQ0FBQztBQUNhLG1CQUFhLEdBQVEsRUFBRSxDQUFDO0FBQ3hCLGtCQUFZLEdBQVEsRUFBRSxDQUFDO0FBQ3ZCLG9CQUFjLEdBQWUsRUFBRSxDQUFDO0FBQ2hDLHNCQUFnQixHQUFRLEVBQUUsQ0FBQztBQUMzQixjQUFRLEdBQVEsRUFBRSxDQUFDO0FBQ25CLGVBQVMsR0FBUSxFQUFFLENBQUM7QUFDckIsb0JBQWMsR0FBeUIsSUFBSSxlQUFlLENBQ3RFLElBQUksQ0FDTCxDQUFDO0FBQ1ksYUFBTyxHQUE2QixJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTWFwbGVDb2xvckhlbHBlciB9IGZyb20gJy4vaGVscGVycy9jb2xvci5oZWxwZXInO1xuaW1wb3J0IHsgTUFQTEVfUFJPUF9FWFRFTlNJT05fTUFQIH0gZnJvbSAnLi9wcm9wZXJ0eS1leHRlbnNpb24tbWFwJztcbmltcG9ydCB7IE1hcGxlVmFyaWFibGVNb2RlbCB9IGZyb20gJy4vdHlwZXMvdmFyaWFibGVzLm1vZGVsJztcbmltcG9ydCB7XG4gIGdldE1hcGxlVXRpbGl0eUNsYXNzTWFwLFxuICBnZXRNYXBsZVV0aWxpdHlWYXJpYWJsZU1hcCxcbn0gZnJvbSAnLi91dGlsaXR5LWNsYXNzLW1hcCc7XG5pbXBvcnQgeyBNQVBMRV9WQVJfQUxFUlQgfSBmcm9tICcuL3ZhcmlhYmxlcy9hbGVydCc7XG5pbXBvcnQgeyBNQVBMRV9WQVJfQlJFQUtQT0lOVCB9IGZyb20gJy4vdmFyaWFibGVzL2JyZWFrcG9pbnQnO1xuaW1wb3J0IHsgTUFQTEVfVkFSX0JVVFRPTiB9IGZyb20gJy4vdmFyaWFibGVzL2J1dHRvbic7XG5pbXBvcnQgeyBNQVBMRV9WQVJfQ09MT1IgfSBmcm9tICcuL3ZhcmlhYmxlcy9jb2xvcic7XG5pbXBvcnQgeyBNQVBMRV9WQVJfRk9OVF9GQU1JTFkgfSBmcm9tICcuL3ZhcmlhYmxlcy9mb250LWZhbWlseSc7XG5pbXBvcnQgeyBNQVBMRV9WQVJfRk9OVF9TSVpFIH0gZnJvbSAnLi92YXJpYWJsZXMvZm9udC1zaXplJztcbmltcG9ydCB7IE1BUExFX1ZBUl9GT05UX1dFSUdIVCB9IGZyb20gJy4vdmFyaWFibGVzL2ZvbnQtd2VpZ2h0JztcbmltcG9ydCB7IE1BUExFX1ZBUl9NQVhfV0lEVEggfSBmcm9tICcuL3ZhcmlhYmxlcy9tYXgtd2lkdGgnO1xuaW1wb3J0IHsgTUFQTEVfVkFSX1NQQUNFUiB9IGZyb20gJy4vdmFyaWFibGVzL3NwYWNlcic7XG5pbXBvcnQgeyBNQVBMRV9WQVJfVFJBTlNJVElPTiB9IGZyb20gJy4vdmFyaWFibGVzL3RyYW5zaXRpb24nO1xuXG4vLyBEZWZpbmUgYSBnbG9iYWwgTWFwbGUuQ0FDSEUgdG8gY29sbGVjdCBzZWxlY3RvcnMgYW5kIG1hcHMgb24gYnJlYWtwb2ludCBrZXlzXG5jb25zdCBCUkVBS1BPSU5UOiBhbnkgPSB7XG4gIG1lZGlhOiB7fSxcbn07XG5jb25zdCBTVFlMRV9FTEVNRU5UUyA9IHt9O1xuXG5jb25zdCBTVFJfRU1QVFkgPSAnJztcbmNvbnN0IFNUUl9TUEFDRSA9ICcgJztcbmNvbnN0IFNUUl9ET1QgPSAnLic7XG5jb25zdCBTVFJfVVAgPSAndXAnO1xuY29uc3QgU1RSX0RPV04gPSAnZG93bic7XG5jb25zdCBTRVBfTUVESUEgPSAnLSc7XG5jb25zdCBTRVBfU0VMRUNUT1IgPSAnOic7XG5jb25zdCBTRVBfVVRJTF9LRVkgPSAnOic7XG5jb25zdCBTRVBfVVRJTF9WQUwgPSAnPSc7XG5jb25zdCBTRVBfTk9fU1BBQ0UgPSAnPCc7XG5jb25zdCBTRVBfT1VURVJfU1BBQ0UgPSAnPDwnO1xuY29uc3QgSU1QT1JUQU5UID0gJyEnO1xuY29uc3QgV0lMRENBUkQgPSAnKic7XG5cbmNvbnN0IFBSRUZJWF9NQVBMRV9QUk9QID0gJ18nO1xuY29uc3QgU1VGRklYX01FRElBX1VQID0gU0VQX01FRElBICsgU1RSX1VQO1xuY29uc3QgU1VGRklYX01FRElBX0RPV04gPSBTRVBfTUVESUEgKyBTVFJfRE9XTjtcblxuY29uc3QgUl9TRUxFQ1RPUl9SRVNFUlZFRCA9XG4gIC8oXFwufFxcK3xcXH58XFw8fFxcPnxcXFt8XFxdfFxcKHxcXCl8XFwhfFxcOnxcXCx8XFw9fFxcfHxcXCV8XFwjfFxcKnxcXFwifFxcLykvZztcbmNvbnN0IFJfRVNDQVBFX1JFU0VSVkVEID0gJ1xcXFwkMSc7XG5jb25zdCBSX1NFUF9OT19TUEFDRSA9IC9cXDwvZztcbmNvbnN0IFJfU0VQX1NFTF9TUEFDRSA9IC9cXD5cXD4vZztcbmNvbnN0IFJfU0VQX1NFTF9TUEFDRV9BTEwgPSAvKFxcPHxcXD5cXD4pL2c7XG5jb25zdCBSX1NFUF9WQUxfU1BBQ0UgPSAvXFx8L2c7XG5jb25zdCBSX1NFUF9VVElMX1ZBTCA9IC89KD86Lig/IT0pKSskLztcbmNvbnN0IFJfU0VQX1VUSUxfS0VZID0gL1xcOig/Oi4oPyFcXDopKSskLztcbmNvbnN0IFJfQ1VTVE9NID0gL1xcKCguKj8pXFwpLztcbmNvbnN0IFJfV0lMRENBUkQgPSAvXFwqL2c7XG5jb25zdCBSX0VYVFJBQ1RfQ0xBU1MgPSAvY2xhc3NcXD1cXFwiKFtcXHNcXFNdKz8pXFxcIi9nO1xuY29uc3QgUl9VTklGSVkgPSAvXFw9KD89W14uXSokKS87XG5cbmxldCBwcmVJbml0Q2xhc3NMaXN0ID0gW107XG5sZXQgcHJlSW5pdENsYXNzTGlzdEdlbmVyYXRlZCA9IGZhbHNlO1xubGV0IGlzTWFwbGVFbmFibGVkID0gdHJ1ZTtcbmxldCBkb2M7XG5cbmNvbnN0IGVzYyA9IChzZWxlY3Rvcjogc3RyaW5nKSA9PlxuICBzZWxlY3Rvci5yZXBsYWNlKFJfU0VMRUNUT1JfUkVTRVJWRUQsIFJfRVNDQVBFX1JFU0VSVkVEKTtcblxuZXhwb3J0IGNsYXNzIE1hcGxlIHtcbiAgcHJpdmF0ZSBzdGF0aWMgQ0FDSEUgPSB7fTtcbiAgcHJpdmF0ZSBzdGF0aWMgdmFyaWFibGVzOiBNYXBsZVZhcmlhYmxlTW9kZWwgPSB7XG4gICAgYnJlYWtwb2ludDogTUFQTEVfVkFSX0JSRUFLUE9JTlQsXG4gICAgY29sb3I6IE1BUExFX1ZBUl9DT0xPUixcbiAgICBmb250RmFtaWx5OiBNQVBMRV9WQVJfRk9OVF9GQU1JTFksXG4gICAgZm9udFNpemU6IE1BUExFX1ZBUl9GT05UX1NJWkUsXG4gICAgZm9udFdlaWdodDogTUFQTEVfVkFSX0ZPTlRfV0VJR0hULFxuICAgIG1heFdpZHRoOiBNQVBMRV9WQVJfTUFYX1dJRFRILFxuICAgIHNwYWNlcjogTUFQTEVfVkFSX1NQQUNFUixcbiAgICB0cmFuc2l0aW9uOiBNQVBMRV9WQVJfVFJBTlNJVElPTixcbiAgICBidXR0b246IE1BUExFX1ZBUl9CVVRUT04sXG4gICAgYWxlcnQ6IE1BUExFX1ZBUl9BTEVSVCxcbiAgfTtcbiAgcHJpdmF0ZSBzdGF0aWMgYnJlYWtwb2ludE1hcDogYW55ID0ge307XG4gIHByaXZhdGUgc3RhdGljIHV0aWxDbGFzc01hcDogYW55ID0ge307XG4gIHByaXZhdGUgc3RhdGljIHV0aWxQcmVmaXhMaXN0OiBBcnJheTxhbnk+ID0gW107XG4gIHByaXZhdGUgc3RhdGljIHByb3BFeHRlbnNpb25NYXA6IGFueSA9IHt9O1xuICBwcml2YXRlIHN0YXRpYyByYXdDYWNoZTogYW55ID0ge307XG4gIHByaXZhdGUgc3RhdGljIHRlbXBDYWNoZTogYW55ID0ge307XG4gIHB1YmxpYyBzdGF0aWMgb25TdHlsZUFwcGVuZCQ6IEJlaGF2aW9yU3ViamVjdDxhbnk+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChcbiAgICBudWxsLFxuICApO1xuICBwdWJsaWMgc3RhdGljIG9uSW5pdCQ6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoZmFsc2UpO1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgLy8gRmluZCBtaW4gYW5kIG1heCBicmVha3BvaW50c1xuICBwcml2YXRlIHN0YXRpYyBzZXRNaW5BbmRNYXhCcmVha3BvaW50cygpOiB2b2lkIHtcbiAgICBjb25zdCBicmVha3BvaW50S2V5czogQXJyYXk8c3RyaW5nPiA9IE9iamVjdC5rZXlzKE1hcGxlLmJyZWFrcG9pbnRNYXApO1xuICAgIGNvbnN0IGJyZWFrcG9pbnRzID0gYnJlYWtwb2ludEtleXNcbiAgICAgIC5tYXAoKGtleSkgPT4gKHtcbiAgICAgICAga2V5LFxuICAgICAgICBzaXplOiBwYXJzZUZsb2F0KE1hcGxlLmJyZWFrcG9pbnRNYXBba2V5XSksXG4gICAgICB9KSlcbiAgICAgIC5zb3J0KChhLCBiKSA9PiBhLnNpemUgLSBiLnNpemUpO1xuXG4gICAgQlJFQUtQT0lOVC5taW5LZXkgPSBicmVha3BvaW50c1swXS5rZXk7XG4gICAgQlJFQUtQT0lOVC5tYXhLZXkgPSBicmVha3BvaW50c1ticmVha3BvaW50cy5sZW5ndGggLSAxXS5rZXk7XG4gICAgQlJFQUtQT0lOVC5taW5NZWRpYSA9IEJSRUFLUE9JTlQubWluS2V5ICsgU1VGRklYX01FRElBX1VQO1xuXG4gICAgYnJlYWtwb2ludHMuZm9yRWFjaCgoYnA6IGFueSwgaTogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBuZXh0ID0gYnJlYWtwb2ludHNbaSArIDFdO1xuICAgICAgQlJFQUtQT0lOVC5tZWRpYVticC5rZXkgKyBTVUZGSVhfTUVESUFfVVBdID0gYnAuc2l6ZTtcbiAgICAgIGlmIChuZXh0KSB7XG4gICAgICAgIC8vIFVzZXMgMC4wMnB4IHJhdGhlciB0aGFuIDAuMDFweCB0byB3b3JrIGFyb3VuZCBhIGN1cnJlbnQgcm91bmRpbmcgYnVnIGluIFNhZmFyaS5cbiAgICAgICAgLy8gU2VlIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xNzgyNjFcbiAgICAgICAgQlJFQUtQT0lOVC5tZWRpYVticC5rZXkgKyBTVUZGSVhfTUVESUFfRE9XTl0gPSBuZXh0LnNpemUgLSAwLjAyO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGVEb21FbGVtZW50cyhcbiAgICBzdHlsZUVsZW1lbnRzOiBhbnksXG4gICAgcHJlZml4OiBzdHJpbmcgPSAnbWFwbGUnLFxuICAgIGRvY3VtZW50PzogYW55LFxuICApOiB2b2lkIHtcbiAgICAvLyBQcmVwYXJlIHN0eWxlIGVsZW1lbnQgb24gaGVhZFxuICAgIGNvbnN0IGRvY0hlYWQgPSAoZG9jdW1lbnQgfHwgZG9jKS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xuICAgIGNvbnN0IGJyZWFrcG9pbnRzID0gT2JqZWN0LmtleXMoQlJFQUtQT0lOVC5tZWRpYSkuc29ydChcbiAgICAgIChhLCBiKSA9PiBCUkVBS1BPSU5ULm1lZGlhW2FdIC0gQlJFQUtQT0lOVC5tZWRpYVtiXSxcbiAgICApO1xuICAgIGNvbnN0IGJyZWFrcG9pbnRzVXAgPSBicmVha3BvaW50cy5maWx0ZXIoKGtleSkgPT5cbiAgICAgIGtleS5pbmNsdWRlcyhTVUZGSVhfTUVESUFfVVApLFxuICAgICk7XG4gICAgY29uc3QgYnJlYWtwb2ludHNEb3duID0gYnJlYWtwb2ludHMuZmlsdGVyKChrZXkpID0+XG4gICAgICBrZXkuaW5jbHVkZXMoU1VGRklYX01FRElBX0RPV04pLFxuICAgICk7XG5cbiAgICBicmVha3BvaW50c1VwLmNvbmNhdChicmVha3BvaW50c0Rvd24ucmV2ZXJzZSgpKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGNvbnN0IHN0eWxlSWQgPSBgJHtwcmVmaXh9LSR7a2V5fWA7XG4gICAgICBjb25zdCBlbCA9IGRvYy5nZXRFbGVtZW50QnlJZChzdHlsZUlkKTtcbiAgICAgIGlmICghIWVsKSB7XG4gICAgICAgIGRvY0hlYWQucmVtb3ZlQ2hpbGQoZWwpO1xuICAgICAgfVxuICAgICAgc3R5bGVFbGVtZW50c1trZXldID0gKGRvYyBhcyBEb2N1bWVudCkuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgIChzdHlsZUVsZW1lbnRzW2tleV0gYXMgSFRNTEVsZW1lbnQpLnNldEF0dHJpYnV0ZSgnaWQnLCBzdHlsZUlkKTtcbiAgICAgIGRvY0hlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50c1trZXldKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGV4dGVuZFByb3BlcnRpZXMoKTogdm9pZCB7XG4gICAgTWFwbGUudXRpbFByZWZpeExpc3QuZm9yRWFjaCgoZGVmOiBhbnkpID0+IHtcbiAgICAgIE1hcGxlLnV0aWxDbGFzc01hcFtkZWYucHJlZml4XSA9IE1hcGxlLnV0aWxDbGFzc01hcFtkZWYucHJlZml4XSB8fCB7fTtcbiAgICAgIE1hcGxlLnV0aWxDbGFzc01hcFtkZWYucHJlZml4XVtXSUxEQ0FSRF0gPSB7fTtcbiAgICAgIE9iamVjdC5rZXlzKGRlZi5tYXApLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBNYXBsZS51dGlsQ2xhc3NNYXBbZGVmLnByZWZpeF1ba2V5XSA9IHt9O1xuICAgICAgICBkZWYucHJvcHMuZm9yRWFjaCgocHJvcCkgPT4ge1xuICAgICAgICAgIE1hcGxlLnV0aWxDbGFzc01hcFtkZWYucHJlZml4XVtXSUxEQ0FSRF0gPSB7XG4gICAgICAgICAgICAuLi5NYXBsZS51dGlsQ2xhc3NNYXBbZGVmLnByZWZpeF1bV0lMRENBUkRdLFxuICAgICAgICAgICAgW3Byb3BdOiBXSUxEQ0FSRCxcbiAgICAgICAgICB9O1xuICAgICAgICAgIE1hcGxlLnV0aWxDbGFzc01hcFtkZWYucHJlZml4XVtrZXldW3Byb3BdID0gZGVmLm1hcFtrZXldO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgZ2V0U2VsZWN0b3JzKFxuICAgIG1lZGlhOiBzdHJpbmcgPSBTVFJfRU1QVFksXG4gICAgc2VsS2V5OiBzdHJpbmcgPSBTVFJfRU1QVFksXG4gICAgdXRpbEtleTogc3RyaW5nID0gU1RSX0VNUFRZLFxuICAgIHV0aWxWYWw6IHN0cmluZyA9IFNUUl9FTVBUWSxcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IHZhcmlhYmxlLW5hbWVcbiAgICBfc2VsZWN0b3I6IHN0cmluZyA9IFNUUl9FTVBUWSxcbiAgICBpbXBvcnRhbnQ6IGJvb2xlYW4gPSBmYWxzZSxcbiAgKTogc3RyaW5nIHtcbiAgICBjb25zdCBtYXBsZSA9IE1hcGxlLnV0aWxDbGFzc01hcFtzZWxLZXldIHx8IHt9O1xuICAgIGNvbnN0IHBhcmVudFNlbGVjdG9yID0gc2VsS2V5LmluY2x1ZGVzKFNFUF9PVVRFUl9TUEFDRSlcbiAgICAgID8gc2VsS2V5LnNwbGl0KFNFUF9PVVRFUl9TUEFDRSkucG9wKCkuc3BsaXQoUl9TRVBfU0VMX1NQQUNFX0FMTCkuc2hpZnQoKVxuICAgICAgOiBTVFJfRU1QVFk7XG5cbiAgICBjb25zdCBiYXNlU2VsID0gW1xuICAgICAgbWVkaWEgfHwgU1RSX0VNUFRZLFxuICAgICAgbWFwbGUuX3NlbGVjdG9yID8gU0VQX1NFTEVDVE9SIDogU1RSX0VNUFRZLFxuICAgICAgc2VsS2V5LFxuICAgICAgdXRpbEtleSA/IFNFUF9VVElMX0tFWSA6IFNUUl9FTVBUWSxcbiAgICAgIHV0aWxLZXksXG4gICAgICB1dGlsVmFsID8gU0VQX1VUSUxfVkFMIDogU1RSX0VNUFRZLFxuICAgIF0uam9pbihTVFJfRU1QVFkpO1xuXG4gICAgcmV0dXJuICgobWFwbGUuX3NlbGVjdG9yIHx8IHNlbEtleSB8fCAnJykgKyBfc2VsZWN0b3IpXG4gICAgICAuc3BsaXQoLyxcXHMqLylcbiAgICAgIC5tYXAoKHNlbGVjdG9yKSA9PlxuICAgICAgICBbXG4gICAgICAgICAgcGFyZW50U2VsZWN0b3IgPyBwYXJlbnRTZWxlY3RvciArIFNUUl9TUEFDRSA6IFNUUl9FTVBUWSxcbiAgICAgICAgICB1dGlsVmFsID8gU1RSX0RPVCA6IFNUUl9FTVBUWSxcbiAgICAgICAgICB1dGlsVmFsID8gZXNjKGJhc2VTZWwgKyB1dGlsVmFsKSA6IGBbY2xhc3MqPVwiJHtiYXNlU2VsfVwiXWAsXG4gICAgICAgICAgdXRpbFZhbCAmJiBpbXBvcnRhbnQgPyBlc2MoSU1QT1JUQU5UKSA6IFNUUl9FTVBUWSxcbiAgICAgICAgICBtYXBsZS5fc2VsZWN0b3IgfHwgIXNlbEtleSB8fCBzZWxLZXkuY2hhckF0KDApID09PSBTRVBfTk9fU1BBQ0VcbiAgICAgICAgICAgID8gU1RSX0VNUFRZXG4gICAgICAgICAgICA6IFNUUl9TUEFDRSxcbiAgICAgICAgICBzZWxlY3Rvci50cmltKCkuY2hhckF0KDApID09PSBTRVBfTk9fU1BBQ0UgPyBTVFJfRU1QVFkgOiBTVFJfU1BBQ0UsXG4gICAgICAgICAgc2VsZWN0b3JcbiAgICAgICAgICAgIC50cmltKClcbiAgICAgICAgICAgIC5yZXBsYWNlKFNFUF9PVVRFUl9TUEFDRSArIHBhcmVudFNlbGVjdG9yLCBTVFJfRU1QVFkpXG4gICAgICAgICAgICAucmVwbGFjZShSX1NFUF9TRUxfU1BBQ0UsIFNUUl9TUEFDRSlcbiAgICAgICAgICAgIC5yZXBsYWNlKFJfU0VQX05PX1NQQUNFLCBTVFJfRU1QVFkpLFxuICAgICAgICBdLmpvaW4oU1RSX0VNUFRZKSxcbiAgICAgIClcbiAgICAgIC5qb2luKCcsJyk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBjYWNoZShcbiAgICBtZWRpYTogc3RyaW5nLFxuICAgIHNlbGVjdG9yOiBzdHJpbmcsXG4gICAgbWFwVG9CZUNhY2hlZDogYW55LFxuICApOiB2b2lkIHtcbiAgICBpZiAoIW1hcFRvQmVDYWNoZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUHJvcGVydHkgbWFwIG5vdCBmb3VuZCBmb3Igc2VsZWN0b3I6ICR7c2VsZWN0b3J9YCk7XG4gICAgfVxuXG4gICAgY29uc3QgY2FjaGVLZXkgPSBgJHttZWRpYX0ke3NlbGVjdG9yfSR7SlNPTi5zdHJpbmdpZnkobWFwVG9CZUNhY2hlZCl9YDtcbiAgICBpZiAoIU1hcGxlLkNBQ0hFW2NhY2hlS2V5XSkge1xuICAgICAgTWFwbGUudGVtcENhY2hlW21lZGlhXSA9IE1hcGxlLnRlbXBDYWNoZVttZWRpYV0gfHwge307XG4gICAgICBNYXBsZS50ZW1wQ2FjaGVbbWVkaWFdID0ge1xuICAgICAgICAuLi5NYXBsZS50ZW1wQ2FjaGVbbWVkaWFdLFxuICAgICAgICBbc2VsZWN0b3JdOiB7XG4gICAgICAgICAgLi4uKE1hcGxlLnRlbXBDYWNoZVttZWRpYV1bc2VsZWN0b3JdIHx8IHt9KSxcbiAgICAgICAgICAuLi5tYXBUb0JlQ2FjaGVkLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICAgIE1hcGxlLkNBQ0hFW2NhY2hlS2V5XSA9IDE7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgc3R5bGVzKG1lZGlhOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IGNhY2hlSXRlbSA9IE1hcGxlLnRlbXBDYWNoZVttZWRpYV07XG4gICAgaWYgKCFjYWNoZUl0ZW0pIHtcbiAgICAgIHJldHVybiBTVFJfRU1QVFk7XG4gICAgfVxuXG4gICAgY29uc3Qgc2VsZWN0b3JzID0gT2JqZWN0LmtleXMoY2FjaGVJdGVtKTtcblxuICAgIGlmIChzZWxlY3RvcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gU1RSX0VNUFRZO1xuICAgIH1cblxuICAgIGNvbnN0IGJyZWFrcG9pbnRQYXJ0cyA9IG1lZGlhLnNwbGl0KFNFUF9NRURJQSk7XG4gICAgY29uc3QgYnJlYWtwb2ludERpciA9IGJyZWFrcG9pbnRQYXJ0c1sxXTtcbiAgICBjb25zdCBtZWRpYVF1ZXJ5ID0gYnJlYWtwb2ludERpciA9PT0gU1RSX1VQID8gJ21pbi13aWR0aCcgOiAnbWF4LXdpZHRoJztcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcblxuICAgIC8vIG9wZW4gbWVkaWEgcXVlcnlcbiAgICBpZiAobWVkaWEgIT09IEJSRUFLUE9JTlQubWluTWVkaWEpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGBAbWVkaWEgKCR7bWVkaWFRdWVyeX06ICR7QlJFQUtQT0lOVC5tZWRpYVttZWRpYV19cHgpIHtgKTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IHNlbGVjdG9yIG9mIHNlbGVjdG9ycykge1xuICAgICAgY29uc3QgcHJvcE1hcCA9IGNhY2hlSXRlbVtzZWxlY3Rvcl07XG4gICAgICBpZiAoIXByb3BNYXApIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHByb3BNYXBLZXlzID0gT2JqZWN0LmtleXMocHJvcE1hcCkuZmlsdGVyKChwKSA9PiBwICE9PSBJTVBPUlRBTlQpO1xuICAgICAgaWYgKHByb3BNYXBLZXlzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gb3BlbiBzZWxlY3RvclxuICAgICAgcmVzdWx0LnB1c2goYCR7c2VsZWN0b3J9e2ApO1xuXG4gICAgICAvLyBmaWxsIHNlbGVjdG9yIHdpdGggcHJvcGVydGllc1xuICAgICAgZm9yIChjb25zdCBwcm9wIG9mIHByb3BNYXBLZXlzKSB7XG4gICAgICAgIGNvbnN0IHZhbCA9IHByb3BNYXBbcHJvcF0udG9TdHJpbmcoKTtcbiAgICAgICAgY29uc3QgaW1wb3J0YW50ID1cbiAgICAgICAgICB2YWwuaW5kZXhPZihJTVBPUlRBTlQpIDwgMCAmJiBwcm9wTWFwW0lNUE9SVEFOVF1cbiAgICAgICAgICAgID8gJyAhaW1wb3J0YW50J1xuICAgICAgICAgICAgOiBTVFJfRU1QVFk7XG4gICAgICAgIHJlc3VsdC5wdXNoKFxuICAgICAgICAgIE1hcGxlLnByb3BFeHRlbnNpb25NYXBbcHJvcF1cbiAgICAgICAgICAgID8gTWFwbGUucHJvcEV4dGVuc2lvbk1hcFtwcm9wXSh2YWwsIGltcG9ydGFudClcbiAgICAgICAgICAgIDogYCR7cHJvcH06JHt2YWx9JHtpbXBvcnRhbnR9O2AsXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIC8vIGNsb3NlIHNlbGVjdG9yXG4gICAgICByZXN1bHQucHVzaChgfWApO1xuICAgIH1cblxuICAgIC8vIGNsb3NlIG1lZGlhIHF1ZXJ5XG4gICAgaWYgKG1lZGlhICE9PSBCUkVBS1BPSU5ULm1pbk1lZGlhKSB7XG4gICAgICByZXN1bHQucHVzaChgfWApO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0Lmxlbmd0aCA+IDIgPyByZXN1bHQuam9pbihTVFJfRU1QVFkpIDogU1RSX0VNUFRZO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgZ2VuZXJhdGVXaGl0ZWxpc3Qod2hpdGVsaXN0OiBBcnJheTxzdHJpbmc+ID0gW10pOiB2b2lkIHtcbiAgICBjb25zdCBjbGFzc0xpc3QgPSBbXTtcbiAgICBmb3IgKGNvbnN0IHV0aWxLZXkgb2Ygd2hpdGVsaXN0KSB7XG4gICAgICBpZiAoIU1hcGxlLnV0aWxDbGFzc01hcFt1dGlsS2V5XSkge1xuICAgICAgICBjbGFzc0xpc3QucHVzaCh1dGlsS2V5KTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHByb3BzID0gT2JqZWN0LmtleXMoTWFwbGUudXRpbENsYXNzTWFwW3V0aWxLZXldKTtcbiAgICAgIGZvciAoY29uc3QgdXRpbFZhbCBvZiBwcm9wcykge1xuICAgICAgICBpZiAodXRpbFZhbC5jaGFyQXQoMCkgPT09IFBSRUZJWF9NQVBMRV9QUk9QKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBicmVha3BvaW50cyA9IE9iamVjdC5rZXlzKE1hcGxlLmJyZWFrcG9pbnRNYXApO1xuICAgICAgICBmb3IgKGNvbnN0IGJwIG9mIGJyZWFrcG9pbnRzKSB7XG4gICAgICAgICAgY29uc3QgbWVkaWFVcCA9IGJwICsgU1VGRklYX01FRElBX1VQO1xuICAgICAgICAgIGNvbnN0IG1lZGlhRG93biA9IGJwICsgU1VGRklYX01FRElBX0RPV047XG4gICAgICAgICAgY29uc3QgdXRpbENsYXNzID0gU0VQX1VUSUxfS0VZICsgdXRpbEtleSArIFNFUF9VVElMX1ZBTCArIHV0aWxWYWw7XG4gICAgICAgICAgaWYgKG1lZGlhVXAgaW4gQlJFQUtQT0lOVC5tZWRpYSkge1xuICAgICAgICAgICAgY2xhc3NMaXN0LnB1c2gobWVkaWFVcCArIHV0aWxDbGFzcyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChtZWRpYURvd24gaW4gQlJFQUtQT0lOVC5tZWRpYSkge1xuICAgICAgICAgICAgY2xhc3NMaXN0LnB1c2gobWVkaWFEb3duICsgdXRpbENsYXNzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgTWFwbGUuZmx5KHByZUluaXRDbGFzc0xpc3QuY29uY2F0KGNsYXNzTGlzdCkpO1xuICAgIHByZUluaXRDbGFzc0xpc3RHZW5lcmF0ZWQgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgc3BsaXRMYXN0T2NjdXJyZW5jZShzdHI6IHN0cmluZywga2V5OiBzdHJpbmcpOiBBcnJheTxzdHJpbmc+IHtcbiAgICBjb25zdCBwb3MgPSBzdHIubGFzdEluZGV4T2Yoa2V5KTtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICBjb25zdCBmaXJzdFBhcnQgPSBzdHIuc3Vic3RyaW5nKDAsIHBvcyk7XG4gICAgY29uc3QgbGFzdFBhcnQgPSBzdHIuc3Vic3RyaW5nKHBvcyArIGtleS5sZW5ndGgpO1xuICAgIGlmIChmaXJzdFBhcnQpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGZpcnN0UGFydCk7XG4gICAgfVxuICAgIGlmIChsYXN0UGFydCkge1xuICAgICAgcmVzdWx0LnB1c2gobGFzdFBhcnQpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgc3BsaXRGaXJzdE9jY3VycmVuY2Uoc3RyOiBzdHJpbmcsIGtleTogc3RyaW5nKTogQXJyYXk8c3RyaW5nPiB7XG4gICAgY29uc3QgcG9zID0gc3RyLmluZGV4T2Yoa2V5KTtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICBjb25zdCBmaXJzdFBhcnQgPSBzdHIuc3Vic3RyaW5nKDAsIHBvcyk7XG4gICAgY29uc3QgbGFzdFBhcnQgPSBzdHIuc3Vic3RyaW5nKHBvcyArIGtleS5sZW5ndGgpO1xuICAgIGlmIChmaXJzdFBhcnQpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGZpcnN0UGFydCk7XG4gICAgfVxuICAgIGlmIChsYXN0UGFydCkge1xuICAgICAgcmVzdWx0LnB1c2gobGFzdFBhcnQpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpbml0KFxuICAgIGRvY3VtZW50OiBhbnksXG4gICAgZW5hYmxlZDogYm9vbGVhbixcbiAgICB1dGlsQ2xhc3NNYXA6IGFueSA9IHt9LFxuICAgIHdoaXRlbGlzdDogQXJyYXk8c3RyaW5nPixcbiAgICB2YXJpYWJsZXM6IE1hcGxlVmFyaWFibGVNb2RlbCA9IE1hcGxlLnZhcmlhYmxlcyxcbiAgICBpc1J0bDogYm9vbGVhbiA9IGZhbHNlLFxuICAgIHV0aWxQcmVmaXhMaXN0OiBBcnJheTxhbnk+ID0gW10sXG4gICAgcHJvcEV4dGVuc2lvbk1hcDogYW55ID0ge30sXG4gICk6IHZvaWQge1xuICAgIGlzTWFwbGVFbmFibGVkID0gZW5hYmxlZDtcbiAgICBpZiAoaXNNYXBsZUVuYWJsZWQgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGRvYyA9IGRvY3VtZW50O1xuICAgIE1hcGxlLkNBQ0hFID0ge307XG4gICAgTWFwbGUudmFyaWFibGVzID0ge1xuICAgICAgLi4uTWFwbGUudmFyaWFibGVzLFxuICAgICAgLi4udmFyaWFibGVzLFxuICAgIH07XG4gICAgTWFwbGVDb2xvckhlbHBlci5nZW5lcmF0ZUFscGhhQ29sb3JzKE1hcGxlLnZhcmlhYmxlcy5jb2xvcik7XG4gICAgTWFwbGUudXRpbENsYXNzTWFwID0ge1xuICAgICAgLi4uZ2V0TWFwbGVVdGlsaXR5Q2xhc3NNYXAoTWFwbGUudmFyaWFibGVzKSxcbiAgICAgIC4uLnV0aWxDbGFzc01hcCxcbiAgICB9O1xuICAgIE1hcGxlLnV0aWxQcmVmaXhMaXN0ID0gW1xuICAgICAgLi4uZ2V0TWFwbGVVdGlsaXR5VmFyaWFibGVNYXAoTWFwbGUudmFyaWFibGVzKSxcbiAgICAgIC4uLnV0aWxQcmVmaXhMaXN0LFxuICAgIF07XG4gICAgTWFwbGUucHJvcEV4dGVuc2lvbk1hcCA9IHtcbiAgICAgIC4uLk1BUExFX1BST1BfRVhURU5TSU9OX01BUCxcbiAgICAgIC4uLnByb3BFeHRlbnNpb25NYXAsXG4gICAgfTtcbiAgICBNYXBsZS5icmVha3BvaW50TWFwID0ge1xuICAgICAgLi4uTWFwbGUudmFyaWFibGVzLmJyZWFrcG9pbnQsXG4gICAgfTtcbiAgICBNYXBsZS5zZXRNaW5BbmRNYXhCcmVha3BvaW50cygpO1xuICAgIE1hcGxlLmNyZWF0ZURvbUVsZW1lbnRzKFNUWUxFX0VMRU1FTlRTKTtcbiAgICBNYXBsZS5leHRlbmRQcm9wZXJ0aWVzKCk7XG4gICAgTWFwbGUudXRpbENsYXNzTWFwID0gTWFwbGUuY29udmVydFV0aWxDbGFzc01hcFRvUnRsKFxuICAgICAgTWFwbGUudXRpbENsYXNzTWFwLFxuICAgICAgaXNSdGwsXG4gICAgKTtcbiAgICBNYXBsZS5nZW5lcmF0ZVdoaXRlbGlzdCh3aGl0ZWxpc3QpO1xuICAgIHRoaXMub25Jbml0JC5uZXh0KHRydWUpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBmaW5kQW5kRmx5KHN0cjogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKGlzTWFwbGVFbmFibGVkID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoc3RyKSB7XG4gICAgICBNYXBsZS5mbHkoXG4gICAgICAgIChzdHIubWF0Y2goUl9FWFRSQUNUX0NMQVNTKSB8fCBbXSlcbiAgICAgICAgICAuam9pbignICcpXG4gICAgICAgICAgLnJlcGxhY2UoL2NsYXNzXFw9XFxcIi9nLCAnJylcbiAgICAgICAgICAucmVwbGFjZSgvXCIvZywgJycpLFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNvbnZlcnRVdGlsQ2xhc3NNYXBUb1J0bChcbiAgICB1dGlsaXR5Q2xhc3M6IGFueSxcbiAgICBpc1J0bDogYm9vbGVhbixcbiAgKTogYW55IHtcbiAgICBpZiAoIWlzUnRsKSB7XG4gICAgICByZXR1cm4gdXRpbGl0eUNsYXNzO1xuICAgIH1cbiAgICBjb25zdCBkYXRhID0ge307XG4gICAgT2JqZWN0LmtleXModXRpbGl0eUNsYXNzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdXRpbGl0eUNsYXNzW2tleV07XG4gICAgICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZS5ydGwpIHtcbiAgICAgICAgT2JqZWN0LmtleXModmFsdWUucnRsKS5yZWR1Y2UoKHJ0bFZhbHVlLCBydGxLZXkpID0+IHtcbiAgICAgICAgICBydGxWYWx1ZVtydGxLZXldID0gdmFsdWUucnRsW3J0bEtleV07XG4gICAgICAgIH0sIHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgaWYgKGtleS5pbmNsdWRlcygnbGVmdCcpKSB7XG4gICAgICAgICAgY29uc3QgcmVwbGFjZWRLZXkgPSBrZXkucmVwbGFjZSgnbGVmdCcsICdyaWdodCcpO1xuICAgICAgICAgIGRhdGFbcmVwbGFjZWRLZXldID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5LmluY2x1ZGVzKCdyaWdodCcpKSB7XG4gICAgICAgICAgY29uc3QgcmVwbGFjZWRLZXkgPSBrZXkucmVwbGFjZSgncmlnaHQnLCAnbGVmdCcpO1xuICAgICAgICAgIGRhdGFbcmVwbGFjZWRLZXldID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGF0YVtrZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgdmFsdWUuaW5jbHVkZXMoJ2xlZnQnKSkge1xuICAgICAgICAgIGRhdGFba2V5XSA9IHZhbHVlLnJlcGxhY2UoJ2xlZnQnLCAncmlnaHQnKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHZhbHVlLmluY2x1ZGVzKCdyaWdodCcpKSB7XG4gICAgICAgICAgZGF0YVtrZXldID0gdmFsdWUucmVwbGFjZSgncmlnaHQnLCAnbGVmdCcpO1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiZcbiAgICAgICAgICBrZXkgPT09ICd0cmFuc2Zvcm0nICYmXG4gICAgICAgICAgdmFsdWUuaW5jbHVkZXMoJ3RyYW5zbGF0ZScpICYmXG4gICAgICAgICAgIVsnWSgnLCAnWignXS5zb21lKCh0KSA9PiB2YWx1ZS5pbmNsdWRlcyh0KSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgZGF0YVtrZXldID0gdmFsdWVcbiAgICAgICAgICAgIC5zcGxpdCgnICcpXG4gICAgICAgICAgICAubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHNwbGl0dGVkVmFsdWUgPSBpdGVtLnNwbGl0KCcoJyk7XG4gICAgICAgICAgICAgIHNwbGl0dGVkVmFsdWVbMV0gPVxuICAgICAgICAgICAgICAgIHNwbGl0dGVkVmFsdWVbMV0gJiYgc3BsaXR0ZWRWYWx1ZVsxXS5zdGFydHNXaXRoKCctJylcbiAgICAgICAgICAgICAgICAgID8gc3BsaXR0ZWRWYWx1ZVsxXS5yZXBsYWNlKCctJywgJygnKVxuICAgICAgICAgICAgICAgICAgOiBzcGxpdHRlZFZhbHVlWzFdXG4gICAgICAgICAgICAgICAgICA/ICcoLScgKyBzcGxpdHRlZFZhbHVlWzFdXG4gICAgICAgICAgICAgICAgICA6ICcnO1xuXG4gICAgICAgICAgICAgIHJldHVybiBzcGxpdHRlZFZhbHVlWzBdICsgc3BsaXR0ZWRWYWx1ZVsxXTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuam9pbignICcpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBmaXhlZFV0aWxpdHkgPSBNYXBsZS5jb252ZXJ0VXRpbENsYXNzTWFwVG9SdGwoXG4gICAgICAgICAgeyAuLi52YWx1ZSB9LFxuICAgICAgICAgIGlzUnRsLFxuICAgICAgICApO1xuICAgICAgICBkYXRhW2tleV0gPSB7IC4uLmZpeGVkVXRpbGl0eSB9O1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBmbHkoY2xhc3NMaXN0OiBhbnkpOiB2b2lkIHtcbiAgICBpZiAoaXNNYXBsZUVuYWJsZWQgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghcHJlSW5pdENsYXNzTGlzdEdlbmVyYXRlZCkge1xuICAgICAgcHJlSW5pdENsYXNzTGlzdCA9IHByZUluaXRDbGFzc0xpc3QuY29uY2F0KGNsYXNzTGlzdCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFjbGFzc0xpc3QgfHwgY2xhc3NMaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHJhd0NhY2hlS2V5ID0gQXJyYXkuaXNBcnJheShjbGFzc0xpc3QpXG4gICAgICA/IGNsYXNzTGlzdC5qb2luKCcgJylcbiAgICAgIDogY2xhc3NMaXN0O1xuXG4gICAgaWYgKE1hcGxlLnJhd0NhY2hlW3Jhd0NhY2hlS2V5XSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBNYXBsZS5yYXdDYWNoZVtyYXdDYWNoZUtleV0gPSAxO1xuICAgIGlmIChBcnJheS5pc0FycmF5KGNsYXNzTGlzdCkgPT09IGZhbHNlKSB7XG4gICAgICBjbGFzc0xpc3QgPSBjbGFzc0xpc3Quc3BsaXQoL1xccysvZyk7XG4gICAgfVxuXG4gICAgY2xhc3NMaXN0ID0gTWFwbGUudW5pZnlVdGlsaXR5Q2xhc3MoY2xhc3NMaXN0KTtcblxuICAgIE1hcGxlLnRlbXBDYWNoZSA9IHt9O1xuXG4gICAgZm9yIChjb25zdCBjbGFzc0l0ZW0gb2YgY2xhc3NMaXN0KSB7XG4gICAgICAvLyBDaGVjayB3aGV0aGVyIHRoZSBzdHlsZXMgd2lsbCBoYXZlICFpbXBvcnRhbnQgZmxhZyBvciBub3RcbiAgICAgIGNvbnN0IGltcG9ydGFudCA9IGNsYXNzSXRlbS5jaGFyQXQoY2xhc3NJdGVtLmxlbmd0aCAtIDEpID09PSBJTVBPUlRBTlQ7XG4gICAgICBjb25zdCBjbGFzc0l0ZW1XaXRob3V0SW1wb3J0YW50ID0gY2xhc3NJdGVtLnJlcGxhY2UoSU1QT1JUQU5ULCBTVFJfRU1QVFkpO1xuXG4gICAgICBsZXQgcGFydHMgPSBNYXBsZS5zcGxpdExhc3RPY2N1cnJlbmNlKFxuICAgICAgICBjbGFzc0l0ZW1XaXRob3V0SW1wb3J0YW50LFxuICAgICAgICBTRVBfVVRJTF9WQUwsXG4gICAgICApO1xuXG4gICAgICAvLyBFeHRyYWN0IHV0aWxpdHkgdmFsdWVcbiAgICAgIGNvbnN0IHV0aWxWYWwgPSBwYXJ0cy5sZW5ndGggPT09IDEgPyBudWxsIDogcGFydHMucG9wKCk7XG5cbiAgICAgIC8vIEV4dHJhY3QgbWVkaWEgcXVlcnlcbiAgICAgIGNvbnN0IG1lZGlhID1cbiAgICAgICAgT2JqZWN0LmtleXMoQlJFQUtQT0lOVC5tZWRpYSkuZmluZChcbiAgICAgICAgICAoa2V5OiBzdHJpbmcpID0+IGNsYXNzSXRlbS5pbmRleE9mKGtleSkgPT09IDAsXG4gICAgICAgICkgfHwgQlJFQUtQT0lOVC5taW5NZWRpYTtcblxuICAgICAgcGFydHMgPSBNYXBsZS5zcGxpdEZpcnN0T2NjdXJyZW5jZShwYXJ0cy5qb2luKFNUUl9FTVBUWSksIG1lZGlhKVxuICAgICAgICAuam9pbihTVFJfRU1QVFkpXG4gICAgICAgIC5zcGxpdChTRVBfVVRJTF9LRVkpXG4gICAgICAgIC5maWx0ZXIoKHA6IHN0cmluZykgPT4gISFwKTtcblxuICAgICAgLy8gRXhhY3QgdXRpbGl0eSBjbGFzc1xuICAgICAgY29uc3QgdXRpbEtleSA9IHBhcnRzLmxlbmd0aCA+PSAxID8gcGFydHMucG9wKCkgOiBudWxsO1xuXG4gICAgICAvLyBFeHRyYWN0IHNlbGVjdG9yXG4gICAgICBjb25zdCBzZWxLZXkgPSBwYXJ0cy5qb2luKFNFUF9VVElMX0tFWSk7XG5cbiAgICAgIC8vIEdldCBzdHlsZSBtYXBcbiAgICAgIGNvbnN0IG1hcGxlID0gTWFwbGUudXRpbENsYXNzTWFwW3V0aWxLZXldO1xuXG4gICAgICAvLyBXaXRob3V0IGEgc3R5bGUgbWFwIHdlIGNhbid0IGNyZWF0ZSBzdHlsZXNcbiAgICAgIGlmICghbWFwbGUpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIENhY2hlIGRlZmF1bHQgc3R5bGVzIHdpdGggc2VsZWN0b3JcbiAgICAgIGlmIChtYXBsZS5fZGVmYXVsdCkge1xuICAgICAgICBPYmplY3Qua2V5cyhtYXBsZS5fZGVmYXVsdCkuZm9yRWFjaCgobWVkaWFJdGVtKSA9PiB7XG4gICAgICAgICAgTWFwbGUuY2FjaGUoXG4gICAgICAgICAgICBtZWRpYUl0ZW0sXG4gICAgICAgICAgICBNYXBsZS5nZXRTZWxlY3RvcnMoXG4gICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgIHNlbEtleSxcbiAgICAgICAgICAgICAgdXRpbEtleSxcbiAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgbWFwbGUuX3NlbGVjdG9yLFxuICAgICAgICAgICAgICBpbXBvcnRhbnQsXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAuLi5tYXBsZS5fY29tbW9uLFxuICAgICAgICAgICAgICAuLi5tYXBsZVttYXBsZS5fZGVmYXVsdFttZWRpYUl0ZW1dXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIENhY2hlIHV0aWxpdHkgc3R5bGVzIHdpdGggc2VsZWN0b3JcbiAgICAgIGlmICh1dGlsVmFsKSB7XG4gICAgICAgIGNvbnN0IGMgPSBjbGFzc0l0ZW0ucmVwbGFjZShJTVBPUlRBTlQsIFNUUl9FTVBUWSk7XG4gICAgICAgIGNvbnN0IHVjbSA9IE1hcGxlLnV0aWxDbGFzc01hcDtcblxuICAgICAgICAvLyNyZWdpb24gV2lsZGNhcmQgc2VsZWN0b3JzXG4gICAgICAgIC8vICo6dXRpbC1rZXlcbiAgICAgICAgLy8gKjp1dGlsLWtleT11dGlsLXZhbFxuICAgICAgICAvLyAqLnNlbGVjdG9yOnV0aWwta2V5PXV0aWwtdmFsXG4gICAgICAgIC8vICo6c2VsZWN0b3Ita2V5OnV0aWwta2V5PXV0aWwtdmFsXG4gICAgICAgIGNvbnN0IHdjTWVkaWEgPSBjLnJlcGxhY2UobWVkaWEsIFdJTERDQVJEKTtcblxuICAgICAgICAvLyBtZWRpYToqXG4gICAgICAgIC8vIG1lZGlhLnNlbGVjdG9yOipcbiAgICAgICAgLy8gbWVkaWE6c2VsZWN0b3Ita2V5OipcbiAgICAgICAgY29uc3Qgd2N1dGlsS2V5ID0gYy5yZXBsYWNlKFJfU0VQX1VUSUxfS0VZLCBgOiR7V0lMRENBUkR9YCk7XG5cbiAgICAgICAgLy8gbWVkaWE6dXRpbC1rZXk9KlxuICAgICAgICAvLyBtZWRpYS5zZWxlY3Rvcjp1dGlsLWtleT0qXG4gICAgICAgIC8vIG1lZGlhOnNlbGVjdG9yLWtleTp1dGlsLWtleT0qXG4gICAgICAgIGNvbnN0IHdjdXRpbFZhbCA9IGMucmVwbGFjZShSX1NFUF9VVElMX1ZBTCwgYD0ke1dJTERDQVJEfWApO1xuXG4gICAgICAgIC8vICo6KlxuICAgICAgICAvLyAqLnNlbGVjdG9yOipcbiAgICAgICAgLy8gKjpzZWxlY3Rvci1rZXk6KlxuICAgICAgICBjb25zdCB3Y01lZGlhS2V5ID0gd2NNZWRpYS5yZXBsYWNlKFJfU0VQX1VUSUxfS0VZLCBgOiR7V0lMRENBUkR9YCk7XG5cbiAgICAgICAgLy8gKjp1dGlsLWtleT0qXG4gICAgICAgIC8vICouc2VsZWN0b3I6dXRpbC1rZXk9KlxuICAgICAgICAvLyAqOnNlbGVjdG9yLWtleTp1dGlsLWtleT0qXG4gICAgICAgIGNvbnN0IHdjTWVkaWFWYWwgPSB3Y3V0aWxWYWwucmVwbGFjZShtZWRpYSwgV0lMRENBUkQpO1xuICAgICAgICAvLyNlbmRyZWdpb25cblxuICAgICAgICBjb25zdCBzZWxlY3RvciA9IE1hcGxlLmdldFNlbGVjdG9ycyhcbiAgICAgICAgICBtZWRpYSxcbiAgICAgICAgICBzZWxLZXksXG4gICAgICAgICAgdXRpbEtleSxcbiAgICAgICAgICB1dGlsVmFsLFxuICAgICAgICAgIG1hcGxlLl9zZWxlY3RvcixcbiAgICAgICAgICBpbXBvcnRhbnQsXG4gICAgICAgICk7XG5cbiAgICAgICAgTWFwbGUuY2FjaGUobWVkaWEsIHNlbGVjdG9yLCB7XG4gICAgICAgICAgLi4ubWFwbGUuX2NvbW1vbixcbiAgICAgICAgICAuLi5tYXBsZVt1dGlsVmFsXSxcbiAgICAgICAgICAuLi5KU09OLnBhcnNlKFxuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoXG4gICAgICAgICAgICAgIG1hcGxlW3V0aWxWYWwucmVwbGFjZShSX0NVU1RPTSwgV0lMRENBUkQpXSB8fCB7fSxcbiAgICAgICAgICAgICkucmVwbGFjZShcbiAgICAgICAgICAgICAgUl9XSUxEQ0FSRCxcbiAgICAgICAgICAgICAgdXRpbEtleSA9PT0gJ2NvbnRlbnQnXG4gICAgICAgICAgICAgICAgPyB1dGlsVmFsLnJlcGxhY2UoUl9DVVNUT00sICckMScpXG4gICAgICAgICAgICAgICAgOiB1dGlsVmFsLnJlcGxhY2UoUl9DVVNUT00sICckMScpLnJlcGxhY2UoUl9TRVBfVkFMX1NQQUNFLCAnICcpLFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICApLFxuICAgICAgICAgIC4uLih1Y21bd2NNZWRpYUtleV0gfHwge30pLFxuICAgICAgICAgIC4uLih1Y21bd2N1dGlsS2V5XSB8fCB7fSksXG4gICAgICAgICAgLi4uKHVjbVt3Y01lZGlhVmFsXSB8fCB7fSksXG4gICAgICAgICAgLi4uKHVjbVt3Y3V0aWxWYWxdIHx8IHt9KSxcbiAgICAgICAgICAuLi4odWNtW3djTWVkaWFdIHx8IHt9KSxcbiAgICAgICAgICAuLi4odWNtW2NdIHx8IHt9KSxcbiAgICAgICAgICBbSU1QT1JUQU5UXTogaW1wb3J0YW50LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyNyZWdpb24gR2VuZXJhdGUgc3R5bGVzXG4gICAgLy8gR2VuZXJhdGUgbWluIG1lZGlhIHF1ZXJ5IHN0eWxlc1xuICAgIGNvbnN0IG1pbk1lZGlhU3R5bGVzID0gTWFwbGUuc3R5bGVzKEJSRUFLUE9JTlQubWluTWVkaWEpO1xuICAgIGlmIChtaW5NZWRpYVN0eWxlcykge1xuICAgICAgTWFwbGUuYXBwZW5kU3R5bGUoXG4gICAgICAgIFNUWUxFX0VMRU1FTlRTLFxuICAgICAgICBCUkVBS1BPSU5ULm1pbk1lZGlhLFxuICAgICAgICBtaW5NZWRpYVN0eWxlcyxcbiAgICAgICAgZmFsc2UsXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIEdlbmVyYXRlIG1lZGlhIHF1ZXJ5IHN0eWxlc1xuICAgIGNvbnN0IG1lZGlhUXVlcnlTdHlsZXMgPSB7fTtcbiAgICBPYmplY3Qua2V5cyhNYXBsZS50ZW1wQ2FjaGUpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgaWYgKGtleSAhPT0gQlJFQUtQT0lOVC5taW5NZWRpYSkge1xuICAgICAgICBtZWRpYVF1ZXJ5U3R5bGVzW2tleV0gPSBtZWRpYVF1ZXJ5U3R5bGVzW2tleV0gfHwgJyc7XG4gICAgICAgIG1lZGlhUXVlcnlTdHlsZXNba2V5XSArPSBNYXBsZS5zdHlsZXMoa2V5KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBPYmplY3Qua2V5cyhtZWRpYVF1ZXJ5U3R5bGVzKS5mb3JFYWNoKChrZXkpID0+XG4gICAgICBNYXBsZS5hcHBlbmRTdHlsZShTVFlMRV9FTEVNRU5UUywga2V5LCBtZWRpYVF1ZXJ5U3R5bGVzW2tleV0sIGZhbHNlKSxcbiAgICApO1xuICAgIC8vI2VuZHJlZ2lvblxuICB9XG5cbiAgcHVibGljIHN0YXRpYyB1bmlmeVV0aWxpdHlDbGFzcyhjbGFzc0xpc3Q6IEFycmF5PHN0cmluZz4pOiBBcnJheTxzdHJpbmc+IHtcbiAgICByZXR1cm4gY2xhc3NMaXN0LnJlZHVjZSgoYWNjLCBjbGFzc0l0ZW0pID0+IHtcbiAgICAgIGNvbnN0IGV4aXN0aW5nU3R5bGVJbmRleCA9IGFjYy5maW5kSW5kZXgoXG4gICAgICAgIChwKSA9PlxuICAgICAgICAgICgocCB8fCAnJykuc3BsaXQoUl9VTklGSVkpIHx8IFtdKVswXSA9PT1cbiAgICAgICAgICAoKGNsYXNzSXRlbSB8fCAnJykuc3BsaXQoUl9VTklGSVkpIHx8IFtdKVswXSxcbiAgICAgICk7XG4gICAgICBpZiAoZXhpc3RpbmdTdHlsZUluZGV4IDwgMCkge1xuICAgICAgICBhY2MucHVzaChjbGFzc0l0ZW0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWNjW2V4aXN0aW5nU3R5bGVJbmRleF0gPSBjbGFzc0l0ZW07XG4gICAgICB9XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0sIFtdKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgYXBwZW5kU3R5bGUoXG4gICAgc3R5bGVFbGVtZW50czogYW55LFxuICAgIGJwOiBzdHJpbmcsXG4gICAgc3R5bGU6IHN0cmluZyxcbiAgICBzaWxlbnQ6IGJvb2xlYW4gPSB0cnVlLFxuICApOiB2b2lkIHtcbiAgICBzdHlsZUVsZW1lbnRzW2JwXS5hcHBlbmRDaGlsZChkb2MuY3JlYXRlVGV4dE5vZGUoc3R5bGUpKTtcblxuICAgIGlmICghc2lsZW50KSB7XG4gICAgICBNYXBsZS5vblN0eWxlQXBwZW5kJC5uZXh0KHsgYnAsIHN0eWxlIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaXNNZWRpYVZhbGlkKG1lZGlhOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbWVkaWEgaW4gQlJFQUtQT0lOVC5tZWRpYTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaXNCcmVha3BvaW50VmFsaWQoYnJlYWtwb2ludDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGJyZWFrcG9pbnQgaW4gTWFwbGUuYnJlYWtwb2ludE1hcDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaXNNZWRpYU1hdGNoZXNXaXRoQnJlYWtwb2ludChcbiAgICBtZWRpYTogc3RyaW5nLFxuICAgIGJyZWFrcG9pbnQ6IHN0cmluZyxcbiAgKTogYm9vbGVhbiB7XG4gICAgaWYgKCFNYXBsZS5pc0JyZWFrcG9pbnRWYWxpZChicmVha3BvaW50KSB8fCAhTWFwbGUuaXNNZWRpYVZhbGlkKG1lZGlhKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IG1lZGlhU2l6ZSA9IEJSRUFLUE9JTlQubWVkaWFbbWVkaWFdO1xuICAgIGNvbnN0IGJyZWFrcG9pbnRTaXplID0gcGFyc2VGbG9hdChNYXBsZS5icmVha3BvaW50TWFwW2JyZWFrcG9pbnRdKTtcblxuICAgIGlmIChtZWRpYS5pbmNsdWRlcyhTVUZGSVhfTUVESUFfRE9XTikpIHtcbiAgICAgIHJldHVybiBicmVha3BvaW50U2l6ZSA8PSBtZWRpYVNpemU7XG4gICAgfVxuXG4gICAgaWYgKG1lZGlhLmluY2x1ZGVzKFNVRkZJWF9NRURJQV9VUCkpIHtcbiAgICAgIHJldHVybiBicmVha3BvaW50U2l6ZSA+PSBtZWRpYVNpemU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRWYWxpZE1lZGlhTWFwKCk6IGFueSB7XG4gICAgcmV0dXJuIHsgLi4uQlJFQUtQT0lOVC5tZWRpYSB9O1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRNaW5NZWRpYSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBCUkVBS1BPSU5ULm1pbk1lZGlhO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRNaW5CcmVha3BvaW50KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIEJSRUFLUE9JTlQubWluS2V5O1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRNYXBwZWRNZWRpYU9yTWluKG1lZGlhOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBNYXBsZS5pc01lZGlhVmFsaWQobWVkaWEpID8gbWVkaWEgOiBNYXBsZS5nZXRNaW5NZWRpYSgpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRNYXBwZWRNZWRpYU9yTnVsbChtZWRpYTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gTWFwbGUuaXNNZWRpYVZhbGlkKG1lZGlhKSA/IG1lZGlhIDogbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TWFwcGVkQnJlYWtwb2ludE9yTWluKGJyZWFrcG9pbnQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIE1hcGxlLmlzQnJlYWtwb2ludFZhbGlkKGJyZWFrcG9pbnQpXG4gICAgICA/IGJyZWFrcG9pbnRcbiAgICAgIDogTWFwbGUuZ2V0TWluQnJlYWtwb2ludCgpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRNYXBwZWRCcmVha3BvaW50T3JOdWxsKGJyZWFrcG9pbnQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIE1hcGxlLmlzQnJlYWtwb2ludFZhbGlkKGJyZWFrcG9pbnQpID8gYnJlYWtwb2ludCA6IG51bGw7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldFZhcmlhYmxlcygpOiBNYXBsZVZhcmlhYmxlTW9kZWwge1xuICAgIHJldHVybiB7IC4uLk1hcGxlLnZhcmlhYmxlcyB9O1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBmaWxsSW5UaGVHYXBzKGJyZWFrcG9pbnRNYXA6IGFueSk6IGFueSB7XG4gICAgY29uc3QgZnVsbEJyZWFrcG9pbnRNYXAgPSBNYXBsZS5nZXRWYXJpYWJsZXMoKS5icmVha3BvaW50O1xuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhmdWxsQnJlYWtwb2ludE1hcCk7XG4gICAgY29uc3QgbWluS2V5ID0ga2V5cy5maW5kKChrZXkpID0+IGtleSBpbiBicmVha3BvaW50TWFwKTtcbiAgICByZXR1cm4ga2V5c1xuICAgICAgLnNvcnQoKGEsIGIpID0+IGZ1bGxCcmVha3BvaW50TWFwW2FdIC0gZnVsbEJyZWFrcG9pbnRNYXBbYl0pXG4gICAgICAucmVkdWNlKChhY2MsIGtleSwgaSkgPT4ge1xuICAgICAgICBjb25zdCBuZXh0S2V5ID0ga2V5c1tpICsgMV07XG4gICAgICAgIGlmIChrZXkgaW4gYWNjID09PSBmYWxzZSkge1xuICAgICAgICAgIGFjYyA9IHtcbiAgICAgICAgICAgIC4uLmFjYyxcbiAgICAgICAgICAgIFtrZXldOlxuICAgICAgICAgICAgICBrZXkgaW4gYnJlYWtwb2ludE1hcCA/IGJyZWFrcG9pbnRNYXBba2V5XSA6IGJyZWFrcG9pbnRNYXBbbWluS2V5XSxcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXh0S2V5ICYmICFicmVha3BvaW50TWFwW25leHRLZXldKSB7XG4gICAgICAgICAgYWNjID0ge1xuICAgICAgICAgICAgLi4uYWNjLFxuICAgICAgICAgICAgW25leHRLZXldOiBhY2Nba2V5XSxcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgICB9LCB7fSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGlzQnJlYWtwb2ludE1hcChicmVha3BvaW50TWFwOiBhbnkpOiBhbnkge1xuICAgIGlmICh0eXBlb2YgYnJlYWtwb2ludE1hcCA9PT0gJ29iamVjdCcgJiYgYnJlYWtwb2ludE1hcCAhPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKE1hcGxlLmdldFZhcmlhYmxlcygpLmJyZWFrcG9pbnQpLnNvbWUoXG4gICAgICAgIChrZXkpID0+IGJyZWFrcG9pbnRNYXAgJiYga2V5IGluIGJyZWFrcG9pbnRNYXAsXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiJdfQ==