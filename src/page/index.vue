<template>
  <div class="hello">
      <div class="top">
           <div class="go-prev" onclick="history.back(-1);">
           <i class="go-prev-left el-icon-arrow-left"></i>
           </div>
          <span class="text">{{ msg }}</span>
      </div>
      <div class="main-con">
 <div class="information">
         <div class="information-main">
            <div class="information-tx">
              <img :src=" 'https://chuangxue-oss.oss-cn-hangzhou.aliyuncs.com'+headimg" alt="" class="tx">
            </div>
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
                    <p class="djs">{{minutes}}:{{seconds}}分钟</p>
                </div>
            </div>
         </div>
      </div>
      <div class="block">
        <el-carousel trigger="click" height="150px">
            <el-carousel-item v-for="(item,index) in pics" :key="index">
                <img :src="item.pic" alt="" class="">
            </el-carousel-item>
        </el-carousel>
      </div>
      <div class="answer-tab">
          <div class="tabs" v-for="(item,index) in title" :key="index">
             <div class="tab"  @click="tab(cur=index,cur,index)" :class="{active: cur==index}" >
               <p >{{item.num}}题场</p>
             </div>
             
          </div>
      </div>
       <div class="tab-list">
         <div class="tab-rule" @click="ruleclick()">
           <p class="rule">规则</p>
         </div>
         <div class="tab-title">
           <p class="answer-title">有奖答题</p>
         </div>
         <div class="tab-but" @click="advertis()" v-if="state == 1 && isSignUp == 0">
           <p class="tab-but-title" >{{addtext}}</p>
         </div>
         <div class="tab-but" v-if="state >= 2 && isSignUp == 1 && isFinish == 0">
           <router-link  :to="{path:'/answer',query: {types: type}}" class="answer-link">
              <p class="tab-but-title">{{starttext}}</p>
           </router-link>
         </div>
          <div class="tab-but tab-but1" v-if="state == 1 && isSignUp == 1">
           <p class="tab-but-title">{{notstarttext}}</p>
         </div>
          <div class="tab-but" v-if="state >= 2 && isSignUp == 0">  
           <p class="tab-but-title">{{nowstarttext}}</p>
         </div>
          <div class="tab-but tab-but2" @click="advertisgrab()" v-if="state == 3 && isSignUp == 1 &&isFinish == 1">
           <p class="tab-but-title">{{grabstarttext}}</p>
         </div>
         <div  >
              <p class="answer-money">
                    {{ itmmoney }}元
              </p>
              <p class="award-pool-amount">奖池预估</p>
              <div class="answer-djs" v-if="state == 1">
                 <p>{{hr}}:</p><p>{{min}}:</p><p>{{sec}}</p>
              </div>
               <div class="answer-djs" v-else>
                 <p>进行中</p>
              </div>
              <p class="answer-djs-start">本场开始倒计时</p>
         </div>
            	
       </div>
       <div class="foot">
         <div class="foot-left">
           <router-link :to="{path:'/training'}"   >
              <img src="../assets/answer_icon_train_default@2x.png" alt="">
           </router-link>
           
         </div>
         <div class="foot-right">
           <router-link to="ranking" class="updown">
             <img class="foot-right-top" src="../assets/answer_icon_ranking_default@2x.png" alt="">
           </router-link>
            
            <img class="foot-right-bottom" src="../assets/answer_icon_task_default@2x.png" alt="">
         </div>
       </div>
      </div>
      <div v-show="showadvertising">
        <prompt @child-event='parentEvent' :title="index" v-if="advertising"></prompt>
      </div>
       <div v-show="showgrabopen">
        <grab @child-grab='parentgrab' :title="index"  v-if="grabopen"></grab>
      </div>
      <div v-show="showruleopen">
        <rule @child-rule='parentrule' v-if="ruleopen"></rule>
      </div>
  </div>
</template>

<script>
import prompt from '@/components/advertising/prompt';
import grab from '@/components/advertising/grab';
import rule from '@/components/advertising/rule';
export default {
  name: 'index',
  components: {
   prompt,
   grab,
   rule
  },
  data () {
    return {
      showadvertising:false,
      advertising:false,
      showgrabopen:false,
      grabopen:false,
      showruleopen:false,
      ruleopen:false,
      headimg:'',
      type:1,
      msg: '智力答题',
      name: 'Thoth_01',
      money:'1221.00',
      nownum:'8',
      connum:'10',
      minutes: '01',
      seconds: '01',
      cur:0,
      itmmoney:'100.10',
      addtext:'参与答题',
      starttext:'开始答题',
      notstarttext:'暂未开始',
      nowstarttext:'进行中',
      grabstarttext:'红包口令开启',
      hr:'',
      min:'',
      sec:'',
      time:'',
      state:'',       //第几天
      isSignUp:'',   //是否报名
      isFinish:'',   //是否有红包
      index: 1,     //报名第几场的答题
      pics:[{
        pic:require('../assets/mao.jpg')
      },
      {
       pic:require('../assets/mao.jpg')
      }
      ],
      title:[
        {num:10},
        {num:20},
        {num:30}
      ]
    }
  },
  created () {
    
     this.$axios.get("/consumer/intelligence/main_info",{
       headers: {
        token: '8993a1b041d54563af134e0493746708'
      }
     })
    .then(res=>{
        this.headimg = res.data.data.head
        this.name = res.data.data.name
        this.money = res.data.data.money
        this.nownum = res.data.data.power
        let secseconds = res.data.data.seconds
        let min = parseInt(secseconds / 60 % 60)
        let sec = parseInt(secseconds % 60)
        min = min > 9 ? min : '0' + min
        sec = sec > 9 ? sec : '0' + sec
        if (secseconds == -1){
          this.minutes = '00'
          this.seconds = '00'
        } else {
          this.minutes = min
          this.seconds =sec
        }
       
        //console.log(min,sec,res)
    })
    .catch(err=>{

      // console.log(err)

    })
     // this.open()
    // console.log(areaCode.code_cn)
  //  let codeData
//    codeData = JSON.parse(areaCode.code_cn);
   // console.log(JSON.parse(areaCode.code_cn))
    // Object.keys(codeData).forEach((key, index) => {
    //   this.options.push({
    //     value: '',
    //     label: ''
    //   });
    //   this.options[index].value = key
    //   this.options[index].label = codeData[key]
    // });
   // console.log(this.options)
  },
  mounted () {
      this.add();
      this.atb0();
      console.log(this.index)
     // console.log(this.time)
      //   this.countdown();

      
     // this.state = this.tabMain[0].state;
     // this.countdown();
      //console.log( this.state,1111)
     
    },
  methods: {
    parentEvent(data){
      this.showadvertising = data
      this.advertising = data
      this.atb0();
     // this.state = '3'
    },
    parentgrab(data){
      this.showgrabopen = false
      this.grabopen = false
    //  this.state = '5'
    },
    parentrule:function(){
      this.showruleopen = false
      this.ruleopen = false
    },
      num: function (n) {
        return n < 10 ? '0' + n : '' + n
      },
      add: function () {
        var _this = this
        var time = window.setInterval(function () {
          if (_this.seconds === '00' && _this.minutes !== '00') {
            _this.seconds = 59
            _this.minutes -= 1
            _this.seconds = _this.seconds > 9 ? _this.seconds : '0' + _this.seconds
           _this.minutes = _this.minutes > 9 ? _this.minutes : '0' + _this.minutes
           
          } else if (_this.seconds !== '00' && _this.minutes === '00'){
            _this.seconds -= 1
            _this.seconds = _this.seconds > 9 ? _this.seconds : '0' + _this.seconds
          } else if (_this.seconds !== '00' && _this.minutes !== '00'){
            _this.seconds -= 1
            _this.seconds = _this.seconds > 9 ? _this.seconds : '0' + _this.seconds
          } else if (_this.seconds === '00' && _this.minutes === '00') {
            _this.seconds = 0
            _this.seconds = _this.seconds > 9 ? _this.seconds : '0' + _this.seconds
           clearInterval(time)
          } 
        }, 1000)
      },

   atb0:function(){
      this.$axios.get("/consumer/intelligence/sessions_info",{
       headers: {
        token: '8993a1b041d54563af134e0493746708'
      },
      params:{
        type:1
      }
     })
    .then(res=>{
      let state = res.data.data.nowActivityCycle
      
      this.itmmoney = res.data.data.money
      this.time = res.data.data.startTime *1000
      this.state = res.data.data.nowActivityCycle
      this.isSignUp = res.data.data.isSignUp
      this.isFinish = res.data.data.isFinish
      if (this.state == '1' || this.state == 1) {
         //this.timethis.time = this.tabMain[0].time;
         this.countdown();
      }
      console.log(this.isSignUp,res,1)
    })
    .catch(err=>{

       console.log(err)

    })
   },
   tab:function(cur,index){
     this.type = index +1
    // console.log(cur,index)
     let types = index +1
     this.index = types
     //console.log(this.index,33)
     this.$axios.get("/consumer/intelligence/sessions_info",{
       headers: {
        token: '8993a1b041d54563af134e0493746708'
      },
      params:{
        type:types
      }
     })
    .then(res=>{
      let state = res.data.data.nowActivityCycle
      //this.state = state
      this.itmmoney = res.data.data.money
      this.state = res.data.data.nowActivityCycle
      this.isSignUp = res.data.data.isSignUp
      this.isFinish = res.data.data.isFinish
      //this.time = res.data.data.startTime
        console.log(res)
    })
    .catch(err=>{

       console.log(err)

    })
    // this.time = this.tabMain[index].time;
   //  this.countdown(index);
     
   //  console.log(this.time)
     //console.log(this.tabMain[index])
   },
  countdown () {
      const time = this.time
    
      const end = time
     // console.log(end,time,22)
      const now = Date.parse(new Date())
      const msec = end - now
      if(msec<0) return;
      //let day = parseInt(msec / 1000 / 60 / 60 / 24)
      let hr = parseInt(msec / 1000 / 60 / 60 % 24)
      let min = parseInt(msec / 1000 / 60 % 60)
      let sec = parseInt(msec / 1000 % 60)
    //  this.day = day
      this.hr = hr > 9 ? hr : '0' + hr
      this.min = min > 9 ? min : '0' + min
      this.sec = sec > 9 ? sec : '0' + sec
      const that = this
      if(min>=0 && sec>=0){
        //倒计时结束
        if(min==0 && sec==0){

          return
        }
        setTimeout(function () {
          that.countdown()
        }, 1000)
      }
    },
  advertis: function(){
      this.showadvertising = true
      this.advertising = true
  },
   advertisgrab: function(){
      this.showgrabopen = true
      this.grabopen = true
  },
  ruleclick:function(){
      this.showruleopen = true
      this.ruleopen = true
  },
  
  },
  watch: {
      second: {
        handler (newVal) {
          this.num(newVal)
        }
      },
      minute: {
        handler (newVal) {
          this.num(newVal)
        }
      }
 },
    computed: {
      second: function () {
        return this.num(this.seconds)
      },
      minute: function () {
        return this.num(this.minutes)
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.answer-link{
  border: none;
  color: #fff;
  text-decoration: none;
}
.hello{
  margin: 0 auto;
  width: 750px;
  height: 1512px;
  overflow: hidden;
}
.main-con{
  height: 1424px;
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
}
.text{
  height: 88px;
  line-height: 88px;
  font-size: 32px;
  margin: 0;
  color: #fff;
  
}
.information{
    height: 181px;
}
.information-main{
    height: 124px;
    width: 690px;
    margin: 0 auto;
    padding-top: 28px;
}
.information-tx{
    float: left;
}
.tx{
  width: 120px;
  height: 120px;
  border-radius: 60px;
  border: 2px solid #fff;
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
    margin-bottom: 0;
}
.balance{
    width: 206px;
    height: 48px;
    background: #fff;
    border-radius: 24px;
    margin-top: 10px;
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
.right-icon{
    font-size: 16px;
    color: #333;
    margin-left: 10px;
}
.information-time{
    float: left;
    margin-left: 160px;
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
.el-carousel__arrow{
   display: none;
}
.block{
    width: 710px;
    height: 200px !important;
    border-radius: 24px;
    margin: 0 auto;

}
.block img{
    width: 710px;
    height: 200px;
    border-radius: 24px;
    margin: 0 auto;
}
.el-carousel{
    height: 200px;
    overflow: hidden;
}
.answer-tab{
    width: 690px;
    margin: 0 auto;
    overflow: hidden;
    margin-top: 40px;
}
.tabs{
    width: 770px;
}
.tab{
    background: url(../assets/answer_icon_site_none@2x.png) no-repeat;
    background-size: 100%;
    width: 180px;
    height: 80px;
    float: left;
    text-align: center;
    margin-right: 75px;
    color: #fff;
}
.active{
    background: url(../assets/answer_icon_site_sel@2x.png) no-repeat;
    background-size: 100%;
    width: 180px;
    height: 95px;
    color: #1677FF;
    margin-bottom: 20px;
}
.tab-list{
    width: 710px;
    height: 260px;
    background: #fff;
    border-radius: 24px;
    clear: both;
    margin-left: 20px;
    position: relative;
}
.rule{
  margin: 0;
  position: absolute;
  right: 0;
  top: 20px;
  width: 80px;
  height: 40px;
  background: #1677FF;
  border-radius: 100px 0px 0px 100px;
  font-family: PingFang-SC-Medium, PingFang-SC;
  font-weight: 500;
  color: #FFFFFF;
  text-align: center;
  font-size: 22px;
  line-height: 40px;
}
.answer-title{
  font-size: 28px;
  margin: 0;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  text-align: center;
  height: 40px;
  line-height: 40px;
  padding-top: 20px;
}
.tab-but{

  width: 320px;
  height: 72px;
  line-height: 72px;
  font-size: 32px;
  color: #fff;
  text-align: center;
  background: url(../assets/answer_bt_challenge_default@2x.png) no-repeat;
  background-size: 100%;
  position: absolute;
  left: 195px;
  bottom: -31px;
}
.tab-but1{
  background: url(../assets/answer_bt_challenge_none@2x.png) no-repeat;
  background-size: 100%;
}
.tab-but2{
  background: url(../assets/answer_bt_challenge_sel@2x.png) no-repeat;
  background-size: 100%;
}
.tab-but-title{
  margin: 0;
  height: 45px;
  line-height: 45px;
  margin-top: 14px;
}
.foot{
  height: 500px;
  width: 710px;
  margin: 0 auto;
  margin-top: 71px;
}
.foot-left{
  float: left;
}
.foot-left img{
  width: 345px;
  height: 500px;
}
.foot-right{
  float: left;
  width: 345px;
  height: 500px;
  margin-left: 20px;
}
.foot-right-top{
 width: 345px;
  height: 240px;
  vertical-align: top;

}
.foot-right-bottom{
 width: 345px;
  height: 240px;
  vertical-align: top;
  margin-top: 20px;
}
.answer-money{
  margin: 0;
  height: 56px;
  font-size: 40px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  line-height: 56px;
  margin-top: 30px;
  margin-left: 96px;
  float: left;
}
.award-pool-amount{
  margin: 0;
  width: 96px;
  height: 33px;
  font-size: 24px;
  font-family: PingFang-SC-Medium, PingFang-SC;
  font-weight: 500;
  color: #999999;
  line-height: 33px;
  margin-left: 130px;
}
.answer-djs{
  float: left;
  margin-left: 190px;
}
.answer-djs p{
  margin: 0;
  float: left;
  height: 56px;
  line-height: 56px;
  font-size: 40px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.answer-djs-start{
  clear: both;
  margin-left: 450px;
  font-size: 24px;
  font-family: PingFang-SC-Medium, PingFang-SC;
  font-weight: 500;
  color: #999999;
}



</style>
