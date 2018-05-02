// const mongoose = require('mongoose');
// const MongooseStore = require("koa-session-mongoose");
// const config = require('./config');

// mongoose.Promise = global.Promise;
//  mongoose.connect(config.uri);
const Session = global.model.Session;

const CONFIG = {
    key: 'homepage:session',
    maxAge: 864000000,
    overwrite: true,
    store:{
        destroy:async function(key){
            // await Session.deleteOne({key: key}).exec();
            return Session.remove({key:key});
        },
        get:async function (key){
            let data = await Session.findOne({key: key}).exec()
                .then(res=>{
                    return res.data;
                }).catch(err=>{
                    return {};
                });
            return data;
        },
        set: async function(key, data, maxAge, {changed, rolling}){
            if(changed || rolling) {
                await Session.update({
                    key: key
                },{
                    key: key,
                    data: data
                },{upsert: true, safe: true}).exec();
            }
        }
    }
};
module.exports = CONFIG;
