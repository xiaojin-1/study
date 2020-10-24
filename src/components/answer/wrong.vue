<template>
  <div class="prompt">
      <div class="prompt-mc">
          
      </div>
      <div class="disgo">
           <div class="disgo-header">
               <img src="../../assets/answer_dialog_error_default@2x.png" alt="">
           </div>
           <div class="disgo-con">
               <p class="disgo-text">{{wrong}}</p>
               <p class="disgo-jytext">{{wrongjy}}</p>
               <div class="tab-but"  @click="lookclick()">
                  <p class="tab-but-title">{{remedy1}}</p>
               </div>
                
               <div class="tab-but"  @click="readyclick()">
                  <p class="tab-but-title">{{remedy2}}</p>
               </div>
              
                <div class="tab-but tab-but-again"  v-if="title == 0" >
                   <router-link to="cross">
                       <p class="tab-but-title">查看结果</p>
                   </router-link>
                  
               </div>
               <div class="tab-but tab-but-again" v-else  @click="againclick()">
                  <p class="tab-but-title">继续答题</p>
               </div>
              
           </div>
      </div>
           

    
  </div>
</template>

<script>
import cross from './cross';
export default {
  name: 'wrong',
  props:['title','question'],
  components: {
   cross,
  },
  data () {
    return {
      
        advertising:true,
        prompt:'19.5',
        over: false,
        wrong:'很遗憾答错了',
        wrongjy:'加油再接再厉哦',
        remedy1:'观看广告补救',
        remedy2:'消耗阅读值补救',
        num:10,
        showcon:false,
        continuetext:'继续答题'
    }
  },
  created () {
   this.$bridge.registerhandler('lookgetremedyfinsh', (data, responseCallback) => {
          // console.log('lookgetTrainingfinsh')  
          // console.log(this.advertising = false)
          if (data==1){
            //  this.$emit('child-event', false);
              this.lookresultclick()
          // this.advertising = false
         //  this.readvalanswer = false
          // this.strengthanswer = false
          // this.numinfo();
          // this.move();
          } 
          
           responseCallback(data)

        })
  
  },
  mounted () {
     this.againnum()
 },
  methods: {
     againclick:function(){
        // console.log(111)
        this.$emit('child-event', false);
     },
     againnum:function(){
         let _num = 10
         if(_num == this.num){
            this.showcon = false
         }
     },
    
     lookclick:function(){
          this.$bridge.callhandler('getremedyProfit',this.title,(data) => {
         // alert(321)
  // 处理返回数据
        })
     },
     readyclick:function(){
         this.$axios.post("/consumer/intelligence_question/remedy",{
      
        questionId:this.question,
        sessionsType:this.title,
        type:1
      
     })
    .then(res=>{
        //let remedyNum =res.code == 1
       // console.log(res)
        if (res.data.code == 1){
            this.over()
            //this.numover = false
            //this.remedy2 = '补救次数耗尽'
        } else {
        this.open()
        setTimeout(() => {
          this.$emit('child-event', false);
        }, 1000)
        }
       
         //console.log(res,666)
    })
    .catch(err=>{
    })
     },
     lookresultclick:function(){
         this.$axios.post("/consumer/intelligence_question/remedy",{
      
        questionId:this.question,
        sessionsType:this.title,
        type:2
      
     })
    .then(res=>{
        if (res.data.code == 1){
            this.over()
          // this.looknumover  =  false
          // this.remedy1 = '补救次数耗尽'
        } else {
           this.open()
        setTimeout(() => {
          this.$emit('child-event', false);
        }, 1000)
        }
        
       //  console.log(res,666)
    })
    .catch(err=>{
    })
     },
    over:function(){
         this.$message('补救次数不足');
    },

    open() {
        this.$message('补救成功');
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
    height: 890px;
    position: fixed;
    top: 222px;
    left: 75px;
}
.disgo-header img{
    width: 600px;
    height: 324px;
    vertical-align: bottom;
}
.disgo-con{
    width: 600px;
    height: 566px;
    background: #fff;
}

.disgo-text{
  margin: 0;
height: 67px;
font-size: 48px;
font-family: PingFang-SC-Bold, PingFang-SC;
font-weight: bold;
color: #333333;
line-height: 67px;
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
    margin-bottom: 30px;
    
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

</style>
