<template>
  <div class="header">
    <van-nav-bar title="扫码领课程" :left-arrow="hasLeft" @click-left="$router.go(-1)"/>
  </div>
</template>
<script>
import { NavBar } from "vant";
export default {
  props: {
    // title: {
    //   type: String,
    //   default: ""
    // },
    hasLeft: {
      type: Boolean,
      default: false
    }
  },
  components: {
    vanNavBar: NavBar
  }
};
</script>
<style scoped lang="scss">
.van-hairline--bottom::after {
    border-bottom-width: 0px;
}
.header {
   height: .48rem;
  .van-nav-bar {
    position: fixed;
    top: 0;
    background-color: #fafafa;
    height: 0.48rem;
    width: 100%;
    line-height: 0.48rem;
    color:#666666;
  }
  .van-nav-bar__title {
   font-size: 0.17rem;
    // color: #fff;
    font-family: PingFangSC-Medium, PingFang SC;
    max-width: 60%;
    margin: 0 auto;
    text-align: center;
  }
  .van-nav-bar__arrow {
    font-size: 0.18rem;
  }
}
</style>
