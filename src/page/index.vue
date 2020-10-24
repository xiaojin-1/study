<template>
  <div class="hello">
      <div class="top" >
           <div class="go-prev" @click="backclick()" >
           <i class="go-prev-left el-icon-arrow-left"></i>
           </div>
          <span class="text">{{ msg }}</span>
      </div>
      <div class="main-con">
 <div class="information">
         <div class="information-main">
            <div class="information-tx">
              <img :src="headimg" alt="" class="tx">
            </div>
            <div class="information-name">
                <p class="name">{{name}}</p>
                <div class="balance">
                   <img class="balance-icon" src="../assets/answer_icon_money_default@2x.png" alt="">
                   <p class="balance-money" >{{money}}元</p>
                   <i class="right-icon el-icon-arrow-right"></i>
                </div>
               
            </div>
            <div class="information-time">
                <div class="textnum">
                    <p class="num">{{nownum}}/{{connum}}</p>
                </div>
                <div class="time">
                    <p class="djs" >{{minutes}}:{{seconds}}分钟</p>
                     <!-- <p class="djs" v-else>体力值已满</p> -->
                </div>
            </div>
         </div>
      </div>
      <div class="block">
        <el-carousel trigger="click" height="150px">
            <el-carousel-item v-for="(item,index) in pics" :key="index">
              <!-- <a :href="item.href"> -->
                <img :src=" 'https://chuangxue-oss.oss-cn-hangzhou.aliyuncs.com'+item.image" alt="" class="">
              <!-- </a> -->
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
         <div class="tab-but" v-if="state >= 2 && isSignUp == 1 && isFinish == 0 && finishChallenge==0">
           <router-link  :to="{path:'/answer',query: {types: type}}" class="answer-link">
              <p class="tab-but-title">{{starttext}}</p>
           </router-link>
         </div>
          <div class="tab-but tab-but1" v-if="state == 1 && isSignUp == 1">
           <p class="tab-but-title">{{notstarttext}}</p>
         </div>
          <div class="tab-but" v-if="state >= 2 && isSignUp == 0 &&isFinish == 0 && finishChallenge==1">  
           <p class="tab-but-title">{{nowstarttext}}</p>
         </div>
         <div class="tab-but" v-if="state >= 2 && isSignUp == 1 &&isFinish == 0 && finishChallenge==1">  
           <p class="tab-but-title">{{nowstarttext}}</p>
         </div>
          <div class="tab-but" v-if="state >= 2 && isSignUp == 0 &&isFinish == 1 && finishChallenge==1">  
           <p class="tab-but-title">{{nowstarttext}}</p>
         </div>
         <div class="tab-but" v-if="state >= 2 && isSignUp == 0 &&isFinish == 1 && finishChallenge==0">  
           <p class="tab-but-title">{{nowstarttext}}</p>
         </div>
         <div class="tab-but" v-if="state >= 2 && isSignUp == 0 &&isFinish == 0 && finishChallenge==0">  
           <p class="tab-but-title">{{nowstarttext}}</p>
         </div>
          <div class="tab-but tab-but2" @click="advertisgrab()" v-if="state == 3 && isSignUp == 1 &&isFinish == 1 &&commandStatus == 0">
           <p class="tab-but-title">{{grabstarttext}}</p>
         </div>
         <div class="tab-but tab-but2"  v-if="state == 3 && isSignUp == 1 &&isFinish == 1&&commandStatus == 1">
           <p class="tab-but-title">{{grablqtext}}</p>
         </div>
         <div  >
           <div class="answer-djs-left" style="width:165px;text-align:center;float:left">
              <p class="answer-money">
                    {{ itmmoney }}元
              </p>
              <p class="award-pool-amount">奖池预估</p>

           </div>
           <div class="answer-djs-right" style="text-align:center;float:right;">
              <div class="answer-djs" v-if="state == 1">
                 <p>{{hr}}:</p><p>{{min}}:</p><p>{{sec}}</p>
              </div>
               <div class="answer-djs" v-else>
                 <p>进行中</p>
              </div>
              <p class="answer-djs-start">本场开始倒计时</p>
           </div>
              
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
            
            <img class="foot-right-bottom" @click="taskclick()" src="../assets/answer_icon_task_default@2x.png" alt="">
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
      djsover:'true',
      token:'',
      userCode:'',
      model:'',
      version:'',
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
      finishChallenge:'',
      itmmoney:'100.10',
      addtext:'参与答题',
      starttext:'开始答题',
      notstarttext:'暂未开始',
      nowstarttext:'进行中',
      grabstarttext:'红包口令开启',
      grablqtext:'已领取',
      commandStatus:'',
      hr:'',
      min:'',
      sec:'',
      time:'',
      state:'',       //第几天
      isSignUp:'',   //是否报名
      isFinish:'',   //是否有红包
      index: 1,     //报名第几场的答题
      pics:[ ],
      title:[
        {num:10},
        {num:20},
        {num:30}
      ]
    }
  },
  created () {
     
       // this.token = localStorage.getItem('_token')
       // alert(this.token+'2222')
      //this.token = token
     
 
   this.token = this._token();
   this.userCode = this._userCode();
   this.model = this._model();
   this.version = this._version();
   
      
   
 
  
  },
  mounted () {
    this.lbt();
    let token = ''
    this.$bridge.registerhandler('lookpromptfinsh', (data, responseCallback) => {
          // console.log('lookgetTrainingfinsh')  
          // console.log(this.advertising = false)
          if (data==1){
           this.advertising = false
           this.numinfo();
           this.add();
           this.ggtab();
           this.move();
          } 
          
           responseCallback(data)

        })
     this.$bridge.registerhandler('setupWebViewtoken', (data, responseCallback) => {
          // console.log('lookgetTrainingfinsh')  
          // console.log(this.advertising = false)
         // alert(data)
          var dataJSON = JSON.parse(data)
      //    alert(dataJSON.token)
          token  = dataJSON.token
          localStorage.setItem('_token',token)
        //  alert(token+'1111s')
           this.numinfo();
           //this.add();
           this.atb0();
          // this.tab(cur,index,token)
           responseCallback(data)

        })
     this.numinfo();
      this.add();
   // this.numinfo();
   // this.add();
     this.atb0();
      //this.$router.go(0)
     // console.log(this.index)
     // console.log(this.time)
      //   this.countdown();
      // if (this.token == null){
      //   location.reload()
      // }
      
     // this.state = this.tabMain[0].state;
     // this.countdown();
      //console.log( this.state,1111)
     
    },
  methods: {
  //   getDataFromNative(params) {
  //   //params: 原生调用Vue时传值（params）给Vue
  //   console.log("得到原生传值结果:" + params);
  //   var dic = {
  //       'name': "vicky"
  //   };
  //   return dic; //回调给原生，可写可不写
  // },

    parentEvent(data){
      this.showadvertising = data
      this.advertising = data
      this.ggtab();
     // this.state = '3'
    },
    parentgrab(data){
      this.showgrabopen = false
      this.grabopen = false
      this.ggtab();
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
         //  _this.djsover = false
           _this.numinfo();
           clearInterval(time)
           
          } 
        }, 1000)
      },

   atb0:function(){
     // alert(localStorage.getItem('_token'))
      this.$axios.get("/consumer/intelligence/sessions_info",{
       headers: {
        token: localStorage.getItem('_token') //localStorage.getItem('_token') //'cc349aa7d6c748ffaf229cac4f96c976' //
      },
      params:{
        type:1
      }
     })
    .then(res=>{
     // console.log(res,2222)
      let state = res.data.data.nowActivityCycle
      this.finishChallenge = res.data.data.finishChallenge
      this.commandStatus = res.data.data.commandStatus
      this.itmmoney = res.data.data.money
      this.time = res.data.data.startTime *1000
      this.state = res.data.data.nowActivityCycle
      this.isSignUp = res.data.data.isSignUp
      this.isFinish =res.data.data.isFinish
      if (this.state == '1' || this.state == 1) {
         //this.timethis.time = this.tabMain[0].time;
         this.countdown();
      }
     // console.log(this.isSignUp,res,1)
    })
    .catch(err=>{

       console.log(err)

    })
   },
   ggtab:function(){
     // alert(this.type)
      this.$axios.get("/consumer/intelligence/sessions_info",{
       headers: {
        token: localStorage.getItem('_token') //localStorage.getItem('_token') //'cc349aa7d6c748ffaf229cac4f96c976' //
      },
      params:{
        type:this.type
      }
     })
    .then(res=>{
     // console.log(res,2222)
      let state = res.data.data.nowActivityCycle
      this.finishChallenge = res.data.data.finishChallenge
      this.commandStatus = res.data.data.commandStatus
      this.itmmoney = res.data.data.money
      this.time = res.data.data.startTime *1000
      this.state = res.data.data.nowActivityCycle
      this.isSignUp = res.data.data.isSignUp
      this.isFinish =res.data.data.isFinish
      if (this.state == '1' || this.state == 1) {
         //this.timethis.time = this.tabMain[0].time;
         this.countdown();
      }
     // console.log(this.isSignUp,res,1)
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
   //  console.log(this.index,33)
     this.$axios.get("/consumer/intelligence/sessions_info",{
       headers: {
        token:localStorage.getItem('_token') // localStorage.getItem('_token') //'cc349aa7d6c748ffaf229cac4f96c976'//
      },
      params:{
        type:types
      }
     })
    .then(res=>{
      
      let state = res.data.data.nowActivityCycle
      //this.state = state
     
      this.finishChallenge = res.data.data.finishChallenge
      this.commandStatus = res.data.data.commandStatus
      this.itmmoney = res.data.data.money
      this.state =res.data.data.nowActivityCycle
      this.isSignUp =res.data.data.isSignUp
      this.isFinish = res.data.data.isFinish
    //   alert(this.finishChallenge,3333)
   //   alert(this.state+this.isSignUp+this.isFinish)
      //this.time = res.data.data.startTime
      //  console.log(res)
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
  numinfo:function(){
  //  alert(localStorage.getItem('_token'))
this.$axios.get("/consumer/intelligence/main_info",{
       headers: {
        token: localStorage.getItem('_token') // localStorage.getItem('_token')
      }
     })
    .then(res=>{
     // alert(res.data.data.head)
        let headimg = res.data.data.head
        localStorage.setItem('_headimg',headimg)
        localStorage.getItem('_headimg')
        this.headimg = 'https://chuangxue-oss.oss-cn-hangzhou.aliyuncs.com'+ localStorage.getItem('_headimg')  //res.data.data.head
        
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
  },
  lbt:function(){
    this.$axios.get("/consumer/missionLink/missionLinkList",{
      params:{
        category:2
      }
     })
    .then(res=>{
    //  console.log(res,888888)
        this.pics = res.data.data
       
        //console.log(min,sec,res)
    })
    .catch(err=>{

      // console.log(err)

    })
  },
  taskclick:function(){
      this.$bridge.callhandler('gettaskProfit', (data) => {
         // alert(321)
  // 处理返回数据
        })
  },
    backclick:function(){
       this.$bridge.callhandler('getbackProfit', (data) => {
         // alert(321)
  // 处理返回数据
        })
    
    },
       stop(){//禁止滑动限制
  document.body.style.overflow='hidden';

},
move(){//取消滑动限制
document.body.style.overflow='';

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
  margin: 0;
    float: left;
    color: #333;
    font-size: 26px;
      height: 48px;
      line-height: 48px;
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
.answer-djs-right{
  margin-right: 95px;
  margin-top: 30px;
}
.answer-djs-left{

  margin-top: 30px;
}
.tab p{
   margin: 0;
   font-size: 28px;
   height: 80px;
   line-height: 80px;
   font-weight: bold;
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
  margin: 0 auto;
}
.award-pool-amount{
  margin: 0;

  height: 33px;
  font-size: 24px;
  font-family: PingFang-SC-Medium, PingFang-SC;
  font-weight: 500;
  color: #999999;
  line-height: 33px;
}
.answer-djs{
  float: right;

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
  margin: 0;
  font-size: 24px;
  font-family: PingFang-SC-Medium, PingFang-SC;
  font-weight: 500;
  color: #999999;
}



</style>
