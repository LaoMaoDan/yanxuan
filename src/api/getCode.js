import http from "@/service/http";
export function getSms(params) {
    return http.get('sms', params)
}