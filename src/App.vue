<template>
  <div id="app">
    
<keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
</keep-alive>
<router-view v-if="!$route.meta.keepAlive"></router-view>

  </div>
</template>

<script>

window.onload = function() {
    document.addEventListener('touchstart', function(event) {
      if (event.touches.length > 1) {
        event.preventDefault()
      }
    })
    document.addEventListener('gesturestart', function(event) {
      event.preventDefault()
    })
  }

export default {
  name: 'App'
}
</script>

<style>
body{
  margin: 0;
}
html,body,#app{
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background:#1677FF;
  height:100%;
  color: #2c3e50;
}
</style>
