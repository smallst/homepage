function startWS(){
    let ws = new WebSocket('ws://localhost/ws/comment');
    let timerID = -1;
    timerID = setInterval(keepAlive, 30000);
    ws.onmessage = function(event){
        let data = event.data;

        console.log(JSON.parse(data));
    };

    ws.onclose = function(evt){
        clearInterval(timerID);
    };
    ws.onerror = function(code, msg){
        clearInterval(timerID);
        alert("[ERROR]"+JSON.stringify(code)+":"+JSON.stringify(msg));
        console.log("[ERROR]"+JSON.stringify(code)+":"+JSON.stringify(msg));
    };
    return ws;
    function keepAlive(){
        if(ws.readyState == ws.OPEN){
            ws.send('');
        }
        else {
            clearInterval(timerID);
        }
    }
}