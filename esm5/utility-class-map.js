import { __assign } from "tslib";
export var getMapleUtilityClassMap = function (_a) {
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
        'grid-rows': {
            _common: { display: 'grid' },
            '*': { 'grid-template-rows': '*' },
        },
        'grid-columns': {
            _common: { display: 'grid', 'column-gap': spacer['gutter-half'] },
            '*': { 'grid-template-columns': '*' },
        },
        'grid-area': {
            '*': { 'grid-area': '*' },
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
        // grid column align-self
        'grid-col-align-self': {
            'top-left': { 'align-self': 'start', 'justify-self': 'start' },
            'top-center': { 'align-self': 'start', 'justify-self': 'center' },
            'top-right': { 'align-self': 'start', 'justify-self': 'end' },
            'center-left': { 'align-self': 'center', 'justify-self': 'start' },
            'center-center': { 'align-self': 'center', 'justify-self': 'center' },
            'center-right': { 'align-self': 'center', 'justify-self': 'end' },
            'bottom-left': { 'align-self': 'end', 'justify-self': 'start' },
            'bottom-center': { 'align-self': 'end', 'justify-self': 'center' },
            'bottom-right': { 'align-self': 'end', 'justify-self': 'end' },
        },
        // grid-colum-align
        'grid-col-align': {
            'top-left': {
                'align-items': 'start',
                'justify-items': 'start',
            },
            'top-center': {
                'align-items': 'start',
                'justify-items': 'center',
            },
            'top-right': {
                'align-items': 'start',
                'justify-items': 'end',
            },
            'center-left': {
                'align-items': 'center',
                'justify-items': 'start',
            },
            'center-center': { 'justify-items': 'center', 'align-items': 'center' },
            'center-right': {
                'align-items': 'center',
                'justify-items': 'end',
            },
            'bottom-left': {
                'align-items': 'end',
                'justify-items': 'start',
            },
            'bottom-center': {
                'align-items': 'end',
                'justify-items': 'center',
            },
            'bottom-right': {
                'align-items': 'end',
                'justify-items': 'end',
            },
            'between-left': {
                'align-items': 'space-between',
                'justify-items': 'start',
            },
            'between-center': {
                'align-items': 'space-between',
                'justify-items': 'center',
            },
            'between-right': {
                'align-items': 'space-between',
                'justify-items': 'end',
            },
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
export var getMapleUtilityVariableMap = function (_a) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbGl0eS1jbGFzcy1tYXAuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXBsZS8iLCJzb3VyY2VzIjpbInV0aWxpdHktY2xhc3MtbWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxNQUFNLENBQUMsSUFBTSx1QkFBdUIsR0FBRyxVQUFDLEVBU25CO1FBUm5CLDBCQUFVLEVBQ1Ysc0JBQVEsRUFDUiwwQkFBVSxFQUNWLHNCQUFRLEVBQ1Isa0JBQU0sRUFDTiwwQkFBVSxFQUNWLGtCQUFNLEVBQ04sZ0JBQUs7SUFFTCxJQUFNLGtCQUFrQixHQUFHO1FBQ3pCLE9BQU8sRUFBRSxhQUFhO1FBQ3RCLGFBQWEsRUFBRSxRQUFRO1FBQ3ZCLGlCQUFpQixFQUFFLFFBQVE7UUFDM0IsYUFBYSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVTtRQUN2QyxhQUFhLEVBQUUsTUFBTTtRQUNyQixjQUFjLEVBQUUsT0FBTztRQUN2QixhQUFhLEVBQUUsUUFBUTtRQUN2QixjQUFjLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXO1FBQ3pDLGVBQWUsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVk7UUFDM0MsV0FBVyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUTtRQUNuQyxhQUFhLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVO1FBQ3ZDLGlCQUFpQixFQUFFLE1BQU07UUFDekIsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLElBQUksTUFBTTtRQUNsRCxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLGFBQWEsSUFBSSxRQUFRO1FBQ3pELE9BQU8sRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU87UUFDOUIsVUFBVSxFQUFFLG1CQUNGLE1BQU0sQ0FBQyxrQkFBa0IsU0FBSSxNQUFNLENBQUMsZ0JBQWdCLGtDQUN6QyxNQUFNLENBQUMsa0JBQWtCLFNBQUksTUFBTSxDQUFDLGdCQUFnQiw4QkFDeEQs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Q2hDLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxRQUFRLENBQUMsRUFBRSxFQUFFO1lBQ2hDLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxRQUFRLENBQUMsRUFBRSxFQUFFO1lBQ2hDLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxRQUFRLENBQUMsRUFBRSxFQUFFO1lBQ2hDLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxRQUFRLENBQUMsRUFBRSxFQUFFO1lBQ2hDLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxRQUFRLENBQUMsRUFBRSxFQUFFO1lBQ2hDLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxRQUFRLENBQUMsRUFBRSxFQUFFO1lBQ2hDLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxRQUFRLENBQUMsRUFBRSxFQUFFO1lBQ2hDLEdBQUcsRUFBRSxFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUU7U0FDMUI7UUFFRCxjQUFjO1FBQ2QsRUFBRSxFQUFFO1lBQ0YsS0FBSyxFQUFFLEVBQUUsYUFBYSxFQUFFLFVBQVUsQ0FBQyxLQUFLLEVBQUU7WUFDMUMsT0FBTyxFQUFFLEVBQUUsYUFBYSxFQUFFLFVBQVUsQ0FBQyxPQUFPLEVBQUU7WUFDOUMsTUFBTSxFQUFFLEVBQUUsYUFBYSxFQUFFLFVBQVUsQ0FBQyxPQUFPLEVBQUU7WUFDN0MsTUFBTSxFQUFFLEVBQUUsYUFBYSxFQUFFLFVBQVUsQ0FBQyxNQUFNLEVBQUU7WUFDNUMsSUFBSSxFQUFFLEVBQUUsYUFBYSxFQUFFLFVBQVUsQ0FBQyxJQUFJLEVBQUU7WUFDeEMsSUFBSSxFQUFFLEVBQUUsYUFBYSxFQUFFLFVBQVUsQ0FBQyxJQUFJLEVBQUU7WUFDeEMsS0FBSyxFQUFFLEVBQUUsYUFBYSxFQUFFLFVBQVUsQ0FBQyxLQUFLLEVBQUU7WUFDMUMsT0FBTyxFQUFFLEVBQUUsYUFBYSxFQUFFLFVBQVUsQ0FBQyxPQUFPLEVBQUU7U0FDL0M7UUFFRCxhQUFhO1FBQ2IsRUFBRSxFQUFFO1lBQ0YsR0FBRyxFQUFFLEVBQUUsWUFBWSxFQUFFLFFBQVEs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QUUsS0FBSyxFQUFFLEtBQUssRUFBRTtZQUNwQixFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO1lBQ3BCLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7WUFDcEIsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtZQUNwQixFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO1lBQ3BCLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7WUFDcEIsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtZQUNwQixFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO1lBQ3BCLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7WUFDcEIsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtZQUNwQixFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO1lBQ3BCLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7WUFDcEIsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtZQUNwQixFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO1lBQ3BCLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7WUFDcEIsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtZQUNwQixFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO1lBQ3BCLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7WUFDcEIsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtZQUNwQixFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO1lBQ3BCLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUU7WUFDdEIsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTtTQUNwQjtRQUVELFlBQVk7UUFDWixJQUFJLEVBQUU7WUFDSixNQUFNLEVBQUUsRUFBRSxXQUFXLEVBQUUsUUFBUSxDQUFDLEVBQUUsRUFBRTtZQUNwQyxNQUFNLEVBQUUsRUFBRSxXQUFXLEVBQUUsUUFBUSxDQUFDLEVBQUUsRUFBRTtZQUNwQyxJQUFJLEVBQUUsRUFBRSxXQUFXLEVBQUUsUUFBUSxDQUFDLEVBQUUsRUFBRTtZQUNsQyxJQUFJLEVBQUUsRUFBRSxXQUFXLEVBQUUsUUFBUSxDQUFDLEVBQUUsRUFBRTtZQUNsQyxLQUFLLEVBQUUsRUFBRSxXQUFXLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRTtZQUNwQyxDQUFDLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFO1lBQ3hCLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUU7WUFDMUIsRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRTtZQUMxQixFQUFFLEVBQUUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFO1lBQzFCLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUU7WUFDMUIsRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRTtZQUMxQixFQUFFLEVBQUUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFO1lBQzFCLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUU7WUFDMUIsRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRTtZQUMxQixFQUFFLEVBQUUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFO1lBQzFCLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUU7WUFDMUIsRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRTtZQUMxQixFQUFFLEVBQUUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFO1lBQzFCLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUU7WUFDMUIsRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRTtZQUMxQixFQUFFLEVBQUUs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QUFNLENBQUMsRUFBRTtRQUMvQyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUMvQyxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxlQUFlLENBQUMsRUFBRTtRQUMvRCxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUNqRCxFQUFFLE1BQU0sRUFBRSxlQUFlLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxlQUFlLENBQUMsRUFBRTtRQUNqRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUNuRCxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUM5QyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxlQUFlLENBQUMsRUFBRTtRQUN0RCxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUNoRCxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1FBQ3hELEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLGNBQWMsQ0FBQyxFQUFFO1FBQ3RELEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLGVBQWUsQ0FBQyxFQUFFO1FBQ3ZELEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1FBQ3JELEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLGNBQWMsRUFBRSxlQUFlLENBQUMsRUFBRTtRQUN2RSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxhQUFhLEVBQUUsZ0JBQWdCLENBQUMsRUFBRTtRQUN2RSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUMvQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxlQUFlLENBQUMsRUFBRTtRQUN2RCxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxhQUFhLENBQUMsRUFBRTtRQUNyRCxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxjQUFjLENBQUMsRUFBRTtRQUN0RCxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxZQUFZLENBQUMsRUFBRTtRQUNwRCxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxhQUFhLEVBQUUsY0FBYyxDQUFDLEVBQUU7UUFDckUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsWUFBWSxFQUFFLGVBQWUsQ0FBQyxFQUFFO1FBQ3JFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQzlDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ2hELEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ2xELEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ3BELEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsRUFBRTtRQUN6RCxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLEVBQUU7UUFDekQsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxFQUFFO1FBQzFEO1lBQ0UsTUFBTSxFQUFFLE1BQU07WUFDZCxHQUFHLEVBQUUsTUFBTTtZQUNYLEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQztTQUMxQztRQUNELEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxFQUFFO1FBQzFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLGNBQWMsQ0FBQyxFQUFFO1FBQ3RELEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLHFCQUFxQixDQUFDLEVBQUU7UUFDcEUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsa0JBQWtCLENBQUMsRUFBRTtRQUM5RCxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO1FBQ2hFLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLG9CQUFvQixDQUFDLEVBQUU7UUFDbEUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsWUFBWSxDQUFDLEVBQUU7S0FDMUQ7QUFsRHlCLENBa0R6QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWFwbGVWYXJpYWJsZU1vZGVsIH0gZnJvbSAnLi90eXBlcy92YXJpYWJsZXMubW9kZWwnO1xuXG5leHBvcnQgY29uc3QgZ2V0TWFwbGVVdGlsaXR5Q2xhc3NNYXAgPSAoe1xuICBmb250RmFtaWx5LFxuICBmb250U2l6ZSxcbiAgZm9udFdlaWdodCxcbiAgbWF4V2lkdGgsXG4gIHNwYWNlcixcbiAgdHJhbnNpdGlvbixcbiAgYnV0dG9uLFxuICBhbGVydCxcbn06IE1hcGxlVmFyaWFibGVNb2RlbCkgPT4ge1xuICBjb25zdCBidXR0b25Db21tb25TdHlsZXMgPSB7XG4gICAgZGlzcGxheTogJ2lubGluZS1mbGV4JyxcbiAgICAnYWxpZ24taXRlbXMnOiAnY2VudGVyJyxcbiAgICAnanVzdGlmeS1jb250ZW50JzogJ2NlbnRlcicsXG4gICAgJ2ZvbnQtd2VpZ2h0JzogYnV0dG9uLm5vcm1hbC5mb250V2VpZ2h0LFxuICAgICd1c2VyLXNlbGVjdCc6ICdub25lJyxcbiAgICAnYm9yZGVyLXN0eWxlJzogJ3NvbGlkJyxcbiAgICAnd2hpdGUtc3BhY2UnOiAnbm93cmFwJyxcbiAgICAnYm9yZGVyLXdpZHRoJzogYnV0dG9uLm5vcm1hbC5ib3JkZXJXaWR0aCxcbiAgICAnYm9yZGVyLXJhZGl1cyc6IGJ1dHRvbi5ub3JtYWwuYm9yZGVyUmFkaXVzLFxuICAgICdmb250LXNpemUnOiBidXR0b24ubm9ybWFsLmZvbnRTaXplLFxuICAgICdsaW5lLWhlaWdodCc6IGJ1dHRvbi5ub3JtYWwubGluZUhlaWdodCxcbiAgICAndGV4dC1kZWNvcmF0aW9uJzogJ25vbmUnLFxuICAgICd0ZXh0LXRyYW5zZm9ybSc6IGJ1dHRvbi5ub3JtYWwudGV4dENhc2UgfHwgJ25vbmUnLFxuICAgICdsZXR0ZXItc3BhY2luZyc6IGJ1dHRvbi5ub3JtYWwubGV0dGVyU3BhY2luZyB8fCAnbm9ybWFsJyxcbiAgICBwYWRkaW5nOiBidXR0b24ubm9ybWFsLnBhZGRpbmcsXG4gICAgdHJhbnNpdGlvbjogYFxuICAgICAgY29sb3IgJHtidXR0b24udHJhbnNpdGlvbkR1cmF0aW9ufSAke2J1dHRvbi50cmFuc2l0aW9uVGltaW5nfSxcbiAgICAgIGJhY2tncm91bmQtY29sb3IgJHtidXR0b24udHJhbnNpdGlvbkR1cmF0aW9ufSAke2J1dHRvbi50cmFuc2l0aW9uVGltaW5nfSxcbiAgICAgIGJvcmRlci1jb2xvciAke2J1dHRvbi50cmFuc2l0aW9uRHVyYXRpb259ICR7YnV0dG9uLnRyYW5zaXRpb25UaW1pbmd9XG4gICAgYCxcbiAgfTtcblxuICBjb25zdCBhbGVydENvbW1vblN0eWxlcyA9IHtcbiAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgJ2FsaWduLWl0ZW1zJzogJ2NlbnRlcicsXG4gICAgJ2p1c3RpZnktY29udGVudCc6ICdmbGV4LXN0YXJ0JyxcbiAgICAnZm9udC13ZWlnaHQnOiBhbGVydC5ub3JtYWwuZm9udFdlaWdodCxcbiAgICAndXNlci1zZWxlY3QnOiAnbm9uZScsXG4gICAgJ2JvcmRlci1zdHlsZSc6ICdzb2xpZCcsXG4gICAgJ2JvcmRlci13aWR0aCc6IGFsZXJ0Lm5vcm1hbC5ib3JkZXJXaWR0aCxcbiAgICAnYm9yZGVyLXJhZGl1cyc6IGFsZXJ0Lm5vcm1hbC5ib3JkZXJSYWRpdXMsXG4gICAgJ2ZvbnQtc2l6ZSc6IGFsZXJ0Lm5vcm1hbC5mb250U2l6ZSxcbiAgICAnbGluZS1oZWlnaHQnOiBhbGVydC5ub3JtYWwubGluZUhlaWdodCxcbiAgICAndGV4dC1kZWNvcmF0aW9uJzogJ25vbmUnLFxuICAgIHBhZGRpbmc6IGFsZXJ0Lm5vcm1hbC5wYWRkaW5nLFxuICB9O1xuXG4gIHJldHVybiB7XG4gICAgYWxlcnQ6IHtcbiAgICAgIF9jb21tb246IGFsZXJ0Q29tbW9uU3R5bGVzLFxuICAgIH0sXG5cbiAgICAnYWxlcnQtb3V0bGluZSc6IHtcbiAgICAgIF9jb21tb246IGFsZXJ0Q29tbW9uU3R5bGVzLFxuICAgIH0sXG5cbiAgICAnYWxlcnQtc2l6ZSc6IHtcbiAgICAgIHNtYWxsOiB7XG4gICAgICAgICdib3JkZXItd2lkdGgnOiBhbGVydC5zbWFsbC5ib3JkZXJXaWR0aCxcbiAgICAgICAgJ2JvcmRlci1yYWRpdXMnOiBhbGVydC5zbWFsbC5ib3JkZXJSYWRpdXMsXG4gICAgICAgICdmb250LXNpemUnOiBhbGVydC5zbWFsbC5mb250U2l6ZSxcbiAgICAgICAgJ2ZvbnQtd2VpZ2h0JzogYWxlcnQuc21hbGwuZm9udFdlaWdodCxcbiAgICAgICAgJ2xpbmUtaGVpZ2h0JzogYWxlcnQuc21hbGwubGluZUhlaWdodCxcbiAgICAgICAgcGFkZGluZzogYWxlcnQuc21hbGwucGFkZGluZyxcbiAgICAgIH0sXG4gICAgICBub3JtYWw6IHtcbiAgICAgICAgJ2JvcmRlci13aWR0aCc6IGFsZXJ0Lm5vcm1hbC5ib3JkZXJXaWR0aCxcbiAgICAgICAgJ2JvcmRlci1yYWRpdXMnOiBhbGVydC5ub3JtYWwuYm9yZGVyUmFkaXVzLFxuICAgICAgICAnZm9udC1zaXplJzogYWxlcnQubm9ybWFsLmZvbnRTaXplLFxuICAgICAgICAnZm9udC13ZWlnaHQnOiBhbGVydC5ub3JtYWwuZm9udFdlaWdodCxcbiAgICAgICAgJ2xpbmUtaGVpZ2h0JzogYWxlcnQubm9ybWFsLmxpbmVIZWlnaHQsXG4gICAgICAgIHBhZGRpbmc6IGFsZXJ0Lm5vcm1hbC5wYWRkaW5nLFxuICAgICAgfSxcbiAgICAgIG1lZGl1bToge1xuICAgICAgICAnYm9yZGVyLXdpZHRoJzogYWxlcnQubWVkaXVtLmJvcmRlcldpZHRoLFxuICAgICAgICAnYm9yZGVyLXJhZGl1cyc6IGFsZXJ0Lm1lZGl1bS5ib3JkZXJSYWRpdXMsXG4gICAgICAgICdmb250LXNpemUnOiBhbGVydC5tZWRpdW0uZm9udFNpemUsXG4gICAgICAgICdmb250LXdlaWdodCc6IGFsZXJ0Lm1lZGl1bS5mb250V2VpZ2h0LFxuICAgICAgICAnbGluZS1oZWlnaHQnOiBhbGVydC5tZWRpdW0ubGluZUhlaWdodCxcbiAgICAgICAgcGFkZGluZzogYWxlcnQubWVkaXVtLnBhZGRpbmcsXG4gICAgICB9LFxuICAgICAgbGFyZ2U6IHtcbiAgICAgICAgJ2JvcmRlci13aWR0aCc6IGFsZXJ0LmxhcmdlLmJvcmRlcldpZHRoLFxuICAgICAgICAnYm9yZGVyLXJhZGl1cyc6IGFsZXJ0LmxhcmdlLmJvcmRlclJhZGl1cyxcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6IGFsZXJ0LmxhcmdlLmZvbnRTaXplLFxuICAgICAgICAnZm9udC13ZWlnaHQnOiBhbGVydC5sYXJnZS5mb250V2VpZ2h0LFxuICAgICAgICAnbGluZS1oZWlnaHQnOiBhbGVydC5sYXJnZS5saW5lSGVpZ2h0LFxuICAgICAgICBwYWRkaW5nOiBhbGVydC5sYXJnZS5wYWRkaW5nLFxuICAgICAgfSxcbiAgICB9LFxuXG4gICAgLy8gYW5pbWF0aW9uXG4gICAgYW5pbWF0aW9uOiB7XG4gICAgICAnKic6IHsgYW5pbWF0aW9uOiAnKicgfSxcbiAgICB9LFxuXG4gICAgLy8gYmFja2dyb3VuZC1pbWFnZVxuICAgIGJnaToge1xuICAgICAgbm9uZTogeyAnYmFja2dyb3VuZC1pbWFnZSc6ICdub25lJyB9LFxuICAgICAgJyonOiB7ICdiYWNrZ3JvdW5kLWltYWdlJzogJ3VybChcIipcIiknIH0sXG4gICAgfSxcblxuICAgIC8vIGJhY2tncm91bmQtcmVwZWF0XG4gICAgJ2JnLXJlcGVhdCc6IHtcbiAgICAgIG5vOiB7ICdiYWNrZ3JvdW5kLXJlcGVhdCc6ICduby1yZXBlYXQnIH0sXG4gICAgICB5ZXM6IHsgJ2JhY2tncm91bmQtcmVwZWF0JzogJ3JlcGVhdCcgfSxcbiAgICAgICcqJzogeyAnYmFja2dyb3VuZC1yZXBlYXQnOiAnKicgfSxcbiAgICB9LFxuXG4gICAgLy8gYm9yZGVyXG4gICAgYjoge1xuICAgICAgbm9uZTogeyBib3JkZXI6ICdub25lJyB9LFxuICAgICAgJyonOiB7IGJvcmRlcjogJyonIH0sXG4gICAgfSxcblxuICAgIC8vIGJvcmRlci1yYWRpdXNcbiAgICBicjoge1xuICAgICAgZnVsbDogeyAnYm9yZGVyLXJhZGl1cyc6ICcxMDAlJyB9LFxuICAgICAgaGFsZjogeyAnYm9yZGVyLXJhZGl1cyc6ICc1MCUnIH0sXG4gICAgICBxdWFydGVyOiB7ICdib3JkZXItcmFkaXVzJzogJzI1JScgfSxcbiAgICAgIDA6IHsgJ2JvcmRlci1yYWRpdXMnOiAwIH0sXG4gICAgICAnKic6IHsgJ2JvcmRlci1yYWRpdXMnOiAnKicgfSxcbiAgICB9LFxuXG4gICAgLy8gYm9yZGVyLXNwYWNpbmdcblxuICAgICdib3JkZXItc3BhY2luZyc6IHtcbiAgICAgIDA6IHsgJ2JvcmRlci1zcGFjaW5nJzogMCB9LFxuICAgICAgJyonOiB7ICdib3JkZXItc3BhY2luZyc6ICcqJyB9LFxuICAgIH0sXG5cbiAgICAvLyBib3JkZXItY29sbGFwc2VcblxuICAgICdib3JkZXItY29sbGFwc2UnOiB7XG4gICAgICBjb2xsYXBzZTogeyAnYm9yZGVyLWNvbGxhcHNlJzogJ2NvbGxhcHNlJyB9LFxuICAgICAgcmV2ZXJ0OiB7ICdib3JkZXItY29sbGFwc2UnOiAncmV2ZXJ0JyB9LFxuICAgICAgc2VwYXJhdGU6IHsgJ2JvcmRlci1jb2xsYXBzZSc6ICdzZXBhcmF0ZScgfSxcbiAgICAgICcqJzogeyAnYm9yZGVyLWNvbGxhcHNlJzogJyonIH0sXG4gICAgfSxcblxuICAgIC8vIGJveC1zaGFkb3dcbiAgICBiczoge1xuICAgICAgbm9uZTogeyAnYm94LXNoYWRvdyc6ICdub25lJyB9LFxuICAgICAgJyonOiB7ICdib3gtc2hhZG93JzogJyonIH0sXG4gICAgfSxcblxuICAgIGJ3OiB7XG4gICAgICBfY29tbW9uOiB7ICdib3JkZXItc3R5bGUnOiAnc29saWQnIH0sXG4gICAgICAwOiB7ICdib3JkZXItd2lkdGgnOiAnMCcgfSxcbiAgICAgICcqJzogeyAnYm9yZGVyLXdpZHRoJzogJyonIH0sXG4gICAgfSxcblxuICAgICdidy10b3AnOiB7XG4gICAgICBfY29tbW9uOiB7ICdib3JkZXItdG9wLXN0eWxlJzogJ3NvbGlkJyB9LFxuICAgICAgMDogeyAnYm9yZGVyLXRvcC13aWR0aCc6ICcwJyB9LFxuICAgICAgJyonOiB7ICdib3JkZXItdG9wLXdpZHRoJzogJyonIH0sXG4gICAgfSxcblxuICAgICdidy1ib3R0b20nOiB7XG4gICAgICBfY29tbW9uOiB7ICdib3JkZXItYm90dG9tLXN0eWxlJzogJ3NvbGlkJyB9LFxuICAgICAgMDogeyAnYm9yZGVyLWJvdHRvbS13aWR0aCc6ICcwJyB9LFxuICAgICAgJyonOiB7ICdib3JkZXItYm90dG9tLXdpZHRoJzogJyonIH0sXG4gICAgfSxcblxuICAgICdidy1sZWZ0Jzoge1xuICAgICAgX2NvbW1vbjogeyAnYm9yZGVyLWxlZnQtc3R5bGUnOiAnc29saWQnIH0sXG4gICAgICAwOiB7ICdib3JkZXItbGVmdC13aWR0aCc6ICcwJyB9LFxuICAgICAgJyonOiB7ICdib3JkZXItbGVmdC13aWR0aCc6ICcqJyB9LFxuICAgIH0sXG5cbiAgICAnYnctcmlnaHQnOiB7XG4gICAgICBfY29tbW9uOiB7ICdib3JkZXItcmlnaHQtc3R5bGUnOiAnc29saWQnIH0sXG4gICAgICAwOiB7ICdib3JkZXItcmlnaHQtd2lkdGgnOiAnMCcgfSxcbiAgICAgICcqJzogeyAnYm9yZGVyLXJpZ2h0LXdpZHRoJzogJyonIH0sXG4gICAgfSxcblxuICAgIGxpbms6IHtcbiAgICAgIF9jb21tb246IHtcbiAgICAgICAgLi4uYnV0dG9uQ29tbW9uU3R5bGVzLFxuICAgICAgICBib3JkZXI6ICdub25lJyxcbiAgICAgICAgJ3RleHQtZGVjb3JhdGlvbic6ICd1bmRlcmxpbmUnLFxuICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6ICd0cmFuc3BhcmVudCcsXG4gICAgICB9LFxuICAgIH0sXG5cbiAgICBidG46IHtcbiAgICAgIF9jb21tb246IGJ1dHRvbkNvbW1vblN0eWxlcyxcbiAgICB9LFxuXG4gICAgJ2J0bi1vdXRsaW5lJzoge1xuICAgICAgX2NvbW1vbjogYnV0dG9uQ29tbW9uU3R5bGVzLFxuICAgIH0sXG5cbiAgICAnYnRuLXNpemUnOiB7XG4gICAgICBzbWFsbDoge1xuICAgICAgICAnYm9yZGVyLXdpZHRoJzogYnV0dG9uLnNtYWxsLmJvcmRlcldpZHRoLFxuICAgICAgICAnYm9yZGVyLXJhZGl1cyc6IGJ1dHRvbi5zbWFsbC5ib3JkZXJSYWRpdXMsXG4gICAgICAgICdmb250LXNpemUnOiBidXR0b24uc21hbGwuZm9udFNpemUsXG4gICAgICAgICdmb250LXdlaWdodCc6IGJ1dHRvbi5zbWFsbC5mb250V2VpZ2h0LFxuICAgICAgICAnbGluZS1oZWlnaHQnOiBidXR0b24uc21hbGwubGluZUhlaWdodCxcbiAgICAgICAgJ3RleHQtdHJhbnNmb3JtJzogYnV0dG9uLnNtYWxsLnRleHRDYXNlIHx8ICdub25lJyxcbiAgICAgICAgJ2xldHRlci1zcGFjaW5nJzogYnV0dG9uLnNtYWxsLmxldHRlclNwYWNpbmcgfHwgJ25vcm1hbCcsXG4gICAgICAgIHBhZGRpbmc6IGJ1dHRvbi5zbWFsbC5wYWRkaW5nLFxuICAgICAgfSxcbiAgICAgIG5vcm1hbDoge1xuICAgICAgICAnYm9yZGVyLXdpZHRoJzogYnV0dG9uLm5vcm1hbC5ib3JkZXJXaWR0aCxcbiAgICAgICAgJ2JvcmRlci1yYWRpdXMnOiBidXR0b24ubm9ybWFsLmJvcmRlclJhZGl1cyxcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6IGJ1dHRvbi5ub3JtYWwuZm9udFNpemUsXG4gICAgICAgICdmb250LXdlaWdodCc6IGJ1dHRvbi5ub3JtYWwuZm9udFdlaWdodCxcbiAgICAgICAgJ2xpbmUtaGVpZ2h0JzogYnV0dG9uLm5vcm1hbC5saW5lSGVpZ2h0LFxuICAgICAgICAndGV4dC10cmFuc2Zvcm0nOiBidXR0b24ubm9ybWFsLnRleHRDYXNlIHx8ICdub25lJyxcbiAgICAgICAgJ2xldHRlci1zcGFjaW5nJzogYnV0dG9uLm5vcm1hbC5sZXR0ZXJTcGFjaW5nIHx8ICdub3JtYWwnLFxuICAgICAgICBwYWRkaW5nOiBidXR0b24ubm9ybWFsLnBhZGRpbmcsXG4gICAgICB9LFxuICAgICAgbWVkaXVtOiB7XG4gICAgICAgICdib3JkZXItd2lkdGgnOiBidXR0b24ubWVkaXVtLmJvcmRlcldpZHRoLFxuICAgICAgICAnYm9yZGVyLXJhZGl1cyc6IGJ1dHRvbi5tZWRpdW0uYm9yZGVyUmFkaXVzLFxuICAgICAgICAnZm9udC1zaXplJzogYnV0dG9uLm1lZGl1bS5mb250U2l6ZSxcbiAgICAgICAgJ2ZvbnQtd2VpZ2h0JzogYnV0dG9uLm1lZGl1bS5mb250V2VpZ2h0LFxuICAgICAgICAnbGluZS1oZWlnaHQnOiBidXR0b24ubWVkaXVtLmxpbmVIZWlnaHQsXG4gICAgICAgICd0ZXh0LXRyYW5zZm9ybSc6IGJ1dHRvbi5tZWRpdW0udGV4dENhc2UgfHwgJ25vbmUnLFxuICAgICAgICAnbGV0dGVyLXNwYWNpbmcnOiBidXR0b24ubWVkaXVtLmxldHRlclNwYWNpbmcgfHwgJ25vcm1hbCcsXG4gICAgICAgIHBhZGRpbmc6IGJ1dHRvbi5tZWRpdW0ucGFkZGluZyxcbiAgICAgIH0sXG4gICAgICBsYXJnZToge1xuICAgICAgICAnYm9yZGVyLXdpZHRoJzogYnV0dG9uLmxhcmdlLmJvcmRlcldpZHRoLFxuICAgICAgICAnYm9yZGVyLXJhZGl1cyc6IGJ1dHRvbi5sYXJnZS5ib3JkZXJSYWRpdXMsXG4gICAgICAgICdmb250LXNpemUnOiBidXR0b24ubGFyZ2UuZm9udFNpemUsXG4gICAgICAgICdmb250LXdlaWdodCc6IGJ1dHRvbi5sYXJnZS5mb250V2VpZ2h0LFxuICAgICAgICAnbGluZS1oZWlnaHQnOiBidXR0b24ubGFyZ2UubGluZUhlaWdodCxcbiAgICAgICAgJ3RleHQtdHJhbnNmb3JtJzogYnV0dG9uLmxhcmdlLnRleHRDYXNlIHx8ICdub25lJyxcbiAgICAgICAgJ2xldHRlci1zcGFjaW5nJzogYnV0dG9uLmxhcmdlLmxldHRlclNwYWNpbmcgfHwgJ25vcm1hbCcsXG4gICAgICAgIHBhZGRpbmc6IGJ1dHRvbi5sYXJnZS5wYWRkaW5nLFxuICAgICAgfSxcbiAgICB9LFxuXG4gICAgLy8gbWl4LWJsZW5kLW1vZGVcbiAgICBibGVuZDoge1xuICAgICAgJ2NvbG9yLWJ1cm4nOiB7ICdtaXgtYmxlbmQtbW9kZSc6ICdjb2xvci1idXJuJyB9LFxuICAgICAgJ2NvbG9yLWRvZGdlJzogeyAnbWl4LWJsZW5kLW1vZGUnOiAnY29sb3ItZG9kZ2UnIH0sXG4gICAgICAnaGFyZC1saWdodCc6IHsgJ21peC1ibGVuZC1tb2RlJzogJ2hhcmQtbGlnaHQnIH0sXG4gICAgICAnc29mdC1saWdodCc6IHsgJ21peC1ibGVuZC1tb2RlJzogJ3NvZnQtbGlnaHQnIH0sXG4gICAgICBjb2xvcjogeyAnbWl4LWJsZW5kLW1vZGUnOiAnY29sb3InIH0sXG4gICAgICBkYXJrZW46IHsgJ21peC1ibGVuZC1tb2RlJzogJ2RhcmtlbicgfSxcbiAgICAgIGRpZmZlcmVuY2U6IHsgJ21peC1ibGVuZC1tb2RlJzogJ2RpZmZlcmVuY2UnIH0sXG4gICAgICBleGNsdXNpb246IHsgJ21peC1ibGVuZC1tb2RlJzogJ2V4Y2x1c2lvbicgfSxcbiAgICAgIGh1ZTogeyAnbWl4LWJsZW5kLW1vZGUnOiAnaHVlJyB9LFxuICAgICAgaW5oZXJpdDogeyAnbWl4LWJsZW5kLW1vZGUnOiAnaW5oZXJpdCcgfSxcbiAgICAgIGxpZ2h0ZW46IHsgJ21peC1ibGVuZC1tb2RlJzogJ2xpZ2h0ZW4nIH0sXG4gICAgICBsdW1pbm9zaXR5OiB7ICdtaXgtYmxlbmQtbW9kZSc6ICdsdW1pbm9zaXR5JyB9LFxuICAgICAgbXVsdGlwbHk6IHsgJ21peC1ibGVuZC1tb2RlJzogJ211bHRpcGx5JyB9LFxuICAgICAgbm9ybWFsOiB7ICdtaXgtYmxlbmQtbW9kZSc6ICdub3JtYWwnIH0sXG4gICAgICBvdmVybGF5OiB7ICdtaXgtYmxlbmQtbW9kZSc6ICdvdmVybGF5JyB9LFxuICAgICAgc2F0dXJhdGlvbjogeyAnbWl4LWJsZW5kLW1vZGUnOiAnc2F0dXJhdGlvbicgfSxcbiAgICAgIHNjcmVlbjogeyAnbWl4LWJsZW5kLW1vZGUnOiAnc2NyZWVuJyB9LFxuICAgIH0sXG5cbiAgICAvLyBiYWNrZHJvcCBibHVyXG4gICAgJ2JhY2tkcm9wLWJsdXInOiB7XG4gICAgICAwOiB7ICdiYWNrZHJvcC1maWx0ZXInOiAnYmx1cigwKScgfSxcbiAgICAgICcqJzogeyAnYmFja2Ryb3AtZmlsdGVyJzogJ2JsdXIoKiknIH0sXG4gICAgfSxcblxuICAgIC8vIGZpbHRlciBpbnZlcnRcbiAgICBpbnZlcnQ6IHtcbiAgICAgIGZ1bGw6IHsgZmlsdGVyOiAnaW52ZXJ0KDEpJyB9LFxuICAgICAgbm9uZTogeyBmaWx0ZXI6ICdpbnZlcnQoMCknIH0sXG4gICAgICAnKic6IHsgZmlsdGVyOiAnaW52ZXJ0KCopJyB9LFxuICAgIH0sXG5cbiAgICBncmF5c2NhbGU6IHtcbiAgICAgIGZ1bGw6IHsgZmlsdGVyOiAnZ3JheXNjYWxlKDEpJyB9LFxuICAgICAgbm9uZTogeyBmaWx0ZXI6ICdncmF5c2NhbGUoMCknIH0sXG4gICAgICAnKic6IHsgZmlsdGVyOiAnZ3JheXNjYWxlKCopJyB9LFxuICAgIH0sXG5cbiAgICBjb250ZW50OiB7XG4gICAgICAnKic6IHsgY29udGVudDogJ1wiKlwiJyB9LFxuICAgIH0sXG5cbiAgICAvLyBlbGVtZW50IGF0dHJpYnV0ZVxuICAgIGF0dHI6IHtcbiAgICAgICcqJzogeyBjb250ZW50OiAnYXR0cigqKScgfSxcbiAgICB9LFxuXG4gICAgLy8gY29sdW1uLWNvdW50XG4gICAgJ2NvbC1jb3VudCc6IHtcbiAgICAgIDE6IHsgJ2NvbHVtbi1jb3VudCc6IDEgfSxcbiAgICAgIDI6IHsgJ2NvbHVtbi1jb3VudCc6IDIgfSxcbiAgICAgIDM6IHsgJ2NvbHVtbi1jb3VudCc6IDMgfSxcbiAgICAgIDQ6IHsgJ2NvbHVtbi1jb3VudCc6IDQgfSxcbiAgICAgIDU6IHsgJ2NvbHVtbi1jb3VudCc6IDUgfSxcbiAgICAgICcqJzogeyAnY29sdW1uLWNvdW50JzogJyonIH0sXG4gICAgfSxcblxuICAgIC8vIGNvbHVtbi1ydWxlLXdpZHRoXG4gICAgJ2NvbC1idyc6IHtcbiAgICAgIF9jb21tb246IHsgJ2NvbHVtbi1ydWxlLXdpZHRoJzogJ3NvbGlkJyB9LFxuICAgICAgMDogeyAnY29sdW1uLXJ1bGUtd2lkdGgnOiAnMCcgfSxcbiAgICAgICcqJzogeyAnY29sdW1uLXJ1bGUtd2lkdGgnOiAnKicgfSxcbiAgICB9LFxuXG4gICAgLy8gY29sdW1uLXNwYW5cbiAgICAnY29sLXNwYW4nOiB7XG4gICAgICBhbGw6IHsgJ2NvbHVtbi1zcGFuJzogJ2FsbCcgfSxcbiAgICAgIG5vbmU6IHsgJ2NvbHVtbi1zcGFuJzogJ25vbmUnIH0sXG4gICAgfSxcblxuICAgIC8vIGN1cnNvclxuICAgIGN1cnNvcjoge1xuICAgICAgcG9pbnRlcjogeyBjdXJzb3I6ICdwb2ludGVyJyB9LFxuICAgICAgZGVmYXVsdDogeyBjdXJzb3I6ICdkZWZhdWx0JyB9LFxuICAgICAgJyonOiB7IGN1cnNvcjogJyonIH0sXG4gICAgfSxcblxuICAgIC8vIGJyZWFrLWFmdGVyXG4gICAgJ2JyZWFrLWJlZm9yZSc6IHtcbiAgICAgIHllczogeyAnYnJlYWstYmVmb3JlJzogJ2NvbHVtbicgfSxcbiAgICAgIG5vOiB7ICdicmVhay1iZWZvcmUnOiAnYXZvaWQnIH0sXG4gICAgfSxcblxuICAgIC8vIGJyZWFrLWJlZm9yZVxuICAgICdicmVhay1hZnRlcic6IHtcbiAgICAgIHllczogeyAnYnJlYWstYWZ0ZXInOiAnY29sdW1uJyB9LFxuICAgICAgbm86IHsgJ2JyZWFrLWFmdGVyJzogJ2F2b2lkJyB9LFxuICAgIH0sXG5cbiAgICAvLyBicmVhay1pbnNpZGVcbiAgICAnYnJlYWstaW5zaWRlJzoge1xuICAgICAgeWVzOiB7ICdicmVhay1pbnNpZGUnOiAnY29sdW1uJyB9LFxuICAgICAgbm86IHsgJ2JyZWFrLWluc2lkZSc6ICdhdm9pZCcgfSxcbiAgICB9LFxuXG4gICAgLy8gZGlzcGxheVxuICAgIGQ6IHtcbiAgICAgIG5vbmU6IHsgZGlzcGxheTogJ25vbmUnIH0sXG4gICAgICBibG9jazogeyBkaXNwbGF5OiAnYmxvY2snIH0sXG4gICAgICBpbmxpbmU6IHsgZGlzcGxheTogJ2lubGluZScgfSxcbiAgICAgIGluYmxvY2s6IHsgZGlzcGxheTogJ2lubGluZS1ibG9jaycgfSxcbiAgICAgIGZseDogeyBkaXNwbGF5OiAnZmxleCcgfSxcbiAgICAgIGluZmx4OiB7IGRpc3BsYXk6ICdpbmxpbmUtZmxleCcgfSxcbiAgICAgIHRhYmxlOiB7IGRpc3BsYXk6ICd0YWJsZScgfSxcbiAgICAgIHRyb3c6IHsgZGlzcGxheTogJ3RhYmxlLXJvdycgfSxcbiAgICAgIHRjZWxsOiB7IGRpc3BsYXk6ICd0YWJsZS1jZWxsJyB9LFxuICAgICAgbGl0ZW06IHsgZGlzcGxheTogJ2xpc3QtaXRlbScgfSxcbiAgICB9LFxuXG4gICAgLy8gaGVhZGluZ3MgZnJvbSAxIHRvIDZcbiAgICBmaDoge1xuICAgICAgX2NvbW1vbjogeyAnZm9udC13ZWlnaHQnOiBmb250V2VpZ2h0LmhlYWRpbmcgfSxcbiAgICAgIDE6IHtcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6IGZvbnRTaXplLmgxLFxuICAgICAgICAnbWFyZ2luLWJvdHRvbSc6IHNwYWNlcls1XSxcbiAgICAgIH0sXG4gICAgICAyOiB7XG4gICAgICAgICdmb250LXNpemUnOiBmb250U2l6ZS5oMixcbiAgICAgICAgJ21hcmdpbi1ib3R0b20nOiBzcGFjZXJbNF0sXG4gICAgICB9LFxuICAgICAgMzoge1xuICAgICAgICAnZm9udC1zaXplJzogZm9udFNpemUuaDMsXG4gICAgICAgICdtYXJnaW4tYm90dG9tJzogc3BhY2VyWzNdLFxuICAgICAgfSxcbiAgICAgIDQ6IHtcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6IGZvbnRTaXplLmg0LFxuICAgICAgICAnbWFyZ2luLWJvdHRvbSc6IHNwYWNlclszXSxcbiAgICAgIH0sXG4gICAgICA1OiB7XG4gICAgICAgICdmb250LXNpemUnOiBmb250U2l6ZS5oNSxcbiAgICAgICAgJ21hcmdpbi1ib3R0b20nOiBzcGFjZXJbM10sXG4gICAgICB9LFxuICAgICAgNjoge1xuICAgICAgICAnZm9udC1zaXplJzogZm9udFNpemUuaDYsXG4gICAgICAgICdtYXJnaW4tYm90dG9tJzogc3BhY2VyWzJdLFxuICAgICAgfSxcbiAgICB9LFxuXG4gICAgLy8gcHJhZ3JhcGggZnJvbSAxIHRvIDZcbiAgICBmcDoge1xuICAgICAgMToge1xuICAgICAgICAnZm9udC1zaXplJzogZm9udFNpemUucDEsXG4gICAgICAgICdtYXJnaW4tYm90dG9tJzogc3BhY2VyWzJdLFxuICAgICAgfSxcbiAgICAgIDI6IHtcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6IGZvbnRTaXplLnAyLFxuICAgICAgICAnbWFyZ2luLWJvdHRvbSc6IHNwYWNlclsyXSxcbiAgICAgIH0sXG4gICAgICAzOiB7XG4gICAgICAgICdmb250LXNpemUnOiBmb250U2l6ZS5wMyxcbiAgICAgICAgJ21hcmdpbi1ib3R0b20nOiBzcGFjZXJbMl0sXG4gICAgICB9LFxuICAgICAgNDoge1xuICAgICAgICAnZm9udC1zaXplJzogZm9udFNpemUucDQsXG4gICAgICAgICdtYXJnaW4tYm90dG9tJzogc3BhY2VyWzFdLFxuICAgICAgfSxcbiAgICAgIDU6IHtcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6IGZvbnRTaXplLnA1LFxuICAgICAgICAnbWFyZ2luLWJvdHRvbSc6IHNwYWNlclsxXSxcbiAgICAgIH0sXG4gICAgICA2OiB7XG4gICAgICAgICdmb250LXNpemUnOiBmb250U2l6ZS5wNixcbiAgICAgICAgJ21hcmdpbi1ib3R0b20nOiBzcGFjZXJbMV0sXG4gICAgICB9LFxuICAgIH0sXG5cbiAgICAvLyBmb250LXNpemVcbiAgICBmczoge1xuICAgICAgaW5oZXJpdDogeyAnZm9udC1zaXplJzogJ2luaGVyaXQnIH0sXG4gICAgICBoMTogeyAnZm9udC1zaXplJzogZm9udFNpemUuaDEgfSxcbiAgICAgIGgyOiB7ICdmb250LXNpemUnOiBmb250U2l6ZS5oMiB9LFxuICAgICAgaDM6IHsgJ2ZvbnQtc2l6ZSc6IGZvbnRTaXplLmgzIH0sXG4gICAgICBoNDogeyAnZm9udC1zaXplJzogZm9udFNpemUuaDQgfSxcbiAgICAgIGg1OiB7ICdmb250LXNpemUnOiBmb250U2l6ZS5oNSB9LFxuICAgICAgaDY6IHsgJ2ZvbnQtc2l6ZSc6IGZvbnRTaXplLmg2IH0sXG4gICAgICBwMTogeyAnZm9udC1zaXplJzogZm9udFNpemUucDEgfSxcbiAgICAgIHAyOiB7ICdmb250LXNpemUnOiBmb250U2l6ZS5wMiB9LFxuICAgICAgcDM6IHsgJ2ZvbnQtc2l6ZSc6IGZvbnRTaXplLnAzIH0sXG4gICAgICBwNDogeyAnZm9udC1zaXplJzogZm9udFNpemUucDQgfSxcbiAgICAgIHA1OiB7ICdmb250LXNpemUnOiBmb250U2l6ZS5wNSB9LFxuICAgICAgcDY6IHsgJ2ZvbnQtc2l6ZSc6IGZvbnRTaXplLnA2IH0sXG4gICAgICBpMTogeyAnZm9udC1zaXplJzogZm9udFNpemUuaTEgfSxcbiAgICAgIGkyOiB7ICdmb250LXNpemUnOiBmb250U2l6ZS5pMiB9LFxuICAgICAgaTM6IHsgJ2ZvbnQtc2l6ZSc6IGZvbnRTaXplLmkzIH0sXG4gICAgICBpNDogeyAnZm9udC1zaXplJzogZm9udFNpemUuaTQgfSxcbiAgICAgIGk1OiB7ICdmb250LXNpemUnOiBmb250U2l6ZS5pNSB9LFxuICAgICAgaTY6IHsgJ2ZvbnQtc2l6ZSc6IGZvbnRTaXplLmk2IH0sXG4gICAgICAnKic6IHsgJ2ZvbnQtc2l6ZSc6ICcqJyB9LFxuICAgIH0sXG5cbiAgICAvLyBmb250LXdlaWdodFxuICAgIGZ3OiB7XG4gICAgICBsaWdodDogeyAnZm9udC13ZWlnaHQnOiBmb250V2VpZ2h0LmxpZ2h0IH0sXG4gICAgICByZWd1bGFyOiB7ICdmb250LXdlaWdodCc6IGZvbnRXZWlnaHQucmVndWxhciB9LFxuICAgICAgbm9ybWFsOiB7ICdmb250LXdlaWdodCc6IGZvbnRXZWlnaHQucmVndWxhciB9LCAvLyBhbGlhc1xuICAgICAgbWVkaXVtOiB7ICdmb250LXdlaWdodCc6IGZvbnRXZWlnaHQubWVkaXVtIH0sXG4gICAgICBzZW1pOiB7ICdmb250LXdlaWdodCc6IGZvbnRXZWlnaHQuc2VtaSB9LFxuICAgICAgYm9sZDogeyAnZm9udC13ZWlnaHQnOiBmb250V2VpZ2h0LmJvbGQgfSxcbiAgICAgIGV4dHJhOiB7ICdmb250LXdlaWdodCc6IGZvbnRXZWlnaHQuZXh0cmEgfSxcbiAgICAgIGhlYWRpbmc6IHsgJ2ZvbnQtd2VpZ2h0JzogZm9udFdlaWdodC5oZWFkaW5nIH0sXG4gICAgfSxcblxuICAgIC8vIGZvbnQtc3R5bGVcbiAgICBmaToge1xuICAgICAgeWVzOiB7ICdmb250LXN0eWxlJzogJ2l0YWxpYycgfSxcbiAgICAgIG5vOiB7ICdmb250LXN0eWxlJzogJ25vcm1hbCcgfSxcbiAgICB9LFxuXG4gICAgLy8gZmxleC1jb2x1bW4gYWxpZ24tc2VsZlxuICAgICdmbHgtY29sLWFsaWduLXNlbGYnOiB7XG4gICAgICAndG9wLWxlZnQnOiB7ICdqdXN0aWZ5LXNlbGYnOiAnZmxleC1zdGFydCcsICdhbGlnbi1zZWxmJzogJ2ZsZXgtc3RhcnQnIH0sXG4gICAgICAndG9wLWNlbnRlcic6IHsgJ2p1c3RpZnktc2VsZic6ICdmbGV4LXN0YXJ0JywgJ2FsaWduLXNlbGYnOiAnY2VudGVyJyB9LFxuICAgICAgJ3RvcC1yaWdodCc6IHsgJ2p1c3RpZnktc2VsZic6ICdmbGV4LXN0YXJ0JywgJ2FsaWduLXNlbGYnOiAnZmxleC1lbmQnIH0sXG4gICAgICAnY2VudGVyLWxlZnQnOiB7ICdqdXN0aWZ5LXNlbGYnOiAnY2VudGVyJywgJ2FsaWduLXNlbGYnOiAnZmxleC1zdGFydCcgfSxcbiAgICAgICdjZW50ZXItY2VudGVyJzogeyAnanVzdGlmeS1zZWxmJzogJ2NlbnRlcicsICdhbGlnbi1zZWxmJzogJ2NlbnRlcicgfSxcbiAgICAgICdjZW50ZXItcmlnaHQnOiB7ICdqdXN0aWZ5LXNlbGYnOiAnY2VudGVyJywgJ2FsaWduLXNlbGYnOiAnZmxleC1lbmQnIH0sXG4gICAgICAnYm90dG9tLWxlZnQnOiB7ICdqdXN0aWZ5LXNlbGYnOiAnZmxleC1lbmQnLCAnYWxpZ24tc2VsZic6ICdmbGV4LXN0YXJ0JyB9LFxuICAgICAgJ2JvdHRvbS1jZW50ZXInOiB7ICdqdXN0aWZ5LXNlbGYnOiAnZmxleC1lbmQnLCAnYWxpZ24tc2VsZic6ICdjZW50ZXInIH0sXG4gICAgICAnYm90dG9tLXJpZ2h0JzogeyAnanVzdGlmeS1zZWxmJzogJ2ZsZXgtZW5kJywgJ2FsaWduLXNlbGYnOiAnZmxleC1lbmQnIH0sXG4gICAgfSxcblxuICAgIC8vIGZsZXgtY29sdW0tYWxpZ25cbiAgICAnZmx4LWNvbC1hbGlnbic6IHtcbiAgICAgIF9jb21tb246IHsgZGlzcGxheTogJ2ZsZXgnLCAnZmxleC1kaXJlY3Rpb24nOiAnY29sdW1uJyB9LFxuICAgICAgJ3RvcC1sZWZ0Jzoge1xuICAgICAgICAnanVzdGlmeS1jb250ZW50JzogJ2ZsZXgtc3RhcnQnLFxuICAgICAgICAnYWxpZ24taXRlbXMnOiAnZmxleC1zdGFydCcsXG4gICAgICB9LFxuICAgICAgJ3RvcC1jZW50ZXInOiB7XG4gICAgICAgICdqdXN0aWZ5LWNvbnRlbnQnOiAnZmxleC1zdGFydCcsXG4gICAgICAgICdhbGlnbi1pdGVtcyc6ICdjZW50ZXInLFxuICAgICAgfSxcbiAgICAgICd0b3AtcmlnaHQnOiB7XG4gICAgICAgICdqdXN0aWZ5LWNvbnRlbnQnOiAnZmxleC1zdGFydCcsXG4gICAgICAgICdhbGlnbi1pdGVtcyc6ICdmbGV4LWVuZCcsXG4gICAgICB9LFxuICAgICAgJ2NlbnRlci1sZWZ0Jzoge1xuICAgICAgICAnanVzdGlmeS1jb250ZW50JzogJ2NlbnRlcicsXG4gICAgICAgICdhbGlnbi1pdGVtcyc6ICdmbGV4LXN0YXJ0JyxcbiAgICAgIH0sXG4gICAgICAnY2VudGVyLWNlbnRlcic6IHsgJ2p1c3RpZnktY29udGVudCc6ICdjZW50ZXInLCAnYWxpZ24taXRlbXMnOiAnY2VudGVyJyB9LFxuICAgICAgJ2NlbnRlci1yaWdodCc6IHtcbiAgICAgICAgJ2p1c3RpZnktY29udGVudCc6ICdjZW50ZXInLFxuICAgICAgICAnYWxpZ24taXRlbXMnOiAnZmxleC1lbmQnLFxuICAgICAgfSxcbiAgICAgICdib3R0b20tbGVmdCc6IHtcbiAgICAgICAgJ2p1c3RpZnktY29udGVudCc6ICdmbGV4LWVuZCcsXG4gICAgICAgICdhbGlnbi1pdGVtcyc6ICdmbGV4LXN0YXJ0JyxcbiAgICAgIH0sXG4gICAgICAnYm90dG9tLWNlbnRlcic6IHtcbiAgICAgICAgJ2p1c3RpZnktY29udGVudCc6ICdmbGV4LWVuZCcsXG4gICAgICAgICdhbGlnbi1pdGVtcyc6ICdjZW50ZXInLFxuICAgICAgfSxcbiAgICAgICdib3R0b20tcmlnaHQnOiB7XG4gICAgICAgICdqdXN0aWZ5LWNvbnRlbnQnOiAnZmxleC1lbmQnLFxuICAgICAgICAnYWxpZ24taXRlbXMnOiAnZmxleC1lbmQnLFxuICAgICAgfSxcbiAgICAgICdiZXR3ZWVuLWxlZnQnOiB7XG4gICAgICAgICdqdXN0aWZ5LWNvbnRlbnQnOiAnc3BhY2UtYmV0d2VlbicsXG4gICAgICAgICdhbGlnbi1pdGVtcyc6ICdmbGV4LXN0YXJ0JyxcbiAgICAgIH0sXG4gICAgICAnYmV0d2Vlbi1jZW50ZXInOiB7XG4gICAgICAgICdqdXN0aWZ5LWNvbnRlbnQnOiAnc3BhY2UtYmV0d2VlbicsXG4gICAgICAgICdhbGlnbi1pdGVtcyc6ICdjZW50ZXInLFxuICAgICAgfSxcbiAgICAgICdiZXR3ZWVuLXJpZ2h0Jzoge1xuICAgICAgICAnanVzdGlmeS1jb250ZW50JzogJ3NwYWNlLWJldHdlZW4nLFxuICAgICAgICAnYWxpZ24taXRlbXMnOiAnZmxleC1lbmQnLFxuICAgICAgfSxcbiAgICB9LFxuXG4gICAgLy8gZmxleC1yb3cgYWxpZ24tc2VsZlxuICAgICdmbHgtcm93LWFsaWduLXNlbGYnOiB7XG4gICAgICBub25lOiB7ICdhbGlnbi1zZWxmJzogJ25vcm1hbCcsICdqdXN0aWZ5LXNlbGYnOiAnbm9ybWFsJyB9LFxuICAgICAgJ3RvcC1sZWZ0JzogeyAnYWxpZ24tc2VsZic6ICdmbGV4LXN0YXJ0JywgJ2p1c3RpZnktc2VsZic6ICdmbGV4LXN0YXJ0JyB9LFxuICAgICAgJ3RvcC1jZW50ZXInOiB7ICdhbGlnbi1zZWxmJzogJ2ZsZXgtc3RhcnQnLCAnanVzdGlmeS1zZWxmJzogJ2NlbnRlcicgfSxcbiAgICAgICd0b3AtcmlnaHQnOiB7ICdhbGlnbi1zZWxmJzogJ2ZsZXgtc3RhcnQnLCAnanVzdGlmeS1zZWxmJzogJ2ZsZXgtZW5kJyB9LFxuICAgICAgJ2NlbnRlci1sZWZ0JzogeyAnYWxpZ24tc2VsZic6ICdjZW50ZXInLCAnanVzdGlmeS1zZWxmJzogJ2ZsZXgtc3RhcnQnIH0sXG4gICAgICAnY2VudGVyLWNlbnRlcic6IHsgJ2FsaWduLXNlbGYnOiAnY2VudGVyJywgJ2p1c3RpZnktc2VsZic6ICdjZW50ZXInIH0sXG4gICAgICAnY2VudGVyLXJpZ2h0JzogeyAnYWxpZ24tc2VsZic6ICdjZW50ZXInLCAnanVzdGlmeS1zZWxmJzogJ2ZsZXgtZW5kJyB9LFxuICAgICAgJ2JvdHRvbS1sZWZ0JzogeyAnYWxpZ24tc2VsZic6ICdmbGV4LWVuZCcsICdqdXN0aWZ5LXNlbGYnOiAnZmxleC1zdGFydCcgfSxcbiAgICAgICdib3R0b20tY2VudGVyJzogeyAnYWxpZ24tc2VsZic6ICdmbGV4LWVuZCcsICdqdXN0aWZ5LXNlbGYnOiAnY2VudGVyJyB9LFxuICAgICAgJ2JvdHRvbS1yaWdodCc6IHsgJ2FsaWduLXNlbGYnOiAnZmxleC1lbmQnLCAnanVzdGlmeS1zZWxmJzogJ2ZsZXgtZW5kJyB9LFxuICAgIH0sXG5cbiAgICAvLyBmbGV4LXJvdy1hbGlnblxuICAgICdmbHgtcm93LWFsaWduJzoge1xuICAgICAgX2NvbW1vbjogeyBkaXNwbGF5OiAnZmxleCcsICdmbGV4LWRpcmVjdGlvbic6ICdyb3cnIH0sXG4gICAgICAndG9wLWxlZnQnOiB7XG4gICAgICAgICdhbGlnbi1pdGVtcyc6ICdmbGV4LXN0YXJ0JyxcbiAgICAgICAgJ2p1c3RpZnktY29udGVudCc6ICdmbGV4LXN0YXJ0JyxcbiAgICAgIH0sXG4gICAgICAndG9wLWNlbnRlcic6IHtcbiAgICAgICAgJ2FsaWduLWl0ZW1zJzogJ2ZsZXgtc3RhcnQnLFxuICAgICAgICAnanVzdGlmeS1jb250ZW50JzogJ2NlbnRlcicsXG4gICAgICB9LFxuICAgICAgJ3RvcC1yaWdodCc6IHtcbiAgICAgICAgJ2FsaWduLWl0ZW1zJzogJ2ZsZXgtc3RhcnQnLFxuICAgICAgICAnanVzdGlmeS1jb250ZW50JzogJ2ZsZXgtZW5kJyxcbiAgICAgIH0sXG4gICAgICAndG9wLWJldHdlZW4nOiB7XG4gICAgICAgICdhbGlnbi1pdGVtcyc6ICdmbGV4LXN0YXJ0JyxcbiAgICAgICAgJ2p1c3RpZnktY29udGVudCc6ICdzcGFjZS1iZXR3ZWVuJyxcbiAgICAgIH0sXG4gICAgICAnY2VudGVyLWxlZnQnOiB7XG4gICAgICAgICdhbGlnbi1pdGVtcyc6ICdjZW50ZXInLFxuICAgICAgICAnanVzdGlmeS1jb250ZW50JzogJ2ZsZXgtc3RhcnQnLFxuICAgICAgfSxcbiAgICAgICdjZW50ZXItY2VudGVyJzogeyAnYWxpZ24taXRlbXMnOiAnY2VudGVyJywgJ2p1c3RpZnktY29udGVudCc6ICdjZW50ZXInIH0sXG4gICAgICAnY2VudGVyLXJpZ2h0Jzoge1xuICAgICAgICAnYWxpZ24taXRlbXMnOiAnY2VudGVyJyxcbiAgICAgICAgJ2p1c3RpZnktY29udGVudCc6ICdmbGV4LWVuZCcsXG4gICAgICB9LFxuICAgICAgJ2NlbnRlci1iZXR3ZWVuJzoge1xuICAgICAgICAnYWxpZ24taXRlbXMnOiAnY2VudGVyJyxcbiAgICAgICAgJ2p1c3RpZnktY29udGVudCc6ICdzcGFjZS1iZXR3ZWVuJyxcbiAgICAgIH0sXG4gICAgICAnYm90dG9tLWxlZnQnOiB7XG4gICAgICAgICdhbGlnbi1pdGVtcyc6ICdmbGV4LWVuZCcsXG4gICAgICAgICdqdXN0aWZ5LWNvbnRlbnQnOiAnZmxleC1zdGFydCcsXG4gICAgICB9LFxuICAgICAgJ2JvdHRvbS1jZW50ZXInOiB7XG4gICAgICAgICdhbGlnbi1pdGVtcyc6ICdmbGV4LWVuZCcsXG4gICAgICAgICdqdXN0aWZ5LWNvbnRlbnQnOiAnY2VudGVyJyxcbiAgICAgIH0sXG4gICAgICAnYm90dG9tLXJpZ2h0Jzoge1xuICAgICAgICAnYWxpZ24taXRlbXMnOiAnZmxleC1lbmQnLFxuICAgICAgICAnanVzdGlmeS1jb250ZW50JzogJ2ZsZXgtZW5kJyxcbiAgICAgIH0sXG4gICAgICAnYm90dG9tLWJldHdlZW4nOiB7XG4gICAgICAgICdhbGlnbi1pdGVtcyc6ICdmbHgtZW5kJyxcbiAgICAgICAgJ2p1c3RpZnktY29udGVudCc6ICdzcGFjZS1iZXR3ZWVuJyxcbiAgICAgIH0sXG4gICAgICAnc3RyZXRjaC1sZWZ0Jzoge1xuICAgICAgICAnYWxpZ24taXRlbXMnOiAnc3RyZXRjaCcsXG4gICAgICAgICdqdXN0aWZ5LWNvbnRlbnQnOiAnZmxleC1zdGFydCcsXG4gICAgICB9LFxuICAgICAgJ3N0cmV0Y2gtY2VudGVyJzoge1xuICAgICAgICAnYWxpZ24taXRlbXMnOiAnc3RyZXRjaCcsXG4gICAgICAgICdqdXN0aWZ5LWNvbnRlbnQnOiAnY2VudGVyJyxcbiAgICAgIH0sXG4gICAgICAnc3RyZXRjaC1yaWdodCc6IHtcbiAgICAgICAgJ2FsaWduLWl0ZW1zJzogJ3N0cmV0Y2gnLFxuICAgICAgICAnanVzdGlmeS1jb250ZW50JzogJ2ZsZXgtZW5kJyxcbiAgICAgIH0sXG4gICAgICAnc3RyZXRjaC1iZXR3ZWVuJzoge1xuICAgICAgICAnYWxpZ24taXRlbXMnOiAnc3RyZXRjaCcsXG4gICAgICAgICdqdXN0aWZ5LWNvbnRlbnQnOiAnc3BhY2UtYmV0d2VlbicsXG4gICAgICB9LFxuICAgIH0sXG5cbiAgICAvLyBmbGV4LWRpcmVjdGlvblxuICAgICdmbHgtZGlyJzoge1xuICAgICAgY29sOiB7ICdmbGV4LWRpcmVjdGlvbic6ICdjb2x1bW4nIH0sXG4gICAgICByb3c6IHsgJ2ZsZXgtZGlyZWN0aW9uJzogJ3JvdycgfSxcbiAgICAgIGNvbHJldjogeyAnZmxleC1kaXJlY3Rpb24nOiAnY29sdW1uLXJldmVyc2UnIH0sXG4gICAgICByb3dyZXY6IHsgJ2ZsZXgtZGlyZWN0aW9uJzogJ3Jvdy1yZXZlcnNlJyB9LFxuICAgIH0sXG5cbiAgICAvLyBqdXN0aWZ5LWNvbnRlbnRcbiAgICAnZmx4LWp1c3RpZnktY29udGVudCc6IHtcbiAgICAgIGNlbnRlcjogeyAnanVzdGlmeS1jb250ZW50JzogJ2NlbnRlcicgfSxcbiAgICAgIHN0YXJ0OiB7ICdqdXN0aWZ5LWNvbnRlbnQnOiAnZmxleC1zdGFydCcgfSxcbiAgICAgIGVuZDogeyAnanVzdGlmeS1jb250ZW50JzogJ2ZsZXgtZW5kJyB9LFxuICAgICAgYmV0d2VlbjogeyAnanVzdGlmeS1jb250ZW50JzogJ3NwYWNlLWJldHdlZW4nIH0sXG4gICAgICBhcm91bmQ6IHsgJ2p1c3RpZnktY29udGVudCc6ICdzcGFjZS1hcm91bmQnIH0sXG4gICAgfSxcblxuICAgIC8vIGFsaWduLWl0ZW1zXG4gICAgJ2ZseC1hbGlnbi1pdGVtcyc6IHtcbiAgICAgIGNlbnRlcjogeyAnYWxpZ24taXRlbXMnOiAnY2VudGVyJyB9LFxuICAgICAgc3RhcnQ6IHsgJ2FsaWduLWl0ZW1zJzogJ2ZsZXgtc3RhcnQnIH0sXG4gICAgICBlbmQ6IHsgJ2FsaWduLWl0ZW1zJzogJ2ZsZXgtZW5kJyB9LFxuICAgIH0sXG5cbiAgICAvLyBvYmplY3QtZml0XG4gICAgb2ZpdDoge1xuICAgICAgbm9uZTogeyAnb2JqZWN0LWZpdCc6ICdub25lJyB9LFxuICAgICAgY29udGFpbjogeyAnb2JqZWN0LWZpdCc6ICdjb250YWluJyB9LFxuICAgICAgY292ZXI6IHsgJ29iamVjdC1maXQnOiAnY292ZXInIH0sXG4gICAgICBmaWxsOiB7ICdvYmplY3QtZml0JzogJ2ZpbGwnIH0sXG4gICAgICBzY2FsZWRvd246IHsgJ29iamVjdC1maXQnOiAnc2NhbGUtZG93bicgfSxcbiAgICB9LFxuXG4gICAgLy8gb2JqZWN0LXBvc2l0aW9uXG4gICAgb3Bvczoge1xuICAgICAgbm9uZTogeyAnb2JqZWN0LXBvc2l0aW9uJzogJ3Vuc2V0JyB9LFxuICAgICAgY2VudGVyOiB7ICdvYmplY3QtcG9zaXRpb24nOiAnY2VudGVyJyB9LFxuICAgICAgJyonOiB7ICdvYmplY3QtcG9zaXRpb24nOiAnKicgfSxcbiAgICB9LFxuXG4gICAgLy8gb3JkZXJcbiAgICAnZmx4LW9yZGVyJzoge1xuICAgICAgbjE6IHsgb3JkZXI6IC0xIH0sXG4gICAgICAwOiB7IG9yZGVyOiAwIH0sXG4gICAgICAxOiB7IG9yZGVyOiAxIH0sXG4gICAgICAyOiB7IG9yZGVyOiAyIH0sXG4gICAgICAzOiB7IG9yZGVyOiAzIH0sXG4gICAgICA0OiB7IG9yZGVyOiA0IH0sXG4gICAgICA1OiB7IG9yZGVyOiA1IH0sXG4gICAgICA2OiB7IG9yZGVyOiA2IH0sXG4gICAgICA3OiB7IG9yZGVyOiA3IH0sXG4gICAgICA4OiB7IG9yZGVyOiA4IH0sXG4gICAgICA5OiB7IG9yZGVyOiA5IH0sXG4gICAgICAxMDogeyBvcmRlcjogMTAgfSxcbiAgICAgIDExOiB7IG9yZGVyOiAxMSB9LFxuICAgICAgMTI6IHsgb3JkZXI6IDEyIH0sXG4gICAgICAnKic6IHsgb3JkZXI6ICcqJyB9LFxuICAgIH0sXG5cbiAgICAvLyBmbGV4LXdyYXBcbiAgICAnZmx4LXdyYXAnOiB7XG4gICAgICB5ZXM6IHsgJ2ZsZXgtd3JhcCc6ICd3cmFwJyB9LFxuICAgICAgbm86IHsgJ2ZsZXgtd3JhcCc6ICdub3dyYXAnIH0sXG4gICAgICByZXY6IHsgJ2ZsZXgtd3JhcCc6ICd3cmFwLXJldmVyc2UnIH0sXG4gICAgfSxcblxuICAgIC8vIGZsZXhcbiAgICBmbHg6IHtcbiAgICAgIGZpbGw6IHsgZmxleDogJzEgMSBhdXRvJyB9LFxuICAgICAgJyonOiB7IGZsZXg6ICcqJyB9LFxuICAgIH0sXG5cbiAgICAvLyBmbGV4LWdyb3dcbiAgICAnZmx4LWdyb3cnOiB7XG4gICAgICAwOiB7ICdmbGV4LWdyb3cnOiAnMCcgfSxcbiAgICAgIDE6IHsgJ2ZsZXgtZ3Jvdyc6ICcxJyB9LFxuICAgIH0sXG5cbiAgICAvLyBmbGV4LXNocmlua1xuICAgICdmbHgtc2hyaW5rJzoge1xuICAgICAgMDogeyAnZmxleC1zaHJpbmsnOiAnMCcgfSxcbiAgICAgIDE6IHsgJ2ZsZXgtc2hyaW5rJzogJzEnIH0sXG4gICAgfSxcblxuICAgIC8vIGZsZXgtYmFzaXNcbiAgICAnZmx4LWJhc2lzJzoge1xuICAgICAgYXV0bzogeyAnZmxleC1iYXNpcyc6ICdhdXRvJyB9LFxuICAgIH0sXG5cbiAgICAvLyBmbG9hdFxuICAgIGZsb2F0OiB7XG4gICAgICBsZWZ0OiB7IGZsb2F0OiAnbGVmdCcgfSxcbiAgICAgIHJpZ2h0OiB7IGZsb2F0OiAncmlnaHQnIH0sXG4gICAgICBub25lOiB7IGZsb2F0OiAnbm9uZScgfSxcbiAgICB9LFxuXG4gICAgJ2dyaWQtcm93cyc6IHtcbiAgICAgIF9jb21tb246IHsgZGlzcGxheTogJ2dyaWQnIH0sXG4gICAgICAnKic6IHsgJ2dyaWQtdGVtcGxhdGUtcm93cyc6ICcqJyB9LFxuICAgIH0sXG5cbiAgICAnZ3JpZC1jb2x1bW5zJzoge1xuICAgICAgX2NvbW1vbjogeyBkaXNwbGF5OiAnZ3JpZCcsICdjb2x1bW4tZ2FwJzogc3BhY2VyWydndXR0ZXItaGFsZiddIH0sXG4gICAgICAnKic6IHsgJ2dyaWQtdGVtcGxhdGUtY29sdW1ucyc6ICcqJyB9LFxuICAgIH0sXG5cbiAgICAnZ3JpZC1hcmVhJzoge1xuICAgICAgJyonOiB7ICdncmlkLWFyZWEnOiAnKicgfSxcbiAgICB9LFxuXG4gICAgJ2dyaWQtcm93LXN0YXJ0Jzoge1xuICAgICAgJyonOiB7ICdncmlkLXJvdy1zdGFydCc6ICcqJyB9LFxuICAgIH0sXG5cbiAgICAnZ3JpZC1yb3ctZW5kJzoge1xuICAgICAgJyonOiB7ICdncmlkLXJvdy1lbmQnOiAnKicgfSxcbiAgICB9LFxuXG4gICAgJ2dyaWQtY29sLXN0YXJ0Jzoge1xuICAgICAgJyonOiB7ICdncmlkLWNvbHVtbi1zdGFydCc6ICcqJyB9LFxuICAgIH0sXG5cbiAgICAnZ3JpZC1jb2wtZW5kJzoge1xuICAgICAgJyonOiB7ICdncmlkLWNvbHVtbi1lbmQnOiAnKicgfSxcbiAgICB9LFxuXG4gICAgLy8gZ3JpZCBjb2x1bW4gYWxpZ24tc2VsZlxuICAgICdncmlkLWNvbC1hbGlnbi1zZWxmJzoge1xuICAgICAgJ3RvcC1sZWZ0JzogeyAnYWxpZ24tc2VsZic6ICdzdGFydCcsICdqdXN0aWZ5LXNlbGYnOiAnc3RhcnQnIH0sXG4gICAgICAndG9wLWNlbnRlcic6IHsgJ2FsaWduLXNlbGYnOiAnc3RhcnQnLCAnanVzdGlmeS1zZWxmJzogJ2NlbnRlcicgfSxcbiAgICAgICd0b3AtcmlnaHQnOiB7ICdhbGlnbi1zZWxmJzogJ3N0YXJ0JywgJ2p1c3RpZnktc2VsZic6ICdlbmQnIH0sXG4gICAgICAnY2VudGVyLWxlZnQnOiB7ICdhbGlnbi1zZWxmJzogJ2NlbnRlcicsICdqdXN0aWZ5LXNlbGYnOiAnc3RhcnQnIH0sXG4gICAgICAnY2VudGVyLWNlbnRlcic6IHsgJ2FsaWduLXNlbGYnOiAnY2VudGVyJywgJ2p1c3RpZnktc2VsZic6ICdjZW50ZXInIH0sXG4gICAgICAnY2VudGVyLXJpZ2h0JzogeyAnYWxpZ24tc2VsZic6ICdjZW50ZXInLCAnanVzdGlmeS1zZWxmJzogJ2VuZCcgfSxcbiAgICAgICdib3R0b20tbGVmdCc6IHsgJ2FsaWduLXNlbGYnOiAnZW5kJywgJ2p1c3RpZnktc2VsZic6ICdzdGFydCcgfSxcbiAgICAgICdib3R0b20tY2VudGVyJzogeyAnYWxpZ24tc2VsZic6ICdlbmQnLCAnanVzdGlmeS1zZWxmJzogJ2NlbnRlcicgfSxcbiAgICAgICdib3R0b20tcmlnaHQnOiB7ICdhbGlnbi1zZWxmJzogJ2VuZCcsICdqdXN0aWZ5LXNlbGYnOiAnZW5kJyB9LFxuICAgIH0sXG5cbiAgICAvLyBncmlkLWNvbHVtLWFsaWduXG4gICAgJ2dyaWQtY29sLWFsaWduJzoge1xuICAgICAgJ3RvcC1sZWZ0Jzoge1xuICAgICAgICAnYWxpZ24taXRlbXMnOiAnc3RhcnQnLFxuICAgICAgICAnanVzdGlmeS1pdGVtcyc6ICdzdGFydCcsXG4gICAgICB9LFxuICAgICAgJ3RvcC1jZW50ZXInOiB7XG4gICAgICAgICdhbGlnbi1pdGVtcyc6ICdzdGFydCcsXG4gICAgICAgICdqdXN0aWZ5LWl0ZW1zJzogJ2NlbnRlcicsXG4gICAgICB9LFxuICAgICAgJ3RvcC1yaWdodCc6IHtcbiAgICAgICAgJ2FsaWduLWl0ZW1zJzogJ3N0YXJ0JyxcbiAgICAgICAgJ2p1c3RpZnktaXRlbXMnOiAnZW5kJyxcbiAgICAgIH0sXG4gICAgICAnY2VudGVyLWxlZnQnOiB7XG4gICAgICAgICdhbGlnbi1pdGVtcyc6ICdjZW50ZXInLFxuICAgICAgICAnanVzdGlmeS1pdGVtcyc6ICdzdGFydCcsXG4gICAgICB9LFxuICAgICAgJ2NlbnRlci1jZW50ZXInOiB7ICdqdXN0aWZ5LWl0ZW1zJzogJ2NlbnRlcicsICdhbGlnbi1pdGVtcyc6ICdjZW50ZXInIH0sXG4gICAgICAnY2VudGVyLXJpZ2h0Jzoge1xuICAgICAgICAnYWxpZ24taXRlbXMnOiAnY2VudGVyJyxcbiAgICAgICAgJ2p1c3RpZnktaXRlbXMnOiAnZW5kJyxcbiAgICAgIH0sXG4gICAgICAnYm90dG9tLWxlZnQnOiB7XG4gICAgICAgICdhbGlnbi1pdGVtcyc6ICdlbmQnLFxuICAgICAgICAnanVzdGlmeS1pdGVtcyc6ICdzdGFydCcsXG4gICAgICB9LFxuICAgICAgJ2JvdHRvbS1jZW50ZXInOiB7XG4gICAgICAgICdhbGlnbi1pdGVtcyc6ICdlbmQnLFxuICAgICAgICAnanVzdGlmeS1pdGVtcyc6ICdjZW50ZXInLFxuICAgICAgfSxcbiAgICAgICdib3R0b20tcmlnaHQnOiB7XG4gICAgICAgICdhbGlnbi1pdGVtcyc6ICdlbmQnLFxuICAgICAgICAnanVzdGlmeS1pdGVtcyc6ICdlbmQnLFxuICAgICAgfSxcbiAgICAgICdiZXR3ZWVuLWxlZnQnOiB7XG4gICAgICAgICdhbGlnbi1pdGVtcyc6ICdzcGFjZS1iZXR3ZWVuJyxcbiAgICAgICAgJ2p1c3RpZnktaXRlbXMnOiAnc3RhcnQnLFxuICAgICAgfSxcbiAgICAgICdiZXR3ZWVuLWNlbnRlcic6IHtcbiAgICAgICAgJ2FsaWduLWl0ZW1zJzogJ3NwYWNlLWJldHdlZW4nLFxuICAgICAgICAnanVzdGlmeS1pdGVtcyc6ICdjZW50ZXInLFxuICAgICAgfSxcbiAgICAgICdiZXR3ZWVuLXJpZ2h0Jzoge1xuICAgICAgICAnYWxpZ24taXRlbXMnOiAnc3BhY2UtYmV0d2VlbicsXG4gICAgICAgICdqdXN0aWZ5LWl0ZW1zJzogJ2VuZCcsXG4gICAgICB9LFxuICAgIH0sXG5cbiAgICAvLyBsaXN0LXN0eWxlXG4gICAgJ2xpc3Qtc3R5bGUnOiB7XG4gICAgICBub25lOiB7ICdsaXN0LXN0eWxlJzogJ25vbmUnLCBtYXJnaW46IDAsIHBhZGRpbmc6IDAgfSxcbiAgICAgICcqJzogeyAnbGlzdC1zdHlsZSc6ICcqJyB9LFxuICAgIH0sXG5cbiAgICAvLyBsaXN0LXN0eWxlLXBvc2l0aW9tXG4gICAgJ2xpc3Qtc3R5bGUtcG9zaXRpb24nOiB7XG4gICAgICBpbnNpZGU6IHsgJ2xpc3Qtc3R5bGUtcG9zaXRpb24nOiAnaW5zaWRlJyB9LFxuICAgICAgb3V0c2lkZTogeyAnbGlzdC1zdHlsZS1wb3NpdGlvbic6ICdvdXRzaWRlJyB9LFxuICAgICAgJyonOiB7ICdsaXN0LXN0eWxlLXBvc2l0aW9uJzogJyonIH0sXG4gICAgfSxcblxuICAgIC8vIGxpbmVhci1ncmFkaWVudFxuICAgICdsaW5lYXItZ3JhZGllbnQnOiB7XG4gICAgICAnKic6IHsgYmFja2dyb3VuZDogJ2xpbmVhci1ncmFkaWVudCgqKScgfSxcbiAgICB9LFxuXG4gICAgLy8gbGluZS1oZWlnaHRcbiAgICBsaDoge1xuICAgICAgMDogeyAnbGluZS1oZWlnaHQnOiAwIH0sXG4gICAgICAxOiB7ICdsaW5lLWhlaWdodCc6IDEgfSxcbiAgICAgIDEuMTI1OiB7ICdsaW5lLWhlaWdodCc6IDEuMTI1IH0sXG4gICAgICAxLjI1OiB7ICdsaW5lLWhlaWdodCc6IDEuMjUgfSxcbiAgICAgIDEuMzc1OiB7ICdsaW5lLWhlaWdodCc6IDEuMzc1IH0sXG4gICAgICAxLjU6IHsgJ2xpbmUtaGVpZ2h0JzogMS41IH0sXG4gICAgICAxLjYyNTogeyAnbGluZS1oZWlnaHQnOiAxLjYyNSB9LFxuICAgICAgMS43NTogeyAnbGluZS1oZWlnaHQnOiAxLjc1IH0sXG4gICAgICAxLjg3NTogeyAnbGluZS1oZWlnaHQnOiAxLjg3NSB9LFxuICAgICAgMjogeyAnbGluZS1oZWlnaHQnOiAyIH0sXG4gICAgICAyLjI1OiB7ICdsaW5lLWhlaWdodCc6IDIuMjUgfSxcbiAgICAgIDIuNTogeyAnbGluZS1oZWlnaHQnOiAyLjUgfSxcbiAgICAgIDIuNzU6IHsgJ2xpbmUtaGVpZ2h0JzogMi43NSB9LFxuICAgICAgMzogeyAnbGluZS1oZWlnaHQnOiAzIH0sXG4gICAgICAzLjU6IHsgJ2xpbmUtaGVpZ2h0JzogMy41IH0sXG4gICAgICA0OiB7ICdsaW5lLWhlaWdodCc6IDQgfSxcbiAgICAgIDU6IHsgJ2xpbmUtaGVpZ2h0JzogNSB9LFxuICAgICAgJyonOiB7ICdsaW5lLWhlaWdodCc6ICcqJyB9LFxuICAgIH0sXG5cbiAgICBsczoge1xuICAgICAgJ24uMic6IHsgJ2xldHRlci1zcGFjaW5nJzogJy0uMnJlbScgfSxcbiAgICAgICduLjE4JzogeyAnbGV0dGVyLXNwYWNpbmcnOiAnLS4xOHJlbScgfSxcbiAgICAgICduLjE2JzogeyAnbGV0dGVyLXNwYWNpbmcnOiAnLS4xNnJlbScgfSxcbiAgICAgICduLjE0JzogeyAnbGV0dGVyLXNwYWNpbmcnOiAnLS4xNHJlbScgfSxcbiAgICAgICduLjEyJzogeyAnbGV0dGVyLXNwYWNpbmcnOiAnLS4xMnJlbScgfSxcbiAgICAgICduLjEnOiB7ICdsZXR0ZXItc3BhY2luZyc6ICctLjFyZW0nIH0sXG4gICAgICAnbi4wOCc6IHsgJ2xldHRlci1zcGFjaW5nJzogJy0uMDhyZW0nIH0sXG4gICAgICAnbi4wNic6IHsgJ2xldHRlci1zcGFjaW5nJzogJy0uMDZyZW0nIH0sXG4gICAgICAnbi4wNCc6IHsgJ2xldHRlci1zcGFjaW5nJzogJy0uMDRyZW0nIH0sXG4gICAgICAnbi4wMic6IHsgJ2xldHRlci1zcGFjaW5nJzogJy0uMDJyZW0nIH0sXG4gICAgICAwOiB7ICdsZXR0ZXItc3BhY2luZyc6IDAgfSxcbiAgICAgICcuMDInOiB7ICdsZXR0ZXItc3BhY2luZyc6ICcuMDJyZW0nIH0sXG4gICAgICAnLjA0JzogeyAnbGV0dGVyLXNwYWNpbmcnOiAnLjA0cmVtJyB9LFxuICAgICAgJy4wNic6IHsgJ2xldHRlci1zcGFjaW5nJzogJy4wNnJlbScgfSxcbiAgICAgICcuMDgnOiB7ICdsZXR0ZXItc3BhY2luZyc6ICcuMDhyZW0nIH0sXG4gICAgICAnLjEnOiB7ICdsZXR0ZXItc3BhY2luZyc6ICcuMXJlbScgfSxcbiAgICAgICcuMTInOiB7ICdsZXR0ZXItc3BhY2luZyc6ICcuMTJyZW0nIH0sXG4gICAgICAnLjE0JzogeyAnbGV0dGVyLXNwYWNpbmcnOiAnLjE0cmVtJyB9LFxuICAgICAgJy4xNic6IHsgJ2xldHRlci1zcGFjaW5nJzogJy4xNnJlbScgfSxcbiAgICAgICcuMTgnOiB7ICdsZXR0ZXItc3BhY2luZyc6ICcuMThyZW0nIH0sXG4gICAgICAnLjInOiB7ICdsZXR0ZXItc3BhY2luZyc6ICcuMnJlbScgfSxcbiAgICAgICcuNCc6IHsgJ2xldHRlci1zcGFjaW5nJzogJy40cmVtJyB9LFxuICAgICAgJy42JzogeyAnbGV0dGVyLXNwYWNpbmcnOiAnLjZyZW0nIH0sXG4gICAgICAnLjgnOiB7ICdsZXR0ZXItc3BhY2luZyc6ICcuOHJlbScgfSxcbiAgICAgIDE6IHsgJ2xldHRlci1zcGFjaW5nJzogJzFyZW0nIH0sXG4gICAgICAyOiB7ICdsZXR0ZXItc3BhY2luZyc6ICcycmVtJyB9LFxuICAgICAgJyonOiB7ICdsZXR0ZXItc3BhY2luZyc6ICcqJyB9LFxuICAgIH0sXG5cbiAgICAvLyBvcGFjaXR5XG4gICAgb3BhY2l0eToge1xuICAgICAgMDogeyBvcGFjaXR5OiAwIH0sXG4gICAgICAxMDogeyBvcGFjaXR5OiAwLjEgfSxcbiAgICAgIDIwOiB7IG9wYWNpdHk6IDAuMiB9LFxuICAgICAgMzA6IHsgb3BhY2l0eTogMC4zIH0sXG4gICAgICA0MDogeyBvcGFjaXR5OiAwLjQgfSxcbiAgICAgIDUwOiB7IG9wYWNpdHk6IDAuNSB9LFxuICAgICAgNjA6IHsgb3BhY2l0eTogMC42IH0sXG4gICAgICA3MDogeyBvcGFjaXR5OiAwLjcgfSxcbiAgICAgIDgwOiB7IG9wYWNpdHk6IDAuOCB9LFxuICAgICAgOTA6IHsgb3BhY2l0eTogMC45IH0sXG4gICAgICAxMDA6IHsgb3BhY2l0eTogMSB9LFxuICAgICAgJyonOiB7IG9wYWNpdHk6ICcqJyB9LFxuICAgIH0sXG5cbiAgICAvLyBvdXRsaW5lXG4gICAgb3V0bGluZToge1xuICAgICAgbm9uZTogeyBvdXRsaW5lOiAnbm9uZScgfSxcbiAgICAgICcqJzogeyBvdXRsaW5lOiAnKicgfSxcbiAgICB9LFxuXG4gICAgLy8gb3V0bGluZS13aWR0aFxuICAgIG93OiB7XG4gICAgICBfY29tbW9uOiB7ICdvdXRsaW5lLXN0eWxlJzogJ3NvbGlkJyB9LFxuICAgICAgMDogeyAnb3V0bGluZS13aWR0aCc6ICcwJyB9LFxuICAgICAgJyonOiB7ICdvdXRsaW5lLXdpZHRoJzogJyonIH0sXG4gICAgfSxcblxuICAgIC8vIG91dGxpbmUtb2Zmc2V0XG4gICAgb286IHtcbiAgICAgIDA6IHsgJ291dGxpbmUtb2Zmc2V0JzogJzAnIH0sXG4gICAgICAnKic6IHsgJ291dGxpbmUtb2Zmc2V0JzogJyonIH0sXG4gICAgfSxcblxuICAgIC8vIHBvc2l0aW9uIGFsaWduXG4gICAgJ3Bvcy1hbGlnbic6IHtcbiAgICAgIF9jb21tb246IHtcbiAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICB9LFxuICAgICAgbm9uZToge1xuICAgICAgICBwb3NpdGlvbjogJ3N0YXRpYycsXG4gICAgICAgIGJvdHRvbTogMCxcbiAgICAgICAgbGVmdDogMCxcbiAgICAgICAgcmlnaHQ6IDAsXG4gICAgICAgIHRvcDogMCxcbiAgICAgICAgdHJhbnNmb3JtOiAnbm9uZScsXG4gICAgICB9LFxuICAgICAgJ3RvcC1sZWZ0Jzoge1xuICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgbGVmdDogMCxcbiAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbiAgICAgICAgdG9wOiAwLFxuICAgICAgICB0cmFuc2Zvcm06ICdub25lJyxcbiAgICAgIH0sXG4gICAgICAndG9wLWNlbnRlcic6IHtcbiAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgIGxlZnQ6ICc1MCUnLFxuICAgICAgICByaWdodDogJ2F1dG8nLFxuICAgICAgICB0b3A6IDAsXG4gICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoLTUwJSknLFxuICAgICAgfSxcbiAgICAgICd0b3AtcmlnaHQnOiB7XG4gICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICBsZWZ0OiAnYXV0bycsXG4gICAgICAgIHJpZ2h0OiAwLFxuICAgICAgICB0b3A6IDAsXG4gICAgICAgIHRyYW5zZm9ybTogJ25vbmUnLFxuICAgICAgfSxcbiAgICAgICdjZW50ZXItbGVmdCc6IHtcbiAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgIGxlZnQ6IDAsXG4gICAgICAgIHJpZ2h0OiAnYXV0bycsXG4gICAgICAgIHRvcDogJzUwJScsXG4gICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoLTUwJSknLFxuICAgICAgfSxcbiAgICAgICdjZW50ZXItY2VudGVyJzoge1xuICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgbGVmdDogJzUwJScsXG4gICAgICAgIHJpZ2h0OiAnYXV0bycsXG4gICAgICAgIHRvcDogJzUwJScsXG4gICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgtNTAlLCAtNTAlKScsXG4gICAgICB9LFxuICAgICAgJ2NlbnRlci1yaWdodCc6IHtcbiAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgIGxlZnQ6ICdhdXRvJyxcbiAgICAgICAgcmlnaHQ6IDAsXG4gICAgICAgIHRvcDogJzUwJScsXG4gICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoLTUwJSknLFxuICAgICAgfSxcbiAgICAgICdib3R0b20tbGVmdCc6IHtcbiAgICAgICAgYm90dG9tOiAwLFxuICAgICAgICBsZWZ0OiAwLFxuICAgICAgICByaWdodDogJ2F1dG8nLFxuICAgICAgICB0b3A6ICdhdXRvJyxcbiAgICAgICAgdHJhbnNmb3JtOiAnbm9uZScsXG4gICAgICB9LFxuICAgICAgJ2JvdHRvbS1jZW50ZXInOiB7XG4gICAgICAgIGJvdHRvbTogMCxcbiAgICAgICAgbGVmdDogJzUwJScsXG4gICAgICAgIHJpZ2h0OiAnYXV0bycsXG4gICAgICAgIHRvcDogJ2F1dG8nLFxuICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKC01MCUpJyxcbiAgICAgIH0sXG4gICAgICAnYm90dG9tLXJpZ2h0Jzoge1xuICAgICAgICBib3R0b206IDAsXG4gICAgICAgIGxlZnQ6ICdhdXRvJyxcbiAgICAgICAgcmlnaHQ6IDAsXG4gICAgICAgIHRvcDogJ2F1dG8nLFxuICAgICAgICB0cmFuc2Zvcm06ICdub25lJyxcbiAgICAgIH0sXG4gICAgICAnYm90dG9tLXN0cmV0Y2gnOiB7XG4gICAgICAgIGJvdHRvbTogMCxcbiAgICAgICAgbGVmdDogMCxcbiAgICAgICAgcmlnaHQ6IDAsXG4gICAgICAgIHRvcDogJ2F1dG8nLFxuICAgICAgICB0cmFuc2Zvcm06ICdub25lJyxcbiAgICAgIH0sXG4gICAgICAndG9wLXN0cmV0Y2gnOiB7XG4gICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICBsZWZ0OiAwLFxuICAgICAgICByaWdodDogMCxcbiAgICAgICAgdG9wOiAwLFxuICAgICAgICB0cmFuc2Zvcm06ICdub25lJyxcbiAgICAgIH0sXG4gICAgfSxcblxuICAgIC8vIHBvc2l0aW9uIG92ZXJsYXlcbiAgICAncG9zLW92ZXJsYXknOiB7XG4gICAgICBfY29tbW9uOiB7XG4gICAgICAgIHRvcDogMCxcbiAgICAgICAgYm90dG9tOiAwLFxuICAgICAgICBsZWZ0OiAwLFxuICAgICAgICByaWdodDogMCxcbiAgICAgIH0sXG4gICAgICBhYnM6IHsgcG9zaXRpb246ICdhYnNvbHV0ZScgfSxcbiAgICAgIGZpeDogeyBwb3NpdGlvbjogJ2ZpeGVkJyB9LFxuICAgIH0sXG5cbiAgICAvLyBwb3NpdGlvbiBvdmVybGF5IGxpbmtcbiAgICAncG9zLW92ZXJsYXktbGluayc6IHtcbiAgICAgIF9jb21tb246IHtcbiAgICAgICAgYm9yZGVyOiAnbm9uZScsXG4gICAgICAgIGJvdHRvbTogMCxcbiAgICAgICAgY3Vyc29yOiAncG9pbnRlcicsXG4gICAgICAgICdmb250LXNpemUnOiAwLFxuICAgICAgICBsZWZ0OiAwLFxuICAgICAgICAnbGluZS1oZWlnaHQnOiAwLFxuICAgICAgICBtYXJnaW46IDAsXG4gICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgICAgcGFkZGluZzogMCxcbiAgICAgICAgcmlnaHQ6IDAsXG4gICAgICAgIHRvcDogMCxcbiAgICAgICAgJ3doaXRlLXNwYWNlJzogJ25vd3JhcCcsXG4gICAgICAgICd6LWluZGV4JzogMSxcbiAgICAgIH0sXG4gICAgICBhYnM6IHsgcG9zaXRpb246ICdhYnNvbHV0ZScgfSxcbiAgICAgIGZpeDogeyBwb3NpdGlvbjogJ2ZpeGVkJyB9LFxuICAgIH0sXG5cbiAgICAvLyBwb3NpdGlvblxuICAgIHBvczoge1xuICAgICAgYWJzOiB7IHBvc2l0aW9uOiAnYWJzb2x1dGUnIH0sXG4gICAgICBmaXg6IHsgcG9zaXRpb246ICdmaXhlZCcgfSxcbiAgICAgIHJlbDogeyBwb3NpdGlvbjogJ3JlbGF0aXZlJyB9LFxuICAgICAgc3RhdGljOiB7IHBvc2l0aW9uOiAnc3RhdGljJyB9LFxuICAgICAgc3RpY2t5OiB7IHBvc2l0aW9uOiAnc3RpY2t5JyB9LFxuICAgIH0sXG5cbiAgICAvLyBwb2ludGVyLWV2ZW50c1xuICAgICdwb2ludGVyLWV2ZW50cyc6IHtcbiAgICAgIGRpc2FibGVkOiB7ICdwb2ludGVyLWV2ZW50cyc6ICdub25lJyB9LFxuICAgICAgYWN0aXZlOiB7ICdwb2ludGVyLWV2ZW50cyc6ICdhdXRvJyB9LFxuICAgIH0sXG5cbiAgICBydGw6IHtcbiAgICAgIHllczogeyBkaXJlY3Rpb246ICdydGwnIH0sXG4gICAgICBubzogeyBkaXJlY3Rpb246ICdsdHInIH0sXG4gICAgfSxcblxuICAgIC8vIG92ZXJmbG93XG4gICAgc2Nyb2xsYWJsZToge1xuICAgICAgX2NvbW1vbjogeyAnZmxleC13cmFwJzogJ25vd3JhcCcgfSxcbiAgICAgIGFsbDogeyBvdmVyZmxvdzogJ2F1dG8nIH0sXG4gICAgICB2aXNpYmxlOiB7IG92ZXJmbG93OiAndmlzaWJsZScgfSxcbiAgICAgIG5vbmU6IHsgb3ZlcmZsb3c6ICdoaWRkZW4nLCAnZmxleC13cmFwJzogJ3dyYXAgIWltcG9ydGFudCcgfSxcbiAgICAgIGhpZGRlbjogeyBvdmVyZmxvdzogJ2hpZGRlbicgfSxcbiAgICAgIHg6IHsgJ292ZXJmbG93LXgnOiAnYXV0bycsICdvdmVyZmxvdy15JzogJ2hpZGRlbicgfSxcbiAgICAgIHk6IHsgJ292ZXJmbG93LXknOiAnYXV0bycsICdvdmVyZmxvdy14JzogJ2hpZGRlbicgfSxcbiAgICB9LFxuXG4gICAgLy8gdmlzaWJsaXR5XG4gICAgdmlzaWJsZToge1xuICAgICAgeWVzOiB7IHZpc2liaWxpdHk6ICd2aXNpYmxlJyB9LFxuICAgICAgbm86IHsgdmlzaWJpbGl0eTogJ2hpZGRlbicgfSxcbiAgICB9LFxuXG4gICAgLy8gdHJhbnNpdGlvblxuICAgIHRyYW5zaXRpb246IHtcbiAgICAgIGFsbDogeyB0cmFuc2l0aW9uOiBgYWxsICR7dHJhbnNpdGlvbi5kdXJhdGlvbn0gJHt0cmFuc2l0aW9uLnRpbWluZ31gIH0sXG4gICAgICBiZ2M6IHtcbiAgICAgICAgdHJhbnNpdGlvbjogYGJhY2tncm91bmQtY29sb3IgJHt0cmFuc2l0aW9uLmR1cmF0aW9ufSAke3RyYW5zaXRpb24udGltaW5nfWAsXG4gICAgICB9LFxuICAgICAgZmM6IHtcbiAgICAgICAgdHJhbnNpdGlvbjogYGNvbG9yICR7dHJhbnNpdGlvbi5kdXJhdGlvbn0gJHt0cmFuc2l0aW9uLnRpbWluZ31gLFxuICAgICAgfSxcbiAgICAgIHc6IHsgdHJhbnNpdGlvbjogYHdpZHRoICR7dHJhbnNpdGlvbi5kdXJhdGlvbn0gJHt0cmFuc2l0aW9uLnRpbWluZ31gIH0sXG4gICAgICBoOiB7XG4gICAgICAgIHRyYW5zaXRpb246IGBoZWlnaHQgJHt0cmFuc2l0aW9uLmR1cmF0aW9ufSAke3RyYW5zaXRpb24udGltaW5nfWAsXG4gICAgICB9LFxuICAgICAgaG1heDoge1xuICAgICAgICB0cmFuc2l0aW9uOiBgbWF4LWhlaWdodCAke3RyYW5zaXRpb24uZHVyYXRpb259ICR7dHJhbnNpdGlvbi50aW1pbmd9YCxcbiAgICAgIH0sXG4gICAgICB0cmFuc2Zvcm06IHtcbiAgICAgICAgdHJhbnNpdGlvbjogYHRyYW5zZm9ybSAke3RyYW5zaXRpb24uZHVyYXRpb259ICR7dHJhbnNpdGlvbi50aW1pbmd9YCxcbiAgICAgIH0sXG4gICAgICBvcGFjaXR5OiB7XG4gICAgICAgIHRyYW5zaXRpb246IGBvcGFjaXR5ICR7dHJhbnNpdGlvbi5kdXJhdGlvbn0gJHt0cmFuc2l0aW9uLnRpbWluZ31gLFxuICAgICAgfSxcbiAgICAgIG5vbmU6IHsgdHJhbnNpdGlvbjogJ25vbmUnIH0sXG4gICAgICAnKic6IHsgdHJhbnNpdGlvbjogJyonIH0sXG4gICAgfSxcblxuICAgIC8vIHRyYW5zZm9ybSByb3RhdGVcbiAgICByb3RhdGU6IHtcbiAgICAgIG4xODA6IHsgdHJhbnNmb3JtOiAncm90YXRlKC0xODBkZWcpJyB9LFxuICAgICAgbjEzNTogeyB0cmFuc2Zvcm06ICdyb3RhdGUoLTEzNWRlZyknIH0sXG4gICAgICBuOTA6IHsgdHJhbnNmb3JtOiAncm90YXRlKC05MGRlZyknIH0sXG4gICAgICBuNDU6IHsgdHJhbnNmb3JtOiAncm90YXRlKC00NWRlZyknIH0sXG4gICAgICAwOiB7IHRyYW5zZm9ybTogJ3JvdGF0ZSgwKScgfSxcbiAgICAgIDQ1OiB7IHRyYW5zZm9ybTogJ3JvdGF0ZSg0NWRlZyknIH0sXG4gICAgICA5MDogeyB0cmFuc2Zvcm06ICdyb3RhdGUoOTBkZWcpJyB9LFxuICAgICAgMTM1OiB7IHRyYW5zZm9ybTogJ3JvdGF0ZSgxMzVkZWcpJyB9LFxuICAgICAgMTgwOiB7IHRyYW5zZm9ybTogJ3JvdGF0ZSgxODBkZWcpJyB9LFxuICAgICAgJyonOiB7IHRyYW5zZm9ybTogJ3JvdGF0ZSgqKScgfSxcbiAgICB9LFxuXG4gICAgLy8gdHJhbnNmb3JtIHRyYW5zbGF0ZVxuICAgIHRyYW5zbGF0ZToge1xuICAgICAgMDogeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGUoMCwgMCknIH0sXG4gICAgICAnKic6IHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlKCopJyB9LFxuICAgIH0sXG5cbiAgICAndHJhbnNsYXRlLXgnOiB7XG4gICAgICBuNTA6IHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgtNTAlKScgfSxcbiAgICAgIG4xMDA6IHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgtMTAwJSknIH0sXG4gICAgICAwOiB7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMCknIH0sXG4gICAgICA1MDogeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDUwJSknIH0sXG4gICAgICAxMDA6IHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgxMDAlKScgfSxcbiAgICAgICcqJzogeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKCopJyB9LFxuICAgIH0sXG5cbiAgICAndHJhbnNsYXRlLXknOiB7XG4gICAgICBuNTA6IHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgtNTAlKScgfSxcbiAgICAgIG4xMDA6IHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgtMTAwJSknIH0sXG4gICAgICAwOiB7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoMCknIH0sXG4gICAgICA1MDogeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDUwJSknIH0sXG4gICAgICAxMDA6IHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgxMDAlKScgfSxcbiAgICAgICcqJzogeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKCopJyB9LFxuICAgIH0sXG5cbiAgICAndHJhbnNsYXRlLXonOiB7XG4gICAgICBuMTAwOiB7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVooLTEwMCUpJyB9LFxuICAgICAgMDogeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVaKDApJyB9LFxuICAgICAgMTAwOiB7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVooMTAwJSknIH0sXG4gICAgICAnKic6IHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWigqKScgfSxcbiAgICB9LFxuXG4gICAgLy8gdHJhbnNmb3JtIHNjYWxlXG4gICAgc2NhbGU6IHtcbiAgICAgIGRlZmF1bHQ6IHsgdHJhbnNmb3JtOiAnc2NhbGUoMSknIH0sXG4gICAgICAnKic6IHsgdHJhbnNmb3JtOiAnc2NhbGUoKiknIH0sXG4gICAgfSxcblxuICAgICdzY2FsZS14Jzoge1xuICAgICAgMTogeyB0cmFuc2Zvcm06ICdzY2FsZVgoMSknIH0sXG4gICAgICBuMTogeyB0cmFuc2Zvcm06ICdzY2FsZVgoLTEpJyB9LFxuICAgICAgJyonOiB7IHRyYW5zZm9ybTogJ3NjYWxlWCgqKScgfSxcbiAgICB9LFxuXG4gICAgLy8gdHJhbnNmb3JtLW9yaWdpblxuICAgICd0cmFuc2Zvcm0tbyc6IHtcbiAgICAgIDA6IHsgJ3RyYW5zZm9ybS1vcmlnaW4nOiAnMCAwJyB9LFxuICAgICAgJzEwMC0wJzogeyAndHJhbnNmb3JtLW9yaWdpbic6ICcxMDAlIDAnIH0sXG4gICAgfSxcblxuICAgIC8vIHRleHQtYWxpZ25cbiAgICAndHh0LWFsaWduJzoge1xuICAgICAgbGVmdDogeyAndGV4dC1hbGlnbic6ICdsZWZ0JyB9LFxuICAgICAgY2VudGVyOiB7ICd0ZXh0LWFsaWduJzogJ2NlbnRlcicgfSxcbiAgICAgIHJpZ2h0OiB7ICd0ZXh0LWFsaWduJzogJ3JpZ2h0JyB9LFxuICAgICAganVzdGlmeTogeyAndGV4dC1hbGlnbic6ICdqdXN0aWZ5JyB9LFxuICAgIH0sXG5cbiAgICAvLyB0ZXh0LXNoYWRvd1xuICAgICd0eHQtc2hhZG93Jzoge1xuICAgICAgJyonOiB7ICd0ZXh0LXNoYWRvdyc6ICcqJyB9LFxuICAgIH0sXG5cbiAgICAvLyB3aGl0ZS1zcGFjZVxuICAgICd0eHQtd3JhcCc6IHtcbiAgICAgIHllczogeyAnd2hpdGUtc3BhY2UnOiAnbm9ybWFsJyB9LFxuICAgICAgbm86IHsgJ3doaXRlLXNwYWNlJzogJ25vd3JhcCcgfSxcbiAgICAgICcqJzogeyAnd2hpdGUtc3BhY2UnOiAnKicgfSxcbiAgICB9LFxuXG4gICAgLy8gdGV4dC10cmFuc2Zvcm1cbiAgICAndHh0LWNhc2UnOiB7XG4gICAgICBub25lOiB7ICd0ZXh0LXRyYW5zZm9ybSc6ICdub25lJyB9LFxuICAgICAgbG93ZXI6IHsgJ3RleHQtdHJhbnNmb3JtJzogJ2xvd2VyY2FzZScgfSxcbiAgICAgIHVwcGVyOiB7ICd0ZXh0LXRyYW5zZm9ybSc6ICd1cHBlcmNhc2UnIH0sXG4gICAgICB0aXRsZTogeyAndGV4dC10cmFuc2Zvcm0nOiAnY2FwaXRhbGl6ZScgfSxcbiAgICB9LFxuXG4gICAgLy8gZWxsaXBzaXNcbiAgICAndHh0LXRydW5jYXRlJzoge1xuICAgICAgeWVzOiB7XG4gICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgICAgJ3RleHQtb3ZlcmZsb3cnOiAnZWxsaXBzaXMnLFxuICAgICAgICAnd2hpdGUtc3BhY2UnOiAnbm93cmFwJyxcbiAgICAgIH0sXG4gICAgICBubzoge1xuICAgICAgICBvdmVyZmxvdzogJ2luaXRpYWwnLFxuICAgICAgICAndGV4dC1vdmVyZmxvdyc6ICdpbml0aWFsJyxcbiAgICAgICAgJ3doaXRlLXNwYWNlJzogJ3dyYXAnLFxuICAgICAgfSxcbiAgICB9LFxuXG4gICAgJ3R4dC11bmRlcmxpbmUnOiB7XG4gICAgICB5ZXM6IHsgJ3RleHQtZGVjb3JhdGlvbic6ICd1bmRlcmxpbmUnIH0sXG4gICAgICBubzogeyAndGV4dC1kZWNvcmF0aW9uJzogJ25vbmUnIH0sXG4gICAgfSxcblxuICAgICd0eHQtbGluZS10aHJvdWdoJzoge1xuICAgICAgeWVzOiB7ICd0ZXh0LWRlY29yYXRpb24nOiAnbGluZS10aHJvdWdoJyB9LFxuICAgICAgbm86IHsgJ3RleHQtZGVjb3JhdGlvbic6ICdub25lJyB9LFxuICAgIH0sXG5cbiAgICAndi1hbGlnbic6IHtcbiAgICAgIG5vbmU6IHsgJ3ZlcnRpY2FsLWFsaWduJzogJ3Vuc2V0JyB9LFxuICAgICAgdG9wOiB7ICd2ZXJ0aWNhbC1hbGlnbic6ICd0b3AnIH0sXG4gICAgICBtaWRkbGU6IHsgJ3ZlcnRpY2FsLWFsaWduJzogJ21pZGRsZScgfSxcbiAgICAgIGJvdHRvbTogeyAndmVydGljYWwtYWxpZ24nOiAnYm90dG9tJyB9LFxuICAgICAgc3ViOiB7ICd2ZXJ0aWNhbC1hbGlnbic6ICdzdWInIH0sXG4gICAgICBzdXA6IHsgJ3ZlcnRpY2FsLWFsaWduJzogJ3N1cGVyJyB9LFxuICAgICAgJyonOiB7ICd2ZXJ0aWNhbC1hbGlnbic6ICcqJyB9LFxuICAgIH0sXG5cbiAgICAvLyBzdHJva2Utd2lkdGhcbiAgICAnc3Ryb2tlLXdpZHRoJzoge1xuICAgICAgMDogeyAnc3Ryb2tlLXdpZHRoJzogMCB9LFxuICAgICAgMTogeyAnc3Ryb2tlLXdpZHRoJzogMSB9LFxuICAgICAgMS4xOiB7ICdzdHJva2Utd2lkdGgnOiAxLjEgfSxcbiAgICAgIDEuMjogeyAnc3Ryb2tlLXdpZHRoJzogMS4yIH0sXG4gICAgICAxLjM6IHsgJ3N0cm9rZS13aWR0aCc6IDEuMyB9LFxuICAgICAgMS40OiB7ICdzdHJva2Utd2lkdGgnOiAxLjQgfSxcbiAgICAgIDEuNTogeyAnc3Ryb2tlLXdpZHRoJzogMS41IH0sXG4gICAgICAxLjY6IHsgJ3N0cm9rZS13aWR0aCc6IDEuNiB9LFxuICAgICAgMS43OiB7ICdzdHJva2Utd2lkdGgnOiAxLjcgfSxcbiAgICAgIDEuODogeyAnc3Ryb2tlLXdpZHRoJzogMS44IH0sXG4gICAgICAxLjk6IHsgJ3N0cm9rZS13aWR0aCc6IDEuOSB9LFxuICAgICAgMjogeyAnc3Ryb2tlLXdpZHRoJzogMiB9LFxuICAgICAgMzogeyAnc3Ryb2tlLXdpZHRoJzogMyB9LFxuICAgICAgNDogeyAnc3Ryb2tlLXdpZHRoJzogNCB9LFxuICAgICAgJyonOiB7ICdzdHJva2Utd2lkdGgnOiAnKicgfSxcbiAgICB9LFxuXG4gICAgLy8gd2lkdGhcbiAgICB3OiB7XG4gICAgICAnMTAwdncnOiB7IHdpZHRoOiAnMTAwdncnIH0sXG4gICAgICBjb3Zlcjoge1xuICAgICAgICBsZWZ0OiAnNTAlJyxcbiAgICAgICAgJ21hcmdpbi1sZWZ0JzogJy01MHZ3JyxcbiAgICAgICAgJ21hcmdpbi1yaWdodCc6ICctNTB2dycsXG4gICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICByaWdodDogJzUwJScsXG4gICAgICAgIHdpZHRoOiAnMTAwdncnLFxuICAgICAgfSxcbiAgICAgIGF1dG86IHsgd2lkdGg6ICdhdXRvJyB9LFxuICAgICAgMDogeyB3aWR0aDogMCB9LFxuICAgICAgNTogeyB3aWR0aDogJzUlJyB9LFxuICAgICAgMTA6IHsgd2lkdGg6ICcxMCUnIH0sXG4gICAgICAxNTogeyB3aWR0aDogJzE1JScgfSxcbiAgICAgIDIwOiB7IHdpZHRoOiAnMjAlJyB9LFxuICAgICAgMjU6IHsgd2lkdGg6ICcyNSUnIH0sXG4gICAgICAzMDogeyB3aWR0aDogJzMwJScgfSxcbiAgICAgIDMzOiB7IHdpZHRoOiAnMzMlJyB9LFxuICAgICAgMzU6IHsgd2lkdGg6ICczNSUnIH0sXG4gICAgICA0MDogeyB3aWR0aDogJzQwJScgfSxcbiAgICAgIDQ1OiB7IHdpZHRoOiAnNDUlJyB9LFxuICAgICAgNTA6IHsgd2lkdGg6ICc1MCUnIH0sXG4gICAgICA1NTogeyB3aWR0aDogJzU1JScgfSxcbiAgICAgIDYwOiB7IHdpZHRoOiAnNjAlJyB9LFxuICAgICAgNjU6IHsgd2lkdGg6ICc2NSUnIH0sXG4gICAgICA2NjogeyB3aWR0aDogJzY2JScgfSxcbiAgICAgIDcwOiB7IHdpZHRoOiAnNzAlJyB9LFxuICAgICAgNzU6IHsgd2lkdGg6ICc3NSUnIH0sXG4gICAgICA4MDogeyB3aWR0aDogJzgwJScgfSxcbiAgICAgIDg1OiB7IHdpZHRoOiAnODUlJyB9LFxuICAgICAgOTA6IHsgd2lkdGg6ICc5MCUnIH0sXG4gICAgICA5NTogeyB3aWR0aDogJzk1JScgfSxcbiAgICAgIDEwMDogeyB3aWR0aDogJzEwMCUnIH0sXG4gICAgICAnKic6IHsgd2lkdGg6ICcqJyB9LFxuICAgIH0sXG5cbiAgICAvLyBtYXgtd2lkdGhcbiAgICB3bWF4OiB7XG4gICAgICBuYXJyb3c6IHsgJ21heC13aWR0aCc6IG1heFdpZHRoLnNtIH0sXG4gICAgICBub3JtYWw6IHsgJ21heC13aWR0aCc6IG1heFdpZHRoLm1kIH0sXG4gICAgICB3aWRlOiB7ICdtYXgtd2lkdGgnOiBtYXhXaWR0aC5sZyB9LFxuICAgICAgdmFzdDogeyAnbWF4LXdpZHRoJzogbWF4V2lkdGgueGwgfSxcbiAgICAgIGV4dHJhOiB7ICdtYXgtd2lkdGgnOiBtYXhXaWR0aC54eGwgfSxcbiAgICAgIDU6IHsgJ21heC13aWR0aCc6ICc1JScgfSxcbiAgICAgIDEwOiB7ICdtYXgtd2lkdGgnOiAnMTAlJyB9LFxuICAgICAgMTU6IHsgJ21heC13aWR0aCc6ICcxNSUnIH0sXG4gICAgICAyMDogeyAnbWF4LXdpZHRoJzogJzIwJScgfSxcbiAgICAgIDI1OiB7ICdtYXgtd2lkdGgnOiAnMjUlJyB9LFxuICAgICAgMzA6IHsgJ21heC13aWR0aCc6ICczMCUnIH0sXG4gICAgICAzMzogeyAnbWF4LXdpZHRoJzogJzMzJScgfSxcbiAgICAgIDM1OiB7ICdtYXgtd2lkdGgnOiAnMzUlJyB9LFxuICAgICAgNDA6IHsgJ21heC13aWR0aCc6ICc0MCUnIH0sXG4gICAgICA0NTogeyAnbWF4LXdpZHRoJzogJzQ1JScgfSxcbiAgICAgIDUwOiB7ICdtYXgtd2lkdGgnOiAnNTAlJyB9LFxuICAgICAgNTU6IHsgJ21heC13aWR0aCc6ICc1NSUnIH0sXG4gICAgICA2MDogeyAnbWF4LXdpZHRoJzogJzYwJScgfSxcbiAgICAgIDY1OiB7ICdtYXgtd2lkdGgnOiAnNjUlJyB9LFxuICAgICAgNjY6IHsgJ21heC13aWR0aCc6ICc2NiUnIH0sXG4gICAgICA3MDogeyAnbWF4LXdpZHRoJzogJzcwJScgfSxcbiAgICAgIDc1OiB7ICdtYXgtd2lkdGgnOiAnNzUlJyB9LFxuICAgICAgODA6IHsgJ21heC13aWR0aCc6ICc4MCUnIH0sXG4gICAgICA4NTogeyAnbWF4LXdpZHRoJzogJzg1JScgfSxcbiAgICAgIDkwOiB7ICdtYXgtd2lkdGgnOiAnOTAlJyB9LFxuICAgICAgOTU6IHsgJ21heC13aWR0aCc6ICc5NSUnIH0sXG4gICAgICAxMDA6IHsgJ21heC13aWR0aCc6ICcxMDAlJyB9LFxuICAgICAgJyonOiB7ICdtYXgtd2lkdGgnOiAnKicgfSxcbiAgICB9LFxuXG4gICAgLy8gbWluLXdpZHRoXG4gICAgd21pbjoge1xuICAgICAgJzEwMHZ3JzogeyAnbWluLXdpZHRoJzogJzEwMHZ3JyB9LFxuICAgICAgbmFycm93OiB7ICdtaW4td2lkdGgnOiBtYXhXaWR0aC5zbSB9LFxuICAgICAgbm9ybWFsOiB7ICdtaW4td2lkdGgnOiBtYXhXaWR0aC5tZCB9LFxuICAgICAgd2lkZTogeyAnbWluLXdpZHRoJzogbWF4V2lkdGgubGcgfSxcbiAgICAgIHZhc3Q6IHsgJ21pbi13aWR0aCc6IG1heFdpZHRoLnhsIH0sXG4gICAgICBleHRyYTogeyAnbWluLXdpZHRoJzogbWF4V2lkdGgueHhsIH0sXG4gICAgICA1OiB7ICdtaW4td2lkdGgnOiAnNSUnIH0sXG4gICAgICAxMDogeyAnbWluLXdpZHRoJzogJzEwJScgfSxcbiAgICAgIDE1OiB7ICdtaW4td2lkdGgnOiAnMTUlJyB9LFxuICAgICAgMjA6IHsgJ21pbi13aWR0aCc6ICcyMCUnIH0sXG4gICAgICAyNTogeyAnbWluLXdpZHRoJzogJzI1JScgfSxcbiAgICAgIDMwOiB7ICdtaW4td2lkdGgnOiAnMzAlJyB9LFxuICAgICAgMzM6IHsgJ21pbi13aWR0aCc6ICczMyUnIH0sXG4gICAgICAzNTogeyAnbWluLXdpZHRoJzogJzM1JScgfSxcbiAgICAgIDQwOiB7ICdtaW4td2lkdGgnOiAnNDAlJyB9LFxuICAgICAgNDU6IHsgJ21pbi13aWR0aCc6ICc0NSUnIH0sXG4gICAgICA1MDogeyAnbWluLXdpZHRoJzogJzUwJScgfSxcbiAgICAgIDU1OiB7ICdtaW4td2lkdGgnOiAnNTUlJyB9LFxuICAgICAgNjA6IHsgJ21pbi13aWR0aCc6ICc2MCUnIH0sXG4gICAgICA2NTogeyAnbWluLXdpZHRoJzogJzY1JScgfSxcbiAgICAgIDY2OiB7ICdtaW4td2lkdGgnOiAnNjYlJyB9LFxuICAgICAgNzA6IHsgJ21pbi13aWR0aCc6ICc3MCUnIH0sXG4gICAgICA3NTogeyAnbWluLXdpZHRoJzogJzc1JScgfSxcbiAgICAgIDgwOiB7ICdtaW4td2lkdGgnOiAnODAlJyB9LFxuICAgICAgODU6IHsgJ21pbi13aWR0aCc6ICc4NSUnIH0sXG4gICAgICA5MDogeyAnbWluLXdpZHRoJzogJzkwJScgfSxcbiAgICAgIDk1OiB7ICdtaW4td2lkdGgnOiAnOTUlJyB9LFxuICAgICAgMTAwOiB7ICdtaW4td2lkdGgnOiAnMTAwJScgfSxcbiAgICAgICcqJzogeyAnbWluLXdpZHRoJzogJyonIH0sXG4gICAgfSxcblxuICAgIC8vIHdpZHRoIGNhbGNcbiAgICB3Y2FsYzoge1xuICAgICAgJyonOiB7IHdpZHRoOiAnY2FsYygqKScgfSxcbiAgICB9LFxuXG4gICAgLy8gbWF4LXdpZHRoIGNhbGNcbiAgICB3bWF4Y2FsYzoge1xuICAgICAgJyonOiB7ICdtYXgtd2lkdGgnOiAnY2FsYygqKScgfSxcbiAgICB9LFxuXG4gICAgLy8gbWluLXdpZHRoIGNhbGNcbiAgICB3bWluY2FsYzoge1xuICAgICAgJyonOiB7ICdtaW4td2lkdGgnOiAnY2FsYygqKScgfSxcbiAgICB9LFxuXG4gICAgLy8gaGVpZ2h0XG4gICAgaDoge1xuICAgICAgJzEwMHZoJzogeyBoZWlnaHQ6ICcxMDB2aCcgfSxcbiAgICAgIGF1dG86IHsgaGVpZ2h0OiAnYXV0bycgfSxcbiAgICAgIDA6IHsgaGVpZ2h0OiAwIH0sXG4gICAgICAxMDA6IHsgaGVpZ2h0OiAnMTAwJScgfSxcbiAgICAgICcqJzogeyBoZWlnaHQ6ICcqJyB9LFxuICAgIH0sXG5cbiAgICAvLyBtYXgtaGVpZ2h0XG4gICAgaG1heDoge1xuICAgICAgJzEwMHZoJzogeyAnbWF4LWhlaWdodCc6ICcxMDB2aCcgfSxcbiAgICAgIG5vbmU6IHsgJ21heC1oZWlnaHQnOiAnbm9uZScgfSxcbiAgICAgIDEwMDogeyAnbWF4LWhlaWdodCc6ICcxMDAlJyB9LFxuICAgICAgMDogeyAnbWF4LWhlaWdodCc6ICcwJyB9LFxuICAgICAgJyonOiB7ICdtYXgtaGVpZ2h0JzogJyonIH0sXG4gICAgfSxcblxuICAgIC8vIG1pbi1oZWlnaHRcbiAgICBobWluOiB7XG4gICAgICAnMTAwdmgnOiB7ICdtaW4taGVpZ2h0JzogJzEwMHZoJyB9LFxuICAgICAgYXV0bzogeyAnbWluLWhlaWdodCc6ICdhdXRvJyB9LFxuICAgICAgMTAwOiB7ICdtaW4taGVpZ2h0JzogJzEwMCUnIH0sXG4gICAgICAnKic6IHsgJ21pbi1oZWlnaHQnOiAnKicgfSxcbiAgICB9LFxuXG4gICAgLy8gaGVpZ2h0IGNhbGNcbiAgICBoY2FsYzoge1xuICAgICAgJyonOiB7IGhlaWdodDogJ2NhbGMoKiknIH0sXG4gICAgfSxcblxuICAgIC8vIG1heC1oZWlnaHQgY2FsY1xuICAgIGhtYXhjYWxjOiB7XG4gICAgICAnKic6IHsgJ21heC1oZWlnaHQnOiAnY2FsYygqKScgfSxcbiAgICB9LFxuXG4gICAgLy8gbWluLWhlaWdodCBjYWxjXG4gICAgaG1pbmNhbGM6IHtcbiAgICAgICcqJzogeyAnbWluLWhlaWdodCc6ICdjYWxjKCopJyB9LFxuICAgIH0sXG5cbiAgICAvLyBzcXVhcmVcbiAgICBzcXVhcmU6IHtcbiAgICAgIGF1dG86IHsgd2lkdGg6ICdhdXRvJywgaGVpZ2h0OiAnYXV0bycgfSxcbiAgICAgIDA6IHsgd2lkdGg6IDAsIGhlaWdodDogMCB9LFxuICAgICAgJyonOiB7IHdpZHRoOiAnKicsIGhlaWdodDogJyonIH0sXG4gICAgfSxcblxuICAgIC8vIHotaW5kZXhcbiAgICB6OiB7XG4gICAgICBuOiB7ICd6LWluZGV4JzogLTEgfSxcbiAgICAgIDA6IHsgJ3otaW5kZXgnOiAwIH0sXG4gICAgICAxOiB7ICd6LWluZGV4JzogMSB9LFxuICAgICAgMzogeyAnei1pbmRleCc6IDMgfSxcbiAgICAgIDY6IHsgJ3otaW5kZXgnOiA2IH0sXG4gICAgICA5OiB7ICd6LWluZGV4JzogOSB9LFxuICAgICAgOTk6IHsgJ3otaW5kZXgnOiA5OSB9LFxuICAgICAgOTk5OiB7ICd6LWluZGV4JzogOTk5IH0sXG4gICAgICA5OTk5OiB7ICd6LWluZGV4JzogOTk5OSB9LFxuICAgICAgJyonOiB7ICd6LWluZGV4JzogJyonIH0sXG4gICAgfSxcblxuICAgIC8vIHNjcm9sbCBzbmFwIHR5cGVcbiAgICAnc3MtdHlwZSc6IHtcbiAgICAgIG5vbmU6IHsgJ3Njcm9sbC1zbmFwLXR5cGUnOiAnbm9uZScgfSxcbiAgICAgIGJvdGg6IHsgJ3Njcm9sbC1zbmFwLXR5cGUnOiAnYm90aCcgfSxcbiAgICB9LFxuXG4gICAgLy8gc2Nyb2xsIHNuYXAgYWxpZ25cbiAgICAnc3MtYWxpZ24nOiB7XG4gICAgICBub25lOiB7ICdzY3JvbGwtc25hcC1hbGlnbic6ICdub25lJyB9LFxuICAgICAgc3RhcnQ6IHsgJ3Njcm9sbC1zbmFwLWFsaWduJzogJ3N0YXJ0JyB9LFxuICAgIH0sXG5cbiAgICAvLyBzY3JvbGwgbWFyZ2luIHRvcFxuICAgICdzbS10b3AnOiB7XG4gICAgICAnKic6IHsgJ3Njcm9sbC1tYXJnaW4tdG9wJzogJyonIH0sXG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRNYXBsZVV0aWxpdHlWYXJpYWJsZU1hcCA9ICh7XG4gIGNvbG9yLFxuICBzcGFjZXIsXG4gIGZvbnRGYW1pbHksXG59OiBNYXBsZVZhcmlhYmxlTW9kZWwpID0+IFtcbiAgeyBwcmVmaXg6ICdmZicsIG1hcDogZm9udEZhbWlseSwgcHJvcHM6IFsnZm9udC1mYW1pbHknXSB9LFxuICB7IHByZWZpeDogJ2JnYycsIG1hcDogY29sb3IsIHByb3BzOiBbJ2JhY2tncm91bmQtY29sb3InXSB9LFxuICB7IHByZWZpeDogJ2JjJywgbWFwOiBjb2xvciwgcHJvcHM6IFsnYm9yZGVyLWNvbG9yJ10gfSxcbiAgeyBwcmVmaXg6ICdiYy10b3AnLCBtYXA6IGNvbG9yLCBwcm9wczogWydib3JkZXItdG9wLWNvbG9yJ10gfSxcbiAgeyBwcmVmaXg6ICdiYy1ib3R0b20nLCBtYXA6IGNvbG9yLCBwcm9wczogWydib3JkZXItYm90dG9tLWNvbG9yJ10gfSxcbiAgeyBwcmVmaXg6ICdiYy1sZWZ0JywgbWFwOiBjb2xvciwgcHJvcHM6IFsnYm9yZGVyLWxlZnQtY29sb3InXSB9LFxuICB7IHByZWZpeDogJ2JjLXJpZ2h0JywgbWFwOiBjb2xvciwgcHJvcHM6IFsnYm9yZGVyLXJpZ2h0LWNvbG9yJ10gfSxcbiAgeyBwcmVmaXg6ICdjb2wtYmMnLCBtYXA6IGNvbG9yLCBwcm9wczogWydjb2x1bW4tcnVsZS1jb2xvciddIH0sXG4gIHsgcHJlZml4OiAnbGluaycsIG1hcDogY29sb3IsIHByb3BzOiBbJ2xpbmsnXSB9LFxuICB7IHByZWZpeDogJ2J0bicsIG1hcDogY29sb3IsIHByb3BzOiBbJ3RoZW1lJ10gfSxcbiAgeyBwcmVmaXg6ICdidG4tb3V0bGluZScsIG1hcDogY29sb3IsIHByb3BzOiBbJ3RoZW1lLW91dGxpbmUnXSB9LFxuICB7IHByZWZpeDogJ2FsZXJ0JywgbWFwOiBjb2xvciwgcHJvcHM6IFsndGhlbWUnXSB9LFxuICB7IHByZWZpeDogJ2FsZXJ0LW91dGxpbmUnLCBtYXA6IGNvbG9yLCBwcm9wczogWyd0aGVtZS1vdXRsaW5lJ10gfSxcbiAgeyBwcmVmaXg6ICdzdHJva2UnLCBtYXA6IGNvbG9yLCBwcm9wczogWydzdHJva2UnXSB9LFxuICB7IHByZWZpeDogJ2ZjJywgbWFwOiBjb2xvciwgcHJvcHM6IFsnY29sb3InXSB9LFxuICB7IHByZWZpeDogJ29jJywgbWFwOiBjb2xvciwgcHJvcHM6IFsnb3V0bGluZS1jb2xvciddIH0sXG4gIHsgcHJlZml4OiAncCcsIG1hcDogc3BhY2VyLCBwcm9wczogWydwYWRkaW5nJ10gfSxcbiAgeyBwcmVmaXg6ICdwYicsIG1hcDogc3BhY2VyLCBwcm9wczogWydwYWRkaW5nLWJvdHRvbSddIH0sXG4gIHsgcHJlZml4OiAncGwnLCBtYXA6IHNwYWNlciwgcHJvcHM6IFsncGFkZGluZy1sZWZ0J10gfSxcbiAgeyBwcmVmaXg6ICdwcicsIG1hcDogc3BhY2VyLCBwcm9wczogWydwYWRkaW5nLXJpZ2h0J10gfSxcbiAgeyBwcmVmaXg6ICdwdCcsIG1hcDogc3BhY2VyLCBwcm9wczogWydwYWRkaW5nLXRvcCddIH0sXG4gIHsgcHJlZml4OiAncHgnLCBtYXA6IHNwYWNlciwgcHJvcHM6IFsncGFkZGluZy1sZWZ0JywgJ3BhZGRpbmctcmlnaHQnXSB9LFxuICB7IHByZWZpeDogJ3B5JywgbWFwOiBzcGFjZXIsIHByb3BzOiBbJ3BhZGRpbmctdG9wJywgJ3BhZGRpbmctYm90dG9tJ10gfSxcbiAgeyBwcmVmaXg6ICdtJywgbWFwOiBzcGFjZXIsIHByb3BzOiBbJ21hcmdpbiddIH0sXG4gIHsgcHJlZml4OiAnbWInLCBtYXA6IHNwYWNlciwgcHJvcHM6IFsnbWFyZ2luLWJvdHRvbSddIH0sXG4gIHsgcHJlZml4OiAnbWwnLCBtYXA6IHNwYWNlciwgcHJvcHM6IFsnbWFyZ2luLWxlZnQnXSB9LFxuICB7IHByZWZpeDogJ21yJywgbWFwOiBzcGFjZXIsIHByb3BzOiBbJ21hcmdpbi1yaWdodCddIH0sXG4gIHsgcHJlZml4OiAnbXQnLCBtYXA6IHNwYWNlciwgcHJvcHM6IFsnbWFyZ2luLXRvcCddIH0sXG4gIHsgcHJlZml4OiAnbXgnLCBtYXA6IHNwYWNlciwgcHJvcHM6IFsnbWFyZ2luLWxlZnQnLCAnbWFyZ2luLXJpZ2h0J10gfSxcbiAgeyBwcmVmaXg6ICdteScsIG1hcDogc3BhY2VyLCBwcm9wczogWydtYXJnaW4tdG9wJywgJ21hcmdpbi1ib3R0b20nXSB9LFxuICB7IHByZWZpeDogJ3RvcCcsIG1hcDogc3BhY2VyLCBwcm9wczogWyd0b3AnXSB9LFxuICB7IHByZWZpeDogJ2xlZnQnLCBtYXA6IHNwYWNlciwgcHJvcHM6IFsnbGVmdCddIH0sXG4gIHsgcHJlZml4OiAncmlnaHQnLCBtYXA6IHNwYWNlciwgcHJvcHM6IFsncmlnaHQnXSB9LFxuICB7IHByZWZpeDogJ2JvdHRvbScsIG1hcDogc3BhY2VyLCBwcm9wczogWydib3R0b20nXSB9LFxuICB7IHByZWZpeDogJ3RvYm8nLCBtYXA6IHNwYWNlciwgcHJvcHM6IFsndG9wJywgJ2JvdHRvbSddIH0sXG4gIHsgcHJlZml4OiAnbGVyaScsIG1hcDogc3BhY2VyLCBwcm9wczogWydsZWZ0JywgJ3JpZ2h0J10gfSxcbiAgeyBwcmVmaXg6ICdsZWJvJywgbWFwOiBzcGFjZXIsIHByb3BzOiBbJ2xlZnQnLCAnYm90dG9tJ10gfSxcbiAge1xuICAgIHByZWZpeDogJ3RibHInLFxuICAgIG1hcDogc3BhY2VyLFxuICAgIHByb3BzOiBbJ3RvcCcsICdib3R0b20nLCAnbGVmdCcsICdyaWdodCddLFxuICB9LFxuICB7IHByZWZpeDogJ3RibHInLCBtYXA6IHNwYWNlciwgcHJvcHM6IFsndG9wJywgJ2JvdHRvbScsICdsZWZ0JywgJ3JpZ2h0J10gfSxcbiAgeyBwcmVmaXg6ICdidycsIG1hcDogc3BhY2VyLCBwcm9wczogWydib3JkZXItd2lkdGgnXSB9LFxuICB7IHByZWZpeDogJ2J3LWJvdHRvbScsIG1hcDogc3BhY2VyLCBwcm9wczogWydib3JkZXItYm90dG9tLXdpZHRoJ10gfSxcbiAgeyBwcmVmaXg6ICdidy10b3AnLCBtYXA6IHNwYWNlciwgcHJvcHM6IFsnYm9yZGVyLXRvcC13aWR0aCddIH0sXG4gIHsgcHJlZml4OiAnYnctbGVmdCcsIG1hcDogc3BhY2VyLCBwcm9wczogWydib3JkZXItbGVmdC13aWR0aCddIH0sXG4gIHsgcHJlZml4OiAnYnctcmlnaHQnLCBtYXA6IHNwYWNlciwgcHJvcHM6IFsnYm9yZGVyLXJpZ2h0LXdpZHRoJ10gfSxcbiAgeyBwcmVmaXg6ICdjb2wtZ2FwJywgbWFwOiBzcGFjZXIsIHByb3BzOiBbJ2NvbHVtbi1nYXAnXSB9LFxuXTtcbiJdfQ==