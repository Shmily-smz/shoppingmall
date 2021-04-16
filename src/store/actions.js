export default{
    addCart(context,payload){
       return new Promise((resole,reject)=>{
        let oldProduct=context.state.cartList.find(item=>item.iid===payload.iid)

        if(oldProduct){
            context.commit('addCounter',oldProduct)
            // oldProduct.count+=1
            resole('当前商品数量+1')
        }else{
            payload.count=1
            context.commit('addToCart',payload)
            // context.state.cartList.push(payload)
            resole('成功添加当前商品')
        }
       })
    }
}
//context里面包含{state,commit}对象的结构
