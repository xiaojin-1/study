<template>
  <div class="prompt">
      <div class="prompt-mc">
          
      </div>
      <div class="disgo">
           
           <p class="disgo-text">{{success}}</p>
           <p class="disgo-title" v-for="(item,index) in text" :key="index">{{item.text}}</p>
           <p class="golook" @click="closeclick()">我知道了</p>
      </div>
  </div>
</template>

<script>

export default {
  name: 'rule',
  data () {
    return {
        over: false,
        success:'答题挑战规则',
        text:[
            {
                text:'1.报名：观看对应广告即可参与报名，有三种目标题目可供选择，分别为10题场，20题场，30题场，相对应所需观看广告数量为2个、4个、6个，用户可以同时报名参与多个；'
            },
            {
                text:'2.答题：答题当天用户需到达答题页面参与答题，10题场需答对7题，20题场需答题14题，30题场需答对21题，方可获得瓜分红包大奖资格；'
            },
            {
                text:'3.奖池：10题场：红包总金额=参与报名人数× X；20题场：红包总金额=参与报名人数× X；30题场：红包总金额=参与报名人数× X;'
            }
        ]
    }
  },
  created () {
 
  
  },
  mounted () {
     
 },
  methods: {
     closeclick:function(){
       //  console.log(111)
        this.$emit('child-rule', false);
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
    height: 847px;
    background: #fff;
    position: fixed;
    top: 244px;
    left: 75px;
    border-radius: 24px;
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
height: 45px;
font-size: 32px;
font-family: PingFangSC-Medium, PingFang SC;
font-weight: 500;
color: #1677FF;
line-height: 45px;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 30px;
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
width: 520px;
font-size: 28px;
font-family: PingFang-SC-Medium, PingFang-SC;
font-weight: 500;
color: #333333;
line-height: 40px;
margin: 0 auto;
margin-bottom: 30px;
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
width: 400px;
height: 72px;
background: #1677FF;
border-radius: 45px;
line-height: 72px;
font-size: 28px;
font-family: PingFang-SC-Medium, PingFang-SC;
font-weight: 500;
color: #FFFFFF;
text-align: center;
margin: 20px 0 0 100px;
}
</style>
