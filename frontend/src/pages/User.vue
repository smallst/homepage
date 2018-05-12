<template>
    <div>
        <nav-bar @userCheck="setUser" :title="user.name">
            <!-- <div slot="title">{{user.name}}</div> -->
        </nav-bar>
        <div class="content">
            <div class="nav">
                <div @click="setPage('info')">个人信息</div>
                <div @click="setPage('message')">消息</div>
            </div>
            <div class="info" v-if="page=='info'">
                <div>
                    <div>昵称：{{user.name}}</div>
                    <div>修改密码： <input name="" type="password" v-model="pass" /></div>
                    <div>确认密码： <input name="" type="password" v-model="repeatPass" /></div>
                    <div><input name="" type="button" value="确认" @click="editInfo" /></div>
                </div>
            </div>
            <div class="message" v-else>
                <div @click="readAll">readAll</div>
                <div v-for="m in messages" @click="viewMessage(m)">
                    <div :class="{read: m.read}">
                        {{m.info.who}} 回复了你，去看看
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
 import NavBar from '@/components/NavBar';
 export default {
     name: 'HelloWorld',
     props:['initInfo'],
     data () {
         return {
             user:{},
             page: this.initInfo,
             messages:[],
             pass:'',
             repeatPass:'',
         }
     },
     methods:{
         setUser: function(user) {
             this.user = user;
             let that = this;
             utils.get('getNotification?id='+that.user.id, res=>{
                 if(res.data.code == 200)
                     {
                         that.messages = res.data.content;
                     }
             })

         },
         setPage: function(page){
             this.page = page;
         },
         editInfo: function(){
             if(this.pass && this.pass === this.repeatPass)
                 {
                     let that =this;
                     utils.post('editUser',{
                         id: that.user,
                         pass: that.pass
                     }, res=>{
                         if(res.data.code == 200)
                             {
                                 alert("修改成功");
                                 that.pass = that.repeatPass = '';
                             }
                     });
                 }
             else{
                 alert("密码不一致！");
                 this.pass = this.repeatPass = '';
             }
         },
         viewMessage: function(m){
             utils.post('readNotification',{id: m._id}, res=>{
             });
             let info = m.info;
             let param = {cId: info.repliedId};
             if(info.url.type == 'gallery')
                 {
                     info.url.type = 'photo';
                     param.pId = info.url.id;
                 }
             else
                 {
                     param.id=info.url.id;
                 }
             console.log(param);
             this.$router.push({name:info.url.type, params:param});
         },
         readAll: function(){
             utils.post('readAll', {userId: this.user.id}, res=>{console.log(res.data)});
             this.messages.forEach(e=>{e.read=true;});
         }
     },
     components:{
         NavBar
     }
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .nav {
     display:flex;
     flex-direction: row;
     justify-content: space-around;
 }
 @media screen and (min-width: 1200px){
     .nav{
         flex-direction: column;
         position: absolute;
         align-items: flex-end;
         justify-content: flex-start;
         height: 80vh;
         border-right: 1px solid white;
         padding-right: 1em;
         left: -6em;
     }
     .nav>div{
         text-align: right;
         width: 4em;
         margin-bottom: 2vh;
         margin-top: 2vh;
         border-bottom: 1px solid white;
         cursor: pointer;
     }
 }
 .read{
     background: black;
 }
</style>
