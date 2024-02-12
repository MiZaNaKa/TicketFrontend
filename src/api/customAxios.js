import axios from 'axios';

const customAxios = axios.create({
    baseURL: `http://localhost:8000/`,
    // timeout: 10000, 
    headers: {
        "Content-Type": "application/json",
        // "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    data: {}
});

// Step-2: Create request, response & error handlers
const requestHandler =async request => {
    
    var userInfo=localStorage.getItem('UserInfo')
    var store=JSON.parse(userInfo)
    request.headers.Authorization = store.jwt;  
  
    return request;
};

const responseHandler = response => {
    
    if (response.status === 401) {
        window.location = '/login';
    }

    return response;
};

const errorHandler = error => {
    return Promise.reject(error);
};

customAxios.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => errorHandler(error)
);

customAxios.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error)
 );


export default customAxios;