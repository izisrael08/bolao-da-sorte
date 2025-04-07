import axios from "axios";

const api = axios.create({
    baseURL: 'https://webapi-myu4.onrender.com/',
})

export default api;