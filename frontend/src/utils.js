import axios from 'axios';
export default{
    post: (path, data, succ=null, err=null, final=null) => {
        axios.post('/api/'+path, data).then(succ).catch(err).finally(final);
    },
    formpost: (path, data, succ=null, err=null, final=null) => {
        axios.post(path, data, {"Content-Type":"multipart/form-data"}).then(succ).catch(err).finally(final);
    },
    get: (path, succ, err=null, final=null)=>{
        axios.get('/api/'+path).then(succ).catch(err).finally(final);
    },
    download: (path, name)=>{
        var isSupportDownload = 'download' in document.createElement('a');
        console.log(path);
        axios({
            url: path,
            method: 'GET',
            responseType: 'blob', // important
        }).then(res =>{
            let jpeg;
            try{
                jpeg = new Blob( [res.data], {type : "image/jpeg"});
            }
            catch(e){
                // TypeError old chrome and FF
                window.BlobBuilder = window.BlobBuilder || 
                    window.WebKitBlobBuilder || 
                    window.MozBlobBuilder || 
                    window.MSBlobBuilder;
                if(e.name == 'TypeError' && window.BlobBuilder){
                    var bb = new BlobBuilder();
                    bb.append(array.buffer);
                    jpeg = bb.getBlob("image/jpeg");
                }
                else if(e.name == "InvalidStateError"){
                    // InvalidStateError (tested on FF13 WinXP)
                    jpeg = new Blob( [array.buffer], {type : "image/jpeg"});
                }
                else{
                    // We're screwed, blob constructor unsupported entirely   
                }
            }
            const url = window.URL.createObjectURL(jpeg);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download',name);
            document.body.appendChild(link);
            link.click();
        });
    },
    setCookie:(cname, cvalue, exdays) =>{
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires="+d.toGMTString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },
    getCookie:(cname)=> {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    },
    startWS: (onmessage)=>{
        let ws = new WebSocket('ws://localhost/ws/comment');
        let timerID = -1;
        timerID = setInterval(keepAlive, 30000);
        // ws.onmessage = function(event){
        // let data = event.data;

        // console.log(JSON.parse(data));
        // };
        ws.onmessage = onmessage;
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
};