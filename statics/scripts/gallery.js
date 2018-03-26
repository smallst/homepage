let loadingData = false;
let cols = window.matchMedia('screen and (max-width: 1000px)').matches ? 1:2;
let width = document.body.clientWidth;
width = cols == 1? parseInt(width*0.85): parseInt(width * 0.3);
let exifinfo = ['FNumber', 'ExposureTime', 'FocalLength','ISOSpeedRatings','Model',
                'ImageWidth','ImageLength'];

document.addEventListener('scroll', function (event) {
    if (document.body.scrollTop  >= 0.9*(document.body.scrollHeight - window.innerHeight)) {
        if(!loadingData)
        {
            let imgNum = document.getElementsByClassName("listimg").length;
            loadingData = true;
            axios.get('/api/getPhotoList?more='+imgNum).then(res =>{
                console.log(res);
                let data = res.data.content;
                if(data.length >0)
                {
                    for(i in data)
                    {
                        urls.push(data[i].url);
                        photoIds.push(data[i]._id);
                    }
                    loadingData =false;
                }
            });
        }
    }
});

var urls=[]; var photoIds = []; var userLikes = [];
axios.get('/api/getPhotoList')
    .then(res=>{
        let data = res.data.content;

        for(i in data)
        {
            urls.push(data[i].url);
            photoIds.push(data[i]._id);
        }
    });
axios.get('/api/getLikes',{
    params: {
        id: getCookie('userid')
    }
}).then(res => {
    console.log('getlikes');
    if(res.data.code == 200)
    {
        content.userLikes = res.data.content.likes;
    }
});
var content = new Vue({
    el: '.content',
    data:{
        userId: getCookie('userid'),
        isMobile: window.matchMedia('screen and (max-width: 1000px)').matches,
        url: urls,
        colnum:cols,
        w: width,
        userLikes: userLikes,
        detail:{
            exif: '',
            url: '',
            index: -1,
            id: '',
            comment: '',
            comments: {},
            fatherId: '0',
            rootId: '',
        },
        maskShow : false,
    },
    methods:
    {
        prevent: function($event){
            $event.stopPropagation();
            $event.preventDefault();
        },
        maskClose: function(){
            content.maskShow = false;
        },
        likes: function(id) {
            axios.post("/api/likes",{
                id: id
            }).then(res => {
                console.log(res.data.content);
                if(res.data.code == 200)
                {
                    content.userLikes.push(id);
                }
            });
        },
        reply: function(rid, rootId){
            content.detail.fatherId = rid;
            content.detail.rootId = rootId;
            let cc = document.getElementById("comment-content");
            cc.setAttribute("placeholder", "reply:");
            cc.focus();
        },
        addComment: function(index){
            axios.post('/api/addComment',{
                /* userLikes: [],*/
                type: 'gallery',
                content: content.detail.comment,
                id: photoIds[index],
                fatherId: content.detail.fatherId,
                rootId: content.detail.rootId,
                userId: content.userId
            }).then(res => {
                if(res.data.code != 200)
                {
                    console.log('err add comment');
                }
                else
                {
                    let data = res.data.content;
                    console.log(data);
                    if(content.detail.fatherId!='0'){
                        content.detail.comments[data.rootId].replies[data._id]={
                            value: data.content,
                            replyUser: data.fatherId
                        };
                    }
                    else{
                        content.detail.comments[data._id] = {
                            value: data.content,
                            replies: {}
                        };
                    }
                    content.detail.comment = '';
                    content.detail.fatherId = '0';
                    content.detail.rootId = '';
                }
            });
        },
        
        getDetail:function(index, $event=null){
            content.detail.index = index;
            content.detail.id = photoIds[index];

            content.maskShow = true;
            axios.get('/api/getComment',{
                params:{
                    type: 'gallery',
                    id: photoIds[index]
                }
            }).then(res => {
                console.log(res.data);
                content.detail.comments = res.data.content;
            });
            axios.get('/api/getExif?id='+content.detail.id).then(res => {
                let exif = res.data.content;
                let imageX = +exif[exifinfo[5]],
                    imageY = exif[exifinfo[6]];
                let screenY = content.isMobile? parseInt(document.body.clientHeight*0.3): parseInt(document.body.clientHeight*0.5),
                    screenX = content.isMobile? parseInt(document.body.clientWidth*0.8): parseInt(document.body.clientWidth*0.35);
                let url = '';
                console.log(imageX/screenX);
                console.log(imageY/screenY);
                if(imageX/screenX > imageY/screenY)
                {
                    url = urls[index] + '?imageView2/2/w/'+screenX;
                }
                else
                {
                    url = urls[index] + '?imageView2/2/h/'+screenY;
                }
                if(!content.isMobile)
                {
                    content.detail.url = url;
                }
                content.detail.exif = `${exif[exifinfo[0]]}, ${exif[exifinfo[1]]},
-${exif[exifinfo[4]]}, ${exif[exifinfo[2]]}, ISO ${exif[exifinfo[3]]}`;

            });
            if($event !== null)
            {
                $event.stopPropagation();
            }
        }
    }
});