import axios from "axios";
import { viteApiUrl } from "../config";

const calendarApi = axios.create({
    baseURL: viteApiUrl,

});

calendarApi.interceptors.request.use((config) => {

    config.headers.set("x-token", localStorage.getItem("token"));

    return config;
});



export default calendarApi;
