var ws = new WebSocket('ws://localhost/ws/comment');
ws.onmessage = function(event){
    let data = event.data;

    console.log(JSON.parse(data));
};

ws.onclose = function(evt){
    
};
ws.onerror = function(code, msg){
    alert("[ERROR]"+code+":"+msg);
};
