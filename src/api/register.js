import http from "@/service/http";
export function postRegister(params) {
    return http.post('register', params)
}