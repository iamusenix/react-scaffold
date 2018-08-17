
import axios from 'axios';

axios.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return Promise.reject(error);
});

export default {
    get: function (url, params, isPublic = false) {
        params = params || {};
        if (!isPublic) {
            params['access_token'] = sessionStorage.access_token;
        }
        return axios(url, { params: params });
    },
    post: function (url, data, isPublic = false) {
        var headers = {
            'Accept': '*/*',
            'Content-Type': 'application/json'
        };
        if (!isPublic) {
            headers['Authorization'] = 'Bearer ' + sessionStorage.access_token;
        }
        return axios.post(url, data, { headers: headers });
    },
    postAsForm: function (url, data) {
        var param = new URLSearchParams(data);
        return axios.post(url, param, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
    }
}