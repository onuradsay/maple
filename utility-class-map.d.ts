import { MapleVariableModel } from './types/variables.model';
export declare const getMapleUtilityClassMap: ({ fontFamily, fontSize, fontWeight, maxWidth, spacer, transition, button, alert, }: MapleVariableModel) => {
    alert: {
        _common: {
            display: string;
            'align-items': string;
            'justify-content': string;
            'font-weight': number;
            'user-select': string;
            'border-style': string;
            'border-width': string;
            'border-radius': string;
            'font-size': string;
            'line-height': number;
            'text-decoration': string;
            padding: string;
        };
    };
    'alert-outline': {
        _common: {
            display: string;
            'align-items': string;
            'justify-content': string;
            'font-weight': number;
            'user-select': string;
            'border-style': string;
            'border-width': string;
            'border-radius': string;
            'font-size': string;
            'line-height': number;
            'text-decoration': string;
            padding: string;
        };
    };
    'alert-size': {
        small: {
            'border-width': string;
            'border-radius': string;
            'font-size': string;
            'font-weight': number;
            'line-height': number;
            padding: string;
        };
        normal: {
            'border-width': string;
            'border-radius': string;
            'font-size': string;
            'font-weight': number;
            'line-height': number;
            padding: string;
        };
        medium: {
            'border-width': string;
            'border-radius': string;
            'font-size': string;
            'font-weight': number;
            'line-height': number;
            padding: string;
        };
        large: {
            'border-width': string;
            'border-radius': string;
            'font-size': string;
            'font-weight': number;
            'line-height': number;
            padding: string;
        };
    };
    animation: {
        '*': {
            animation: string;
        };
    };
    bgi: {
        none: {
            'background-image': string;
        };
        '*': {
            'background-image': string;
        };
    };
    'bg-repeat': {
        no: {
            'background-repeat': string;
        };
        yes: {
            'background-repeat': string;
        };
        '*': {
            'background-repeat': string;
        };
    };
    b: {
        none: {
            border: string;
        };
        '*': {
            border: string;
        };
    };
    br: {
        full: {
            'border-radius': string;
        };
        half: {
            'border-radius': string;
        };
        quarter: {
            'border-radius': string;
        };
        0: {
            'border-radius': number;
        };
        '*': {
            'border-radius': string;
        };
    };
    'border-spacing': {
        0: {
            'border-spacing': number;
        };
        '*': {
            'border-spacing': string;
        };
    };
    'border-collapse': {
        collapse: {
            'border-collapse': string;
        };
        revert: {
            'border-collapse': string;
        };
        separate: {
            'border-collapse': string;
        };
        '*': {
            'border-collapse': string;
        };
    };
    bs: {
        none: {
            'box-shadow': string;
        };
        '*': {
            'box-shadow': string;
        };
    };
    bw: {
        _common: {
            'border-style': string;
        };
        0: {
            'border-width': string;
        };
        '*': {
            'border-width': string;
        };
    };
    'bw-top': {
        _common: {
            'border-top-style': string;
        };
        0: {
            'border-top-width': string;
        };
        '*': {
            'border-top-width': string;
        };
    };
    'bw-bottom': {
        _common: {
            'border-bottom-style': string;
        };
        0: {
            'border-bottom-width': string;
        };
        '*': {
            'border-bottom-width': string;
        };
    };
    'bw-left': {
        _common: {
            'border-left-style': string;
        };
        0: {
            'border-left-width': string;
        };
        '*': {
            'border-left-width': string;
        };
    };
    'bw-right': {
        _common: {
            'border-right-style': string;
        };
        0: {
            'border-right-width': string;
        };
        '*': {
            'border-right-width': string;
        };
    };
    link: {
        _common: {
            border: string;
            'text-decoration': string;
            'background-color': string;
            display: string;
            'align-items': string;
            'justify-content': string;
            'font-weight': number;
            'user-select': string;
            'border-style': string;
            'white-space': string;
            'border-width': string;
            'border-radius': string;
            'font-size': string;
            'line-height': number;
            'text-transform': "none" | "uppercase" | "lowercase" | "capitalize";
            'letter-spacing': string;
            padding: string;
            transition: string;
        };
    };
    btn: {
        _common: {
            display: string;
            'align-items': string;
            'justify-content': string;
            'font-weight': number;
            'user-select': string;
            'border-style': string;
            'white-space': string;
            'border-width': string;
            'border-radius': string;
            'font-size': string;
            'line-height': number;
            'text-decoration': string;
            'text-transform': "none" | "uppercase" | "lowercase" | "capitalize";
            'letter-spacing': string;
            padding: string;
            transition: string;
        };
    };
    'btn-outline': {
        _common: {
            display: string;
            'align-items': string;
            'justify-content': string;
            'font-weight': number;
            'user-select': string;
            'border-style': string;
            'white-space': string;
            'border-width': string;
            'border-radius': string;
            'font-size': string;
            'line-height': number;
            'text-decoration': string;
            'text-transform': "none" | "uppercase" | "lowercase" | "capitalize";
            'letter-spacing': string;
            padding: string;
            transition: string;
        };
    };
    'btn-size': {
        small: {
            'border-width': string;
            'border-radius': string;
            'font-size': string;
            'font-weight': number;
            'line-height': number;
            'text-transform': "none" | "uppercase" | "lowercase" | "capitalize";
            'letter-spacing': string;
            padding: string;
        };
        normal: {
            'border-width': string;
            'border-radius': string;
            'font-size': string;
            'font-weight': number;
            'line-height': number;
            'text-transform': "none" | "uppercase" | "lowercase" | "capitalize";
            'letter-spacing': string;
            padding: string;
        };
        medium: {
            'border-width': string;
            'border-radius': string;
            'font-size': string;
            'font-weight': number;
            'line-height': number;
            'text-transform': "none" | "uppercase" | "lowercase" | "capitalize";
            'letter-spacing': string;
            padding: string;
        };
        large: {
            'border-width': string;
            'border-radius': string;
            'font-size': string;
            'font-weight': number;
            'line-height': number;
            'text-transform': "none" | "uppercase" | "lowercase" | "capitalize";
            'letter-spacing': string;
            padding: string;
        };
    };
    blend: {
        'color-burn': {
            'mix-blend-mode': string;
        };
        'color-dodge': {
            'mix-blend-mode': string;
        };
        'hard-light': {
            'mix-blend-mode': string;
        };
        'soft-light': {
            'mix-blend-mode': string;
        };
        color: {
            'mix-blend-mode': string;
        };
        darken: {
            'mix-blend-mode': string;
        };
        difference: {
            'mix-blend-mode': string;
        };
        exclusion: {
            'mix-blend-mode': string;
        };
        hue: {
            'mix-blend-mode': string;
        };
        inherit: {
            'mix-blend-mode': string;
        };
        lighten: {
            'mix-blend-mode': string;
        };
        luminosity: {
            'mix-blend-mode': string;
        };
        multiply: {
            'mix-blend-mode': string;
        };
        normal: {
            'mix-blend-mode': string;
        };
        overlay: {
            'mix-blend-mode': string;
        };
        saturation: {
            'mix-blend-mode': string;
        };
        screen: {
            'mix-blend-mode': string;
        };
    };
    'backdrop-blur': {
        0: {
            'backdrop-filter': string;
        };
        '*': {
            'backdrop-filter': string;
        };
    };
    invert: {
        full: {
            filter: string;
        };
        none: {
            filter: string;
        };
        '*': {
            filter: string;
        };
    };
    grayscale: {
        full: {
            filter: string;
        };
        none: {
            filter: string;
        };
        '*': {
            filter: string;
        };
    };
    content: {
        '*': {
            content: string;
        };
    };
    attr: {
        '*': {
            content: string;
        };
    };
    'col-count': {
        1: {
            'column-count': number;
        };
        2: {
            'column-count': number;
        };
        3: {
            'column-count': number;
        };
        4: {
            'column-count': number;
        };
        5: {
            'column-count': number;
        };
        '*': {
            'column-count': string;
        };
    };
    'col-bw': {
        _common: {
            'column-rule-width': string;
        };
        0: {
            'column-rule-width': string;
        };
        '*': {
            'column-rule-width': string;
        };
    };
    'col-span': {
        all: {
            'column-span': string;
        };
        none: {
            'column-span': string;
        };
    };
    cursor: {
        pointer: {
            cursor: string;
        };
        default: {
            cursor: string;
        };
        '*': {
            cursor: string;
        };
    };
    'break-before': {
        yes: {
            'break-before': string;
        };
        no: {
            'break-before': string;
        };
    };
    'break-after': {
        yes: {
            'break-after': string;
        };
        no: {
            'break-after': string;
        };
    };
    'break-inside': {
        yes: {
            'break-inside': string;
        };
        no: {
            'break-inside': string;
        };
    };
    d: {
        none: {
            display: string;
        };
        block: {
            display: string;
        };
        inline: {
            display: string;
        };
        inblock: {
            display: string;
        };
        flx: {
            display: string;
        };
        inflx: {
            display: string;
        };
        table: {
            display: string;
        };
        trow: {
            display: string;
        };
        tcell: {
            display: string;
        };
        litem: {
            display: string;
        };
    };
    fh: {
        _common: {
            'font-weight': any;
        };
        1: {
            'font-size': any;
            'margin-bottom': any;
        };
        2: {
            'font-size': any;
            'margin-bottom': any;
        };
        3: {
            'font-size': any;
            'margin-bottom': any;
        };
        4: {
            'font-size': any;
            'margin-bottom': any;
        };
        5: {
            'font-size': any;
            'margin-bottom': any;
        };
        6: {
            'font-size': any;
            'margin-bottom': any;
        };
    };
    fp: {
        1: {
            'font-size': any;
            'margin-bottom': any;
        };
        2: {
            'font-size': any;
            'margin-bottom': any;
        };
        3: {
            'font-size': any;
            'margin-bottom': any;
        };
        4: {
            'font-size': any;
            'margin-bottom': any;
        };
        5: {
            'font-size': any;
            'margin-bottom': any;
        };
        6: {
            'font-size': any;
            'margin-bottom': any;
        };
    };
    fs: {
        inherit: {
            'font-size': string;
        };
        h1: {
            'font-size': any;
        };
        h2: {
            'font-size': any;
        };
        h3: {
            'font-size': any;
        };
        h4: {
            'font-size': any;
        };
        h5: {
            'font-size': any;
        };
        h6: {
            'font-size': any;
        };
        p1: {
            'font-size': any;
        };
        p2: {
            'font-size': any;
        };
        p3: {
            'font-size': any;
        };
        p4: {
            'font-size': any;
        };
        p5: {
            'font-size': any;
        };
        p6: {
            'font-size': any;
        };
        i1: {
            'font-size': any;
        };
        i2: {
            'font-size': any;
        };
        i3: {
            'font-size': any;
        };
        i4: {
            'font-size': any;
        };
        i5: {
            'font-size': any;
        };
        i6: {
            'font-size': any;
        };
        '*': {
            'font-size': string;
        };
    };
    fw: {
        light: {
            'font-weight': any;
        };
        regular: {
            'font-weight': any;
        };
        normal: {
            'font-weight': any;
        };
        medium: {
            'font-weight': any;
        };
        semi: {
            'font-weight': any;
        };
        bold: {
            'font-weight': any;
        };
        extra: {
            'font-weight': any;
        };
        heading: {
            'font-weight': any;
        };
    };
    fi: {
        yes: {
            'font-style': string;
        };
        no: {
            'font-style': string;
        };
    };
    'flx-col-align-self': {
        'top-left': {
            'justify-self': string;
            'align-self': string;
        };
        'top-center': {
            'justify-self': string;
            'align-self': string;
        };
        'top-right': {
            'justify-self': string;
            'align-self': string;
        };
        'center-left': {
            'justify-self': string;
            'align-self': string;
        };
        'center-center': {
            'justify-self': string;
            'align-self': string;
        };
        'center-right': {
            'justify-self': string;
            'align-self': string;
        };
        'bottom-left': {
            'justify-self': string;
            'align-self': string;
        };
        'bottom-center': {
            'justify-self': string;
            'align-self': string;
        };
        'bottom-right': {
            'justify-self': string;
            'align-self': string;
        };
    };
    'flx-col-align': {
        _common: {
            display: string;
            'flex-direction': string;
        };
        'top-left': {
            'justify-content': string;
            'align-items': string;
        };
        'top-center': {
            'justify-content': string;
            'align-items': string;
        };
        'top-right': {
            'justify-content': string;
            'align-items': string;
        };
        'center-left': {
            'justify-content': string;
            'align-items': string;
        };
        'center-center': {
            'justify-content': string;
            'align-items': string;
        };
        'center-right': {
            'justify-content': string;
            'align-items': string;
        };
        'bottom-left': {
            'justify-content': string;
            'align-items': string;
        };
        'bottom-center': {
            'justify-content': string;
            'align-items': string;
        };
        'bottom-right': {
            'justify-content': string;
            'align-items': string;
        };
        'between-left': {
            'justify-content': string;
            'align-items': string;
        };
        'between-center': {
            'justify-content': string;
            'align-items': string;
        };
        'between-right': {
            'justify-content': string;
            'align-items': string;
        };
    };
    'flx-row-align-self': {
        none: {
            'align-self': string;
            'justify-self': string;
        };
        'top-left': {
            'align-self': string;
            'justify-self': string;
        };
        'top-center': {
            'align-self': string;
            'justify-self': string;
        };
        'top-right': {
            'align-self': string;
            'justify-self': string;
        };
        'center-left': {
            'align-self': string;
            'justify-self': string;
        };
        'center-center': {
            'align-self': string;
            'justify-self': string;
        };
        'center-right': {
            'align-self': string;
            'justify-self': string;
        };
        'bottom-left': {
            'align-self': string;
            'justify-self': string;
        };
        'bottom-center': {
            'align-self': string;
            'justify-self': string;
        };
        'bottom-right': {
            'align-self': string;
            'justify-self': string;
        };
    };
    'flx-row-align': {
        _common: {
            display: string;
            'flex-direction': string;
        };
        'top-left': {
            'align-items': string;
            'justify-content': string;
        };
        'top-center': {
            'align-items': string;
            'justify-content': string;
        };
        'top-right': {
            'align-items': string;
            'justify-content': string;
        };
        'top-between': {
            'align-items': string;
            'justify-content': string;
        };
        'center-left': {
            'align-items': string;
            'justify-content': string;
        };
        'center-center': {
            'align-items': string;
            'justify-content': string;
        };
        'center-right': {
            'align-items': string;
            'justify-content': string;
        };
        'center-between': {
            'align-items': string;
            'justify-content': string;
        };
        'bottom-left': {
            'align-items': string;
            'justify-content': string;
        };
        'bottom-center': {
            'align-items': string;
            'justify-content': string;
        };
        'bottom-right': {
            'align-items': string;
            'justify-content': string;
        };
        'bottom-between': {
            'align-items': string;
            'justify-content': string;
        };
        'stretch-left': {
            'align-items': string;
            'justify-content': string;
        };
        'stretch-center': {
            'align-items': string;
            'justify-content': string;
        };
        'stretch-right': {
            'align-items': string;
            'justify-content': string;
        };
        'stretch-between': {
            'align-items': string;
            'justify-content': string;
        };
    };
    'flx-dir': {
        col: {
            'flex-direction': string;
        };
        row: {
            'flex-direction': string;
        };
        colrev: {
            'flex-direction': string;
        };
        rowrev: {
            'flex-direction': string;
        };
    };
    'flx-justify-content': {
        center: {
            'justify-content': string;
        };
        start: {
            'justify-content': string;
        };
        end: {
            'justify-content': string;
        };
        between: {
            'justify-content': string;
        };
        around: {
            'justify-content': string;
        };
    };
    'flx-align-items': {
        center: {
            'align-items': string;
        };
        start: {
            'align-items': string;
        };
        end: {
            'align-items': string;
        };
    };
    ofit: {
        none: {
            'object-fit': string;
        };
        contain: {
            'object-fit': string;
        };
        cover: {
            'object-fit': string;
        };
        fill: {
            'object-fit': string;
        };
        scaledown: {
            'object-fit': string;
        };
    };
    opos: {
        none: {
            'object-position': string;
        };
        center: {
            'object-position': string;
        };
        '*': {
            'object-position': string;
        };
    };
    'flx-order': {
        n1: {
            order: number;
        };
        0: {
            order: number;
        };
        1: {
            order: number;
        };
        2: {
            order: number;
        };
        3: {
            order: number;
        };
        4: {
            order: number;
        };
        5: {
            order: number;
        };
        6: {
            order: number;
        };
        7: {
            order: number;
        };
        8: {
            order: number;
        };
        9: {
            order: number;
        };
        10: {
            order: number;
        };
        11: {
            order: number;
        };
        12: {
            order: number;
        };
        '*': {
            order: string;
        };
    };
    'flx-wrap': {
        yes: {
            'flex-wrap': string;
        };
        no: {
            'flex-wrap': string;
        };
        rev: {
            'flex-wrap': string;
        };
    };
    flx: {
        fill: {
            flex: string;
        };
        '*': {
            flex: string;
        };
    };
    'flx-grow': {
        0: {
            'flex-grow': string;
        };
        1: {
            'flex-grow': string;
        };
    };
    'flx-shrink': {
        0: {
            'flex-shrink': string;
        };
        1: {
            'flex-shrink': string;
        };
    };
    'flx-basis': {
        auto: {
            'flex-basis': string;
        };
    };
    float: {
        left: {
            float: string;
        };
        right: {
            float: string;
        };
        none: {
            float: string;
        };
    };
    'list-style': {
        none: {
            'list-style': string;
            margin: number;
            padding: number;
        };
        '*': {
            'list-style': string;
        };
    };
    'list-style-position': {
        inside: {
            'list-style-position': string;
        };
        outside: {
            'list-style-position': string;
        };
        '*': {
            'list-style-position': string;
        };
    };
    'linear-gradient': {
        '*': {
            background: string;
        };
    };
    lh: {
        0: {
            'line-height': number;
        };
        1: {
            'line-height': number;
        };
        1.125: {
            'line-height': number;
        };
        1.25: {
            'line-height': number;
        };
        1.375: {
            'line-height': number;
        };
        1.5: {
            'line-height': number;
        };
        1.625: {
            'line-height': number;
        };
        1.75: {
            'line-height': number;
        };
        1.875: {
            'line-height': number;
        };
        2: {
            'line-height': number;
        };
        2.25: {
            'line-height': number;
        };
        2.5: {
            'line-height': number;
        };
        2.75: {
            'line-height': number;
        };
        3: {
            'line-height': number;
        };
        3.5: {
            'line-height': number;
        };
        4: {
            'line-height': number;
        };
        5: {
            'line-height': number;
        };
        '*': {
            'line-height': string;
        };
    };
    ls: {
        'n.2': {
            'letter-spacing': string;
        };
        'n.18': {
            'letter-spacing': string;
        };
        'n.16': {
            'letter-spacing': string;
        };
        'n.14': {
            'letter-spacing': string;
        };
        'n.12': {
            'letter-spacing': string;
        };
        'n.1': {
            'letter-spacing': string;
        };
        'n.08': {
            'letter-spacing': string;
        };
        'n.06': {
            'letter-spacing': string;
        };
        'n.04': {
            'letter-spacing': string;
        };
        'n.02': {
            'letter-spacing': string;
        };
        0: {
            'letter-spacing': number;
        };
        '.02': {
            'letter-spacing': string;
        };
        '.04': {
            'letter-spacing': string;
        };
        '.06': {
            'letter-spacing': string;
        };
        '.08': {
            'letter-spacing': string;
        };
        '.1': {
            'letter-spacing': string;
        };
        '.12': {
            'letter-spacing': string;
        };
        '.14': {
            'letter-spacing': string;
        };
        '.16': {
            'letter-spacing': string;
        };
        '.18': {
            'letter-spacing': string;
        };
        '.2': {
            'letter-spacing': string;
        };
        '.4': {
            'letter-spacing': string;
        };
        '.6': {
            'letter-spacing': string;
        };
        '.8': {
            'letter-spacing': string;
        };
        1: {
            'letter-spacing': string;
        };
        2: {
            'letter-spacing': string;
        };
        '*': {
            'letter-spacing': string;
        };
    };
    opacity: {
        0: {
            opacity: number;
        };
        10: {
            opacity: number;
        };
        20: {
            opacity: number;
        };
        30: {
            opacity: number;
        };
        40: {
            opacity: number;
        };
        50: {
            opacity: number;
        };
        60: {
            opacity: number;
        };
        70: {
            opacity: number;
        };
        80: {
            opacity: number;
        };
        90: {
            opacity: number;
        };
        100: {
            opacity: number;
        };
        '*': {
            opacity: string;
        };
    };
    outline: {
        none: {
            outline: string;
        };
        '*': {
            outline: string;
        };
    };
    ow: {
        _common: {
            'outline-style': string;
        };
        0: {
            'outline-width': string;
        };
        '*': {
            'outline-width': string;
        };
    };
    oo: {
        0: {
            'outline-offset': string;
        };
        '*': {
            'outline-offset': string;
        };
    };
    'pos-align': {
        _common: {
            position: string;
        };
        none: {
            position: string;
            bottom: number;
            left: number;
            right: number;
            top: number;
            transform: string;
        };
        'top-left': {
            bottom: string;
            left: number;
            right: string;
            top: number;
            transform: string;
        };
        'top-center': {
            bottom: string;
            left: string;
            right: string;
            top: number;
            transform: string;
        };
        'top-right': {
            bottom: string;
            left: string;
            right: number;
            top: number;
            transform: string;
        };
        'center-left': {
            bottom: string;
            left: number;
            right: string;
            top: string;
            transform: string;
        };
        'center-center': {
            bottom: string;
            left: string;
            right: string;
            top: string;
            transform: string;
        };
        'center-right': {
            bottom: string;
            left: string;
            right: number;
            top: string;
            transform: string;
        };
        'bottom-left': {
            bottom: number;
            left: number;
            right: string;
            top: string;
            transform: string;
        };
        'bottom-center': {
            bottom: number;
            left: string;
            right: string;
            top: string;
            transform: string;
        };
        'bottom-right': {
            bottom: number;
            left: string;
            right: number;
            top: string;
            transform: string;
        };
        'bottom-stretch': {
            bottom: number;
            left: number;
            right: number;
            top: string;
            transform: string;
        };
        'top-stretch': {
            bottom: string;
            left: number;
            right: number;
            top: number;
            transform: string;
        };
    };
    'pos-overlay': {
        _common: {
            top: number;
            bottom: number;
            left: number;
            right: number;
        };
        abs: {
            position: string;
        };
        fix: {
            position: string;
        };
    };
    'pos-overlay-link': {
        _common: {
            border: string;
            bottom: number;
            cursor: string;
            'font-size': number;
            left: number;
            'line-height': number;
            margin: number;
            opacity: number;
            overflow: string;
            padding: number;
            right: number;
            top: number;
            'white-space': string;
            'z-index': number;
        };
        abs: {
            position: string;
        };
        fix: {
            position: string;
        };
    };
    pos: {
        abs: {
            position: string;
        };
        fix: {
            position: string;
        };
        rel: {
            position: string;
        };
        static: {
            position: string;
        };
        sticky: {
            position: string;
        };
    };
    'pointer-events': {
        disabled: {
            'pointer-events': string;
        };
        active: {
            'pointer-events': string;
        };
    };
    scrollable: {
        _common: {
            'flex-wrap': string;
        };
        all: {
            overflow: string;
        };
        visible: {
            overflow: string;
        };
        none: {
            overflow: string;
            'flex-wrap': string;
        };
        hidden: {
            overflow: string;
        };
        x: {
            'overflow-x': string;
            'overflow-y': string;
        };
        y: {
            'overflow-y': string;
            'overflow-x': string;
        };
    };
    visible: {
        yes: {
            visibility: string;
        };
        no: {
            visibility: string;
        };
    };
    transition: {
        all: {
            transition: string;
        };
        bgc: {
            transition: string;
        };
        fc: {
            transition: string;
        };
        w: {
            transition: string;
        };
        h: {
            transition: string;
        };
        hmax: {
            transition: string;
        };
        transform: {
            transition: string;
        };
        opacity: {
            transition: string;
        };
        none: {
            transition: string;
        };
        '*': {
            transition: string;
        };
    };
    rotate: {
        n180: {
            transform: string;
        };
        n135: {
            transform: string;
        };
        n90: {
            transform: string;
        };
        n45: {
            transform: string;
        };
        0: {
            transform: string;
        };
        45: {
            transform: string;
        };
        90: {
            transform: string;
        };
        135: {
            transform: string;
        };
        180: {
            transform: string;
        };
        '*': {
            transform: string;
        };
    };
    translate: {
        0: {
            transform: string;
        };
        '*': {
            transform: string;
        };
    };
    'translate-x': {
        n50: {
            transform: string;
        };
        n100: {
            transform: string;
        };
        0: {
            transform: string;
        };
        50: {
            transform: string;
        };
        100: {
            transform: string;
        };
        '*': {
            transform: string;
        };
    };
    'translate-y': {
        n50: {
            transform: string;
        };
        n100: {
            transform: string;
        };
        0: {
            transform: string;
        };
        50: {
            transform: string;
        };
        100: {
            transform: string;
        };
        '*': {
            transform: string;
        };
    };
    'translate-z': {
        n100: {
            transform: string;
        };
        0: {
            transform: string;
        };
        100: {
            transform: string;
        };
        '*': {
            transform: string;
        };
    };
    scale: {
        default: {
            transform: string;
        };
        '*': {
            transform: string;
        };
    };
    'transform-o': {
        0: {
            'transform-origin': string;
        };
        '100-0': {
            'transform-origin': string;
        };
    };
    'txt-align': {
        left: {
            'text-align': string;
        };
        center: {
            'text-align': string;
        };
        right: {
            'text-align': string;
        };
        justify: {
            'text-align': string;
        };
    };
    'txt-shadow': {
        '*': {
            'text-shadow': string;
        };
    };
    'txt-wrap': {
        yes: {
            'white-space': string;
        };
        no: {
            'white-space': string;
        };
        '*': {
            'white-space': string;
        };
    };
    'txt-case': {
        none: {
            'text-transform': string;
        };
        lower: {
            'text-transform': string;
        };
        upper: {
            'text-transform': string;
        };
        title: {
            'text-transform': string;
        };
    };
    'txt-truncate': {
        yes: {
            overflow: string;
            'text-overflow': string;
            'white-space': string;
        };
        no: {
            overflow: string;
            'text-overflow': string;
            'white-space': string;
        };
    };
    'txt-underline': {
        yes: {
            'text-decoration': string;
        };
        no: {
            'text-decoration': string;
        };
    };
    'txt-line-through': {
        yes: {
            'text-decoration': string;
        };
        no: {
            'text-decoration': string;
        };
    };
    'v-align': {
        none: {
            'vertical-align': string;
        };
        top: {
            'vertical-align': string;
        };
        middle: {
            'vertical-align': string;
        };
        bottom: {
            'vertical-align': string;
        };
        sub: {
            'vertical-align': string;
        };
        sup: {
            'vertical-align': string;
        };
        '*': {
            'vertical-align': string;
        };
    };
    'stroke-width': {
        0: {
            'stroke-width': number;
        };
        1: {
            'stroke-width': number;
        };
        1.1: {
            'stroke-width': number;
        };
        1.2: {
            'stroke-width': number;
        };
        1.3: {
            'stroke-width': number;
        };
        1.4: {
            'stroke-width': number;
        };
        1.5: {
            'stroke-width': number;
        };
        1.6: {
            'stroke-width': number;
        };
        1.7: {
            'stroke-width': number;
        };
        1.8: {
            'stroke-width': number;
        };
        1.9: {
            'stroke-width': number;
        };
        2: {
            'stroke-width': number;
        };
        3: {
            'stroke-width': number;
        };
        4: {
            'stroke-width': number;
        };
        '*': {
            'stroke-width': string;
        };
    };
    w: {
        '100vw': {
            width: string;
        };
        cover: {
            left: string;
            'margin-left': string;
            'margin-right': string;
            position: string;
            right: string;
            width: string;
        };
        auto: {
            width: string;
        };
        0: {
            width: number;
        };
        5: {
            width: string;
        };
        10: {
            width: string;
        };
        15: {
            width: string;
        };
        20: {
            width: string;
        };
        25: {
            width: string;
        };
        30: {
            width: string;
        };
        33: {
            width: string;
        };
        35: {
            width: string;
        };
        40: {
            width: string;
        };
        45: {
            width: string;
        };
        50: {
            width: string;
        };
        55: {
            width: string;
        };
        60: {
            width: string;
        };
        65: {
            width: string;
        };
        66: {
            width: string;
        };
        70: {
            width: string;
        };
        75: {
            width: string;
        };
        80: {
            width: string;
        };
        85: {
            width: string;
        };
        90: {
            width: string;
        };
        95: {
            width: string;
        };
        100: {
            width: string;
        };
        '*': {
            width: string;
        };
    };
    wmax: {
        narrow: {
            'max-width': any;
        };
        normal: {
            'max-width': any;
        };
        wide: {
            'max-width': any;
        };
        vast: {
            'max-width': any;
        };
        extra: {
            'max-width': any;
        };
        5: {
            'max-width': string;
        };
        10: {
            'max-width': string;
        };
        15: {
            'max-width': string;
        };
        20: {
            'max-width': string;
        };
        25: {
            'max-width': string;
        };
        30: {
            'max-width': string;
        };
        33: {
            'max-width': string;
        };
        35: {
            'max-width': string;
        };
        40: {
            'max-width': string;
        };
        45: {
            'max-width': string;
        };
        50: {
            'max-width': string;
        };
        55: {
            'max-width': string;
        };
        60: {
            'max-width': string;
        };
        65: {
            'max-width': string;
        };
        66: {
            'max-width': string;
        };
        70: {
            'max-width': string;
        };
        75: {
            'max-width': string;
        };
        80: {
            'max-width': string;
        };
        85: {
            'max-width': string;
        };
        90: {
            'max-width': string;
        };
        95: {
            'max-width': string;
        };
        100: {
            'max-width': string;
        };
        '*': {
            'max-width': string;
        };
    };
    wmin: {
        '100vw': {
            'min-width': string;
        };
        narrow: {
            'min-width': any;
        };
        normal: {
            'min-width': any;
        };
        wide: {
            'min-width': any;
        };
        vast: {
            'min-width': any;
        };
        extra: {
            'min-width': any;
        };
        5: {
            'min-width': string;
        };
        10: {
            'min-width': string;
        };
        15: {
            'min-width': string;
        };
        20: {
            'min-width': string;
        };
        25: {
            'min-width': string;
        };
        30: {
            'min-width': string;
        };
        33: {
            'min-width': string;
        };
        35: {
            'min-width': string;
        };
        40: {
            'min-width': string;
        };
        45: {
            'min-width': string;
        };
        50: {
            'min-width': string;
        };
        55: {
            'min-width': string;
        };
        60: {
            'min-width': string;
        };
        65: {
            'min-width': string;
        };
        66: {
            'min-width': string;
        };
        70: {
            'min-width': string;
        };
        75: {
            'min-width': string;
        };
        80: {
            'min-width': string;
        };
        85: {
            'min-width': string;
        };
        90: {
            'min-width': string;
        };
        95: {
            'min-width': string;
        };
        100: {
            'min-width': string;
        };
        '*': {
            'min-width': string;
        };
    };
    wcalc: {
        '*': {
            width: string;
        };
    };
    wmaxcalc: {
        '*': {
            'max-width': string;
        };
    };
    wmincalc: {
        '*': {
            'min-width': string;
        };
    };
    h: {
        '100vh': {
            height: string;
        };
        auto: {
            height: string;
        };
        0: {
            height: number;
        };
        100: {
            height: string;
        };
        '*': {
            height: string;
        };
    };
    hmax: {
        '100vh': {
            'max-height': string;
        };
        none: {
            'max-height': string;
        };
        100: {
            'max-height': string;
        };
        0: {
            'max-height': string;
        };
        '*': {
            'max-height': string;
        };
    };
    hmin: {
        '100vh': {
            'min-height': string;
        };
        auto: {
            'min-height': string;
        };
        100: {
            'min-height': string;
        };
        '*': {
            'min-height': string;
        };
    };
    hcalc: {
        '*': {
            height: string;
        };
    };
    hmaxcalc: {
        '*': {
            'max-height': string;
        };
    };
    hmincalc: {
        '*': {
            'min-height': string;
        };
    };
    square: {
        auto: {
            width: string;
            height: string;
        };
        0: {
            width: number;
            height: number;
        };
        '*': {
            width: string;
            height: string;
        };
    };
    z: {
        n: {
            'z-index': number;
        };
        0: {
            'z-index': number;
        };
        1: {
            'z-index': number;
        };
        3: {
            'z-index': number;
        };
        6: {
            'z-index': number;
        };
        9: {
            'z-index': number;
        };
        99: {
            'z-index': number;
        };
        999: {
            'z-index': number;
        };
        9999: {
            'z-index': number;
        };
        '*': {
            'z-index': string;
        };
    };
    'ss-type': {
        none: {
            'scroll-snap-type': string;
        };
        both: {
            'scroll-snap-type': string;
        };
    };
    'ss-align': {
        none: {
            'scroll-snap-align': string;
        };
        start: {
            'scroll-snap-align': string;
        };
    };
    'sm-top': {
        '*': {
            'scroll-margin-top': string;
        };
    };
};
export declare const getMapleUtilityVariableMap: ({ color, spacer, fontFamily, }: MapleVariableModel) => {
    prefix: string;
    map: any;
    props: string[];
}[];
