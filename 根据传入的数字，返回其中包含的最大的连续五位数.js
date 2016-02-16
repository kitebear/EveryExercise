function maxFiveDigits1(num){
      num = num + "";//转换为字符

      var max = 0,//最大值
          now = 0;//当前值    

      for(var i = 0,n=num.length-4;i<n;i++){
         now = num.substring(i,i+5);//获得连续5位数

         if(now > max)//如果当前值比最大值大 交换位置
           max = now;
      }

      return max;
   }
   
function maxFiveDigits(num) {
  //TODO:完成该函数
  num = '' + num;
  var start = num.length - 5;
  if (start < 0) throw new Error('Parameter illegal');

  var last = +num.substring(start);
  return start == 0 ? last : num.split('').reduceRight(function (pre, cur, index, array) {
                            return (index < start) ? (last = Math.max(num.substring(index, index+5), last)) : last;
                          });
}

console.log(maxFiveDigits(283910356876));
