function sum(x){
    var y = function(x){
        return sum(x+y)
    }

    y.toString = function(){
        console.log("toString "+ x);
        return x;
    }
    y.valueOf = function(){
        console.log("valueOf "+ x);
        return x;
    }
    return y;
}

sum(1)(2)(3);