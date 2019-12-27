<template>
    <div>
        <nav-bar @userCheck="setUser" title="Upload">
            <!-- <div slot="title">Upload</div> -->
        </nav-bar>
        <div class="content">
            <div class="menu">
                <div :class="{select: sel == 0}" @click="select(0)">Blog</div>
                <div :class="{select: sel == 1}" @click="select(1)">Stroy</div>
                <div :class="{select: sel == 2}" @click="select(2)">Gallery</div>
            </div>
            <blog-upload v-if="sel == 0"></blog-upload>
            <story-upload v-if="sel == 1"></story-upload>
            <gallery-upload v-if="sel == 2"></gallery-upload>
        </div>
    </div>
</template>

<script>
 import NavBar from '@/components/NavBar';
 import BlogUpload from '@/components/BlogUpload';
 import StoryUpload from '@/components/StoryUpload';
 import GalleryUpload from '@/components/GalleryUpload';
 export default {
     name: 'Upload',
     data () {
         return {
             msg: 'Welcome to Your Vue.js App',
             sel: 0,
             user: {},
         }
     },
     methods:{
         setUser: function(user){
             this.user = user;
             if(this.user.name != 'smallst')
                 {
                     this.$router.push('/');
                 }
         },
         select: function(i){
             this.sel = i;
         }
     },
     components:{
         NavBar,
         BlogUpload,
         StoryUpload,
         GalleryUpload,
     }
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .menu{
     display: flex;
     justify-content: center;
 }
 .menu>div{
     cursor: pointer;
     padding-left: 2em;
     padding-right: 2em;
     height: 2em;
     display: flex;
     align-items: center;
 }
 .select{
     background-color: var(--foreground-color);
     border-radius: 1em;
 }
</style>
