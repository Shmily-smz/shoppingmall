export default {
  //   addCart(state, info) {
  //     console.log(product);
  //     const oldInfo = state.cartList.find(item => item.iid === info.iid)
  //     if (oldInfo) {
  //       oldInfo.count += 1
  //     } else {
  //       info.count = 1
  //       context.state.cartList.push(info)
  //     }
  //   }
  //context={state,commit}对象的解构
  // addCart(state,payload){       //有两个参数第一个是state，第二个是一个对象，一个额外的参数
  //      state.cartList.push(payload)
  // }
  addCounter(state, payload) {
    payload.count++;
  },
  addToCart(state, payload) {
    payload.checked=true
    state.cartList.push(payload);
  }
};
