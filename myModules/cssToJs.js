const csstree = require("css-tree");

var cssToJs = str => {
    var ast = csstree.parse(str, {
        parseAtrulePrelude: false,
        parseRulePrelude: false,
        parseValue: false,
    });


    return csstree.toPlainObject(ast);
}

module.exports = cssToJs;