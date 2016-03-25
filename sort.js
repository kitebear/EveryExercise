// 需要被排序的数组
var data1 = new Date().getTime()
var list = ['Delta', 'alpha', 'CHARLIE', 'bravo'];
// 对需要排序的数字和位置的临时存储
var mapped = list.map(function(el, i) {
    return { index: i, value: el.toLowerCase() };
})

// 按照多个值排序数组
mapped.sort(function(a, b) {
    return +(a.value > b.value) || +(a.value === b.value) - 1;
});

// 根据索引得到排序的结果
var result = mapped.map(function(el){
    return list[el.index];
});

console.log(result)
console.log(new Date().getTime()-data1)

var data1 = new Date().getTime()

var list = ['Delta', 'alpha', 'CHARLIE', 'bravo'];

list.sort(function(a, b) {
    return +(a > b) || +(a === b) - 1;
});

console.log(list)

console.log(new Date().getTime()-data1)