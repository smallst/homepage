<template>
    <div>
        <nav-bar title="欢迎来到 smallst.cn">
        </nav-bar>
        <div class="content">
            <div class="info">
                <div class="avatar"><img src="@/assets/avatar-fox.jpeg" alt="" width="150"/></div>
                <div class="text">
                    <h1>Fox loves sea.</h1>
                    <div class="scoial-icons">
                        <a class="social" target="_blank" href="https://github.com/smallst"><font-awesome-icon :icon="['fab','github']"/></a>
                        <a class="social" target="_blank" href="https://www.instagram.com/fox.loves.sea/"><font-awesome-icon :icon="['fab','instagram']"/></a>
                        <a class="social" target="_blank" href="https://weibo.com/u/2394711990"><font-awesome-icon :icon="['fab','weibo']"/></a>
                        <a class="social" target="_blank" href="mailto:admin@smallst.me"><font-awesome-icon :icon="['far','envelope']"/></a>
                    </div>
                </div>
            </div>
            <br>
            <!-- <hr class="mysplit-color"/> -->
            <div class="introduction">
                <p>你好，这里是爱大海的狐狸君的主页。目前这里有博客，小说，照片三大内容。</p>
                <p>首先我是一只程序猿，这也是我建这个网站的根源。虽然博客已经是过气的东西了，但记录一下有趣的东西也未尝不可。</p>
                <p>小说呢只是自己的脑洞，文笔不好，内容也大多借鉴自己看过的动漫，更新漫漫无期，不要过多期待。</p>
                <p>也是才买了单反一年，照片拍得不够好，还在学习，如果喜欢请随意下载，但请勿用作商业用途。（才不可能被用）</p>
                <p>我现在{{age}}岁了，需要上课的研究生学分已经修完，以后的日子全凭心意，要好好规划。这个网站也因此进入 v1.0。</p>
                <p>右下角为导航 <font-awesome-icon id="arrow" :transform="{ rotate: angle }"  :icon="['fas','arrow-right']"></font-awesome-icon></p>
            </div>
            <div class="bottom">
                <p class="detail">这个网站使用 <a href="https://vuejs.org/">Vue.js</a> 与 <a href="https://github.com/axios/axios">axios</a> 构建，使用了 <a href="https://fontawesome.com/">Font Awesome</a>，其他皆为手撸。后端采用 <a href="https://nodejs.org/en/">nodejs</a> 配合<a href="https://www.mongodb.com/">MongoDb</a> 搭建，欢迎到 <a href="https://github.com/smallst/homepage/issues">Github</a> 提交 bug ，以帮助该网站越做越好。</p>
                <p>注册暂未开放，如想体验请邮件联系我。</p>
            </div>

        </div>
    </div>
</template>

<script>
 import fontawesome from '@fortawesome/fontawesome';
 import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
 import faGithub from '@fortawesome/fontawesome-free-brands/faGithub';
 import faWeibo from '@fortawesome/fontawesome-free-brands/faWeibo';
 import faInstagram from '@fortawesome/fontawesome-free-brands/faInstagram';
 import faEnvelope from '@fortawesome/fontawesome-free-regular/faEnvelope';
 import faArrowRight from '@fortawesome/fontawesome-free-solid/faArrowRight';
 import NavBar from '@/components/NavBar';

 fontawesome.library.add(faGithub, faWeibo, faInstagram, faEnvelope, faArrowRight);
 export default {
     name: 'Profile',
     computed:{
         age: function(){
             let date = new Date();
             let a = date.getFullYear() - 1995;
             return date > new Date(date.getFullYear()+'-05-25') ? a: a-1;
         },
     },
     data () {
         return {
             msg: 'Welcome to Your Vue.js App',
             angle: 0,
         }
     },
     mounted:function(){
         let a = document.getElementById("arrow").getBoundingClientRect();
         let b = document.getElementsByClassName("navball")[0].getBoundingClientRect();
         let p1 = {
             x: a.x + a.width/2,
             y: a.y + a.height/2
         };
          let p2 = {
             x: b.x + b.width/2,
             y: b.y + b.height/2
         };
         console.log("angle:"+Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI)
         this.angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
     },
     components:{
         FontAwesomeIcon,
         NavBar
     }
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 a.social{
     color: var(--main-color, 50%);
     font-size: 1.5em;
 }
 a.social:hover{
     color: var(--foreground-color);
 }
 .avatar{
     margin-right: 5%;
 }
 .info{
     display: flex;
     flex-direction: row;
 }
 .text{
     display: flex;
     flex-direction: column;
     justify-content: flex-end;
 }
 .introduction{
     font-family: kaiti;
     font-weight: bold;
     font-size: 20px;
     text-indent: 2em;
     margin-right: 10vw;
     margin-top: 5vh;
     margin-bottom: 5vh;
 }
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

 @media screen and (max-width: 1200px){
     .bottom .detail{
         display:none;
     }
     .bottom{
         bottom: 0em;
     }
 }
</style>
