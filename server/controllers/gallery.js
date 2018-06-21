const Photo = global.model.Photo;
let getDownload = async(ctx, next)=>{
    await next();
    let id = ctx.request.query.id;
    let res =  await Photo.findOne({_id:id});
    let request = require("request");
    ctx.body = await request(res.url);
};
let getExif =async (ctx, next) => {
    await next();
    let id = ctx.request.query.id;
    // console.log(id);
    let res = await Photo.findOne({
        _id: id
    }).then(res =>{
        return res;
    });
    // console.log(res);
    if(res.exif == null || Object.keys(res.exif).length == 0)
    {
        let repo = await ctx.get(res.url + '?exif');
        let exifinfo = ['FNumber', 'ExposureTime', 'FocalLength','ISOSpeedRatings','Model',
                        'ImageWidth','ImageLength'];
        repo = JSON.parse(repo);
        let exif = {};
        for(let key in repo)
        {
            if(exifinfo.indexOf(key) != -1)
            {
                exif[key] = repo[key].val;
            }
        }
        // console.log(exif);
        if(repo['PixelXDimension'] !=undefined)
        {
            exif['ImageWidth'] = repo['PixelXDimension'].val;
            exif['ImageLength'] = repo['PixelYDimension'].val;
        }

        await Photo.update({_id:id},{$set: {exif: exif}}).exec();
        ctx.body = {
            code: 200,
            content: exif
        };
    }
    else{
        if(res.exif['ImageWidth'] == undefined)
        {
            res.exif['ImageWidth'] = res.exif['PixelXDimension'];
            res.exif['ImageLength'] = res.exif['PixelYDimension'];
        }
        ctx.body = {
            code: 200,
            content: res.exif
        };
    }
};
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

module.exports = {
    "GET /getExif" : getExif,
    "POST /addPhoto"  : addPhoto,
    "GET /getPhotoList" :  getPhotoList,
    "GET /downloadImage" : getDownload,
};