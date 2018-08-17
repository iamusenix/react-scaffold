import Http from 'scripts/services/AxiosHttp';
export default {
    getAppSet:function(){
        return Http.get("/uz-appmgrv2/api/app/admin/appSet/0/list");
    }
}