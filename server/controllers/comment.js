const Comment = global.model.Comment;
const Notification = global.model.Notification;
const User = global.model.User;
const WebSocket = require('ws');
let addNotification = async (type,rid, id, uName, wss) =>{
    let {userId} = await Comment.findOne({_id: id},{userId:1}).exec();
    console.log('in notification')
    wss.clients.forEach(client=>{
        console.log(client.user.id)
        if(client.user.id == userId && client.readyState === WebSocket.OPEN)
        {
            
            client.send(JSON.stringify("be replied"));
        }
    });
    await Notification.create({
        userId: userId,
        info: {
            type: 'reply',
            repliedId: id,
            url: {type:type, id: rid},
            who: uName,
        },
        read: false
    });
};

let addComment = async (ctx, next) => {
    await next();
    let type = ctx.request.body.type;
    let id = ctx.request.body.id;
    let content = ctx.request.body.content;
    let reply = ctx.request.body.fatherId;
    let rootId = ctx.request.body.rootId;
    let userId = ctx.request.body.userId;
    await Comment.create({
        type: type,
        content: content,
        replyId: id,
        userId: userId,
        fatherId: reply,
        rootId: rootId
    }).then(res => {
        if(reply !='0') {
            addNotification(type, id, reply, ctx.session.name, ctx.wss);
            // ctx.wss.broadcast(JSON.stringify("hahaha"));
        }
        
        ctx.body = {
            code: 200,
            content: res
        };
    }).catch(err => {
        ctx.body = {
            code: 400,
            content: err
        };
    });
};
let getComment = async (ctx, next) =>{
    await next();
    let type = ctx.request.query.type;
    let id =ctx.request.query.id;
    await Comment.find({
        type: type,
        replyId: id
    }).sort({createdAt: 1}).exec()
        .then(res => {
            /**
              * array.reduce(callback, initialValue)
              * ...array is spread an array (...[1,2,3] = 1,2,3)
              **/
            let [root, reply] = res.reduce(([p, f], c) => (c.fatherId == '0' ? [[...p, c], f] : [p, [...f, c]]), [[], []]);
            // console.log(root);
            // console.log(reply);
            let content = {};
            for(let key in root){
                content[root[key]._id] = {
                    value: root[key].content,
                    replies: {}
                };
            }
            for(let key in reply){
                content[reply[key].rootId].replies[reply[key]._id]={
                    value: reply[key].content,
                    replyUser: reply[key].fatherId
                };
            }
            ctx.body = {
                code: 200,
                content: content
            };
        });
};
module.exports = {
    "POST /addComment"  : addComment,
    "GET /getComment"  : getComment,
};