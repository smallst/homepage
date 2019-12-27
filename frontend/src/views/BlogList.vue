<template>
  <div>
      <nav-bar title="Blog">
          <!-- <div slot="title">Blog</div> -->
      </nav-bar>
      <div class="content">
          <ul>
              <li v-for="l in list" class="menu">
                  <div class="title">
                      <router-link :to="{name:'blog', params:{id:l.id}}">{{l.title}}</router-link>
                  </div>
                  <div class="time">{{l.time}}</div>
              </li>
              <!-- <li><div class="menu"> -->
              <!-- <div class="title">关于这个博客</div> -->
              <!-- <div class="time">2017-01-01</div> -->
              <!-- </div></li> -->
          </ul>
      </div>
  </div>
</template>

<script>
 import NavBar from '@/components/NavBar';
export default {
  name: 'BlogList',
  data () {
    return {
        msg: 'Welcome to Your Vue.js App',
        list: [],
    }
  },
     mounted(){
         let that = this;
         utils.get('getBlogList',res=>{
             console.log(res.data.content);
             let data = res.data.content;
             for(let i in data){
                 that.list.push({
                     title: data[i].title,
                     time: (new Date(data[i].updatedAt)).toLocaleString(),
                     id: data[i]._id,
                 });
             }
             console.log(that.list);
         })
     },
     components:{
         NavBar
     }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .menu {
     display: flex;
     justify-content: space-between;
     width: 40vw;
 }
 .menu .time{
     color: grey;
     font-size: 0.8em;
 }
</style>
