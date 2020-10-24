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
                           <img :src="head" alt="" class="tx">
                       </div>
                          <div class="information-name">
                                <p class="name">{{name}}</p>
                                    <!-- <div class="balance">
                                        <p class="balance-money">等级:LV.3</p>
                                     </div> -->
                          </div>
                              <div class="information-rank" v-if="rank==true">
                                  第{{ranking}}名
                              </div>
                              <div class="information-rank" v-else>
                                  未上榜
                              </div>

                  </div>
                  <div class="rank-list" >
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
                      <div style="height:500px">
 <el-scrollbar id="resultScroll"  ref="myScrollbar" style="height: 100%">
                      <div class="rank-list-con" v-for="(item,index) in tabMain" :key="index">
                          
                          <div class="num"><p :id="numid(index)">{{index+1}}</p></div>
                          <div class="head-portrait">
                              <div class="head"><img :src=" 'https://chuangxue-oss.oss-cn-hangzhou.aliyuncs.com'+item.head" alt=""></div>
                              <div class="head-name">{{item.userName}}</div>
                          </div>
                          <div class="rank-money">
                              {{item.number}}元
                          </div>
                      </div>
                      </el-scrollbar>
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
      rank:'',
      token:'',
      userCode:'',
      model:'',
      version:'',
      head:'',
      msg: '排行榜',
      name: '',
      ranking:'129',
      headname:'Thtoh_01',
      money:'213.99',
      resultList: {}, // 接口数据
      tabMain: [], // 记录列表
      scrollTop: 0,
      //tradPageNo: 1, // 当前页
      tradPageNo:1,
    //   tabMain:[
    //       {money:324.12,time:'2020-10-10 16:59:23',state:true},
    //       {money:424.12,time:'2020-10-10 17:59:23',state:false},
    //       {money:524.12,time:'2020-10-10 18:59:23',state:true},
    //       {money:524.12,time:'2020-10-10 18:59:23',state:true},
    //       {money:524.12,time:'2020-10-10 18:59:23',state:true},
    //       {money:524.12,time:'2020-10-10 18:59:23',state:true},
    //       {money:524.12,time:'2020-10-10 18:59:23',state:true}
    //   ]
    }
  },
  created () {
 
    this.token = this._token();
    this.userCode = this._userCode();
    this.model = this._model();
    this.version = this._version();
  },
  mounted () {
     this.numinfo();
     var that = this
     that.getResultList()
             // 监听滚动事件
     document.getElementById('resultScroll').addEventListener('scroll', that.handleScroll,true)
 },
  methods: {
       handleScroll(){
                var that = this
                var sh = that.$refs['myScrollbar'].$refs['wrap'].scrollHeight // 滚动条高度
                var st = that.$refs['myScrollbar'].$refs['wrap'].scrollTop // 滚动条距离顶部的距离
                var ch = that.$refs['myScrollbar'].$refs['wrap'].clientHeight // 滚动条外容器的高度
                if (st + ch >= sh) {
           
                    //到底了-业务逻辑
                   
                    that.tradPageNo += 1
                    that.getResultList()
                    // if(that.tradPageNo<=that.resultList.page.totalPage){
                        
                    // }
 
 
                }
 
            },
            getResultList() {
                console.log(11)
             var that = this
             var data = {
                  pageNo: that.tradPageNo,
                  pageSize: 10
             };
             this.$axios.get("/consumer/intelligence/ranking",{
                    params:data
                    })
                     .then(res=>{
                      //console.log(res,33)
                       if (res.data.code === 0) {
                        that.resultList = res.data.data
                        //console.log(that.resultList)
                        that.tabMain = that.tabMain.concat(res.data.data)
                      //  console.log( that.tabMain,1111)
                    }
                  })




                // ResultList(data).then(res => {
                //     if (res.errno === 0) {
                //         that.resultList = res.result
                //         that.list = that.list.concat(res.result.list)
                //     }
                // })
            },

     numid:function(index){
       return 'numid'+index
     },
    numinfo:function(){
   
     this.$axios.get("/consumer/intelligence/my_ranking",{
       headers: {
        token: this.token
      }
     })
    .then(res=>{
     console.log(res,33)
     if (res.data.data == null){
         this.rank = false
     } else {
         this.rank = true
          let headimg = res.data.data.head
        localStorage.setItem('_headimg',headimg)
        localStorage.getItem('_headimg')
        this.head = 'https://chuangxue-oss.oss-cn-hangzhou.aliyuncs.com'+ localStorage.getItem('_headimg')
      //   this.head = res.data.data.head
        this.name = res.data.data.userName
        this.money = res.data.data.money
        this.ranking = res.data.data.ranking 
     }
      
      

    })
    .catch(err=>{
    })
    },

    phblist:function(){
        
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
    margin-top: 40px;
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
margin-left: 300px;
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
    width: 250px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
