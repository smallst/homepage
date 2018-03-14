const Photo = global.model.Photo;
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
};
let getPhotoList = async (ctx, next) => {
    await next();
    let cTag = ctx.request.query.tag;
    if(cTag !== undefined)
    {
        await Photo.find({
            type:cTag
        },{url:1})
            .sort({'createdAt':-1})
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
            .exec()
            .then(res => {
                ctx.body = {
                    code: 200,
                    content: res
                };
            });
    }
};
let getPhotoDetail = async (ctx, next) => {
    await next();
};

module.exports = {
    "POST /addPhoto"  : addPhoto,
    "GET /getPhotoList" :  getPhotoList,
};