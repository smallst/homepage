<template>
    <div>
        <nav-bar @userCheck="setUser" title="Edit">
            <!-- <div slot="title">Edit</div> -->
        </nav-bar>
        <div class="content">
            <!-- <div class="menu"> -->
            <!-- <div :class="{select: sel == 0}" @click="select(0)">Blog</div> -->
            <!-- <div :class="{select: sel == 1}" @click="select(1)">Stroy</div> -->
            <!-- <div :class="{select: sel == 2}" @click="select(2)">Gallery</div> -->
            <!-- </div> -->
            <blog-upload v-if="type == 'blog'" :edit="true" :id="id"></blog-upload>
            <!-- <story-upload v-if="type == 'story'" :edit="true" :id="id"></story-upload> -->
        </div>
    </div>
</template>

<script>
 import NavBar from '@/components/NavBar';
 import BlogUpload from '@/components/BlogUpload';
 export default {
     name: 'Edit',
     props: ['id', 'type'],
     data () {
         return {
             user:{}
         }
     },
     methods:{
         setUser:function(user){
             this.user = user;
             if(this.user.name!='smallst')
                 {
                     this.$router.push('/');
                 }
         }
     },
     mounted(){
         console.log(this.id)
         console.log(this.type);
     },
     components:{
         NavBar,
         BlogUpload,
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
