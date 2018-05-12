<template>
    <div>
        <div class="navbar">
            <h1>{{title}}</h1>
            <div class="user" @click="doLogin()">
                {{user.name?user.name:'sign in'}}
                <span class="unread" v-if="unread">{{unread}}</span>
            </div>
            <div class="login" :class="{anonymous: signin}">
                <input type="text" name="user" value="" v-model="name" placeholder="username" />
                <input type="password" name="passwd" value="" v-model="passwd" placeholder="passwd" />
                <input name="" type="button" value="登录" @click="login" />
            </div>
        </div>
        <vue-snotify></vue-snotify>
        <div class="navball" @click="toggleNav()">
            <div v-if="title !='Gallery'" :class="{detail:detail}"><router-link to="/gallery"><font-awesome-icon icon="images" size="lg"></font-awesome-icon></router-link></div>
            <div v-if="title !='Blog'" :class="{detail:detail}"><router-link to="/bloglist"><font-awesome-icon icon="file-alt" size="lg"></font-awesome-icon></router-link></div>
            <div v-if="title !='Story'" :class="{detail:detail}"><router-link to="/storymenu"><font-awesome-icon icon="book" size="lg"></font-awesome-icon></router-link></div>
            <div v-if="title !='欢迎来到 smallst.me'" :class="{detail:detail}"><router-link to="/">
                <font-awesome-icon icon="home" size="lg"></font-awesome-icon>
            </router-link></div>
        </div>
        <hr class="mysplit-color"/>
    </div>
</template>

<script>
 import fontawesome from '@fortawesome/fontawesome';
 import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
 import faHome from '@fortawesome/fontawesome-free-solid/faHome';
 import faCamera from '@fortawesome/fontawesome-free-solid/faCamera';
 import faImages from '@fortawesome/fontawesome-free-solid/faImages';
 import faBook from '@fortawesome/fontawesome-free-solid/faBook';
 import faFileAlt from '@fortawesome/fontawesome-free-solid/faFileAlt';

 fontawesome.library.add(faHome,faCamera, faFileAlt, faBook, faImages);
 export default {
     name: 'NavBar',
     props: ['title'],
     data () {
         return {
             user: {},
             name: '',
             passwd: '',
             signin: false,
             unread: 0,
             detail: false,
         }
     },
     methods:{
         toggleNav:function(){
             this.detail = !this.detail;
         },
         doLogin: function(){
             if(this.user.name == undefined)
                 {
                     this.signin = true;
                 }
             else{
                 this.$router.push({name:'user',params:{'initInfo':this.unread?'message':'info'}});
             }
         },
         login:function(){
             let that =this;
             utils.post('login',{
                 user: that.name,
                 pass: that.passwd
             }, res => {
                 let data = res.data.content;
                 console.log(data);
                 that.$router.go();
             });
         },
         onMessage: function(event){
             let that = this;
             let data = JSON.parse(event.data);
             console.log(data);
             if(data=="be replied")
                 {
                     that.$snotify.success('recive a reply');
                     that.unread ++;
                 }
         },
     },
     mounted(){
         let that = this;
         window.that = this;
         utils.get('checkLogin', res => {
             console.log('checkLogin');
             let data = res.data.content;
             console.log(data);
             if(res.data.code == 200)
                 {
                     that.user={
                         name: data.user,
                         id: data._id
                     };
                     if(!utils.ws)
                     utils.ws = utils.startWS(that.onMessage); 
                 }
             else{
                 that.user = {};
             }
             console.log('emit');
             that.$emit('userCheck', that.user);
             utils.get('getUnreadNotification?id='+that.user.id,res => {
                 if(res.data.code == 200){
                     that.unread = res.data.content;
                     console.log('unread:'+that.unread);
                 }
             })
         });
     },
     components:{
         FontAwesomeIcon
     }
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .navbar{
     position: relative;
     display: flex;
     justify-content: space-between;
 }
 .navbar .user{
     margin-bottom: 1em;
     margin-right: 4vw;
     display: flex;
     flex-direction: column-reverse;
     cursor: pointer;
 }
 .login{
     display: none;
 }
 .login.anonymous{
     position: fixed;
     left: 0;
     right:0;
     top: 0;
     bottom: 0;
     margin: auto;
     /* border: 2px solid var(--blue); */
     background-color: var(--pink);
     border-radius: 5px;
     box-shadow: 2px 2px 1px grey;
     display: flex;
     flex-direction: column;
     width: 16em;
     height: 14em;
     cursor: pointer;
 }
 .login > input{
     font-size: 2em;
     background-color: var(--foreground-color);
 }
 .login > input[type='button']{
     letter-spacing: 1em;
     text-indent: 1em;
 }
 .unread{
     position: absolute;
     right: 3vw;
     bottom: 1.3em;
     width: 1.6em;
     height: 1.6em;
     border-radius: 0.8em;
     display:flex;
     justify-content:center;
     align-items: center;
     color: var(--pink);
     background-color: var(--foreground-color);
 }
 .navball{
     position: fixed;
     bottom: 4vh;
     right: 4vh;
     width: 3em;
     height: 3em;
     border-radius: 1.5em;
     background-color: var(--pink);
     border: 1px solid white;
 }
 .navball>div{
     display:flex;
     justify-content: center;
     align-items: center;
     position: absolute;
     width: 3em;
     height: 3em;
     border-radius: 1.5em;
     background: white;
     pointer-events: none;
     transform-origin: 50%,50%;
     opacity: 0;
     transition: transform 0.2s ease-in-out;
 }
 .navball>.detail{
     opacity: 1;
     pointer-events: auto;
 }
 .navball>div.detail:nth-child(1){
     /* transform: rotate(270deg) translate(10em) rotate(-270deg); */
     transform: translate(0,-6em);
 }
.navball>div.detail:nth-child(2){
    transform: translate(-4.2em,-4.2em);
 }
.navball>div.detail:nth-child(3){
     transform:  translate(-6em);
 }

 @media screen and (min-width: 1200px){
     .navball{
         right: 22vh;
     }
 }
</style>
