/**
 * Created by xiedonghao on 16/2/22.
 */
if(!Function.prototype.bind){
    Function.prototype.bind = function (Othis){
        if(typeof this != 'function'){
            throw ('错误的类型')
        }

        var aArgs = Array.prototype.slice.call(arguments,1)
        var newFn = function(){}
        var oFnThis = this
        var bFunction = function(){
            return oFnThis.apply(this instanceof oFnThis ? this : Othis||this,aArgs.concat(arguments))
        }

        newFn.prototype = oFnThis.prototype
        bFunction.prototype = new newFn()

        return bFunction
    }
}