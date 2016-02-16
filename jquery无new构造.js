var $ = jQuery = function(){
    return new jQuery.fn.init();
}

jQuery.fn = jQuery.prototype = {
    init:function(){
        return this;
    },
    jquery:"1.2.3",
    length:100
}

jQuery.fn.init.prototype = jQuery.fn;

alert($().length);
