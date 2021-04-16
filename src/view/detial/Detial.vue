<template>
  <div id="detial">
    <detial-cild class="det-bar" @itemClick="itemClick" ref="bar"></detial-cild>

    <scroll class="wangaoqi2" ref="scroll" @scrolls="detialScroll" :probe-type="3">
      <detial-swiper :topImages="topImages"></detial-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo" ref="param"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goodss="recommend" ref="recomment"></goods-list>
    </scroll>
    <!-- 回到顶部按钮 -->
    <back-top @click.native="backClick" v-show="isShow"></back-top>
    <!--  click在组件中没有效果，加一个native是监听组件根元素的原生事件 -->
    <detial-bottom-bar @addCart="addToCart"></detial-bottom-bar>
    <toast :message="message" :show="show"></toast>
  </div>
</template>

<script>
import detialCild from "./childComps/detialCild";
import detialSwiper from "./childComps/detialSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetialBottomBar from "./childComps/DetailBottomBar";
import DetailCommentInfo from "./childComps/DetailCommentInfo";

import backTop from "components/common/backtop/backTop";
import goodsList from "components/content/goods/goodslist";
import Scroll from "components/common/scroll/Scroll";
import { debounce } from "common/untils";
import toast from "components/common/toast/toast";

import {
  getDetial,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "../../network/detial";
export default {
  name: "Detial",
  components: {
    detialCild,
    detialSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetialBottomBar,
    Scroll,
    DetailCommentInfo,
    goodsList,
    backTop,
    toast,
  },
  data() {
    return {
      iid: null,
      res: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommend: [],
      itemImgListener: null,
      refresh: null,
      theme: [],
      themes: null,
      currentindex: 0,
      isShow: false,
      message: "",
      show: false,
    };
  },

  created() {
    this.iid = this.$route.params.iid; //用params保存传来的iid（参数），网址后面链接
    getDetial(this.iid).then((res) => {
      console.log(res);
      const data = res.data.result;
      this.topImages = res.data.result.itemInfo.topImages; //获取res里面的topimg
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // console.log(this.goods);

      (this.shop = new Shop(data.shopInfo)),
        (this.detailInfo = data.detailInfo),
        // console.log(data.detailInfo);

        (this.paramInfo = new GoodsParam(
          data.itemParams.info,
          data.itemParams.rule
        ));
      this.commentInfo = data.rate.list[0];
    });
    getRecommend().then((res) => {
      console.log(res);
      this.recommend = res.data.data.list;
    });
    this.themes = debounce(() => {
      this.theme = [];
      this.theme.push(0);
      this.theme.push(this.$refs.param.$el.offsetTop);
      this.theme.push(this.$refs.comment.$el.offsetTop);
      this.theme.push(this.$refs.recomment.$el.offsetTop);
      //  console.log(this.theme);
    }, 500);
  },
  mounted() {
    this.refresh = debounce(this.$refs.scroll.refresh, 50);
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0); //拿到这个组件对象去访问scroll属性的scrollTop方法
      //this.refs.scroll拿到的是这个scroll组件
    },
    detialScroll(position) {
      this.isShow = -position.y > 1000;
      const positionY = -position.y;
      for (let i = 0; i < this.theme.length; i++) {
        if (
          this.currentindex !== i &&
          ((i < this.theme.length - 1 &&
            this.theme[i] <= positionY &&
            this.theme[i + 1] > positionY) ||
            (i === this.theme.length - 1 && this.theme[i] <= positionY))
        ) {
          this.currentindex = i;
          this.$refs.bar.currentIndex = this.currentindex;
          console.log(i);
        }
      }
    },
    imageLoad() {
      this.refresh();
      this.themes();
      //获取主题的offsettop
      // created肯定不行，压根获取不到元素
      // mounted也不行，数据还没有获取到
      // 获取到数据的回调中也不行，DOM还有没有渲染完
      // $nextTick也不行，因为图片的高度还没有被计算在内
      // 在图片加载完成后，获取的高度才是正确
    },
    itemClick(index) {
      this.$refs.scroll.scrollTo(0, -this.theme[index], 500);
    },
    addToCart() {
      //获取购物车所需的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.nowPrice;
      product.iid = this.iid;
      product.realprice = this.goods.highNowPrice;
      //将商品添加到购物车里
      this.$store.dispatch("addCart", product).then((res) => {
        this.show = true;
        this.message = res;
        setTimeout(() => {
          this.show = false;
        }, 1500);
      }); //调用action,dispath分发，不同的任务到multion
      // this.$store.cartList.push(product)  所有改变state的应该在mutations里面去做
      // this.$store.commit("addCart", product);       //调用multion将整个的commit的对象当作payload使用

      console.log(product);
    },
  },
};
</script>

<style scoped>
.det-bar {
  position: relative;
  z-index: 30;
  background-color: white;
}
#detial {
  height: 100vh;
  position: relative;
}
.wangaoqi2 {
  height: calc(100% - 93px);
  overflow: hidden;
  position: absolute;
}
</style>
