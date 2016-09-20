(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory();
    } else {
        root.format = factory();
    }
})(this, function() {
    var lib = {};

    lib.VERSION = '0.0.1';

    lib.settings = {
        unit: 1,
        symbol: '',
        suffix: '%',
        decimal: '.',
        precision: 2,
        separator: ',',
        format: '%v%s'
    }

    var isString = Object.prototype.toString;

    function isArray(input) {
        return isString.call(input) === "[object Array]";
    }

    function isNum(input) {
        return isString.call(input) === "[object Number]";
    }

    function isObj(input) {
        return isString.call(input) === "[object Object]";
    }

    function defaults(defs, obj) {
        for (var key in defs) {
            if (!obj.hasOwnProperty(key) || obj[key] == null) {
                obj[key] = defs[key];
            }
        }
        return obj;
    };

    var parse = lib.parse = function(value, decimal) {
        if (isArray(value)) {
            return value.map(item => {
                return parse(item);
            })
        }

        if (isNum(value)) return value;

        decimal = decimal || lib.settings.decimal;

        var reg = new RegExp('[^0-9-' + decimal + ']', 'g');

        var unformatted = parseFloat(
            ('' + value)
            .replace(reg, '')
            .replace(decimal, '.')
        )

        return isNaN(unformatted) ? 0 : unformatted;
    }

    var toFixed = lib.toFixed = function(value, precision) {
        var pow = Math.pow(10, precision);
        return (Math.round(parse(value) * pow) / pow).toFixed(precision);
    }

    lib.format = function format(value, precision, pattern, symbol, unit, separator, decimal) {
        if (isArray(value)) {
            return value.map(item => {
                return format(item, precision, pattern, symbol, unit, separator, decimal);
            })
        }

        value = parse(value);

        var opts = isObj(precision) ? precision : {
                unit: unit,
                symbol: symbol,
                format: pattern,
                decimal: decimal,
                separator: separator,
                precision: precision
            },
            opts = defaults(lib.settings, opts),
            output = '';

        if (opts.format.match("%v")) {
            var negative = value < 0 ? "-" : "",
                fixed = toFixed(Math.abs(value) / opts.unit, opts.precision),
                base = parseInt(fixed, 10) + '',
                mod = base.length > 3 ? base.length % 3 : 0;

            output = negative + (mod ? base.substr(0, mod) + opts.separator : '') + base.substr(mod).replace(/(\d{3})(?=\d)/g, "$1" + opts.separator) + (opts.precision ? opts.decimal + fixed.split('.')[1] : '');
            output = opts.format.replace('%v', output).replace('%s', opts.symbol);
        }

        return output;
    }

    return lib;
});
