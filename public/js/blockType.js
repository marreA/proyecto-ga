

(() => {
    "use strict";
    const Block = (name, params) => {
      AbstactType.call(this, name.type);
      this.value = name.value;
      this.params = params;
    };
    Block.prototype = Object.create(AbstactType.prototype);
    Block.prototype.constructor = Block;
    
    module.exports = Block;
})();