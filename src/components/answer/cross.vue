<template>
  <div class="hello">
      <div class="top">
           <div class="go-prev" @click="leaveclick" >
           <i class="go-prev-left el-icon-arrow-left"></i>
           </div>
          <span class="text">{{ msg }}</span>
      </div>
      <div class="main-con">
           <div class="disgo">
               <div style="padding-top:1px">
                 <div class="tx">
                   <img :src=" 'https://chuangxue-oss.oss-cn-hangzhou.aliyuncs.com'+head" alt="">
                 </div>
                 <p class="name">{{name}}</p>
                 <p class="answernum" v-if="answerstate == true">通过{{num}}道题目获得口令红包</p>
                   <p class="answernum" v-else>你已经很棒了，离大奖只差一点!</p>
                  <div class="tab-but tab-but-again" v-if="state == true" @click="leaveclick()">
                  <p class="tab-but-title">
                    <route-link to="/">
                         收下口令开始下一场
                    </route-link>
                   
                    </p>
                </div>
                <div class="tab-but" @click="leaveclick()">
                  <p class="tab-but-title">离开</p>
                </div>
               </div>
              
           </div>
      </div>
      
  </div>
</template>

<script>

export default {
  name: 'cross',
 
  data () {
    return {
        msg:'答题结果',
        name:'Thoth_01',
        num:'7',
        state:false,
        answerstate:false,
        head:''
    }
  },
  created () {
 this.types = this.$route.query.types
     if (this.types == 1){
       this.num == 7
     }
     if (this.types == 2){
       this.num == 14
     }
     if (this.types == 3){
       this.num == 21
     }
  },
  mounted () {
      this.numinfo()
    },
  methods: {
    
  leaveclick:function(){
       this.$router.push({ path: '/'})
  },
  numinfo:function(){
this.$axios.get("/consumer/intelligence_question/answer_num_info",{
       headers: {
        token: '8993a1b041d54563af134e0493746708'
      },
      params:{
        sessionsType:this.types
      }
     })
    .then(res=>{
    // console.log(res)
        //this.num = res.data.data.answerNum
        this.name = res.data.data.userName
        this.head = res.data.data.head
    })
    .catch(err=>{
    })
    },
  },
  watch: {
      
 },
    computed: {
     
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
  height: 1206px;
 background: url(../../assets/answer_bg_home_default@2x.png) no-repeat;
  background-size: 100%;
   padding-top: 1px;
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
.disgo{
    display: block;
    background: url(../../assets/answer_bg_result_default@2x.png) no-repeat;
    background-size: 100%;
    width: 690px;
    height: 100%;
    margin-top: 60px;
    margin-left: 30px;
   
}
.tx{
    display: block;
    background: url(../../assets/answer_icon_head_default@2x.png) no-repeat;
    background-size: 100%;
    width: 212px;
    height: 188px;
    margin: 0 auto;
    margin-top: 255px;
    position: relative;
}
.tx img{
    width: 152px;
    height: 152px;
    border-radius:152px;
    position: absolute;
    top: 30px;
    left: 30px;
}
.name{
    margin: 0;
height: 50px;
font-size: 36px;
font-family: PingFangSC-Medium, PingFang SC;
font-weight: 500;
color: #333333;
line-height: 50px;
text-align: center;
margin-top: 24px;
}
.answernum{
    margin: 0;
height: 45px;
font-size: 32px;
font-family: PingFang-SC-Medium, PingFang-SC;
font-weight: 500;
color: #FFCC00;
line-height: 45px;
text-align: center;
margin-top: 70px;
margin-bottom: 80px;
}
.tab-but{
    width: 360px;
    height: 80px;
    background: url(../../assets/answer_bt_blue_default@2x.png) no-repeat;
    background-size: 100%;
    color: #fff;
    margin: 0 auto;

    
}
.tab-but-title{
    
height: 80px;
font-size: 28px;
font-family: PingFangSC-Medium, PingFang SC;
font-weight: 500;
color: #FFFFFF;
line-height: 80px;
text-align: center;
}
.tab-but-again{
    width: 360px;
    height: 80px;
    background: url(../../assets/answer_bt_challenge_default@2x.png) no-repeat;
    background-size: 100%;
}
</style>
