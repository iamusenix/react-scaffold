import Http from 'scripts/services/AxiosHttp';
export default {
    getUserInfoByToken: function (token) {
        return Http.get("/admin/api/user/token/user", { access_token: token }, true);
    },
    login: function (userName, password) {
        var data = {
            "username": `${userName}@@@000`,
            "password": password,
            "client_id": "xietong110_web",
            "client_secret": "xietong110_web_secret",
            "grant_type": "password"
        }
        return Http.postAsForm("/admin/oauth/token", data, true);
    }
}