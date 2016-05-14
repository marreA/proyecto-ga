
(() => {
    "use strict";
    const Var = (type, id) => {
        AbstactType.call(this, type, id);
    };
    Var.prototype = Object.create(AbstactType.prototype);
    Var.prototype.constructor = Var;
    module.exports = Var;
})();