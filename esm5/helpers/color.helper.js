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
export { MapleColorHelper };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3IuaGVscGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbWFwbGUvIiwic291cmNlcyI6WyJoZWxwZXJzL2NvbG9yLmhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw2QkFBNkI7QUFDN0I7SUFBQTtJQTBEQSxDQUFDO0lBekRlLGlDQUFnQixHQUE5QixVQUErQixRQUFnQjtRQUM3QyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2IsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUNELElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3BDLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDcEIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzNEO1FBQ0QsSUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3pDLElBQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN6QyxJQUFNLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDekMsSUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUNqRCxP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O0lBQ2YsQ0FBQztJQUNILHVCQUFDO0FBQUQsQ0FBQyxBQTFERCxJQTBEQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRzbGludDpkaXNhYmxlOiBuby1iaXR3aXNlXG5leHBvcnQgY2xhc3MgTWFwbGVDb2xvckhlbHBlciB7XG4gIHB1YmxpYyBzdGF0aWMgZ2V0Q29udHJhc3RDb2xvcihoZXhDb2xvcjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAoIWhleENvbG9yKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIGxldCBoZXggPSBoZXhDb2xvci5yZXBsYWNlKCcjJywgJycpO1xuICAgIGlmIChoZXgubGVuZ3RoID09PSAzKSB7XG4gICAgICBoZXggPSBoZXhbMF0gKyBoZXhbMF0gKyBoZXhbMV0gKyBoZXhbMV0gKyBoZXhbMl0gKyBoZXhbMl07XG4gICAgfVxuICAgIGNvbnN0IHIgPSBwYXJzZUludChoZXguc3Vic3RyKDAsIDIpLCAxNik7XG4gICAgY29uc3QgZyA9IHBhcnNlSW50KGhleC5zdWJzdHIoMiwgMiksIDE2KTtcbiAgICBjb25zdCBiID0gcGFyc2VJbnQoaGV4LnN1YnN0cig0LCAyKSwgMTYpO1xuICAgIGNvbnN0IHlpcSA9IChyICogMjk5ICsgZyAqIDU4NyArIGIgKiAxMTQpIC8gMTAwMDtcbiAgICByZXR1cm4geWlxID49IDEyOCA/ICcjMDAwJyA6ICcjZmZmJztcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgYWxwaGEyaGV4KGFscGhhOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGFscGhhID0gKCgxIDw8IDgpICsgTWF0aC5yb3VuZChwYXJzZUZsb2F0KGFscGhhKSAqIDI1NSkpXG4gICAgICAudG9TdHJpbmcoMTYpXG4gICAgICAuc2xpY2UoMSk7XG4gICAgcmV0dXJuIGFscGhhID09PSAnZmYnID8gJycgOiBhbHBoYTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaGV4OChoZXg6IHN0cmluZywgb3BhY2l0eTogbnVtYmVyID0gMSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGAjJHtNYXBsZUNvbG9ySGVscGVyLmhleDJTaG9ydChcbiAgICAgIGhleC5yZXBsYWNlKFxuICAgICAgICAvXiM/KFthLWZcXGRdKShbYS1mXFxkXSkoW2EtZlxcZF0pJC9pLFxuICAgICAgICAobSwgciwgZywgYikgPT4gJyMnICsgciArIHIgKyBnICsgZyArIGIgKyBiLFxuICAgICAgKSArIE1hcGxlQ29sb3JIZWxwZXIuYWxwaGEyaGV4KG9wYWNpdHkudG9TdHJpbmcoKSksXG4gICAgKX1gO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBoZXgyU2hvcnQoaGV4OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmIChoZXgubGVuZ3RoID4gNikge1xuICAgICAgY29uc3QgaGV4QXJyID0gaGV4LnJlcGxhY2UoJyMnLCAnJykuc3BsaXQoJycpO1xuICAgICAgcmV0dXJuIGhleEFyclswXSA9PT0gaGV4QXJyWzFdICYmXG4gICAgICAgIGhleEFyclsyXSA9PT0gaGV4QXJyWzNdICYmXG4gICAgICAgIGhleEFycls0XSA9PT0gaGV4QXJyWzVdICYmXG4gICAgICAgIGhleEFycls2XSA9PT0gaGV4QXJyWzddXG4gICAgICAgID8gaGV4QXJyWzBdICsgaGV4QXJyWzJdICsgaGV4QXJyWzRdICsgKGhleEFycls2XSB8fCAnJylcbiAgICAgICAgOiBoZXhBcnIuam9pbignJyk7XG4gICAgfVxuICAgIHJldHVybiBoZXg7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdlbmVyYXRlQWxwaGFDb2xvcnMoY29sb3I6IGFueSk6IHN0cmluZyB7XG4gICAgT2JqZWN0LmtleXMoY29sb3IpXG4gICAgICAuZmlsdGVyKChrZXkpID0+IGNvbG9yW2tleV0uY2hhckF0KDApID09PSAnIycgJiYga2V5ICE9PSAndHJhbnNwYXJlbnQnKVxuICAgICAgLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBbMC45LCAwLjgsIDAuNywgMC42LCAwLjUsIDAuNCwgMC4zLCAwLjIsIDAuMV0uZm9yRWFjaCgob3BhY2l0eSkgPT4ge1xuICAgICAgICAgIGNvbG9yW2Ake2tleX0tJHtvcGFjaXR5ICogMTAwfWBdID0gTWFwbGVDb2xvckhlbHBlci5oZXg4KFxuICAgICAgICAgICAgY29sb3Jba2V5XSxcbiAgICAgICAgICAgIG9wYWNpdHksXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICByZXR1cm4gY29sb3I7XG4gIH1cbn1cbiJdfQ==