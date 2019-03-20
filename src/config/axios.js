import axios from 'axios';


const instance =  axios.create({
  baseURL: process.env.BASE_URL || 'http://localhost/api/'
});

instance.interceptors.request.use(async function (config) {
  config.withCredentials = true;
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

export default instance;