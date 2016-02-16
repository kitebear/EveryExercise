var obj1 = {
    a: 1,
    b: {m: 2},
    c: [9, 0]
};

var obj2 = deepCopy(obj1);

obj2.b = {m: 11};
obj2.c = 1;
console.log(obj1.b.m);  //打印2，而不是11
console.log(obj1.c);  //打印数组[9, 0]，而不是1

function deepCopy(obj){
	var newObj = {};
	if(!obj instanceof Object || obj.length){
		return newObj;
	}

	for(var i in obj){
		if(obj[i] instanceof Object){
			newObj[i] = deepCopy(obj[i]);
		}else{
			newObj[i] = obj[i];
		}
	}

	return newObj;
}

 function deepCopy2(obj) {
        //TODO: 实现深拷贝
        var newObj;
        newObj = obj.constructor == Object?Object.create(obj):{};
        return newObj;
    }

