var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto)

function def(obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    });
}

//重写数组的方法
//让方法可以支持计算
['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function(method) {
    // 数组元素方法
    var original = arrayProto[method];
    //扩展原型方法
    def(arrayMethods, method, function mutator() {
        //数组计算处理
    });
});

var ObjectC = function(value){
    this.value = value

    //传递  减少作用域查找
    value.__proto__ = arrayProto
}