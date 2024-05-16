import http from "@/service/http.js";
export function postinfoedit(params) {
    return http.post('infoedit', params)
}