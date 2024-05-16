import http from "@/service/http";
export function gethortgoods(params) {
    return http.get('gethortgoods', params)
}