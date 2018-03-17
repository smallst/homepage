const Photo = global.model.Photo;
const User = global.model.User;
let addPhoto = async (ctx, next) => {
    await next();
    let name = ctx.request.body.key;
    await Photo.create({
        title: name,
        url:'http://p5iu6bzgq.bkt.clouddn.com/' + name,
        tag: []
    }).then(res=>{
        ctx.body = {
            code:200
        };
    }).catch(err=>{
        ctx.body = {
            code: 400,
            content: err
        };
    });
};
let commentPhoto = async (ctx, next) => {
    await next();
};
let likePhoto = async (ctx, next) => {
    await next();
    let userId = ctx.cookies.get('id');
    let photoId = ctx.request.body.id;
    await User.update({
        _id: userId
    },{$push: {likes: photoId}})
        .exec()
        .then(res => {
            ctx.body={
                code: 200,
                content: res
            };
        });
};
let getPhotoList = async (ctx, next) => {
    await next();
    let cTag = ctx.request.query.tag;
    let more = ctx.request.query.more;
    if(more === undefined)
    {
        if(cTag !== undefined)
        {
            await Photo.find({
                type:cTag
            },{url:1})
                .sort({'createdAt':-1})
                .limit(10)
                .exec()
                .then(res => {
                    ctx.body = {
                        code: 200,
                        content: res
                    };
                });
        }
        else
        {
            await Photo.find({},{'url':1}).sort({'createdAt':-1})
                .limit(10)
                .exec()
                .then(res => {
                    ctx.body = {
                        code: 200,
                        content: res
                    };
                });
        }
    }
    else
    {
        more = +more;
         if(cTag !== undefined)
        {
            await Photo.find({
                type:cTag
            },{url:1})
                .sort({'createdAt':-1})
                .skip(more)
                .limit(10)
                .exec()
                .then(res => {
                    ctx.body = {
                        code: 200,
                        content: res
                    };
                });
        }
        else
        {
            await Photo.find({},{'url':1}).sort({'createdAt':-1})
                .skip(more)
                .limit(10)
                .exec()
                .then(res => {
                    ctx.body = {
                        code: 200,
                        content: res
                    };
                });
        }
    }
};
let getPhotoDetail = async (ctx, next) => {
    await next();
};

module.exports = {
    "POST /addPhoto"  : addPhoto,
    "GET /getPhotoList" :  getPhotoList,
};