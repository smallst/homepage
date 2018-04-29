<template>
    <div>
        <nav-bar>
            <div slot="title">Gallery</div>
        </nav-bar>
        
        <div class="mask" :class="{show: mask}" @click="maskClose()">
            <gallery-detail :initPhoto="focusP" :isMobile="colnum==1" :photos="photos" v-if="mask" />
        </div>
        <div class="content">
            <p>希望有朝一日这里的图片都有自己的风格</p>
            <div class="split">
                <div class="col" v-for="i in colnum">
                    <img class="listimg" :src="u.url + '?imageView2/2/w/' + w" v-for="(u,index) in photos" v-if="index%colnum == i-1" @click="maskShow(index)">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
 import NavBar from '@/components/NavBar';
 import GalleryDetails from '@/components/GalleryDetails';

 export default {
     name: 'Gallery',
     data () {
         return {
             mask: false,
             focusP: {},
             /* urls: [],*/
             /* photoIds: [],*/
             photos: [],
             colnum: 1,
             w: 0,
             loadingData: false,
         }
     },
     methods:{
         maskClose: function(){
             this.mask = false;
         },
         maskShow: function(index){
             this.mask = true;
             this.focusP = {
                 id: this.photos[index].id,
                 index: index
             };
         }
     },
     mounted(){
         let that = this;
         let width = document.body.clientWidth;

         this.colnum = window.matchMedia('screen and (max-width: 1000px)').matches ? 1 : 2;
         this.w = this.colnum == 1? parseInt(width*0.85): parseInt(width * 0.3);

         document.addEventListener('scroll', function (event) {
             let el = document.scrollingElement||document.documentElement;
             if (el.scrollTop  >= 0.9*(document.body.scrollHeight - window.innerHeight)) {
                 if(!that.loadingData)
                     {
                         let imgNum = document.getElementsByClassName("listimg").length;
                         that.loadingData = true;
                         utils.get('getPhotoList?more=' + imgNum, res=>{
                             console.log(res);
                             let data = res.data.content;
                             if(data.length >0)
                                 {
                                     for(let i in data)
                                         {
                                             that.photos.push({
                                                 url: data[i].url,
                                                 id: data[i]._id,
                                             });
                                             /* that.urls.push(data[i].url);*/
                                             /* that.photoIds.push(data[i]._id);*/
                                         }
                                     that.loadingData =false;
                                 }
                         });
                     }
             }
         });
         utils.get('getPhotoList', res => {
             let data = res.data.content;
             for(let i in data)
                 {
                     that.photos.push({
                         url: data[i].url,
                         id: data[i]._id,
                     });
                     /* that.urls.push(data[i].url);*/
                     /* that.photoIds.push(data[i]._id);*/
                 }
         });
         /*
            
          */
     },
     components:{
         'nav-bar': NavBar,
         'gallery-detail': GalleryDetails
     },
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .split{
     width: 62vw;
     display: flex;
     flex-direction: row;
     justify-content: flex-start;
 }
 .col{
     display: flex;
     flex-direction: column;
     align-items: center;
 }
 .split img{
     margin: 5px;
 }
 img.main{
     z-index: 99;
 }
 div.mask{
     position: fixed;
     top:0;
     left:0;
     width: 100vw;
     height: 100vh;
     z-index: -50;
     opacity: 0;
     pointer-events: none;
     background-color: rgba(0,0,0,0.8);
     display: flex;
     align-items: center;
     justify-content: center;
 }
 div.mask.show{
     z-index: 50;
     opacity: 1;
     pointer-events: auto;
     cursor: pointer;
 }

</style>
