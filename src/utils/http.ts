import axios, {
    AxiosInstance,
} from 'axios'

const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeout: 10000,
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
})


export default axiosInstance
