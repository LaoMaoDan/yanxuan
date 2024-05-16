import http from "@/service/http";
export function getIndexNavCate(params) {
    return http.get('getcate', params)
}