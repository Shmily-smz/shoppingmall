<template>
  <div class="all">
    <div>
      <p>
        <span>0.00</span> &nbsp;元
      </p>
      <p>我的余额</p>
    </div>
    <div class="center">
      <p>
        <span>0</span> &nbsp;个
      </p>
      <p>我的优惠</p>
    </div>
    <div>
      <p>
        <span>0</span> &nbsp;分
      </p>
      <p>我的积分</p>
    </div>
  </div>
</template>

<script>
export default {
    name:'all'
};
</script>

<style>
.all{
    display: flex;
    text-align: center;
    border-bottom: 5px solid #fafafa;
}
.all span{
    color: red;
}
.all div{
    flex: 1;
     border-right: 1px solid #FAFAFA;
     padding: 20px 0px;
}
</style>