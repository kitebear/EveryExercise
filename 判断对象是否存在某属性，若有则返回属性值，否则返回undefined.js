var o = {
    a : {
        b : {
            c : false
        }
    },
    b : 2
};

//Object.prototype.hash = function(attr){
//    if(!attr || attr.length === 0){
//        return (this.toString() === '[object Object]') ? this : this.toString();
//    }
//
//    if(toString.call(attr) === '[object String]'){
//        attr = attr.split('.');
//    }
//
//    return this.hash.call(this[attr.shift()],attr);
//};
//
//console.log(o.hash('a.b.c'));  //11

Object.prototype.hash = function(attr) {
    console.log(this);
    return attr && attr.split('.').reduce(function(pre, next) {
            console.log(pre.toString(),next);
            return pre && pre[next];
        }, this);
};

var a = {
    a: {
        b: {
            c: 1
        }
    }
}
console.log(a.hash('a.b.c'));

//Object.prototype.hash = function(attr){
//    var obj = this;
//    try{
//        return new Function('obj', 'return obj.'+ attr)(this);
//    }catch(e){
//        return undefined
//    }
//};