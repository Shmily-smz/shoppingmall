export function 
 //防抖动,
debounce(func,delay){
  let timer=null;            //第一次时间为null，第二次延迟时间50毫秒，延迟的时候进入第三次，清空timer，只会有最后一次，返回新的函数    
  return function(...args){  //...可以传多个参数
     if(timer)clearTimeout(timer);
     timer=setTimeout(()=>{    //settimeout本身是个异步操作，会在都执行完才执行这个，所以不加时间也是会有防抖效果的
      func.apply(this,args)    //apply,改变this指向，要不指向window
     },delay)
  }
}