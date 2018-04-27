<template>
    <div>
        <div class="navbar">
            <h1><slot name="title" ></slot></h1>
            <div class="user" @click="doLogin()">{{user?user:'sign in'}}</div>
            <div class="login" :class="{anonymous: signin}">
                <input type="text" name="user" value="" v-model="name" placeholder="username" />
                <input type="password" name="passwd" value="" v-model="passwd" placeholder="passwd" />
                <input name="" type="button" value="登录" @click="login" />
            </div>
        </div>
        <hr class="mysplit-color"/>
    </div>
</template>

<script>
 export default {
     name: 'NavBar',
     data () {
         return {
             user: '' ,
             name: '',
             passwd: '',
             signin: false,
         }
     },
     methods:{
         doLogin: function(){
             if(this.user == '')
                 {
                     this.signin = true;
                 }
         },
         login:function(){
             axios.post('/api/login', {
                 user: navbar.name,
                 pass: navbar.passwd
             }).then(res => {
                 let data = res.data.content;
                 if(res.data.code == '200')
                     {
                         setCookie('username', data.user, 7);
                         setCookie('userid', data._id, 7);
                         /* window.location.href = window.location.href;*/
                         this.$router.go();
                     }
             });
         }
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
</style>
