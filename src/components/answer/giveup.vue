<template>
  <div class="prompt">
      <div class="prompt-mc">
          
      </div>
      <div class="disgo">
           <div class="disgo-header">
               <img src="../../assets/answer_dialog_abandon_default@2x.png" alt="">
           </div>
           <div class="disgo-con">
               <p class="disgo-text">{{wrong}}</p>
    
               <div class="tab-but tab-but-again"  @click="againclick()">
                  <p class="tab-but-title">继续答题</p>
               </div>
               <p class="giveup" @click="giveup()">放弃答题</p>
           </div>
      </div>
  </div>
</template>

<script>

export default {
  name: 'giveup',
  props:['title'],
  data () {
    return {
      token:'',
      wrong:'放弃答题您将损失 丰厚奖励哦！'
    }
  },
  created () {
  this.token = this._token();
  
  },
  mounted () {
    // this.againnum()
 },
  methods: {
     againclick:function(){
        // console.log(111)
        this.$emit('child-give', false);
     },
    
     giveup:function(){
         console.log(22)
         this.$axios.get("/consumer/intelligence_question/give_up",{
     headers: {
        token: this.token // localStorage.getItem('_token')  //this.token
      },
      params:{
        sessionsType:this.title,
      }
    
     })
    .then(res=>{
     // console.log(res,7777)
        this.$emit('child-give', true);
       // this.open()
        // setTimeout(() => {
        //   this.$emit('child-event', false);
        // }, 1000)
         console.log(res,666)
    })
    .catch(err=>{
    })
     }
 },

  
  watch: {
    
 },
    computed: {

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.prompt{
    width: 750px;
    height: 100%;
     position: fixed;
    top: 0;
    left: 0;
    z-index: 9999999;
}
.prompt-mc{
    width: 750px;
    height: 100%;
    overflow: hidden;
    background: #000000;
    opacity: 0.5;
   
}
.disgo{

    width: 600px;
    height: 890px;
    position: fixed;
    top: 342px;
    left: 75px;
}
.disgo-header img{
    width: 600px;
    height: 260px;
    vertical-align: bottom;
}
.disgo-con{
    width: 600px;
    height: 390px;
    background: #fff;
    border-radius: 0 0 24px 24px;
}

.disgo-text{
  margin: 0 auto;
width: 320px;
height: 112px;
font-size: 40px;
font-family: PingFang-SC-Bold, PingFang-SC;
font-weight: bold;
color: #333333;
line-height: 56px;
text-align: center;
   padding-top: 50px;
}
.disgo-jytext{
    margin: 0;
height: 40px;
font-size: 28px;
font-family: PingFang-SC-Bold, PingFang-SC;
font-weight: bold;
color: #999999;
line-height: 40px;
text-align: center;
margin-top: 10px;
margin-bottom: 50px;
}
.tab-but{
    width: 360px;
    height: 80px;
    background: url(../../assets/answer_bt_blue_default@2x.png) no-repeat;
    background-size: 100%;
    color: #fff;
    margin: 0 auto;
    margin-top: 47px;
    
}
.tab-but-again{
    width: 360px;
    height: 80px;
    background: url(../../assets/answer_bt_challenge_default@2x.png) no-repeat;
    background-size: 100%;
}
.tab-but-title{
  margin: 0;
height: 80px;
font-size: 28px;
font-family: PingFangSC-Medium, PingFang SC;
font-weight: 500;
color: #FFFFFF;
line-height: 80px;
text-align: center;
}
.giveup{
    margin: 0;
height: 40px;
font-size: 28px;
font-family: PingFang-SC-Bold, PingFang-SC;
font-weight: bold;
color: #CCCCCC;
line-height: 40px;
text-align: center;
margin-top: 30px;
}
</style>
