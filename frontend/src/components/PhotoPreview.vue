<template>
  <div class="imgdiv">
      <img alt="" :src="src" width="200" />
      <font-awesome-icon v-if="finish" icon="check"></font-awesome-icon>
  </div>
</template>

<script>

export default {
     name: 'PhotoPreview',
     props:['src', 'finish'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
     mounted(){
         console.log('finish:');
         console.log(this.finish);
     },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .imgdiv{
     position: relative;
     display: inline;
     font-size: 40px;
 }
 .imgdiv svg{
     color: #98FB98;
     position: absolute;
     top:0;
     right: 0;
 }
</style>
