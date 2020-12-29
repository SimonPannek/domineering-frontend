let authObj;
(async () => {
    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        const expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
        const name = cname + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    if (!getCookie("tumKennung") || !getCookie("authenticationToken")) {
        const params = new URLSearchParams(window.location.search);
        setCookie("tumKennung", params.get("tumKennung"), 30);
        setCookie("authenticationToken", params.get("authenticationToken"), 30);
    }

    const kennung = getCookie("tumKennung");
    const token = getCookie("authenticationToken");

    return await request("authenticateUser", {
        tumKennung: kennung,
        authenticationToken: token
    }).then(res => {
        if (!res.hasOwnProperty("error")) {
            authObj = {
                kennung: kennung,
                token: token
            };

            document.getElementById("account").innerText = kennung;
            pageActions();
        } else {
            document.cookie.split(";").forEach(clearCookie);
            alert("Please open this site using your custom link to login!");
        }
    });
})();

async function request(method = "", parameters = {}) {
    const url = "/.netlify/functions/api-request/" + method;

    const url_param = Object.keys(parameters).map(function (k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(parameters[k])
    }).join('&');

    return await fetch(url + "?" + url_param, {
        method: "GET",
        mode: "no-cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        redirect: "follow",
        referrerPolicy: "no-referrer"
    }).then(res => {
        return res.json();
    }).catch(ignored => {
        return {};
    });
}

function clearCookie(c) {
    document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
}

function logout() {
    document.cookie.split(";").forEach(clearCookie);
    location.href = "/";
}
