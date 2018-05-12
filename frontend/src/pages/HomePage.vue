<template>
    <div>
        <nav-bar title="欢迎来到 smallst.me">
            <!-- <div slot="title">欢迎来到 smallst.me</div> -->
        </nav-bar>
        <div class="content">
            <p>这里可能有：</p>
            <ul>
                <li><router-link to="bloglist">博客</router-link></li>
                <li><router-link to="gallery">图库</router-link></li>
                <li><router-link to="storymenu">故事</router-link></li>
                <!-- <li><a href="profile/">我</a></li> -->
                <li><router-link to="profile">我</router-link></li>
                <li>其他...</li>
            </ul>
        </div>
        <div class="bottom">
            这个网站使用 <a href="https://vuejs.org/">Vue.js</a> 与 <a href="https://github.com/axios/axios">axios</a> 构建，使用了 <a href="https://fontawesome.com/">Font Awesome</a>，其他皆为手撸。后端采用 <a href="https://nodejs.org/en/">nodejs</a> 配合<a href="https://www.mongodb.com/">MongoDb</a> 搭建，欢迎到 <a href="https://github.com/smallst/homepage/issues">Github</a> 提交 bug ，以帮助该网站越做越好。<br>注册仅提供评论功能，请自行选择。
        </div>
    </div>
</template>

<script>
 import NavBar from '@/components/NavBar';
 console.log('hhh')
 console.log(NavBar)
 export default {
     name: 'HomePage',
     data () {
         return {
             msg: 'Welcome to Your Vue.js App'
         }
     },
     components:{
         'nav-bar': NavBar
     }
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .bottom{
     position:fixed;
     left:0;
     right: 0;
     margin-left: auto;
     margin-right: auto;
     bottom: 2em;
     width: 80%;
     text-align: center;
     color: #999999;
     font-size: 0.9em;
     z-index: -99;
 }
</style>
