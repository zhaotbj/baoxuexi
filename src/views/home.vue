<template>
  <div class="home">
    <atg-header :hasLeft="false" />
    <div class="receive" v-bind:style="{backgroundImage:'url('+bgUrl+ ')', height:bgHeight}">
      <div class="form_class">
        <van-field class="bxx-phone" v-model.trim="phone" @blur="validator" placeholder="请输入你的手机号"></van-field>
        <van-button
          class="bxx-phone"
          slot="button"
          size="small"
          type="primary"
          @click="freeReceive"
        >免费领取</van-button>
      </div>
      <div class="video_box">
        <div class="video"></div>
        <!-- <vue-plyr v-if="initData.videourl">
          <video :poster="initData.videocover" >
            <source :src="initData.videourl" type="video/mp4" size="720">
            <source :src="initData.videourl" type="video/mp4" size="1080">
            <track  default>
          </video>
        </vue-plyr>-->
      </div>
    </div>
    <div
      class="course_bg"
      v-for="(item,index) in bgImages"
      :key="index"
      v-bind:style="{backgroundImage:'url('+item.url+ ')', height:item.height}"
    ></div>
    <!-- <div class="column"></div> -->

    <van-dialog calss="go-class" v-model="show" :showConfirmButton="false">
    <div class="dialog_close" @click="show=false"><van-icon name="cross" /></div>
      <img id="class-pic" src="../assets/images/timg.png" />
      <div class="login-bxx">你已领取，去包学习酣畅淋漓学起来</div>
      <!-- <button class="listen" @click="gotoClass">去听课</button> -->
      <a
        class="listen"
        id="home_keleyi_com"
        rel="nofollow"
        target="_blank"
        @click.prevent="openOrDownload"
      >去听课</a>
    </van-dialog>
    <!-- 遮罩 -->
    <div id="mask" v-if="isMask">
      <img src="../assets/images/arrow@2x.png" alt class="arrow" />
      <div class="open-browser">请点击在浏览器中打开</div>
    </div>
  </div>
</template>

<script>
import { Field, Button, Toast, Dialog, Icon } from "vant";
import loading from "../components/Loading";
import {openOrDownload} from '../assets/js/common.js'
import Plyr from "plyr";
export default {
  name: "home",
  components: {
    loading,
    [Field.name]: Field,
    [Button.name]: Button,
    [Toast.name]: Toast,
    [Icon.name]: Icon,
    [Dialog.Component.name]: Dialog.Component
  },
  data() {
    return {
      qrCodeId: "", // 二维码id
      learingid: "", // 唤醒appid
      initData: {},
      load: false,
      phone: "",
      show: false,
      isMask: false,
      error: "",
      bgUrl: "",
      bgImages: [],
      bgHeight: null,
      selflag: "" //  0选择的 // 1 列表的
    };
  },
  mounted() {
    this.qrCodeId = this.$route.query.qrCodeId;
    // this.learingid = this.$route.query.learingid;
    this.getResources()
  },
  methods: {
    async getResources(){
     const res= await this.$post("/bookQRcode/getResources", { qrCodeId: this.qrCodeId });
      if (res.code == 1) {
          this.initData = res.data;
          this.selflag = res.data.selflag;
          if (res.data.videourl) {
            this.initVideo(res.data);
          }
          this.bgUrl = res.data.multiimgurl[0];
          this.getImgHeight(res.data.multiimgurl[0])
          // 返回的是一个数组 从第二项开始截取并循环显示   有多个情况
          let copy = JSON.parse(JSON.stringify(res.data.multiimgurl));
          copy.splice(0, 1);
          let images = [];
          for(let i=0; i<copy.length; i++) {
               let obj = {};
            obj["url"] = copy[i];
          this.getImgHeight(copy[i], i)
            images.push(obj);
          }
          console.log(images)
          this.bgImages = images;
        }
    },
    getImgHeight(src,index) {
          let img = new Image();
           img.src = src;
            img.onload=()=>{
              console.log(src, index)
            if(typeof(index)==="undefined"|| typeof(index)=="object"){
              this.bgHeight=img.height / 2 + "px"
            } else {
              let images= JSON.parse(JSON.stringify(this.bgImages)) 
              images[index]['height']=img.height / 2 + "px"
              this.bgImages=images
            }
          };
    },
    initVideo(data) {
      const options = {
        fullscreen: {
          iosNative: true // 进入全屏时是否使用原生iOS全屏（建议开启）
        },
        controls: [
          "play-large",
          "play",
          "current-time",
          "progress",
          "duration",
          "fullscreen"
        ]
        //        controls: ['play', 'play-large', 'duration', 'progress', 'current-time', 'duration-time','fullscreen']
      };
      // 创建video标签并设置属性
      const myVideo = document.createElement("video");
      myVideo.setAttribute("id", "bxxVideo");
      // 插入video标签
      document.getElementsByClassName("video")[0].appendChild(myVideo);
      // video初始化
      const player = new Plyr(`#bxxVideo`, options);
      // 设置video资源文件
      player.source = {
        type: "video",
        sources: [
          {
            src: data.videourl,
            type: "video/mp4"
          }
        ],
        poster: data.videocover
      };
    },
    validator() {
      if(!this.phone){
        return false
      }
      var nospace = this.phone.replace(/\s/g,'');//去掉所有空格
      if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(nospace)) {
        Toast({
          message: "请输入正确的手机号"
        });
        return false;
      }
      return true
    },
    openOrDownload() {
      //判断浏览器
      var u = navigator.userAgent;
      if (/MicroMessenger/gi.test(u)) {
        // 引导用户在浏览器中打开
        this.isMask=true
        return;
      }
        openOrDownload()
    },
    async freeReceive() {
      if (!this.phone) {
        Toast({
          message: "请输入正确的手机号"
        });
        return;
      }
      if(!this.validator()){
        return
      }
      let params = {
        mobilePhone: this.phone.replace(/\s/g,''),
        source: 18,
        qrCodeId: this.qrCodeId
      };

      const res = await this.$post("/ScanQrcodeRegister", params);
      if (res.code == 1) {
        let nospace =this.phone.replace(/\s/g,'');
        //首先判断是否是渠道用户
        if (res.data.channeluser === 1) {
          //渠道用户
          if (res.data.receivenum === 0) {
            //去领取
            if (this.selflag == 0) {
              //  选择
              
              this.$router.push({ path:"linkageSelect?qrCodeId=" + this.qrCodeId +"&phone=" + nospace
              });
            } else {
              this.$router.push({
                path: "list?qrCodeId=" + this.qrCodeId + "&phone=" + nospace
              });
            }
          } else {
            // 已领取
            this.show = true;
          }
        } else {
        }
      }
    }
  }
};
</script>


<style lang="scss">
.course_bg {
  width: 100%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.receive {
  width: 100%;
  position: relative;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  object-fit: cover;
  .form_class {
    width: 100%;
    position: absolute;
    top: 1.6rem;
    display: flex;
    justify-content: space-between;
    padding: 0 0.2rem;
  }
  .video_box {
    position: absolute;
    top: 2.3rem;
    width: 100%;
    padding: 0 0.2rem;
  }
  .van-field__body {
    display: flex;
  }
  .van-field__button {
    margin-left: 0.1rem;
  }
  .van-button--small {
    width: 1.66rem;
    background-color: #ff7702;
    border-color: #ff7702;
    color: #ffffff;
    font-size: 0.16rem;
  }
  .van-field__control {
    border-radius: 0.04rem;
    border: none;
  }
  .van-field {
    margin-right: 0.1rem;
  }
  .bxx-phone {
    height: 0.4rem;
    border-radius: 0.04rem;
  }
}
.column {
  margin-top: 0.48rem;
  width: 100vw;
  // height: 100vh;
}

.van-toast {
  top: 71%;
  background: rgba(10, 10, 10, 0.7);
}
.van-toast--text {
    min-width: 0.96rem;
    padding: 0.08rem 0.12rem;
    font-size: 0.14rem;
}
</style>
