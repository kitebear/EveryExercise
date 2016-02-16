;(function(name,definition){
    "use strict";
    // 兼容上下文环境是否为AMD或CMD
    var hasDefine = typeof define === 'function',
        // 检查上下文环境是否为node
        hasExports = typeof module !== 'undefined' && module.exports;

    if (hasDefine){
        // AMD 或者 CMD 环境
        define(definition);
    }else if(hasExports){
        // 定义为普通Node模块
        module.exports = definition();
    }else{
        // 定义在window中
        this[name] = definition();
    }
})('hello',function(){
    "use strict";
    var hello = function() {};
    return hello;
});