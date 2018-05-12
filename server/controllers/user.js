const User = global.model.User;
function doLogin(id, user, ctx)
{
    ctx.session.id=id;
    ctx.session.name=user;
    ctx.session.lastLogin=new Date();
    ctx.cookies.set('id', id, {maxAge: 10*24*3600});
    ctx.cookies.set('name', user, {maxAge: 10*24*3600});
}
let login = async (ctx, next) => {
    await next();
    let user = ctx.request.body.user || '';
    let pass = ctx.request.body.pass || '';
    await User.findOne({
        user: user,
        passwd: pass
    },{likes: 0}).exec()
        .then(res => {
            doLogin(res._id, res.user, ctx);
            ctx.body = {
                code:200,
                content:res
            };
        })
        .catch(err => {
            ctx.body = {
                code: 400,
                content: err
            };
        });
};
let checkLogin = async(ctx, next) =>{
    await next();
    let id = ctx.session.id || '';
    let user = ctx.session.name || '';
    await User.findOne({
        user: user,
        _id: id
    },{likes: 0}).exec()
        .then(res => {
            doLogin(id, user, ctx);
            ctx.body = {
                code:200,
                content: res
            };
        })
        .catch(err => {
            ctx.body = {
                code: 400,
            };
        });
};
let checkRegister = async (ctx, next) => {
    await next();
    
    let user = ctx.request.query.user || '';
    await User.findOne({user:user}).exec()
        .then(res => {
            if(res.user === user)
            {
                ctx.body = {
                    code: 201,
                    content: "user exists"
                };
            }
            else {
                ctx.body = {
                    code: 200,
                    content: "user name ok"
                };
            }
        });
};
let register = async (ctx, next) => {
    await next();
    let user = ctx.request.body.user || '';
    let pass = ctx.request.body.pass || '';
    await User.create({
        user: user,
        passwd: pass,
        likes: []
    }).then(res => {
        doLogin(res._id, res.user, ctx);
        ctx.body = {
            code: 200
        };
    });
};
let editUser =  async (ctx, next) => {
    await next();
    let id = ctx.request.body.id || '';
    let pass = ctx.request.body.pass || '';
    await User.update({
        _id: id,
    },{
        passwd: pass,
    }).exec().then(res => {
        ctx.body = {
            code: 200
        };
    });

    let getLikes = async (ctx, next) => {
        await next();
        let id = ctx.session.id;
        console.log(id);
        await User.findOne({_id:id},{likes:1}).exec()
            .then(res => {
                ctx.body = {
                    code: 200,
                    content: res
                };
            });
    };
    let Likes = async(ctx, next) =>{
        await next();
        let id = ctx.session.id;
        let likesId = ctx.request.body.id;
        await User.update({_id: id},{$push: {likes: likesId}}).exec()
            .then(res => {
                ctx.body = {
                    code: 200,
                    content: res
                };
            });
    };

    module.exports = {
        "POST /login": login,
        "POST /likes": Likes,
        "GET /getLikes": getLikes,
        "POST /register": register,
        "POST /editUser": editUser,
        "GET /checkRegister" : checkRegister,
        "GET /checkLogin" : checkLogin
    };