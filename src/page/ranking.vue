<template>
  <div class="hello">
      <div class="top">
           <div class="go-prev" onclick="history.back(-1);">
           <i class="go-prev-left el-icon-arrow-left"></i>
           </div>
          <span class="text">{{ msg }}</span>
      </div>
    <div class="main-con">
        <div class="banner">
           <img src="../assets/answer_bg_ranking_default@2x.png" alt="">
           <div class="bk">

           </div>
        </div>
        <div class="con">
           <div class="overall-rank">
               <div class="overall-rank-mc">

               </div>
              <div class="rank">
                  <div class="information-main">
                       <div class="information-tx">
                           <img :src=" 'https://chuangxue-oss.oss-cn-hangzhou.aliyuncs.com'+head" alt="" class="tx">
                       </div>
                          <div class="information-name">
                                <p class="name">{{name}}</p>
                                    <div class="balance">
                                        <p class="balance-money">等级:LV.3</p>
                                     </div>
                          </div>
                              <div class="information-rank">
                                  第{{ranking}}名
                              </div>
                  </div>
                  <div class="rank-list">
                      <div class="rank-list-top">
                          <p class="rank-list-ranking rank-list-text">
                              排名
                          </p>
                          <p class="rank-list-name rank-list-text">
                              昵称
                          </p>
                          <p class="rank-list-reward rank-list-text">
                              奖励
                          </p>

                      </div>
                      <div class="rank-list-con" v-for="(item,index) in tabMain" :key="index">
                          
                          <div class="num"><p :id="numid(index)">{{index+1}}</p></div>
                          <div class="head-portrait">
                              <div class="head"><img src="../assets/mao.jpg" alt=""></div>
                              <div class="head-name">{{headname}}</div>
                          </div>
                          <div class="rank-money">
                              {{money}}元
                          </div>
                      </div>
                  </div>
              </div>
           </div>
        </div>
        
    </div>
     


    
  </div>
</template>

<script>

export default {
  name: 'ranking',
  data () {
    return {
      head:'',
      msg: '排行榜',
      name: 'Thoth_01',
      ranking:'129',
      headname:'Thtoh_01',
      money:'213.99',
      tabMain:[
          {money:324.12,time:'2020-10-10 16:59:23',state:true},
          {money:424.12,time:'2020-10-10 17:59:23',state:false},
          {money:524.12,time:'2020-10-10 18:59:23',state:true},
          {money:524.12,time:'2020-10-10 18:59:23',state:true},
          {money:524.12,time:'2020-10-10 18:59:23',state:true},
          {money:524.12,time:'2020-10-10 18:59:23',state:true},
          {money:524.12,time:'2020-10-10 18:59:23',state:true}
      ]
    }
  },
  created () {
 

  },
  mounted () {
     
 },
  methods: {
     numid:function(index){
       return 'numid'+index
     },
    numinfo:function(){
     this.$axios.get("/consumer/intelligence/my_ranking",{
       headers: {
        token: '8993a1b041d54563af134e0493746708'
      }
     })
    .then(res=>{
   //  console.log(res,33)
        this.head = res.data.data.head
        this.name = res.data.data.name
        this.money = res.data.data.money
        this.ranking = res.data.data.ranking
         let secseconds = res.data.data.seconds
        let min = parseInt(secseconds / 60 % 60)
        let sec = parseInt(secseconds % 60)
        min = min > 9 ? min : '0' + min
        sec = sec > 9 ? sec : '0' + sec
        if (secseconds == -1){
          this.secondtime = '00'
          this.minut = '00'
        } else {
          this.secondtime = min
          this.minut =sec
        }
        if (this.nownum <= 0){
           this.strengthanswer = true
        }
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
.hello{
  margin: 0 auto;
  width: 750px;
  height: 1512px;
 
 
}
.main-con{
  height: 100%;
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
.banner{
    position: relative;
}
.bk{
    width: 750px;
    height: 32px;
    border-radius: 32px 32px 0 0;
    background: #fff;
    position: absolute;
    left: 0;
    bottom: 0;
}
.banner img{
  width: 750px;
  height: 304px;
  vertical-align: top;
}
.con{
    width: 750px;
    height: 100%;
    background: #fff;
    margin-bottom: 20px;
}
.overall-rank-mc{
    width: 720px;
    height: 132px;
    background: #1677FF;
    border-radius: 10px;
    opacity: 0.16;
    filter: blur(10px);
    position: absolute;
    left: 0;
    top: 0;
}
.overall-rank{
   position: relative;
   width: 716px;
    height: 132px;
    margin: 0 auto;
    margin-top: 5px;
     border-radius: 10px;
}
.rank{
    width: 710px;
    height: 132px;
    position: absolute;
    top: 0px;
    background: #fff;
    left: 3px;
}

.information-tx{
    float: left;
}
.tx{
    margin: 0;
  width: 80px;
  height: 80px;
  border-radius: 40px;
  margin: 26px 0 26px 30px;
}
.information-name{
    margin-left: 20px;
    font-size: 32px;
    font-weight: 500;
    color: #fff;
    float: left;
}
.name{
    height: 45px;
    line-height: 45px;
    margin-top: 27px;
    margin-bottom: 0;
    color: #333;
}
.balance{
    width: 206px;
    height: 33px;
    background: #fff;
    border-radius: 24px;
}

.balance-money{
    margin: 0;
    float: left;
    color: #999;
    font-size: 24px;
    font-family: PingFang-SC-Bold, PingFang-SC;
    font-weight: bold;
}
.information-rank{
    float: left;
height: 45px;
font-size: 32px;
font-family: PingFang-SC-Bold, PingFang-SC;
font-weight: bold;
color: #1677FF;
line-height: 45px;
margin-top: 44px;
margin-left: 220px;
}
.rank-list{
    width: 640px;
    margin: 0 auto;
    clear: both;
    height: 100%;
    margin-bottom: 40px;
}
.rank-list-top{
     width: 640px;
    margin: 0 auto;
    clear: both;
    height: 100%;

}
.rank-list-text{
    margin: 0;
    float: left;
    color: #B8BFC6;
    font-size: 28px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    height: 40px;
    line-height: 40px;
    margin-top: 40px;
}
.rank-list-ranking{
    width: 140px;
}
.rank-list-name{
    width: 360px;
}
.rank-list-reward{
    width: 140px;
    text-align: center;
}
.rank-list-con{
    clear: both;
    width: 640px;
    height: 80px;
    margin-bottom: 40px;
}
.num{
    width: 140px;
    height: 80px;
    float: left;
}
.num p{
    margin: 0;
    width: 64px;
    height: 66px;
    text-align: center;
    line-height: 66px;
    font-size: 32px;
    color: #999;
    margin-top: 7px;
}
.head-portrait{
    float: left;
    width: 360px;
}
.head img {
    width: 80px;
    height: 80px;
    border-radius: 40px;
    float: left;
    margin-right: 20px;
}
.head-name{
    
    height: 45px;
    font-size: 32px;
    font-family: PingFang-SC-Bold, PingFang-SC;
    font-weight: bold;
    color: #333333;
    line-height: 45px;
    margin-top: 18px;
}
.rank-money{
    height: 45px;
    font-size: 32px;
    font-family: PingFang-SC-Bold, PingFang-SC;
    font-weight: bold;
    color: #FFCC00;
    line-height: 45px;
    padding-top: 17px;
}
#numid0{
    background: url(../assets/answer_icon_no1_default@2x.png) no-repeat;
    background-size: 100%;
    color: #fff;
}
#numid1{
    background: url(../assets/answer_icon_no2_default@2x.png) no-repeat;
    background-size: 100%;
    color: #fff;
}
#numid2{
    background: url(../assets/answer_icon_no3_default@2x.png) no-repeat;
    background-size: 100%;
    color: #fff;
}
</style>
