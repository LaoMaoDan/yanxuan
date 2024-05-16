import http from "@/service/http.js";
export function postAddressremove(params) {
    return http.post('addressremove', params)
}