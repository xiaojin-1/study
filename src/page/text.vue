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
          <img src="../assets/mao.jpg" alt="" class="tx">
           <div class="information-name">
                <p class="name">{{name}}</p>
                <div class="balance">
                   <img class="balance-icon" src="../assets/answer_icon_money_default@2x.png" alt="">
                   <p class="balance-money">{{money}}元</p>
                   <i class="right-icon el-icon-arrow-right"></i>
                </div>
               
            </div>
           <div class="information-time">
                <div class="textnum">
                    <p class="num">{{nownum}}/{{connum}}</p>
                </div>
                <div class="time">
                    <p class="djs">{{secondtime}}:{{minut}}分钟</p>
                </div>
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
                 <p class="main-title" v-bind:class="{active1:ind==isActive1}" @click="check(ite,ind)">{{ite.title}}</p>
                 <img class="answersure" v-bind:class="{sureactive:ind==sureisActive}" src="../assets/answer_icon_eorrect_sel@2x.png"  alt="">
                 <img class="answerfalse" v-bind:class="{falseactive:ind==isfalseActive}" src="../assets/answer_icon_error_sel@2x.png" alt="">
             </div>
        </div>
      </div>
    </div>
      <div>
        <campred  @child-event='parentEvent' v-if="advertising"></campred>
      </div>
      <div>
        <strength  @child-strength='strengthEvent' v-if="strengthanswer"></strength>
      </div>
       <div>
        <readval  @child-readval='readvalEvent' v-if="readvalanswer"></readval>
      </div>
  </div>
</template>

<script>
import campred from '@/components/camp/campred';
import readval from '@/components/camp/readval';
import strength from '@/components/camp/strength';
export default {
  name: 'answer',
  components: {
   campred,
   strength,
   readval
  },
  data () {
    return {
      readvalanswer:false,
      strengthanswer:false,
      advertising:false,
      money:'1221.00',
       nownum:'8',
      connum:'10',
      secondtime: '20',
      minut: '00',
       hr:'',
      min:'',
      sec:'',
      giveup:'',
      msg: '答题',
      name: 'Thoth_01',
      num:'1',
      showmc:false,
      timerNum:'6',
      size: 59,
      stroke: 4,
      giveupstate:'',
      percentage: 100,
      timer: null,
      seconds: 10,
      countdowndjs:true,
      wrong:false,
      correct:false,
      title:'世界杯足球比赛每几年举行一次？',
      solution:2,
      isActive:'-1',
      isActive1:'-1',
      isfalseActive:'-1',
      sureisActive:'-1',
      answer:[
          {title:'一年'},
          {title:'两年'},
          {title:'三年'},
          {title:'四年'},
          
      ]
    }
  },
  created () {
 

  },
  mounted () {
    this.djs();
     this.add();
    // this.count();
 },
  methods: {
    parentEvent(data){
      this.advertising = false
     
      this.animate();
    },
 
    strengthEvent(data){
     // console.log(data)
      this.strengthanswer = data
     
    },
    readvalEvent(data){
      this.readvalanswer = data
      
    },
     num1: function (n) {
        return n < 10 ? '0' + n : '' + n
      },
    add () {
       var _this = this
        var time = window.setInterval(function () {
          if (_this.minut === '00' && _this.secondtime !== '00') {
            _this.minut = 59
            _this.secondtime -= 1
            _this.minut = _this.minut > 9 ? _this.minut : '0' + _this.minut
           _this.secondtime = _this.secondtime > 9 ? _this.secondtime : '0' + _this.secondtime
           
          } else if (_this.minut !== '00' && _this.secondtime === '00'){
            _this.minut -= 1
            _this.minut = _this.minut > 9 ? _this.minut : '0' + _this.minut
        //   _this.secondtime = _this.secondtime > 9 ? _this.secondtime : '0' + _this.secondtime
          } else if (_this.minut !== '00' && _this.secondtime !== '00'){
            
            _this.minut -= 1
            _this.minut = _this.minut > 9 ? _this.minut : '0' + _this.minut
          } else if (_this.minut === '00' && _this.secondtime === '00') {
            _this.minut = 0
            _this.minut = _this.minut > 9 ? _this.minut : '0' + _this.minut
           clearInterval(time)
            
          } 

        }, 1000)
    },
     numid:function(index){
       return 'numid'+index
     },
     djs:function(){
       this.timerNum = 6;
       let timer = setInterval(() => {
              if (this.timerNum > 0) {
                this.timerNum--;
              } else {
                this.showmc = false
                clearInterval(timer);
                this.animate();
              }
            }, 1000);
     },
     animate() {
      this.timer = setInterval(() => {
        this.percentage -= 1/10;
        if (this.percentage <= 0) {
          clearInterval(this.timer)
          this.percentage = 100;
          return
        }
      }, this.seconds * 1000 / 100 / 10)
    },
    check: function(ite,ind){
      //console.log(ind)
     // this.$set(this.container,ind)
      let answer = ind
      //this.isActive = ind
      if(this.solution == answer){
        this.isActive = ind
        this.sureisActive = ind
        this.correct = true
        this.countdowndjs = false
        //console.log(111)
      } else {
        this.isActive1 = ind
        this.isActive = this.solution
        this.sureisActive =this.solution
        this.isfalseActive = ind
        this.countdowndjs = false
        this.wrong = true
       // this.advertising = true
       // console.log(222)
      }
    },
    backclick:function(){
      this.giveupanswer = true
     
      
    }

  
   },
 watch: {
      second: {
        handler (newVal) {
          this.num1(newVal)
        }
      },
      minute: {
        handler (newVal) {
          this.num1(newVal)
        }
      }
 },
    

    computed: {
         second: function () {
        return this.num1(this.secondtime)
      },
      minute: function () {
        return this.num1(this.minut)
      },
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
  height: 1334px;
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

}
.information-name{
    margin-left: 20px;
    font-size: 36px;
    font-weight: 500;
    color: #fff;
    float: left;
}
.name{
    height: 50px;
    line-height: 50px;
    margin-top: 10px;
    margin-bottom: 10px;
}
.balance{
    clear: both;
    width: 206px;
    height: 48px;
    background: #fff;
    border-radius: 24px;
    margin-top: 10px;
}
.right-icon{
    font-size: 16px;
    color: #333;
    margin-left: 10px;
}
.information-time{
    float: left;
    margin-left: 123px;
}
.textnum{
    background: url(../assets/answer_icon_energy_default@2x.png) no-repeat;
    background-size: 100%;
    width: 173px;
    height: 68px;
    margin-top: 15px;
}
.num{
    text-align: center;
    font-size: 28px;
    height: 40px;
    line-height: 40px;
    font-weight: 500;
    color: #fff;
    margin: 0;
    padding-top: 15px;
}
.djs{
    width: 112px;
height: 33px;
font-size: 24px;
font-family: PingFang-SC-Medium, PingFang-SC;
font-weight: 500;
color: #FFFFFF;
line-height: 33px;   
   margin: 0;
   margin-top: 3px;
   margin-left: 36px;
}
.balance-icon{
    width: 32px;
    height: 32px;
    margin: 8px 10px 0 10px;
    float: left;
}
.balance-money{
    float: left;
    color: #333;
    font-size: 26px;
    margin: 8px 0 0 0;
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
