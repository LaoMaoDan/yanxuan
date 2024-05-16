import http from "@/service/http";
export function postSmsLogin(params) {
    return http.post('smslogin', params)
}