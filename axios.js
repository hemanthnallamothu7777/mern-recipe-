import axios from 'axios'
let Axios = axios.create({
    headers:{
        'Content-Type':'application/json',
    }
})
Axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token')
    config.headers.Authorization =  token;
     
    return config;
});

export default Axios