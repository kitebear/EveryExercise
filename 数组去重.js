//通过遍历新数组来去重

var arr = [1,'b','b',4,3,3,4,5,1];

//第一种
Array.prototype.unique1 = function(){
    var arr1 = []; //定义一个新数组
    for(var i=0;i<this.length;i++){
        if(arr1.indexOf(this[i]) == -1){//判断目标数组中在原数组里是否存在
            arr1.push(this[i]);
        }
    }
    return arr1;
}
console.log(arr); //[1,'b','b',4,3,3,4,5,1]
console.log(arr.unique1()); //[1, "b", 4, 3, 5]
//这种方法的主要思路就是，新建一个数组，然后在原数组中，从第一个开始，看看新数组里面有没有这个元素，如果有，就忽略，然后进行下一个，如果没有，则把这个元素存到新数组里面，
//也就是说，每一次比较，都会遍历新数组，直到找到相同元素为止，比较耗性能


var arr = [1,'b','b',4,3,3,4,5,1];
Array.prototype.unique2 = function(){
    var hash = {}; //定义一个hash表
    var arr1 = [];  //定义一个新数组
    for(var i=0;i<this.length;i++){
        /*
         这里比较难理解，我们一步一步来看：
         hash是一个对象，则存在键值对（key：value），只不过现在是为空的,所以hash[key] = value;
         第一步：i=0;this[i]=this[0]=1; hash[this[0]] = hash[1] , 因为hash初始为空，没有找到key=1的值，所以然后undefined，
         执行下一步：hash[1] = true(此时hash对象就有了第一组键值对)，将原数组的第一个数添加到新数组中，重复第一步
         因为不重复的判断hash的值都是undefined，而重复的都为true了,所以不重复都被添加到新数组中
         因为hash表存的值是存的地址，放在堆内存中，所以有多少个不重复的元素，就要分多少个内存来存放，所以这种方法比较占内存，但是相比之下，这种的运算运动是最快的，
         这也就是用空间来换取时间了，数据量比较小，推荐用此方法
         */
        if(! hash[this[i]]){
            hash[this[i]] = true;
            arr1.push(this[i]);
        }
    }
    return arr1;
}
console.log(arr);
console.log(arr.unique2());


var arr = [1,'b','b',4,3,3,4,5,1];
Array.prototype.unique3 = function(){
    var arr1 = [];  //定义一个新数组
    for(var i=0;i<this.length;i++){
        if(this.indexOf(this[i])==i){
            //这里也是indexOf遍历，看从第一个元素在原数组中的位置，如果第一次出现的位置和下标相等，说明当前元素的不重复的，如果不等，说明该元素前面已经出现过
            arr1.push(this[i]);
        }
    }
    return arr1;
}
console.log(arr);
console.log(arr.unique3());


Array.prototype.unique4 = function(){
    /*
     这里是思路是，先排序（默认从小到大），然后将原数组的第一个给新数组，
     因为是经过排序的，所以重复的只会存在在相邻位置
     这里就相当于是做22比较，如果相等，则进行下一组，如果不相等，则把这个数存到新数组中，用这个数再进行比较
     */
    this.sort();
    var arr1 = [this[0]];
    for(var i=1;i<this.length;i++){
        if(this[i] !== arr1[arr1.length-1]){
            arr1.push(this[i]);
        }
    }
    return arr1;
}
console.log(arr);
console.log(arr.unique4());

Array.prototype.unique5 = function(){
    //双层循环，一一比较
    for(var i=0;i<this.length;i++){ //从0开始
        for(j= i+1;j<this.length;j++){ //从1开始，逐个比较
            if(this[i] === this[j]){ //如果恒定
                this.splice(j,1);   //就将这个元素删掉
            }
        }
    }
    return this;
}
console.log(arr);
console.log(arr.unique5());