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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXBsZS8iLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdkMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFcEUsT0FBTyxFQUNMLHVCQUF1QixFQUN2QiwwQkFBMEIsR0FDM0IsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDcEQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRTlELCtFQUErRTtBQUMvRSxNQUFNLFVBQVUsR0FBUTtJQUN0QixLQUFLLEVBQUUsRUFBRTtDQUNWLENBQUM7QUFDRixNQUFNLGNBQWMsR0FBRyxFQUFFLENBQUM7QUFFMUIsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDO0FBQ3JCLE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQztBQUN0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Q0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FDdEQsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLGFBQWEsSUFBSSxHQUFHLElBQUksYUFBYSxDQUMvQyxDQUFDO1NBQ0g7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7O0FBdnNCYyxXQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ1gsZUFBUyxHQUF1QjtJQUM3QyxVQUFVLEVBQUUsb0JBQW9CO0lBQ2hDLEtBQUssRUFBRSxlQUFlO0lBQ3RCLFVBQVUsRUFBRSxxQkFBcUI7SUFDakMsUUFBUSxFQUFFLG1CQUFtQjtJQUM3QixVQUFVLEVBQUUscUJBQXFCO0lBQ2pDLFFBQVEsRUFBRSxtQkFBbUI7SUFDN0IsTUFBTSxFQUFFLGdCQUFnQjtJQUN4QixVQUFVLEVBQUUsb0JBQW9CO0lBQ2hDLE1BQU0sRUFBRSxnQkFBZ0I7SUFDeEIsS0FBSyxFQUFFLGVBQWU7Q0FDdkIsQ0FBQztBQUNhLG1CQUFhLEdBQVEsRUFBRSxDQUFDO0FBQ3hCLGtCQUFZLEdBQVEsRUFBRSxDQUFDO0FBQ3ZCLG9CQUFjLEdBQWUsRUFBRSxDQUFDO0FBQ2hDLHNCQUFnQixHQUFRLEVBQUUsQ0FBQztBQUMzQixjQUFRLEdBQVEsRUFBRSxDQUFDO0FBQ25CLGVBQVMsR0FBUSxFQUFFLENBQUM7QUFDckIsb0JBQWMsR0FBeUIsSUFBSSxlQUFlLENBQ3RFLElBQUksQ0FDTCxDQUFDO0FBQ1ksYUFBTyxHQUE2QixJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTWFwbGVDb2xvckhlbHBlciB9IGZyb20gJy4vaGVscGVycy9jb2xvci5oZWxwZXInO1xuaW1wb3J0IHsgTUFQTEVfUFJPUF9FWFRFTlNJT05fTUFQIH0gZnJvbSAnLi9wcm9wZXJ0eS1leHRlbnNpb24tbWFwJztcbmltcG9ydCB7IE1hcGxlVmFyaWFibGVNb2RlbCB9IGZyb20gJy4vdHlwZXMvdmFyaWFibGVzLm1vZGVsJztcbmltcG9ydCB7XG4gIGdldE1hcGxlVXRpbGl0eUNsYXNzTWFwLFxuICBnZXRNYXBsZVV0aWxpdHlWYXJpYWJsZU1hcCxcbn0gZnJvbSAnLi91dGlsaXR5LWNsYXNzLW1hcCc7XG5pbXBvcnQgeyBNQVBMRV9WQVJfQUxFUlQgfSBmcm9tICcuL3ZhcmlhYmxlcy9hbGVydCc7XG5pbXBvcnQgeyBNQVBMRV9WQVJfQlJFQUtQT0lOVCB9IGZyb20gJy4vdmFyaWFibGVzL2JyZWFrcG9pbnQnO1xuaW1wb3J0IHsgTUFQTEVfVkFSX0JVVFRPTiB9IGZyb20gJy4vdmFyaWFibGVzL2J1dHRvbic7XG5pbXBvcnQgeyBNQVBMRV9WQVJfQ09MT1IgfSBmcm9tICcuL3ZhcmlhYmxlcy9jb2xvcic7XG5pbXBvcnQgeyBNQVBMRV9WQVJfRk9OVF9GQU1JTFkgfSBmcm9tICcuL3ZhcmlhYmxlcy9mb250LWZhbWlseSc7XG5pbXBvcnQgeyBNQVBMRV9WQVJfRk9OVF9TSVpFIH0gZnJvbSAnLi92YXJpYWJsZXMvZm9udC1zaXplJztcbmltcG9ydCB7IE1BUExFX1ZBUl9GT05UX1dFSUdIVCB9IGZyb20gJy4vdmFyaWFibGVzL2ZvbnQtd2VpZ2h0JztcbmltcG9ydCB7IE1BUExFX1ZBUl9NQVhfV0lEVEggfSBmcm9tICcuL3ZhcmlhYmxlcy9tYXgtd2lkdGgnO1xuaW1wb3J0IHsgTUFQTEVfVkFSX1NQQUNFUiB9IGZyb20gJy4vdmFyaWFibGVzL3NwYWNlcic7XG5pbXBvcnQgeyBNQVBMRV9WQVJfVFJBTlNJVElPTiB9IGZyb20gJy4vdmFyaWFibGVzL3RyYW5zaXRpb24nO1xuXG4vLyBEZWZpbmUgYSBnbG9iYWwgTWFwbGUuQ0FDSEUgdG8gY29sbGVjdCBzZWxlY3RvcnMgYW5kIG1hcHMgb24gYnJlYWtwb2ludCBrZXlzXG5jb25zdCBCUkVBS1BPSU5UOiBhbnkgPSB7XG4gIG1lZGlhOiB7fSxcbn07XG5jb25zdCBTVFlMRV9FTEVNRU5UUyA9IHt9O1xuXG5jb25zdCBTVFJfRU1QVFkgPSAnJztcbmNvbnN0IFNUUl9TUEFDRSA9ICcgJztcbmNvbnN0IFNUUl9ET1QgPSAnLic7XG5jb25zdCBTVFJfVVAgPSAndXAnO1xuY29uc3QgU1RSX0RPV04gPSAnZG93bic7XG5jb25zdCBTRVBfTUVESUEgPSAnLSc7XG5jb25zdCBTRVBfU0VMRUNUT1IgPSAnOic7XG5jb25zdCBTRVBfVVRJTF9LRVkgPSAnOic7XG5jb25zdCBTRVBfVVRJTF9WQUwgPSAnPSc7XG5jb25zdCBTRVBfTk9fU1BBQ0UgPSAnPCc7XG5jb25zdCBTRVBfT1VURVJfU1BBQ0UgPSAnPDwnO1xuY29uc3QgSU1QT1JUQU5UID0gJyEnO1xuY29uc3QgV0lMRENBUkQgPSAnKic7XG5cbmNvbnN0IFBSRUZJWF9NQVBMRV9QUk9QID0gJ18nO1xuY29uc3QgU1VGRklYX01FRElBX1VQID0gU0VQX01FRElBICsgU1RSX1VQO1xuY29uc3QgU1VGRklYX01FRElBX0RPV04gPSBTRVBfTUVESUEgKyBTVFJfRE9XTjtcblxuY29uc3QgUl9TRUxFQ1RPUl9SRVNFUlZFRCA9XG4gIC8oXFwufFxcK3xcXH58XFw8fFxcPnxcXFt8XFxdfFxcKHxcXCl8XFwhfFxcOnxcXCx8XFw9fFxcfHxcXCV8XFwjfFxcKnxcXFwifFxcLykvZztcbmNvbnN0IFJfRVNDQVBFX1JFU0VSVkVEID0gJ1xcXFwkMSc7XG5jb25zdCBSX1NFUF9OT19TUEFDRSA9IC9cXDwvZztcbmNvbnN0IFJfU0VQX1NFTF9TUEFDRSA9IC9cXD5cXD4vZztcbmNvbnN0IFJfU0VQX1NFTF9TUEFDRV9BTEwgPSAvKFxcPHxcXD5cXD4pL2c7XG5jb25zdCBSX1NFUF9WQUxfU1BBQ0UgPSAvXFx8L2c7XG5jb25zdCBSX1NFUF9VVElMX1ZBTCA9IC89KD86Lig/IT0pKSskLztcbmNvbnN0IFJfU0VQX1VUSUxfS0VZID0gL1xcOig/Oi4oPyFcXDopKSskLztcbmNvbnN0IFJfQ1VTVE9NID0gL1xcKCguKj8pXFwpLztcbmNvbnN0IFJfV0lMRENBUkQgPSAvXFwqL2c7XG5jb25zdCBSX0VYVFJBQ1RfQ0xBU1MgPSAvY2xhc3NcXD1cXFwiKFtcXHNcXFNdKz8pXFxcIi9nO1xuY29uc3QgUl9VTklGSVkgPSAvXFw9KD89W14uXSokKS87XG5cbmxldCBwcmVJbml0Q2xhc3NMaXN0ID0gW107XG5sZXQgaXNNYXBsZUVuYWJsZWQgPSB0cnVlO1xubGV0IGRvYztcblxuY29uc3QgZXNjID0gKHNlbGVjdG9yOiBzdHJpbmcpID0+XG4gIHNlbGVjdG9yLnJlcGxhY2UoUl9TRUxFQ1RPUl9SRVNFUlZFRCwgUl9FU0NBUEVfUkVTRVJWRUQpO1xuXG5leHBvcnQgY2xhc3MgTWFwbGUge1xuICBwcml2YXRlIHN0YXRpYyBDQUNIRSA9IHt9O1xuICBwcml2YXRlIHN0YXRpYyB2YXJpYWJsZXM6IE1hcGxlVmFyaWFibGVNb2RlbCA9IHtcbiAgICBicmVha3BvaW50OiBNQVBMRV9WQVJfQlJFQUtQT0lOVCxcbiAgICBjb2xvcjogTUFQTEVfVkFSX0NPTE9SLFxuICAgIGZvbnRGYW1pbHk6IE1BUExFX1ZBUl9GT05UX0ZBTUlMWSxcbiAgICBmb250U2l6ZTogTUFQTEVfVkFSX0ZPTlRfU0laRSxcbiAgICBmb250V2VpZ2h0OiBNQVBMRV9WQVJfRk9OVF9XRUlHSFQsXG4gICAgbWF4V2lkdGg6IE1BUExFX1ZBUl9NQVhfV0lEVEgsXG4gICAgc3BhY2VyOiBNQVBMRV9WQVJfU1BBQ0VSLFxuICAgIHRyYW5zaXRpb246IE1BUExFX1ZBUl9UUkFOU0lUSU9OLFxuICAgIGJ1dHRvbjogTUFQTEVfVkFSX0JVVFRPTixcbiAgICBhbGVydDogTUFQTEVfVkFSX0FMRVJULFxuICB9O1xuICBwcml2YXRlIHN0YXRpYyBicmVha3BvaW50TWFwOiBhbnkgPSB7fTtcbiAgcHJpdmF0ZSBzdGF0aWMgdXRpbENsYXNzTWFwOiBhbnkgPSB7fTtcbiAgcHJpdmF0ZSBzdGF0aWMgdXRpbFByZWZpeExpc3Q6IEFycmF5PGFueT4gPSBbXTtcbiAgcHJpdmF0ZSBzdGF0aWMgcHJvcEV4dGVuc2lvbk1hcDogYW55ID0ge307XG4gIHByaXZhdGUgc3RhdGljIHJhd0NhY2hlOiBhbnkgPSB7fTtcbiAgcHJpdmF0ZSBzdGF0aWMgdGVtcENhY2hlOiBhbnkgPSB7fTtcbiAgcHVibGljIHN0YXRpYyBvblN0eWxlQXBwZW5kJDogQmVoYXZpb3JTdWJqZWN0PGFueT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFxuICAgIG51bGwsXG4gICk7XG4gIHB1YmxpYyBzdGF0aWMgb25Jbml0JDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICAvLyBGaW5kIG1pbiBhbmQgbWF4IGJyZWFrcG9pbnRzXG4gIHByaXZhdGUgc3RhdGljIHNldE1pbkFuZE1heEJyZWFrcG9pbnRzKCk6IHZvaWQge1xuICAgIGNvbnN0IGJyZWFrcG9pbnRLZXlzOiBBcnJheTxzdHJpbmc+ID0gT2JqZWN0LmtleXMoTWFwbGUuYnJlYWtwb2ludE1hcCk7XG4gICAgY29uc3QgYnJlYWtwb2ludHMgPSBicmVha3BvaW50S2V5c1xuICAgICAgLm1hcCgoa2V5KSA9PiAoe1xuICAgICAgICBrZXksXG4gICAgICAgIHNpemU6IHBhcnNlRmxvYXQoTWFwbGUuYnJlYWtwb2ludE1hcFtrZXldKSxcbiAgICAgIH0pKVxuICAgICAgLnNvcnQoKGEsIGIpID0+IGEuc2l6ZSAtIGIuc2l6ZSk7XG5cbiAgICBCUkVBS1BPSU5ULm1pbktleSA9IGJyZWFrcG9pbnRzWzBdLmtleTtcbiAgICBCUkVBS1BPSU5ULm1heEtleSA9IGJyZWFrcG9pbnRzW2JyZWFrcG9pbnRzLmxlbmd0aCAtIDFdLmtleTtcbiAgICBCUkVBS1BPSU5ULm1pbk1lZGlhID0gQlJFQUtQT0lOVC5taW5LZXkgKyBTVUZGSVhfTUVESUFfVVA7XG5cbiAgICBicmVha3BvaW50cy5mb3JFYWNoKChicDogYW55LCBpOiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IG5leHQgPSBicmVha3BvaW50c1tpICsgMV07XG4gICAgICBCUkVBS1BPSU5ULm1lZGlhW2JwLmtleSArIFNVRkZJWF9NRURJQV9VUF0gPSBicC5zaXplO1xuICAgICAgaWYgKG5leHQpIHtcbiAgICAgICAgLy8gVXNlcyAwLjAycHggcmF0aGVyIHRoYW4gMC4wMXB4IHRvIHdvcmsgYXJvdW5kIGEgY3VycmVudCByb3VuZGluZyBidWcgaW4gU2FmYXJpLlxuICAgICAgICAvLyBTZWUgaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTE3ODI2MVxuICAgICAgICBCUkVBS1BPSU5ULm1lZGlhW2JwLmtleSArIFNVRkZJWF9NRURJQV9ET1dOXSA9IG5leHQuc2l6ZSAtIDAuMDI7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZURvbUVsZW1lbnRzKFxuICAgIHN0eWxlRWxlbWVudHM6IGFueSxcbiAgICBwcmVmaXg6IHN0cmluZyA9ICdtYXBsZScsXG4gICAgZG9jdW1lbnQ/OiBhbnksXG4gICk6IHZvaWQge1xuICAgIC8vIFByZXBhcmUgc3R5bGUgZWxlbWVudCBvbiBoZWFkXG4gICAgY29uc3QgZG9jSGVhZCA9IChkb2N1bWVudCB8fCBkb2MpLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gICAgY29uc3QgYnJlYWtwb2ludHMgPSBPYmplY3Qua2V5cyhCUkVBS1BPSU5ULm1lZGlhKS5zb3J0KFxuICAgICAgKGEsIGIpID0+IEJSRUFLUE9JTlQubWVkaWFbYV0gLSBCUkVBS1BPSU5ULm1lZGlhW2JdLFxuICAgICk7XG4gICAgY29uc3QgYnJlYWtwb2ludHNVcCA9IGJyZWFrcG9pbnRzLmZpbHRlcigoa2V5KSA9PlxuICAgICAga2V5LmluY2x1ZGVzKFNVRkZJWF9NRURJQV9VUCksXG4gICAgKTtcbiAgICBjb25zdCBicmVha3BvaW50c0Rvd24gPSBicmVha3BvaW50cy5maWx0ZXIoKGtleSkgPT5cbiAgICAgIGtleS5pbmNsdWRlcyhTVUZGSVhfTUVESUFfRE9XTiksXG4gICAgKTtcblxuICAgIGJyZWFrcG9pbnRzVXAuY29uY2F0KGJyZWFrcG9pbnRzRG93bi5yZXZlcnNlKCkpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgY29uc3Qgc3R5bGVJZCA9IGAke3ByZWZpeH0tJHtrZXl9YDtcbiAgICAgIGNvbnN0IGVsID0gZG9jLmdldEVsZW1lbnRCeUlkKHN0eWxlSWQpO1xuICAgICAgaWYgKCEhZWwpIHtcbiAgICAgICAgZG9jSGVhZC5yZW1vdmVDaGlsZChlbCk7XG4gICAgICB9XG4gICAgICBzdHlsZUVsZW1lbnRzW2tleV0gPSAoZG9jIGFzIERvY3VtZW50KS5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgKHN0eWxlRWxlbWVudHNba2V5XSBhcyBIVE1MRWxlbWVudCkuc2V0QXR0cmlidXRlKCdpZCcsIHN0eWxlSWQpO1xuICAgICAgZG9jSGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnRzW2tleV0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgZXh0ZW5kUHJvcGVydGllcygpOiB2b2lkIHtcbiAgICBNYXBsZS51dGlsUHJlZml4TGlzdC5mb3JFYWNoKChkZWY6IGFueSkgPT4ge1xuICAgICAgTWFwbGUudXRpbENsYXNzTWFwW2RlZi5wcmVmaXhdID0gTWFwbGUudXRpbENsYXNzTWFwW2RlZi5wcmVmaXhdIHx8IHt9O1xuICAgICAgTWFwbGUudXRpbENsYXNzTWFwW2RlZi5wcmVmaXhdW1dJTERDQVJEXSA9IHt9O1xuICAgICAgT2JqZWN0LmtleXMoZGVmLm1hcCkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIE1hcGxlLnV0aWxDbGFzc01hcFtkZWYucHJlZml4XVtrZXldID0ge307XG4gICAgICAgIGRlZi5wcm9wcy5mb3JFYWNoKChwcm9wKSA9PiB7XG4gICAgICAgICAgTWFwbGUudXRpbENsYXNzTWFwW2RlZi5wcmVmaXhdW1dJTERDQVJEXSA9IHtcbiAgICAgICAgICAgIC4uLk1hcGxlLnV0aWxDbGFzc01hcFtkZWYucHJlZml4XVtXSUxEQ0FSRF0sXG4gICAgICAgICAgICBbcHJvcF06IFdJTERDQVJELFxuICAgICAgICAgIH07XG4gICAgICAgICAgTWFwbGUudXRpbENsYXNzTWFwW2RlZi5wcmVmaXhdW2tleV1bcHJvcF0gPSBkZWYubWFwW2tleV07XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBnZXRTZWxlY3RvcnMoXG4gICAgbWVkaWE6IHN0cmluZyA9IFNUUl9FTVBUWSxcbiAgICBzZWxLZXk6IHN0cmluZyA9IFNUUl9FTVBUWSxcbiAgICB1dGlsS2V5OiBzdHJpbmcgPSBTVFJfRU1QVFksXG4gICAgdXRpbFZhbDogc3RyaW5nID0gU1RSX0VNUFRZLFxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogdmFyaWFibGUtbmFtZVxuICAgIF9zZWxlY3Rvcjogc3RyaW5nID0gU1RSX0VNUFRZLFxuICAgIGltcG9ydGFudDogYm9vbGVhbiA9IGZhbHNlLFxuICApOiBzdHJpbmcge1xuICAgIGNvbnN0IG1hcGxlID0gTWFwbGUudXRpbENsYXNzTWFwW3NlbEtleV0gfHwge307XG4gICAgY29uc3QgcGFyZW50U2VsZWN0b3IgPSBzZWxLZXkuaW5jbHVkZXMoU0VQX09VVEVSX1NQQUNFKVxuICAgICAgPyBzZWxLZXkuc3BsaXQoU0VQX09VVEVSX1NQQUNFKS5wb3AoKS5zcGxpdChSX1NFUF9TRUxfU1BBQ0VfQUxMKS5zaGlmdCgpXG4gICAgICA6IFNUUl9FTVBUWTtcblxuICAgIGNvbnN0IGJhc2VTZWwgPSBbXG4gICAgICBtZWRpYSB8fCBTVFJfRU1QVFksXG4gICAgICBtYXBsZS5fc2VsZWN0b3IgPyBTRVBfU0VMRUNUT1IgOiBTVFJfRU1QVFksXG4gICAgICBzZWxLZXksXG4gICAgICB1dGlsS2V5ID8gU0VQX1VUSUxfS0VZIDogU1RSX0VNUFRZLFxuICAgICAgdXRpbEtleSxcbiAgICAgIHV0aWxWYWwgPyBTRVBfVVRJTF9WQUwgOiBTVFJfRU1QVFksXG4gICAgXS5qb2luKFNUUl9FTVBUWSk7XG5cbiAgICByZXR1cm4gKChtYXBsZS5fc2VsZWN0b3IgfHwgc2VsS2V5IHx8ICcnKSArIF9zZWxlY3RvcilcbiAgICAgIC5zcGxpdCgvLFxccyovKVxuICAgICAgLm1hcCgoc2VsZWN0b3IpID0+XG4gICAgICAgIFtcbiAgICAgICAgICBwYXJlbnRTZWxlY3RvciA/IHBhcmVudFNlbGVjdG9yICsgU1RSX1NQQUNFIDogU1RSX0VNUFRZLFxuICAgICAgICAgIHV0aWxWYWwgPyBTVFJfRE9UIDogU1RSX0VNUFRZLFxuICAgICAgICAgIHV0aWxWYWwgPyBlc2MoYmFzZVNlbCArIHV0aWxWYWwpIDogYFtjbGFzcyo9XCIke2Jhc2VTZWx9XCJdYCxcbiAgICAgICAgICB1dGlsVmFsICYmIGltcG9ydGFudCA/IGVzYyhJTVBPUlRBTlQpIDogU1RSX0VNUFRZLFxuICAgICAgICAgIG1hcGxlLl9zZWxlY3RvciB8fCAhc2VsS2V5IHx8IHNlbEtleS5jaGFyQXQoMCkgPT09IFNFUF9OT19TUEFDRVxuICAgICAgICAgICAgPyBTVFJfRU1QVFlcbiAgICAgICAgICAgIDogU1RSX1NQQUNFLFxuICAgICAgICAgIHNlbGVjdG9yLnRyaW0oKS5jaGFyQXQoMCkgPT09IFNFUF9OT19TUEFDRSA/IFNUUl9FTVBUWSA6IFNUUl9TUEFDRSxcbiAgICAgICAgICBzZWxlY3RvclxuICAgICAgICAgICAgLnRyaW0oKVxuICAgICAgICAgICAgLnJlcGxhY2UoU0VQX09VVEVSX1NQQUNFICsgcGFyZW50U2VsZWN0b3IsIFNUUl9FTVBUWSlcbiAgICAgICAgICAgIC5yZXBsYWNlKFJfU0VQX1NFTF9TUEFDRSwgU1RSX1NQQUNFKVxuICAgICAgICAgICAgLnJlcGxhY2UoUl9TRVBfTk9fU1BBQ0UsIFNUUl9FTVBUWSksXG4gICAgICAgIF0uam9pbihTVFJfRU1QVFkpLFxuICAgICAgKVxuICAgICAgLmpvaW4oJywnKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGNhY2hlKFxuICAgIG1lZGlhOiBzdHJpbmcsXG4gICAgc2VsZWN0b3I6IHN0cmluZyxcbiAgICBtYXBUb0JlQ2FjaGVkOiBhbnksXG4gICk6IHZvaWQge1xuICAgIGlmICghbWFwVG9CZUNhY2hlZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBQcm9wZXJ0eSBtYXAgbm90IGZvdW5kIGZvciBzZWxlY3RvcjogJHtzZWxlY3Rvcn1gKTtcbiAgICB9XG5cbiAgICBjb25zdCBjYWNoZUtleSA9IGAke21lZGlhfSR7c2VsZWN0b3J9JHtKU09OLnN0cmluZ2lmeShtYXBUb0JlQ2FjaGVkKX1gO1xuICAgIGlmICghTWFwbGUuQ0FDSEVbY2FjaGVLZXldKSB7XG4gICAgICBNYXBsZS50ZW1wQ2FjaGVbbWVkaWFdID0gTWFwbGUudGVtcENhY2hlW21lZGlhXSB8fCB7fTtcbiAgICAgIE1hcGxlLnRlbXBDYWNoZVttZWRpYV0gPSB7XG4gICAgICAgIC4uLk1hcGxlLnRlbXBDYWNoZVttZWRpYV0sXG4gICAgICAgIFtzZWxlY3Rvcl06IHtcbiAgICAgICAgICAuLi4oTWFwbGUudGVtcENhY2hlW21lZGlhXVtzZWxlY3Rvcl0gfHwge30pLFxuICAgICAgICAgIC4uLm1hcFRvQmVDYWNoZWQsXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgICAgTWFwbGUuQ0FDSEVbY2FjaGVLZXldID0gMTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBzdHlsZXMobWVkaWE6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3QgY2FjaGVJdGVtID0gTWFwbGUudGVtcENhY2hlW21lZGlhXTtcbiAgICBpZiAoIWNhY2hlSXRlbSkge1xuICAgICAgcmV0dXJuIFNUUl9FTVBUWTtcbiAgICB9XG5cbiAgICBjb25zdCBzZWxlY3RvcnMgPSBPYmplY3Qua2V5cyhjYWNoZUl0ZW0pO1xuXG4gICAgaWYgKHNlbGVjdG9ycy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBTVFJfRU1QVFk7XG4gICAgfVxuXG4gICAgY29uc3QgYnJlYWtwb2ludFBhcnRzID0gbWVkaWEuc3BsaXQoU0VQX01FRElBKTtcbiAgICBjb25zdCBicmVha3BvaW50RGlyID0gYnJlYWtwb2ludFBhcnRzWzFdO1xuICAgIGNvbnN0IG1lZGlhUXVlcnkgPSBicmVha3BvaW50RGlyID09PSBTVFJfVVAgPyAnbWluLXdpZHRoJyA6ICdtYXgtd2lkdGgnO1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuXG4gICAgLy8gb3BlbiBtZWRpYSBxdWVyeVxuICAgIGlmIChtZWRpYSAhPT0gQlJFQUtQT0lOVC5taW5NZWRpYSkge1xuICAgICAgcmVzdWx0LnB1c2goYEBtZWRpYSAoJHttZWRpYVF1ZXJ5fTogJHtCUkVBS1BPSU5ULm1lZGlhW21lZGlhXX1weCkge2ApO1xuICAgIH1cblxuICAgIGZvciAoY29uc3Qgc2VsZWN0b3Igb2Ygc2VsZWN0b3JzKSB7XG4gICAgICBjb25zdCBwcm9wTWFwID0gY2FjaGVJdGVtW3NlbGVjdG9yXTtcbiAgICAgIGlmICghcHJvcE1hcCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcHJvcE1hcEtleXMgPSBPYmplY3Qua2V5cyhwcm9wTWFwKS5maWx0ZXIoKHApID0+IHAgIT09IElNUE9SVEFOVCk7XG4gICAgICBpZiAocHJvcE1hcEtleXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBvcGVuIHNlbGVjdG9yXG4gICAgICByZXN1bHQucHVzaChgJHtzZWxlY3Rvcn17YCk7XG5cbiAgICAgIC8vIGZpbGwgc2VsZWN0b3Igd2l0aCBwcm9wZXJ0aWVzXG4gICAgICBmb3IgKGNvbnN0IHByb3Agb2YgcHJvcE1hcEtleXMpIHtcbiAgICAgICAgY29uc3QgdmFsID0gcHJvcE1hcFtwcm9wXS50b1N0cmluZygpO1xuICAgICAgICBjb25zdCBpbXBvcnRhbnQgPVxuICAgICAgICAgIHZhbC5pbmRleE9mKElNUE9SVEFOVCkgPCAwICYmIHByb3BNYXBbSU1QT1JUQU5UXVxuICAgICAgICAgICAgPyAnICFpbXBvcnRhbnQnXG4gICAgICAgICAgICA6IFNUUl9FTVBUWTtcbiAgICAgICAgcmVzdWx0LnB1c2goXG4gICAgICAgICAgTWFwbGUucHJvcEV4dGVuc2lvbk1hcFtwcm9wXVxuICAgICAgICAgICAgPyBNYXBsZS5wcm9wRXh0ZW5zaW9uTWFwW3Byb3BdKHZhbCwgaW1wb3J0YW50KVxuICAgICAgICAgICAgOiBgJHtwcm9wfToke3ZhbH0ke2ltcG9ydGFudH07YCxcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgLy8gY2xvc2Ugc2VsZWN0b3JcbiAgICAgIHJlc3VsdC5wdXNoKGB9YCk7XG4gICAgfVxuXG4gICAgLy8gY2xvc2UgbWVkaWEgcXVlcnlcbiAgICBpZiAobWVkaWEgIT09IEJSRUFLUE9JTlQubWluTWVkaWEpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGB9YCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQubGVuZ3RoID4gMiA/IHJlc3VsdC5qb2luKFNUUl9FTVBUWSkgOiBTVFJfRU1QVFk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBnZW5lcmF0ZVdoaXRlbGlzdCh3aGl0ZWxpc3Q6IEFycmF5PHN0cmluZz4gPSBbXSk6IHZvaWQge1xuICAgIGNvbnN0IGNsYXNzTGlzdCA9IFtdO1xuICAgIGZvciAoY29uc3QgdXRpbEtleSBvZiB3aGl0ZWxpc3QpIHtcbiAgICAgIGlmICghTWFwbGUudXRpbENsYXNzTWFwW3V0aWxLZXldKSB7XG4gICAgICAgIGNsYXNzTGlzdC5wdXNoKHV0aWxLZXkpO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcHJvcHMgPSBPYmplY3Qua2V5cyhNYXBsZS51dGlsQ2xhc3NNYXBbdXRpbEtleV0pO1xuICAgICAgZm9yIChjb25zdCB1dGlsVmFsIG9mIHByb3BzKSB7XG4gICAgICAgIGlmICh1dGlsVmFsLmNoYXJBdCgwKSA9PT0gUFJFRklYX01BUExFX1BST1ApIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGJyZWFrcG9pbnRzID0gT2JqZWN0LmtleXMoTWFwbGUuYnJlYWtwb2ludE1hcCk7XG4gICAgICAgIGZvciAoY29uc3QgYnAgb2YgYnJlYWtwb2ludHMpIHtcbiAgICAgICAgICBjb25zdCBtZWRpYVVwID0gYnAgKyBTVUZGSVhfTUVESUFfVVA7XG4gICAgICAgICAgY29uc3QgbWVkaWFEb3duID0gYnAgKyBTVUZGSVhfTUVESUFfRE9XTjtcbiAgICAgICAgICBjb25zdCB1dGlsQ2xhc3MgPSBTRVBfVVRJTF9LRVkgKyB1dGlsS2V5ICsgU0VQX1VUSUxfVkFMICsgdXRpbFZhbDtcbiAgICAgICAgICBpZiAobWVkaWFVcCBpbiBCUkVBS1BPSU5ULm1lZGlhKSB7XG4gICAgICAgICAgICBjbGFzc0xpc3QucHVzaChtZWRpYVVwICsgdXRpbENsYXNzKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG1lZGlhRG93biBpbiBCUkVBS1BPSU5ULm1lZGlhKSB7XG4gICAgICAgICAgICBjbGFzc0xpc3QucHVzaChtZWRpYURvd24gKyB1dGlsQ2xhc3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBNYXBsZS5mbHkocHJlSW5pdENsYXNzTGlzdC5jb25jYXQoY2xhc3NMaXN0KSk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBzcGxpdExhc3RPY2N1cnJlbmNlKHN0cjogc3RyaW5nLCBrZXk6IHN0cmluZyk6IEFycmF5PHN0cmluZz4ge1xuICAgIGNvbnN0IHBvcyA9IHN0ci5sYXN0SW5kZXhPZihrZXkpO1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgIGNvbnN0IGZpcnN0UGFydCA9IHN0ci5zdWJzdHJpbmcoMCwgcG9zKTtcbiAgICBjb25zdCBsYXN0UGFydCA9IHN0ci5zdWJzdHJpbmcocG9zICsga2V5Lmxlbmd0aCk7XG4gICAgaWYgKGZpcnN0UGFydCkge1xuICAgICAgcmVzdWx0LnB1c2goZmlyc3RQYXJ0KTtcbiAgICB9XG4gICAgaWYgKGxhc3RQYXJ0KSB7XG4gICAgICByZXN1bHQucHVzaChsYXN0UGFydCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBzcGxpdEZpcnN0T2NjdXJyZW5jZShzdHI6IHN0cmluZywga2V5OiBzdHJpbmcpOiBBcnJheTxzdHJpbmc+IHtcbiAgICBjb25zdCBwb3MgPSBzdHIuaW5kZXhPZihrZXkpO1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgIGNvbnN0IGZpcnN0UGFydCA9IHN0ci5zdWJzdHJpbmcoMCwgcG9zKTtcbiAgICBjb25zdCBsYXN0UGFydCA9IHN0ci5zdWJzdHJpbmcocG9zICsga2V5Lmxlbmd0aCk7XG4gICAgaWYgKGZpcnN0UGFydCkge1xuICAgICAgcmVzdWx0LnB1c2goZmlyc3RQYXJ0KTtcbiAgICB9XG4gICAgaWYgKGxhc3RQYXJ0KSB7XG4gICAgICByZXN1bHQucHVzaChsYXN0UGFydCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGluaXQoXG4gICAgZG9jdW1lbnQ6IGFueSxcbiAgICBlbmFibGVkOiBib29sZWFuLFxuICAgIHV0aWxDbGFzc01hcDogYW55ID0ge30sXG4gICAgd2hpdGVsaXN0OiBBcnJheTxzdHJpbmc+LFxuICAgIHZhcmlhYmxlczogTWFwbGVWYXJpYWJsZU1vZGVsID0gTWFwbGUudmFyaWFibGVzLFxuICAgIGlzUnRsOiBib29sZWFuID0gZmFsc2UsXG4gICAgdXRpbFByZWZpeExpc3Q6IEFycmF5PGFueT4gPSBbXSxcbiAgICBwcm9wRXh0ZW5zaW9uTWFwOiBhbnkgPSB7fSxcbiAgKTogdm9pZCB7XG4gICAgaXNNYXBsZUVuYWJsZWQgPSBlbmFibGVkO1xuICAgIGlmIChpc01hcGxlRW5hYmxlZCA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZG9jID0gZG9jdW1lbnQ7XG4gICAgTWFwbGUuQ0FDSEUgPSB7fTtcbiAgICBNYXBsZS52YXJpYWJsZXMgPSB7XG4gICAgICAuLi5NYXBsZS52YXJpYWJsZXMsXG4gICAgICAuLi52YXJpYWJsZXMsXG4gICAgfTtcbiAgICBNYXBsZUNvbG9ySGVscGVyLmdlbmVyYXRlQWxwaGFDb2xvcnMoTWFwbGUudmFyaWFibGVzLmNvbG9yKTtcbiAgICBNYXBsZS51dGlsQ2xhc3NNYXAgPSB7XG4gICAgICAuLi5nZXRNYXBsZVV0aWxpdHlDbGFzc01hcChNYXBsZS52YXJpYWJsZXMpLFxuICAgICAgLi4udXRpbENsYXNzTWFwLFxuICAgIH07XG4gICAgTWFwbGUudXRpbFByZWZpeExpc3QgPSBbXG4gICAgICAuLi5nZXRNYXBsZVV0aWxpdHlWYXJpYWJsZU1hcChNYXBsZS52YXJpYWJsZXMpLFxuICAgICAgLi4udXRpbFByZWZpeExpc3QsXG4gICAgXTtcbiAgICBNYXBsZS5wcm9wRXh0ZW5zaW9uTWFwID0ge1xuICAgICAgLi4uTUFQTEVfUFJPUF9FWFRFTlNJT05fTUFQLFxuICAgICAgLi4ucHJvcEV4dGVuc2lvbk1hcCxcbiAgICB9O1xuICAgIE1hcGxlLmJyZWFrcG9pbnRNYXAgPSB7XG4gICAgICAuLi5NYXBsZS52YXJpYWJsZXMuYnJlYWtwb2ludCxcbiAgICB9O1xuICAgIE1hcGxlLnNldE1pbkFuZE1heEJyZWFrcG9pbnRzKCk7XG4gICAgTWFwbGUuY3JlYXRlRG9tRWxlbWVudHMoU1RZTEVfRUxFTUVOVFMpO1xuICAgIE1hcGxlLmV4dGVuZFByb3BlcnRpZXMoKTtcbiAgICBNYXBsZS51dGlsQ2xhc3NNYXAgPSBNYXBsZS5jb252ZXJ0VXRpbENsYXNzTWFwVG9SdGwoXG4gICAgICBNYXBsZS51dGlsQ2xhc3NNYXAsXG4gICAgICBpc1J0bCxcbiAgICApO1xuICAgIE1hcGxlLmdlbmVyYXRlV2hpdGVsaXN0KHdoaXRlbGlzdCk7XG4gICAgdGhpcy5vbkluaXQkLm5leHQodHJ1ZSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGZpbmRBbmRGbHkoc3RyOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAoaXNNYXBsZUVuYWJsZWQgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChzdHIpIHtcbiAgICAgIE1hcGxlLmZseShcbiAgICAgICAgKHN0ci5tYXRjaChSX0VYVFJBQ1RfQ0xBU1MpIHx8IFtdKVxuICAgICAgICAgIC5qb2luKCcgJylcbiAgICAgICAgICAucmVwbGFjZSgvY2xhc3NcXD1cXFwiL2csICcnKVxuICAgICAgICAgIC5yZXBsYWNlKC9cIi9nLCAnJyksXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY29udmVydFV0aWxDbGFzc01hcFRvUnRsKFxuICAgIHV0aWxpdHlDbGFzczogYW55LFxuICAgIGlzUnRsOiBib29sZWFuLFxuICApOiBhbnkge1xuICAgIGlmICghaXNSdGwpIHtcbiAgICAgIHJldHVybiB1dGlsaXR5Q2xhc3M7XG4gICAgfVxuICAgIGNvbnN0IGRhdGEgPSB7fTtcbiAgICBPYmplY3Qua2V5cyh1dGlsaXR5Q2xhc3MpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSB1dGlsaXR5Q2xhc3Nba2V5XTtcbiAgICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlLnJ0bCkge1xuICAgICAgICBPYmplY3Qua2V5cyh2YWx1ZS5ydGwpLnJlZHVjZSgocnRsVmFsdWUsIHJ0bEtleSkgPT4ge1xuICAgICAgICAgIHJ0bFZhbHVlW3J0bEtleV0gPSB2YWx1ZS5ydGxbcnRsS2V5XTtcbiAgICAgICAgfSwgdmFsdWUpO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgICBpZiAoa2V5LmluY2x1ZGVzKCdsZWZ0JykpIHtcbiAgICAgICAgICBjb25zdCByZXBsYWNlZEtleSA9IGtleS5yZXBsYWNlKCdsZWZ0JywgJ3JpZ2h0Jyk7XG4gICAgICAgICAgZGF0YVtyZXBsYWNlZEtleV0gPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkuaW5jbHVkZXMoJ3JpZ2h0JykpIHtcbiAgICAgICAgICBjb25zdCByZXBsYWNlZEtleSA9IGtleS5yZXBsYWNlKCdyaWdodCcsICdsZWZ0Jyk7XG4gICAgICAgICAgZGF0YVtyZXBsYWNlZEtleV0gPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkYXRhW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiB2YWx1ZS5pbmNsdWRlcygnbGVmdCcpKSB7XG4gICAgICAgICAgZGF0YVtrZXldID0gdmFsdWUucmVwbGFjZSgnbGVmdCcsICdyaWdodCcpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgdmFsdWUuaW5jbHVkZXMoJ3JpZ2h0JykpIHtcbiAgICAgICAgICBkYXRhW2tleV0gPSB2YWx1ZS5yZXBsYWNlKCdyaWdodCcsICdsZWZ0Jyk7XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJlxuICAgICAgICAgIGtleSA9PT0gJ3RyYW5zZm9ybScgJiZcbiAgICAgICAgICB2YWx1ZS5pbmNsdWRlcygndHJhbnNsYXRlJykgJiZcbiAgICAgICAgICAhWydZKCcsICdaKCddLnNvbWUoKHQpID0+IHZhbHVlLmluY2x1ZGVzKHQpKVxuICAgICAgICApIHtcbiAgICAgICAgICBkYXRhW2tleV0gPSB2YWx1ZVxuICAgICAgICAgICAgLnNwbGl0KCcgJylcbiAgICAgICAgICAgIC5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgY29uc3Qgc3BsaXR0ZWRWYWx1ZSA9IGl0ZW0uc3BsaXQoJygnKTtcbiAgICAgICAgICAgICAgc3BsaXR0ZWRWYWx1ZVsxXSA9XG4gICAgICAgICAgICAgICAgc3BsaXR0ZWRWYWx1ZVsxXSAmJiBzcGxpdHRlZFZhbHVlWzFdLnN0YXJ0c1dpdGgoJy0nKVxuICAgICAgICAgICAgICAgICAgPyBzcGxpdHRlZFZhbHVlWzFdLnJlcGxhY2UoJy0nLCAnKCcpXG4gICAgICAgICAgICAgICAgICA6IHNwbGl0dGVkVmFsdWVbMV1cbiAgICAgICAgICAgICAgICAgID8gJygtJyArIHNwbGl0dGVkVmFsdWVbMV1cbiAgICAgICAgICAgICAgICAgIDogJyc7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIHNwbGl0dGVkVmFsdWVbMF0gKyBzcGxpdHRlZFZhbHVlWzFdO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5qb2luKCcgJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGZpeGVkVXRpbGl0eSA9IE1hcGxlLmNvbnZlcnRVdGlsQ2xhc3NNYXBUb1J0bChcbiAgICAgICAgICB7IC4uLnZhbHVlIH0sXG4gICAgICAgICAgaXNSdGwsXG4gICAgICAgICk7XG4gICAgICAgIGRhdGFba2V5XSA9IHsgLi4uZml4ZWRVdGlsaXR5IH07XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGZseShjbGFzc0xpc3Q6IGFueSk6IHZvaWQge1xuICAgIGlmIChpc01hcGxlRW5hYmxlZCA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFwcmVJbml0Q2xhc3NMaXN0Lmxlbmd0aCkge1xuICAgICAgcHJlSW5pdENsYXNzTGlzdCA9IHByZUluaXRDbGFzc0xpc3QuY29uY2F0KGNsYXNzTGlzdCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFjbGFzc0xpc3QgfHwgY2xhc3NMaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHJhd0NhY2hlS2V5ID0gQXJyYXkuaXNBcnJheShjbGFzc0xpc3QpXG4gICAgICA/IGNsYXNzTGlzdC5qb2luKCcgJylcbiAgICAgIDogY2xhc3NMaXN0O1xuXG4gICAgaWYgKE1hcGxlLnJhd0NhY2hlW3Jhd0NhY2hlS2V5XSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBNYXBsZS5yYXdDYWNoZVtyYXdDYWNoZUtleV0gPSAxO1xuICAgIGlmIChBcnJheS5pc0FycmF5KGNsYXNzTGlzdCkgPT09IGZhbHNlKSB7XG4gICAgICBjbGFzc0xpc3QgPSBjbGFzc0xpc3Quc3BsaXQoL1xccysvZyk7XG4gICAgfVxuXG4gICAgY2xhc3NMaXN0ID0gTWFwbGUudW5pZnlVdGlsaXR5Q2xhc3MoY2xhc3NMaXN0KTtcblxuICAgIE1hcGxlLnRlbXBDYWNoZSA9IHt9O1xuXG4gICAgZm9yIChjb25zdCBjbGFzc0l0ZW0gb2YgY2xhc3NMaXN0KSB7XG4gICAgICAvLyBDaGVjayB3aGV0aGVyIHRoZSBzdHlsZXMgd2lsbCBoYXZlICFpbXBvcnRhbnQgZmxhZyBvciBub3RcbiAgICAgIGNvbnN0IGltcG9ydGFudCA9IGNsYXNzSXRlbS5jaGFyQXQoY2xhc3NJdGVtLmxlbmd0aCAtIDEpID09PSBJTVBPUlRBTlQ7XG4gICAgICBjb25zdCBjbGFzc0l0ZW1XaXRob3V0SW1wb3J0YW50ID0gY2xhc3NJdGVtLnJlcGxhY2UoSU1QT1JUQU5ULCBTVFJfRU1QVFkpO1xuXG4gICAgICBsZXQgcGFydHMgPSBNYXBsZS5zcGxpdExhc3RPY2N1cnJlbmNlKFxuICAgICAgICBjbGFzc0l0ZW1XaXRob3V0SW1wb3J0YW50LFxuICAgICAgICBTRVBfVVRJTF9WQUwsXG4gICAgICApO1xuXG4gICAgICAvLyBFeHRyYWN0IHV0aWxpdHkgdmFsdWVcbiAgICAgIGNvbnN0IHV0aWxWYWwgPSBwYXJ0cy5sZW5ndGggPT09IDEgPyBudWxsIDogcGFydHMucG9wKCk7XG5cbiAgICAgIC8vIEV4dHJhY3QgbWVkaWEgcXVlcnlcbiAgICAgIGNvbnN0IG1lZGlhID1cbiAgICAgICAgT2JqZWN0LmtleXMoQlJFQUtQT0lOVC5tZWRpYSkuZmluZChcbiAgICAgICAgICAoa2V5OiBzdHJpbmcpID0+IGNsYXNzSXRlbS5pbmRleE9mKGtleSkgPT09IDAsXG4gICAgICAgICkgfHwgQlJFQUtQT0lOVC5taW5NZWRpYTtcblxuICAgICAgcGFydHMgPSBNYXBsZS5zcGxpdEZpcnN0T2NjdXJyZW5jZShwYXJ0cy5qb2luKFNUUl9FTVBUWSksIG1lZGlhKVxuICAgICAgICAuam9pbihTVFJfRU1QVFkpXG4gICAgICAgIC5zcGxpdChTRVBfVVRJTF9LRVkpXG4gICAgICAgIC5maWx0ZXIoKHA6IHN0cmluZykgPT4gISFwKTtcblxuICAgICAgLy8gRXhhY3QgdXRpbGl0eSBjbGFzc1xuICAgICAgY29uc3QgdXRpbEtleSA9IHBhcnRzLmxlbmd0aCA+PSAxID8gcGFydHMucG9wKCkgOiBudWxsO1xuXG4gICAgICAvLyBFeHRyYWN0IHNlbGVjdG9yXG4gICAgICBjb25zdCBzZWxLZXkgPSBwYXJ0cy5qb2luKFNFUF9VVElMX0tFWSk7XG5cbiAgICAgIC8vIEdldCBzdHlsZSBtYXBcbiAgICAgIGNvbnN0IG1hcGxlID0gTWFwbGUudXRpbENsYXNzTWFwW3V0aWxLZXldO1xuXG4gICAgICAvLyBXaXRob3V0IGEgc3R5bGUgbWFwIHdlIGNhbid0IGNyZWF0ZSBzdHlsZXNcbiAgICAgIGlmICghbWFwbGUpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIENhY2hlIGRlZmF1bHQgc3R5bGVzIHdpdGggc2VsZWN0b3JcbiAgICAgIGlmIChtYXBsZS5fZGVmYXVsdCkge1xuICAgICAgICBPYmplY3Qua2V5cyhtYXBsZS5fZGVmYXVsdCkuZm9yRWFjaCgobWVkaWFJdGVtKSA9PiB7XG4gICAgICAgICAgTWFwbGUuY2FjaGUoXG4gICAgICAgICAgICBtZWRpYUl0ZW0sXG4gICAgICAgICAgICBNYXBsZS5nZXRTZWxlY3RvcnMoXG4gICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgIHNlbEtleSxcbiAgICAgICAgICAgICAgdXRpbEtleSxcbiAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgbWFwbGUuX3NlbGVjdG9yLFxuICAgICAgICAgICAgICBpbXBvcnRhbnQsXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAuLi5tYXBsZS5fY29tbW9uLFxuICAgICAgICAgICAgICAuLi5tYXBsZVttYXBsZS5fZGVmYXVsdFttZWRpYUl0ZW1dXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIENhY2hlIHV0aWxpdHkgc3R5bGVzIHdpdGggc2VsZWN0b3JcbiAgICAgIGlmICh1dGlsVmFsKSB7XG4gICAgICAgIGNvbnN0IGMgPSBjbGFzc0l0ZW0ucmVwbGFjZShJTVBPUlRBTlQsIFNUUl9FTVBUWSk7XG4gICAgICAgIGNvbnN0IHVjbSA9IE1hcGxlLnV0aWxDbGFzc01hcDtcblxuICAgICAgICAvLyNyZWdpb24gV2lsZGNhcmQgc2VsZWN0b3JzXG4gICAgICAgIC8vICo6dXRpbC1rZXlcbiAgICAgICAgLy8gKjp1dGlsLWtleT11dGlsLXZhbFxuICAgICAgICAvLyAqLnNlbGVjdG9yOnV0aWwta2V5PXV0aWwtdmFsXG4gICAgICAgIC8vICo6c2VsZWN0b3Ita2V5OnV0aWwta2V5PXV0aWwtdmFsXG4gICAgICAgIGNvbnN0IHdjTWVkaWEgPSBjLnJlcGxhY2UobWVkaWEsIFdJTERDQVJEKTtcblxuICAgICAgICAvLyBtZWRpYToqXG4gICAgICAgIC8vIG1lZGlhLnNlbGVjdG9yOipcbiAgICAgICAgLy8gbWVkaWE6c2VsZWN0b3Ita2V5OipcbiAgICAgICAgY29uc3Qgd2N1dGlsS2V5ID0gYy5yZXBsYWNlKFJfU0VQX1VUSUxfS0VZLCBgOiR7V0lMRENBUkR9YCk7XG5cbiAgICAgICAgLy8gbWVkaWE6dXRpbC1rZXk9KlxuICAgICAgICAvLyBtZWRpYS5zZWxlY3Rvcjp1dGlsLWtleT0qXG4gICAgICAgIC8vIG1lZGlhOnNlbGVjdG9yLWtleTp1dGlsLWtleT0qXG4gICAgICAgIGNvbnN0IHdjdXRpbFZhbCA9IGMucmVwbGFjZShSX1NFUF9VVElMX1ZBTCwgYD0ke1dJTERDQVJEfWApO1xuXG4gICAgICAgIC8vICo6KlxuICAgICAgICAvLyAqLnNlbGVjdG9yOipcbiAgICAgICAgLy8gKjpzZWxlY3Rvci1rZXk6KlxuICAgICAgICBjb25zdCB3Y01lZGlhS2V5ID0gd2NNZWRpYS5yZXBsYWNlKFJfU0VQX1VUSUxfS0VZLCBgOiR7V0lMRENBUkR9YCk7XG5cbiAgICAgICAgLy8gKjp1dGlsLWtleT0qXG4gICAgICAgIC8vICouc2VsZWN0b3I6dXRpbC1rZXk9KlxuICAgICAgICAvLyAqOnNlbGVjdG9yLWtleTp1dGlsLWtleT0qXG4gICAgICAgIGNvbnN0IHdjTWVkaWFWYWwgPSB3Y3V0aWxWYWwucmVwbGFjZShtZWRpYSwgV0lMRENBUkQpO1xuICAgICAgICAvLyNlbmRyZWdpb25cblxuICAgICAgICBjb25zdCBzZWxlY3RvciA9IE1hcGxlLmdldFNlbGVjdG9ycyhcbiAgICAgICAgICBtZWRpYSxcbiAgICAgICAgICBzZWxLZXksXG4gICAgICAgICAgdXRpbEtleSxcbiAgICAgICAgICB1dGlsVmFsLFxuICAgICAgICAgIG1hcGxlLl9zZWxlY3RvcixcbiAgICAgICAgICBpbXBvcnRhbnQsXG4gICAgICAgICk7XG5cbiAgICAgICAgTWFwbGUuY2FjaGUobWVkaWEsIHNlbGVjdG9yLCB7XG4gICAgICAgICAgLi4ubWFwbGUuX2NvbW1vbixcbiAgICAgICAgICAuLi5tYXBsZVt1dGlsVmFsXSxcbiAgICAgICAgICAuLi5KU09OLnBhcnNlKFxuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoXG4gICAgICAgICAgICAgIG1hcGxlW3V0aWxWYWwucmVwbGFjZShSX0NVU1RPTSwgV0lMRENBUkQpXSB8fCB7fSxcbiAgICAgICAgICAgICkucmVwbGFjZShcbiAgICAgICAgICAgICAgUl9XSUxEQ0FSRCxcbiAgICAgICAgICAgICAgdXRpbEtleSA9PT0gJ2NvbnRlbnQnXG4gICAgICAgICAgICAgICAgPyB1dGlsVmFsLnJlcGxhY2UoUl9DVVNUT00sICckMScpXG4gICAgICAgICAgICAgICAgOiB1dGlsVmFsLnJlcGxhY2UoUl9DVVNUT00sICckMScpLnJlcGxhY2UoUl9TRVBfVkFMX1NQQUNFLCAnICcpLFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICApLFxuICAgICAgICAgIC4uLih1Y21bd2NNZWRpYUtleV0gfHwge30pLFxuICAgICAgICAgIC4uLih1Y21bd2N1dGlsS2V5XSB8fCB7fSksXG4gICAgICAgICAgLi4uKHVjbVt3Y01lZGlhVmFsXSB8fCB7fSksXG4gICAgICAgICAgLi4uKHVjbVt3Y3V0aWxWYWxdIHx8IHt9KSxcbiAgICAgICAgICAuLi4odWNtW3djTWVkaWFdIHx8IHt9KSxcbiAgICAgICAgICAuLi4odWNtW2NdIHx8IHt9KSxcbiAgICAgICAgICBbSU1QT1JUQU5UXTogaW1wb3J0YW50LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyNyZWdpb24gR2VuZXJhdGUgc3R5bGVzXG4gICAgLy8gR2VuZXJhdGUgbWluIG1lZGlhIHF1ZXJ5IHN0eWxlc1xuICAgIGNvbnN0IG1pbk1lZGlhU3R5bGVzID0gTWFwbGUuc3R5bGVzKEJSRUFLUE9JTlQubWluTWVkaWEpO1xuICAgIGlmIChtaW5NZWRpYVN0eWxlcykge1xuICAgICAgTWFwbGUuYXBwZW5kU3R5bGUoXG4gICAgICAgIFNUWUxFX0VMRU1FTlRTLFxuICAgICAgICBCUkVBS1BPSU5ULm1pbk1lZGlhLFxuICAgICAgICBtaW5NZWRpYVN0eWxlcyxcbiAgICAgICAgZmFsc2UsXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIEdlbmVyYXRlIG1lZGlhIHF1ZXJ5IHN0eWxlc1xuICAgIGNvbnN0IG1lZGlhUXVlcnlTdHlsZXMgPSB7fTtcbiAgICBPYmplY3Qua2V5cyhNYXBsZS50ZW1wQ2FjaGUpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgaWYgKGtleSAhPT0gQlJFQUtQT0lOVC5taW5NZWRpYSkge1xuICAgICAgICBtZWRpYVF1ZXJ5U3R5bGVzW2tleV0gPSBtZWRpYVF1ZXJ5U3R5bGVzW2tleV0gfHwgJyc7XG4gICAgICAgIG1lZGlhUXVlcnlTdHlsZXNba2V5XSArPSBNYXBsZS5zdHlsZXMoa2V5KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBPYmplY3Qua2V5cyhtZWRpYVF1ZXJ5U3R5bGVzKS5mb3JFYWNoKChrZXkpID0+XG4gICAgICBNYXBsZS5hcHBlbmRTdHlsZShTVFlMRV9FTEVNRU5UUywga2V5LCBtZWRpYVF1ZXJ5U3R5bGVzW2tleV0sIGZhbHNlKSxcbiAgICApO1xuICAgIC8vI2VuZHJlZ2lvblxuICB9XG5cbiAgcHVibGljIHN0YXRpYyB1bmlmeVV0aWxpdHlDbGFzcyhjbGFzc0xpc3Q6IEFycmF5PHN0cmluZz4pOiBBcnJheTxzdHJpbmc+IHtcbiAgICByZXR1cm4gY2xhc3NMaXN0LnJlZHVjZSgoYWNjLCBjbGFzc0l0ZW0pID0+IHtcbiAgICAgIGNvbnN0IGV4aXN0aW5nU3R5bGVJbmRleCA9IGFjYy5maW5kSW5kZXgoXG4gICAgICAgIChwKSA9PlxuICAgICAgICAgICgocCB8fCAnJykuc3BsaXQoUl9VTklGSVkpIHx8IFtdKVswXSA9PT1cbiAgICAgICAgICAoKGNsYXNzSXRlbSB8fCAnJykuc3BsaXQoUl9VTklGSVkpIHx8IFtdKVswXSxcbiAgICAgICk7XG4gICAgICBpZiAoZXhpc3RpbmdTdHlsZUluZGV4IDwgMCkge1xuICAgICAgICBhY2MucHVzaChjbGFzc0l0ZW0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWNjW2V4aXN0aW5nU3R5bGVJbmRleF0gPSBjbGFzc0l0ZW07XG4gICAgICB9XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0sIFtdKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgYXBwZW5kU3R5bGUoXG4gICAgc3R5bGVFbGVtZW50czogYW55LFxuICAgIGJwOiBzdHJpbmcsXG4gICAgc3R5bGU6IHN0cmluZyxcbiAgICBzaWxlbnQ6IGJvb2xlYW4gPSB0cnVlLFxuICApOiB2b2lkIHtcbiAgICBzdHlsZUVsZW1lbnRzW2JwXS5hcHBlbmRDaGlsZChkb2MuY3JlYXRlVGV4dE5vZGUoc3R5bGUpKTtcblxuICAgIGlmICghc2lsZW50KSB7XG4gICAgICBNYXBsZS5vblN0eWxlQXBwZW5kJC5uZXh0KHsgYnAsIHN0eWxlIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaXNNZWRpYVZhbGlkKG1lZGlhOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbWVkaWEgaW4gQlJFQUtQT0lOVC5tZWRpYTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaXNCcmVha3BvaW50VmFsaWQoYnJlYWtwb2ludDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGJyZWFrcG9pbnQgaW4gTWFwbGUuYnJlYWtwb2ludE1hcDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaXNNZWRpYU1hdGNoZXNXaXRoQnJlYWtwb2ludChcbiAgICBtZWRpYTogc3RyaW5nLFxuICAgIGJyZWFrcG9pbnQ6IHN0cmluZyxcbiAgKTogYm9vbGVhbiB7XG4gICAgaWYgKCFNYXBsZS5pc0JyZWFrcG9pbnRWYWxpZChicmVha3BvaW50KSB8fCAhTWFwbGUuaXNNZWRpYVZhbGlkKG1lZGlhKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IG1lZGlhU2l6ZSA9IEJSRUFLUE9JTlQubWVkaWFbbWVkaWFdO1xuICAgIGNvbnN0IGJyZWFrcG9pbnRTaXplID0gcGFyc2VGbG9hdChNYXBsZS5icmVha3BvaW50TWFwW2JyZWFrcG9pbnRdKTtcblxuICAgIGlmIChtZWRpYS5pbmNsdWRlcyhTVUZGSVhfTUVESUFfRE9XTikpIHtcbiAgICAgIHJldHVybiBicmVha3BvaW50U2l6ZSA8PSBtZWRpYVNpemU7XG4gICAgfVxuXG4gICAgaWYgKG1lZGlhLmluY2x1ZGVzKFNVRkZJWF9NRURJQV9VUCkpIHtcbiAgICAgIHJldHVybiBicmVha3BvaW50U2l6ZSA+PSBtZWRpYVNpemU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRWYWxpZE1lZGlhTWFwKCk6IGFueSB7XG4gICAgcmV0dXJuIHsgLi4uQlJFQUtQT0lOVC5tZWRpYSB9O1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRNaW5NZWRpYSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBCUkVBS1BPSU5ULm1pbk1lZGlhO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRNaW5CcmVha3BvaW50KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIEJSRUFLUE9JTlQubWluS2V5O1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRNYXBwZWRNZWRpYU9yTWluKG1lZGlhOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBNYXBsZS5pc01lZGlhVmFsaWQobWVkaWEpID8gbWVkaWEgOiBNYXBsZS5nZXRNaW5NZWRpYSgpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRNYXBwZWRNZWRpYU9yTnVsbChtZWRpYTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gTWFwbGUuaXNNZWRpYVZhbGlkKG1lZGlhKSA/IG1lZGlhIDogbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TWFwcGVkQnJlYWtwb2ludE9yTWluKGJyZWFrcG9pbnQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIE1hcGxlLmlzQnJlYWtwb2ludFZhbGlkKGJyZWFrcG9pbnQpXG4gICAgICA/IGJyZWFrcG9pbnRcbiAgICAgIDogTWFwbGUuZ2V0TWluQnJlYWtwb2ludCgpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRNYXBwZWRCcmVha3BvaW50T3JOdWxsKGJyZWFrcG9pbnQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIE1hcGxlLmlzQnJlYWtwb2ludFZhbGlkKGJyZWFrcG9pbnQpID8gYnJlYWtwb2ludCA6IG51bGw7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldFZhcmlhYmxlcygpOiBNYXBsZVZhcmlhYmxlTW9kZWwge1xuICAgIHJldHVybiB7IC4uLk1hcGxlLnZhcmlhYmxlcyB9O1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBmaWxsSW5UaGVHYXBzKGJyZWFrcG9pbnRNYXA6IGFueSk6IGFueSB7XG4gICAgY29uc3QgZnVsbEJyZWFrcG9pbnRNYXAgPSBNYXBsZS5nZXRWYXJpYWJsZXMoKS5icmVha3BvaW50O1xuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhmdWxsQnJlYWtwb2ludE1hcCk7XG4gICAgY29uc3QgbWluS2V5ID0ga2V5cy5maW5kKChrZXkpID0+IGtleSBpbiBicmVha3BvaW50TWFwKTtcbiAgICByZXR1cm4ga2V5c1xuICAgICAgLnNvcnQoKGEsIGIpID0+IGZ1bGxCcmVha3BvaW50TWFwW2FdIC0gZnVsbEJyZWFrcG9pbnRNYXBbYl0pXG4gICAgICAucmVkdWNlKChhY2MsIGtleSwgaSkgPT4ge1xuICAgICAgICBjb25zdCBuZXh0S2V5ID0ga2V5c1tpICsgMV07XG4gICAgICAgIGlmIChrZXkgaW4gYWNjID09PSBmYWxzZSkge1xuICAgICAgICAgIGFjYyA9IHtcbiAgICAgICAgICAgIC4uLmFjYyxcbiAgICAgICAgICAgIFtrZXldOlxuICAgICAgICAgICAgICBrZXkgaW4gYnJlYWtwb2ludE1hcCA/IGJyZWFrcG9pbnRNYXBba2V5XSA6IGJyZWFrcG9pbnRNYXBbbWluS2V5XSxcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXh0S2V5ICYmICFicmVha3BvaW50TWFwW25leHRLZXldKSB7XG4gICAgICAgICAgYWNjID0ge1xuICAgICAgICAgICAgLi4uYWNjLFxuICAgICAgICAgICAgW25leHRLZXldOiBhY2Nba2V5XSxcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgICB9LCB7fSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGlzQnJlYWtwb2ludE1hcChicmVha3BvaW50TWFwOiBhbnkpOiBhbnkge1xuICAgIGlmICh0eXBlb2YgYnJlYWtwb2ludE1hcCA9PT0gJ29iamVjdCcgJiYgYnJlYWtwb2ludE1hcCAhPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKE1hcGxlLmdldFZhcmlhYmxlcygpLmJyZWFrcG9pbnQpLnNvbWUoXG4gICAgICAgIChrZXkpID0+IGJyZWFrcG9pbnRNYXAgJiYga2V5IGluIGJyZWFrcG9pbnRNYXAsXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiJdfQ==