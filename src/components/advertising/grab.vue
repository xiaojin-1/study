<template>
  <div class="prompt">
      <div class="prompt-mc">
          
      </div>
      <div class="disgo">
         
           <p class="disgo-text">{{success}}</p>
           <p class="disgo-title"><span>￥</span>{{prompt}}</p>
           <div class="tab-but"  @click="grabclick()">
              <p class="tab-but-title">确定领取</p>
           </div>
           <p class="golook" @click="lookclick()">前去查看 ></p>
      </div>
  </div>
</template>

<script>

export default {
  name: 'grab',
  props:['title'],
  data () {
    return {
        token:'',
        userCode:'',
        model:'',
        version:'',
        prompt:'19.5',
        over: false,
        success:'恭喜你获得'
    }
  },
  created () {
    this.token = this._token();
    this.userCode = this._userCode();
    this.model = this._model();
    this.version = this._version();
  
  },
  mounted () {
     this.grabshow();
 },
  methods: {
     grabclick:function(){
        this.$axios.get("/consumer/intelligence/receive_profit",{
       headers: {
        token: this.token
      },
      params:{
        sessionsType:this.title
      }
     })
    .then(res=>{
     console.log(res,33)
     this.$emit('child-grab', false);
       
    })
    .catch(err=>{
    })
     },
     grabshow:function(){
       this.$axios.get("/consumer/intelligence/my_profit",{
       headers: {
        token: 'cc349aa7d6c748ffaf229cac4f96c976'
      },
      params:{
        sessionsType:this.title
      }
     })
    .then(res=>{
      console.log(res,33)
      this.prompt = res.data.data
     
    
       
    })
    .catch(err=>{
    })
     },
    lookclick:function(){
       this.$emit('child-grab', false);
        this.$bridge.callhandler('grablookclick', (data) => {
         // alert(321)
  // 处理返回数据
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
    background: url(../../assets/dialog_challenge_envelopes@2x.png) no-repeat;
    background-size: 100%;
    width: 600px;
    height: 606px;
    position: fixed;
    top: 364px;
    left: 75px;
}

.tab-but{
  width: 400px;
height: 80px;
margin-top: 220px;
background: #FEDAA4;
border-radius: 44px;
margin-left: 100px;
}
.disgo-text{
  margin: 0;
  width: 140px;
height: 40px;
font-size: 28px;
font-family: PingFang-SC-Medium, PingFang-SC;
font-weight: 500;
color: #B68F56;
line-height: 40px;
  margin: 40px 0  0 230px;
}
.disgo-title span{
  margin: 0;
height: 90px;
font-size: 52px;
font-family: DIN-Medium, DIN;
font-weight: 500;
color: #B68F56;
line-height: 58px;

}
.disgo-title{
  margin: 0;
height: 90px;
text-align: center;
font-size: 80px;
font-family: DIN-Medium, DIN;
font-weight: 500;
color: #B68F56;
line-height: 58px;
margin-top: 50px;
}
.tab-but-title{
  margin: 0;
height: 50px;
font-size: 36px;
font-family: PingFangSC-Medium, PingFang SC;
font-weight: 500;
color: #B68F56;
line-height: 50px;
text-align: center;
padding-top: 15px;

}
.golook{
    margin: 0;
height: 37px;
font-size: 26px;
font-family: PingFang-SC-Medium, PingFang-SC;
font-weight: 500;
color: #FEDAA4;
line-height: 37px;
margin: 20px 0 0 238px;
}
</style>
