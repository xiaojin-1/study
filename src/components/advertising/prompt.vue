<template>
  <div class="prompt">
      <div class="prompt-mc">
          
      </div>
      <div class="disgo">
           <img class="close" @click="closeclick()" src="../../assets/answer_icon_ad_close@2x.png" alt="">
           <p class="disgo-text" v-if="state==0">{{gg}}</p>
           <p class="disgo-text" v-else>{{success}}</p>
           <p class="disgo-title">广告观看进度：{{prompt}}</p>
           <div class="tab-but">
              <p class="tab-but-title" v-if="state==0">观看广告</p>
              <p class="tab-but-title"  @click="closeclick()" v-else>确定</p>
         </div>
      </div>
  </div>
</template>

<script>

export default {
  name: 'prompt',
  props:['title'],
  data () {
    return {
        prompt:'',
        state: ' ',
        gg:'观看广告参加有奖答题',
        success:'有奖答题报名成功'
    }
  },
  created () {
 
  },
  mounted () {
     this.signup()
 },
  methods: {
     closeclick:function(){
        this.$emit('child-event', false);
     },
     signup:function(){
      this.$axios.get("/consumer/intelligence/sign_up",{
       headers: {
        token: '8993a1b041d54563af134e0493746708'
      },
      params:{
        type:this.title
      }
     })
    .then(res=>{
      let state = res.data.data.status
      this.state = state
      this.prompt = res.data.data.adSchedule
        console.log(res,1111)
    })
    .catch(err=>{

      // console.log(err)

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
    background: url(../../assets/answer_dialog_ad_default@2x.png) no-repeat;
    background-size: 100%;
    width: 600px;
    height: 350px;
    position: fixed;
    top: 495px;
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
  width: 320px;
  height: 72px;
  line-height: 72px;
  font-size: 28px;
  color: #fff;
  text-align: center;
  background: url(../../assets/answer_bt_challenge_default@2x.png) no-repeat;
  background-size: 100%;
  position: absolute;
  left: 140px;
  bottom: 40px;
}
.disgo-text{
  margin: 0;
  width: 360px;
  height: 50px;
  font-size: 36px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #FFFFFF;
  line-height: 50px;
  margin: 80px 0  0 134px;
}
.disgo-title{
  margin: 0;
  height: 37px;
  font-size: 26px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #FFFFFF;
  line-height: 37px;
  margin: 20px 0  0 189px;
}
.tab-but-title{
  margin: 0;
  height: 45px;
  line-height: 45px;
  margin-top: 14px;
}
</style>
