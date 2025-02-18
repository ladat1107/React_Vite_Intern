import axios, {
    AxiosInstance,
} from 'axios'

const axiosInstance: AxiosInstance = axios.create({
    // baseURL: 'https://jsonplaceholder.typicode.com',
    baseURL: 'http://localhost:8843',
    timeout: 10000,
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
})

// axiosInstance.interceptors.response.use(
//     function (response) {
//         const { data } = response;
//         if (data?.EC === 0) {
//             return data?.DT;
//         } else {
//             alert(data?.EM)
//         }
//     }, function (error) {
//         alert("Error response")
//         return Promise.reject(error);
//     }
// )

export default axiosInstance
