import http from "@/service/http";
export function getUserInfo(params) {
    return http.get('getuserinfo', params)
}