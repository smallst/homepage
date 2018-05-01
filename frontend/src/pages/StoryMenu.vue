<template>
    <div>
        <nav-bar>
            <div slot="title">Story</div>
        </nav-bar>
        <h2>Our story of Black Party</h2>
        <div class="content">
            <ul>
                <li class="menu">
                    <span class="day"><a href="detail.html">Day 1: New School</a></span>
                    <span class="eve"><a href="detail.html#eve">Eve 1: Amazing world</a></span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
 import NavBar from '@/components/NavBar';
 export default {
     name: 'StoryMenu',
     data () {
         return {
             msg: 'Welcome to Your Vue.js App'
         }
     },
     mounted(){
         let that=this;
         utils.get('getStory', res =>{
             
         })
     },
     components:{
         NavBar,
     }
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .menu{
     display: flex;
     justify-content: space-between;
     width: 40vw;
 }
</style>
