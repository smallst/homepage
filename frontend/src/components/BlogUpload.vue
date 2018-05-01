<template>
    <div>
        <div id="blog">
            <input name="title" type="text" v-model="title" placeholder="title" />
            <div class="type">
                <div v-for="t in allType">
                    <div :class="{select: type == t }" @click="toggleType(t)">{{t}}</div>
                </div>
                <input type="text" v-model="type" />
            </div>
            <div class="tag">
                <div v-for="t in allTag">
                    <div :class="{select: tag.indexOf(t) != -1}" @click="toggleTag(t)">{{t}}</div>
                </div>
                <div class="addTag">
                    <input type="text" v-model="newTag" />
                    <input type="button" value="add" @click="addTag" />
                </div>
            </div>
            <div class="split-view">
                <textarea id="text-input" @input="update" class="half"
                          v-model="body"></textarea>
                <div id="preview" v-html="preview" class="half"></div>
            </div>
            <input @click="upload" name="submit" type="submit" value="submit"/>
        </div>
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
     props: ['edit','id'],
     data () {
         return {
             title: '',
             body: '',
             preview: '',
             type: '',
             tag: [],
             newTag: '',
             allTag:[],
             allType:[]
         }
     },
     methods:{
         addTag:function(){
             this.tag.push(this.newTag);
             this.allTag.push(this.newTag);
             this.newTag = '';
             console.log(this.tag);
         },
         toggleTag: function(t){
             let index = this.tag.indexOf(t);
             if(index != -1){
                 this.tag.splice(index,1);
             }
             else{
                 this.tag.push(t);
             }
             console.log(this.tag);
         },
         toggleType: function(t){
             if(this.type == t)
                 {
                     this.type = '';
                 }
             else
                 {
                     this.type = t;
                     let that = this;
                     utils.get("getBlogTags?type="+t,res => {
                         if(res.data.code == 200)
                             {
                                 that.allTag = res.data.content;
                             }
                     })
                 }
         },
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
             if(!this.edit)
                 {
                     utils.post('addBlog',{
                         type: that.type,
                         tag: that.tag,
                         title:that.title,
                         content:that.body
                     },res => {
                         if(res.data.code == 200)
                             {
                                 that.title = that.body = '';
                             }
                     })
                 }
             else{
                 utils.post('editBlog',{
                     id: that.id,
                     type:that.type,
                     tag:that.tag,
                     title:that.title,
                     content:that.body
                 },res => {
                     if(res.data.code == 200)
                         {
                             that.title = that.body = '';
                         }
                 })

             }
         }
     },
     mounted(){
         console.log(this.edit);
         console.log(this.id);
         let that = this;
         utils.get('getBlogTypes', res=>{
             if(res.data.code == 200)
                 {
                     let allType = res.data.content;
                     let index = allType.indexOf("");
                     if(index != -1)
                         {
                             allType.splice(index,1);
                         }
                     that.allType = allType;
                 }
         });
         /*
         utils.get('getBlogTags?type='+this.type, res=>{
             if(res.data.code == 200)
                 {
                     let data = res.data.content;
                     that.allTag = data.tags;
                 }
         });
         */
         if(this.edit){
             console.log('edit');
             let that = this;
             utils.get('getBlogDetail?id='+this.id,res=>{
                 if(res.data.code == 200){
                     let data = res.data.content;
                     that.type = data.type;
                     that.tag = (data.tag?data.tag:[]);
                     that.title = data.title;
                     that.body = data.content;
                     that.update();
                 }
             });
         }
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
 .select{
     border: 1px solid blue;
     border-radius: 4px;
 }
 .type, .tag{
     display:flex;
     align-items: center;
 }
 .type div, .tag div{
     margin-left: 0.2em;
     margin-right: 0.2em;
 }
 .type input, .tag input{
     
 }
</style>
