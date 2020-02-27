<template>
  <div>
    <atg-header :hasLeft="false"/>
    <div class="select">
      <div class="course_box">
        <div class="item">
          <van-radio-group v-model="selected">
            <van-cell-group>
              <van-cell clickable v-for="(item, index) in list"
                  :key="index">
                <van-radio :name="item.id" checked-color="#fe7801">
                  <div class="item_box">
                    <div class="image_box">
                      <img class="image" :src="item.coursecoverimg" alt>
                    </div>
                    <div class="item_right">
                      <div class="item_title">
                        <span class="text">[{{item.subjectname}}]&nbsp;&nbsp;</span>
                        {{item.coursetitle}}
                      </div>
                      <div class="label_box">
                        <span class="label">{{item.coursenum}}讲·视频</span>
                        <span class="label">{{ item.coursespeciallabel}}</span>
                      </div>
                      <div class="learing">{{item.learningnum}}人在学习</div>
                    </div>
                  </div>
                </van-radio>
              </van-cell>
            </van-cell-group>
          </van-radio-group>
        </div>
      </div>
      <div class="goget-wapper">
        <button class="goget" :disabled="isDisab" :class="{'disable_btn': isDisab}" @click="goCourse">完成领取</button>
      </div>
    </div>
  </div>
</template>

<script>

import loading from "../components/Loading";
import { RadioGroup, Radio, Cell, Toast, Dialog, CellGroup } from "vant";
import {
  setupWebViewJavascriptBridge,
  deepTraverse,
  InitAudio,
  H5InitVideo,
  judgeTerminal
} from "../assets/js/renderDom";
export default {
  name: "courseList",
  components: {
    loading,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Toast.name]: Toast,
    [Dialog.name]: Dialog,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
  },
  data() {
    return {
      selected: "",
      isDisab:true,
      qrCodeId:"",
      list:[],
      phone:""
    };
  },
  watch: {
  selected(newName, oldName) {
    if (newName) {
      this.isDisab = false;
    } else {
      this.isDisab = true;
    }
  }
  },
  created() {
    let learingid = this.$route.query.id;
  },

  mounted() {
    this.qrCodeId=this.$route.query.qrCodeId;
    this.phone = this.$route.query.phone;
    this.getList()
  },
  methods: {
     async getList(){
      const res = await this.$post("/bookQRcode/getProduct", {qrCodeId:this.qrCodeId})
      if(res.code==1){
        this.list=res.data
      }
    },
    save(){
      console.log('2121')
    },
     async goCourse() {
      let params = {
        mobilePhone: this.phone,
        courseId: this.selected
      };
      const res = await this.$post("/ScanQrcodeBuyCourse", params);
      if (res.code == 1) {
        // this.$router.push('/list')
      } else {
        Toast.fail(res.msg);
      }
    },
    opencourse(courseID) {
      window.location.href =
        httpUrl + "/app_share/courseinfo.html?courseId=" + courseID;
    }

  },

};
</script>

<style lang="scss" scoped>
.van-cell:not(:last-child)::after{border:none;}
.course_box {
  .item_box {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    .image_box {
      width: 1.2rem;
      height: 1.2rem;

      .image {
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 10px;
      }
    }
    .item_right {
      font-size: 0.14rem;
      margin-left: 10px;
      box-sizing: border-box;
      .text {
        color: #ffaa02;
      }
      .item_title {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      .label_box {
        margin-top: 5px;
        height: 0.6rem;
        box-sizing: border-box;
        .label {
          background: #f5f5f5;
          border-radius: 8px;
          font-size: 10px;
          color: rgba(153, 153, 153, 1);
          line-height: 0.17rem;
          text-align: center;
          white-space: nowrap;
          padding: 2px 8px;
          margin-right: 5px;
        }
      }
      .learing {
        font-size: 0.14rem;
        color: #777777ff;
      }
    }
  }
}
.disable_btn{
    background-color: #adacac;
    border: none;
  }
</style>