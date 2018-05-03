<template>
    <div>
        <div class="navbar">
            <h1><slot name="title" ></slot></h1>
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
        <hr class="mysplit-color"/>
    </div>
</template>

<script>
 export default {
     name: 'NavBar',
     data () {
         return {
             user: {},
             name: '',
             passwd: '',
             signin: false,
             unread: 0,
         }
     },
     methods:{
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
</style>
