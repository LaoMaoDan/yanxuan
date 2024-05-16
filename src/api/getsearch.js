import http from "@/service/http";
export function getsearch(params) {
    return http.get('search', params)
}