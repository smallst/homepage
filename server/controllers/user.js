const User = global.model.User;
function doLogin(id, user, ctx)
{
    ctx.cookies.set('id', id, {maxAge: 7*24*3600});
    ctx.cookies.set('name', user, {maxAge: 7*24*3600});
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
    // let user = ctx.request.body.user || '';
    // let id = ctx.request.body.id || '';
    let id = ctx.cookies.get("id");
    let user = ctx.cookies.get("name");
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
let getLikes = async (ctx, next) => {
    await next();
    console.log(ctx.cookies);
    let id = ctx.cookies.get('id');
    console.log(id);
    await User.findOne({_id:id},{likes:1}).exec()
        .then(res => {
            ctx.body = {
                code: 200,
                content: res
            };
        });
};

module.exports = {
    "POST /login": login,
    "GET /getLikes": getLikes,
    "POST /register": register,
    "GET /checkRegister" : checkRegister,
    "GET /checkLogin" : checkLogin
};