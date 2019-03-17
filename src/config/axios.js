import axios from 'axios';


const instance =  axios.create({
  baseURL: process.env.BASE_URL || 'http://localhost/api/'
});

instance.interceptors.request.use(async function (config) {
//   if (config.url.indexOf('private') !== -1) {
//     const token = localStorage.getItem('token');
//     config.headers = {
//       ...config.headers,
//       authorization: token
//     }
//   }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

export default instance;