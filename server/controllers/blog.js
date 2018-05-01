const Blog = global.model.Blog;
let addBlog = async (ctx, next) => {
    await next();
    await Blog.create({
        type: ctx.request.body.type,
        tag: ctx.request.body.tag,
        title: ctx.request.body.title,
        content: ctx.request.body.content,
    }).then(res => {
        ctx.body = {
            code: 200
        };
    }).catch(err => {
        ctx.body = {
            code: 400,
            content: err
        };
    });
};
let editBlog = async (ctx, next) => {
    await next();
    let id = ctx.request.body.id;
    await Blog.update({
        _id: id
    },{
         type: ctx.request.body.type,
        tag: ctx.request.body.tag,
        title: ctx.request.body.title,
        content: ctx.request.body.content,
    }).then(res => {
        ctx.body = {
            code: 200
        };
    }).catch(err => {
        ctx.body = {
            code: 400,
            content: err
        };
    });
};
let commentBlog = async (ctx, next) => {
    await next();
};
let getBlogList = async (ctx, next) => {
    await next();
    let cType = ctx.request.query.type;
    if(cType !== undefined)
    {
        await Blog.find({
            type:cType,
        },{'content':0})
            .sort({'createdAt':-1})
            .exec()
            .then(res=>{
                ctx.body={
                    code:200,
                    content:res
                };
            });
    }
    else
    {
        await Blog.find({},{'content':0})
            .sort({'createdAt':-1})
            .exec()
            .then(res=>{
                ctx.body={
                    code:200,
                    content:res
                };
            });
    }
};
let getBlogDetail = async (ctx, next) => {
    await next();
    let cId = ctx.request.query.id;
    await Blog.findOne({
        _id: cId
    }).exec()
        .then(res => {
            ctx.body = {
                code: 200,
                content: res
            };
        });
};

let getBlogTags = async (ctx, next)=>{
    await next();
    let type = ctx.request.query.type;
    await Blog.distinct('tag',{type:type}).exec()
        .then(res => {
            ctx.body={
                code: 200,
                content: res
            };
        });
};
let getBlogTypes = async (ctx, next)=>{
    await next();
    await Blog.distinct('type').exec()
        .then(res => {
            ctx.body={
                code: 200,
                content: res
            };
        });
};

module.exports = {
    "POST /addBlog"  : addBlog,
    "POST /editBlog"  : editBlog,
    "GET /getBlogList" :  getBlogList,
    "GET /getBlogDetail" :  getBlogDetail,
    "GET /getBlogTypes" : getBlogTypes,
    "GET /getBlogTags" : getBlogTags,
};