<template>
  <div class="courselist">
    <atg-header :hasLeft="false" />
    <div class="course">
      <div class="course-list">
        <div class="grade-wapper">
          <div class="grade">
            <span class="first">年级</span>
          </div>
          <div class="options">
            <div
              v-for="(item,index) in grade"
              :key="item.gradecode"
              @click="selectGrade(index)"
              class="grade_item"
            >
              <div class="item" :class="{'active': selected===index}">{{item.gradename}}</div>
            </div>
          </div>
        </div>
        <div class="grade-wapper">
          <div class="grade">
            <span class="first">学科</span>
          </div>
          <div class="options">
            <div
              v-for="(item,index) in subject"
              :key="item.subjectid"
              @click="selectSubject(index)"
              class="grade_item"
            >
              <div class="item" :class="{'active': selectedSub===index}">{{item.subjectname}}</div>
            </div>
          </div>
        </div>
        <div class="grade-wapper">
          <div class="grade">
            <span class="first"></span>
            <span>课程</span>
          </div>

          <van-radio-group v-model="selectCourse">
            <van-cell-group>
              <van-cell clickable v-for="(item,index) in courseList" :key="index">
                <van-radio
                  @click="handleChange(item.coursecoverimg)"
                  :name="item.id"
                  checked-color="#fe7801"
                >{{item.coursetitle}}</van-radio>
              </van-cell>
            </van-cell-group>
          </van-radio-group>
        </div>
        <div class="goget-wapper">
          <button
            class="goget"
            :disabled="isDisab"
            :class="{'disable_btn': isDisab}"
            @click="submit"
          >完成领取</button>
        </div>
      </div>
      <van-dialog calss="go-class" v-model="appear" :showConfirmButton="false">
       <div class="dialog_close"  @click="appear=false"><van-icon name="cross" /></div>
        <img id="class-pic" :src="coursecoverimg" />
        <div class="login-bxx">登录包学习，酣畅淋漓学起来</div>
        <a
          class="listen"
          id="home_keleyi_com"
          rel="nofollow"
          target="_blank"
          @click.prevent="openOrDownload"
        >去听课</a>
      </van-dialog>
    </div>
    <!-- 遮罩 -->
    <div id="mask" v-if="isMask">
      <img src="../assets/images/arrow@2x.png" alt class="arrow" />
      <div class="open-browser">请点击在浏览器中打开</div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import loading from "../components/Loading";
import { RadioGroup, Radio, Dialog, Toast, Cell, CellGroup,Icon } from "vant";
import {openOrDownload} from '../assets/js/common.js'
Vue.use(Dialog);
export default {
  name: "home",
  components: {
    loading,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Dialog.name]: Dialog,
    [Toast.name]: Toast,
    [Cell.name]: Cell,
    [Icon.name]: Icon,
    [CellGroup.name]: CellGroup
  },
  data() {
    return {
      phone: "",
      load: false,
      isMask: false,
      radio: "",
      appear: false,
      selected: null,
      selectedSub: null,
      isDisab: true,
      grade: [],
      subject: [],
      selectCourse: "",
      courseList: [],
      coursecoverimg: ""
    };
  },
  watch: {
    selectCourse(newName, oldName) {
      if (newName) {
        this.isDisab = false;
      } else {
        this.isDisab = true;
      }
    }
  },
  mounted() {
    this.phone = this.$route.query.phone;
    console.log(this.$route.query);
    this.getGrade();
  },
  methods: {
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
    selectGrade(index) {
      this.selected = index;
      this.selectCourse = "";
      this.selectedSub = "";
      this.courseList = [];
      this.getSubject(this.grade[index].gradecode);
    },
    selectSubject(index) {
      this.selectedSub = index;
      this.selectCourse = "";
      this.getCourseList(this.subject[index].subjectid);
    },
    async getGrade() {
      const res = await this.$post("/course/getCourseGrade");
      if (res.code == 1) {
        this.grade = res.data;
      }
    },
    async getSubject(code) {
      console.log({ gradeCode: code });
      const res = await this.$post("/course/getCourseSubject", {
        gradeCode: code
      });
      if (res.code == 1) {
        this.subject = res.data;
      }
    },
    async getCourseList(subjectId) {
      let gradeIndex = this.selected;
      let code = this.grade[gradeIndex].gradecode;
      console.log({ gradeCode: code, subjectId: subjectId });
      const res = await this.$post("/course/getCourseList", {
        gradeCode: code,
        subjectId: String(subjectId)
      });
      if (res.code == 1) {
        this.courseList = res.data;
      }
    },
    async submit() {
    
      let params = {
        mobilePhone: this.phone,
        courseId: this.selectCourse,
        source:18
      }; 
      const res = await this.$post("/ScanQrcodeBuyCourse", params);
      if (res.code == 1) {
          this.appear = true;
        // Toast.success('成功');
      } else {
        Toast.fail(res.msg);
      }
    },
    handleChange(val) {
      this.coursecoverimg = val;
    },
    async goCourse() {
      
    }
  }
};
</script>
<style lang="scss">
.courselist {
  background-color: #f6f6f6;
  .course {
    margin-top: 0.48rem;
    width: 100vw;
  } 
}
.grade-wapper {
  background-color: #ffffff;

  .grade {
    padding: 0rem 0.16rem;
    line-height: 0.4rem;
    height: 0.4rem;
    border-bottom: 1px solid #eeeeee;
    position: relative;
    .first::before {
      content: "";
      height: 0.14rem;
      width: 0.03rem;
      background: rgba(255, 119, 2, 1);
      display: inline-block;
      position: absolute;
      top: 0.14rem;
      left: 0.09rem;
    }
  }
  .options {
    display: flex;
    width: 100%;
    justify-content: start;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: center;
    padding: 0.16rem 10px;
    box-sizing: border-box;

    .grade_item {
      width: 25%;
      height: 0.23rem;
      line-height: 0.23rem;
      padding: 0 10px;
      margin-bottom: 10px;
      .item {
        color: #777777ff;
        border-radius: 0.04rem;
        border: 1px solid rgba(226, 226, 226, 1);
        text-align: center;
      }
      .active {
        background-color: #fe7900;
        color: #ffffff;
        box-sizing: border-box;
        border: 1px solid rgba(255, 119, 2, 1);
      }
    }
  }
}
.disable_btn {
  background-color: #adacac;
  border: none;
}
</style>