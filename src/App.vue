<template>
  <div id="app">
    <leftbox></leftbox>
    <router-view/>
    
  </div>
</template>

<script>
// 导入左侧组件模板
import leftbox from "./components/common/left.vue"
export default {
  name: 'app',
  // 创建组件
  components:{
       leftbox
  }
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
