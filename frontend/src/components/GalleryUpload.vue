<template>
    <div>
        <div class="upload">
            <div id="uploadbox" @click="clickmulti" >
                <photo-preview v-for="(i, index) in prevList" :key="index" :src="i.src" :finish="i.finish"></photo-preview>
            </div>
            <input name="file" type="file" multiple="multiple" id="mf" @change="preview" style="position:absolute;visibility:hidden;" />
            <div id="button" @click="upload">upload</div>
        </div>

    </div>
</template>

<script>

 import PhotoPreview from '@/components/PhotoPreview';
 export default {
     name: 'GalleryUpload',
     data () {
         return {
             msg: 'Welcome to Your Vue.js App',
             prevList: []
         }
     },
     methods:{
         preview:function(){
             let that = this;
             let files = document.getElementById("mf").files;
             let uploadbox = document.getElementById("uploadbox");
             uploadbox.innerHTML='';
             for (let i = 0; i < files.length; i++) {
                 (function(file, uploadbox){
                     let reader = new FileReader();
                     reader.onload = function(e){
                         console.log('read')
                         that.prevList.push({
                             src:e.target.result,
                             finish: false,
                         });
                     }
                     reader.readAsDataURL(file);
                 })(files[i], uploadbox);
             }
         },
         clickmulti: function(){
             this.prevList = [];
             console.log('clickmulti');
             document.getElementById("mf").click();
         },
         upload: function(){
             let files = document.getElementById("mf").files;
             let imgdivs = document.getElementsByClassName("imgdiv");
             let that = this;
             for(let i = 0; i < files.length; i++)
                 {
                     utils.get("getQiniuToken",res => {
                              console.log(res.data.content.key);
                              let data = new FormData();
                              data.append('token', res.data.content.token);
                              data.append('file', files[i]);
                              data.append('key', res.data.content.key);
                              utils.formpost("https://upload.qiniup.com/",
                                         data,res=>{
                                       console.log(res);
                                       utils.post('addPhoto',{
                                           key: res.data.key
                                       },r=>{
                                           that.$set(that.prevList[i], 'finish', true);
                                       });
                                   })
                          })
                 }
         }
     },
     components:{
         PhotoPreview,
     }
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

 #uploadbox{
     border: 2px solid #236687;
     border-radius: 20px;
     width: 60vw;
     height: 40vh;
     position: relative;
     cursor: pointer;
 }
 #uploadbox:after{
     position:absolute;
     width: 40px;
     height: 40px;
     content: "+";
     font-size: 35px;
     text-align: center;
     top: 50%;
     left: 50%;
     margin-left: -20px;
     margin-top: -20px;
 }
 .upload{
     display:flex;
     width: 100%;
     height: 60vh;
     justify-content: center;
     align-items:center;
     flex-direction: column;
 }
 #button{
     width: 4em;
     height: 2em;
     background-color: #98fb98;
     border-radius: 10px;
     display: flex;
     align-items:center;
     justify-content: center;
     font-weight: bold;
     cursor: pointer;
 }
</style>
