import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.PROD 
    ? 'https://rophim-be.onrender.com'   // khi build FE trên Render
    : 'http://localhost:8000',           // khi chạy FE local
});

export default axiosInstance;
