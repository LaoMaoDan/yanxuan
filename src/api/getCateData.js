import http from "@/service/http";
export function getCates(params) {
    return http.get('getcates', params)
}