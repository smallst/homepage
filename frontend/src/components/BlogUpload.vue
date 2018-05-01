<template>
    <div>
        <div id="blog">
            <input name="title" type="text" v-model="title" placeholder="title" />
            <div class="split-view">
                <textarea id="text-input" @input="update" class="half"
                          v-model="body"></textarea>
                <div id="preview" v-html="preview" class="half"></div>
            </div>
            <!-- <input name="body" type="text" v-model="body" /> -->
            <input @click="upload" name="submit" type="submit" value="submit"/>
        </div>
        <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css" /> -->
        <!-- <link href="assets/css/katex/katex.min.css" rel="stylesheet"/> -->
        <!-- <link href="@/assets/css/highlightjs/default.css" rel="stylesheet"/> -->
    </div>
</template>

<script>
 import hljs from 'highlight.js'
 require('@/assets/css/katex/katex.min.css');
 require('@/assets/css/highlightjs/monokai.css');
 let markdown = require('markdown-it')();
 let mk = require('@iktakahiro/markdown-it-katex');

 markdown.use(mk,{"throwOnError" : false, "errorColor" : " #cc0000"});

 /* window.hljs = hljs;*/
 export default {
     name: 'BlogUpload',
     data () {
         return {
             title: '',
             body: '',
             preview: '',
             /* value: '```python import numpy \ndef fun():\n  return 0\n```',*/
         }
     },
     methods:{
         update: function(){
             console.log('update');
             this.preview = markdown.render(this.body);
             setTimeout(function(){
                 let pres = document.querySelectorAll('pre code');
                 pres.forEach(e=>hljs.highlightBlock(e));
             }, 100);
         },
         upload:function(){
             let that = this;
             utils.post('addBlog',{
                 type:'',
                 tag:'',
                 title:that.title,
                 content:that.body
             },res => {
                 if(res.data.code == 200)
                     {
                         that.title = that.body = '';
                     }
             })
         }
     },
     mounted(){
         this.update();
     }
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.9.0/dist/katex.min.css" integrity="sha384-TEMocfGvRuD1rIAacqrknm5BQZ7W7uWitoih+jMNFXQIbNl16bO8OZmylH/Vi/Ei" crossorigin="anonymous"> -->
<style scoped>
 .split-view{
     position: relative;
     display:flex;
     overflow: hidden;
 }
 .half{
     height: 30em;
     flex-grow: 1;
     flex-shrink: 1;
     flex-basis: 0;
     overflow: auto;
 }
</style>
