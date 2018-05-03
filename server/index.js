const Koa = require('koa');
const body = require('koa-body');

const request= require("koa-http-request");


const session = require('koa-session');
const config = require('./config');

const app = new Koa();
app.keys=['homepage'];

global.model = require('./model');

let sessionConfig = require('./session');
app.use(session(sessionConfig, app));

app.use(request());
app.use(body({
    multipart:true,
    // formidable: {
    //     maxFileSize: 1000000000,
    // }
            }));


const controller = require('./controller');
app.use(controller());

let server = app.listen(2333);
console.log('app statred at port 2333...');

const ws = require("./ws");
app.context.wss = ws.createWSS(server);
console.log('ws on 2333...');