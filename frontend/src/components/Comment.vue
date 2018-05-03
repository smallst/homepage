<template>
    <div>
        <div id="comments">
            <hr class="mysplit-color"/>
            <div class="comment" v-for="(root, key) in comments">
                <div class="rootComment" v-if="root" :id="'anchor-'+key">
                    {{root.value}}
                    <div class="reply-icon" @click="reply(key, key)">
                        <font-awesome-icon icon="reply"/>
                    </div>
                </div>
                        <div class="replies" v-if="root" v-for="(rep, rid) in root.replies" :id="'anchor-'+rid">
                            {{rep.value}}
                            <div class="reply-icon" @click="reply(rid, key)">
                                <font-awesome-icon icon="reply"/>
                </div>
                </div>
            </div>
        </div>
        <div id="comment">
            <input type="text" id="comment-content" :disabled="!user.id" name="" :style="{width:(isMobile?73:12)+'vw'}" v-model="comment" autofocus="autofocus" />
            <input name="" type="button" style="padding: 0 1em;flex-shrink: 0;" value="发送" @click="addComment()" />
        </div>
    </div>
</template>

<script>

 import fontawesome from '@fortawesome/fontawesome';
 import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
 import faReply from '@fortawesome/fontawesome-free-solid/faReply';

 fontawesome.library.add(faReply);
 export default {
     name: 'Comment',
     props:['user', 'id', 'isMobile', 'type'],
     data () {
         return {
             comment:'',
             comments:{},
             fatherId: '0',
             rootId: ''
         }
     },
     methods:{
         reply: function(rid, rootId){
             this.fatherId = rid;
             this.rootId = rootId;
             let cc = document.getElementById("comment-content");
             cc.setAttribute("placeholder", "reply:");
             cc.focus();
         },
         addComment: function(){
             let that = this;
             utils.post('addComment', {
                 type: that.type,
                 content: that.comment,
                 id: that.id,
                 fatherId: that.fatherId,
                 rootId: that.rootId,
                 userId: that.user.id
             }, res => {
                 if(res.data.code != 200)
                     {
                         console.log('err add comment');
                     }
                 else
                     {
                         let data = res.data.content;
                         console.log(data);
                         if(that.fatherId!='0'){
                             that.comments[data.rootId].replies[data._id]={
                                 value: data.content,
                                 replyUser: data.fatherId
                             };
                         }
                         else{
                             that.comments[data._id] = {
                                 value: data.content,
                                 replies: {}
                             };
                         }
                         that.comment = '';
                         that.fatherId = '0';
                         that.rootId = '';
                     }
             });
         },
     },
     mounted(){
         console.log('comment');
         let that = this;
         utils.get('getComment?type='+that.type+"&id="+that.id, res =>{
             console.log(res.data.content);
             if(res.data.code == 200)
                 {
                     that.comments = res.data.content;
                 }
         });
     },
     components:{
         FontAwesomeIcon
     }
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 #comment{
     display:flex;
     flex-direction: row;
 }
 #comments{
     flex-grow: 2;
     overflow-y: auto;
 }
 .rootComment, .replies{
     display: flex;
     justify-content: space-between;
 }
 .replies{
     padding-left:1.4em;
     padding-right: 0.4em;
 }
 .reply-icon{
     cursor: pointer;
 }
</style>
