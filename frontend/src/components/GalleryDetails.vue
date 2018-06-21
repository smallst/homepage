<template>
    <div id="mask">
        <div class="prev" :class="{hide:isMobile || index==0 }" @click="getDetail(index-1, $event)">
            <font-awesome-icon icon="angle-left" />
        </div>
        <div class="detail" @click="prevent($event)">
            <div class="info">
                <div id="exifinfo">
                    <pre>{{exif}}</pre>
                    <div id="likes" @click="likes(id)">
                        <font-awesome-icon icon="heart" v-if="userLikes.indexOf(id) > -1" />
                        <font-awesome-icon :icon="['far','heart']" v-else />
                    </div>
                </div>
                <comment :id="id" :isMobile="isMobile" :type="'gallery'" :user="user"></comment>
            </div>
            <div class="img">
                <img id="detail-img" :src="url" v-if="!isMobile" alt="" />
                <div @click="download(downloadUrl, id+'.jpg')" style="color:white">下载原图</div>
            </div>
        </div>
        <div class="next" :class="{hide:isMobile|| index==photos.length-1 }" @click="getDetail(index+1, $event)">
            <font-awesome-icon icon="angle-right"/>
        </div>
    </div>
</template>

<script>
 import Comment from '@/components/Comment';
 import fontawesome from '@fortawesome/fontawesome';
 import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
 /* import faReply from '@fortawesome/fontawesome-free-solid/faReply';*/
 import faArrowLeft from '@fortawesome/fontawesome-free-solid/faAngleLeft';
 import faArrowRight from '@fortawesome/fontawesome-free-solid/faAngleRight';
 import faHeart from '@fortawesome/fontawesome-free-regular/faHeart';
 import faHeartO from '@fortawesome/fontawesome-free-solid/faHeart';

 fontawesome.library.add(faArrowLeft, faArrowRight, faHeart, faHeartO);
 export default {
     name: 'GalleryDetails',
     props: ['initPhoto', 'isMobile', 'photos', 'user'],
     data () {
         return {
             userId: '',
             exif: '',
             url: '',
             downloadUrl:'',
             index: this.initPhoto.index,
             id: this.initPhoto.id,
             /* comment: '',*/
             /* comments: {},*/
             /* fatherId: '0',*/
             /* rootId: '',*/
             userLikes: [],
             exifinfo: ['FNumber', 'ExposureTime', 'FocalLength','ISOSpeedRatings','Model', 'ImageWidth','ImageLength'],
         }
     },
     methods:{
         download: function(url, name) {
             utils.download(url,name);
         },
         prevent: function($event){
             $event.stopPropagation();
             $event.preventDefault();
         },
         likes: function() {
             let that = this;
             utils.post('likes', {id: that.id}, res=>{
                 console.log(res.data.content);
                 if(res.data.code == 200)
                     {
                         that.userLikes.push(that.id);
                         console.log(that.userLikes)
                     }
             });
         },
         getDetail:function(index, $event=null){
             let that = this;
             that.index = index;
             that.id = that.photos[index].id;
             /* utils.get('getComment?type=gallery&id='+that.id, res=>{*/
             /* that.comments = res.data.content;*/
             /* });*/
             utils.get('getExif?id='+that.id, res=>{
                 let exif = res.data.content;
                 let imageX = +exif[that.exifinfo[5]],
                     imageY = +exif[that.exifinfo[6]];
                 let el = document.getElementsByClassName("img")[0];
                 let screenY = el.clientHeight,
                     screenX = el.clientWidth;
                 /* that.isMobile? parseInt(document.body.clientWidth*0.8): parseInt(document.body.clientWidth*0.35);*/
                 let url = '';
                 console.log(imageX/screenX);
                 console.log(imageY/screenY);
                 if(imageX/screenX > imageY/screenY)
                     {
                         url = that.photos[index].url + '?imageView2/2/w/'+screenX;
                     }
                 else
                     {
                         url = that.photos[index].url + '?imageView2/2/h/'+screenY;
                     }
                 /* if(!that.isMobile)*/
                 /* {*/
                 that.url = url;
                 that.downloadUrl = "/api/DownloadImage?id="+that.photos[index].id;//that.photos[index].url;
                 /* }*/
                 that.exif = `${exif[that.exifinfo[0]]}, ${exif[that.exifinfo[1]]},
${exif[that.exifinfo[4]]}, ${exif[that.exifinfo[2]]}, ISO ${exif[that.exifinfo[3]]}`;
             });
             if($event !== null)
                 {
                     $event.stopPropagation();
                 }
         }
     },
     mounted(){
         console.log('mounted');
         console.log(this.isMobile);
         console.log(this.photos)
         let that = this;
         this.getDetail(this.index);
         that.userId = that.user.id;
         /* that.userId = utils.getCookie('userid');*/
         if(that.userId!= undefined)
             {
                 utils.get('getLikes?id='+that.userId, res=>{
                     console.log('getlikes');
                     if(res.data.code == 200)
                         {
                             that.userLikes = res.data.content.likes;
                         }
                 });
             }
     },
     components:{
         FontAwesomeIcon,
         "comment":Comment,
     }
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 @media screen and (min-width:1200px){
     .detail{
         width:50vw;
         height: 50vh;
         align-items: center;
         flex-direction: row-reverse;
     }

     .detail>.info{
         width: 15vw;
         height: 50vh;
     }
     .img{
         width: 35vw;
         height: 50vh;
     }
 }
 @media screen and (max-width:1200px){
     .detail{
         width:80vw;
         height: 40vh;
         flex-direction: column-reverse;
     }

     .detail>.info{
         width: 80vw;
         height: 40vh;
     }
     .img{
         display: none;
     }
 }


 .detail{
     background-color: black;
     display: flex;
     cursor: auto;
 }
 .detail>.info{
     background-color: white;
     display: flex;
     flex-direction:column;
 }

 .hide{
     opacity: 0;
     pointer-events: none;
 }
 .prev, .next{
     width: 1em;
     height: 1em;
     font-size: 4em;
     color: grey;
     display: flex;
     align-items:center;
     justify-content: center;
     border-radius: 5px;
 }
 .prev:hover, .next:hover{
     background-color: rgba(80,80,80,0.8);
 }

 .img{
     display:flex;
     flex-direction: column;
     justify-content:center;
     align-items: center;
 }

 #likes{
     color: #ed4956;
     cursor: pointer;
     position: absolute;
     font-size: 2em;
     top: 0.2em;
     right: 0.2em;
 }
 #exifinfo{
     position: relative;
 }

 #mask{
     display: flex;
     align-items: center;
     justify-content: center;
 }
</style>
