function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
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
}

var ws;
// if(getCookie("name")!== '' )
// {
axios.get("/api/checkLogin").then(res => {
    let data = res.data.content;
    console.log(res.data.code == 200);
        if(res.data.code == 200)
        {
            setCookie('username', data.user, 7);
            setCookie('userid', data._id, 7);
            ws = startWS();
        }
    });
// }
