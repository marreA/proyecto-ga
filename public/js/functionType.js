
(() => {
    "use strict";
    const FunctionType = (type, args) => {
        AbstractType.call(type);
        this.args = args;
    };
    FunctionType.prototype = Object.create(AbstractType.prototype);
    FunctionType.prototype.constructor = FunctionType;
    module.exports = FunctionType;
})();