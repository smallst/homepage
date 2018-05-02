<template>
    <div>
        <nav-bar>
            <div slot="title">No. {{number}}</div>
        </nav-bar>
        <div class="content">
            <div :class="{day:part=='day', eve:part=='eve'}">
                <div class="title">
                    <div class="logo">
                        <div class="up"></div>
                        <div class="main">{{part.charAt(0).toUpperCase()+part.slice(1)}}</div>
                        <div class="down"></div>
                    </div>
                    <h2>{{title}}</h2>
                </div>
                <div class="body" v-html="body">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
 let markdown = require('markdown-it')();

 import NavBar from '@/components/NavBar';
 export default {
     name: 'Story',
     props: ['id','number','part'],
     data () {
         return {
             title:'',
             body: '',
         }
     },
     mounted(){
         let that = this;
         utils.get('getStoryDetail?id='+that.id, res=>{
             if(res.data.code == 200){
                 let data = res.data.content;
                 that.title = data.title;
                 that.body = markdown.render(data.content);
             }
         })
     },
     components:{
         NavBar
     }
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .title{
     display:flex;
     align-items:center;
 }
 .logo{
     margin-right: 2em;
     margin-left: -2em;
 }
 .logo>.up, .logo>.down{
     width: 0;
     height: 0;
 }

 .logo>.up{
     border-bottom: 1em solid white;
     border-left: 1.7em solid transparent;
     border-right: 1.7em solid transparent;
 }
 .logo>.main{
     width: 3.4em;
     height: 2em;
     background: white;
     display: flex;
     justify-content: center;
     align-items: center;
     font-weight:bold;
 }
 .logo>.down{
     border-top: 1em solid white;
     border-left: 1.7em solid transparent;
     border-right: 1.7em solid transparent;
 }
 .eve .main{
     color:white;
     background: black;
 }
 .eve .up{
     border-bottom: 1em solid black;
 }
 .eve .down{
     border-top: 1em solid black;
 }

</style>
