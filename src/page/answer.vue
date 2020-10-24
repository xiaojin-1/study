<template>
<div>


<div class="main-mc" v-show="showmc == true">
       <div class="mc-text">
          <p class="mc-tit">答题挑战赛</p>
          <p class="mc-title">你准备好了吗？</p>
          <p class="mc-djs">{{timerNum}}</p>
       </div>
       <div class="mc"></div>
    </div>
  <div class="hello">

      <div class="top">
           <div class="go-prev" @click="backclick()">
           <i class="go-prev-left el-icon-arrow-left"></i>
           </div>
          <span class="text">{{ msg }}</span>
      </div>
    <div class="main-con">
      <div class="banner">
          <img :src=" 'https://chuangxue-oss.oss-cn-hangzhou.aliyuncs.com'+head" class="tx">
          <p class="name">{{name}}</p>
          <div class="right-now">
              <p class="nowtext">正在答题</p>
              <p class="nownum">{{num}}</p>
          </div>
      </div>
      <div class="cir"></div>
      <div id="countdown" v-show="countdowndjs == true">
    <svg
         :width="size"
         :height="size">
      <circle
              fill="transparent"
              :stroke-width="stroke"
              stroke="#D8D8D8"
              :r="radius"
              :cx="circleOffset"
              :cy="circleOffset"></circle>
      <circle
              class="circle"
              fill="transparent"
              :stroke-width="stroke"
              stroke="#1677FF"
              :r="radius"
              :cx="circleOffset"
              :cy="circleOffset"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="progress"
              stroke-linecap="round"></circle>
    </svg>
    <span>{{ countdown }}</span>
  </div>
  <div class="wrong-answer" v-show="wrong">
      <div class="wrong-circle">
          <img src="../assets/answer_icon_error_result@2x.png" alt="">
      </div>
  </div>
  <div class="correct-answer" v-show="correct">
      <div class="correct-circle">
          <img src="../assets/answer_icon_correct_result@2x.png" alt="">
      </div>
  </div>
        <div class="main">
             <div class="main-text">{{title}}</div>
             <div class="main-list" v-for="(ite,ind) in answer" :key="ind"
             v-bind:class="{active:ind==isActive}"
             >
                 <p class="main-title" v-bind:class="{active1:ind==isActive1}" @click="check(ite,ind)">{{ite}}</p>
                 <img class="answersure" v-bind:class="{sureactive:ind==sureisActive}" src="../assets/answer_icon_eorrect_sel@2x.png"  alt="">
                 <img class="answerfalse" v-bind:class="{falseactive:ind==isfalseActive}" src="../assets/answer_icon_error_sel@2x.png" alt="">
                 <div class="mcshow" v-show="mcshow == true"></div>
             </div>
        </div>
      </div>
    </div>
      <div v-show="wrongshow">
        <wrong  @child-event='parentEvent' :title="types" :question="questionId" v-if="advertising == 0"></wrong>
      </div>
      <div >
        <giveup  @child-give='giveupEvent' :title="types" v-if="giveupanswer"></giveup>
      </div>
       <div v-show="fail">
        <fails  @child-fails='failsEvent' :title="index" :types="types" v-if="failsanswer"></fails>
      </div>
  </div>
</template>

<script>
// import axios from '@/request/api';
import wrong from '@/components/answer/wrong';
import fails from '@/components/answer/fails';
import giveup from '@/components/answer/giveup';
export default {
  name: 'answer',
  components: {
   wrong,
   giveup,
   fails
  },
  data () {
    return {
      token:'',
      userCode:'',
      model:'',
      version:'',
      mcshow:false,
      obj:[],
      types:'',  //场次
      fail:true,
      wrongshow:true,
      failsanswer:false,
      giveupanswer:false,
      advertising:'-1',
      giveup:'',
      msg: '答题',
      name: 'Thoth_01',
      num:'1',
      showmc:true,
      timerNum:'6',
      size: 59,
      stroke: 4,
      giveupstate:'',
      percentage: 100,
      index:'',//是否最后一题
    //  timer: 0,
      seconds: 10,
      countdowndjs:true,
      wrong:false,
      correct:false,
      title:'',   //题目
      head:'',     //头像图片
      questionId:'',//题目id
      challengeStatus:'', //是否挑战失败
      solution:2,
      isActive:'-1',
      isActive1:'-1',
      isfalseActive:'-1',
      sureisActive:'-1',
      answer: {},              //选项
      runTime:null
    }
  },
  created () {
    this.types = this.$route.query.types
    this.token = this._token();
    this.userCode = this._userCode();
    this.model = this._model();
    this.version = this._version();
     this.$bridge.registerhandler('lookgetremedyfinsh', (data, responseCallback) => {
          // console.log('lookgetTrainingfinsh') 
          // console.log(this.advertising = false)
          if (data==1){
           this.wrong = false
           this.question();
           //this.add();
           //this.ggtab();
         //  this.move();
          }

           responseCallback(data)

        })
//console.log(this.$route.query.types,9)
  },
  mounted () {
     this.djs();
     this.numinfo();

    //  this.animate()
 },
  methods: {
    parentEvent(data){
      this.advertising = -1
      this.wrong = false
      this.countdowndjs = true
      this.isActive1 = '-1'
      this.isActive = '-1'
      this.sureisActive ='-1'
      this.isfalseActive = '-1'
     // this.seconds = 10
      this.question();
      // this.animate();
    },
    giveupEvent(data){
     // console.log(data)
      this.giveupanswer = data
      this.giveupstate = data
       if (this.giveupstate == true){
         this.percentage = 0;
      clearInterval(this.runTime);
          history.back(-1);
          this.giveupanswer =false
      }
      //  else {
      //   this.question()
      // }
    },
    failsEvent(data){
      this.failsanswer = data
      this.giveupstate = data
      this.fail = false
      this.wrongshow = false

      // this.seconds = 10
      // this.animate();
      //this.check();
      //this.failanswer();
      if (this.giveupstate == true){
         this.percentage = 0;
         clearInterval(this.runTime);
          history.back(-1);
          this.failsanswer =false
      } else {
          this.question()
      }
    },

     numid:function(index){
       return 'numid'+index
     },
     djs:function(){
      // 挑战答题倒计时6秒
       this.timerNum = 6;
       let timer = setInterval(() => {
              if (this.timerNum > 0) {
                this.timerNum--;
              } else {
                this.showmc = false
                clearInterval(timer);
                // 6 秒之后获取问题信息
                  this.question();

              //  this.animate();
              }
            }, 1000);
     },
     animate() {
      // console.log(this.timer,1111)
     // console.log(this.seconds,456);
      let _this = this;
      this.runTime = setInterval(() => {
        if(_this.percentage > 0){
          //  _this.seconds--;
           _this.percentage = _this.percentage - 1/10;
        } else {
          clearInterval(_this.runTime)
        //   setTimeout(() => {
        //    this.djsover();
        // }, 3000)
         _this.djsover();
         _this.percentage = 100;

        }
      //  _this.percentage = _this.percentage - 1/100;
      //   if (_this.percentage <= 0) {
      //   //  console.log(this.percentage)
      //    // this.seconds = 0
      //     clearInterval(_this.runTime)
      //    _this.djsover();
      //    _this.percentage = 100;
      //     return
      //   }
      }, 10)
    },
    // 倒计时结束 自动回答问题
    djsover:function(){
      this.mcshow = true;
      this.$axios.post("/consumer/intelligence_question/answer",{

        questionId:this.questionId,
        answer:-1,
        status:1,
        sessionsType:this.types
     })
    .then(res=>{
     // console.log(res,5555)
      let remedyNum = res.data.data.remedyNum   // 补救次数
      let advertising = res.data.data.status
      let rightAnswer = res.data.data.rightAnswer
      let challengeStatus = res.data.data.challengeStatus //挑战成功或失败
      this.index = res.data.data.answerNum   //剩余问题次数
      let fineStatus = res.data.data.answerNum //是否获得场次奖励
      if (this.index == 0){
      if (fineStatus == 1){
          //this.
          this.$router.push({ path: 'cross', query: { types: this.types,state:true}})
        } else {
          this.$router.push({ path: 'cross', query: { types: this.types}})
        }
      } else {
        if (challengeStatus == 1){
        this.obj.push(challengeStatus)
        let _len = this.obj.length
        if (_len == 1){
           this.failsanswer = true

        } else {

         if (advertising == 0 ){
         this.isActive = rightAnswer
         this.sureisActive = rightAnswer
         this.wrong = true
         this.countdowndjs = false
         setTimeout(() => {
          this.question();
         //  this.sureisActive = '-1'
           this.advertisiang = 0
           this.wrong = false
           this.countdowndjs = true
        }, 2000)
      }
      }

      } else {
      //  if (remedyNum == 0 && this.index <= 0){
      //     this.failsanswer = true
      //  } else {
        if (advertising == 0 ){
        // this.isActive1 = ind
         this.isActive = rightAnswer
        // this.isfalseActive = ind
         this.sureisActive = rightAnswer
         this.wrong = true
         this.countdowndjs = false
        // this.sureisActive =this.solution
         setTimeout(() => {
           this.advertising = 0
           this.wrong = false
           this.countdowndjs = true
        }, 2000)
       }
     // }
    }
      }




    })
    .catch(err=>{
    })
   },
    // 自己回答问题
    check: function(ite,ind){
    //  console.log(ite,ind,333333)
     // let obj = []
     this.mcshow = true;
     this.percentage = 0;
     // this.seconds = 0;
      clearInterval(this.runTime);
      let answer = ind
      this.$axios.post("/consumer/intelligence_question/answer",{
        questionId:this.questionId,
        answer:ind,
        status:1,
        sessionsType:this.types
     })
    .then(res=>{
      console.log(res,7)
      this.percentage = 0;
     // this.seconds = 0;
      clearInterval(this.runTime);
      let remedyNum = res.data.data.remedyNum   // 补救次数
      let advertising = res.data.data.status  //答题错误
      let rightAnswer = res.data.data.rightAnswer  //正确答案
      let challengeStatus = res.data.data.challengeStatus //挑战成功或失败
      this.index = res.data.data.answerNum   //  剩余题目
      let fineStatus = res.data.data.answerNum //是否获得场次奖励
      if (this.index == 0){

        console.log(fineStatus,11)
        if (fineStatus == 1){   //获得场次奖励
          //this.
          this.$router.push({ path: 'cross', query: { types: this.types,state:true}})
        } else {
          this.$router.push({ path: 'cross', query: { types: this.types}})
        }

      } else {
        if(challengeStatus == 1){
        this.obj.push(challengeStatus)
        let _len = this.obj.length
        //console.log(this.obj,_len,67)
         if (advertising == 0 ){
         this.isActive1 = ind
         this.isActive = rightAnswer
         this.isfalseActive = ind
         this.sureisActive = rightAnswer
         this.wrong = true
         this.countdowndjs = false
        // this.sureisActive =this.solution
         setTimeout(() => {
           if (_len == 1){
             this.failsanswer = true
           } else {
            this.question()
           //this.seconds = 10
          //  this.animate();
           }
           this.wrong = false
           this.countdowndjs = true

        }, 2000)

      } else {

        this.isActive = ind
        this.sureisActive = ind
        this.correct = true
        this.countdowndjs =false
        setTimeout(() => {
          this.countdowndjs =true
          this.correct = false
           this.question()
          // this.seconds = 10
          //  this.animate();
        }, 500)
      }
      }
      else {
        if (advertising == 0 ){
         this.isActive1 = ind
         this.isActive = rightAnswer
         this.isfalseActive = ind
         this.sureisActive = rightAnswer
         this.wrong = true
         this.countdowndjs = false
        // this.sureisActive =this.solution
         setTimeout(() => {
           this.advertising = 0
           this.wrong = false
           this.countdowndjs = true

        }, 2000)

      } else {
        this.isActive = ind
        this.sureisActive = ind
        this.correct = true
        this.countdowndjs =false
        setTimeout(() => {
          this.countdowndjs =true
          this.correct = false
           this.question()
         //  this.seconds = 10
          //  this.animate();
        }, 2000)
       }

      //   if(remedyNum == 0 && this.index == 0){
      //    this.failsanswer = true
      // } else {
      //   if (advertising == 0 ){
      //    this.isActive1 = ind
      //    this.isActive = rightAnswer
      //    this.isfalseActive = ind
      //    this.sureisActive = rightAnswer
      //    this.wrong = true
      //    this.countdowndjs = false
      //   // this.sureisActive =this.solution
      //    setTimeout(() => {
      //      this.advertising = 0
      //      this.wrong = false
      //      this.countdowndjs = true

      //   }, 2000)

      // } else {
      //   this.isActive = ind
      //   this.sureisActive = ind
      //   this.correct = true
      //   this.countdowndjs =false
      //   setTimeout(() => {
      //     this.countdowndjs =true
      //     this.correct = false
      //      this.question()
      //    //  this.seconds = 10
      //     //  this.animate();
      //   }, 2000)
      //  }
      // }
    }

      }

      //  console.log(res)
    })
    .catch(err=>{
    })


    },
    question:function(){
      this.mcshow = false;
      // this.numinfo();
      this.percentage = 100
    //this.seconds = 10
    this.isActive1 = '-1'
    this.isfalseActive = '-1'
    this.isActive = '-1'
    this.sureisActive = '-1'
    let _this = this;
     this.$axios.get("/consumer/intelligence_question/question",{
       headers: {
        token: this.token
      },
      params:{
        sessionsType:this.types,
        type:1
      }
     })
    .then(res=>{
     //console.log(res,8)
       _this.title = res.data.data.title
       _this.questionId = res.data.data.id
       let ret = res.data.data.options
        let retJSON = JSON.parse(ret)
        //console.log(res,ret,retJSON)
         _this.answer = retJSON
        _this.numinfo();
        _this.animate();
    })
    // },()=>{

    //  //console.log(res,8)
    //    _this.title = res.data.data.title
    //    _this.questionId = res.data.data.id
    //    let ret = res.data.data.options
    //    let retJSON = JSON.parse(ret)
    //     //console.log(res,ret,retJSON)
    //     _this.answer = retJSON
    //     _this.animate();
    // })
    },
    numinfo:function(){
this.$axios.get("/consumer/intelligence_question/answer_num_info",{
       headers: {
        token: this.token
      },
      params:{
        sessionsType:this.types
      }
     })
    .then(res=>{
    // console.log(res)
        this.num = res.data.data.answerNum
        this.name = res.data.data.userName
        this.head = res.data.data.head
    })
    .catch(err=>{
    })
    },
    backclick:function(){
      this.giveupanswer = true
    }


   },

  watch: {

 },
    computed: {
     radius() {
      return (this.size / 2) - (this.stroke / 2);
    },
    circleOffset() {
      return this.size / 2;
    },
    circumference() {
      return this.radius * 2 * Math.PI;
    },
    progress() {
      return this.circumference - this.circumference * this.percentage / 100;
    },
    countdown() {
      return Math.ceil(this.seconds * this.percentage / 100)
    }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  margin: 0 auto;
  width: 750px;
  height: 100%;
  background: #1677FF;
}
.main-con{
  height: 1206px;
  background: url(../assets/answer_bg_home_default@2x.png) no-repeat;
  background-size: 100%;
}
body{
  margin: 0;
}
.go-prev-left {
    z-index: 999999;
    position: absolute;
    top: 28px;
    left: 20px;
    font-size: 32px;
    color: #fff;
    cursor: pointer;
}
.top{
    text-align: center;
    width: 750px;
    height: 88px;
    position: relative;
    background: #1677FF;
    padding-bottom: 40px;
}
.text{
  height: 88px;
  line-height: 88px;
  font-size: 32px;
  margin: 0;
  color: #fff;
}
.banner{
    width: 690px;
    height: 140px;
    background: #1263D6;
    border-radius: 101px;
    border: 4px solid #FFFFFF;
    margin: 0 auto;

}
.tx{
    width: 120px;
    height: 120px;
    border-radius: 120px;
    border: 4px solid #FFFFFF;
    margin: 6px 0 0 6px;
    float: left;
}
.name{
    margin: 0;
    height: 50px;
    font-size: 36px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 50px;
    float: left;
    margin-top: 40px;
    margin-left: 20px;
}
.right-now{
    width: 96px;
    float: right;
    margin-right: 50px;
    margin-top: 30px;
}
.right-now p{
   margin: 0;
}
.nowtext{
height: 33px;
font-size: 24px;
font-family: PingFang-SC-Bold, PingFang-SC;
font-weight: bold;
color: #FFFFFF;
line-height: 33px;

}
.nownum{

height: 45px;
font-size: 32px;
font-family: PingFang-SC-Bold, PingFang-SC;
font-weight: bold;
color: #FFFFFF;
line-height: 45px;
text-align: center;
}
.main-con{
  position: relative;
}
.main{
    width: 690px;
    height: 853px;
    background: #FFFFFF;
    border-radius: 40px;
    margin: 0 auto;
    margin-top: 105px;
}
.main-text{

    height: 45px;
    font-size: 32px;
    font-family: PingFang-SC-Bold, PingFang-SC;
    font-weight: bold;
    color: #333333;
    line-height: 45px;
    text-align: center;
    padding-top: 138px;
    margin-bottom: 50px;
}
.main-list{
    width: 520px;
    height: 110px;
    background: #F5F5F5;
    border-radius: 62px;
    text-align: center;
    margin: 0 auto;
    margin-bottom: 40px;
    position: relative;
}
.main-title{
    margin: 0;
    height: 110px;
    font-size: 36px;
    font-family: PingFang-SC-Bold, PingFang-SC;
    font-weight: bold;
    color: #333333;
    line-height: 110px;
    border-radius: 62px;
}
.main-mc{
  position: fixed;
  top: 0;
  left: 0;
  width: 750px;
  height: 1334px;
  z-index: 9999999;
}
.mc{
  position: fixed;
  top: 0;
  left: 0;
  width: 750px;
  height: 1334px;
  background: #000000;
  opacity: 0.5;
}
.mc-text{
  position: relative;
  z-index: 3;
  margin: 0;
  font-size: 32px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #FFFFFF;
  text-align: center;
  margin-top: 560px;
}
.mc-text p{
  margin: 0;
}
.mc-djs{
height: 112px;
font-size: 80px;
font-family: PingFangSC-Medium, PingFang SC;
font-weight: 500;
}
.circle {
  transform: rotate(90deg);
  transform-origin: 50% 50%;;
}

#countdown {
  display: inline-block;
  position: absolute;
  left: 315px;
  top: 194px
}

#countdown span {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  font-size: 48px;
  font-family: monospace;
  color: #1677FF;
}
.wrong-answer{
  width: 110px;
  height: 110px;
  border-radius: 110px;
  border: 8px solid #FE7066;
  position: absolute;
  left: 312px;
  top: 194px
}
.wrong-answer img{
  position: absolute;
  width: 40px;
  height: 40px;
  top: 35px;
  left: 35px;
}
.correct-answer{
   width: 110px;
  height: 110px;
  border-radius: 110px;
  border: 8px solid #16DEB9;
  position: absolute;
  left: 312px;
  top: 194px
}
.correct-answer img{
  position: absolute;
  width: 40px;
  height: 40px;
  top: 35px;
  left: 35px;
}
.cir{
  width: 148px;
  height: 148px;
  border-radius: 74px;
  background: #fff;
  position: absolute;
  left: 301px;
  top: 180px;
}
.active .main-title{
  color: #fff;
}
.active{
  background: #16DEB9;
}
.active1{
  background: #FE7066;
  color: #fff;
}
.answersure{
  width: 32px;
  height: 32px;
  position: absolute;
  right: 39px;
  top: 40px;
  display: none;
}
.sureactive{
  display: block;
}
.answerfalse{
  width: 32px;
  height: 32px;
  position: absolute;
  right: 39px;
  top: 40px;
  display: none;
}
.falseactive{
  display: block;
}
</style>
