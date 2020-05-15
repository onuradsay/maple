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
const CACHE = {};
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
let isInitialized = false;
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
            styleElements[key] = doc.createElement('style');
            styleElements[key].setAttribute('id', `${prefix}-${key}`);
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
        if (!CACHE[cacheKey]) {
            Maple.tempCache[media] = Maple.tempCache[media] || {};
            Maple.tempCache[media] = Object.assign(Object.assign({}, Maple.tempCache[media]), { [selector]: Object.assign(Object.assign({}, (Maple.tempCache[media][selector] || {})), mapToBeCached) });
            CACHE[cacheKey] = 1;
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
    static init(document, enabled, utilClassMap = {}, whitelist, variables = Maple.variables, utilPrefixList = [], propExtensionMap = {}) {
        isMapleEnabled = enabled;
        if (isMapleEnabled === false) {
            return;
        }
        doc = document;
        if (isInitialized === false) {
            isInitialized = true;
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
            Maple.generateWhitelist(whitelist);
            this.onInit$.next(true);
        }
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
        if (isInitialized === false) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXBsZS8iLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdkMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFcEUsT0FBTyxFQUNMLHVCQUF1QixFQUN2QiwwQkFBMEIsR0FDM0IsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDcEQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRTlELHlFQUF5RTtBQUN6RSxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7QUFDakIsTUFBTSxVQUFVLEdBQVE7SUFDdEIsS0FBSyxFQUFFLEVBQUU7Q0FDVixDQUFDO0FBQ0YsTUFBTSxjQUFjLEdBQUcsRUFBRSxDQUFDO0FBRTFCLE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUNy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QUFFLENBQUM7QUFDeEIsa0JBQVksR0FBUSxFQUFFLENBQUM7QUFDdkIsb0JBQWMsR0FBZSxFQUFFLENBQUM7QUFDaEMsc0JBQWdCLEdBQVEsRUFBRSxDQUFDO0FBQzNCLGNBQVEsR0FBUSxFQUFFLENBQUM7QUFDbkIsZUFBUyxHQUFRLEVBQUUsQ0FBQztBQUNyQixvQkFBYyxHQUF5QixJQUFJLGVBQWUsQ0FDdEUsSUFBSSxDQUNMLENBQUM7QUFDWSxhQUFPLEdBQTZCLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBNYXBsZUNvbG9ySGVscGVyIH0gZnJvbSAnLi9oZWxwZXJzL2NvbG9yLmhlbHBlcic7XG5pbXBvcnQgeyBNQVBMRV9QUk9QX0VYVEVOU0lPTl9NQVAgfSBmcm9tICcuL3Byb3BlcnR5LWV4dGVuc2lvbi1tYXAnO1xuaW1wb3J0IHsgTWFwbGVWYXJpYWJsZU1vZGVsIH0gZnJvbSAnLi90eXBlcy92YXJpYWJsZXMubW9kZWwnO1xuaW1wb3J0IHtcbiAgZ2V0TWFwbGVVdGlsaXR5Q2xhc3NNYXAsXG4gIGdldE1hcGxlVXRpbGl0eVZhcmlhYmxlTWFwLFxufSBmcm9tICcuL3V0aWxpdHktY2xhc3MtbWFwJztcbmltcG9ydCB7IE1BUExFX1ZBUl9BTEVSVCB9IGZyb20gJy4vdmFyaWFibGVzL2FsZXJ0JztcbmltcG9ydCB7IE1BUExFX1ZBUl9CUkVBS1BPSU5UIH0gZnJvbSAnLi92YXJpYWJsZXMvYnJlYWtwb2ludCc7XG5pbXBvcnQgeyBNQVBMRV9WQVJfQlVUVE9OIH0gZnJvbSAnLi92YXJpYWJsZXMvYnV0dG9uJztcbmltcG9ydCB7IE1BUExFX1ZBUl9DT0xPUiB9IGZyb20gJy4vdmFyaWFibGVzL2NvbG9yJztcbmltcG9ydCB7IE1BUExFX1ZBUl9GT05UX0ZBTUlMWSB9IGZyb20gJy4vdmFyaWFibGVzL2ZvbnQtZmFtaWx5JztcbmltcG9ydCB7IE1BUExFX1ZBUl9GT05UX1NJWkUgfSBmcm9tICcuL3ZhcmlhYmxlcy9mb250LXNpemUnO1xuaW1wb3J0IHsgTUFQTEVfVkFSX0ZPTlRfV0VJR0hUIH0gZnJvbSAnLi92YXJpYWJsZXMvZm9udC13ZWlnaHQnO1xuaW1wb3J0IHsgTUFQTEVfVkFSX01BWF9XSURUSCB9IGZyb20gJy4vdmFyaWFibGVzL21heC13aWR0aCc7XG5pbXBvcnQgeyBNQVBMRV9WQVJfU1BBQ0VSIH0gZnJvbSAnLi92YXJpYWJsZXMvc3BhY2VyJztcbmltcG9ydCB7IE1BUExFX1ZBUl9UUkFOU0lUSU9OIH0gZnJvbSAnLi92YXJpYWJsZXMvdHJhbnNpdGlvbic7XG5cbi8vIERlZmluZSBhIGdsb2JhbCBDQUNIRSB0byBjb2xsZWN0IHNlbGVjdG9ycyBhbmQgbWFwcyBvbiBicmVha3BvaW50IGtleXNcbmNvbnN0IENBQ0hFID0ge307XG5jb25zdCBCUkVBS1BPSU5UOiBhbnkgPSB7XG4gIG1lZGlhOiB7fSxcbn07XG5jb25zdCBTVFlMRV9FTEVNRU5UUyA9IHt9O1xuXG5jb25zdCBTVFJfRU1QVFkgPSAnJztcbmNvbnN0IFNUUl9TUEFDRSA9ICcgJztcbmNvbnN0IFNUUl9ET1QgPSAnLic7XG5jb25zdCBTVFJfVVAgPSAndXAnO1xuY29uc3QgU1RSX0RPV04gPSAnZG93bic7XG5jb25zdCBTRVBfTUVESUEgPSAnLSc7XG5jb25zdCBTRVBfU0VMRUNUT1IgPSAnOic7XG5jb25zdCBTRVBfVVRJTF9LRVkgPSAnOic7XG5jb25zdCBTRVBfVVRJTF9WQUwgPSAnPSc7XG5jb25zdCBTRVBfTk9fU1BBQ0UgPSAnPCc7XG5jb25zdCBTRVBfT1VURVJfU1BBQ0UgPSAnPDwnO1xuY29uc3QgSU1QT1JUQU5UID0gJyEnO1xuY29uc3QgV0lMRENBUkQgPSAnKic7XG5cbmNvbnN0IFBSRUZJWF9NQVBMRV9QUk9QID0gJ18nO1xuY29uc3QgU1VGRklYX01FRElBX1VQID0gU0VQX01FRElBICsgU1RSX1VQO1xuY29uc3QgU1VGRklYX01FRElBX0RPV04gPSBTRVBfTUVESUEgKyBTVFJfRE9XTjtcblxuY29uc3QgUl9TRUxFQ1RPUl9SRVNFUlZFRCA9IC8oXFwufFxcK3xcXH58XFw8fFxcPnxcXFt8XFxdfFxcKHxcXCl8XFwhfFxcOnxcXCx8XFw9fFxcfHxcXCV8XFwjfFxcKnxcXFwifFxcLykvZztcbmNvbnN0IFJfRVNDQVBFX1JFU0VSVkVEID0gJ1xcXFwkMSc7XG5jb25zdCBSX1NFUF9OT19TUEFDRSA9IC9cXDwvZztcbmNvbnN0IFJfU0VQX1NFTF9TUEFDRSA9IC9cXD5cXD4vZztcbmNvbnN0IFJfU0VQX1NFTF9TUEFDRV9BTEwgPSAvKFxcPHxcXD5cXD4pL2c7XG5jb25zdCBSX1NFUF9WQUxfU1BBQ0UgPSAvXFx8L2c7XG5jb25zdCBSX1NFUF9VVElMX1ZBTCA9IC89KD86Lig/IT0pKSskLztcbmNvbnN0IFJfU0VQX1VUSUxfS0VZID0gL1xcOig/Oi4oPyFcXDopKSskLztcbmNvbnN0IFJfQ1VTVE9NID0gL1xcKCguKj8pXFwpLztcbmNvbnN0IFJfV0lMRENBUkQgPSAvXFwqL2c7XG5jb25zdCBSX0VYVFJBQ1RfQ0xBU1MgPSAvY2xhc3NcXD1cXFwiKFtcXHNcXFNdKz8pXFxcIi9nO1xuY29uc3QgUl9VTklGSVkgPSAvXFw9KD89W14uXSokKS87XG5cbmxldCBwcmVJbml0Q2xhc3NMaXN0ID0gW107XG5sZXQgaXNJbml0aWFsaXplZCA9IGZhbHNlO1xubGV0IGlzTWFwbGVFbmFibGVkID0gdHJ1ZTtcbmxldCBkb2M7XG5cbmNvbnN0IGVzYyA9IChzZWxlY3Rvcjogc3RyaW5nKSA9PlxuICBzZWxlY3Rvci5yZXBsYWNlKFJfU0VMRUNUT1JfUkVTRVJWRUQsIFJfRVNDQVBFX1JFU0VSVkVEKTtcblxuZXhwb3J0IGNsYXNzIE1hcGxlIHtcbiAgcHJpdmF0ZSBzdGF0aWMgdmFyaWFibGVzOiBNYXBsZVZhcmlhYmxlTW9kZWwgPSB7XG4gICAgYnJlYWtwb2ludDogTUFQTEVfVkFSX0JSRUFLUE9JTlQsXG4gICAgY29sb3I6IE1BUExFX1ZBUl9DT0xPUixcbiAgICBmb250RmFtaWx5OiBNQVBMRV9WQVJfRk9OVF9GQU1JTFksXG4gICAgZm9udFNpemU6IE1BUExFX1ZBUl9GT05UX1NJWkUsXG4gICAgZm9udFdlaWdodDogTUFQTEVfVkFSX0ZPTlRfV0VJR0hULFxuICAgIG1heFdpZHRoOiBNQVBMRV9WQVJfTUFYX1dJRFRILFxuICAgIHNwYWNlcjogTUFQTEVfVkFSX1NQQUNFUixcbiAgICB0cmFuc2l0aW9uOiBNQVBMRV9WQVJfVFJBTlNJVElPTixcbiAgICBidXR0b246IE1BUExFX1ZBUl9CVVRUT04sXG4gICAgYWxlcnQ6IE1BUExFX1ZBUl9BTEVSVCxcbiAgfTtcbiAgcHJpdmF0ZSBzdGF0aWMgYnJlYWtwb2ludE1hcDogYW55ID0ge307XG4gIHByaXZhdGUgc3RhdGljIHV0aWxDbGFzc01hcDogYW55ID0ge307XG4gIHByaXZhdGUgc3RhdGljIHV0aWxQcmVmaXhMaXN0OiBBcnJheTxhbnk+ID0gW107XG4gIHByaXZhdGUgc3RhdGljIHByb3BFeHRlbnNpb25NYXA6IGFueSA9IHt9O1xuICBwcml2YXRlIHN0YXRpYyByYXdDYWNoZTogYW55ID0ge307XG4gIHByaXZhdGUgc3RhdGljIHRlbXBDYWNoZTogYW55ID0ge307XG4gIHB1YmxpYyBzdGF0aWMgb25TdHlsZUFwcGVuZCQ6IEJlaGF2aW9yU3ViamVjdDxhbnk+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChcbiAgICBudWxsLFxuICApO1xuICBwdWJsaWMgc3RhdGljIG9uSW5pdCQ6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoZmFsc2UpO1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgLy8gRmluZCBtaW4gYW5kIG1heCBicmVha3BvaW50c1xuICBwcml2YXRlIHN0YXRpYyBzZXRNaW5BbmRNYXhCcmVha3BvaW50cygpIHtcbiAgICBjb25zdCBicmVha3BvaW50S2V5czogQXJyYXk8c3RyaW5nPiA9IE9iamVjdC5rZXlzKE1hcGxlLmJyZWFrcG9pbnRNYXApO1xuICAgIGNvbnN0IGJyZWFrcG9pbnRzID0gYnJlYWtwb2ludEtleXNcbiAgICAgIC5tYXAoKGtleSkgPT4gKHtcbiAgICAgICAga2V5LFxuICAgICAgICBzaXplOiBwYXJzZUZsb2F0KE1hcGxlLmJyZWFrcG9pbnRNYXBba2V5XSksXG4gICAgICB9KSlcbiAgICAgIC5zb3J0KChhLCBiKSA9PiBhLnNpemUgLSBiLnNpemUpO1xuXG4gICAgQlJFQUtQT0lOVC5taW5LZXkgPSBicmVha3BvaW50c1swXS5rZXk7XG4gICAgQlJFQUtQT0lOVC5tYXhLZXkgPSBicmVha3BvaW50c1ticmVha3BvaW50cy5sZW5ndGggLSAxXS5rZXk7XG4gICAgQlJFQUtQT0lOVC5taW5NZWRpYSA9IEJSRUFLUE9JTlQubWluS2V5ICsgU1VGRklYX01FRElBX1VQO1xuXG4gICAgYnJlYWtwb2ludHMuZm9yRWFjaCgoYnA6IGFueSwgaTogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBuZXh0ID0gYnJlYWtwb2ludHNbaSArIDFdO1xuICAgICAgQlJFQUtQT0lOVC5tZWRpYVticC5rZXkgKyBTVUZGSVhfTUVESUFfVVBdID0gYnAuc2l6ZTtcbiAgICAgIGlmIChuZXh0KSB7XG4gICAgICAgIC8vIFVzZXMgMC4wMnB4IHJhdGhlciB0aGFuIDAuMDFweCB0byB3b3JrIGFyb3VuZCBhIGN1cnJlbnQgcm91bmRpbmcgYnVnIGluIFNhZmFyaS5cbiAgICAgICAgLy8gU2VlIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xNzgyNjFcbiAgICAgICAgQlJFQUtQT0lOVC5tZWRpYVticC5rZXkgKyBTVUZGSVhfTUVESUFfRE9XTl0gPSBuZXh0LnNpemUgLSAwLjAyO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGVEb21FbGVtZW50cyhcbiAgICBzdHlsZUVsZW1lbnRzOiBhbnksXG4gICAgcHJlZml4ID0gJ21hcGxlJyxcbiAgICBkb2N1bWVudD8sXG4gICkge1xuICAgIC8vIFByZXBhcmUgc3R5bGUgZWxlbWVudCBvbiBoZWFkXG4gICAgY29uc3QgZG9jSGVhZCA9IChkb2N1bWVudCB8fCBkb2MpLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gICAgY29uc3QgYnJlYWtwb2ludHMgPSBPYmplY3Qua2V5cyhCUkVBS1BPSU5ULm1lZGlhKVxuICAgICAgLnNvcnQoKGEsIGIpID0+IEJSRUFLUE9JTlQubWVkaWFbYV0gLSBCUkVBS1BPSU5ULm1lZGlhW2JdKVxuICAgICAgLnNvcnQoKGEsIGIpID0+IGEuaW5kZXhPZihTVUZGSVhfTUVESUFfVVApKTtcblxuICAgIGJyZWFrcG9pbnRzXG4gICAgICAuc2xpY2UoYnJlYWtwb2ludHMuaW5kZXhPZihCUkVBS1BPSU5ULm1pbk1lZGlhKSwgYnJlYWtwb2ludHMubGVuZ3RoKVxuICAgICAgLmNvbmNhdChicmVha3BvaW50cy5zbGljZSgwLCBicmVha3BvaW50cy5pbmRleE9mKEJSRUFLUE9JTlQubWluTWVkaWEpKSlcbiAgICAgIC5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgc3R5bGVFbGVtZW50c1trZXldID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICAgIHN0eWxlRWxlbWVudHNba2V5XS5zZXRBdHRyaWJ1dGUoJ2lkJywgYCR7cHJlZml4fS0ke2tleX1gKTtcbiAgICAgICAgZG9jSGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnRzW2tleV0pO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBleHRlbmRQcm9wZXJ0aWVzKCkge1xuICAgIE1hcGxlLnV0aWxQcmVmaXhMaXN0LmZvckVhY2goKGRlZjogYW55KSA9PiB7XG4gICAgICBNYXBsZS51dGlsQ2xhc3NNYXBbZGVmLnByZWZpeF0gPSBNYXBsZS51dGlsQ2xhc3NNYXBbZGVmLnByZWZpeF0gfHwge307XG4gICAgICBNYXBsZS51dGlsQ2xhc3NNYXBbZGVmLnByZWZpeF1bV0lMRENBUkRdID0ge307XG4gICAgICBPYmplY3Qua2V5cyhkZWYubWFwKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgTWFwbGUudXRpbENsYXNzTWFwW2RlZi5wcmVmaXhdW2tleV0gPSB7fTtcbiAgICAgICAgZGVmLnByb3BzLmZvckVhY2goKHByb3ApID0+IHtcbiAgICAgICAgICBNYXBsZS51dGlsQ2xhc3NNYXBbZGVmLnByZWZpeF1bV0lMRENBUkRdID0ge1xuICAgICAgICAgICAgLi4uTWFwbGUudXRpbENsYXNzTWFwW2RlZi5wcmVmaXhdW1dJTERDQVJEXSxcbiAgICAgICAgICAgIFtwcm9wXTogV0lMRENBUkQsXG4gICAgICAgICAgfTtcbiAgICAgICAgICBNYXBsZS51dGlsQ2xhc3NNYXBbZGVmLnByZWZpeF1ba2V5XVtwcm9wXSA9IGRlZi5tYXBba2V5XTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGdldFNlbGVjdG9ycyhcbiAgICBtZWRpYTogc3RyaW5nID0gU1RSX0VNUFRZLFxuICAgIHNlbEtleTogc3RyaW5nID0gU1RSX0VNUFRZLFxuICAgIHV0aWxLZXk6IHN0cmluZyA9IFNUUl9FTVBUWSxcbiAgICB1dGlsVmFsOiBzdHJpbmcgPSBTVFJfRU1QVFksXG4gICAgX3NlbGVjdG9yOiBzdHJpbmcgPSBTVFJfRU1QVFksXG4gICAgaW1wb3J0YW50ID0gZmFsc2UsXG4gICkge1xuICAgIGNvbnN0IG1hcGxlID0gTWFwbGUudXRpbENsYXNzTWFwW3NlbEtleV0gfHwge307XG4gICAgX3NlbGVjdG9yID0gKG1hcGxlLl9zZWxlY3RvciB8fCAnJykgKyBfc2VsZWN0b3I7XG5cbiAgICBjb25zdCBwYXJlbnRTZWxlY3RvciA9IHNlbEtleS5pbmNsdWRlcyhTRVBfT1VURVJfU1BBQ0UpXG4gICAgICA/IHNlbEtleS5zcGxpdChTRVBfT1VURVJfU1BBQ0UpLnBvcCgpLnNwbGl0KFJfU0VQX1NFTF9TUEFDRV9BTEwpLnNoaWZ0KClcbiAgICAgIDogU1RSX0VNUFRZO1xuXG4gICAgY29uc3QgYmFzZVNlbCA9IFtcbiAgICAgIG1lZGlhIHx8IFNUUl9FTVBUWSxcbiAgICAgIG1hcGxlLl9zZWxlY3RvciA/IFNFUF9TRUxFQ1RPUiA6IFNUUl9FTVBUWSxcbiAgICAgIHNlbEtleSxcbiAgICAgIHV0aWxLZXkgPyBTRVBfVVRJTF9LRVkgOiBTVFJfRU1QVFksXG4gICAgICB1dGlsS2V5LFxuICAgICAgdXRpbFZhbCA/IFNFUF9VVElMX1ZBTCA6IFNUUl9FTVBUWSxcbiAgICBdLmpvaW4oU1RSX0VNUFRZKTtcblxuICAgIHJldHVybiBfc2VsZWN0b3JcbiAgICAgIC5zcGxpdCgvLFxccyovKVxuICAgICAgLm1hcCgoc2VsZWN0b3IpID0+XG4gICAgICAgIFtcbiAgICAgICAgICBwYXJlbnRTZWxlY3RvciA/IHBhcmVudFNlbGVjdG9yICsgU1RSX1NQQUNFIDogU1RSX0VNUFRZLFxuICAgICAgICAgIHV0aWxWYWwgPyBTVFJfRE9UIDogU1RSX0VNUFRZLFxuICAgICAgICAgIHV0aWxWYWwgPyBlc2MoYmFzZVNlbCArIHV0aWxWYWwpIDogYFtjbGFzcyo9XCIke2Jhc2VTZWx9XCJdYCxcbiAgICAgICAgICB1dGlsVmFsICYmIGltcG9ydGFudCA/IGVzYyhJTVBPUlRBTlQpIDogU1RSX0VNUFRZLFxuICAgICAgICAgIG1hcGxlLl9zZWxlY3RvciB8fCAhc2VsS2V5IHx8IHNlbEtleS5jaGFyQXQoMCkgPT09IFNFUF9OT19TUEFDRVxuICAgICAgICAgICAgPyBTVFJfRU1QVFlcbiAgICAgICAgICAgIDogU1RSX1NQQUNFLFxuICAgICAgICAgIG1hcGxlLl9zZWxlY3RvclxuICAgICAgICAgICAgPyBTVFJfRU1QVFlcbiAgICAgICAgICAgIDogc2VsS2V5XG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoU0VQX09VVEVSX1NQQUNFICsgcGFyZW50U2VsZWN0b3IsIFNUUl9FTVBUWSlcbiAgICAgICAgICAgICAgICAucmVwbGFjZShSX1NFUF9TRUxfU1BBQ0UsIFNUUl9TUEFDRSlcbiAgICAgICAgICAgICAgICAucmVwbGFjZShSX1NFUF9OT19TUEFDRSwgU1RSX0VNUFRZKSxcbiAgICAgICAgICBzZWxlY3Rvci50cmltKCkuY2hhckF0KDApID09PSBTRVBfTk9fU1BBQ0UgPyBTVFJfRU1QVFkgOiBTVFJfU1BBQ0UsXG4gICAgICAgICAgc2VsZWN0b3JcbiAgICAgICAgICAgIC50cmltKClcbiAgICAgICAgICAgIC5yZXBsYWNlKFJfU0VQX1NFTF9TUEFDRSwgU1RSX1NQQUNFKVxuICAgICAgICAgICAgLnJlcGxhY2UoUl9TRVBfTk9fU1BBQ0UsIFNUUl9FTVBUWSksXG4gICAgICAgIF0uam9pbihTVFJfRU1QVFkpLFxuICAgICAgKVxuICAgICAgLmpvaW4oJywnKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGNhY2hlKG1lZGlhOiBzdHJpbmcsIHNlbGVjdG9yOiBzdHJpbmcsIG1hcFRvQmVDYWNoZWQ6IGFueSkge1xuICAgIGlmICghbWFwVG9CZUNhY2hlZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBQcm9wZXJ0eSBtYXAgbm90IGZvdW5kIGZvciBzZWxlY3RvcjogJHtzZWxlY3Rvcn1gKTtcbiAgICB9XG5cbiAgICBjb25zdCBjYWNoZUtleSA9IGAke21lZGlhfSR7c2VsZWN0b3J9JHtKU09OLnN0cmluZ2lmeShtYXBUb0JlQ2FjaGVkKX1gO1xuICAgIGlmICghQ0FDSEVbY2FjaGVLZXldKSB7XG4gICAgICBNYXBsZS50ZW1wQ2FjaGVbbWVkaWFdID0gTWFwbGUudGVtcENhY2hlW21lZGlhXSB8fCB7fTtcbiAgICAgIE1hcGxlLnRlbXBDYWNoZVttZWRpYV0gPSB7XG4gICAgICAgIC4uLk1hcGxlLnRlbXBDYWNoZVttZWRpYV0sXG4gICAgICAgIFtzZWxlY3Rvcl06IHtcbiAgICAgICAgICAuLi4oTWFwbGUudGVtcENhY2hlW21lZGlhXVtzZWxlY3Rvcl0gfHwge30pLFxuICAgICAgICAgIC4uLm1hcFRvQmVDYWNoZWQsXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgICAgQ0FDSEVbY2FjaGVLZXldID0gMTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBzdHlsZXMobWVkaWE6IHN0cmluZykge1xuICAgIGNvbnN0IGNhY2hlSXRlbSA9IE1hcGxlLnRlbXBDYWNoZVttZWRpYV07XG4gICAgaWYgKCFjYWNoZUl0ZW0pIHtcbiAgICAgIHJldHVybiBTVFJfRU1QVFk7XG4gICAgfVxuXG4gICAgY29uc3Qgc2VsZWN0b3JzID0gT2JqZWN0LmtleXMoY2FjaGVJdGVtKTtcblxuICAgIGlmIChzZWxlY3RvcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gU1RSX0VNUFRZO1xuICAgIH1cblxuICAgIGNvbnN0IGJyZWFrcG9pbnRQYXJ0cyA9IG1lZGlhLnNwbGl0KFNFUF9NRURJQSk7XG4gICAgY29uc3QgYnJlYWtwb2ludERpciA9IGJyZWFrcG9pbnRQYXJ0c1sxXTtcbiAgICBjb25zdCBtZWRpYVF1ZXJ5ID0gYnJlYWtwb2ludERpciA9PT0gU1RSX1VQID8gJ21pbi13aWR0aCcgOiAnbWF4LXdpZHRoJztcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcblxuICAgIC8vIG9wZW4gbWVkaWEgcXVlcnlcbiAgICBpZiAobWVkaWEgIT09IEJSRUFLUE9JTlQubWluTWVkaWEpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGBAbWVkaWEgKCR7bWVkaWFRdWVyeX06ICR7QlJFQUtQT0lOVC5tZWRpYVttZWRpYV19cHgpIHtgKTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IHNlbGVjdG9yIG9mIHNlbGVjdG9ycykge1xuICAgICAgY29uc3QgcHJvcE1hcCA9IGNhY2hlSXRlbVtzZWxlY3Rvcl07XG4gICAgICBpZiAoIXByb3BNYXApIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHByb3BNYXBLZXlzID0gT2JqZWN0LmtleXMocHJvcE1hcCkuZmlsdGVyKChwKSA9PiBwICE9PSBJTVBPUlRBTlQpO1xuICAgICAgaWYgKHByb3BNYXBLZXlzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gb3BlbiBzZWxlY3RvclxuICAgICAgcmVzdWx0LnB1c2goYCR7c2VsZWN0b3J9e2ApO1xuXG4gICAgICAvLyBmaWxsIHNlbGVjdG9yIHdpdGggcHJvcGVydGllc1xuICAgICAgZm9yIChjb25zdCBwcm9wIG9mIHByb3BNYXBLZXlzKSB7XG4gICAgICAgIGNvbnN0IHZhbCA9IHByb3BNYXBbcHJvcF0udG9TdHJpbmcoKTtcbiAgICAgICAgY29uc3QgaW1wb3J0YW50ID1cbiAgICAgICAgICB2YWwuaW5kZXhPZihJTVBPUlRBTlQpIDwgMCAmJiBwcm9wTWFwW0lNUE9SVEFOVF1cbiAgICAgICAgICAgID8gJyAhaW1wb3J0YW50J1xuICAgICAgICAgICAgOiBTVFJfRU1QVFk7XG4gICAgICAgIHJlc3VsdC5wdXNoKFxuICAgICAgICAgIE1hcGxlLnByb3BFeHRlbnNpb25NYXBbcHJvcF1cbiAgICAgICAgICAgID8gTWFwbGUucHJvcEV4dGVuc2lvbk1hcFtwcm9wXSh2YWwsIGltcG9ydGFudClcbiAgICAgICAgICAgIDogYCR7cHJvcH06JHt2YWx9JHtpbXBvcnRhbnR9O2AsXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIC8vIGNsb3NlIHNlbGVjdG9yXG4gICAgICByZXN1bHQucHVzaChgfWApO1xuICAgIH1cblxuICAgIC8vIGNsb3NlIG1lZGlhIHF1ZXJ5XG4gICAgaWYgKG1lZGlhICE9PSBCUkVBS1BPSU5ULm1pbk1lZGlhKSB7XG4gICAgICByZXN1bHQucHVzaChgfWApO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0Lmxlbmd0aCA+IDIgPyByZXN1bHQuam9pbihTVFJfRU1QVFkpIDogU1RSX0VNUFRZO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgZ2VuZXJhdGVXaGl0ZWxpc3Qod2hpdGVsaXN0OiBBcnJheTxzdHJpbmc+ID0gW10pIHtcbiAgICBjb25zdCBjbGFzc0xpc3QgPSBbXTtcbiAgICBmb3IgKGNvbnN0IHV0aWxLZXkgb2Ygd2hpdGVsaXN0KSB7XG4gICAgICBpZiAoIU1hcGxlLnV0aWxDbGFzc01hcFt1dGlsS2V5XSkge1xuICAgICAgICBjbGFzc0xpc3QucHVzaCh1dGlsS2V5KTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHByb3BzID0gT2JqZWN0LmtleXMoTWFwbGUudXRpbENsYXNzTWFwW3V0aWxLZXldKTtcbiAgICAgIGZvciAoY29uc3QgdXRpbFZhbCBvZiBwcm9wcykge1xuICAgICAgICBpZiAodXRpbFZhbC5jaGFyQXQoMCkgPT09IFBSRUZJWF9NQVBMRV9QUk9QKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBicmVha3BvaW50cyA9IE9iamVjdC5rZXlzKE1hcGxlLmJyZWFrcG9pbnRNYXApO1xuICAgICAgICBmb3IgKGNvbnN0IGJwIG9mIGJyZWFrcG9pbnRzKSB7XG4gICAgICAgICAgY29uc3QgbWVkaWFVcCA9IGJwICsgU1VGRklYX01FRElBX1VQO1xuICAgICAgICAgIGNvbnN0IG1lZGlhRG93biA9IGJwICsgU1VGRklYX01FRElBX0RPV047XG4gICAgICAgICAgY29uc3QgdXRpbENsYXNzID0gU0VQX1VUSUxfS0VZICsgdXRpbEtleSArIFNFUF9VVElMX1ZBTCArIHV0aWxWYWw7XG4gICAgICAgICAgaWYgKG1lZGlhVXAgaW4gQlJFQUtQT0lOVC5tZWRpYSkge1xuICAgICAgICAgICAgY2xhc3NMaXN0LnB1c2gobWVkaWFVcCArIHV0aWxDbGFzcyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChtZWRpYURvd24gaW4gQlJFQUtQT0lOVC5tZWRpYSkge1xuICAgICAgICAgICAgY2xhc3NMaXN0LnB1c2gobWVkaWFEb3duICsgdXRpbENsYXNzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgTWFwbGUuZmx5KHByZUluaXRDbGFzc0xpc3QuY29uY2F0KGNsYXNzTGlzdCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgc3BsaXRMYXN0T2NjdXJyZW5jZShzdHIsIGtleSkge1xuICAgIGNvbnN0IHBvcyA9IHN0ci5sYXN0SW5kZXhPZihrZXkpO1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgIGNvbnN0IGZpcnN0UGFydCA9IHN0ci5zdWJzdHJpbmcoMCwgcG9zKTtcbiAgICBjb25zdCBsYXN0UGFydCA9IHN0ci5zdWJzdHJpbmcocG9zICsga2V5Lmxlbmd0aCk7XG4gICAgaWYgKGZpcnN0UGFydCkge1xuICAgICAgcmVzdWx0LnB1c2goZmlyc3RQYXJ0KTtcbiAgICB9XG4gICAgaWYgKGxhc3RQYXJ0KSB7XG4gICAgICByZXN1bHQucHVzaChsYXN0UGFydCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBzcGxpdEZpcnN0T2NjdXJyZW5jZShzdHIsIGtleSkge1xuICAgIGNvbnN0IHBvcyA9IHN0ci5pbmRleE9mKGtleSk7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgY29uc3QgZmlyc3RQYXJ0ID0gc3RyLnN1YnN0cmluZygwLCBwb3MpO1xuICAgIGNvbnN0IGxhc3RQYXJ0ID0gc3RyLnN1YnN0cmluZyhwb3MgKyBrZXkubGVuZ3RoKTtcbiAgICBpZiAoZmlyc3RQYXJ0KSB7XG4gICAgICByZXN1bHQucHVzaChmaXJzdFBhcnQpO1xuICAgIH1cbiAgICBpZiAobGFzdFBhcnQpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGxhc3RQYXJ0KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaW5pdChcbiAgICBkb2N1bWVudCxcbiAgICBlbmFibGVkOiBib29sZWFuLFxuICAgIHV0aWxDbGFzc01hcDogYW55ID0ge30sXG4gICAgd2hpdGVsaXN0OiBBcnJheTxzdHJpbmc+LFxuICAgIHZhcmlhYmxlczogTWFwbGVWYXJpYWJsZU1vZGVsID0gTWFwbGUudmFyaWFibGVzLFxuICAgIHV0aWxQcmVmaXhMaXN0OiBBcnJheTxhbnk+ID0gW10sXG4gICAgcHJvcEV4dGVuc2lvbk1hcDogYW55ID0ge30sXG4gICkge1xuICAgIGlzTWFwbGVFbmFibGVkID0gZW5hYmxlZDtcbiAgICBpZiAoaXNNYXBsZUVuYWJsZWQgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGRvYyA9IGRvY3VtZW50O1xuICAgIGlmIChpc0luaXRpYWxpemVkID09PSBmYWxzZSkge1xuICAgICAgaXNJbml0aWFsaXplZCA9IHRydWU7XG4gICAgICBNYXBsZS52YXJpYWJsZXMgPSB7XG4gICAgICAgIC4uLk1hcGxlLnZhcmlhYmxlcyxcbiAgICAgICAgLi4udmFyaWFibGVzLFxuICAgICAgfTtcbiAgICAgIE1hcGxlQ29sb3JIZWxwZXIuZ2VuZXJhdGVBbHBoYUNvbG9ycyhNYXBsZS52YXJpYWJsZXMuY29sb3IpO1xuICAgICAgTWFwbGUudXRpbENsYXNzTWFwID0ge1xuICAgICAgICAuLi5nZXRNYXBsZVV0aWxpdHlDbGFzc01hcChNYXBsZS52YXJpYWJsZXMpLFxuICAgICAgICAuLi51dGlsQ2xhc3NNYXAsXG4gICAgICB9O1xuICAgICAgTWFwbGUudXRpbFByZWZpeExpc3QgPSBbXG4gICAgICAgIC4uLmdldE1hcGxlVXRpbGl0eVZhcmlhYmxlTWFwKE1hcGxlLnZhcmlhYmxlcyksXG4gICAgICAgIC4uLnV0aWxQcmVmaXhMaXN0LFxuICAgICAgXTtcbiAgICAgIE1hcGxlLnByb3BFeHRlbnNpb25NYXAgPSB7XG4gICAgICAgIC4uLk1BUExFX1BST1BfRVhURU5TSU9OX01BUCxcbiAgICAgICAgLi4ucHJvcEV4dGVuc2lvbk1hcCxcbiAgICAgIH07XG4gICAgICBNYXBsZS5icmVha3BvaW50TWFwID0ge1xuICAgICAgICAuLi5NYXBsZS52YXJpYWJsZXMuYnJlYWtwb2ludCxcbiAgICAgIH07XG4gICAgICBNYXBsZS5zZXRNaW5BbmRNYXhCcmVha3BvaW50cygpO1xuICAgICAgTWFwbGUuY3JlYXRlRG9tRWxlbWVudHMoU1RZTEVfRUxFTUVOVFMpO1xuICAgICAgTWFwbGUuZXh0ZW5kUHJvcGVydGllcygpO1xuICAgICAgTWFwbGUuZ2VuZXJhdGVXaGl0ZWxpc3Qod2hpdGVsaXN0KTtcbiAgICAgIHRoaXMub25Jbml0JC5uZXh0KHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZmluZEFuZEZseShzdHI6IHN0cmluZykge1xuICAgIGlmIChpc01hcGxlRW5hYmxlZCA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHN0cikge1xuICAgICAgTWFwbGUuZmx5KFxuICAgICAgICAoc3RyLm1hdGNoKFJfRVhUUkFDVF9DTEFTUykgfHwgW10pXG4gICAgICAgICAgLmpvaW4oJyAnKVxuICAgICAgICAgIC5yZXBsYWNlKC9jbGFzc1xcPVxcXCIvZywgJycpXG4gICAgICAgICAgLnJlcGxhY2UoL1wiL2csICcnKSxcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBmbHkoY2xhc3NMaXN0OiBhbnkpIHtcbiAgICBpZiAoaXNNYXBsZUVuYWJsZWQgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChpc0luaXRpYWxpemVkID09PSBmYWxzZSkge1xuICAgICAgcHJlSW5pdENsYXNzTGlzdCA9IHByZUluaXRDbGFzc0xpc3QuY29uY2F0KGNsYXNzTGlzdCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFjbGFzc0xpc3QgfHwgY2xhc3NMaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHJhd0NhY2hlS2V5ID0gQXJyYXkuaXNBcnJheShjbGFzc0xpc3QpXG4gICAgICA/IGNsYXNzTGlzdC5qb2luKCcgJylcbiAgICAgIDogY2xhc3NMaXN0O1xuXG4gICAgaWYgKE1hcGxlLnJhd0NhY2hlW3Jhd0NhY2hlS2V5XSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBNYXBsZS5yYXdDYWNoZVtyYXdDYWNoZUtleV0gPSAxO1xuICAgIGlmIChBcnJheS5pc0FycmF5KGNsYXNzTGlzdCkgPT09IGZhbHNlKSB7XG4gICAgICBjbGFzc0xpc3QgPSBjbGFzc0xpc3Quc3BsaXQoL1xccysvZyk7XG4gICAgfVxuXG4gICAgY2xhc3NMaXN0ID0gTWFwbGUudW5pZnlVdGlsaXR5Q2xhc3MoY2xhc3NMaXN0KTtcblxuICAgIE1hcGxlLnRlbXBDYWNoZSA9IHt9O1xuXG4gICAgZm9yIChjb25zdCBjbGFzc0l0ZW0gb2YgY2xhc3NMaXN0KSB7XG4gICAgICAvLyBDaGVjayB3aGV0aGVyIHRoZSBzdHlsZXMgd2lsbCBoYXZlICFpbXBvcnRhbnQgZmxhZyBvciBub3RcbiAgICAgIGNvbnN0IGltcG9ydGFudCA9IGNsYXNzSXRlbS5jaGFyQXQoY2xhc3NJdGVtLmxlbmd0aCAtIDEpID09PSBJTVBPUlRBTlQ7XG4gICAgICBjb25zdCBjbGFzc0l0ZW1XaXRob3V0SW1wb3J0YW50ID0gY2xhc3NJdGVtLnJlcGxhY2UoSU1QT1JUQU5ULCBTVFJfRU1QVFkpO1xuXG4gICAgICBsZXQgcGFydHMgPSBNYXBsZS5zcGxpdExhc3RPY2N1cnJlbmNlKFxuICAgICAgICBjbGFzc0l0ZW1XaXRob3V0SW1wb3J0YW50LFxuICAgICAgICBTRVBfVVRJTF9WQUwsXG4gICAgICApO1xuXG4gICAgICAvLyBFeHRyYWN0IHV0aWxpdHkgdmFsdWVcbiAgICAgIGNvbnN0IHV0aWxWYWwgPSBwYXJ0cy5sZW5ndGggPT09IDEgPyBudWxsIDogcGFydHMucG9wKCk7XG5cbiAgICAgIC8vIEV4dHJhY3QgbWVkaWEgcXVlcnlcbiAgICAgIGNvbnN0IG1lZGlhID1cbiAgICAgICAgT2JqZWN0LmtleXMoQlJFQUtQT0lOVC5tZWRpYSkuZmluZChcbiAgICAgICAgICAoa2V5OiBzdHJpbmcpID0+IGNsYXNzSXRlbS5pbmRleE9mKGtleSkgPT09IDAsXG4gICAgICAgICkgfHwgQlJFQUtQT0lOVC5taW5NZWRpYTtcblxuICAgICAgcGFydHMgPSBNYXBsZS5zcGxpdEZpcnN0T2NjdXJyZW5jZShwYXJ0cy5qb2luKFNUUl9FTVBUWSksIG1lZGlhKVxuICAgICAgICAuam9pbihTVFJfRU1QVFkpXG4gICAgICAgIC5zcGxpdChTRVBfVVRJTF9LRVkpXG4gICAgICAgIC5maWx0ZXIoKHA6IHN0cmluZykgPT4gISFwKTtcblxuICAgICAgLy8gRXhhY3QgdXRpbGl0eSBjbGFzc1xuICAgICAgY29uc3QgdXRpbEtleSA9IHBhcnRzLmxlbmd0aCA+PSAxID8gcGFydHMucG9wKCkgOiBudWxsO1xuXG4gICAgICAvLyBFeHRyYWN0IHNlbGVjdG9yXG4gICAgICBjb25zdCBzZWxLZXkgPSBwYXJ0cy5qb2luKFNFUF9VVElMX0tFWSk7XG5cbiAgICAgIC8vIEdldCBzdHlsZSBtYXBcbiAgICAgIGNvbnN0IG1hcGxlID0gTWFwbGUudXRpbENsYXNzTWFwW3V0aWxLZXldO1xuXG4gICAgICAvLyBXaXRob3V0IGEgc3R5bGUgbWFwIHdlIGNhbid0IGNyZWF0ZSBzdHlsZXNcbiAgICAgIGlmICghbWFwbGUpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIENhY2hlIGRlZmF1bHQgc3R5bGVzIHdpdGggc2VsZWN0b3JcbiAgICAgIGlmIChtYXBsZS5fZGVmYXVsdCkge1xuICAgICAgICBPYmplY3Qua2V5cyhtYXBsZS5fZGVmYXVsdCkuZm9yRWFjaCgobWVkaWFJdGVtKSA9PiB7XG4gICAgICAgICAgTWFwbGUuY2FjaGUoXG4gICAgICAgICAgICBtZWRpYUl0ZW0sXG4gICAgICAgICAgICBNYXBsZS5nZXRTZWxlY3RvcnMoXG4gICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgIHNlbEtleSxcbiAgICAgICAgICAgICAgdXRpbEtleSxcbiAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgbWFwbGUuX3NlbGVjdG9yLFxuICAgICAgICAgICAgICBpbXBvcnRhbnQsXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAuLi5tYXBsZS5fY29tbW9uLFxuICAgICAgICAgICAgICAuLi5tYXBsZVttYXBsZS5fZGVmYXVsdFttZWRpYUl0ZW1dXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIENhY2hlIHV0aWxpdHkgc3R5bGVzIHdpdGggc2VsZWN0b3JcbiAgICAgIGlmICh1dGlsVmFsKSB7XG4gICAgICAgIGNvbnN0IGMgPSBjbGFzc0l0ZW0ucmVwbGFjZShJTVBPUlRBTlQsIFNUUl9FTVBUWSk7XG4gICAgICAgIGNvbnN0IHVjbSA9IE1hcGxlLnV0aWxDbGFzc01hcDtcblxuICAgICAgICAvLyNyZWdpb24gV2lsZGNhcmQgc2VsZWN0b3JzXG4gICAgICAgIC8vICo6dXRpbC1rZXlcbiAgICAgICAgLy8gKjp1dGlsLWtleT11dGlsLXZhbFxuICAgICAgICAvLyAqLnNlbGVjdG9yOnV0aWwta2V5PXV0aWwtdmFsXG4gICAgICAgIC8vICo6c2VsZWN0b3Ita2V5OnV0aWwta2V5PXV0aWwtdmFsXG4gICAgICAgIGNvbnN0IHdjTWVkaWEgPSBjLnJlcGxhY2UobWVkaWEsIFdJTERDQVJEKTtcblxuICAgICAgICAvLyBtZWRpYToqXG4gICAgICAgIC8vIG1lZGlhLnNlbGVjdG9yOipcbiAgICAgICAgLy8gbWVkaWE6c2VsZWN0b3Ita2V5OipcbiAgICAgICAgY29uc3Qgd2N1dGlsS2V5ID0gYy5yZXBsYWNlKFJfU0VQX1VUSUxfS0VZLCBgOiR7V0lMRENBUkR9YCk7XG5cbiAgICAgICAgLy8gbWVkaWE6dXRpbC1rZXk9KlxuICAgICAgICAvLyBtZWRpYS5zZWxlY3Rvcjp1dGlsLWtleT0qXG4gICAgICAgIC8vIG1lZGlhOnNlbGVjdG9yLWtleTp1dGlsLWtleT0qXG4gICAgICAgIGNvbnN0IHdjdXRpbFZhbCA9IGMucmVwbGFjZShSX1NFUF9VVElMX1ZBTCwgYD0ke1dJTERDQVJEfWApO1xuXG4gICAgICAgIC8vICo6KlxuICAgICAgICAvLyAqLnNlbGVjdG9yOipcbiAgICAgICAgLy8gKjpzZWxlY3Rvci1rZXk6KlxuICAgICAgICBjb25zdCB3Y01lZGlhS2V5ID0gd2NNZWRpYS5yZXBsYWNlKFJfU0VQX1VUSUxfS0VZLCBgOiR7V0lMRENBUkR9YCk7XG5cbiAgICAgICAgLy8gKjp1dGlsLWtleT0qXG4gICAgICAgIC8vICouc2VsZWN0b3I6dXRpbC1rZXk9KlxuICAgICAgICAvLyAqOnNlbGVjdG9yLWtleTp1dGlsLWtleT0qXG4gICAgICAgIGNvbnN0IHdjTWVkaWFWYWwgPSB3Y3V0aWxWYWwucmVwbGFjZShtZWRpYSwgV0lMRENBUkQpO1xuICAgICAgICAvLyNlbmRyZWdpb25cblxuICAgICAgICBjb25zdCBzZWxlY3RvciA9IE1hcGxlLmdldFNlbGVjdG9ycyhcbiAgICAgICAgICBtZWRpYSxcbiAgICAgICAgICBzZWxLZXksXG4gICAgICAgICAgdXRpbEtleSxcbiAgICAgICAgICB1dGlsVmFsLFxuICAgICAgICAgIG1hcGxlLl9zZWxlY3RvcixcbiAgICAgICAgICBpbXBvcnRhbnQsXG4gICAgICAgICk7XG5cbiAgICAgICAgTWFwbGUuY2FjaGUobWVkaWEsIHNlbGVjdG9yLCB7XG4gICAgICAgICAgLi4ubWFwbGUuX2NvbW1vbixcbiAgICAgICAgICAuLi5tYXBsZVt1dGlsVmFsXSxcbiAgICAgICAgICAuLi5KU09OLnBhcnNlKFxuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoXG4gICAgICAgICAgICAgIG1hcGxlW3V0aWxWYWwucmVwbGFjZShSX0NVU1RPTSwgV0lMRENBUkQpXSB8fCB7fSxcbiAgICAgICAgICAgICkucmVwbGFjZShcbiAgICAgICAgICAgICAgUl9XSUxEQ0FSRCxcbiAgICAgICAgICAgICAgdXRpbEtleSA9PT0gJ2NvbnRlbnQnXG4gICAgICAgICAgICAgICAgPyB1dGlsVmFsLnJlcGxhY2UoUl9DVVNUT00sICckMScpXG4gICAgICAgICAgICAgICAgOiB1dGlsVmFsLnJlcGxhY2UoUl9DVVNUT00sICckMScpLnJlcGxhY2UoUl9TRVBfVkFMX1NQQUNFLCAnICcpLFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICApLFxuICAgICAgICAgIC4uLih1Y21bd2NNZWRpYUtleV0gfHwge30pLFxuICAgICAgICAgIC4uLih1Y21bd2N1dGlsS2V5XSB8fCB7fSksXG4gICAgICAgICAgLi4uKHVjbVt3Y01lZGlhVmFsXSB8fCB7fSksXG4gICAgICAgICAgLi4uKHVjbVt3Y3V0aWxWYWxdIHx8IHt9KSxcbiAgICAgICAgICAuLi4odWNtW3djTWVkaWFdIHx8IHt9KSxcbiAgICAgICAgICAuLi4odWNtW2NdIHx8IHt9KSxcbiAgICAgICAgICBbSU1QT1JUQU5UXTogaW1wb3J0YW50LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyNyZWdpb24gR2VuZXJhdGUgc3R5bGVzXG4gICAgLy8gR2VuZXJhdGUgbWluIG1lZGlhIHF1ZXJ5IHN0eWxlc1xuICAgIGNvbnN0IG1pbk1lZGlhU3R5bGVzID0gTWFwbGUuc3R5bGVzKEJSRUFLUE9JTlQubWluTWVkaWEpO1xuICAgIGlmIChtaW5NZWRpYVN0eWxlcykge1xuICAgICAgTWFwbGUuYXBwZW5kU3R5bGUoXG4gICAgICAgIFNUWUxFX0VMRU1FTlRTLFxuICAgICAgICBCUkVBS1BPSU5ULm1pbk1lZGlhLFxuICAgICAgICBtaW5NZWRpYVN0eWxlcyxcbiAgICAgICAgZmFsc2UsXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIEdlbmVyYXRlIG1lZGlhIHF1ZXJ5IHN0eWxlc1xuICAgIGNvbnN0IG1lZGlhUXVlcnlTdHlsZXMgPSB7fTtcbiAgICBPYmplY3Qua2V5cyhNYXBsZS50ZW1wQ2FjaGUpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgaWYgKGtleSAhPT0gQlJFQUtQT0lOVC5taW5NZWRpYSkge1xuICAgICAgICBtZWRpYVF1ZXJ5U3R5bGVzW2tleV0gPSBtZWRpYVF1ZXJ5U3R5bGVzW2tleV0gfHwgJyc7XG4gICAgICAgIG1lZGlhUXVlcnlTdHlsZXNba2V5XSArPSBNYXBsZS5zdHlsZXMoa2V5KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBPYmplY3Qua2V5cyhtZWRpYVF1ZXJ5U3R5bGVzKS5mb3JFYWNoKChrZXkpID0+XG4gICAgICBNYXBsZS5hcHBlbmRTdHlsZShTVFlMRV9FTEVNRU5UUywga2V5LCBtZWRpYVF1ZXJ5U3R5bGVzW2tleV0sIGZhbHNlKSxcbiAgICApO1xuICAgIC8vI2VuZHJlZ2lvblxuICB9XG5cbiAgcHVibGljIHN0YXRpYyB1bmlmeVV0aWxpdHlDbGFzcyhjbGFzc0xpc3QpIHtcbiAgICBjb25zdCBjbGFzc2VzID0gY2xhc3NMaXN0LnJlZHVjZSgoYWNjLCBwcmV2KSA9PiB7XG4gICAgICBjb25zdCBleGlzdGluZ1N0eWxlSW5kZXggPSBhY2MuZmluZEluZGV4KFxuICAgICAgICAocCkgPT5cbiAgICAgICAgICAoKHAgfHwgJycpLnNwbGl0KFJfVU5JRklZKSB8fCBbXSlbMF0gPT09XG4gICAgICAgICAgKChwcmV2IHx8ICcnKS5zcGxpdChSX1VOSUZJWSkgfHwgW10pWzBdLFxuICAgICAgKTtcbiAgICAgIGlmIChleGlzdGluZ1N0eWxlSW5kZXggPCAwKSB7XG4gICAgICAgIGFjYy5wdXNoKHByZXYpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWNjW2V4aXN0aW5nU3R5bGVJbmRleF0gPSBwcmV2O1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCBbXSk7XG4gICAgcmV0dXJuIGNsYXNzZXM7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGFwcGVuZFN0eWxlKFxuICAgIHN0eWxlRWxlbWVudHM6IGFueSxcbiAgICBicDogc3RyaW5nLFxuICAgIHN0eWxlOiBzdHJpbmcsXG4gICAgc2lsZW50ID0gdHJ1ZSxcbiAgKSB7XG4gICAgc3R5bGVFbGVtZW50c1ticF0uYXBwZW5kQ2hpbGQoZG9jLmNyZWF0ZVRleHROb2RlKHN0eWxlKSk7XG5cbiAgICBpZiAoIXNpbGVudCkge1xuICAgICAgTWFwbGUub25TdHlsZUFwcGVuZCQubmV4dCh7IGJwLCBzdHlsZSB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGlzTWVkaWFWYWxpZChtZWRpYTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIG1lZGlhIGluIEJSRUFLUE9JTlQubWVkaWE7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGlzQnJlYWtwb2ludFZhbGlkKGJyZWFrcG9pbnQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBicmVha3BvaW50IGluIE1hcGxlLmJyZWFrcG9pbnRNYXA7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGlzTWVkaWFNYXRjaGVzV2l0aEJyZWFrcG9pbnQoXG4gICAgbWVkaWE6IHN0cmluZyxcbiAgICBicmVha3BvaW50OiBzdHJpbmcsXG4gICk6IGJvb2xlYW4ge1xuICAgIGlmICghTWFwbGUuaXNCcmVha3BvaW50VmFsaWQoYnJlYWtwb2ludCkgfHwgIU1hcGxlLmlzTWVkaWFWYWxpZChtZWRpYSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBtZWRpYVNpemUgPSBCUkVBS1BPSU5ULm1lZGlhW21lZGlhXTtcbiAgICBjb25zdCBicmVha3BvaW50U2l6ZSA9IHBhcnNlRmxvYXQoTWFwbGUuYnJlYWtwb2ludE1hcFticmVha3BvaW50XSk7XG5cbiAgICBpZiAobWVkaWEuaW5jbHVkZXMoU1VGRklYX01FRElBX0RPV04pKSB7XG4gICAgICByZXR1cm4gYnJlYWtwb2ludFNpemUgPD0gbWVkaWFTaXplO1xuICAgIH1cblxuICAgIGlmIChtZWRpYS5pbmNsdWRlcyhTVUZGSVhfTUVESUFfVVApKSB7XG4gICAgICByZXR1cm4gYnJlYWtwb2ludFNpemUgPj0gbWVkaWFTaXplO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0VmFsaWRNZWRpYU1hcCgpOiBhbnkge1xuICAgIHJldHVybiB7IC4uLkJSRUFLUE9JTlQubWVkaWEgfTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TWluTWVkaWEoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gQlJFQUtQT0lOVC5taW5NZWRpYTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TWluQnJlYWtwb2ludCgpOiBzdHJpbmcge1xuICAgIHJldHVybiBCUkVBS1BPSU5ULm1pbktleTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TWFwcGVkTWVkaWFPck1pbihtZWRpYTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gTWFwbGUuaXNNZWRpYVZhbGlkKG1lZGlhKSA/IG1lZGlhIDogTWFwbGUuZ2V0TWluTWVkaWEoKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TWFwcGVkTWVkaWFPck51bGwobWVkaWE6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIE1hcGxlLmlzTWVkaWFWYWxpZChtZWRpYSkgPyBtZWRpYSA6IG51bGw7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldE1hcHBlZEJyZWFrcG9pbnRPck1pbihicmVha3BvaW50OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBNYXBsZS5pc0JyZWFrcG9pbnRWYWxpZChicmVha3BvaW50KVxuICAgICAgPyBicmVha3BvaW50XG4gICAgICA6IE1hcGxlLmdldE1pbkJyZWFrcG9pbnQoKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TWFwcGVkQnJlYWtwb2ludE9yTnVsbChicmVha3BvaW50OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBNYXBsZS5pc0JyZWFrcG9pbnRWYWxpZChicmVha3BvaW50KSA/IGJyZWFrcG9pbnQgOiBudWxsO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRWYXJpYWJsZXMoKTogTWFwbGVWYXJpYWJsZU1vZGVsIHtcbiAgICByZXR1cm4geyAuLi5NYXBsZS52YXJpYWJsZXMgfTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZmlsbEluVGhlR2FwcyhicmVha3BvaW50TWFwKTogYW55IHtcbiAgICBjb25zdCBmdWxsQnJlYWtwb2ludE1hcCA9IE1hcGxlLmdldFZhcmlhYmxlcygpLmJyZWFrcG9pbnQ7XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGZ1bGxCcmVha3BvaW50TWFwKTtcbiAgICBjb25zdCBtaW5LZXkgPSBrZXlzLmZpbmQoKGtleSkgPT4ga2V5IGluIGJyZWFrcG9pbnRNYXApO1xuICAgIHJldHVybiBrZXlzXG4gICAgICAuc29ydCgoYSwgYikgPT4gZnVsbEJyZWFrcG9pbnRNYXBbYV0gLSBmdWxsQnJlYWtwb2ludE1hcFtiXSlcbiAgICAgIC5yZWR1Y2UoKGFjYywga2V5LCBpKSA9PiB7XG4gICAgICAgIGNvbnN0IG5leHRLZXkgPSBrZXlzW2kgKyAxXTtcbiAgICAgICAgaWYgKGtleSBpbiBhY2MgPT09IGZhbHNlKSB7XG4gICAgICAgICAgYWNjID0ge1xuICAgICAgICAgICAgLi4uYWNjLFxuICAgICAgICAgICAgW2tleV06XG4gICAgICAgICAgICAgIGtleSBpbiBicmVha3BvaW50TWFwID8gYnJlYWtwb2ludE1hcFtrZXldIDogYnJlYWtwb2ludE1hcFttaW5LZXldLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5leHRLZXkgJiYgIWJyZWFrcG9pbnRNYXBbbmV4dEtleV0pIHtcbiAgICAgICAgICBhY2MgPSB7XG4gICAgICAgICAgICAuLi5hY2MsXG4gICAgICAgICAgICBbbmV4dEtleV06IGFjY1trZXldLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgIH0sIHt9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaXNCcmVha3BvaW50TWFwKGJyZWFrcG9pbnRNYXApOiBhbnkge1xuICAgIGlmICh0eXBlb2YgYnJlYWtwb2ludE1hcCA9PT0gJ29iamVjdCcgJiYgYnJlYWtwb2ludE1hcCAhPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKE1hcGxlLmdldFZhcmlhYmxlcygpLmJyZWFrcG9pbnQpLnNvbWUoXG4gICAgICAgIChrZXkpID0+IGJyZWFrcG9pbnRNYXAgJiYga2V5IGluIGJyZWFrcG9pbnRNYXAsXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiJdfQ==