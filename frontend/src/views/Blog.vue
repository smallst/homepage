<template>
    <div>
        <nav-bar v-on:userCheck="setUser" :title="title">
            <!-- <div slot="title">{{title}}</div> -->
        </nav-bar>
        <div class="content">
            <div v-if="edit"><router-link  :to="{name:'edit',params:{type:'blog',id:id}}">edit</router-link></div>
            <div v-html="body"></div>
            <comment :id="id" :type="'blog'" :isMobile="false" :user="user"></comment>
        </div>
    </div>
</template>

<script>
 import NavBar from '@/components/NavBar';
 import Comment from '@/components/Comment';
 import hljs from 'highlight.js'
 require('@/assets/css/katex/katex.min.css');
 require('@/assets/css/highlightjs/monokai.css');
 import markdownIt from 'markdown-it';
 let markdown = markdownIt();
 import mk from '@iktakahiro/markdown-it-katex';

 markdown.use(mk,{"throwOnError" : false, "errorColor" : " #cc0000"});

 export default {
     name: 'Blog',
     props:['id', 'cId'],
     data () {
         return {
             msg: 'Welcome to Your Vue.js App',
             title: 'a',
             body: '',
             edit: false,
             user: {},
         }
     },
     methods:{
         setUser:function(user){
             this.user = user;
             if(this.user.name == 'smallst')
                 {
                     this.edit = true;
                 }
         }
     },
     mounted(){
         let that = this;
         utils.get('getBlogDetail?id='+that.id, res=>{
             if(res.data.code == 200)
                 {
                     let data = res.data.content;
                     that.title = data.title;
                     that.body = markdown.render(data.content);
                     setTimeout(function(){
                         let pres = document.querySelectorAll('pre code');
                         pres.forEach(e=>hljs.highlightBlock(e));
                         if(that.cId)
                             {
                                 console.log('scroll')
                                 let anchor = document.querySelector('#anchor-'+that.cId);
                                 console.log(anchor.offsetTop);
                                 document.scrollingElement.scrollTop=anchor.offsetTop;
                             }
                     }, 100);
                 }
         });
     },
     components:{
         NavBar,
         Comment
     }
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
