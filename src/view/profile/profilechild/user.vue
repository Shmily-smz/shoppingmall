<template>
  <div class="user-info">
            <div class="info">
                <img src="~assets/img/profile/avatar.svg">
                <div class="center">
                    <p class="login">登录/注册</p>
                    <p class="iphone">暂无绑定的手机号</p>
                </div>
                <div class="i">
                   
                </div>
            </div>
  </div>
</template>

<script>
export default {
  name:'user'
}
</script>

<style scoped>
*{
    padding: 0;
    margin: 0;
}
.user-info{
    height: 30vw;
     background-color: #ff8a9d;
     border-top: 1px solid rgba(0,0,0,0.1);
     position: relative;
}
.info img{
    width: 25vw;
    border-radius: 50%;
    margin-left: 5px;
    margin-top: 5px;
}
.center{
    display: inline-block;  
    position: absolute;
    margin-top: 20px;
    margin-left: 10px;
}
.center .login{
    font-size: 18px;
    
    color: white;
}
.center .iphone{
    font-size: 14px;
    color: white;
}
</style>