<template>
    <div>
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
            <hr class="mysplit-color"/>
            <div class="introduction">
                大家好，这里是爱大海的狐狸君的主页，如你所见，我想写博客，写小说，拍照片，而在这一页的第一个社交按钮表明，我是一只程序猿。
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

 fontawesome.library.add(faGithub, faWeibo, faInstagram, faEnvelope);
 export default {
     name: 'Profile',
     data () {
         return {
             msg: 'Welcome to Your Vue.js App'
         }
     },
     components:{
         FontAwesomeIcon
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
     margin-left: 10vw;
     margin-right: 10vw;
     margin-top: 5vh;
 }
</style>
