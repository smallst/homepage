const Story = global.model.Story;
let addStory = async (ctx, next) => {
    await next();
    await Story.create({
        number: ctx.request.body.number,
        title: ctx.request.body.title,
        story: ctx.request.body.story,
        content: ctx.request.body.content,
        day: ctx.request.body.day,
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
let editStory = async (ctx, next) => {
    await next();
    let id = ctx.request.body.id;
    await Story.update({
        _id: id
    },{
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
let getStoryMenu = async (ctx, next) => {
    await next();
    await Promise.all([Story.find({day:true},{'content':0}).sort({'number':-1}).exec(), 
                       Story.find({day:false},{'content':0}).sort({'number':-1}).exec()]).then(res=>{
                           ctx.body={
                               code:200,
                               content:{
                                   day: res[0],
                                   eve: res[1]
                               }
                           };
                       }).catch(err=>{ctx.body={code: 400, content: err}});
    // let day = await Story.find({day: true}, {content: 0}).sort({number: -1}).exec();
    // let eve = await Story.find({day: false}, {content: 0}).sort({number: -1}).exec();
    // ctx.body = {code:200, content:{day:day, eve:eve}};
};
let getStoryNumber = async (ctx, next) => {
    await next();
    await Promise.all([Story.find({day:true},{number:1}).sort({number:-1}).limit(1).exec(),
                       Story.find({day:false},{number:1}).sort({number:-1}).limit(1).exec()]).then(res=>{
                           console.log(res);
                           let data = {day: 0, eve:0};
                           if(res[0][0] != undefined)
                           {
                               data.day = res[0][0].number;
                           }
                           if(res[1][0] != undefined)
                           {
                               data.eve = res[1][0].number;
                           }
                           ctx.body = {
                               code: 200,
                               content:data
                           };
                       });
};
let getStoryDetail = async (ctx, next) => {
    await next();
    let cId = ctx.request.query.id;
    await Story.findOne({
        _id: cId
    }).exec()
        .then(res => {
            ctx.body = {
                code: 200,
                content: res
            };
        });
};

module.exports = {
    "POST /addStory"  : addStory,
    "POST /editStory"  : editStory,
    "GET /getStoryMenu" :  getStoryMenu,
    "GET /getStoryDetail" :  getStoryDetail,
    "GET /getStoryNumber" : getStoryNumber,
};