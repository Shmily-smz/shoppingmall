<template>
  <div class="shop-bottom">   
     <div class="check-all">
        <check-button class="check-button" :isChecked="checkedAll" @click.native="checkClick"></check-button>
        <span>全选</span>
     </div>
     <div class="price">
         合计:{{totalPrice}}
     </div>
     <div class="length">
         合计:{{totalLength}}
     </div>
  </div>
</template>

<script>
import checkButton from './CheckButton'
export default {
  name:"shopBottom",
  components: {
      checkButton,
  },
  computed: {
      totalPrice(){
          return '¥'+this.$store.state.cartList.filter(item=>{
              return item.checked
          }).reduce((preValue,item)=>{
                 return preValue+item.count*item.price
          },0).toFixed(2)
      },
      totalLength(){
          return this.$store.state.cartList.filter(item=>item.checked).length
              
          
      },
      checkedAll(){
          if(this.$store.state.cartList.length===0) return false
          return !(this.$store.state.cartList.filter(item=>!item.checked).length)//判断拿来的数据有没有没选中的，如果有返回false
                                                                                //否则返回true
         
          
      }
  },
  methods: {
      checkClick(){
      
      if(this.checkedAll){
                //如果是全选的状态下，点击就变为 全部取消
                this.$store.state.cartList.forEach((item)=>{
                   return item.checked = false
                });
            }else{
                //如果有部分没选中，这时，就全部选中
                this.$store.state.cartList.forEach((item)=>{
                   return item.checked = true;
                });
            }
        }
      }
  }

</script>

<style>
  .shop-bottom{
      position: relative;
      height: 40px;
      line-height: 40px;
      background-color: #eee;
      display: flex;
  }
  .check-all{
      align-items: center;
      display: flex;
      margin-left: 30px;
      flex: 1;
  }
  .check-button{
   
    width: 20px;
    height: 20px;
   margin-right: 5px;
     line-height: 20px;
     
  }
  .price{
  
     flex: 1;
    
  }
  .length{
      flex: 1;
      background-color: red;
      text-align: center;
  }
</style>