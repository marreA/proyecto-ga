

(() =>{
   "use strict";
   const LoopType = (type,children) => {
       AbstractType.call(this, type, children);
   };
   LoopType.prototype = Object.create(AbstractType.prototype);
   LoopType.prototype.constructor = LoopType;
   
   module.exports(LoopType);
})();