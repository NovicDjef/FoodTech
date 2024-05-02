
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'


const apiService = axios.create({
    //  baseURL: 'http://192.168.1.135:3000',  //bureau
  // baseURL: 'http://192.168.8.168:3000', //maison 
  baseURL: 'http://172.20.10.4:3000', // Iphone Xs
  // baseURL: "http://192.168.103.12:3000",   //joyce
  // baseURL: "http://192.168.43.236:3000", //emulateur 
  // baseURL: "http://192.168.1.198:3000", //espoir model MTN


  headers: {
    'Content-Type': 'application/json', 
  },
  responseType: 'json',
  withCredentials: true,
});

// const attachToken = async (config) => {
//   const token = await AsyncStorage.getItem('authToken');
//   if (token) {
//     config.headers['Authorization'] = `Bearer ${token}`;
//   }
//   return config;
// };

// apiService.interceptors.request.use(
//   async (config) => await attachToken(config),
//   (error) => Promise.reject(error)
// );


export default apiService;