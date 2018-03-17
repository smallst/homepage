let Photo = global.model.Photo;
let qiniu = require("qiniu");
let fs = require('fs');
let path = require('path');

let accessKey = 'EK_iLqLfuAa3sq2hGCdXlDlj-xPRoAB_7ItL96M2';
let secretKey = 'T7y9jbu4qkfKz4sKh3qG050iSraKB7ev28MOZ7r-';
let bucket = 'smallst';
let config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z0;
let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
let bucketManager = new qiniu.rs.BucketManager(mac, config);
function calcToken(key)
{
    let encode = Buffer.from("smallst:"+key).toString("base64");
    let options = {
        persistentOps: 'imageslim|saveas/'+encode+"/force=1",
        scope: bucket
    };

        // callbackUrl: 'https://smallst.me:2333/qiniuCallBack',
        // callbackBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}',
        // callbackBodyType: 'application/json',
    let putPolicy = new qiniu.rs.PutPolicy(options);
    let uploadToken = putPolicy.uploadToken(mac);
    return uploadToken;
}
let deletePhoto = async (ctx, next) => {
    await next();
    let key = ctx.request.body.key;
    //todo: auth
    bucketManager.delete(bucket, key, function(err, body, info){
        if(err){
            console.log(err);
        }
        else
        {
            Photo.remove({title: key});
        }
    });
};
let getQiniuToken = async(ctx, next) => {
    await next();
    let key = Date.now()+".jpg";
    ctx.body = {
        code:200,
        content: {
            token:calcToken(key),
            key: key
        }
    };
};
let qiniuCallBack = async (ctx, next)=>{
    let auth = qiniu.util.isQiniuCallback(mac, ctx.request.url,null,ctx.request.body.Authorization);
    console.log("qiniuCallBack:" + auth);
    console.log("key:"+ctx.request.body.key);
    let name = ctx.request.body.key;
    await Photo.create({
        title: name,
        url: 'http://p5iu6bzgq.bkt.clouddn.com/'+name,
        tag: []
    }).then(res => {
        ctx.body = {
            code: 200
        };
    });
};
/*
function uptoqiniu(files)
{
    let config = new qiniu.conf.Config();
    config.zone = qiniu.zone.Zone_z0;
    for (let i = 0; i < files.length; i++) {
        let key = Date.now()+'.jpg';
        let token = calcToken(key);
        const reader = fs.createReadStream(files[i].path);
        let p = path.join(__dirname, '../temp/', files[i].name);
        const stream = fs.createWriteStream(p);
        reader.pipe(stream);
    // new Promise(function(solve,reject){
        let formUploader = new qiniu.form_up.FormUploader(config);
        let putExtra= new qiniu.form_up.PutExtra();
        stream.on("finish",function(){
            formUploader.putFile(token, key,p, putExtra, function(err, body, info){
            if(err){
                console.log("err:"+JSON.stringify(err));
            }
            if(info.statusCode == 200){
                console.log(body);
            }
            else {
                console.log(info.statusCode);
                console.log(body);

            }

        });
                fs.unlinkSync(p, (e)=>{if(e) throw e;});
        });
    }
}
let uploadimage = async(ctx, next) => {
    await next();
    let files = ctx.request.body.files.file;
    console.log(files);
    await uptoqiniu(files);
    ctx.body = {
        code: 200,
    };
};
*/
module.exports = {
    "GET /getQiniuToken": getQiniuToken,
    "POST /qiniuCallBack": qiniuCallBack,
    "POST /deletePhoto": deletePhoto,
    // "POST /uploadimage": uploadimage,
};