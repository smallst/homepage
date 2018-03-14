let qiniu = require("qiniu");
let accessKey = 'EK_iLqLfuAa3sq2hGCdXlDlj-xPRoAB_7ItL96M2';
let secretKey = 'T7y9jbu4qkfKz4sKh3qG050iSraKB7ev28MOZ7r-';
let bucket = 'smallst';
let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
let getQiniuToken = async(ctx, next) => {
    await next();

    let options = {
        persistentOps: 'imageslime',
        callbackUrl: 'https://smallst.me:2333/qiniuCallBack',
        callbackBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}',
        callbackBodyType: 'application/json',
        scope: bucket
    };
    let putPolicy = new qiniu.rs.PutPolicy(options);
    let uploadToken = putPolicy.uploadToken(mac);
    ctx.body = {
        code:200,
        content: uploadToken
    };
};
let qiniuCallBack = async (ctx, next)=>{
    let auth = qiniu.util.isQiniuCallback(mac, ctx.request.url,null,ctx.request.body.Authorization);
    console.log("qiniuCallBack:" + auth);
    ctx.body = {
        code: 200
    };
};
module.exports = {
    "GET /getQiniuToken": getQiniuToken,
    "POST /qiniuCallBack": qiniuCallBack
};