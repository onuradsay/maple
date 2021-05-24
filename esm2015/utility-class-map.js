export const getMapleUtilityClassMap = ({ fontFamily, fontSize, fontWeight, maxWidth, spacer, transition, button, alert, }) => {
    const buttonCommonStyles = {
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
        transition: `
      color ${button.transitionDuration} ${button.transitionTiming},
      background-color ${button.transitionDuration} ${button.transitionTiming},
      border-color ${button.transitionDuration} ${button.transitionTiming}
    `,
    };
    const alertCommonStyles = {
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
            _common: Object.assign(Object.assign({}, buttonCommonStyles), { border: 'none', 'text-decoration': 'underline', 'background-color': 'transparent' }),
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
            all: { transition: `all ${transition.duration} ${transition.timing}` },
            bgc: {
                transition: `background-color ${transition.duration} ${transition.timing}`,
            },
            fc: {
                transition: `color ${transition.duration} ${transition.timing}`,
            },
            w: { transition: `width ${transition.duration} ${transition.timing}` },
            h: {
                transition: `height ${transition.duration} ${transition.timing}`,
            },
            hmax: {
                transition: `max-height ${transition.duration} ${transition.timing}`,
            },
            transform: {
                transition: `transform ${transition.duration} ${transition.timing}`,
            },
            opacity: {
                transition: `opacity ${transition.duration} ${transition.timing}`,
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
export const getMapleUtilityVariableMap = ({ color, spacer, fontFamily, }) => [
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbGl0eS1jbGFzcy1tYXAuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXBsZS8iLCJzb3VyY2VzIjpbInV0aWxpdHktY2xhc3MtbWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE1BQU0sQ0FBQyxNQUFNLHVCQUF1QixHQUFHLENBQUMsRUFDdEMsVUFBVSxFQUNWLFFBQVEsRUFDUixVQUFVLEVBQ1YsUUFBUSxFQUNSLE1BQU0sRUFDTixVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssR0FDYyxFQUFFLEVBQUU7SUFDdkIsTUFBTSxrQkFBa0IsR0FBRztRQUN6QixPQUFPLEVBQUUsYUFBYTtRQUN0QixhQUFhLEVBQUUsUUFBUTtRQUN2QixpQkFBaUIsRUFBRSxRQUFRO1FBQzNCLGFBQWEsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVU7UUFDdkMsYUFBYSxFQUFFLE1BQU07UUFDckIsY0FBYyxFQUFFLE9BQU87UUFDdkIsYUFBYSxFQUFFLFFBQVE7UUFDdkIsY0FBYyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVztRQUN6QyxlQUFlLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZO1FBQzNDLFdBQVcsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVE7UUFDbkMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVTtRQUN2QyxpQkFBaUIsRUFBRSxNQUFNO1FBQ3pCLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxJQUFJLE1BQU07UUFDbEQsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLElBQUksUUFBUTtRQUN6RCxPQUFPLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPO1FBQzlCLFVBQVUsRUFBRTtjQUNGLE1BQU0sQ0FBQyxrQkFBa0IsSUFBSSxNQUFNLENBQUMsZ0JBQWdCO3lCQUN6QyxNQUFNLENBQUMsa0JBQWtCLElBQUksTUFBTSxDQUFDLGdCQUFnQjtxQkFDeEQs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Q2hDLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxRQUFRLENBQUMsRUFBRSxFQUFFO1lBQ2hDLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxRQUFRLENBQUMsRUFBRSxFQUFFO1lBQ2hDLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxRQUFRLENBQUMsRUFBRSxFQUFFO1lBQ2hDLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxRQUFRLENBQUMsRUFBRSxFQUFFO1lBQ2hDLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxRQUFRLENBQUMsRUFBRSxFQUFFO1lBQ2hDLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxRQUFRLENBQUMsRUFBRSxFQUFFO1lBQ2hDLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxRQUFRLENBQUMsRUFBRSxFQUFFO1lBQ2hDLEdBQUcsRUFBRSxFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUU7U0FDMUI7UUFFRCxjQUFjO1FBQ2QsRUFBRSxFQUFFO1lBQ0YsS0FBSyxFQUFFLEVBQUUsYUFBYSxFQUFFLFVBQVUsQ0FBQyxLQUFLLEVBQUU7WUFDMUMsT0FBTyxFQUFFLEVBQUUsYUFBYSxFQUFFLFVBQVUsQ0FBQyxPQUFPLEVBQUU7WUFDOUMsTUFBTSxFQUFFLEVBQUUsYUFBYSxFQUFFLFVBQVUsQ0FBQyxPQUFPLEVBQUU7WUFDN0MsTUFBTSxFQUFFLEVBQUUsYUFBYSxFQUFFLFVBQVUsQ0FBQyxNQUFNLEVBQUU7WUFDNUMsSUFBSSxFQUFFLEVBQUUsYUFBYSxFQUFFLFVBQVUsQ0FBQyxJQUFJLEVBQUU7WUFDeEMsSUFBSSxFQUFFLEVBQUUsYUFBYSxFQUFFLFVBQVUsQ0FBQyxJQUFJLEVBQUU7WUFDeEMsS0FBSyxFQUFFLEVBQUUsYUFBYSxFQUFFLFVBQVUsQ0FBQyxLQUFLLEVBQUU7WUFDMUMsT0FBTyxFQUFFLEVBQUUsYUFBYSxFQUFFLFVBQVUsQ0FBQyxPQUFPLEVBQUU7U0FDL0M7UUFFRCxhQUFhO1FBQ2IsRUFBRSxFQUFFO1lBQ0YsR0FBRyxFQUFFLEVBQUUsWUFBWSxFQUFFLFFBQVEs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LEtBQUssRUFBRSxJQUFJLEVBQUU7WUFDbEIsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtZQUNwQixFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO1lBQ3BCLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7WUFDcEIsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtZQUNwQixFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO1lBQ3BCLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7WUFDcEIsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtZQUNwQixFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO1lBQ3BCLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7WUFDcEIsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtZQUNwQixFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO1lBQ3BCLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7WUFDcEIsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtZQUNwQixFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO1lBQ3BCLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7WUFDcEIsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtZQUNwQixFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO1lBQ3BCLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7WUFDcEIsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtZQUNwQixFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO1lBQ3BCLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUU7WUFDdEIsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTtTQUNwQjtRQUVELFlBQVk7UUFDWixJQUFJLEVBQUU7WUFDSixNQUFNLEVBQUUsRUFBRSxXQUFXLEVBQUUsUUFBUSxDQUFDLEVBQUUsRUFBRTtZQUNwQyxNQUFNLEVBQUUsRUFBRSxXQUFXLEVBQUUsUUFBUSxDQUFDLEVBQUUsRUFBRTtZQUNwQyxJQUFJLEVBQUUsRUFBRSxXQUFXLEVBQUUsUUFBUSxDQUFDLEVBQUUsRUFBRTtZQUNsQyxJQUFJLEVBQUUsRUFBRSxXQUFXLEVBQUUsUUFBUSxDQUFDLEVBQUUsRUFBRTtZQUNsQyxLQUFLLEVBQUUsRUFBRSxXQUFXLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRTtZQUNwQyxDQUFDLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFO1lBQ3hCLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUU7WUFDMUIsRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRTtZQUMxQixFQUFFLEVBQUUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFO1lBQzFCLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUU7WUFDMUIsRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRTtZQUMxQixFQUFFLEVBQUUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFO1lBQzFCLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUU7WUFDMUIsRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRTtZQUMxQixFQUFFLEVBQUUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFO1lBQzFCLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUU7WUFDMUIsRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRTtZQUMxQixFQUFFLEVBQUUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFO1lBQzFCLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUU7WUFDMUIsRUFBRSxFQUFFLEVB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QUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUU7SUFDL0MsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUU7SUFDL0MsRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsZUFBZSxDQUFDLEVBQUU7SUFDL0QsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUU7SUFDakQsRUFBRSxNQUFNLEVBQUUsZUFBZSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsZUFBZSxDQUFDLEVBQUU7SUFDakUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDbkQsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUU7SUFDOUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsZUFBZSxDQUFDLEVBQUU7SUFDdEQsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUU7SUFDaEQsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtJQUN4RCxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxjQUFjLENBQUMsRUFBRTtJQUN0RCxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxlQUFlLENBQUMsRUFBRTtJQUN2RCxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxhQUFhLENBQUMsRUFBRTtJQUNyRCxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxjQUFjLEVBQUUsZUFBZSxDQUFDLEVBQUU7SUFDdkUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsYUFBYSxFQUFFLGdCQUFnQixDQUFDLEVBQUU7SUFDdkUsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDL0MsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsZUFBZSxDQUFDLEVBQUU7SUFDdkQsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsYUFBYSxDQUFDLEVBQUU7SUFDckQsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsY0FBYyxDQUFDLEVBQUU7SUFDdEQsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsWUFBWSxDQUFDLEVBQUU7SUFDcEQsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsYUFBYSxFQUFFLGNBQWMsQ0FBQyxFQUFFO0lBQ3JFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLFlBQVksRUFBRSxlQUFlLENBQUMsRUFBRTtJQUNyRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRTtJQUM5QyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRTtJQUNoRCxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRTtJQUNsRCxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRTtJQUNwRCxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLEVBQUU7SUFDekQsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxFQUFFO0lBQ3pELEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsRUFBRTtJQUMxRDtRQUNFLE1BQU0sRUFBRSxNQUFNO1FBQ2QsR0FBRyxFQUFFLE1BQU07UUFDWCxLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUM7S0FDMUM7SUFDRCxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsRUFBRTtJQUMxRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxjQUFjLENBQUMsRUFBRTtJQUN0RCxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFO0lBQ3BFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLGtCQUFrQixDQUFDLEVBQUU7SUFDOUQsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsbUJBQW1CLENBQUMsRUFBRTtJQUNoRSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFO0lBQ2xFLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFFO0NBQzFELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYXBsZVZhcmlhYmxlTW9kZWwgfSBmcm9tICcuL3R5cGVzL3ZhcmlhYmxlcy5tb2RlbCc7XG5cbmV4cG9ydCBjb25zdCBnZXRNYXBsZVV0aWxpdHlDbGFzc01hcCA9ICh7XG4gIGZvbnRGYW1pbHksXG4gIGZvbnRTaXplLFxuICBmb250V2VpZ2h0LFxuICBtYXhXaWR0aCxcbiAgc3BhY2VyLFxuICB0cmFuc2l0aW9uLFxuICBidXR0b24sXG4gIGFsZXJ0LFxufTogTWFwbGVWYXJpYWJsZU1vZGVsKSA9PiB7XG4gIGNvbnN0IGJ1dHRvbkNvbW1vblN0eWxlcyA9IHtcbiAgICBkaXNwbGF5OiAnaW5saW5lLWZsZXgnLFxuICAgICdhbGlnbi1pdGVtcyc6ICdjZW50ZXInLFxuICAgICdqdXN0aWZ5LWNvbnRlbnQnOiAnY2VudGVyJyxcbiAgICAnZm9udC13ZWlnaHQnOiBidXR0b24ubm9ybWFsLmZvbnRXZWlnaHQsXG4gICAgJ3VzZXItc2VsZWN0JzogJ25vbmUnLFxuICAgICdib3JkZXItc3R5bGUnOiAnc29saWQnLFxuICAgICd3aGl0ZS1zcGFjZSc6ICdub3dyYXAnLFxuICAgICdib3JkZXItd2lkdGgnOiBidXR0b24ubm9ybWFsLmJvcmRlcldpZHRoLFxuICAgICdib3JkZXItcmFkaXVzJzogYnV0dG9uLm5vcm1hbC5ib3JkZXJSYWRpdXMsXG4gICAgJ2ZvbnQtc2l6ZSc6IGJ1dHRvbi5ub3JtYWwuZm9udFNpemUsXG4gICAgJ2xpbmUtaGVpZ2h0JzogYnV0dG9uLm5vcm1hbC5saW5lSGVpZ2h0LFxuICAgICd0ZXh0LWRlY29yYXRpb24nOiAnbm9uZScsXG4gICAgJ3RleHQtdHJhbnNmb3JtJzogYnV0dG9uLm5vcm1hbC50ZXh0Q2FzZSB8fCAnbm9uZScsXG4gICAgJ2xldHRlci1zcGFjaW5nJzogYnV0dG9uLm5vcm1hbC5sZXR0ZXJTcGFjaW5nIHx8ICdub3JtYWwnLFxuICAgIHBhZGRpbmc6IGJ1dHRvbi5ub3JtYWwucGFkZGluZyxcbiAgICB0cmFuc2l0aW9uOiBgXG4gICAgICBjb2xvciAke2J1dHRvbi50cmFuc2l0aW9uRHVyYXRpb259ICR7YnV0dG9uLnRyYW5zaXRpb25UaW1pbmd9LFxuICAgICAgYmFja2dyb3VuZC1jb2xvciAke2J1dHRvbi50cmFuc2l0aW9uRHVyYXRpb259ICR7YnV0dG9uLnRyYW5zaXRpb25UaW1pbmd9LFxuICAgICAgYm9yZGVyLWNvbG9yICR7YnV0dG9uLnRyYW5zaXRpb25EdXJhdGlvbn0gJHtidXR0b24udHJhbnNpdGlvblRpbWluZ31cbiAgICBgLFxuICB9O1xuXG4gIGNvbnN0IGFsZXJ0Q29tbW9uU3R5bGVzID0ge1xuICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAnYWxpZ24taXRlbXMnOiAnY2VudGVyJyxcbiAgICAnanVzdGlmeS1jb250ZW50JzogJ2ZsZXgtc3RhcnQnLFxuICAgICdmb250LXdlaWdodCc6IGFsZXJ0Lm5vcm1hbC5mb250V2VpZ2h0LFxuICAgICd1c2VyLXNlbGVjdCc6ICdub25lJyxcbiAgICAnYm9yZGVyLXN0eWxlJzogJ3NvbGlkJyxcbiAgICAnYm9yZGVyLXdpZHRoJzogYWxlcnQubm9ybWFsLmJvcmRlcldpZHRoLFxuICAgICdib3JkZXItcmFkaXVzJzogYWxlcnQubm9ybWFsLmJvcmRlclJhZGl1cyxcbiAgICAnZm9udC1zaXplJzogYWxlcnQubm9ybWFsLmZvbnRTaXplLFxuICAgICdsaW5lLWhlaWdodCc6IGFsZXJ0Lm5vcm1hbC5saW5lSGVpZ2h0LFxuICAgICd0ZXh0LWRlY29yYXRpb24nOiAnbm9uZScsXG4gICAgcGFkZGluZzogYWxlcnQubm9ybWFsLnBhZGRpbmcsXG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBhbGVydDoge1xuICAgICAgX2NvbW1vbjogYWxlcnRDb21tb25TdHlsZXMsXG4gICAgfSxcblxuICAgICdhbGVydC1vdXRsaW5lJzoge1xuICAgICAgX2NvbW1vbjogYWxlcnRDb21tb25TdHlsZXMsXG4gICAgfSxcblxuICAgICdhbGVydC1zaXplJzoge1xuICAgICAgc21hbGw6IHtcbiAgICAgICAgJ2JvcmRlci13aWR0aCc6IGFsZXJ0LnNtYWxsLmJvcmRlcldpZHRoLFxuICAgICAgICAnYm9yZGVyLXJhZGl1cyc6IGFsZXJ0LnNtYWxsLmJvcmRlclJhZGl1cyxcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6IGFsZXJ0LnNtYWxsLmZvbnRTaXplLFxuICAgICAgICAnZm9udC13ZWlnaHQnOiBhbGVydC5zbWFsbC5mb250V2VpZ2h0LFxuICAgICAgICAnbGluZS1oZWlnaHQnOiBhbGVydC5zbWFsbC5saW5lSGVpZ2h0LFxuICAgICAgICBwYWRkaW5nOiBhbGVydC5zbWFsbC5wYWRkaW5nLFxuICAgICAgfSxcbiAgICAgIG5vcm1hbDoge1xuICAgICAgICAnYm9yZGVyLXdpZHRoJzogYWxlcnQubm9ybWFsLmJvcmRlcldpZHRoLFxuICAgICAgICAnYm9yZGVyLXJhZGl1cyc6IGFsZXJ0Lm5vcm1hbC5ib3JkZXJSYWRpdXMsXG4gICAgICAgICdmb250LXNpemUnOiBhbGVydC5ub3JtYWwuZm9udFNpemUsXG4gICAgICAgICdmb250LXdlaWdodCc6IGFsZXJ0Lm5vcm1hbC5mb250V2VpZ2h0LFxuICAgICAgICAnbGluZS1oZWlnaHQnOiBhbGVydC5ub3JtYWwubGluZUhlaWdodCxcbiAgICAgICAgcGFkZGluZzogYWxlcnQubm9ybWFsLnBhZGRpbmcsXG4gICAgICB9LFxuICAgICAgbWVkaXVtOiB7XG4gICAgICAgICdib3JkZXItd2lkdGgnOiBhbGVydC5tZWRpdW0uYm9yZGVyV2lkdGgsXG4gICAgICAgICdib3JkZXItcmFkaXVzJzogYWxlcnQubWVkaXVtLmJvcmRlclJhZGl1cyxcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6IGFsZXJ0Lm1lZGl1bS5mb250U2l6ZSxcbiAgICAgICAgJ2ZvbnQtd2VpZ2h0JzogYWxlcnQubWVkaXVtLmZvbnRXZWlnaHQsXG4gICAgICAgICdsaW5lLWhlaWdodCc6IGFsZXJ0Lm1lZGl1bS5saW5lSGVpZ2h0LFxuICAgICAgICBwYWRkaW5nOiBhbGVydC5tZWRpdW0ucGFkZGluZyxcbiAgICAgIH0sXG4gICAgICBsYXJnZToge1xuICAgICAgICAnYm9yZGVyLXdpZHRoJzogYWxlcnQubGFyZ2UuYm9yZGVyV2lkdGgsXG4gICAgICAgICdib3JkZXItcmFkaXVzJzogYWxlcnQubGFyZ2UuYm9yZGVyUmFkaXVzLFxuICAgICAgICAnZm9udC1zaXplJzogYWxlcnQubGFyZ2UuZm9udFNpemUsXG4gICAgICAgICdmb250LXdlaWdodCc6IGFsZXJ0LmxhcmdlLmZvbnRXZWlnaHQsXG4gICAgICAgICdsaW5lLWhlaWdodCc6IGFsZXJ0LmxhcmdlLmxpbmVIZWlnaHQsXG4gICAgICAgIHBhZGRpbmc6IGFsZXJ0LmxhcmdlLnBhZGRpbmcsXG4gICAgICB9LFxuICAgIH0sXG5cbiAgICAvLyBhbmltYXRpb25cbiAgICBhbmltYXRpb246IHtcbiAgICAgICcqJzogeyBhbmltYXRpb246ICcqJyB9LFxuICAgIH0sXG5cbiAgICAvLyBiYWNrZ3JvdW5kLWltYWdlXG4gICAgYmdpOiB7XG4gICAgICBub25lOiB7ICdiYWNrZ3JvdW5kLWltYWdlJzogJ25vbmUnIH0sXG4gICAgICAnKic6IHsgJ2JhY2tncm91bmQtaW1hZ2UnOiAndXJsKFwiKlwiKScgfSxcbiAgICB9LFxuXG4gICAgLy8gYmFja2dyb3VuZC1yZXBlYXRcbiAgICAnYmctcmVwZWF0Jzoge1xuICAgICAgbm86IHsgJ2JhY2tncm91bmQtcmVwZWF0JzogJ25vLXJlcGVhdCcgfSxcbiAgICAgIHllczogeyAnYmFja2dyb3VuZC1yZXBlYXQnOiAncmVwZWF0JyB9LFxuICAgICAgJyonOiB7ICdiYWNrZ3JvdW5kLXJlcGVhdCc6ICcqJyB9LFxuICAgIH0sXG5cbiAgICAvLyBib3JkZXJcbiAgICBiOiB7XG4gICAgICBub25lOiB7IGJvcmRlcjogJ25vbmUnIH0sXG4gICAgICAnKic6IHsgYm9yZGVyOiAnKicgfSxcbiAgICB9LFxuXG4gICAgLy8gYm9yZGVyLXJhZGl1c1xuICAgIGJyOiB7XG4gICAgICBmdWxsOiB7ICdib3JkZXItcmFkaXVzJzogJzEwMCUnIH0sXG4gICAgICBoYWxmOiB7ICdib3JkZXItcmFkaXVzJzogJzUwJScgfSxcbiAgICAgIHF1YXJ0ZXI6IHsgJ2JvcmRlci1yYWRpdXMnOiAnMjUlJyB9LFxuICAgICAgMDogeyAnYm9yZGVyLXJhZGl1cyc6IDAgfSxcbiAgICAgICcqJzogeyAnYm9yZGVyLXJhZGl1cyc6ICcqJyB9LFxuICAgIH0sXG5cbiAgICAvLyBib3JkZXItc3BhY2luZ1xuXG4gICAgJ2JvcmRlci1zcGFjaW5nJzoge1xuICAgICAgMDogeyAnYm9yZGVyLXNwYWNpbmcnOiAwIH0sXG4gICAgICAnKic6IHsgJ2JvcmRlci1zcGFjaW5nJzogJyonIH0sXG4gICAgfSxcblxuICAgIC8vIGJvcmRlci1jb2xsYXBzZVxuXG4gICAgJ2JvcmRlci1jb2xsYXBzZSc6IHtcbiAgICAgIGNvbGxhcHNlOiB7ICdib3JkZXItY29sbGFwc2UnOiAnY29sbGFwc2UnIH0sXG4gICAgICByZXZlcnQ6IHsgJ2JvcmRlci1jb2xsYXBzZSc6ICdyZXZlcnQnIH0sXG4gICAgICBzZXBhcmF0ZTogeyAnYm9yZGVyLWNvbGxhcHNlJzogJ3NlcGFyYXRlJyB9LFxuICAgICAgJyonOiB7ICdib3JkZXItY29sbGFwc2UnOiAnKicgfSxcbiAgICB9LFxuXG4gICAgLy8gYm94LXNoYWRvd1xuICAgIGJzOiB7XG4gICAgICBub25lOiB7ICdib3gtc2hhZG93JzogJ25vbmUnIH0sXG4gICAgICAnKic6IHsgJ2JveC1zaGFkb3cnOiAnKicgfSxcbiAgICB9LFxuXG4gICAgYnc6IHtcbiAgICAgIF9jb21tb246IHsgJ2JvcmRlci1zdHlsZSc6ICdzb2xpZCcgfSxcbiAgICAgIDA6IHsgJ2JvcmRlci13aWR0aCc6ICcwJyB9LFxuICAgICAgJyonOiB7ICdib3JkZXItd2lkdGgnOiAnKicgfSxcbiAgICB9LFxuXG4gICAgJ2J3LXRvcCc6IHtcbiAgICAgIF9jb21tb246IHsgJ2JvcmRlci10b3Atc3R5bGUnOiAnc29saWQnIH0sXG4gICAgICAwOiB7ICdib3JkZXItdG9wLXdpZHRoJzogJzAnIH0sXG4gICAgICAnKic6IHsgJ2JvcmRlci10b3Atd2lkdGgnOiAnKicgfSxcbiAgICB9LFxuXG4gICAgJ2J3LWJvdHRvbSc6IHtcbiAgICAgIF9jb21tb246IHsgJ2JvcmRlci1ib3R0b20tc3R5bGUnOiAnc29saWQnIH0sXG4gICAgICAwOiB7ICdib3JkZXItYm90dG9tLXdpZHRoJzogJzAnIH0sXG4gICAgICAnKic6IHsgJ2JvcmRlci1ib3R0b20td2lkdGgnOiAnKicgfSxcbiAgICB9LFxuXG4gICAgJ2J3LWxlZnQnOiB7XG4gICAgICBfY29tbW9uOiB7ICdib3JkZXItbGVmdC1zdHlsZSc6ICdzb2xpZCcgfSxcbiAgICAgIDA6IHsgJ2JvcmRlci1sZWZ0LXdpZHRoJzogJzAnIH0sXG4gICAgICAnKic6IHsgJ2JvcmRlci1sZWZ0LXdpZHRoJzogJyonIH0sXG4gICAgfSxcblxuICAgICdidy1yaWdodCc6IHtcbiAgICAgIF9jb21tb246IHsgJ2JvcmRlci1yaWdodC1zdHlsZSc6ICdzb2xpZCcgfSxcbiAgICAgIDA6IHsgJ2JvcmRlci1yaWdodC13aWR0aCc6ICcwJyB9LFxuICAgICAgJyonOiB7ICdib3JkZXItcmlnaHQtd2lkdGgnOiAnKicgfSxcbiAgICB9LFxuXG4gICAgbGluazoge1xuICAgICAgX2NvbW1vbjoge1xuICAgICAgICAuLi5idXR0b25Db21tb25TdHlsZXMsXG4gICAgICAgIGJvcmRlcjogJ25vbmUnLFxuICAgICAgICAndGV4dC1kZWNvcmF0aW9uJzogJ3VuZGVybGluZScsXG4gICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogJ3RyYW5zcGFyZW50JyxcbiAgICAgIH0sXG4gICAgfSxcblxuICAgIGJ0bjoge1xuICAgICAgX2NvbW1vbjogYnV0dG9uQ29tbW9uU3R5bGVzLFxuICAgIH0sXG5cbiAgICAnYnRuLW91dGxpbmUnOiB7XG4gICAgICBfY29tbW9uOiBidXR0b25Db21tb25TdHlsZXMsXG4gICAgfSxcblxuICAgICdidG4tc2l6ZSc6IHtcbiAgICAgIHNtYWxsOiB7XG4gICAgICAgICdib3JkZXItd2lkdGgnOiBidXR0b24uc21hbGwuYm9yZGVyV2lkdGgsXG4gICAgICAgICdib3JkZXItcmFkaXVzJzogYnV0dG9uLnNtYWxsLmJvcmRlclJhZGl1cyxcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6IGJ1dHRvbi5zbWFsbC5mb250U2l6ZSxcbiAgICAgICAgJ2ZvbnQtd2VpZ2h0JzogYnV0dG9uLnNtYWxsLmZvbnRXZWlnaHQsXG4gICAgICAgICdsaW5lLWhlaWdodCc6IGJ1dHRvbi5zbWFsbC5saW5lSGVpZ2h0LFxuICAgICAgICAndGV4dC10cmFuc2Zvcm0nOiBidXR0b24uc21hbGwudGV4dENhc2UgfHwgJ25vbmUnLFxuICAgICAgICAnbGV0dGVyLXNwYWNpbmcnOiBidXR0b24uc21hbGwubGV0dGVyU3BhY2luZyB8fCAnbm9ybWFsJyxcbiAgICAgICAgcGFkZGluZzogYnV0dG9uLnNtYWxsLnBhZGRpbmcsXG4gICAgICB9LFxuICAgICAgbm9ybWFsOiB7XG4gICAgICAgICdib3JkZXItd2lkdGgnOiBidXR0b24ubm9ybWFsLmJvcmRlcldpZHRoLFxuICAgICAgICAnYm9yZGVyLXJhZGl1cyc6IGJ1dHRvbi5ub3JtYWwuYm9yZGVyUmFkaXVzLFxuICAgICAgICAnZm9udC1zaXplJzogYnV0dG9uLm5vcm1hbC5mb250U2l6ZSxcbiAgICAgICAgJ2ZvbnQtd2VpZ2h0JzogYnV0dG9uLm5vcm1hbC5mb250V2VpZ2h0LFxuICAgICAgICAnbGluZS1oZWlnaHQnOiBidXR0b24ubm9ybWFsLmxpbmVIZWlnaHQsXG4gICAgICAgICd0ZXh0LXRyYW5zZm9ybSc6IGJ1dHRvbi5ub3JtYWwudGV4dENhc2UgfHwgJ25vbmUnLFxuICAgICAgICAnbGV0dGVyLXNwYWNpbmcnOiBidXR0b24ubm9ybWFsLmxldHRlclNwYWNpbmcgfHwgJ25vcm1hbCcsXG4gICAgICAgIHBhZGRpbmc6IGJ1dHRvbi5ub3JtYWwucGFkZGluZyxcbiAgICAgIH0sXG4gICAgICBtZWRpdW06IHtcbiAgICAgICAgJ2JvcmRlci13aWR0aCc6IGJ1dHRvbi5tZWRpdW0uYm9yZGVyV2lkdGgsXG4gICAgICAgICdib3JkZXItcmFkaXVzJzogYnV0dG9uLm1lZGl1bS5ib3JkZXJSYWRpdXMsXG4gICAgICAgICdmb250LXNpemUnOiBidXR0b24ubWVkaXVtLmZvbnRTaXplLFxuICAgICAgICAnZm9udC13ZWlnaHQnOiBidXR0b24ubWVkaXVtLmZvbnRXZWlnaHQsXG4gICAgICAgICdsaW5lLWhlaWdodCc6IGJ1dHRvbi5tZWRpdW0ubGluZUhlaWdodCxcbiAgICAgICAgJ3RleHQtdHJhbnNmb3JtJzogYnV0dG9uLm1lZGl1bS50ZXh0Q2FzZSB8fCAnbm9uZScsXG4gICAgICAgICdsZXR0ZXItc3BhY2luZyc6IGJ1dHRvbi5tZWRpdW0ubGV0dGVyU3BhY2luZyB8fCAnbm9ybWFsJyxcbiAgICAgICAgcGFkZGluZzogYnV0dG9uLm1lZGl1bS5wYWRkaW5nLFxuICAgICAgfSxcbiAgICAgIGxhcmdlOiB7XG4gICAgICAgICdib3JkZXItd2lkdGgnOiBidXR0b24ubGFyZ2UuYm9yZGVyV2lkdGgsXG4gICAgICAgICdib3JkZXItcmFkaXVzJzogYnV0dG9uLmxhcmdlLmJvcmRlclJhZGl1cyxcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6IGJ1dHRvbi5sYXJnZS5mb250U2l6ZSxcbiAgICAgICAgJ2ZvbnQtd2VpZ2h0JzogYnV0dG9uLmxhcmdlLmZvbnRXZWlnaHQsXG4gICAgICAgICdsaW5lLWhlaWdodCc6IGJ1dHRvbi5sYXJnZS5saW5lSGVpZ2h0LFxuICAgICAgICAndGV4dC10cmFuc2Zvcm0nOiBidXR0b24ubGFyZ2UudGV4dENhc2UgfHwgJ25vbmUnLFxuICAgICAgICAnbGV0dGVyLXNwYWNpbmcnOiBidXR0b24ubGFyZ2UubGV0dGVyU3BhY2luZyB8fCAnbm9ybWFsJyxcbiAgICAgICAgcGFkZGluZzogYnV0dG9uLmxhcmdlLnBhZGRpbmcsXG4gICAgICB9LFxuICAgIH0sXG5cbiAgICAvLyBtaXgtYmxlbmQtbW9kZVxuICAgIGJsZW5kOiB7XG4gICAgICAnY29sb3ItYnVybic6IHsgJ21peC1ibGVuZC1tb2RlJzogJ2NvbG9yLWJ1cm4nIH0sXG4gICAgICAnY29sb3ItZG9kZ2UnOiB7ICdtaXgtYmxlbmQtbW9kZSc6ICdjb2xvci1kb2RnZScgfSxcbiAgICAgICdoYXJkLWxpZ2h0JzogeyAnbWl4LWJsZW5kLW1vZGUnOiAnaGFyZC1saWdodCcgfSxcbiAgICAgICdzb2Z0LWxpZ2h0JzogeyAnbWl4LWJsZW5kLW1vZGUnOiAnc29mdC1saWdodCcgfSxcbiAgICAgIGNvbG9yOiB7ICdtaXgtYmxlbmQtbW9kZSc6ICdjb2xvcicgfSxcbiAgICAgIGRhcmtlbjogeyAnbWl4LWJsZW5kLW1vZGUnOiAnZGFya2VuJyB9LFxuICAgICAgZGlmZmVyZW5jZTogeyAnbWl4LWJsZW5kLW1vZGUnOiAnZGlmZmVyZW5jZScgfSxcbiAgICAgIGV4Y2x1c2lvbjogeyAnbWl4LWJsZW5kLW1vZGUnOiAnZXhjbHVzaW9uJyB9LFxuICAgICAgaHVlOiB7ICdtaXgtYmxlbmQtbW9kZSc6ICdodWUnIH0sXG4gICAgICBpbmhlcml0OiB7ICdtaXgtYmxlbmQtbW9kZSc6ICdpbmhlcml0JyB9LFxuICAgICAgbGlnaHRlbjogeyAnbWl4LWJsZW5kLW1vZGUnOiAnbGlnaHRlbicgfSxcbiAgICAgIGx1bWlub3NpdHk6IHsgJ21peC1ibGVuZC1tb2RlJzogJ2x1bWlub3NpdHknIH0sXG4gICAgICBtdWx0aXBseTogeyAnbWl4LWJsZW5kLW1vZGUnOiAnbXVsdGlwbHknIH0sXG4gICAgICBub3JtYWw6IHsgJ21peC1ibGVuZC1tb2RlJzogJ25vcm1hbCcgfSxcbiAgICAgIG92ZXJsYXk6IHsgJ21peC1ibGVuZC1tb2RlJzogJ292ZXJsYXknIH0sXG4gICAgICBzYXR1cmF0aW9uOiB7ICdtaXgtYmxlbmQtbW9kZSc6ICdzYXR1cmF0aW9uJyB9LFxuICAgICAgc2NyZWVuOiB7ICdtaXgtYmxlbmQtbW9kZSc6ICdzY3JlZW4nIH0sXG4gICAgfSxcblxuICAgIC8vIGJhY2tkcm9wIGJsdXJcbiAgICAnYmFja2Ryb3AtYmx1cic6IHtcbiAgICAgIDA6IHsgJ2JhY2tkcm9wLWZpbHRlcic6ICdibHVyKDApJyB9LFxuICAgICAgJyonOiB7ICdiYWNrZHJvcC1maWx0ZXInOiAnYmx1cigqKScgfSxcbiAgICB9LFxuXG4gICAgLy8gZmlsdGVyIGludmVydFxuICAgIGludmVydDoge1xuICAgICAgZnVsbDogeyBmaWx0ZXI6ICdpbnZlcnQoMSknIH0sXG4gICAgICBub25lOiB7IGZpbHRlcjogJ2ludmVydCgwKScgfSxcbiAgICAgICcqJzogeyBmaWx0ZXI6ICdpbnZlcnQoKiknIH0sXG4gICAgfSxcblxuICAgIGdyYXlzY2FsZToge1xuICAgICAgZnVsbDogeyBmaWx0ZXI6ICdncmF5c2NhbGUoMSknIH0sXG4gICAgICBub25lOiB7IGZpbHRlcjogJ2dyYXlzY2FsZSgwKScgfSxcbiAgICAgICcqJzogeyBmaWx0ZXI6ICdncmF5c2NhbGUoKiknIH0sXG4gICAgfSxcblxuICAgIGNvbnRlbnQ6IHtcbiAgICAgICcqJzogeyBjb250ZW50OiAnXCIqXCInIH0sXG4gICAgfSxcblxuICAgIC8vIGVsZW1lbnQgYXR0cmlidXRlXG4gICAgYXR0cjoge1xuICAgICAgJyonOiB7IGNvbnRlbnQ6ICdhdHRyKCopJyB9LFxuICAgIH0sXG5cbiAgICAvLyBjb2x1bW4tY291bnRcbiAgICAnY29sLWNvdW50Jzoge1xuICAgICAgMTogeyAnY29sdW1uLWNvdW50JzogMSB9LFxuICAgICAgMjogeyAnY29sdW1uLWNvdW50JzogMiB9LFxuICAgICAgMzogeyAnY29sdW1uLWNvdW50JzogMyB9LFxuICAgICAgNDogeyAnY29sdW1uLWNvdW50JzogNCB9LFxuICAgICAgNTogeyAnY29sdW1uLWNvdW50JzogNSB9LFxuICAgICAgJyonOiB7ICdjb2x1bW4tY291bnQnOiAnKicgfSxcbiAgICB9LFxuXG4gICAgLy8gY29sdW1uLXJ1bGUtd2lkdGhcbiAgICAnY29sLWJ3Jzoge1xuICAgICAgX2NvbW1vbjogeyAnY29sdW1uLXJ1bGUtd2lkdGgnOiAnc29saWQnIH0sXG4gICAgICAwOiB7ICdjb2x1bW4tcnVsZS13aWR0aCc6ICcwJyB9LFxuICAgICAgJyonOiB7ICdjb2x1bW4tcnVsZS13aWR0aCc6ICcqJyB9LFxuICAgIH0sXG5cbiAgICAvLyBjb2x1bW4tc3BhblxuICAgICdjb2wtc3Bhbic6IHtcbiAgICAgIGFsbDogeyAnY29sdW1uLXNwYW4nOiAnYWxsJyB9LFxuICAgICAgbm9uZTogeyAnY29sdW1uLXNwYW4nOiAnbm9uZScgfSxcbiAgICB9LFxuXG4gICAgLy8gY3Vyc29yXG4gICAgY3Vyc29yOiB7XG4gICAgICBwb2ludGVyOiB7IGN1cnNvcjogJ3BvaW50ZXInIH0sXG4gICAgICBkZWZhdWx0OiB7IGN1cnNvcjogJ2RlZmF1bHQnIH0sXG4gICAgICAnKic6IHsgY3Vyc29yOiAnKicgfSxcbiAgICB9LFxuXG4gICAgLy8gYnJlYWstYWZ0ZXJcbiAgICAnYnJlYWstYmVmb3JlJzoge1xuICAgICAgeWVzOiB7ICdicmVhay1iZWZvcmUnOiAnY29sdW1uJyB9LFxuICAgICAgbm86IHsgJ2JyZWFrLWJlZm9yZSc6ICdhdm9pZCcgfSxcbiAgICB9LFxuXG4gICAgLy8gYnJlYWstYmVmb3JlXG4gICAgJ2JyZWFrLWFmdGVyJzoge1xuICAgICAgeWVzOiB7ICdicmVhay1hZnRlcic6ICdjb2x1bW4nIH0sXG4gICAgICBubzogeyAnYnJlYWstYWZ0ZXInOiAnYXZvaWQnIH0sXG4gICAgfSxcblxuICAgIC8vIGJyZWFrLWluc2lkZVxuICAgICdicmVhay1pbnNpZGUnOiB7XG4gICAgICB5ZXM6IHsgJ2JyZWFrLWluc2lkZSc6ICdjb2x1bW4nIH0sXG4gICAgICBubzogeyAnYnJlYWstaW5zaWRlJzogJ2F2b2lkJyB9LFxuICAgIH0sXG5cbiAgICAvLyBkaXNwbGF5XG4gICAgZDoge1xuICAgICAgbm9uZTogeyBkaXNwbGF5OiAnbm9uZScgfSxcbiAgICAgIGJsb2NrOiB7IGRpc3BsYXk6ICdibG9jaycgfSxcbiAgICAgIGlubGluZTogeyBkaXNwbGF5OiAnaW5saW5lJyB9LFxuICAgICAgaW5ibG9jazogeyBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyB9LFxuICAgICAgZmx4OiB7IGRpc3BsYXk6ICdmbGV4JyB9LFxuICAgICAgaW5mbHg6IHsgZGlzcGxheTogJ2lubGluZS1mbGV4JyB9LFxuICAgICAgdGFibGU6IHsgZGlzcGxheTogJ3RhYmxlJyB9LFxuICAgICAgdHJvdzogeyBkaXNwbGF5OiAndGFibGUtcm93JyB9LFxuICAgICAgdGNlbGw6IHsgZGlzcGxheTogJ3RhYmxlLWNlbGwnIH0sXG4gICAgICBsaXRlbTogeyBkaXNwbGF5OiAnbGlzdC1pdGVtJyB9LFxuICAgIH0sXG5cbiAgICAvLyBoZWFkaW5ncyBmcm9tIDEgdG8gNlxuICAgIGZoOiB7XG4gICAgICBfY29tbW9uOiB7ICdmb250LXdlaWdodCc6IGZvbnRXZWlnaHQuaGVhZGluZyB9LFxuICAgICAgMToge1xuICAgICAgICAnZm9udC1zaXplJzogZm9udFNpemUuaDEsXG4gICAgICAgICdtYXJnaW4tYm90dG9tJzogc3BhY2VyWzVdLFxuICAgICAgfSxcbiAgICAgIDI6IHtcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6IGZvbnRTaXplLmgyLFxuICAgICAgICAnbWFyZ2luLWJvdHRvbSc6IHNwYWNlcls0XSxcbiAgICAgIH0sXG4gICAgICAzOiB7XG4gICAgICAgICdmb250LXNpemUnOiBmb250U2l6ZS5oMyxcbiAgICAgICAgJ21hcmdpbi1ib3R0b20nOiBzcGFjZXJbM10sXG4gICAgICB9LFxuICAgICAgNDoge1xuICAgICAgICAnZm9udC1zaXplJzogZm9udFNpemUuaDQsXG4gICAgICAgICdtYXJnaW4tYm90dG9tJzogc3BhY2VyWzNdLFxuICAgICAgfSxcbiAgICAgIDU6IHtcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6IGZvbnRTaXplLmg1LFxuICAgICAgICAnbWFyZ2luLWJvdHRvbSc6IHNwYWNlclszXSxcbiAgICAgIH0sXG4gICAgICA2OiB7XG4gICAgICAgICdmb250LXNpemUnOiBmb250U2l6ZS5oNixcbiAgICAgICAgJ21hcmdpbi1ib3R0b20nOiBzcGFjZXJbMl0sXG4gICAgICB9LFxuICAgIH0sXG5cbiAgICAvLyBwcmFncmFwaCBmcm9tIDEgdG8gNlxuICAgIGZwOiB7XG4gICAgICAxOiB7XG4gICAgICAgICdmb250LXNpemUnOiBmb250U2l6ZS5wMSxcbiAgICAgICAgJ21hcmdpbi1ib3R0b20nOiBzcGFjZXJbMl0sXG4gICAgICB9LFxuICAgICAgMjoge1xuICAgICAgICAnZm9udC1zaXplJzogZm9udFNpemUucDIsXG4gICAgICAgICdtYXJnaW4tYm90dG9tJzogc3BhY2VyWzJdLFxuICAgICAgfSxcbiAgICAgIDM6IHtcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6IGZvbnRTaXplLnAzLFxuICAgICAgICAnbWFyZ2luLWJvdHRvbSc6IHNwYWNlclsyXSxcbiAgICAgIH0sXG4gICAgICA0OiB7XG4gICAgICAgICdmb250LXNpemUnOiBmb250U2l6ZS5wNCxcbiAgICAgICAgJ21hcmdpbi1ib3R0b20nOiBzcGFjZXJbMV0sXG4gICAgICB9LFxuICAgICAgNToge1xuICAgICAgICAnZm9udC1zaXplJzogZm9udFNpemUucDUsXG4gICAgICAgICdtYXJnaW4tYm90dG9tJzogc3BhY2VyWzFdLFxuICAgICAgfSxcbiAgICAgIDY6IHtcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6IGZvbnRTaXplLnA2LFxuICAgICAgICAnbWFyZ2luLWJvdHRvbSc6IHNwYWNlclsxXSxcbiAgICAgIH0sXG4gICAgfSxcblxuICAgIC8vIGZvbnQtc2l6ZVxuICAgIGZzOiB7XG4gICAgICBpbmhlcml0OiB7ICdmb250LXNpemUnOiAnaW5oZXJpdCcgfSxcbiAgICAgIGgxOiB7ICdmb250LXNpemUnOiBmb250U2l6ZS5oMSB9LFxuICAgICAgaDI6IHsgJ2ZvbnQtc2l6ZSc6IGZvbnRTaXplLmgyIH0sXG4gICAgICBoMzogeyAnZm9udC1zaXplJzogZm9udFNpemUuaDMgfSxcbiAgICAgIGg0OiB7ICdmb250LXNpemUnOiBmb250U2l6ZS5oNCB9LFxuICAgICAgaDU6IHsgJ2ZvbnQtc2l6ZSc6IGZvbnRTaXplLmg1IH0sXG4gICAgICBoNjogeyAnZm9udC1zaXplJzogZm9udFNpemUuaDYgfSxcbiAgICAgIHAxOiB7ICdmb250LXNpemUnOiBmb250U2l6ZS5wMSB9LFxuICAgICAgcDI6IHsgJ2ZvbnQtc2l6ZSc6IGZvbnRTaXplLnAyIH0sXG4gICAgICBwMzogeyAnZm9udC1zaXplJzogZm9udFNpemUucDMgfSxcbiAgICAgIHA0OiB7ICdmb250LXNpemUnOiBmb250U2l6ZS5wNCB9LFxuICAgICAgcDU6IHsgJ2ZvbnQtc2l6ZSc6IGZvbnRTaXplLnA1IH0sXG4gICAgICBwNjogeyAnZm9udC1zaXplJzogZm9udFNpemUucDYgfSxcbiAgICAgIGkxOiB7ICdmb250LXNpemUnOiBmb250U2l6ZS5pMSB9LFxuICAgICAgaTI6IHsgJ2ZvbnQtc2l6ZSc6IGZvbnRTaXplLmkyIH0sXG4gICAgICBpMzogeyAnZm9udC1zaXplJzogZm9udFNpemUuaTMgfSxcbiAgICAgIGk0OiB7ICdmb250LXNpemUnOiBmb250U2l6ZS5pNCB9LFxuICAgICAgaTU6IHsgJ2ZvbnQtc2l6ZSc6IGZvbnRTaXplLmk1IH0sXG4gICAgICBpNjogeyAnZm9udC1zaXplJzogZm9udFNpemUuaTYgfSxcbiAgICAgICcqJzogeyAnZm9udC1zaXplJzogJyonIH0sXG4gICAgfSxcblxuICAgIC8vIGZvbnQtd2VpZ2h0XG4gICAgZnc6IHtcbiAgICAgIGxpZ2h0OiB7ICdmb250LXdlaWdodCc6IGZvbnRXZWlnaHQubGlnaHQgfSxcbiAgICAgIHJlZ3VsYXI6IHsgJ2ZvbnQtd2VpZ2h0JzogZm9udFdlaWdodC5yZWd1bGFyIH0sXG4gICAgICBub3JtYWw6IHsgJ2ZvbnQtd2VpZ2h0JzogZm9udFdlaWdodC5yZWd1bGFyIH0sIC8vIGFsaWFzXG4gICAgICBtZWRpdW06IHsgJ2ZvbnQtd2VpZ2h0JzogZm9udFdlaWdodC5tZWRpdW0gfSxcbiAgICAgIHNlbWk6IHsgJ2ZvbnQtd2VpZ2h0JzogZm9udFdlaWdodC5zZW1pIH0sXG4gICAgICBib2xkOiB7ICdmb250LXdlaWdodCc6IGZvbnRXZWlnaHQuYm9sZCB9LFxuICAgICAgZXh0cmE6IHsgJ2ZvbnQtd2VpZ2h0JzogZm9udFdlaWdodC5leHRyYSB9LFxuICAgICAgaGVhZGluZzogeyAnZm9udC13ZWlnaHQnOiBmb250V2VpZ2h0LmhlYWRpbmcgfSxcbiAgICB9LFxuXG4gICAgLy8gZm9udC1zdHlsZVxuICAgIGZpOiB7XG4gICAgICB5ZXM6IHsgJ2ZvbnQtc3R5bGUnOiAnaXRhbGljJyB9LFxuICAgICAgbm86IHsgJ2ZvbnQtc3R5bGUnOiAnbm9ybWFsJyB9LFxuICAgIH0sXG5cbiAgICAvLyBmbGV4LWNvbHVtbiBhbGlnbi1zZWxmXG4gICAgJ2ZseC1jb2wtYWxpZ24tc2VsZic6IHtcbiAgICAgICd0b3AtbGVmdCc6IHsgJ2p1c3RpZnktc2VsZic6ICdmbGV4LXN0YXJ0JywgJ2FsaWduLXNlbGYnOiAnZmxleC1zdGFydCcgfSxcbiAgICAgICd0b3AtY2VudGVyJzogeyAnanVzdGlmeS1zZWxmJzogJ2ZsZXgtc3RhcnQnLCAnYWxpZ24tc2VsZic6ICdjZW50ZXInIH0sXG4gICAgICAndG9wLXJpZ2h0JzogeyAnanVzdGlmeS1zZWxmJzogJ2ZsZXgtc3RhcnQnLCAnYWxpZ24tc2VsZic6ICdmbGV4LWVuZCcgfSxcbiAgICAgICdjZW50ZXItbGVmdCc6IHsgJ2p1c3RpZnktc2VsZic6ICdjZW50ZXInLCAnYWxpZ24tc2VsZic6ICdmbGV4LXN0YXJ0JyB9LFxuICAgICAgJ2NlbnRlci1jZW50ZXInOiB7ICdqdXN0aWZ5LXNlbGYnOiAnY2VudGVyJywgJ2FsaWduLXNlbGYnOiAnY2VudGVyJyB9LFxuICAgICAgJ2NlbnRlci1yaWdodCc6IHsgJ2p1c3RpZnktc2VsZic6ICdjZW50ZXInLCAnYWxpZ24tc2VsZic6ICdmbGV4LWVuZCcgfSxcbiAgICAgICdib3R0b20tbGVmdCc6IHsgJ2p1c3RpZnktc2VsZic6ICdmbGV4LWVuZCcsICdhbGlnbi1zZWxmJzogJ2ZsZXgtc3RhcnQnIH0sXG4gICAgICAnYm90dG9tLWNlbnRlcic6IHsgJ2p1c3RpZnktc2VsZic6ICdmbGV4LWVuZCcsICdhbGlnbi1zZWxmJzogJ2NlbnRlcicgfSxcbiAgICAgICdib3R0b20tcmlnaHQnOiB7ICdqdXN0aWZ5LXNlbGYnOiAnZmxleC1lbmQnLCAnYWxpZ24tc2VsZic6ICdmbGV4LWVuZCcgfSxcbiAgICB9LFxuXG4gICAgLy8gZmxleC1jb2x1bS1hbGlnblxuICAgICdmbHgtY29sLWFsaWduJzoge1xuICAgICAgX2NvbW1vbjogeyBkaXNwbGF5OiAnZmxleCcsICdmbGV4LWRpcmVjdGlvbic6ICdjb2x1bW4nIH0sXG4gICAgICAndG9wLWxlZnQnOiB7XG4gICAgICAgICdqdXN0aWZ5LWNvbnRlbnQnOiAnZmxleC1zdGFydCcsXG4gICAgICAgICdhbGlnbi1pdGVtcyc6ICdmbGV4LXN0YXJ0JyxcbiAgICAgIH0sXG4gICAgICAndG9wLWNlbnRlcic6IHtcbiAgICAgICAgJ2p1c3RpZnktY29udGVudCc6ICdmbGV4LXN0YXJ0JyxcbiAgICAgICAgJ2FsaWduLWl0ZW1zJzogJ2NlbnRlcicsXG4gICAgICB9LFxuICAgICAgJ3RvcC1yaWdodCc6IHtcbiAgICAgICAgJ2p1c3RpZnktY29udGVudCc6ICdmbGV4LXN0YXJ0JyxcbiAgICAgICAgJ2FsaWduLWl0ZW1zJzogJ2ZsZXgtZW5kJyxcbiAgICAgIH0sXG4gICAgICAnY2VudGVyLWxlZnQnOiB7XG4gICAgICAgICdqdXN0aWZ5LWNvbnRlbnQnOiAnY2VudGVyJyxcbiAgICAgICAgJ2FsaWduLWl0ZW1zJzogJ2ZsZXgtc3RhcnQnLFxuICAgICAgfSxcbiAgICAgICdjZW50ZXItY2VudGVyJzogeyAnanVzdGlmeS1jb250ZW50JzogJ2NlbnRlcicsICdhbGlnbi1pdGVtcyc6ICdjZW50ZXInIH0sXG4gICAgICAnY2VudGVyLXJpZ2h0Jzoge1xuICAgICAgICAnanVzdGlmeS1jb250ZW50JzogJ2NlbnRlcicsXG4gICAgICAgICdhbGlnbi1pdGVtcyc6ICdmbGV4LWVuZCcsXG4gICAgICB9LFxuICAgICAgJ2JvdHRvbS1sZWZ0Jzoge1xuICAgICAgICAnanVzdGlmeS1jb250ZW50JzogJ2ZsZXgtZW5kJyxcbiAgICAgICAgJ2FsaWduLWl0ZW1zJzogJ2ZsZXgtc3RhcnQnLFxuICAgICAgfSxcbiAgICAgICdib3R0b20tY2VudGVyJzoge1xuICAgICAgICAnanVzdGlmeS1jb250ZW50JzogJ2ZsZXgtZW5kJyxcbiAgICAgICAgJ2FsaWduLWl0ZW1zJzogJ2NlbnRlcicsXG4gICAgICB9LFxuICAgICAgJ2JvdHRvbS1yaWdodCc6IHtcbiAgICAgICAgJ2p1c3RpZnktY29udGVudCc6ICdmbGV4LWVuZCcsXG4gICAgICAgICdhbGlnbi1pdGVtcyc6ICdmbGV4LWVuZCcsXG4gICAgICB9LFxuICAgICAgJ2JldHdlZW4tbGVmdCc6IHtcbiAgICAgICAgJ2p1c3RpZnktY29udGVudCc6ICdzcGFjZS1iZXR3ZWVuJyxcbiAgICAgICAgJ2FsaWduLWl0ZW1zJzogJ2ZsZXgtc3RhcnQnLFxuICAgICAgfSxcbiAgICAgICdiZXR3ZWVuLWNlbnRlcic6IHtcbiAgICAgICAgJ2p1c3RpZnktY29udGVudCc6ICdzcGFjZS1iZXR3ZWVuJyxcbiAgICAgICAgJ2FsaWduLWl0ZW1zJzogJ2NlbnRlcicsXG4gICAgICB9LFxuICAgICAgJ2JldHdlZW4tcmlnaHQnOiB7XG4gICAgICAgICdqdXN0aWZ5LWNvbnRlbnQnOiAnc3BhY2UtYmV0d2VlbicsXG4gICAgICAgICdhbGlnbi1pdGVtcyc6ICdmbGV4LWVuZCcsXG4gICAgICB9LFxuICAgIH0sXG5cbiAgICAvLyBmbGV4LXJvdyBhbGlnbi1zZWxmXG4gICAgJ2ZseC1yb3ctYWxpZ24tc2VsZic6IHtcbiAgICAgIG5vbmU6IHsgJ2FsaWduLXNlbGYnOiAnbm9ybWFsJywgJ2p1c3RpZnktc2VsZic6ICdub3JtYWwnIH0sXG4gICAgICAndG9wLWxlZnQnOiB7ICdhbGlnbi1zZWxmJzogJ2ZsZXgtc3RhcnQnLCAnanVzdGlmeS1zZWxmJzogJ2ZsZXgtc3RhcnQnIH0sXG4gICAgICAndG9wLWNlbnRlcic6IHsgJ2FsaWduLXNlbGYnOiAnZmxleC1zdGFydCcsICdqdXN0aWZ5LXNlbGYnOiAnY2VudGVyJyB9LFxuICAgICAgJ3RvcC1yaWdodCc6IHsgJ2FsaWduLXNlbGYnOiAnZmxleC1zdGFydCcsICdqdXN0aWZ5LXNlbGYnOiAnZmxleC1lbmQnIH0sXG4gICAgICAnY2VudGVyLWxlZnQnOiB7ICdhbGlnbi1zZWxmJzogJ2NlbnRlcicsICdqdXN0aWZ5LXNlbGYnOiAnZmxleC1zdGFydCcgfSxcbiAgICAgICdjZW50ZXItY2VudGVyJzogeyAnYWxpZ24tc2VsZic6ICdjZW50ZXInLCAnanVzdGlmeS1zZWxmJzogJ2NlbnRlcicgfSxcbiAgICAgICdjZW50ZXItcmlnaHQnOiB7ICdhbGlnbi1zZWxmJzogJ2NlbnRlcicsICdqdXN0aWZ5LXNlbGYnOiAnZmxleC1lbmQnIH0sXG4gICAgICAnYm90dG9tLWxlZnQnOiB7ICdhbGlnbi1zZWxmJzogJ2ZsZXgtZW5kJywgJ2p1c3RpZnktc2VsZic6ICdmbGV4LXN0YXJ0JyB9LFxuICAgICAgJ2JvdHRvbS1jZW50ZXInOiB7ICdhbGlnbi1zZWxmJzogJ2ZsZXgtZW5kJywgJ2p1c3RpZnktc2VsZic6ICdjZW50ZXInIH0sXG4gICAgICAnYm90dG9tLXJpZ2h0JzogeyAnYWxpZ24tc2VsZic6ICdmbGV4LWVuZCcsICdqdXN0aWZ5LXNlbGYnOiAnZmxleC1lbmQnIH0sXG4gICAgfSxcblxuICAgIC8vIGZsZXgtcm93LWFsaWduXG4gICAgJ2ZseC1yb3ctYWxpZ24nOiB7XG4gICAgICBfY29tbW9uOiB7IGRpc3BsYXk6ICdmbGV4JywgJ2ZsZXgtZGlyZWN0aW9uJzogJ3JvdycgfSxcbiAgICAgICd0b3AtbGVmdCc6IHtcbiAgICAgICAgJ2FsaWduLWl0ZW1zJzogJ2ZsZXgtc3RhcnQnLFxuICAgICAgICAnanVzdGlmeS1jb250ZW50JzogJ2ZsZXgtc3RhcnQnLFxuICAgICAgfSxcbiAgICAgICd0b3AtY2VudGVyJzoge1xuICAgICAgICAnYWxpZ24taXRlbXMnOiAnZmxleC1zdGFydCcsXG4gICAgICAgICdqdXN0aWZ5LWNvbnRlbnQnOiAnY2VudGVyJyxcbiAgICAgIH0sXG4gICAgICAndG9wLXJpZ2h0Jzoge1xuICAgICAgICAnYWxpZ24taXRlbXMnOiAnZmxleC1zdGFydCcsXG4gICAgICAgICdqdXN0aWZ5LWNvbnRlbnQnOiAnZmxleC1lbmQnLFxuICAgICAgfSxcbiAgICAgICd0b3AtYmV0d2Vlbic6IHtcbiAgICAgICAgJ2FsaWduLWl0ZW1zJzogJ2ZsZXgtc3RhcnQnLFxuICAgICAgICAnanVzdGlmeS1jb250ZW50JzogJ3NwYWNlLWJldHdlZW4nLFxuICAgICAgfSxcbiAgICAgICdjZW50ZXItbGVmdCc6IHtcbiAgICAgICAgJ2FsaWduLWl0ZW1zJzogJ2NlbnRlcicsXG4gICAgICAgICdqdXN0aWZ5LWNvbnRlbnQnOiAnZmxleC1zdGFydCcsXG4gICAgICB9LFxuICAgICAgJ2NlbnRlci1jZW50ZXInOiB7ICdhbGlnbi1pdGVtcyc6ICdjZW50ZXInLCAnanVzdGlmeS1jb250ZW50JzogJ2NlbnRlcicgfSxcbiAgICAgICdjZW50ZXItcmlnaHQnOiB7XG4gICAgICAgICdhbGlnbi1pdGVtcyc6ICdjZW50ZXInLFxuICAgICAgICAnanVzdGlmeS1jb250ZW50JzogJ2ZsZXgtZW5kJyxcbiAgICAgIH0sXG4gICAgICAnY2VudGVyLWJldHdlZW4nOiB7XG4gICAgICAgICdhbGlnbi1pdGVtcyc6ICdjZW50ZXInLFxuICAgICAgICAnanVzdGlmeS1jb250ZW50JzogJ3NwYWNlLWJldHdlZW4nLFxuICAgICAgfSxcbiAgICAgICdib3R0b20tbGVmdCc6IHtcbiAgICAgICAgJ2FsaWduLWl0ZW1zJzogJ2ZsZXgtZW5kJyxcbiAgICAgICAgJ2p1c3RpZnktY29udGVudCc6ICdmbGV4LXN0YXJ0JyxcbiAgICAgIH0sXG4gICAgICAnYm90dG9tLWNlbnRlcic6IHtcbiAgICAgICAgJ2FsaWduLWl0ZW1zJzogJ2ZsZXgtZW5kJyxcbiAgICAgICAgJ2p1c3RpZnktY29udGVudCc6ICdjZW50ZXInLFxuICAgICAgfSxcbiAgICAgICdib3R0b20tcmlnaHQnOiB7XG4gICAgICAgICdhbGlnbi1pdGVtcyc6ICdmbGV4LWVuZCcsXG4gICAgICAgICdqdXN0aWZ5LWNvbnRlbnQnOiAnZmxleC1lbmQnLFxuICAgICAgfSxcbiAgICAgICdib3R0b20tYmV0d2Vlbic6IHtcbiAgICAgICAgJ2FsaWduLWl0ZW1zJzogJ2ZseC1lbmQnLFxuICAgICAgICAnanVzdGlmeS1jb250ZW50JzogJ3NwYWNlLWJldHdlZW4nLFxuICAgICAgfSxcbiAgICAgICdzdHJldGNoLWxlZnQnOiB7XG4gICAgICAgICdhbGlnbi1pdGVtcyc6ICdzdHJldGNoJyxcbiAgICAgICAgJ2p1c3RpZnktY29udGVudCc6ICdmbGV4LXN0YXJ0JyxcbiAgICAgIH0sXG4gICAgICAnc3RyZXRjaC1jZW50ZXInOiB7XG4gICAgICAgICdhbGlnbi1pdGVtcyc6ICdzdHJldGNoJyxcbiAgICAgICAgJ2p1c3RpZnktY29udGVudCc6ICdjZW50ZXInLFxuICAgICAgfSxcbiAgICAgICdzdHJldGNoLXJpZ2h0Jzoge1xuICAgICAgICAnYWxpZ24taXRlbXMnOiAnc3RyZXRjaCcsXG4gICAgICAgICdqdXN0aWZ5LWNvbnRlbnQnOiAnZmxleC1lbmQnLFxuICAgICAgfSxcbiAgICAgICdzdHJldGNoLWJldHdlZW4nOiB7XG4gICAgICAgICdhbGlnbi1pdGVtcyc6ICdzdHJldGNoJyxcbiAgICAgICAgJ2p1c3RpZnktY29udGVudCc6ICdzcGFjZS1iZXR3ZWVuJyxcbiAgICAgIH0sXG4gICAgfSxcblxuICAgIC8vIGZsZXgtZGlyZWN0aW9uXG4gICAgJ2ZseC1kaXInOiB7XG4gICAgICBjb2w6IHsgJ2ZsZXgtZGlyZWN0aW9uJzogJ2NvbHVtbicgfSxcbiAgICAgIHJvdzogeyAnZmxleC1kaXJlY3Rpb24nOiAncm93JyB9LFxuICAgICAgY29scmV2OiB7ICdmbGV4LWRpcmVjdGlvbic6ICdjb2x1bW4tcmV2ZXJzZScgfSxcbiAgICAgIHJvd3JldjogeyAnZmxleC1kaXJlY3Rpb24nOiAncm93LXJldmVyc2UnIH0sXG4gICAgfSxcblxuICAgIC8vIGp1c3RpZnktY29udGVudFxuICAgICdmbHgtanVzdGlmeS1jb250ZW50Jzoge1xuICAgICAgY2VudGVyOiB7ICdqdXN0aWZ5LWNvbnRlbnQnOiAnY2VudGVyJyB9LFxuICAgICAgc3RhcnQ6IHsgJ2p1c3RpZnktY29udGVudCc6ICdmbGV4LXN0YXJ0JyB9LFxuICAgICAgZW5kOiB7ICdqdXN0aWZ5LWNvbnRlbnQnOiAnZmxleC1lbmQnIH0sXG4gICAgICBiZXR3ZWVuOiB7ICdqdXN0aWZ5LWNvbnRlbnQnOiAnc3BhY2UtYmV0d2VlbicgfSxcbiAgICAgIGFyb3VuZDogeyAnanVzdGlmeS1jb250ZW50JzogJ3NwYWNlLWFyb3VuZCcgfSxcbiAgICB9LFxuXG4gICAgLy8gYWxpZ24taXRlbXNcbiAgICAnZmx4LWFsaWduLWl0ZW1zJzoge1xuICAgICAgY2VudGVyOiB7ICdhbGlnbi1pdGVtcyc6ICdjZW50ZXInIH0sXG4gICAgICBzdGFydDogeyAnYWxpZ24taXRlbXMnOiAnZmxleC1zdGFydCcgfSxcbiAgICAgIGVuZDogeyAnYWxpZ24taXRlbXMnOiAnZmxleC1lbmQnIH0sXG4gICAgfSxcblxuICAgIC8vIG9iamVjdC1maXRcbiAgICBvZml0OiB7XG4gICAgICBub25lOiB7ICdvYmplY3QtZml0JzogJ25vbmUnIH0sXG4gICAgICBjb250YWluOiB7ICdvYmplY3QtZml0JzogJ2NvbnRhaW4nIH0sXG4gICAgICBjb3ZlcjogeyAnb2JqZWN0LWZpdCc6ICdjb3ZlcicgfSxcbiAgICAgIGZpbGw6IHsgJ29iamVjdC1maXQnOiAnZmlsbCcgfSxcbiAgICAgIHNjYWxlZG93bjogeyAnb2JqZWN0LWZpdCc6ICdzY2FsZS1kb3duJyB9LFxuICAgIH0sXG5cbiAgICAvLyBvYmplY3QtcG9zaXRpb25cbiAgICBvcG9zOiB7XG4gICAgICBub25lOiB7ICdvYmplY3QtcG9zaXRpb24nOiAndW5zZXQnIH0sXG4gICAgICBjZW50ZXI6IHsgJ29iamVjdC1wb3NpdGlvbic6ICdjZW50ZXInIH0sXG4gICAgICAnKic6IHsgJ29iamVjdC1wb3NpdGlvbic6ICcqJyB9LFxuICAgIH0sXG5cbiAgICAvLyBvcmRlclxuICAgICdmbHgtb3JkZXInOiB7XG4gICAgICBuMTogeyBvcmRlcjogLTEgfSxcbiAgICAgIDA6IHsgb3JkZXI6IDAgfSxcbiAgICAgIDE6IHsgb3JkZXI6IDEgfSxcbiAgICAgIDI6IHsgb3JkZXI6IDIgfSxcbiAgICAgIDM6IHsgb3JkZXI6IDMgfSxcbiAgICAgIDQ6IHsgb3JkZXI6IDQgfSxcbiAgICAgIDU6IHsgb3JkZXI6IDUgfSxcbiAgICAgIDY6IHsgb3JkZXI6IDYgfSxcbiAgICAgIDc6IHsgb3JkZXI6IDcgfSxcbiAgICAgIDg6IHsgb3JkZXI6IDggfSxcbiAgICAgIDk6IHsgb3JkZXI6IDkgfSxcbiAgICAgIDEwOiB7IG9yZGVyOiAxMCB9LFxuICAgICAgMTE6IHsgb3JkZXI6IDExIH0sXG4gICAgICAxMjogeyBvcmRlcjogMTIgfSxcbiAgICAgICcqJzogeyBvcmRlcjogJyonIH0sXG4gICAgfSxcblxuICAgIC8vIGZsZXgtd3JhcFxuICAgICdmbHgtd3JhcCc6IHtcbiAgICAgIHllczogeyAnZmxleC13cmFwJzogJ3dyYXAnIH0sXG4gICAgICBubzogeyAnZmxleC13cmFwJzogJ25vd3JhcCcgfSxcbiAgICAgIHJldjogeyAnZmxleC13cmFwJzogJ3dyYXAtcmV2ZXJzZScgfSxcbiAgICB9LFxuXG4gICAgLy8gZmxleFxuICAgIGZseDoge1xuICAgICAgZmlsbDogeyBmbGV4OiAnMSAxIGF1dG8nIH0sXG4gICAgICAnKic6IHsgZmxleDogJyonIH0sXG4gICAgfSxcblxuICAgIC8vIGZsZXgtZ3Jvd1xuICAgICdmbHgtZ3Jvdyc6IHtcbiAgICAgIDA6IHsgJ2ZsZXgtZ3Jvdyc6ICcwJyB9LFxuICAgICAgMTogeyAnZmxleC1ncm93JzogJzEnIH0sXG4gICAgfSxcblxuICAgIC8vIGZsZXgtc2hyaW5rXG4gICAgJ2ZseC1zaHJpbmsnOiB7XG4gICAgICAwOiB7ICdmbGV4LXNocmluayc6ICcwJyB9LFxuICAgICAgMTogeyAnZmxleC1zaHJpbmsnOiAnMScgfSxcbiAgICB9LFxuXG4gICAgLy8gZmxleC1iYXNpc1xuICAgICdmbHgtYmFzaXMnOiB7XG4gICAgICBhdXRvOiB7ICdmbGV4LWJhc2lzJzogJ2F1dG8nIH0sXG4gICAgfSxcblxuICAgIC8vIGZsb2F0XG4gICAgZmxvYXQ6IHtcbiAgICAgIGxlZnQ6IHsgZmxvYXQ6ICdsZWZ0JyB9LFxuICAgICAgcmlnaHQ6IHsgZmxvYXQ6ICdyaWdodCcgfSxcbiAgICAgIG5vbmU6IHsgZmxvYXQ6ICdub25lJyB9LFxuICAgIH0sXG5cbiAgICAnZ3JpZC1yb3dzJzoge1xuICAgICAgX2NvbW1vbjogeyBkaXNwbGF5OiAnZ3JpZCcgfSxcbiAgICAgICcqJzogeyAnZ3JpZC10ZW1wbGF0ZS1yb3dzJzogJyonIH0sXG4gICAgfSxcblxuICAgICdncmlkLWNvbHVtbnMnOiB7XG4gICAgICBfY29tbW9uOiB7IGRpc3BsYXk6ICdncmlkJywgJ2NvbHVtbi1nYXAnOiBzcGFjZXJbJ2d1dHRlci1oYWxmJ10gfSxcbiAgICAgICcqJzogeyAnZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zJzogJyonIH0sXG4gICAgfSxcblxuICAgICdncmlkLWFyZWEnOiB7XG4gICAgICAnKic6IHsgJ2dyaWQtYXJlYSc6ICcqJyB9LFxuICAgIH0sXG5cbiAgICAnZ3JpZC1yb3ctc3RhcnQnOiB7XG4gICAgICAnKic6IHsgJ2dyaWQtcm93LXN0YXJ0JzogJyonIH0sXG4gICAgfSxcblxuICAgICdncmlkLXJvdy1lbmQnOiB7XG4gICAgICAnKic6IHsgJ2dyaWQtcm93LWVuZCc6ICcqJyB9LFxuICAgIH0sXG5cbiAgICAnZ3JpZC1jb2wtc3RhcnQnOiB7XG4gICAgICAnKic6IHsgJ2dyaWQtY29sdW1uLXN0YXJ0JzogJyonIH0sXG4gICAgfSxcblxuICAgICdncmlkLWNvbC1lbmQnOiB7XG4gICAgICAnKic6IHsgJ2dyaWQtY29sdW1uLWVuZCc6ICcqJyB9LFxuICAgIH0sXG5cbiAgICAvLyBncmlkIGNvbHVtbiBhbGlnbi1zZWxmXG4gICAgJ2dyaWQtY29sLWFsaWduLXNlbGYnOiB7XG4gICAgICAndG9wLWxlZnQnOiB7ICdhbGlnbi1zZWxmJzogJ3N0YXJ0JywgJ2p1c3RpZnktc2VsZic6ICdzdGFydCcgfSxcbiAgICAgICd0b3AtY2VudGVyJzogeyAnYWxpZ24tc2VsZic6ICdzdGFydCcsICdqdXN0aWZ5LXNlbGYnOiAnY2VudGVyJyB9LFxuICAgICAgJ3RvcC1yaWdodCc6IHsgJ2FsaWduLXNlbGYnOiAnc3RhcnQnLCAnanVzdGlmeS1zZWxmJzogJ2VuZCcgfSxcbiAgICAgICdjZW50ZXItbGVmdCc6IHsgJ2FsaWduLXNlbGYnOiAnY2VudGVyJywgJ2p1c3RpZnktc2VsZic6ICdzdGFydCcgfSxcbiAgICAgICdjZW50ZXItY2VudGVyJzogeyAnYWxpZ24tc2VsZic6ICdjZW50ZXInLCAnanVzdGlmeS1zZWxmJzogJ2NlbnRlcicgfSxcbiAgICAgICdjZW50ZXItcmlnaHQnOiB7ICdhbGlnbi1zZWxmJzogJ2NlbnRlcicsICdqdXN0aWZ5LXNlbGYnOiAnZW5kJyB9LFxuICAgICAgJ2JvdHRvbS1sZWZ0JzogeyAnYWxpZ24tc2VsZic6ICdlbmQnLCAnanVzdGlmeS1zZWxmJzogJ3N0YXJ0JyB9LFxuICAgICAgJ2JvdHRvbS1jZW50ZXInOiB7ICdhbGlnbi1zZWxmJzogJ2VuZCcsICdqdXN0aWZ5LXNlbGYnOiAnY2VudGVyJyB9LFxuICAgICAgJ2JvdHRvbS1yaWdodCc6IHsgJ2FsaWduLXNlbGYnOiAnZW5kJywgJ2p1c3RpZnktc2VsZic6ICdlbmQnIH0sXG4gICAgfSxcblxuICAgIC8vIGdyaWQtY29sdW0tYWxpZ25cbiAgICAnZ3JpZC1jb2wtYWxpZ24nOiB7XG4gICAgICAndG9wLWxlZnQnOiB7XG4gICAgICAgICdhbGlnbi1pdGVtcyc6ICdzdGFydCcsXG4gICAgICAgICdqdXN0aWZ5LWl0ZW1zJzogJ3N0YXJ0JyxcbiAgICAgIH0sXG4gICAgICAndG9wLWNlbnRlcic6IHtcbiAgICAgICAgJ2FsaWduLWl0ZW1zJzogJ3N0YXJ0JyxcbiAgICAgICAgJ2p1c3RpZnktaXRlbXMnOiAnY2VudGVyJyxcbiAgICAgIH0sXG4gICAgICAndG9wLXJpZ2h0Jzoge1xuICAgICAgICAnYWxpZ24taXRlbXMnOiAnc3RhcnQnLFxuICAgICAgICAnanVzdGlmeS1pdGVtcyc6ICdlbmQnLFxuICAgICAgfSxcbiAgICAgICdjZW50ZXItbGVmdCc6IHtcbiAgICAgICAgJ2FsaWduLWl0ZW1zJzogJ2NlbnRlcicsXG4gICAgICAgICdqdXN0aWZ5LWl0ZW1zJzogJ3N0YXJ0JyxcbiAgICAgIH0sXG4gICAgICAnY2VudGVyLWNlbnRlcic6IHsgJ2p1c3RpZnktaXRlbXMnOiAnY2VudGVyJywgJ2FsaWduLWl0ZW1zJzogJ2NlbnRlcicgfSxcbiAgICAgICdjZW50ZXItcmlnaHQnOiB7XG4gICAgICAgICdhbGlnbi1pdGVtcyc6ICdjZW50ZXInLFxuICAgICAgICAnanVzdGlmeS1pdGVtcyc6ICdlbmQnLFxuICAgICAgfSxcbiAgICAgICdib3R0b20tbGVmdCc6IHtcbiAgICAgICAgJ2FsaWduLWl0ZW1zJzogJ2VuZCcsXG4gICAgICAgICdqdXN0aWZ5LWl0ZW1zJzogJ3N0YXJ0JyxcbiAgICAgIH0sXG4gICAgICAnYm90dG9tLWNlbnRlcic6IHtcbiAgICAgICAgJ2FsaWduLWl0ZW1zJzogJ2VuZCcsXG4gICAgICAgICdqdXN0aWZ5LWl0ZW1zJzogJ2NlbnRlcicsXG4gICAgICB9LFxuICAgICAgJ2JvdHRvbS1yaWdodCc6IHtcbiAgICAgICAgJ2FsaWduLWl0ZW1zJzogJ2VuZCcsXG4gICAgICAgICdqdXN0aWZ5LWl0ZW1zJzogJ2VuZCcsXG4gICAgICB9LFxuICAgICAgJ2JldHdlZW4tbGVmdCc6IHtcbiAgICAgICAgJ2FsaWduLWl0ZW1zJzogJ3NwYWNlLWJldHdlZW4nLFxuICAgICAgICAnanVzdGlmeS1pdGVtcyc6ICdzdGFydCcsXG4gICAgICB9LFxuICAgICAgJ2JldHdlZW4tY2VudGVyJzoge1xuICAgICAgICAnYWxpZ24taXRlbXMnOiAnc3BhY2UtYmV0d2VlbicsXG4gICAgICAgICdqdXN0aWZ5LWl0ZW1zJzogJ2NlbnRlcicsXG4gICAgICB9LFxuICAgICAgJ2JldHdlZW4tcmlnaHQnOiB7XG4gICAgICAgICdhbGlnbi1pdGVtcyc6ICdzcGFjZS1iZXR3ZWVuJyxcbiAgICAgICAgJ2p1c3RpZnktaXRlbXMnOiAnZW5kJyxcbiAgICAgIH0sXG4gICAgfSxcblxuICAgIC8vIGxpc3Qtc3R5bGVcbiAgICAnbGlzdC1zdHlsZSc6IHtcbiAgICAgIG5vbmU6IHsgJ2xpc3Qtc3R5bGUnOiAnbm9uZScsIG1hcmdpbjogMCwgcGFkZGluZzogMCB9LFxuICAgICAgJyonOiB7ICdsaXN0LXN0eWxlJzogJyonIH0sXG4gICAgfSxcblxuICAgIC8vIGxpc3Qtc3R5bGUtcG9zaXRpb21cbiAgICAnbGlzdC1zdHlsZS1wb3NpdGlvbic6IHtcbiAgICAgIGluc2lkZTogeyAnbGlzdC1zdHlsZS1wb3NpdGlvbic6ICdpbnNpZGUnIH0sXG4gICAgICBvdXRzaWRlOiB7ICdsaXN0LXN0eWxlLXBvc2l0aW9uJzogJ291dHNpZGUnIH0sXG4gICAgICAnKic6IHsgJ2xpc3Qtc3R5bGUtcG9zaXRpb24nOiAnKicgfSxcbiAgICB9LFxuXG4gICAgLy8gbGluZWFyLWdyYWRpZW50XG4gICAgJ2xpbmVhci1ncmFkaWVudCc6IHtcbiAgICAgICcqJzogeyBiYWNrZ3JvdW5kOiAnbGluZWFyLWdyYWRpZW50KCopJyB9LFxuICAgIH0sXG5cbiAgICAvLyBsaW5lLWhlaWdodFxuICAgIGxoOiB7XG4gICAgICAwOiB7ICdsaW5lLWhlaWdodCc6IDAgfSxcbiAgICAgIDE6IHsgJ2xpbmUtaGVpZ2h0JzogMSB9LFxuICAgICAgMS4xMjU6IHsgJ2xpbmUtaGVpZ2h0JzogMS4xMjUgfSxcbiAgICAgIDEuMjU6IHsgJ2xpbmUtaGVpZ2h0JzogMS4yNSB9LFxuICAgICAgMS4zNzU6IHsgJ2xpbmUtaGVpZ2h0JzogMS4zNzUgfSxcbiAgICAgIDEuNTogeyAnbGluZS1oZWlnaHQnOiAxLjUgfSxcbiAgICAgIDEuNjI1OiB7ICdsaW5lLWhlaWdodCc6IDEuNjI1IH0sXG4gICAgICAxLjc1OiB7ICdsaW5lLWhlaWdodCc6IDEuNzUgfSxcbiAgICAgIDEuODc1OiB7ICdsaW5lLWhlaWdodCc6IDEuODc1IH0sXG4gICAgICAyOiB7ICdsaW5lLWhlaWdodCc6IDIgfSxcbiAgICAgIDIuMjU6IHsgJ2xpbmUtaGVpZ2h0JzogMi4yNSB9LFxuICAgICAgMi41OiB7ICdsaW5lLWhlaWdodCc6IDIuNSB9LFxuICAgICAgMi43NTogeyAnbGluZS1oZWlnaHQnOiAyLjc1IH0sXG4gICAgICAzOiB7ICdsaW5lLWhlaWdodCc6IDMgfSxcbiAgICAgIDMuNTogeyAnbGluZS1oZWlnaHQnOiAzLjUgfSxcbiAgICAgIDQ6IHsgJ2xpbmUtaGVpZ2h0JzogNCB9LFxuICAgICAgNTogeyAnbGluZS1oZWlnaHQnOiA1IH0sXG4gICAgICAnKic6IHsgJ2xpbmUtaGVpZ2h0JzogJyonIH0sXG4gICAgfSxcblxuICAgIGxzOiB7XG4gICAgICAnbi4yJzogeyAnbGV0dGVyLXNwYWNpbmcnOiAnLS4ycmVtJyB9LFxuICAgICAgJ24uMTgnOiB7ICdsZXR0ZXItc3BhY2luZyc6ICctLjE4cmVtJyB9LFxuICAgICAgJ24uMTYnOiB7ICdsZXR0ZXItc3BhY2luZyc6ICctLjE2cmVtJyB9LFxuICAgICAgJ24uMTQnOiB7ICdsZXR0ZXItc3BhY2luZyc6ICctLjE0cmVtJyB9LFxuICAgICAgJ24uMTInOiB7ICdsZXR0ZXItc3BhY2luZyc6ICctLjEycmVtJyB9LFxuICAgICAgJ24uMSc6IHsgJ2xldHRlci1zcGFjaW5nJzogJy0uMXJlbScgfSxcbiAgICAgICduLjA4JzogeyAnbGV0dGVyLXNwYWNpbmcnOiAnLS4wOHJlbScgfSxcbiAgICAgICduLjA2JzogeyAnbGV0dGVyLXNwYWNpbmcnOiAnLS4wNnJlbScgfSxcbiAgICAgICduLjA0JzogeyAnbGV0dGVyLXNwYWNpbmcnOiAnLS4wNHJlbScgfSxcbiAgICAgICduLjAyJzogeyAnbGV0dGVyLXNwYWNpbmcnOiAnLS4wMnJlbScgfSxcbiAgICAgIDA6IHsgJ2xldHRlci1zcGFjaW5nJzogMCB9LFxuICAgICAgJy4wMic6IHsgJ2xldHRlci1zcGFjaW5nJzogJy4wMnJlbScgfSxcbiAgICAgICcuMDQnOiB7ICdsZXR0ZXItc3BhY2luZyc6ICcuMDRyZW0nIH0sXG4gICAgICAnLjA2JzogeyAnbGV0dGVyLXNwYWNpbmcnOiAnLjA2cmVtJyB9LFxuICAgICAgJy4wOCc6IHsgJ2xldHRlci1zcGFjaW5nJzogJy4wOHJlbScgfSxcbiAgICAgICcuMSc6IHsgJ2xldHRlci1zcGFjaW5nJzogJy4xcmVtJyB9LFxuICAgICAgJy4xMic6IHsgJ2xldHRlci1zcGFjaW5nJzogJy4xMnJlbScgfSxcbiAgICAgICcuMTQnOiB7ICdsZXR0ZXItc3BhY2luZyc6ICcuMTRyZW0nIH0sXG4gICAgICAnLjE2JzogeyAnbGV0dGVyLXNwYWNpbmcnOiAnLjE2cmVtJyB9LFxuICAgICAgJy4xOCc6IHsgJ2xldHRlci1zcGFjaW5nJzogJy4xOHJlbScgfSxcbiAgICAgICcuMic6IHsgJ2xldHRlci1zcGFjaW5nJzogJy4ycmVtJyB9LFxuICAgICAgJy40JzogeyAnbGV0dGVyLXNwYWNpbmcnOiAnLjRyZW0nIH0sXG4gICAgICAnLjYnOiB7ICdsZXR0ZXItc3BhY2luZyc6ICcuNnJlbScgfSxcbiAgICAgICcuOCc6IHsgJ2xldHRlci1zcGFjaW5nJzogJy44cmVtJyB9LFxuICAgICAgMTogeyAnbGV0dGVyLXNwYWNpbmcnOiAnMXJlbScgfSxcbiAgICAgIDI6IHsgJ2xldHRlci1zcGFjaW5nJzogJzJyZW0nIH0sXG4gICAgICAnKic6IHsgJ2xldHRlci1zcGFjaW5nJzogJyonIH0sXG4gICAgfSxcblxuICAgIC8vIG9wYWNpdHlcbiAgICBvcGFjaXR5OiB7XG4gICAgICAwOiB7IG9wYWNpdHk6IDAgfSxcbiAgICAgIDEwOiB7IG9wYWNpdHk6IDAuMSB9LFxuICAgICAgMjA6IHsgb3BhY2l0eTogMC4yIH0sXG4gICAgICAzMDogeyBvcGFjaXR5OiAwLjMgfSxcbiAgICAgIDQwOiB7IG9wYWNpdHk6IDAuNCB9LFxuICAgICAgNTA6IHsgb3BhY2l0eTogMC41IH0sXG4gICAgICA2MDogeyBvcGFjaXR5OiAwLjYgfSxcbiAgICAgIDcwOiB7IG9wYWNpdHk6IDAuNyB9LFxuICAgICAgODA6IHsgb3BhY2l0eTogMC44IH0sXG4gICAgICA5MDogeyBvcGFjaXR5OiAwLjkgfSxcbiAgICAgIDEwMDogeyBvcGFjaXR5OiAxIH0sXG4gICAgICAnKic6IHsgb3BhY2l0eTogJyonIH0sXG4gICAgfSxcblxuICAgIC8vIG91dGxpbmVcbiAgICBvdXRsaW5lOiB7XG4gICAgICBub25lOiB7IG91dGxpbmU6ICdub25lJyB9LFxuICAgICAgJyonOiB7IG91dGxpbmU6ICcqJyB9LFxuICAgIH0sXG5cbiAgICAvLyBvdXRsaW5lLXdpZHRoXG4gICAgb3c6IHtcbiAgICAgIF9jb21tb246IHsgJ291dGxpbmUtc3R5bGUnOiAnc29saWQnIH0sXG4gICAgICAwOiB7ICdvdXRsaW5lLXdpZHRoJzogJzAnIH0sXG4gICAgICAnKic6IHsgJ291dGxpbmUtd2lkdGgnOiAnKicgfSxcbiAgICB9LFxuXG4gICAgLy8gb3V0bGluZS1vZmZzZXRcbiAgICBvbzoge1xuICAgICAgMDogeyAnb3V0bGluZS1vZmZzZXQnOiAnMCcgfSxcbiAgICAgICcqJzogeyAnb3V0bGluZS1vZmZzZXQnOiAnKicgfSxcbiAgICB9LFxuXG4gICAgLy8gcG9zaXRpb24gYWxpZ25cbiAgICAncG9zLWFsaWduJzoge1xuICAgICAgX2NvbW1vbjoge1xuICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgIH0sXG4gICAgICBub25lOiB7XG4gICAgICAgIHBvc2l0aW9uOiAnc3RhdGljJyxcbiAgICAgICAgYm90dG9tOiAwLFxuICAgICAgICBsZWZ0OiAwLFxuICAgICAgICByaWdodDogMCxcbiAgICAgICAgdG9wOiAwLFxuICAgICAgICB0cmFuc2Zvcm06ICdub25lJyxcbiAgICAgIH0sXG4gICAgICAndG9wLWxlZnQnOiB7XG4gICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICBsZWZ0OiAwLFxuICAgICAgICByaWdodDogJ2F1dG8nLFxuICAgICAgICB0b3A6IDAsXG4gICAgICAgIHRyYW5zZm9ybTogJ25vbmUnLFxuICAgICAgfSxcbiAgICAgICd0b3AtY2VudGVyJzoge1xuICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgbGVmdDogJzUwJScsXG4gICAgICAgIHJpZ2h0OiAnYXV0bycsXG4gICAgICAgIHRvcDogMCxcbiAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgtNTAlKScsXG4gICAgICB9LFxuICAgICAgJ3RvcC1yaWdodCc6IHtcbiAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgIGxlZnQ6ICdhdXRvJyxcbiAgICAgICAgcmlnaHQ6IDAsXG4gICAgICAgIHRvcDogMCxcbiAgICAgICAgdHJhbnNmb3JtOiAnbm9uZScsXG4gICAgICB9LFxuICAgICAgJ2NlbnRlci1sZWZ0Jzoge1xuICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgbGVmdDogMCxcbiAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbiAgICAgICAgdG9wOiAnNTAlJyxcbiAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgtNTAlKScsXG4gICAgICB9LFxuICAgICAgJ2NlbnRlci1jZW50ZXInOiB7XG4gICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICBsZWZ0OiAnNTAlJyxcbiAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbiAgICAgICAgdG9wOiAnNTAlJyxcbiAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlKC01MCUsIC01MCUpJyxcbiAgICAgIH0sXG4gICAgICAnY2VudGVyLXJpZ2h0Jzoge1xuICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgbGVmdDogJ2F1dG8nLFxuICAgICAgICByaWdodDogMCxcbiAgICAgICAgdG9wOiAnNTAlJyxcbiAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgtNTAlKScsXG4gICAgICB9LFxuICAgICAgJ2JvdHRvbS1sZWZ0Jzoge1xuICAgICAgICBib3R0b206IDAsXG4gICAgICAgIGxlZnQ6IDAsXG4gICAgICAgIHJpZ2h0OiAnYXV0bycsXG4gICAgICAgIHRvcDogJ2F1dG8nLFxuICAgICAgICB0cmFuc2Zvcm06ICdub25lJyxcbiAgICAgIH0sXG4gICAgICAnYm90dG9tLWNlbnRlcic6IHtcbiAgICAgICAgYm90dG9tOiAwLFxuICAgICAgICBsZWZ0OiAnNTAlJyxcbiAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbiAgICAgICAgdG9wOiAnYXV0bycsXG4gICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoLTUwJSknLFxuICAgICAgfSxcbiAgICAgICdib3R0b20tcmlnaHQnOiB7XG4gICAgICAgIGJvdHRvbTogMCxcbiAgICAgICAgbGVmdDogJ2F1dG8nLFxuICAgICAgICByaWdodDogMCxcbiAgICAgICAgdG9wOiAnYXV0bycsXG4gICAgICAgIHRyYW5zZm9ybTogJ25vbmUnLFxuICAgICAgfSxcbiAgICAgICdib3R0b20tc3RyZXRjaCc6IHtcbiAgICAgICAgYm90dG9tOiAwLFxuICAgICAgICBsZWZ0OiAwLFxuICAgICAgICByaWdodDogMCxcbiAgICAgICAgdG9wOiAnYXV0bycsXG4gICAgICAgIHRyYW5zZm9ybTogJ25vbmUnLFxuICAgICAgfSxcbiAgICAgICd0b3Atc3RyZXRjaCc6IHtcbiAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgIGxlZnQ6IDAsXG4gICAgICAgIHJpZ2h0OiAwLFxuICAgICAgICB0b3A6IDAsXG4gICAgICAgIHRyYW5zZm9ybTogJ25vbmUnLFxuICAgICAgfSxcbiAgICB9LFxuXG4gICAgLy8gcG9zaXRpb24gb3ZlcmxheVxuICAgICdwb3Mtb3ZlcmxheSc6IHtcbiAgICAgIF9jb21tb246IHtcbiAgICAgICAgdG9wOiAwLFxuICAgICAgICBib3R0b206IDAsXG4gICAgICAgIGxlZnQ6IDAsXG4gICAgICAgIHJpZ2h0OiAwLFxuICAgICAgfSxcbiAgICAgIGFiczogeyBwb3NpdGlvbjogJ2Fic29sdXRlJyB9LFxuICAgICAgZml4OiB7IHBvc2l0aW9uOiAnZml4ZWQnIH0sXG4gICAgfSxcblxuICAgIC8vIHBvc2l0aW9uIG92ZXJsYXkgbGlua1xuICAgICdwb3Mtb3ZlcmxheS1saW5rJzoge1xuICAgICAgX2NvbW1vbjoge1xuICAgICAgICBib3JkZXI6ICdub25lJyxcbiAgICAgICAgYm90dG9tOiAwLFxuICAgICAgICBjdXJzb3I6ICdwb2ludGVyJyxcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6IDAsXG4gICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICdsaW5lLWhlaWdodCc6IDAsXG4gICAgICAgIG1hcmdpbjogMCxcbiAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgICAgICBwYWRkaW5nOiAwLFxuICAgICAgICByaWdodDogMCxcbiAgICAgICAgdG9wOiAwLFxuICAgICAgICAnd2hpdGUtc3BhY2UnOiAnbm93cmFwJyxcbiAgICAgICAgJ3otaW5kZXgnOiAxLFxuICAgICAgfSxcbiAgICAgIGFiczogeyBwb3NpdGlvbjogJ2Fic29sdXRlJyB9LFxuICAgICAgZml4OiB7IHBvc2l0aW9uOiAnZml4ZWQnIH0sXG4gICAgfSxcblxuICAgIC8vIHBvc2l0aW9uXG4gICAgcG9zOiB7XG4gICAgICBhYnM6IHsgcG9zaXRpb246ICdhYnNvbHV0ZScgfSxcbiAgICAgIGZpeDogeyBwb3NpdGlvbjogJ2ZpeGVkJyB9LFxuICAgICAgcmVsOiB7IHBvc2l0aW9uOiAncmVsYXRpdmUnIH0sXG4gICAgICBzdGF0aWM6IHsgcG9zaXRpb246ICdzdGF0aWMnIH0sXG4gICAgICBzdGlja3k6IHsgcG9zaXRpb246ICdzdGlja3knIH0sXG4gICAgfSxcblxuICAgIC8vIHBvaW50ZXItZXZlbnRzXG4gICAgJ3BvaW50ZXItZXZlbnRzJzoge1xuICAgICAgZGlzYWJsZWQ6IHsgJ3BvaW50ZXItZXZlbnRzJzogJ25vbmUnIH0sXG4gICAgICBhY3RpdmU6IHsgJ3BvaW50ZXItZXZlbnRzJzogJ2F1dG8nIH0sXG4gICAgfSxcblxuICAgIHJ0bDoge1xuICAgICAgeWVzOiB7IGRpcmVjdGlvbjogJ3J0bCcgfSxcbiAgICAgIG5vOiB7IGRpcmVjdGlvbjogJ2x0cicgfSxcbiAgICB9LFxuXG4gICAgLy8gb3ZlcmZsb3dcbiAgICBzY3JvbGxhYmxlOiB7XG4gICAgICBfY29tbW9uOiB7ICdmbGV4LXdyYXAnOiAnbm93cmFwJyB9LFxuICAgICAgYWxsOiB7IG92ZXJmbG93OiAnYXV0bycgfSxcbiAgICAgIHZpc2libGU6IHsgb3ZlcmZsb3c6ICd2aXNpYmxlJyB9LFxuICAgICAgbm9uZTogeyBvdmVyZmxvdzogJ2hpZGRlbicsICdmbGV4LXdyYXAnOiAnd3JhcCAhaW1wb3J0YW50JyB9LFxuICAgICAgaGlkZGVuOiB7IG92ZXJmbG93OiAnaGlkZGVuJyB9LFxuICAgICAgeDogeyAnb3ZlcmZsb3cteCc6ICdhdXRvJywgJ292ZXJmbG93LXknOiAnaGlkZGVuJyB9LFxuICAgICAgeTogeyAnb3ZlcmZsb3cteSc6ICdhdXRvJywgJ292ZXJmbG93LXgnOiAnaGlkZGVuJyB9LFxuICAgIH0sXG5cbiAgICAvLyB2aXNpYmxpdHlcbiAgICB2aXNpYmxlOiB7XG4gICAgICB5ZXM6IHsgdmlzaWJpbGl0eTogJ3Zpc2libGUnIH0sXG4gICAgICBubzogeyB2aXNpYmlsaXR5OiAnaGlkZGVuJyB9LFxuICAgIH0sXG5cbiAgICAvLyB0cmFuc2l0aW9uXG4gICAgdHJhbnNpdGlvbjoge1xuICAgICAgYWxsOiB7IHRyYW5zaXRpb246IGBhbGwgJHt0cmFuc2l0aW9uLmR1cmF0aW9ufSAke3RyYW5zaXRpb24udGltaW5nfWAgfSxcbiAgICAgIGJnYzoge1xuICAgICAgICB0cmFuc2l0aW9uOiBgYmFja2dyb3VuZC1jb2xvciAke3RyYW5zaXRpb24uZHVyYXRpb259ICR7dHJhbnNpdGlvbi50aW1pbmd9YCxcbiAgICAgIH0sXG4gICAgICBmYzoge1xuICAgICAgICB0cmFuc2l0aW9uOiBgY29sb3IgJHt0cmFuc2l0aW9uLmR1cmF0aW9ufSAke3RyYW5zaXRpb24udGltaW5nfWAsXG4gICAgICB9LFxuICAgICAgdzogeyB0cmFuc2l0aW9uOiBgd2lkdGggJHt0cmFuc2l0aW9uLmR1cmF0aW9ufSAke3RyYW5zaXRpb24udGltaW5nfWAgfSxcbiAgICAgIGg6IHtcbiAgICAgICAgdHJhbnNpdGlvbjogYGhlaWdodCAke3RyYW5zaXRpb24uZHVyYXRpb259ICR7dHJhbnNpdGlvbi50aW1pbmd9YCxcbiAgICAgIH0sXG4gICAgICBobWF4OiB7XG4gICAgICAgIHRyYW5zaXRpb246IGBtYXgtaGVpZ2h0ICR7dHJhbnNpdGlvbi5kdXJhdGlvbn0gJHt0cmFuc2l0aW9uLnRpbWluZ31gLFxuICAgICAgfSxcbiAgICAgIHRyYW5zZm9ybToge1xuICAgICAgICB0cmFuc2l0aW9uOiBgdHJhbnNmb3JtICR7dHJhbnNpdGlvbi5kdXJhdGlvbn0gJHt0cmFuc2l0aW9uLnRpbWluZ31gLFxuICAgICAgfSxcbiAgICAgIG9wYWNpdHk6IHtcbiAgICAgICAgdHJhbnNpdGlvbjogYG9wYWNpdHkgJHt0cmFuc2l0aW9uLmR1cmF0aW9ufSAke3RyYW5zaXRpb24udGltaW5nfWAsXG4gICAgICB9LFxuICAgICAgbm9uZTogeyB0cmFuc2l0aW9uOiAnbm9uZScgfSxcbiAgICAgICcqJzogeyB0cmFuc2l0aW9uOiAnKicgfSxcbiAgICB9LFxuXG4gICAgLy8gdHJhbnNmb3JtIHJvdGF0ZVxuICAgIHJvdGF0ZToge1xuICAgICAgbjE4MDogeyB0cmFuc2Zvcm06ICdyb3RhdGUoLTE4MGRlZyknIH0sXG4gICAgICBuMTM1OiB7IHRyYW5zZm9ybTogJ3JvdGF0ZSgtMTM1ZGVnKScgfSxcbiAgICAgIG45MDogeyB0cmFuc2Zvcm06ICdyb3RhdGUoLTkwZGVnKScgfSxcbiAgICAgIG40NTogeyB0cmFuc2Zvcm06ICdyb3RhdGUoLTQ1ZGVnKScgfSxcbiAgICAgIDA6IHsgdHJhbnNmb3JtOiAncm90YXRlKDApJyB9LFxuICAgICAgNDU6IHsgdHJhbnNmb3JtOiAncm90YXRlKDQ1ZGVnKScgfSxcbiAgICAgIDkwOiB7IHRyYW5zZm9ybTogJ3JvdGF0ZSg5MGRlZyknIH0sXG4gICAgICAxMzU6IHsgdHJhbnNmb3JtOiAncm90YXRlKDEzNWRlZyknIH0sXG4gICAgICAxODA6IHsgdHJhbnNmb3JtOiAncm90YXRlKDE4MGRlZyknIH0sXG4gICAgICAnKic6IHsgdHJhbnNmb3JtOiAncm90YXRlKCopJyB9LFxuICAgIH0sXG5cbiAgICAvLyB0cmFuc2Zvcm0gdHJhbnNsYXRlXG4gICAgdHJhbnNsYXRlOiB7XG4gICAgICAwOiB7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgwLCAwKScgfSxcbiAgICAgICcqJzogeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGUoKiknIH0sXG4gICAgfSxcblxuICAgICd0cmFuc2xhdGUteCc6IHtcbiAgICAgIG41MDogeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKC01MCUpJyB9LFxuICAgICAgbjEwMDogeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKC0xMDAlKScgfSxcbiAgICAgIDA6IHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgwKScgfSxcbiAgICAgIDUwOiB7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoNTAlKScgfSxcbiAgICAgIDEwMDogeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDEwMCUpJyB9LFxuICAgICAgJyonOiB7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoKiknIH0sXG4gICAgfSxcblxuICAgICd0cmFuc2xhdGUteSc6IHtcbiAgICAgIG41MDogeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKC01MCUpJyB9LFxuICAgICAgbjEwMDogeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKC0xMDAlKScgfSxcbiAgICAgIDA6IHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgwKScgfSxcbiAgICAgIDUwOiB7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoNTAlKScgfSxcbiAgICAgIDEwMDogeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDEwMCUpJyB9LFxuICAgICAgJyonOiB7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoKiknIH0sXG4gICAgfSxcblxuICAgICd0cmFuc2xhdGUteic6IHtcbiAgICAgIG4xMDA6IHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWigtMTAwJSknIH0sXG4gICAgICAwOiB7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVooMCknIH0sXG4gICAgICAxMDA6IHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWigxMDAlKScgfSxcbiAgICAgICcqJzogeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVaKCopJyB9LFxuICAgIH0sXG5cbiAgICAvLyB0cmFuc2Zvcm0gc2NhbGVcbiAgICBzY2FsZToge1xuICAgICAgZGVmYXVsdDogeyB0cmFuc2Zvcm06ICdzY2FsZSgxKScgfSxcbiAgICAgICcqJzogeyB0cmFuc2Zvcm06ICdzY2FsZSgqKScgfSxcbiAgICB9LFxuXG4gICAgJ3NjYWxlLXgnOiB7XG4gICAgICAxOiB7IHRyYW5zZm9ybTogJ3NjYWxlWCgxKScgfSxcbiAgICAgIG4xOiB7IHRyYW5zZm9ybTogJ3NjYWxlWCgtMSknIH0sXG4gICAgICAnKic6IHsgdHJhbnNmb3JtOiAnc2NhbGVYKCopJyB9LFxuICAgIH0sXG5cbiAgICAvLyB0cmFuc2Zvcm0tb3JpZ2luXG4gICAgJ3RyYW5zZm9ybS1vJzoge1xuICAgICAgMDogeyAndHJhbnNmb3JtLW9yaWdpbic6ICcwIDAnIH0sXG4gICAgICAnMTAwLTAnOiB7ICd0cmFuc2Zvcm0tb3JpZ2luJzogJzEwMCUgMCcgfSxcbiAgICB9LFxuXG4gICAgLy8gdGV4dC1hbGlnblxuICAgICd0eHQtYWxpZ24nOiB7XG4gICAgICBsZWZ0OiB7ICd0ZXh0LWFsaWduJzogJ2xlZnQnIH0sXG4gICAgICBjZW50ZXI6IHsgJ3RleHQtYWxpZ24nOiAnY2VudGVyJyB9LFxuICAgICAgcmlnaHQ6IHsgJ3RleHQtYWxpZ24nOiAncmlnaHQnIH0sXG4gICAgICBqdXN0aWZ5OiB7ICd0ZXh0LWFsaWduJzogJ2p1c3RpZnknIH0sXG4gICAgfSxcblxuICAgIC8vIHRleHQtc2hhZG93XG4gICAgJ3R4dC1zaGFkb3cnOiB7XG4gICAgICAnKic6IHsgJ3RleHQtc2hhZG93JzogJyonIH0sXG4gICAgfSxcblxuICAgIC8vIHdoaXRlLXNwYWNlXG4gICAgJ3R4dC13cmFwJzoge1xuICAgICAgeWVzOiB7ICd3aGl0ZS1zcGFjZSc6ICdub3JtYWwnIH0sXG4gICAgICBubzogeyAnd2hpdGUtc3BhY2UnOiAnbm93cmFwJyB9LFxuICAgICAgJyonOiB7ICd3aGl0ZS1zcGFjZSc6ICcqJyB9LFxuICAgIH0sXG5cbiAgICAvLyB0ZXh0LXRyYW5zZm9ybVxuICAgICd0eHQtY2FzZSc6IHtcbiAgICAgIG5vbmU6IHsgJ3RleHQtdHJhbnNmb3JtJzogJ25vbmUnIH0sXG4gICAgICBsb3dlcjogeyAndGV4dC10cmFuc2Zvcm0nOiAnbG93ZXJjYXNlJyB9LFxuICAgICAgdXBwZXI6IHsgJ3RleHQtdHJhbnNmb3JtJzogJ3VwcGVyY2FzZScgfSxcbiAgICAgIHRpdGxlOiB7ICd0ZXh0LXRyYW5zZm9ybSc6ICdjYXBpdGFsaXplJyB9LFxuICAgIH0sXG5cbiAgICAvLyBlbGxpcHNpc1xuICAgICd0eHQtdHJ1bmNhdGUnOiB7XG4gICAgICB5ZXM6IHtcbiAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgICAgICAndGV4dC1vdmVyZmxvdyc6ICdlbGxpcHNpcycsXG4gICAgICAgICd3aGl0ZS1zcGFjZSc6ICdub3dyYXAnLFxuICAgICAgfSxcbiAgICAgIG5vOiB7XG4gICAgICAgIG92ZXJmbG93OiAnaW5pdGlhbCcsXG4gICAgICAgICd0ZXh0LW92ZXJmbG93JzogJ2luaXRpYWwnLFxuICAgICAgICAnd2hpdGUtc3BhY2UnOiAnd3JhcCcsXG4gICAgICB9LFxuICAgIH0sXG5cbiAgICAndHh0LXVuZGVybGluZSc6IHtcbiAgICAgIHllczogeyAndGV4dC1kZWNvcmF0aW9uJzogJ3VuZGVybGluZScgfSxcbiAgICAgIG5vOiB7ICd0ZXh0LWRlY29yYXRpb24nOiAnbm9uZScgfSxcbiAgICB9LFxuXG4gICAgJ3R4dC1saW5lLXRocm91Z2gnOiB7XG4gICAgICB5ZXM6IHsgJ3RleHQtZGVjb3JhdGlvbic6ICdsaW5lLXRocm91Z2gnIH0sXG4gICAgICBubzogeyAndGV4dC1kZWNvcmF0aW9uJzogJ25vbmUnIH0sXG4gICAgfSxcblxuICAgICd2LWFsaWduJzoge1xuICAgICAgbm9uZTogeyAndmVydGljYWwtYWxpZ24nOiAndW5zZXQnIH0sXG4gICAgICB0b3A6IHsgJ3ZlcnRpY2FsLWFsaWduJzogJ3RvcCcgfSxcbiAgICAgIG1pZGRsZTogeyAndmVydGljYWwtYWxpZ24nOiAnbWlkZGxlJyB9LFxuICAgICAgYm90dG9tOiB7ICd2ZXJ0aWNhbC1hbGlnbic6ICdib3R0b20nIH0sXG4gICAgICBzdWI6IHsgJ3ZlcnRpY2FsLWFsaWduJzogJ3N1YicgfSxcbiAgICAgIHN1cDogeyAndmVydGljYWwtYWxpZ24nOiAnc3VwZXInIH0sXG4gICAgICAnKic6IHsgJ3ZlcnRpY2FsLWFsaWduJzogJyonIH0sXG4gICAgfSxcblxuICAgIC8vIHN0cm9rZS13aWR0aFxuICAgICdzdHJva2Utd2lkdGgnOiB7XG4gICAgICAwOiB7ICdzdHJva2Utd2lkdGgnOiAwIH0sXG4gICAgICAxOiB7ICdzdHJva2Utd2lkdGgnOiAxIH0sXG4gICAgICAxLjE6IHsgJ3N0cm9rZS13aWR0aCc6IDEuMSB9LFxuICAgICAgMS4yOiB7ICdzdHJva2Utd2lkdGgnOiAxLjIgfSxcbiAgICAgIDEuMzogeyAnc3Ryb2tlLXdpZHRoJzogMS4zIH0sXG4gICAgICAxLjQ6IHsgJ3N0cm9rZS13aWR0aCc6IDEuNCB9LFxuICAgICAgMS41OiB7ICdzdHJva2Utd2lkdGgnOiAxLjUgfSxcbiAgICAgIDEuNjogeyAnc3Ryb2tlLXdpZHRoJzogMS42IH0sXG4gICAgICAxLjc6IHsgJ3N0cm9rZS13aWR0aCc6IDEuNyB9LFxuICAgICAgMS44OiB7ICdzdHJva2Utd2lkdGgnOiAxLjggfSxcbiAgICAgIDEuOTogeyAnc3Ryb2tlLXdpZHRoJzogMS45IH0sXG4gICAgICAyOiB7ICdzdHJva2Utd2lkdGgnOiAyIH0sXG4gICAgICAzOiB7ICdzdHJva2Utd2lkdGgnOiAzIH0sXG4gICAgICA0OiB7ICdzdHJva2Utd2lkdGgnOiA0IH0sXG4gICAgICAnKic6IHsgJ3N0cm9rZS13aWR0aCc6ICcqJyB9LFxuICAgIH0sXG5cbiAgICAvLyB3aWR0aFxuICAgIHc6IHtcbiAgICAgICcxMDB2dyc6IHsgd2lkdGg6ICcxMDB2dycgfSxcbiAgICAgIGNvdmVyOiB7XG4gICAgICAgIGxlZnQ6ICc1MCUnLFxuICAgICAgICAnbWFyZ2luLWxlZnQnOiAnLTUwdncnLFxuICAgICAgICAnbWFyZ2luLXJpZ2h0JzogJy01MHZ3JyxcbiAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgIHJpZ2h0OiAnNTAlJyxcbiAgICAgICAgd2lkdGg6ICcxMDB2dycsXG4gICAgICB9LFxuICAgICAgYXV0bzogeyB3aWR0aDogJ2F1dG8nIH0sXG4gICAgICAwOiB7IHdpZHRoOiAwIH0sXG4gICAgICA1OiB7IHdpZHRoOiAnNSUnIH0sXG4gICAgICAxMDogeyB3aWR0aDogJzEwJScgfSxcbiAgICAgIDE1OiB7IHdpZHRoOiAnMTUlJyB9LFxuICAgICAgMjA6IHsgd2lkdGg6ICcyMCUnIH0sXG4gICAgICAyNTogeyB3aWR0aDogJzI1JScgfSxcbiAgICAgIDMwOiB7IHdpZHRoOiAnMzAlJyB9LFxuICAgICAgMzM6IHsgd2lkdGg6ICczMyUnIH0sXG4gICAgICAzNTogeyB3aWR0aDogJzM1JScgfSxcbiAgICAgIDQwOiB7IHdpZHRoOiAnNDAlJyB9LFxuICAgICAgNDU6IHsgd2lkdGg6ICc0NSUnIH0sXG4gICAgICA1MDogeyB3aWR0aDogJzUwJScgfSxcbiAgICAgIDU1OiB7IHdpZHRoOiAnNTUlJyB9LFxuICAgICAgNjA6IHsgd2lkdGg6ICc2MCUnIH0sXG4gICAgICA2NTogeyB3aWR0aDogJzY1JScgfSxcbiAgICAgIDY2OiB7IHdpZHRoOiAnNjYlJyB9LFxuICAgICAgNzA6IHsgd2lkdGg6ICc3MCUnIH0sXG4gICAgICA3NTogeyB3aWR0aDogJzc1JScgfSxcbiAgICAgIDgwOiB7IHdpZHRoOiAnODAlJyB9LFxuICAgICAgODU6IHsgd2lkdGg6ICc4NSUnIH0sXG4gICAgICA5MDogeyB3aWR0aDogJzkwJScgfSxcbiAgICAgIDk1OiB7IHdpZHRoOiAnOTUlJyB9LFxuICAgICAgMTAwOiB7IHdpZHRoOiAnMTAwJScgfSxcbiAgICAgICcqJzogeyB3aWR0aDogJyonIH0sXG4gICAgfSxcblxuICAgIC8vIG1heC13aWR0aFxuICAgIHdtYXg6IHtcbiAgICAgIG5hcnJvdzogeyAnbWF4LXdpZHRoJzogbWF4V2lkdGguc20gfSxcbiAgICAgIG5vcm1hbDogeyAnbWF4LXdpZHRoJzogbWF4V2lkdGgubWQgfSxcbiAgICAgIHdpZGU6IHsgJ21heC13aWR0aCc6IG1heFdpZHRoLmxnIH0sXG4gICAgICB2YXN0OiB7ICdtYXgtd2lkdGgnOiBtYXhXaWR0aC54bCB9LFxuICAgICAgZXh0cmE6IHsgJ21heC13aWR0aCc6IG1heFdpZHRoLnh4bCB9LFxuICAgICAgNTogeyAnbWF4LXdpZHRoJzogJzUlJyB9LFxuICAgICAgMTA6IHsgJ21heC13aWR0aCc6ICcxMCUnIH0sXG4gICAgICAxNTogeyAnbWF4LXdpZHRoJzogJzE1JScgfSxcbiAgICAgIDIwOiB7ICdtYXgtd2lkdGgnOiAnMjAlJyB9LFxuICAgICAgMjU6IHsgJ21heC13aWR0aCc6ICcyNSUnIH0sXG4gICAgICAzMDogeyAnbWF4LXdpZHRoJzogJzMwJScgfSxcbiAgICAgIDMzOiB7ICdtYXgtd2lkdGgnOiAnMzMlJyB9LFxuICAgICAgMzU6IHsgJ21heC13aWR0aCc6ICczNSUnIH0sXG4gICAgICA0MDogeyAnbWF4LXdpZHRoJzogJzQwJScgfSxcbiAgICAgIDQ1OiB7ICdtYXgtd2lkdGgnOiAnNDUlJyB9LFxuICAgICAgNTA6IHsgJ21heC13aWR0aCc6ICc1MCUnIH0sXG4gICAgICA1NTogeyAnbWF4LXdpZHRoJzogJzU1JScgfSxcbiAgICAgIDYwOiB7ICdtYXgtd2lkdGgnOiAnNjAlJyB9LFxuICAgICAgNjU6IHsgJ21heC13aWR0aCc6ICc2NSUnIH0sXG4gICAgICA2NjogeyAnbWF4LXdpZHRoJzogJzY2JScgfSxcbiAgICAgIDcwOiB7ICdtYXgtd2lkdGgnOiAnNzAlJyB9LFxuICAgICAgNzU6IHsgJ21heC13aWR0aCc6ICc3NSUnIH0sXG4gICAgICA4MDogeyAnbWF4LXdpZHRoJzogJzgwJScgfSxcbiAgICAgIDg1OiB7ICdtYXgtd2lkdGgnOiAnODUlJyB9LFxuICAgICAgOTA6IHsgJ21heC13aWR0aCc6ICc5MCUnIH0sXG4gICAgICA5NTogeyAnbWF4LXdpZHRoJzogJzk1JScgfSxcbiAgICAgIDEwMDogeyAnbWF4LXdpZHRoJzogJzEwMCUnIH0sXG4gICAgICAnKic6IHsgJ21heC13aWR0aCc6ICcqJyB9LFxuICAgIH0sXG5cbiAgICAvLyBtaW4td2lkdGhcbiAgICB3bWluOiB7XG4gICAgICAnMTAwdncnOiB7ICdtaW4td2lkdGgnOiAnMTAwdncnIH0sXG4gICAgICBuYXJyb3c6IHsgJ21pbi13aWR0aCc6IG1heFdpZHRoLnNtIH0sXG4gICAgICBub3JtYWw6IHsgJ21pbi13aWR0aCc6IG1heFdpZHRoLm1kIH0sXG4gICAgICB3aWRlOiB7ICdtaW4td2lkdGgnOiBtYXhXaWR0aC5sZyB9LFxuICAgICAgdmFzdDogeyAnbWluLXdpZHRoJzogbWF4V2lkdGgueGwgfSxcbiAgICAgIGV4dHJhOiB7ICdtaW4td2lkdGgnOiBtYXhXaWR0aC54eGwgfSxcbiAgICAgIDU6IHsgJ21pbi13aWR0aCc6ICc1JScgfSxcbiAgICAgIDEwOiB7ICdtaW4td2lkdGgnOiAnMTAlJyB9LFxuICAgICAgMTU6IHsgJ21pbi13aWR0aCc6ICcxNSUnIH0sXG4gICAgICAyMDogeyAnbWluLXdpZHRoJzogJzIwJScgfSxcbiAgICAgIDI1OiB7ICdtaW4td2lkdGgnOiAnMjUlJyB9LFxuICAgICAgMzA6IHsgJ21pbi13aWR0aCc6ICczMCUnIH0sXG4gICAgICAzMzogeyAnbWluLXdpZHRoJzogJzMzJScgfSxcbiAgICAgIDM1OiB7ICdtaW4td2lkdGgnOiAnMzUlJyB9LFxuICAgICAgNDA6IHsgJ21pbi13aWR0aCc6ICc0MCUnIH0sXG4gICAgICA0NTogeyAnbWluLXdpZHRoJzogJzQ1JScgfSxcbiAgICAgIDUwOiB7ICdtaW4td2lkdGgnOiAnNTAlJyB9LFxuICAgICAgNTU6IHsgJ21pbi13aWR0aCc6ICc1NSUnIH0sXG4gICAgICA2MDogeyAnbWluLXdpZHRoJzogJzYwJScgfSxcbiAgICAgIDY1OiB7ICdtaW4td2lkdGgnOiAnNjUlJyB9LFxuICAgICAgNjY6IHsgJ21pbi13aWR0aCc6ICc2NiUnIH0sXG4gICAgICA3MDogeyAnbWluLXdpZHRoJzogJzcwJScgfSxcbiAgICAgIDc1OiB7ICdtaW4td2lkdGgnOiAnNzUlJyB9LFxuICAgICAgODA6IHsgJ21pbi13aWR0aCc6ICc4MCUnIH0sXG4gICAgICA4NTogeyAnbWluLXdpZHRoJzogJzg1JScgfSxcbiAgICAgIDkwOiB7ICdtaW4td2lkdGgnOiAnOTAlJyB9LFxuICAgICAgOTU6IHsgJ21pbi13aWR0aCc6ICc5NSUnIH0sXG4gICAgICAxMDA6IHsgJ21pbi13aWR0aCc6ICcxMDAlJyB9LFxuICAgICAgJyonOiB7ICdtaW4td2lkdGgnOiAnKicgfSxcbiAgICB9LFxuXG4gICAgLy8gd2lkdGggY2FsY1xuICAgIHdjYWxjOiB7XG4gICAgICAnKic6IHsgd2lkdGg6ICdjYWxjKCopJyB9LFxuICAgIH0sXG5cbiAgICAvLyBtYXgtd2lkdGggY2FsY1xuICAgIHdtYXhjYWxjOiB7XG4gICAgICAnKic6IHsgJ21heC13aWR0aCc6ICdjYWxjKCopJyB9LFxuICAgIH0sXG5cbiAgICAvLyBtaW4td2lkdGggY2FsY1xuICAgIHdtaW5jYWxjOiB7XG4gICAgICAnKic6IHsgJ21pbi13aWR0aCc6ICdjYWxjKCopJyB9LFxuICAgIH0sXG5cbiAgICAvLyBoZWlnaHRcbiAgICBoOiB7XG4gICAgICAnMTAwdmgnOiB7IGhlaWdodDogJzEwMHZoJyB9LFxuICAgICAgYXV0bzogeyBoZWlnaHQ6ICdhdXRvJyB9LFxuICAgICAgMDogeyBoZWlnaHQ6IDAgfSxcbiAgICAgIDEwMDogeyBoZWlnaHQ6ICcxMDAlJyB9LFxuICAgICAgJyonOiB7IGhlaWdodDogJyonIH0sXG4gICAgfSxcblxuICAgIC8vIG1heC1oZWlnaHRcbiAgICBobWF4OiB7XG4gICAgICAnMTAwdmgnOiB7ICdtYXgtaGVpZ2h0JzogJzEwMHZoJyB9LFxuICAgICAgbm9uZTogeyAnbWF4LWhlaWdodCc6ICdub25lJyB9LFxuICAgICAgMTAwOiB7ICdtYXgtaGVpZ2h0JzogJzEwMCUnIH0sXG4gICAgICAwOiB7ICdtYXgtaGVpZ2h0JzogJzAnIH0sXG4gICAgICAnKic6IHsgJ21heC1oZWlnaHQnOiAnKicgfSxcbiAgICB9LFxuXG4gICAgLy8gbWluLWhlaWdodFxuICAgIGhtaW46IHtcbiAgICAgICcxMDB2aCc6IHsgJ21pbi1oZWlnaHQnOiAnMTAwdmgnIH0sXG4gICAgICBhdXRvOiB7ICdtaW4taGVpZ2h0JzogJ2F1dG8nIH0sXG4gICAgICAxMDA6IHsgJ21pbi1oZWlnaHQnOiAnMTAwJScgfSxcbiAgICAgICcqJzogeyAnbWluLWhlaWdodCc6ICcqJyB9LFxuICAgIH0sXG5cbiAgICAvLyBoZWlnaHQgY2FsY1xuICAgIGhjYWxjOiB7XG4gICAgICAnKic6IHsgaGVpZ2h0OiAnY2FsYygqKScgfSxcbiAgICB9LFxuXG4gICAgLy8gbWF4LWhlaWdodCBjYWxjXG4gICAgaG1heGNhbGM6IHtcbiAgICAgICcqJzogeyAnbWF4LWhlaWdodCc6ICdjYWxjKCopJyB9LFxuICAgIH0sXG5cbiAgICAvLyBtaW4taGVpZ2h0IGNhbGNcbiAgICBobWluY2FsYzoge1xuICAgICAgJyonOiB7ICdtaW4taGVpZ2h0JzogJ2NhbGMoKiknIH0sXG4gICAgfSxcblxuICAgIC8vIHNxdWFyZVxuICAgIHNxdWFyZToge1xuICAgICAgYXV0bzogeyB3aWR0aDogJ2F1dG8nLCBoZWlnaHQ6ICdhdXRvJyB9LFxuICAgICAgMDogeyB3aWR0aDogMCwgaGVpZ2h0OiAwIH0sXG4gICAgICAnKic6IHsgd2lkdGg6ICcqJywgaGVpZ2h0OiAnKicgfSxcbiAgICB9LFxuXG4gICAgLy8gei1pbmRleFxuICAgIHo6IHtcbiAgICAgIG46IHsgJ3otaW5kZXgnOiAtMSB9LFxuICAgICAgMDogeyAnei1pbmRleCc6IDAgfSxcbiAgICAgIDE6IHsgJ3otaW5kZXgnOiAxIH0sXG4gICAgICAzOiB7ICd6LWluZGV4JzogMyB9LFxuICAgICAgNjogeyAnei1pbmRleCc6IDYgfSxcbiAgICAgIDk6IHsgJ3otaW5kZXgnOiA5IH0sXG4gICAgICA5OTogeyAnei1pbmRleCc6IDk5IH0sXG4gICAgICA5OTk6IHsgJ3otaW5kZXgnOiA5OTkgfSxcbiAgICAgIDk5OTk6IHsgJ3otaW5kZXgnOiA5OTk5IH0sXG4gICAgICAnKic6IHsgJ3otaW5kZXgnOiAnKicgfSxcbiAgICB9LFxuXG4gICAgLy8gc2Nyb2xsIHNuYXAgdHlwZVxuICAgICdzcy10eXBlJzoge1xuICAgICAgbm9uZTogeyAnc2Nyb2xsLXNuYXAtdHlwZSc6ICdub25lJyB9LFxuICAgICAgYm90aDogeyAnc2Nyb2xsLXNuYXAtdHlwZSc6ICdib3RoJyB9LFxuICAgIH0sXG5cbiAgICAvLyBzY3JvbGwgc25hcCBhbGlnblxuICAgICdzcy1hbGlnbic6IHtcbiAgICAgIG5vbmU6IHsgJ3Njcm9sbC1zbmFwLWFsaWduJzogJ25vbmUnIH0sXG4gICAgICBzdGFydDogeyAnc2Nyb2xsLXNuYXAtYWxpZ24nOiAnc3RhcnQnIH0sXG4gICAgfSxcblxuICAgIC8vIHNjcm9sbCBtYXJnaW4gdG9wXG4gICAgJ3NtLXRvcCc6IHtcbiAgICAgICcqJzogeyAnc2Nyb2xsLW1hcmdpbi10b3AnOiAnKicgfSxcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IGdldE1hcGxlVXRpbGl0eVZhcmlhYmxlTWFwID0gKHtcbiAgY29sb3IsXG4gIHNwYWNlcixcbiAgZm9udEZhbWlseSxcbn06IE1hcGxlVmFyaWFibGVNb2RlbCkgPT4gW1xuICB7IHByZWZpeDogJ2ZmJywgbWFwOiBmb250RmFtaWx5LCBwcm9wczogWydmb250LWZhbWlseSddIH0sXG4gIHsgcHJlZml4OiAnYmdjJywgbWFwOiBjb2xvciwgcHJvcHM6IFsnYmFja2dyb3VuZC1jb2xvciddIH0sXG4gIHsgcHJlZml4OiAnYmMnLCBtYXA6IGNvbG9yLCBwcm9wczogWydib3JkZXItY29sb3InXSB9LFxuICB7IHByZWZpeDogJ2JjLXRvcCcsIG1hcDogY29sb3IsIHByb3BzOiBbJ2JvcmRlci10b3AtY29sb3InXSB9LFxuICB7IHByZWZpeDogJ2JjLWJvdHRvbScsIG1hcDogY29sb3IsIHByb3BzOiBbJ2JvcmRlci1ib3R0b20tY29sb3InXSB9LFxuICB7IHByZWZpeDogJ2JjLWxlZnQnLCBtYXA6IGNvbG9yLCBwcm9wczogWydib3JkZXItbGVmdC1jb2xvciddIH0sXG4gIHsgcHJlZml4OiAnYmMtcmlnaHQnLCBtYXA6IGNvbG9yLCBwcm9wczogWydib3JkZXItcmlnaHQtY29sb3InXSB9LFxuICB7IHByZWZpeDogJ2NvbC1iYycsIG1hcDogY29sb3IsIHByb3BzOiBbJ2NvbHVtbi1ydWxlLWNvbG9yJ10gfSxcbiAgeyBwcmVmaXg6ICdsaW5rJywgbWFwOiBjb2xvciwgcHJvcHM6IFsnbGluayddIH0sXG4gIHsgcHJlZml4OiAnYnRuJywgbWFwOiBjb2xvciwgcHJvcHM6IFsndGhlbWUnXSB9LFxuICB7IHByZWZpeDogJ2J0bi1vdXRsaW5lJywgbWFwOiBjb2xvciwgcHJvcHM6IFsndGhlbWUtb3V0bGluZSddIH0sXG4gIHsgcHJlZml4OiAnYWxlcnQnLCBtYXA6IGNvbG9yLCBwcm9wczogWyd0aGVtZSddIH0sXG4gIHsgcHJlZml4OiAnYWxlcnQtb3V0bGluZScsIG1hcDogY29sb3IsIHByb3BzOiBbJ3RoZW1lLW91dGxpbmUnXSB9LFxuICB7IHByZWZpeDogJ3N0cm9rZScsIG1hcDogY29sb3IsIHByb3BzOiBbJ3N0cm9rZSddIH0sXG4gIHsgcHJlZml4OiAnZmMnLCBtYXA6IGNvbG9yLCBwcm9wczogWydjb2xvciddIH0sXG4gIHsgcHJlZml4OiAnb2MnLCBtYXA6IGNvbG9yLCBwcm9wczogWydvdXRsaW5lLWNvbG9yJ10gfSxcbiAgeyBwcmVmaXg6ICdwJywgbWFwOiBzcGFjZXIsIHByb3BzOiBbJ3BhZGRpbmcnXSB9LFxuICB7IHByZWZpeDogJ3BiJywgbWFwOiBzcGFjZXIsIHByb3BzOiBbJ3BhZGRpbmctYm90dG9tJ10gfSxcbiAgeyBwcmVmaXg6ICdwbCcsIG1hcDogc3BhY2VyLCBwcm9wczogWydwYWRkaW5nLWxlZnQnXSB9LFxuICB7IHByZWZpeDogJ3ByJywgbWFwOiBzcGFjZXIsIHByb3BzOiBbJ3BhZGRpbmctcmlnaHQnXSB9LFxuICB7IHByZWZpeDogJ3B0JywgbWFwOiBzcGFjZXIsIHByb3BzOiBbJ3BhZGRpbmctdG9wJ10gfSxcbiAgeyBwcmVmaXg6ICdweCcsIG1hcDogc3BhY2VyLCBwcm9wczogWydwYWRkaW5nLWxlZnQnLCAncGFkZGluZy1yaWdodCddIH0sXG4gIHsgcHJlZml4OiAncHknLCBtYXA6IHNwYWNlciwgcHJvcHM6IFsncGFkZGluZy10b3AnLCAncGFkZGluZy1ib3R0b20nXSB9LFxuICB7IHByZWZpeDogJ20nLCBtYXA6IHNwYWNlciwgcHJvcHM6IFsnbWFyZ2luJ10gfSxcbiAgeyBwcmVmaXg6ICdtYicsIG1hcDogc3BhY2VyLCBwcm9wczogWydtYXJnaW4tYm90dG9tJ10gfSxcbiAgeyBwcmVmaXg6ICdtbCcsIG1hcDogc3BhY2VyLCBwcm9wczogWydtYXJnaW4tbGVmdCddIH0sXG4gIHsgcHJlZml4OiAnbXInLCBtYXA6IHNwYWNlciwgcHJvcHM6IFsnbWFyZ2luLXJpZ2h0J10gfSxcbiAgeyBwcmVmaXg6ICdtdCcsIG1hcDogc3BhY2VyLCBwcm9wczogWydtYXJnaW4tdG9wJ10gfSxcbiAgeyBwcmVmaXg6ICdteCcsIG1hcDogc3BhY2VyLCBwcm9wczogWydtYXJnaW4tbGVmdCcsICdtYXJnaW4tcmlnaHQnXSB9LFxuICB7IHByZWZpeDogJ215JywgbWFwOiBzcGFjZXIsIHByb3BzOiBbJ21hcmdpbi10b3AnLCAnbWFyZ2luLWJvdHRvbSddIH0sXG4gIHsgcHJlZml4OiAndG9wJywgbWFwOiBzcGFjZXIsIHByb3BzOiBbJ3RvcCddIH0sXG4gIHsgcHJlZml4OiAnbGVmdCcsIG1hcDogc3BhY2VyLCBwcm9wczogWydsZWZ0J10gfSxcbiAgeyBwcmVmaXg6ICdyaWdodCcsIG1hcDogc3BhY2VyLCBwcm9wczogWydyaWdodCddIH0sXG4gIHsgcHJlZml4OiAnYm90dG9tJywgbWFwOiBzcGFjZXIsIHByb3BzOiBbJ2JvdHRvbSddIH0sXG4gIHsgcHJlZml4OiAndG9ibycsIG1hcDogc3BhY2VyLCBwcm9wczogWyd0b3AnLCAnYm90dG9tJ10gfSxcbiAgeyBwcmVmaXg6ICdsZXJpJywgbWFwOiBzcGFjZXIsIHByb3BzOiBbJ2xlZnQnLCAncmlnaHQnXSB9LFxuICB7IHByZWZpeDogJ2xlYm8nLCBtYXA6IHNwYWNlciwgcHJvcHM6IFsnbGVmdCcsICdib3R0b20nXSB9LFxuICB7XG4gICAgcHJlZml4OiAndGJscicsXG4gICAgbWFwOiBzcGFjZXIsXG4gICAgcHJvcHM6IFsndG9wJywgJ2JvdHRvbScsICdsZWZ0JywgJ3JpZ2h0J10sXG4gIH0sXG4gIHsgcHJlZml4OiAndGJscicsIG1hcDogc3BhY2VyLCBwcm9wczogWyd0b3AnLCAnYm90dG9tJywgJ2xlZnQnLCAncmlnaHQnXSB9LFxuICB7IHByZWZpeDogJ2J3JywgbWFwOiBzcGFjZXIsIHByb3BzOiBbJ2JvcmRlci13aWR0aCddIH0sXG4gIHsgcHJlZml4OiAnYnctYm90dG9tJywgbWFwOiBzcGFjZXIsIHByb3BzOiBbJ2JvcmRlci1ib3R0b20td2lkdGgnXSB9LFxuICB7IHByZWZpeDogJ2J3LXRvcCcsIG1hcDogc3BhY2VyLCBwcm9wczogWydib3JkZXItdG9wLXdpZHRoJ10gfSxcbiAgeyBwcmVmaXg6ICdidy1sZWZ0JywgbWFwOiBzcGFjZXIsIHByb3BzOiBbJ2JvcmRlci1sZWZ0LXdpZHRoJ10gfSxcbiAgeyBwcmVmaXg6ICdidy1yaWdodCcsIG1hcDogc3BhY2VyLCBwcm9wczogWydib3JkZXItcmlnaHQtd2lkdGgnXSB9LFxuICB7IHByZWZpeDogJ2NvbC1nYXAnLCBtYXA6IHNwYWNlciwgcHJvcHM6IFsnY29sdW1uLWdhcCddIH0sXG5dO1xuIl19