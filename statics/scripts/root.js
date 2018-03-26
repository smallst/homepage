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

var ws, navbar;
// if(getCookie("name")!== '' )
// {
window.onload = function(){
    axios.get("/api/checkLogin").then(res => {
        let data = res.data.content;
        console.log(data);
        if(res.data.code == 200)
        {
            setCookie('username', data.user, 7);
            setCookie('userid', data._id, 7);
            navbar.user = data.user;
            ws = startWS();
        }
        else{
            setCookie('username', '', 7);
            setCookie('userid', '', 7);
        }
    });
    // }

    navbar = new Vue({
        el:".navbar",
        data:{
            user: '' ,
            name: '',
            passwd: '',
            signin: false,
        },
        methods:{
            doLogin: function(){
                if(this.user == '')
                {
                    this.signin = true;
                }
            },
            login:function(){
                axios.post('/api/login', {
                    user: navbar.name,
                    pass: navbar.passwd
                }).then(res => {
                    let data = res.data.content;
                    if(res.data.code == '200')
                    {
                        setCookie('username', data.user, 7);
                        setCookie('userid', data._id, 7);
                        window.location.href = window.location.href;
                    }
                });
            }
        }
    });

}