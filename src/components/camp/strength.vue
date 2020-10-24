<template>
  <div class="prompt">
      <div class="prompt-mc">
          
      </div>
      <div class="disgo">
           <img class="close" @click="closeclick()" src="../../assets/answer_icon_dialog_close@2x.png" alt="">
           <p class="disgo-text" >提示</p>
           <img class="light" src="../../assets/answer_dialog_energy_default@2x.png" alt="">
           <p class="insuff">体力值不足</p>
           <p class="disgo-title">({{prompt}}/10)</p>
           <div class="tab-but">

              <p class="tab-but-title"  @click="lookclick()">观看广告补充体力</p>
         </div>
      </div>
  </div>
</template>

<script>

export default {
  name: 'prompt',
  data () {
    return {
        prompt:'0',
        over: false,
        gg:'观看广告参加有奖答题',
        success:'有奖答题报名成功'
    }
  },
  created () {
 
  
  },
  mounted () {
     
 },
  methods: {
     lookclick:function(){
        this.$bridge.callhandler('getintelligenceProfit', (data) => {
          alert(321)
  // 处理返回数据
        })
      //  this.$emit('child-strength', false);
     },
     closeclick:function(){
        this.$emit('child-strength', false);
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
    height: 1334px;
     position: fixed;
    top: 0;
    left: 0;
    z-index: 9999999;
}
.prompt-mc{
    width: 750px;
    height: 1512px;
    overflow: hidden;
    background: #000000;
    opacity: 0.5;
   
}
.disgo{
    width: 600px;
    height: 593px;
    background: #FFFFFF;
    border-radius: 32px;
    position: fixed;
    top: 371px;
    left: 75px;
}
.close{
    position: absolute;
    right: 0;
    top: 0;
    width: 64px;
    height: 64px;
}
.tab-but{
  width: 360px;
  height: 80px;
  line-height: 80px;
  font-size: 28px;
  color: #fff;
  text-align: center;
  background: url(../../assets/answer_bt_challenge_default@2x.png) no-repeat;
  background-size: 100%;
  position: absolute;
  left: 120px;
  bottom: 40px;
}
.disgo-text{
  margin: 0;
height: 45px;
font-size: 32px;
font-family: PingFang-SC-Medium, PingFang-SC;
font-weight: 500;
color: #282828;
line-height: 45px;
  margin: 30px 0  0 268px;
}
.light{
    display: block;
    width: 82px;
    height: 123px;
    margin: 0 auto;
    margin-top: 80px;
}
.insuff{
    margin: 0;
height: 40px;
font-size: 28px;
font-family: PingFangSC-Medium, PingFang SC;
font-weight: 500;
color: #282828;
line-height: 40px;
text-align: center;
margin-top: 55px;
}
.disgo-title{
  margin: 0;
  
height: 50px;
font-size: 36px;
font-family: PingFangSC-Medium, PingFang SC;
font-weight: 500;
color: #FFCC00;
line-height: 50px;
  margin: 10px 0  0 0;
  text-align: center;
}
.tab-but-title{
  margin: 0;
  height: 45px;
  line-height: 45px;
  margin-top: 14px;
}
</style>
