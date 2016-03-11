//process.nextTick > setTimeout >= setImmediate

//链式结构     在当前event loop执行之后执行
setImmediate(function () {
    console.log("setImmediate");
});

/**
 * 由于时间循环的特点,定时器的精确度不够.而事实上,采用定时器需要动用红黑树,创建定时器和迭代等操作,而setTimeout(fn,o)的方式比较浪费性能
 */
setTimeout(function () {
    console.log("执行Settimeout");
}, 0);

//在当前 event loop 执行之前  作用和setTimeout相同 比setTimeout更高效
/**
 * 每次调用process.nextTick()的方法,只会将回调函数放入队列中,在下一轮Tick时取出执行,定时器中采用红黑树的操作时间复杂度为O(lg(n)),nextTick()的时间复杂度为O(1)
 */
process.nextTick(function () {
    console.log("process");
});