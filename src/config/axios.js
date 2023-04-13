import axios from 'axios'

// Add a request interceptor
const axiosUtil = {
    initalise: () => {
      axios.defaults.baseURL = "https://dummyjson.com";
      // Request Interceptor. All Request pass from here
      axios.interceptors.request.use(
        (axiosConfig) => {
          axiosConfig.headers['Content-Type'] = 'application/json';
          return axiosConfig;
        },
        (error) => {
          Promise.reject(error);
        },
      );
  
      axios.interceptors.response.use(
        (response) => {
          return response;
        },
        function (error) {
         
          return Promise.reject(error.response);
        },
      );
    },
  };
  
  export default axiosUtil;