import http from "@/service/http.js";
export function posTalipay(params) {
    return http.post('alipay', params)
}