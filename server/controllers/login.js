let login = async (ctx, next) => {
    await next();
    // let user = ctx.request.body.user;
    // let pass = ctx.request.body.pass;
    let user = {
            id: 0,
            name: 'smallst',
        };
    let value = Buffer.from(JSON.stringify(user)).toString('base64');
    console.log(`Set cookie value: ${value}`);
    ctx.cookies.set('name', value);
    ctx.response.redirect('/');
};

module.exports = {
    "POST /login": login
};