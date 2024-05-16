import http from "@/service/http";
export function getBanner(params) {
    return http.get('getbanner', params)
}