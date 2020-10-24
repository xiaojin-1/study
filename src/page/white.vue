<template>
  <div class="hello">
      <p>加载中</p>
  </div>
</template>

<script>

export default {
  name: 'white',
  components: {
 
  },
  data () {
    return {
      token:'',
    }
  },
  created () {
      let token = ''
     this.$bridge.registerhandler('setupWebViewtoken', (data, responseCallback) => {
          // console.log('lookgetTrainingfinsh')  
          // console.log(this.advertising = false)
         // alert(data)
          var dataJSON = JSON.parse(data)
      //    alert(dataJSON.token)
          token  = dataJSON.token
          localStorage.setItem('_token',token)
           alert(token+'1111s')
           responseCallback(data)

        })
 // this.token = this._token();
  },
  mounted () {
    this.roading();
     
    },
  methods: {

    roading:function(){
        this.$router.push('/index')
        //  this.token.length>0
        // if(this.token.length>0){
        //    this.$router.push('/index')
        // } else {

        // }

       
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



</style>
