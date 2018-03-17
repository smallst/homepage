const ws = require('ws');
const Cookies = require('cookies');
const url = require('url');

function parseUser(obj){
    if(!obj){
        return ;
    }
    let s = '', n = '';
    if(typeof obj === 'string'){
        s = obj;
    }else if (obj.headers){
        let cookies = new Cookies(obj, null);
        s = cookies.get('id');
        n = cookies.get('name');
    }
    if(s){
        try{
            // console.log(s);
            // let user = JSON.parse(Buffer.from(s,'base64').toString());
            console.log(`ID:${s}`);
            return {
                id: s,
                name: n
            };
        } catch(e){
        }
    }
}

function createWSS(server, onConnection, onMessage, onClose, onError){
    let wss = new ws.Server({server: server,clientTacking:true});
    wss.broadcast = function broadcast(data){
        wss.clients.forEach(function each(client){
            client.send(data);
        });
    };

    onConnection = function () {
        let user = this.user;
        // let msg = createMessage('join', user, `${user} joined.`);
        this.wss.broadcast(JSON.stringify('haha'));
        // build user list:
        // let users = [];
        // this.wss.clients.forEach(client=>{users.push(client.user)});
        // this.send(createMessage('list', user, users));
    };
    onMessage = function(msg) {
        console.log('[Websokect] message received:' +msg);
        if(msg == 'list')
        {
            let users = [];
            this.wss.clients.forEach(client=>{users.push(client.user);});
            this.send(JSON.stringify(users));
        }
    };
    onError = function(err){
        console.log('[websocket] error:' + err);
    };
    onClose = function(code, message){
        console.log('[websocket] closed: ${code} - ${message}');
    };
    /*
      onConnection = onConnection || function() {
      console.log('[websocket] connected');
      };

      onClose = onClose || function(code, message) {
      console.log('[websocket] closed: ${code} - ${message}');
      };
      onMessage = onMessage || function(msg) {
      console.log('[Websokect] message received:' +msg);
      };
      onError = onError || function(err) {
      console.log('[websocket] error:' + err);
      };
    */
    wss.on('connection', function(ws, req){
        let location = url.parse(req.url, true);
        ws.on('message', onMessage);
        ws.on('close', onClose);
        ws.on('error', onError);
        if(location.pathname !== '/comment')
        {
            console.log('invalid url');
            ws.close(4000, 'Invalid URL');
        }
        else
        {
            let user = parseUser(req);
            if(!user){
                console.log('invalid user');
                ws.close(4001, 'Invalid user');
            }
            else{
                ws.user = user;
                ws.wss = wss;
                onConnection.apply(ws);
            }
        }
    });
    return wss;
}


module.exports = {
    createWSS: createWSS,
};