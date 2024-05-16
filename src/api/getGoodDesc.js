import http from "@/service/http";
export function getGoodDesc(params) {
    return http.get('getgoodsinfo', params)
}