import http from "@/service/http.js";
export function postLoginApi(params) {
    return http.post('login', params)
}