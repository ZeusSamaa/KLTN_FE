import { environment } from "../environment";
import axios from "axios";

export const LoginService = {
    isLogined() {
        // check cookies
    },

    login(body) {
        return axios.post(`${environment.host}/user/login`, body);
    }
}