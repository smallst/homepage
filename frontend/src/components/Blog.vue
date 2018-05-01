<template>
    <div>
        <nav-bar>
            <div slot="title">{{title}}</div>
        </nav-bar>
        <div class="content" v-html="body"></div>
    </div>
</template>

<script>
 import NavBar from '@/components/NavBar';
 import hljs from 'highlight.js'
 require('@/assets/css/katex/katex.min.css');
 require('@/assets/css/highlightjs/monokai.css');
 let markdown = require('markdown-it')();
 let mk = require('@iktakahiro/markdown-it-katex');

 markdown.use(mk,{"throwOnError" : false, "errorColor" : " #cc0000"});

 export default {
     name: 'Blog',
     props:['id'],
     data () {
         return {
             msg: 'Welcome to Your Vue.js App',
             title: 'a',
             body: '',
         }
     },
     mounted(){
         console.log(this.id);
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
                     }, 100);
                 }
         });
     },
     components:{
         NavBar
     }
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
