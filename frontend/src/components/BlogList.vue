<template>
  <div>
      <nav-bar>
          <div slot="title">Blog</div>
      </nav-bar>
      <div class="content">
          <ul>
              <li><div class="menu">
                  <div class="title">关于这个博客</div>
                  <div class="time">2017-01-01</div>
              </div></li>
          </ul>
      </div>
  </div>
</template>

<script>
 import NavBar from '@/components/NavBar';
export default {
  name: 'BlogList',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
     components:{
         NavBar
     }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .menu {
     display: flex;
     justify-content: space-between;
     width: 40vw;
 }
 .menu .time{
     color: grey;
     font-size: 0.8em;
 }
</style>
