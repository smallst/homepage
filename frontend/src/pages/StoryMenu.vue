<template>
    <div>
        <nav-bar title="Story">
            <!-- <div slot="title">Story</div> -->
        </nav-bar>
        <h2>Our story of Black Party</h2>
        <div class="content">
            <div class="split day">
                <div v-for="day in menu.day">
                    <router-link :to="{name:'story', params:{id: day._id}}">Day {{day.number}}: {{day.title}}</router-link>
                </div>
            </div>
            <div class="split eve">
                <div v-for="eve in menu.eve">
                   <router-link :to="{name:'story', params:{id: eve._id}}">Eve {{eve.number}}: {{eve.title}}</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
 import NavBar from '@/components/NavBar';
 export default {
     name: 'StoryMenu',
     data () {
         return {
             menu:{day:[],eve:[]},
         }
     },
     mounted(){
         let that=this;
         utils.get('getStoryMenu', res =>{
             if(res.data.code == 200){
                 that.menu = res.data.content;
             }
         })
     },
     components:{
         NavBar,
     }
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .content{
     display: flex;
 }
 .split{
     width: 45vw;
     display:flex;
     flex-direction: column;
 }
</style>
