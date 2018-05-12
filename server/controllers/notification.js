const Notification = global.model.Notification;
/*
let addNotification = async (ctx, next) =>{
    await next();
    let userId = ctx.request.body.userId;
    let info = ctx.request.body.info;
    await Notification.create({
        userId: userId,
        info: info,
        read: false
    }).then(res => {
        ctx.body = {
            code : 200,
            content: res
        };
    });
};
*/
let readNotification = async (ctx, next) => {
    await next();
    let id = ctx.request.body.id;
    await Notification.update({
        _id: id
    }, {
        read: true
    }).then(res => {
        ctx.body = {
            code: 200,
        };
    });
};
let readAll = async (ctx, next) => {
    await next();
    let uid = ctx.request.body.userId;
    await Notification.update({
        userId: uid,
        read: false
    }, {
        read: true
    },{multi: true}).then(res => {
        ctx.body = {
            code: 200,
        };
    });
};
let getUnreadNotification = async (ctx,next)=>{
    await next();
    let id = ctx.session.id;
    await Notification.count({
        userId: id,
        read: false
    }).exec()
        .then(res => {
            ctx.body = {
                code: 200,
                content: res
            };
        });
};
let getNotification = async (ctx, next) =>{
    await next();
    let id = ctx.session.id;
    await Notification.find({
        userId: id
    }).sort({createdAt: -1}).exec()
        .then(res => {
            ctx.body = {
                code: 200,
                content: res
            };
        });
};
module.exports = {
    // "POST /addNotification"  : addNotification,
    "POST /readNotification"  : readNotification,
    "POST /readAll"  : readAll,
    "GET /getNotification"  : getNotification,
    "GET /getUnreadNotification"  : getUnreadNotification,
};