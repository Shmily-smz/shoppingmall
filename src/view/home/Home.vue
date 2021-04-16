<template>
  <div id="home">
    <!-- 顶部菜单栏 -->
    <nav-bar class="home-bar">
      <div slot="center">购物街</div>
    </nav-bar>
     <tab-control
        class="tab-control tab-one"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"      
        ref="tabControl1"
        v-show="isFixed"
      ></tab-control>
    <Scroll
      class="wangaoqi"
      ref="scroll"
      :probe-type="3"
      @scrolls="contentScrolls"
      :pull-up-load="true"
     @pullingup="loadmore"
    >    
      <!--接收自定义事件scrolls保存到contentScrolls里面 -->
      <!-- 轮播图 -->
      <Swiper :bannerss="banners"  @imgLoad="imgLoad"></Swiper>
      <!-- 推荐 -->
      <Recommend :recommends="recommends"></Recommend>
      <!-- 推荐下面的介绍（一张图片）-->
      <FutureView></FutureView>
      <!-- tabControl导航 -->
      <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"      
        ref="tabControl2"
        v-show="!isFixed"
      ></tab-control>
      <!-- 导航下面的商品 -->
      <goodslist :goodss="showgoods"></goodslist>
    </Scroll>
    <!-- 回到顶部按钮 -->
    <back-top @click.native="backClick" v-show="isShow"></back-top>
    <!--  click在组件中没有效果，加一个native是监听组件根元素的原生事件 -->
    <!-- 底部菜单栏 -->
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Swiper from "components/common/swiper/Swiper";
import tabControl from "components/content/tabControl/tabControl";
import goodslist from "components/content/goods/goodslist";
import Scroll from "components/common/scroll/Scroll";
import MainTabBar from "components/content/maintabbar/MainTabBar";
import backTop from "components/common/backtop/backTop";

import { getHomeMultidata, getHomeGoods } from "network/home";

import Recommend from "view/home/childcomponents/Recommend";
import FutureView from "view/home/childcomponents/FutureView";

import {debounce} from 'common/untils'
export default {
  name: "Home",
  components: {
    NavBar,
    Swiper,
    tabControl,
    goodslist,
    Scroll,
    Recommend,
    FutureView,
    MainTabBar,
    backTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        //goods是一个对象让里面有三个key“pop,new,sell”
        pop: { page: 0, list: [] }, //pop对应的又是一个对象,里面又有对应的key:page和list
        new: { page: 0, list: [] }, //new对应的又是一个对象
        sell: { page: 0, list: [] } //sell对应的又是一个对象
      },
      currentType: "pop",
      isShow: false,
      tabbaroffsetTop:0,
      isFixed:false,
      saveY:0
    };
  },
  created() {
    //组件创建调数据
    this.getHomeMultidata(); //调用下面的方法this.是下面的函数，不加this就是import导入的函数
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
   
  },
  mounted () {
    const refresh=debounce(this.$refs.scroll.refresh,50) 
     this.$bus.$on('imgLoad',()=>{    
      refresh()
    })
  },
  activated () {
    this.$refs.scroll.refresh()
  },
  computed: {
    //计算属性相关方法
    showgoods() {
      return this.goods[this.currentType].list;
    },
   
  },
    activated () {
      this.$refs.scroll.scrollTo(0, this.saveY)
      this.$refs.scroll.refresh()    
    },
    deactivated () {
      this.saveY=this.$refs.scroll.getScrollY()    
      console.log(this.saveY) 
    },
  methods: {
    //这里面放事件监听，网络请求相关方法
    // 获取轮播图和推荐的信息
    getHomeMultidata() {
      //多包装一层
      getHomeMultidata().then(res => {
        //res属于局部变量，函数执行完就会被销毁，需要有个变量储存
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
        // this.result=res
      });
    },
    //获取商品信息数据
    getHomeGoods(type) {
      //一个是type在create传过来了
      const page = this.goods[type].page + 1; //另一个就是page，page不要写死，从我们设计的60行动态获取page，把type和page传给94行，获取页码
      getHomeGoods(type, page).then(res => {
        //调用network传过来的函数，需要两个参数
        // console.log(res)
        this.goods[type].list.push(...res.data.data.list); //...解析，吧res.data.data.list里面的数据一个一个解析出来放到this.goods[].list里面
        this.goods[type].page += 1;
         this.$refs.scroll.finishPullUp(); //多了一组数据，页码加1 this.$refs.scroll.finishPullUp(); //多了一组数据页码加1
      });
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
      }
      this.$refs.tabControl1.currentIndex=index   //两个组件不一致，因为tab1与tab2都是tab创建出来的，然后组件里面的点击只是让样式变红
      this.$refs.tabControl2.currentIndex=index   //解决办法，当点击一个的时候，吧
    },
    contentScrolls(position) {
      // console.log(position);
      this.isShow = -position.y > 1000;
      this.isFixed=this.tabbaroffsetTop<(-position.y)
    },
   
    loadmore(){
      // console.log('上拉加载更多');
      this.getHomeGoods(this.currentType)

    },
    imgLoad(){
     this.tabbaroffsetTop=this.$refs.tabControl2.$el.offsetTop //$el为这个组件的根组件
       
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0); //拿到这个组件对象去访问scroll属性的scrollTop方法
      //this.refs.scroll拿到的是这个scroll组件
    }
  }
};
</script>
<style scoped>
body {
  padding: 0;
  margin: 0;
}
#home {
  height: 100vh; /*视口高度 */
  position: relative;
}
.home-bar {
  background-color: #ff8a9d;
  color: white;
 
}
.tab-one{
  position: relative;
  z-index: 20;
}
.wangaoqi {
  top: 44px;
  height: calc(100% - 93px);
  overflow: hidden;
  
  position: absolute;
}
</style>
