import http from "@/service/http";
export function getGoodsList(params) {
    return http.get('getgoodlist', params)
}