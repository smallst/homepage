<template>
    <div>
        <div id="story">
            <div class="part">
                {{part}}
            </div>
            <input name="title" type="text" v-model="title" placeholder="title" />
            <textarea id="text-input" v-model="body"></textarea>
            <br>
            <input @click="upload" name="submit" type="submit" value="submit"/>
        </div>
    </div>
</template>

<script>
 export default {
     name: 'StoryUpload',
     props: ['edit','id'],
     data () {
         return {
             title: '',
             story: '',
             body: '',
             part: 'day',
             number: 1,
         }
     },
     methods:{
         checked: function(v){
             this.part = v;
         },
         upload:function(){
             let that = this;
             if(!this.edit)
                 {
                     utils.post('addStory',{
                         story: that.story,
                         title: that.title,
                         day: that.part == 'day',
                         number: that.number,
                         content:that.body
                     },res => {
                         if(res.data.code == 200)
                             {
                                 that.title = that.body = '';
                             }
                     })
                 }
             else{
                 utils.post('editStory',{
                     id: that.id,
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
         let that = this;
         if(this.edit){
             console.log('edit');
             let that = this;
             utils.get('getStoryDetail?id='+this.id,res=>{
                 if(res.data.code == 200){
                     let data = res.data.content;
                     that.title = data.title;
                     that.body = data.content;
                 }
             });
         }
         else{
             utils.get('getStoryNumber', res=>{
                 if(res.data.code == 200){
                     let data = res.data.content;
                     console.log(data);
                     if(!data.day)
                         data.day =1
                     else data.day += 1;
                     if(!data.eve)
                         data.eve =1
                     else data.eve += 1;
                     console.log(data);
                     if(data.day == data.eve){
                         that.part = 'day';
                         that.number = data.day;
                     }
                     else{
                         that.part = 'eve';
                         that.number = data.eve;
                     }
                 }
             })
         }
     }
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.9.0/dist/katex.min.css" integrity="sha384-TEMocfGvRuD1rIAacqrknm5BQZ7W7uWitoih+jMNFXQIbNl16bO8OZmylH/Vi/Ei" crossorigin="anonymous"> -->
<style scoped>
 textarea{
     height: 30em;
     width: 50em;
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
