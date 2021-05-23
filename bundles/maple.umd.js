(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs'), require('@angular/common'), require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('maple', ['exports', 'rxjs', '@angular/common', '@angular/core'], factory) :
    (global = global || self, factory(global.maple = {}, global.rxjs, global.ng.common, global.ng.core));
}(this, (function (exports, rxjs, common, core) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __createBinding(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    }

    function __exportStar(m, exports) {
        for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    // tslint:disable: no-bitwise
    var MapleColorHelper = /** @class */ (function () {
        function MapleColorHelper() {
        }
        MapleColorHelper.getContrastColor = function (hexColor) {
            if (!hexColor) {
                return '';
            }
            var hex = hexColor.replace('#', '');
            if (hex.length === 3) {
                hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
            }
            var r = parseInt(hex.substr(0, 2), 16);
            var g = parseInt(hex.substr(2, 2), 16);
            var b = parseInt(hex.substr(4, 2), 16);
            var yiq = (r * 299 + g * 587 + b * 114) / 1000;
            return yiq >= 128 ? '#000' : '#fff';
        };
        MapleColorHelper.alpha2hex = function (alpha) {
            alpha = ((1 << 8) + Math.round(parseFloat(alpha) * 255))
                .toString(16)
                .slice(1);
            return alpha === 'ff' ? '' : alpha;
        };
        MapleColorHelper.hex8 = function (hex, opacity) {
            if (opacity === void 0) { opacity = 1; }
            return "#" + MapleColorHelper.hex2Short(hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (m, r, g, b) { return '#' + r + r + g + g + b + b; }) + MapleColorHelper.alpha2hex(opacity.toString()));
        };
        MapleColorHelper.hex2Short = function (hex) {
            if (hex.length > 6) {
                var hexArr = hex.replace('#', '').split('');
                return hexArr[0] === hexArr[1] &&
                    hexArr[2] === hexArr[3] &&
                    hexArr[4] === hexArr[5] &&
                    hexArr[6] === hexArr[7]
                    ? hexArr[0] + hexArr[2] + hexArr[4] + (hexArr[6] || '')
                    : hexArr.join('');
            }
            return hex;
        };
        MapleColorHelper.generateAlphaColors = function (color) {
            Object.keys(color)
                .filter(function (key) { return color[key].charAt(0) === '#' && key !== 'transparent'; })
                .forEach(function (key) {
                [0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1].forEach(function (opacity) {
                    color[key + "-" + opacity * 100] = MapleColorHelper.hex8(color[key], opacity);
                });
            });
            return color;
        };
        return MapleColorHelper;
    }());

    var MAPLE_PROP_EXTENSION_MAP = {
        'margin-x': function (val, important) {
            return "margin-left:" + val + " " + important + ";margin-right:" + val + " " + important + ";";
        },
        'margin-y': function (val, important) {
            return "margin-top:" + val + " " + important + ";margin-bottom:" + val + " " + important + ";";
        },
        'padding-x': function (val, important) {
            return "padding-left:" + val + " " + important + ";padding-right:" + val + " " + important + ";";
        },
        'padding-y': function (val, important) {
            return "padding-top:" + val + " " + important + ";padding-bottom:" + val + " " + important + ";";
        },
        link: function (val, important) { return "\n    color:" + val + " " + important + ";\n  "; },
        theme: function (val, important) { return "\n    background-color:" + val + " " + important + ";\n    border-color:" + val + " " + important + ";\n    color:" + MapleColorHelper.getContrastColor(val) + " " + important + ";\n  "; },
        'theme-outline': function (val, important) { return "\n    background-color: " + MapleColorHelper.getContrastColor(val) + " " + important + ";\n    border-color:" + val + " " + important + ";\n    color:" + val + " " + important + ";\n  "; },
    };

    var getMapleUtilityClassMap = function (_a) {
        var fontFamily = _a.fontFamily, fontSize = _a.fontSize, fontWeight = _a.fontWeight, maxWidth = _a.maxWidth, spacer = _a.spacer, transition = _a.transition, button = _a.button, alert = _a.alert;
        var buttonCommonStyles = {
            display: 'inline-flex',
            'align-items': 'center',
            'justify-content': 'center',
            'font-weight': button.normal.fontWeight,
            'user-select': 'none',
            'border-style': 'solid',
            'white-space': 'nowrap',
            'border-width': button.normal.borderWidth,
            'border-radius': button.normal.borderRadius,
            'font-size': button.normal.fontSize,
            'line-height': button.normal.lineHeight,
            'text-decoration': 'none',
            'text-transform': button.normal.textCase || 'none',
            'letter-spacing': button.normal.letterSpacing || 'normal',
            padding: button.normal.padding,
            transition: "\n      color " + button.transitionDuration + " " + button.transitionTiming + ",\n      background-color " + button.transitionDuration + " " + button.transitionTiming + ",\n      border-color " + button.transitionDuration + " " + button.transitionTiming + "\n    ",
        };
        var alertCommonStyles = {
            display: 'flex',
            'align-items': 'center',
            'justify-content': 'flex-start',
            'font-weight': alert.normal.fontWeight,
            'user-select': 'none',
            'border-style': 'solid',
            'border-width': alert.normal.borderWidth,
            'border-radius': alert.normal.borderRadius,
            'font-size': alert.normal.fontSize,
            'line-height': alert.normal.lineHeight,
            'text-decoration': 'none',
            padding: alert.normal.padding,
        };
        return {
            alert: {
                _common: alertCommonStyles,
            },
            'alert-outline': {
                _common: alertCommonStyles,
            },
            'alert-size': {
                small: {
                    'border-width': alert.small.borderWidth,
                    'border-radius': alert.small.borderRadius,
                    'font-size': alert.small.fontSize,
                    'font-weight': alert.small.fontWeight,
                    'line-height': alert.small.lineHeight,
                    padding: alert.small.padding,
                },
                normal: {
                    'border-width': alert.normal.borderWidth,
                    'border-radius': alert.normal.borderRadius,
                    'font-size': alert.normal.fontSize,
                    'font-weight': alert.normal.fontWeight,
                    'line-height': alert.normal.lineHeight,
                    padding: alert.normal.padding,
                },
                medium: {
                    'border-width': alert.medium.borderWidth,
                    'border-radius': alert.medium.borderRadius,
                    'font-size': alert.medium.fontSize,
                    'font-weight': alert.medium.fontWeight,
                    'line-height': alert.medium.lineHeight,
                    padding: alert.medium.padding,
                },
                large: {
                    'border-width': alert.large.borderWidth,
                    'border-radius': alert.large.borderRadius,
                    'font-size': alert.large.fontSize,
                    'font-weight': alert.large.fontWeight,
                    'line-height': alert.large.lineHeight,
                    padding: alert.large.padding,
                },
            },
            // animation
            animation: {
                '*': { animation: '*' },
            },
            // background-image
            bgi: {
                none: { 'background-image': 'none' },
                '*': { 'background-image': 'url("*")' },
            },
            // background-repeat
            'bg-repeat': {
                no: { 'background-repeat': 'no-repeat' },
                yes: { 'background-repeat': 'repeat' },
                '*': { 'background-repeat': '*' },
            },
            // border
            b: {
                none: { border: 'none' },
                '*': { border: '*' },
            },
            // border-radius
            br: {
                full: { 'border-radius': '100%' },
                half: { 'border-radius': '50%' },
                quarter: { 'border-radius': '25%' },
                0: { 'border-radius': 0 },
                '*': { 'border-radius': '*' },
            },
            // border-spacing
            'border-spacing': {
                0: { 'border-spacing': 0 },
                '*': { 'border-spacing': '*' },
            },
            // border-collapse
            'border-collapse': {
                collapse: { 'border-collapse': 'collapse' },
                revert: { 'border-collapse': 'revert' },
                separate: { 'border-collapse': 'separate' },
                '*': { 'border-collapse': '*' },
            },
            // box-shadow
            bs: {
                none: { 'box-shadow': 'none' },
                '*': { 'box-shadow': '*' },
            },
            bw: {
                _common: { 'border-style': 'solid' },
                0: { 'border-width': '0' },
                '*': { 'border-width': '*' },
            },
            'bw-top': {
                _common: { 'border-top-style': 'solid' },
                0: { 'border-top-width': '0' },
                '*': { 'border-top-width': '*' },
            },
            'bw-bottom': {
                _common: { 'border-bottom-style': 'solid' },
                0: { 'border-bottom-width': '0' },
                '*': { 'border-bottom-width': '*' },
            },
            'bw-left': {
                _common: { 'border-left-style': 'solid' },
                0: { 'border-left-width': '0' },
                '*': { 'border-left-width': '*' },
            },
            'bw-right': {
                _common: { 'border-right-style': 'solid' },
                0: { 'border-right-width': '0' },
                '*': { 'border-right-width': '*' },
            },
            link: {
                _common: __assign(__assign({}, buttonCommonStyles), { border: 'none', 'text-decoration': 'underline', 'background-color': 'transparent' }),
            },
            btn: {
                _common: buttonCommonStyles,
            },
            'btn-outline': {
                _common: buttonCommonStyles,
            },
            'btn-size': {
                small: {
                    'border-width': button.small.borderWidth,
                    'border-radius': button.small.borderRadius,
                    'font-size': button.small.fontSize,
                    'font-weight': button.small.fontWeight,
                    'line-height': button.small.lineHeight,
                    'text-transform': button.small.textCase || 'none',
                    'letter-spacing': button.small.letterSpacing || 'normal',
                    padding: button.small.padding,
                },
                normal: {
                    'border-width': button.normal.borderWidth,
                    'border-radius': button.normal.borderRadius,
                    'font-size': button.normal.fontSize,
                    'font-weight': button.normal.fontWeight,
                    'line-height': button.normal.lineHeight,
                    'text-transform': button.normal.textCase || 'none',
                    'letter-spacing': button.normal.letterSpacing || 'normal',
                    padding: button.normal.padding,
                },
                medium: {
                    'border-width': button.medium.borderWidth,
                    'border-radius': button.medium.borderRadius,
                    'font-size': button.medium.fontSize,
                    'font-weight': button.medium.fontWeight,
                    'line-height': button.medium.lineHeight,
                    'text-transform': button.medium.textCase || 'none',
                    'letter-spacing': button.medium.letterSpacing || 'normal',
                    padding: button.medium.padding,
                },
                large: {
                    'border-width': button.large.borderWidth,
                    'border-radius': button.large.borderRadius,
                    'font-size': button.large.fontSize,
                    'font-weight': button.large.fontWeight,
                    'line-height': button.large.lineHeight,
                    'text-transform': button.large.textCase || 'none',
                    'letter-spacing': button.large.letterSpacing || 'normal',
                    padding: button.large.padding,
                },
            },
            // mix-blend-mode
            blend: {
                'color-burn': { 'mix-blend-mode': 'color-burn' },
                'color-dodge': { 'mix-blend-mode': 'color-dodge' },
                'hard-light': { 'mix-blend-mode': 'hard-light' },
                'soft-light': { 'mix-blend-mode': 'soft-light' },
                color: { 'mix-blend-mode': 'color' },
                darken: { 'mix-blend-mode': 'darken' },
                difference: { 'mix-blend-mode': 'difference' },
                exclusion: { 'mix-blend-mode': 'exclusion' },
                hue: { 'mix-blend-mode': 'hue' },
                inherit: { 'mix-blend-mode': 'inherit' },
                lighten: { 'mix-blend-mode': 'lighten' },
                luminosity: { 'mix-blend-mode': 'luminosity' },
                multiply: { 'mix-blend-mode': 'multiply' },
                normal: { 'mix-blend-mode': 'normal' },
                overlay: { 'mix-blend-mode': 'overlay' },
                saturation: { 'mix-blend-mode': 'saturation' },
                screen: { 'mix-blend-mode': 'screen' },
            },
            // backdrop blur
            'backdrop-blur': {
                0: { 'backdrop-filter': 'blur(0)' },
                '*': { 'backdrop-filter': 'blur(*)' },
            },
            // filter invert
            invert: {
                full: { filter: 'invert(1)' },
                none: { filter: 'invert(0)' },
                '*': { filter: 'invert(*)' },
            },
            grayscale: {
                full: { filter: 'grayscale(1)' },
                none: { filter: 'grayscale(0)' },
                '*': { filter: 'grayscale(*)' },
            },
            content: {
                '*': { content: '"*"' },
            },
            // element attribute
            attr: {
                '*': { content: 'attr(*)' },
            },
            // column-count
            'col-count': {
                1: { 'column-count': 1 },
                2: { 'column-count': 2 },
                3: { 'column-count': 3 },
                4: { 'column-count': 4 },
                5: { 'column-count': 5 },
                '*': { 'column-count': '*' },
            },
            // column-rule-width
            'col-bw': {
                _common: { 'column-rule-width': 'solid' },
                0: { 'column-rule-width': '0' },
                '*': { 'column-rule-width': '*' },
            },
            // column-span
            'col-span': {
                all: { 'column-span': 'all' },
                none: { 'column-span': 'none' },
            },
            // cursor
            cursor: {
                pointer: { cursor: 'pointer' },
                default: { cursor: 'default' },
                '*': { cursor: '*' },
            },
            // break-after
            'break-before': {
                yes: { 'break-before': 'column' },
                no: { 'break-before': 'avoid' },
            },
            // break-before
            'break-after': {
                yes: { 'break-after': 'column' },
                no: { 'break-after': 'avoid' },
            },
            // break-inside
            'break-inside': {
                yes: { 'break-inside': 'column' },
                no: { 'break-inside': 'avoid' },
            },
            // display
            d: {
                none: { display: 'none' },
                block: { display: 'block' },
                inline: { display: 'inline' },
                inblock: { display: 'inline-block' },
                flx: { display: 'flex' },
                inflx: { display: 'inline-flex' },
                table: { display: 'table' },
                trow: { display: 'table-row' },
                tcell: { display: 'table-cell' },
                litem: { display: 'list-item' },
            },
            // headings from 1 to 6
            fh: {
                _common: { 'font-weight': fontWeight.heading },
                1: {
                    'font-size': fontSize.h1,
                    'margin-bottom': spacer[5],
                },
                2: {
                    'font-size': fontSize.h2,
                    'margin-bottom': spacer[4],
                },
                3: {
                    'font-size': fontSize.h3,
                    'margin-bottom': spacer[3],
                },
                4: {
                    'font-size': fontSize.h4,
                    'margin-bottom': spacer[3],
                },
                5: {
                    'font-size': fontSize.h5,
                    'margin-bottom': spacer[3],
                },
                6: {
                    'font-size': fontSize.h6,
                    'margin-bottom': spacer[2],
                },
            },
            // pragraph from 1 to 6
            fp: {
                1: {
                    'font-size': fontSize.p1,
                    'margin-bottom': spacer[2],
                },
                2: {
                    'font-size': fontSize.p2,
                    'margin-bottom': spacer[2],
                },
                3: {
                    'font-size': fontSize.p3,
                    'margin-bottom': spacer[2],
                },
                4: {
                    'font-size': fontSize.p4,
                    'margin-bottom': spacer[1],
                },
                5: {
                    'font-size': fontSize.p5,
                    'margin-bottom': spacer[1],
                },
                6: {
                    'font-size': fontSize.p6,
                    'margin-bottom': spacer[1],
                },
            },
            // font-size
            fs: {
                inherit: { 'font-size': 'inherit' },
                h1: { 'font-size': fontSize.h1 },
                h2: { 'font-size': fontSize.h2 },
                h3: { 'font-size': fontSize.h3 },
                h4: { 'font-size': fontSize.h4 },
                h5: { 'font-size': fontSize.h5 },
                h6: { 'font-size': fontSize.h6 },
                p1: { 'font-size': fontSize.p1 },
                p2: { 'font-size': fontSize.p2 },
                p3: { 'font-size': fontSize.p3 },
                p4: { 'font-size': fontSize.p4 },
                p5: { 'font-size': fontSize.p5 },
                p6: { 'font-size': fontSize.p6 },
                i1: { 'font-size': fontSize.i1 },
                i2: { 'font-size': fontSize.i2 },
                i3: { 'font-size': fontSize.i3 },
                i4: { 'font-size': fontSize.i4 },
                i5: { 'font-size': fontSize.i5 },
                i6: { 'font-size': fontSize.i6 },
                '*': { 'font-size': '*' },
            },
            // font-weight
            fw: {
                light: { 'font-weight': fontWeight.light },
                regular: { 'font-weight': fontWeight.regular },
                normal: { 'font-weight': fontWeight.regular },
                medium: { 'font-weight': fontWeight.medium },
                semi: { 'font-weight': fontWeight.semi },
                bold: { 'font-weight': fontWeight.bold },
                extra: { 'font-weight': fontWeight.extra },
                heading: { 'font-weight': fontWeight.heading },
            },
            // font-style
            fi: {
                yes: { 'font-style': 'italic' },
                no: { 'font-style': 'normal' },
            },
            // flex-column align-self
            'flx-col-align-self': {
                'top-left': { 'justify-self': 'flex-start', 'align-self': 'flex-start' },
                'top-center': { 'justify-self': 'flex-start', 'align-self': 'center' },
                'top-right': { 'justify-self': 'flex-start', 'align-self': 'flex-end' },
                'center-left': { 'justify-self': 'center', 'align-self': 'flex-start' },
                'center-center': { 'justify-self': 'center', 'align-self': 'center' },
                'center-right': { 'justify-self': 'center', 'align-self': 'flex-end' },
                'bottom-left': { 'justify-self': 'flex-end', 'align-self': 'flex-start' },
                'bottom-center': { 'justify-self': 'flex-end', 'align-self': 'center' },
                'bottom-right': { 'justify-self': 'flex-end', 'align-self': 'flex-end' },
            },
            // flex-colum-align
            'flx-col-align': {
                _common: { display: 'flex', 'flex-direction': 'column' },
                'top-left': {
                    'justify-content': 'flex-start',
                    'align-items': 'flex-start',
                },
                'top-center': {
                    'justify-content': 'flex-start',
                    'align-items': 'center',
                },
                'top-right': {
                    'justify-content': 'flex-start',
                    'align-items': 'flex-end',
                },
                'center-left': {
                    'justify-content': 'center',
                    'align-items': 'flex-start',
                },
                'center-center': { 'justify-content': 'center', 'align-items': 'center' },
                'center-right': {
                    'justify-content': 'center',
                    'align-items': 'flex-end',
                },
                'bottom-left': {
                    'justify-content': 'flex-end',
                    'align-items': 'flex-start',
                },
                'bottom-center': {
                    'justify-content': 'flex-end',
                    'align-items': 'center',
                },
                'bottom-right': {
                    'justify-content': 'flex-end',
                    'align-items': 'flex-end',
                },
                'between-left': {
                    'justify-content': 'space-between',
                    'align-items': 'flex-start',
                },
                'between-center': {
                    'justify-content': 'space-between',
                    'align-items': 'center',
                },
                'between-right': {
                    'justify-content': 'space-between',
                    'align-items': 'flex-end',
                },
            },
            // flex-row align-self
            'flx-row-align-self': {
                none: { 'align-self': 'normal', 'justify-self': 'normal' },
                'top-left': { 'align-self': 'flex-start', 'justify-self': 'flex-start' },
                'top-center': { 'align-self': 'flex-start', 'justify-self': 'center' },
                'top-right': { 'align-self': 'flex-start', 'justify-self': 'flex-end' },
                'center-left': { 'align-self': 'center', 'justify-self': 'flex-start' },
                'center-center': { 'align-self': 'center', 'justify-self': 'center' },
                'center-right': { 'align-self': 'center', 'justify-self': 'flex-end' },
                'bottom-left': { 'align-self': 'flex-end', 'justify-self': 'flex-start' },
                'bottom-center': { 'align-self': 'flex-end', 'justify-self': 'center' },
                'bottom-right': { 'align-self': 'flex-end', 'justify-self': 'flex-end' },
            },
            // flex-row-align
            'flx-row-align': {
                _common: { display: 'flex', 'flex-direction': 'row' },
                'top-left': {
                    'align-items': 'flex-start',
                    'justify-content': 'flex-start',
                },
                'top-center': {
                    'align-items': 'flex-start',
                    'justify-content': 'center',
                },
                'top-right': {
                    'align-items': 'flex-start',
                    'justify-content': 'flex-end',
                },
                'top-between': {
                    'align-items': 'flex-start',
                    'justify-content': 'space-between',
                },
                'center-left': {
                    'align-items': 'center',
                    'justify-content': 'flex-start',
                },
                'center-center': { 'align-items': 'center', 'justify-content': 'center' },
                'center-right': {
                    'align-items': 'center',
                    'justify-content': 'flex-end',
                },
                'center-between': {
                    'align-items': 'center',
                    'justify-content': 'space-between',
                },
                'bottom-left': {
                    'align-items': 'flex-end',
                    'justify-content': 'flex-start',
                },
                'bottom-center': {
                    'align-items': 'flex-end',
                    'justify-content': 'center',
                },
                'bottom-right': {
                    'align-items': 'flex-end',
                    'justify-content': 'flex-end',
                },
                'bottom-between': {
                    'align-items': 'flx-end',
                    'justify-content': 'space-between',
                },
                'stretch-left': {
                    'align-items': 'stretch',
                    'justify-content': 'flex-start',
                },
                'stretch-center': {
                    'align-items': 'stretch',
                    'justify-content': 'center',
                },
                'stretch-right': {
                    'align-items': 'stretch',
                    'justify-content': 'flex-end',
                },
                'stretch-between': {
                    'align-items': 'stretch',
                    'justify-content': 'space-between',
                },
            },
            // flex-direction
            'flx-dir': {
                col: { 'flex-direction': 'column' },
                row: { 'flex-direction': 'row' },
                colrev: { 'flex-direction': 'column-reverse' },
                rowrev: { 'flex-direction': 'row-reverse' },
            },
            // justify-content
            'flx-justify-content': {
                center: { 'justify-content': 'center' },
                start: { 'justify-content': 'flex-start' },
                end: { 'justify-content': 'flex-end' },
                between: { 'justify-content': 'space-between' },
                around: { 'justify-content': 'space-around' },
            },
            // align-items
            'flx-align-items': {
                center: { 'align-items': 'center' },
                start: { 'align-items': 'flex-start' },
                end: { 'align-items': 'flex-end' },
            },
            // object-fit
            ofit: {
                none: { 'object-fit': 'none' },
                contain: { 'object-fit': 'contain' },
                cover: { 'object-fit': 'cover' },
                fill: { 'object-fit': 'fill' },
                scaledown: { 'object-fit': 'scale-down' },
            },
            // object-position
            opos: {
                none: { 'object-position': 'unset' },
                center: { 'object-position': 'center' },
                '*': { 'object-position': '*' },
            },
            // order
            'flx-order': {
                n1: { order: -1 },
                0: { order: 0 },
                1: { order: 1 },
                2: { order: 2 },
                3: { order: 3 },
                4: { order: 4 },
                5: { order: 5 },
                6: { order: 6 },
                7: { order: 7 },
                8: { order: 8 },
                9: { order: 9 },
                10: { order: 10 },
                11: { order: 11 },
                12: { order: 12 },
                '*': { order: '*' },
            },
            // flex-wrap
            'flx-wrap': {
                yes: { 'flex-wrap': 'wrap' },
                no: { 'flex-wrap': 'nowrap' },
                rev: { 'flex-wrap': 'wrap-reverse' },
            },
            // flex
            flx: {
                fill: { flex: '1 1 auto' },
                '*': { flex: '*' },
            },
            // flex-grow
            'flx-grow': {
                0: { 'flex-grow': '0' },
                1: { 'flex-grow': '1' },
            },
            // flex-shrink
            'flx-shrink': {
                0: { 'flex-shrink': '0' },
                1: { 'flex-shrink': '1' },
            },
            // flex-basis
            'flx-basis': {
                auto: { 'flex-basis': 'auto' },
            },
            // float
            float: {
                left: { float: 'left' },
                right: { float: 'right' },
                none: { float: 'none' },
            },
            'grid-row-temp': {
                1: { 'grid-template-rows': 'auto' },
                2: { 'grid-template-rows': 'auto auto' },
                '*': { 'grid-template-rows': '*' },
            },
            'grid-col-temp': {
                1: { 'grid-template-columns': 'auto' },
                2: { 'grid-template-columns': 'repeat(2, auto)' },
                3: { 'grid-template-columns': 'repeat(3, auto)' },
                4: { 'grid-template-columns': 'repeat(4, auto)' },
                5: { 'grid-template-columns': 'repeat(5, auto)' },
                6: { 'grid-template-columns': 'repeat(6, auto)' },
                7: { 'grid-template-columns': 'repeat(7, auto)' },
                8: { 'grid-template-columns': 'repeat(8, auto)' },
                9: { 'grid-template-columns': 'repeat(9, auto)' },
                10: { 'grid-template-columns': 'repeat(10, auto)' },
                11: { 'grid-template-columns': 'repeat(11, auto)' },
                12: { 'grid-template-columns': 'repeat(12, auto)' },
                '*': { 'grid-template-columns': '*' },
            },
            'grid-row-start': {
                '*': { 'grid-row-start': '*' },
            },
            'grid-row-end': {
                '*': { 'grid-row-end': '*' },
            },
            'grid-col-start': {
                '*': { 'grid-column-start': '*' },
            },
            'grid-col-end': {
                '*': { 'grid-column-end': '*' },
            },
            // list-style
            'list-style': {
                none: { 'list-style': 'none', margin: 0, padding: 0 },
                '*': { 'list-style': '*' },
            },
            // list-style-positiom
            'list-style-position': {
                inside: { 'list-style-position': 'inside' },
                outside: { 'list-style-position': 'outside' },
                '*': { 'list-style-position': '*' },
            },
            // linear-gradient
            'linear-gradient': {
                '*': { background: 'linear-gradient(*)' },
            },
            // line-height
            lh: {
                0: { 'line-height': 0 },
                1: { 'line-height': 1 },
                1.125: { 'line-height': 1.125 },
                1.25: { 'line-height': 1.25 },
                1.375: { 'line-height': 1.375 },
                1.5: { 'line-height': 1.5 },
                1.625: { 'line-height': 1.625 },
                1.75: { 'line-height': 1.75 },
                1.875: { 'line-height': 1.875 },
                2: { 'line-height': 2 },
                2.25: { 'line-height': 2.25 },
                2.5: { 'line-height': 2.5 },
                2.75: { 'line-height': 2.75 },
                3: { 'line-height': 3 },
                3.5: { 'line-height': 3.5 },
                4: { 'line-height': 4 },
                5: { 'line-height': 5 },
                '*': { 'line-height': '*' },
            },
            ls: {
                'n.2': { 'letter-spacing': '-.2rem' },
                'n.18': { 'letter-spacing': '-.18rem' },
                'n.16': { 'letter-spacing': '-.16rem' },
                'n.14': { 'letter-spacing': '-.14rem' },
                'n.12': { 'letter-spacing': '-.12rem' },
                'n.1': { 'letter-spacing': '-.1rem' },
                'n.08': { 'letter-spacing': '-.08rem' },
                'n.06': { 'letter-spacing': '-.06rem' },
                'n.04': { 'letter-spacing': '-.04rem' },
                'n.02': { 'letter-spacing': '-.02rem' },
                0: { 'letter-spacing': 0 },
                '.02': { 'letter-spacing': '.02rem' },
                '.04': { 'letter-spacing': '.04rem' },
                '.06': { 'letter-spacing': '.06rem' },
                '.08': { 'letter-spacing': '.08rem' },
                '.1': { 'letter-spacing': '.1rem' },
                '.12': { 'letter-spacing': '.12rem' },
                '.14': { 'letter-spacing': '.14rem' },
                '.16': { 'letter-spacing': '.16rem' },
                '.18': { 'letter-spacing': '.18rem' },
                '.2': { 'letter-spacing': '.2rem' },
                '.4': { 'letter-spacing': '.4rem' },
                '.6': { 'letter-spacing': '.6rem' },
                '.8': { 'letter-spacing': '.8rem' },
                1: { 'letter-spacing': '1rem' },
                2: { 'letter-spacing': '2rem' },
                '*': { 'letter-spacing': '*' },
            },
            // opacity
            opacity: {
                0: { opacity: 0 },
                10: { opacity: 0.1 },
                20: { opacity: 0.2 },
                30: { opacity: 0.3 },
                40: { opacity: 0.4 },
                50: { opacity: 0.5 },
                60: { opacity: 0.6 },
                70: { opacity: 0.7 },
                80: { opacity: 0.8 },
                90: { opacity: 0.9 },
                100: { opacity: 1 },
                '*': { opacity: '*' },
            },
            // outline
            outline: {
                none: { outline: 'none' },
                '*': { outline: '*' },
            },
            // outline-width
            ow: {
                _common: { 'outline-style': 'solid' },
                0: { 'outline-width': '0' },
                '*': { 'outline-width': '*' },
            },
            // outline-offset
            oo: {
                0: { 'outline-offset': '0' },
                '*': { 'outline-offset': '*' },
            },
            // position align
            'pos-align': {
                _common: {
                    position: 'absolute',
                },
                none: {
                    position: 'static',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    top: 0,
                    transform: 'none',
                },
                'top-left': {
                    bottom: 'auto',
                    left: 0,
                    right: 'auto',
                    top: 0,
                    transform: 'none',
                },
                'top-center': {
                    bottom: 'auto',
                    left: '50%',
                    right: 'auto',
                    top: 0,
                    transform: 'translateX(-50%)',
                },
                'top-right': {
                    bottom: 'auto',
                    left: 'auto',
                    right: 0,
                    top: 0,
                    transform: 'none',
                },
                'center-left': {
                    bottom: 'auto',
                    left: 0,
                    right: 'auto',
                    top: '50%',
                    transform: 'translateY(-50%)',
                },
                'center-center': {
                    bottom: 'auto',
                    left: '50%',
                    right: 'auto',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                },
                'center-right': {
                    bottom: 'auto',
                    left: 'auto',
                    right: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                },
                'bottom-left': {
                    bottom: 0,
                    left: 0,
                    right: 'auto',
                    top: 'auto',
                    transform: 'none',
                },
                'bottom-center': {
                    bottom: 0,
                    left: '50%',
                    right: 'auto',
                    top: 'auto',
                    transform: 'translateX(-50%)',
                },
                'bottom-right': {
                    bottom: 0,
                    left: 'auto',
                    right: 0,
                    top: 'auto',
                    transform: 'none',
                },
                'bottom-stretch': {
                    bottom: 0,
                    left: 0,
                    right: 0,
                    top: 'auto',
                    transform: 'none',
                },
                'top-stretch': {
                    bottom: 'auto',
                    left: 0,
                    right: 0,
                    top: 0,
                    transform: 'none',
                },
            },
            // position overlay
            'pos-overlay': {
                _common: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                },
                abs: { position: 'absolute' },
                fix: { position: 'fixed' },
            },
            // position overlay link
            'pos-overlay-link': {
                _common: {
                    border: 'none',
                    bottom: 0,
                    cursor: 'pointer',
                    'font-size': 0,
                    left: 0,
                    'line-height': 0,
                    margin: 0,
                    opacity: 0,
                    overflow: 'hidden',
                    padding: 0,
                    right: 0,
                    top: 0,
                    'white-space': 'nowrap',
                    'z-index': 1,
                },
                abs: { position: 'absolute' },
                fix: { position: 'fixed' },
            },
            // position
            pos: {
                abs: { position: 'absolute' },
                fix: { position: 'fixed' },
                rel: { position: 'relative' },
                static: { position: 'static' },
                sticky: { position: 'sticky' },
            },
            // pointer-events
            'pointer-events': {
                disabled: { 'pointer-events': 'none' },
                active: { 'pointer-events': 'auto' },
            },
            rtl: {
                yes: { direction: 'rtl' },
                no: { direction: 'ltr' },
            },
            // overflow
            scrollable: {
                _common: { 'flex-wrap': 'nowrap' },
                all: { overflow: 'auto' },
                visible: { overflow: 'visible' },
                none: { overflow: 'hidden', 'flex-wrap': 'wrap !important' },
                hidden: { overflow: 'hidden' },
                x: { 'overflow-x': 'auto', 'overflow-y': 'hidden' },
                y: { 'overflow-y': 'auto', 'overflow-x': 'hidden' },
            },
            // visiblity
            visible: {
                yes: { visibility: 'visible' },
                no: { visibility: 'hidden' },
            },
            // transition
            transition: {
                all: { transition: "all " + transition.duration + " " + transition.timing },
                bgc: {
                    transition: "background-color " + transition.duration + " " + transition.timing,
                },
                fc: {
                    transition: "color " + transition.duration + " " + transition.timing,
                },
                w: { transition: "width " + transition.duration + " " + transition.timing },
                h: {
                    transition: "height " + transition.duration + " " + transition.timing,
                },
                hmax: {
                    transition: "max-height " + transition.duration + " " + transition.timing,
                },
                transform: {
                    transition: "transform " + transition.duration + " " + transition.timing,
                },
                opacity: {
                    transition: "opacity " + transition.duration + " " + transition.timing,
                },
                none: { transition: 'none' },
                '*': { transition: '*' },
            },
            // transform rotate
            rotate: {
                n180: { transform: 'rotate(-180deg)' },
                n135: { transform: 'rotate(-135deg)' },
                n90: { transform: 'rotate(-90deg)' },
                n45: { transform: 'rotate(-45deg)' },
                0: { transform: 'rotate(0)' },
                45: { transform: 'rotate(45deg)' },
                90: { transform: 'rotate(90deg)' },
                135: { transform: 'rotate(135deg)' },
                180: { transform: 'rotate(180deg)' },
                '*': { transform: 'rotate(*)' },
            },
            // transform translate
            translate: {
                0: { transform: 'translate(0, 0)' },
                '*': { transform: 'translate(*)' },
            },
            'translate-x': {
                n50: { transform: 'translateX(-50%)' },
                n100: { transform: 'translateX(-100%)' },
                0: { transform: 'translateX(0)' },
                50: { transform: 'translateX(50%)' },
                100: { transform: 'translateX(100%)' },
                '*': { transform: 'translateX(*)' },
            },
            'translate-y': {
                n50: { transform: 'translateY(-50%)' },
                n100: { transform: 'translateY(-100%)' },
                0: { transform: 'translateY(0)' },
                50: { transform: 'translateY(50%)' },
                100: { transform: 'translateY(100%)' },
                '*': { transform: 'translateY(*)' },
            },
            'translate-z': {
                n100: { transform: 'translateZ(-100%)' },
                0: { transform: 'translateZ(0)' },
                100: { transform: 'translateZ(100%)' },
                '*': { transform: 'translateZ(*)' },
            },
            // transform scale
            scale: {
                default: { transform: 'scale(1)' },
                '*': { transform: 'scale(*)' },
            },
            'scale-x': {
                1: { transform: 'scaleX(1)' },
                n1: { transform: 'scaleX(-1)' },
                '*': { transform: 'scaleX(*)' },
            },
            // transform-origin
            'transform-o': {
                0: { 'transform-origin': '0 0' },
                '100-0': { 'transform-origin': '100% 0' },
            },
            // text-align
            'txt-align': {
                left: { 'text-align': 'left' },
                center: { 'text-align': 'center' },
                right: { 'text-align': 'right' },
                justify: { 'text-align': 'justify' },
            },
            // text-shadow
            'txt-shadow': {
                '*': { 'text-shadow': '*' },
            },
            // white-space
            'txt-wrap': {
                yes: { 'white-space': 'normal' },
                no: { 'white-space': 'nowrap' },
                '*': { 'white-space': '*' },
            },
            // text-transform
            'txt-case': {
                none: { 'text-transform': 'none' },
                lower: { 'text-transform': 'lowercase' },
                upper: { 'text-transform': 'uppercase' },
                title: { 'text-transform': 'capitalize' },
            },
            // ellipsis
            'txt-truncate': {
                yes: {
                    overflow: 'hidden',
                    'text-overflow': 'ellipsis',
                    'white-space': 'nowrap',
                },
                no: {
                    overflow: 'initial',
                    'text-overflow': 'initial',
                    'white-space': 'wrap',
                },
            },
            'txt-underline': {
                yes: { 'text-decoration': 'underline' },
                no: { 'text-decoration': 'none' },
            },
            'txt-line-through': {
                yes: { 'text-decoration': 'line-through' },
                no: { 'text-decoration': 'none' },
            },
            'v-align': {
                none: { 'vertical-align': 'unset' },
                top: { 'vertical-align': 'top' },
                middle: { 'vertical-align': 'middle' },
                bottom: { 'vertical-align': 'bottom' },
                sub: { 'vertical-align': 'sub' },
                sup: { 'vertical-align': 'super' },
                '*': { 'vertical-align': '*' },
            },
            // stroke-width
            'stroke-width': {
                0: { 'stroke-width': 0 },
                1: { 'stroke-width': 1 },
                1.1: { 'stroke-width': 1.1 },
                1.2: { 'stroke-width': 1.2 },
                1.3: { 'stroke-width': 1.3 },
                1.4: { 'stroke-width': 1.4 },
                1.5: { 'stroke-width': 1.5 },
                1.6: { 'stroke-width': 1.6 },
                1.7: { 'stroke-width': 1.7 },
                1.8: { 'stroke-width': 1.8 },
                1.9: { 'stroke-width': 1.9 },
                2: { 'stroke-width': 2 },
                3: { 'stroke-width': 3 },
                4: { 'stroke-width': 4 },
                '*': { 'stroke-width': '*' },
            },
            // width
            w: {
                '100vw': { width: '100vw' },
                cover: {
                    left: '50%',
                    'margin-left': '-50vw',
                    'margin-right': '-50vw',
                    position: 'relative',
                    right: '50%',
                    width: '100vw',
                },
                auto: { width: 'auto' },
                0: { width: 0 },
                5: { width: '5%' },
                10: { width: '10%' },
                15: { width: '15%' },
                20: { width: '20%' },
                25: { width: '25%' },
                30: { width: '30%' },
                33: { width: '33%' },
                35: { width: '35%' },
                40: { width: '40%' },
                45: { width: '45%' },
                50: { width: '50%' },
                55: { width: '55%' },
                60: { width: '60%' },
                65: { width: '65%' },
                66: { width: '66%' },
                70: { width: '70%' },
                75: { width: '75%' },
                80: { width: '80%' },
                85: { width: '85%' },
                90: { width: '90%' },
                95: { width: '95%' },
                100: { width: '100%' },
                '*': { width: '*' },
            },
            // max-width
            wmax: {
                narrow: { 'max-width': maxWidth.sm },
                normal: { 'max-width': maxWidth.md },
                wide: { 'max-width': maxWidth.lg },
                vast: { 'max-width': maxWidth.xl },
                extra: { 'max-width': maxWidth.xxl },
                5: { 'max-width': '5%' },
                10: { 'max-width': '10%' },
                15: { 'max-width': '15%' },
                20: { 'max-width': '20%' },
                25: { 'max-width': '25%' },
                30: { 'max-width': '30%' },
                33: { 'max-width': '33%' },
                35: { 'max-width': '35%' },
                40: { 'max-width': '40%' },
                45: { 'max-width': '45%' },
                50: { 'max-width': '50%' },
                55: { 'max-width': '55%' },
                60: { 'max-width': '60%' },
                65: { 'max-width': '65%' },
                66: { 'max-width': '66%' },
                70: { 'max-width': '70%' },
                75: { 'max-width': '75%' },
                80: { 'max-width': '80%' },
                85: { 'max-width': '85%' },
                90: { 'max-width': '90%' },
                95: { 'max-width': '95%' },
                100: { 'max-width': '100%' },
                '*': { 'max-width': '*' },
            },
            // min-width
            wmin: {
                '100vw': { 'min-width': '100vw' },
                narrow: { 'min-width': maxWidth.sm },
                normal: { 'min-width': maxWidth.md },
                wide: { 'min-width': maxWidth.lg },
                vast: { 'min-width': maxWidth.xl },
                extra: { 'min-width': maxWidth.xxl },
                5: { 'min-width': '5%' },
                10: { 'min-width': '10%' },
                15: { 'min-width': '15%' },
                20: { 'min-width': '20%' },
                25: { 'min-width': '25%' },
                30: { 'min-width': '30%' },
                33: { 'min-width': '33%' },
                35: { 'min-width': '35%' },
                40: { 'min-width': '40%' },
                45: { 'min-width': '45%' },
                50: { 'min-width': '50%' },
                55: { 'min-width': '55%' },
                60: { 'min-width': '60%' },
                65: { 'min-width': '65%' },
                66: { 'min-width': '66%' },
                70: { 'min-width': '70%' },
                75: { 'min-width': '75%' },
                80: { 'min-width': '80%' },
                85: { 'min-width': '85%' },
                90: { 'min-width': '90%' },
                95: { 'min-width': '95%' },
                100: { 'min-width': '100%' },
                '*': { 'min-width': '*' },
            },
            // width calc
            wcalc: {
                '*': { width: 'calc(*)' },
            },
            // max-width calc
            wmaxcalc: {
                '*': { 'max-width': 'calc(*)' },
            },
            // min-width calc
            wmincalc: {
                '*': { 'min-width': 'calc(*)' },
            },
            // height
            h: {
                '100vh': { height: '100vh' },
                auto: { height: 'auto' },
                0: { height: 0 },
                100: { height: '100%' },
                '*': { height: '*' },
            },
            // max-height
            hmax: {
                '100vh': { 'max-height': '100vh' },
                none: { 'max-height': 'none' },
                100: { 'max-height': '100%' },
                0: { 'max-height': '0' },
                '*': { 'max-height': '*' },
            },
            // min-height
            hmin: {
                '100vh': { 'min-height': '100vh' },
                auto: { 'min-height': 'auto' },
                100: { 'min-height': '100%' },
                '*': { 'min-height': '*' },
            },
            // height calc
            hcalc: {
                '*': { height: 'calc(*)' },
            },
            // max-height calc
            hmaxcalc: {
                '*': { 'max-height': 'calc(*)' },
            },
            // min-height calc
            hmincalc: {
                '*': { 'min-height': 'calc(*)' },
            },
            // square
            square: {
                auto: { width: 'auto', height: 'auto' },
                0: { width: 0, height: 0 },
                '*': { width: '*', height: '*' },
            },
            // z-index
            z: {
                n: { 'z-index': -1 },
                0: { 'z-index': 0 },
                1: { 'z-index': 1 },
                3: { 'z-index': 3 },
                6: { 'z-index': 6 },
                9: { 'z-index': 9 },
                99: { 'z-index': 99 },
                999: { 'z-index': 999 },
                9999: { 'z-index': 9999 },
                '*': { 'z-index': '*' },
            },
            // scroll snap type
            'ss-type': {
                none: { 'scroll-snap-type': 'none' },
                both: { 'scroll-snap-type': 'both' },
            },
            // scroll snap align
            'ss-align': {
                none: { 'scroll-snap-align': 'none' },
                start: { 'scroll-snap-align': 'start' },
            },
            // scroll margin top
            'sm-top': {
                '*': { 'scroll-margin-top': '*' },
            },
        };
    };
    var getMapleUtilityVariableMap = function (_a) {
        var color = _a.color, spacer = _a.spacer, fontFamily = _a.fontFamily;
        return [
            { prefix: 'ff', map: fontFamily, props: ['font-family'] },
            { prefix: 'bgc', map: color, props: ['background-color'] },
            { prefix: 'bc', map: color, props: ['border-color'] },
            { prefix: 'bc-top', map: color, props: ['border-top-color'] },
            { prefix: 'bc-bottom', map: color, props: ['border-bottom-color'] },
            { prefix: 'bc-left', map: color, props: ['border-left-color'] },
            { prefix: 'bc-right', map: color, props: ['border-right-color'] },
            { prefix: 'col-bc', map: color, props: ['column-rule-color'] },
            { prefix: 'link', map: color, props: ['link'] },
            { prefix: 'btn', map: color, props: ['theme'] },
            { prefix: 'btn-outline', map: color, props: ['theme-outline'] },
            { prefix: 'alert', map: color, props: ['theme'] },
            { prefix: 'alert-outline', map: color, props: ['theme-outline'] },
            { prefix: 'stroke', map: color, props: ['stroke'] },
            { prefix: 'fc', map: color, props: ['color'] },
            { prefix: 'oc', map: color, props: ['outline-color'] },
            { prefix: 'p', map: spacer, props: ['padding'] },
            { prefix: 'pb', map: spacer, props: ['padding-bottom'] },
            { prefix: 'pl', map: spacer, props: ['padding-left'] },
            { prefix: 'pr', map: spacer, props: ['padding-right'] },
            { prefix: 'pt', map: spacer, props: ['padding-top'] },
            { prefix: 'px', map: spacer, props: ['padding-left', 'padding-right'] },
            { prefix: 'py', map: spacer, props: ['padding-top', 'padding-bottom'] },
            { prefix: 'm', map: spacer, props: ['margin'] },
            { prefix: 'mb', map: spacer, props: ['margin-bottom'] },
            { prefix: 'ml', map: spacer, props: ['margin-left'] },
            { prefix: 'mr', map: spacer, props: ['margin-right'] },
            { prefix: 'mt', map: spacer, props: ['margin-top'] },
            { prefix: 'mx', map: spacer, props: ['margin-left', 'margin-right'] },
            { prefix: 'my', map: spacer, props: ['margin-top', 'margin-bottom'] },
            { prefix: 'top', map: spacer, props: ['top'] },
            { prefix: 'left', map: spacer, props: ['left'] },
            { prefix: 'right', map: spacer, props: ['right'] },
            { prefix: 'bottom', map: spacer, props: ['bottom'] },
            { prefix: 'tobo', map: spacer, props: ['top', 'bottom'] },
            { prefix: 'leri', map: spacer, props: ['left', 'right'] },
            { prefix: 'lebo', map: spacer, props: ['left', 'bottom'] },
            {
                prefix: 'tblr',
                map: spacer,
                props: ['top', 'bottom', 'left', 'right'],
            },
            { prefix: 'tblr', map: spacer, props: ['top', 'bottom', 'left', 'right'] },
            { prefix: 'bw', map: spacer, props: ['border-width'] },
            { prefix: 'bw-bottom', map: spacer, props: ['border-bottom-width'] },
            { prefix: 'bw-top', map: spacer, props: ['border-top-width'] },
            { prefix: 'bw-left', map: spacer, props: ['border-left-width'] },
            { prefix: 'bw-right', map: spacer, props: ['border-right-width'] },
            { prefix: 'col-gap', map: spacer, props: ['column-gap'] },
        ];
    };

    var BASE = 1; // rem
    var MAPLE_VAR_FONT_SIZE = {
        // heading
        h1: BASE * 3 + "rem",
        h2: BASE * 2.5 + "rem",
        h3: BASE * 2 + "rem",
        h4: BASE * 1.75 + "rem",
        h5: BASE * 1.5 + "rem",
        h6: BASE * 1.25 + "rem",
        // paragraph
        p1: BASE * 1.375 + "rem",
        p2: BASE * 1.125 + "rem",
        p3: BASE * 1 + "rem",
        p4: BASE * 0.875 + "rem",
        p5: BASE * 0.75 + "rem",
        p6: BASE * 0.625 + "rem",
        // icon
        i1: BASE * 5.1 + "rem",
        i2: BASE * 3.45 + "rem",
        i3: BASE * 2.975 + "rem",
        i4: BASE * 1.925 + "rem",
        i5: BASE * 1.625 + "rem",
        i6: BASE * 1 + "rem",
    };

    var MAPLE_VAR_FONT_WEIGHT = {
        light: 300,
        regular: 400,
        medium: 500,
        semi: 600,
        bold: 700,
        extra: 800,
        heading: 700,
    };

    var BASE$1 = 1; // rem
    var MAPLE_VAR_SPACER = {
        auto: 'auto',
        n9: BASE$1 * -7 + "rem",
        n8: BASE$1 * -6 + "rem",
        n7: BASE$1 * -4 + "rem",
        n6: BASE$1 * -3 + "rem",
        n5: BASE$1 * -2.5 + "rem",
        n4: BASE$1 * -1.5 + "rem",
        n3: BASE$1 * -1 + "rem",
        n2: BASE$1 * -0.5 + "rem",
        n1: BASE$1 * -0.25 + "rem",
        0: 0,
        1: BASE$1 * 0.25 + "rem",
        2: BASE$1 * 0.5 + "rem",
        3: BASE$1 * 1 + "rem",
        4: BASE$1 * 1.5 + "rem",
        5: BASE$1 * 2.5 + "rem",
        6: BASE$1 * 3 + "rem",
        7: BASE$1 * 4 + "rem",
        8: BASE$1 * 6 + "rem",
        9: BASE$1 * 7 + "rem",
        // gutters
        gutter: BASE$1 * 1.5 + "rem",
        'n-gutter': BASE$1 * -1.5 + "rem",
        'gutter-half': BASE$1 * 0.75 + "rem",
        'n-gutter-half': BASE$1 * -0.75 + "rem",
    };

    var MAPLE_VAR_ALERT = {
        small: {
            borderWidth: '1px',
            borderRadius: '0',
            textCase: 'none',
            letterSpacing: 'normal',
            lineHeight: 1,
            fontSize: MAPLE_VAR_FONT_SIZE.p4,
            fontWeight: MAPLE_VAR_FONT_WEIGHT.regular,
            padding: MAPLE_VAR_SPACER[1] + " " + MAPLE_VAR_SPACER[2],
        },
        normal: {
            borderWidth: '1px',
            borderRadius: '0',
            textCase: 'none',
            letterSpacing: 'normal',
            lineHeight: 1,
            fontSize: MAPLE_VAR_FONT_SIZE.p3,
            fontWeight: MAPLE_VAR_FONT_WEIGHT.regular,
            padding: MAPLE_VAR_SPACER[2] + " " + MAPLE_VAR_SPACER[3],
        },
        medium: {
            borderWidth: '1px',
            borderRadius: '0',
            textCase: 'none',
            letterSpacing: 'normal',
            lineHeight: 1,
            fontSize: MAPLE_VAR_FONT_SIZE.p1,
            fontWeight: MAPLE_VAR_FONT_WEIGHT.regular,
            padding: MAPLE_VAR_SPACER[4] + " " + MAPLE_VAR_SPACER[5],
        },
        large: {
            borderWidth: '1px',
            borderRadius: '0',
            textCase: 'none',
            letterSpacing: 'normal',
            lineHeight: 1,
            fontSize: MAPLE_VAR_FONT_SIZE.h5,
            fontWeight: MAPLE_VAR_FONT_WEIGHT.regular,
            padding: MAPLE_VAR_SPACER[5] + " " + MAPLE_VAR_SPACER[6],
        },
    };

    var MAPLE_VAR_BREAKPOINT = {
        xs: '0',
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
    };

    var MAPLE_VAR_BUTTON = {
        transitionDuration: '0.3s',
        transitionTiming: 'ease-in-out',
        outlineWidth: '1px',
        outlineOffset: '-4px',
        small: {
            borderWidth: '1px',
            borderRadius: '0',
            textCase: 'none',
            letterSpacing: 'normal',
            lineHeight: 1,
            fontSize: MAPLE_VAR_FONT_SIZE.p4,
            fontWeight: MAPLE_VAR_FONT_WEIGHT.regular,
            padding: MAPLE_VAR_SPACER[1] + " " + MAPLE_VAR_SPACER[2],
        },
        normal: {
            borderWidth: '1px',
            borderRadius: '0',
            textCase: 'none',
            letterSpacing: 'normal',
            lineHeight: 1,
            fontSize: MAPLE_VAR_FONT_SIZE.p3,
            fontWeight: MAPLE_VAR_FONT_WEIGHT.regular,
            padding: MAPLE_VAR_SPACER[2] + " " + MAPLE_VAR_SPACER[3],
        },
        medium: {
            borderWidth: '1px',
            borderRadius: '0',
            textCase: 'none',
            letterSpacing: 'normal',
            lineHeight: 1,
            fontSize: MAPLE_VAR_FONT_SIZE.p1,
            fontWeight: MAPLE_VAR_FONT_WEIGHT.regular,
            padding: MAPLE_VAR_SPACER[4] + " " + MAPLE_VAR_SPACER[5],
        },
        large: {
            borderWidth: '1px',
            borderRadius: '0',
            textCase: 'none',
            letterSpacing: 'normal',
            lineHeight: 1,
            fontSize: MAPLE_VAR_FONT_SIZE.h5,
            fontWeight: MAPLE_VAR_FONT_WEIGHT.regular,
            padding: MAPLE_VAR_SPACER[5] + " " + MAPLE_VAR_SPACER[6],
        },
    };

    var MAPLE_VAR_COLOR = {
        body: '#fff',
        alpha: '#000',
        beta: '#333',
        link: '#1a6fba',
        danger: '#b00',
        dark: '#212529',
        info: '#17a2b8',
        light: '#f0f0f0',
        muted: '#ccc',
        success: '#44602d',
        warning: '#ffc107',
        black: '#000',
        white: '#fff',
        inherit: 'inherit',
        transparent: 'transparent',
        currentColor: 'currentColor',
    };

    var MAPLE_VAR_FONT_FAMILY = {
        alpha: '"Helvetica", arial, sans-serif',
        beta: '"Georgia", serif',
    };

    var MAPLE_VAR_MAX_WIDTH = {
        sm: '540px',
        md: '720px',
        lg: '960px',
        xl: '1140px',
    };

    var MAPLE_VAR_TRANSITION = {
        duration: '0.3s',
        timing: 'ease',
    };

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
            return ((maple._selector || selKey || '') + _selector)
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
                    selector.trim().charAt(0) === SEP_NO_SPACE ? STR_EMPTY : STR_SPACE,
                    selector
                        .trim()
                        .replace(SEP_OUTER_SPACE + parentSelector, STR_EMPTY)
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
            return classList.reduce(function (acc, classItem) {
                var existingStyleIndex = acc.findIndex(function (p) {
                    return ((p || '').split(R_UNIFIY) || [])[0] ===
                        ((classItem || '').split(R_UNIFIY) || [])[0];
                });
                if (existingStyleIndex < 0) {
                    acc.push(classItem);
                }
                else {
                    acc[existingStyleIndex] = classItem;
                }
                return acc;
            }, []);
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
        Maple.onStyleAppend$ = new rxjs.BehaviorSubject(null);
        Maple.onInit$ = new rxjs.BehaviorSubject(false);
        return Maple;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * @ngModule CommonModule
     *
     * @usageNotes
     * ```
     *     <some-element [mpClass]="'first second'">...</some-element>
     *
     *     <some-element [mpClass]="['first', 'second']">...</some-element>
     *
     *     <some-element [mpClass]="{'first': true, 'second': true, 'third': false}">...</some-element>
     *
     *     <some-element [mpClass]="stringExp|arrayExp|objExp">...</some-element>
     *
     *     <some-element [mpClass]="{'class1 class2 class3' : true}">...</some-element>
     * ```
     *
     * @description
     *
     * Adds and removes CSS classes on an HTML element.
     *
     * The CSS classes are updated as follows, depending on the type of the expression evaluation:
     * - `string` - the CSS classes listed in the string (space delimited) are added,
     * - `Array` - the CSS classes declared as Array elements are added,
     * - `Object` - keys are CSS classes that get added when the expression given in the value
     *              evaluates to a truthy value, otherwise they are removed.
     *
     * @publicApi
     */
    var MpClass = /** @class */ (function () {
        function MpClass(_iterableDiffers, _keyValueDiffers, _ngEl, _renderer) {
            this._iterableDiffers = _iterableDiffers;
            this._keyValueDiffers = _keyValueDiffers;
            this._ngEl = _ngEl;
            this._renderer = _renderer;
            this._iterableDiffer = null;
            this._keyValueDiffer = null;
            this._initialClasses = [];
            this._rawClass = null;
        }
        Object.defineProperty(MpClass.prototype, "klass", {
            set: function (value) {
                this._removeClasses(this._initialClasses);
                this._initialClasses = typeof value === 'string' ? value.split(/\s+/) : [];
                this._applyClasses(this._initialClasses);
                this._applyClasses(this._rawClass);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MpClass.prototype, "mpClass", {
            set: function (value) {
                this._removeClasses(this._rawClass);
                this._applyClasses(this._initialClasses);
                this._iterableDiffer = null;
                this._keyValueDiffer = null;
                this._rawClass = typeof value === 'string' ? value.split(/\s+/) : value;
                if (this._rawClass) {
                    if (core.ɵisListLikeIterable(this._rawClass)) {
                        this._iterableDiffer = this._iterableDiffers
                            .find(this._rawClass)
                            .create();
                    }
                    else {
                        this._keyValueDiffer = this._keyValueDiffers
                            .find(this._rawClass)
                            .create();
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        MpClass.prototype.ngDoCheck = function () {
            if (this._iterableDiffer) {
                var iterableChanges = this._iterableDiffer.diff(this._rawClass);
                if (iterableChanges) {
                    this._applyIterableChanges(iterableChanges);
                }
            }
            else if (this._keyValueDiffer) {
                var keyValueChanges = this._keyValueDiffer.diff(this._rawClass);
                if (keyValueChanges) {
                    this._applyKeyValueChanges(keyValueChanges);
                }
            }
        };
        MpClass.prototype._applyKeyValueChanges = function (changes) {
            var _this = this;
            changes.forEachAddedItem(function (record) {
                return _this._toggleClass(record.key, record.currentValue);
            });
            changes.forEachChangedItem(function (record) {
                return _this._toggleClass(record.key, record.currentValue);
            });
            changes.forEachRemovedItem(function (record) {
                if (record.previousValue) {
                    _this._toggleClass(record.key, false);
                }
            });
        };
        MpClass.prototype._applyIterableChanges = function (changes) {
            var _this = this;
            changes.forEachAddedItem(function (record) {
                if (typeof record.item === 'string') {
                    _this._toggleClass(record.item, true);
                }
                else {
                    throw new Error("NgClass can only toggle CSS classes expressed as strings, got " + core.ɵstringify(record.item));
                }
            });
            changes.forEachRemovedItem(function (record) {
                return _this._toggleClass(record.item, false);
            });
        };
        /**
         * Applies a collection of CSS classes to the DOM element.
         *
         * For argument of type Set and Array CSS class names contained in those collections are always
         * added.
         * For argument of type Map CSS class name in the map's key is toggled based on the value (added
         * for truthy and removed for falsy).
         */
        MpClass.prototype._applyClasses = function (rawClassVal) {
            var _this = this;
            if (rawClassVal) {
                if (Array.isArray(rawClassVal) || rawClassVal instanceof Set) {
                    rawClassVal.forEach(function (klass) {
                        return _this._toggleClass(klass, true);
                    });
                }
                else {
                    Object.keys(rawClassVal).forEach(function (klass) {
                        return _this._toggleClass(klass, !!rawClassVal[klass]);
                    });
                }
            }
        };
        /**
         * Removes a collection of CSS classes from the DOM element. This is mostly useful for cleanup
         * purposes.
         */
        MpClass.prototype._removeClasses = function (rawClassVal) {
            var _this = this;
            if (rawClassVal) {
                if (Array.isArray(rawClassVal) || rawClassVal instanceof Set) {
                    rawClassVal.forEach(function (klass) {
                        return _this._toggleClass(klass, false);
                    });
                }
                else {
                    Object.keys(rawClassVal).forEach(function (klass) {
                        return _this._toggleClass(klass, false);
                    });
                }
            }
        };
        MpClass.prototype._toggleClass = function (klass, enabled) {
            var _this = this;
            klass = klass.trim();
            if (klass) {
                if (enabled) {
                    Maple.fly(klass);
                }
                klass.split(/\s+/g).forEach(function (klass) {
                    if (enabled) {
                        _this._renderer.addClass(_this._ngEl.nativeElement, klass);
                    }
                    else {
                        _this._renderer.removeClass(_this._ngEl.nativeElement, klass);
                    }
                });
            }
        };
        /** @nocollapse */ MpClass.ɵfac = function MpClass_Factory(t) { return new (t || MpClass)(core.ɵɵdirectiveInject(core.IterableDiffers), core.ɵɵdirectiveInject(core.KeyValueDiffers), core.ɵɵdirectiveInject(core.ElementRef), core.ɵɵdirectiveInject(core.Renderer2)); };
        /** @nocollapse */ MpClass.ɵdir = core.ɵɵdefineDirective({ type: MpClass, selectors: [["", "mpClass", ""]], inputs: { klass: ["class", "klass"], mpClass: "mpClass" } });
        return MpClass;
    }());
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(MpClass, [{
            type: core.Directive,
            args: [{ selector: '[mpClass]' }]
        }], function () { return [{ type: core.IterableDiffers }, { type: core.KeyValueDiffers }, { type: core.ElementRef }, { type: core.Renderer2 }]; }, { klass: [{
                type: core.Input,
                args: ['class']
            }], mpClass: [{
                type: core.Input,
                args: ['mpClass']
            }] }); })();

    var MapleModule = /** @class */ (function () {
        function MapleModule() {
        }
        /** @nocollapse */ MapleModule.ɵmod = core.ɵɵdefineNgModule({ type: MapleModule });
        /** @nocollapse */ MapleModule.ɵinj = core.ɵɵdefineInjector({ factory: function MapleModule_Factory(t) { return new (t || MapleModule)(); }, imports: [[common.CommonModule]] });
        return MapleModule;
    }());
    (function () { (typeof ngJitMode === "undefined" || ngJitMode) && core.ɵɵsetNgModuleScope(MapleModule, { declarations: [MpClass], imports: [common.CommonModule], exports: [MpClass] }); })();
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(MapleModule, [{
            type: core.NgModule,
            args: [{
                    declarations: [MpClass],
                    imports: [common.CommonModule],
                    exports: [MpClass],
                }]
        }], null, null); })();

    exports.MAPLE_PROP_EXTENSION_MAP = MAPLE_PROP_EXTENSION_MAP;
    exports.MAPLE_VAR_ALERT = MAPLE_VAR_ALERT;
    exports.MAPLE_VAR_BREAKPOINT = MAPLE_VAR_BREAKPOINT;
    exports.MAPLE_VAR_BUTTON = MAPLE_VAR_BUTTON;
    exports.MAPLE_VAR_COLOR = MAPLE_VAR_COLOR;
    exports.MAPLE_VAR_FONT_FAMILY = MAPLE_VAR_FONT_FAMILY;
    exports.MAPLE_VAR_FONT_SIZE = MAPLE_VAR_FONT_SIZE;
    exports.MAPLE_VAR_FONT_WEIGHT = MAPLE_VAR_FONT_WEIGHT;
    exports.MAPLE_VAR_MAX_WIDTH = MAPLE_VAR_MAX_WIDTH;
    exports.MAPLE_VAR_SPACER = MAPLE_VAR_SPACER;
    exports.MAPLE_VAR_TRANSITION = MAPLE_VAR_TRANSITION;
    exports.Maple = Maple;
    exports.MapleColorHelper = MapleColorHelper;
    exports.MapleModule = MapleModule;
    exports.MpClass = MpClass;
    exports.getMapleUtilityClassMap = getMapleUtilityClassMap;
    exports.getMapleUtilityVariableMap = getMapleUtilityVariableMap;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=maple.umd.js.map
