import http from "@/service/http";
export function getAddressList(params) {
    return http.get('addresslist', params)
}