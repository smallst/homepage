<template>
    <div>
        <nav-bar @userCheck="setUser">
            <div slot="title">{{user.name}}</div>
        </nav-bar>
        <div class="content">
            <div class="nav">
                <div @click="setPage('info')">个人信息</div>
                <div @click="setPage('message')">消息</div>
            </div>
            <div class="info" v-if="page=='info'">
                info
            </div>
            <div class="message" v-else>
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
         }
     },
     mounted(){
         
     },
     components:{
         NavBar
     }
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .read{
     background: black;
 }
</style>
