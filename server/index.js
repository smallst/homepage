const Koa = require('koa');
const session = require('koa-session');
// const bodyParser = require('koa-bodyparser');
const body = require('koa-body');
const app = new Koa();
app.keys=['homepage'];

// let sessionConfig = require('./session');
// app.use(session(sessionConfig, app));
global.model = require('./model');
app.use(body({
    multipart:true,
    formidable: {
        maxFileSize: 1000000000,
    }}));
const controller = require('./controller');
app.use(controller());

let server = app.listen(2333);
console.log('app statred at port 2333...');

const ws = require("./ws");
app.wss = ws.createWSS(server);
console.log('ws on 2333...');