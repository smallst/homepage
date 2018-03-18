const Comment = global.model.Comment;

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
            let [root, reply] = res.reduce(([p, f], c) => (c.fatherId == '0' ? [[...p, c], f] : [p, [...f, c]]), [[], []]);
            console.log(root);
            console.log(reply);
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