import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
// import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  // baseURL: process.env.BASE_API, // api base_url

  baseURL: process && process.env && process.env.NODE_ENV !== 'development' ?  'http://localhost:8000/api' : 'http://localhost:8000/api', // api  base_url


  // baseURL: ``, // api base_urlgit
  timeout: 50000, // request timeout,
})

// baseURL : window.location + "/api";

// console.log(this.$store.getters.genres);
// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    // if (store.getters.token) {
      const token = localStorage.getItem('token')
if (token) {
  // Vue.prototype.$http.defaults.headers.common['Authorization'] = token
  config.headers['Authorization'] = 'Bearer ' + token
}
     
      // config.headers['Get'] = 'Deb'
      // config.headers['X-Token'] = 'Bearer ' + store.getters.token
      
    // }
    return config
  },
  error => {
    // Do something with request error
    // console.log(error) // for debug
    Promise.reject(error)
  }
)



// response interceptor
service.interceptors.response.use(
    (response) => {
    return response
}, (error) => {
  const originalRequest = error.config
  // token expired
  if (error.response.status === 401 && error.response.error == "Unauthorized") {
    originalRequest._retry = true
    store.dispatch('refreshToken').then((response) => {
   // console.log(response)
   let token = response.data.token
   let headerAuth = 'Bearer ' + response.data.token
   store.dispatch('SAVE_TOKEN', token)
   service.defaults.headers['Authorization'] = headerAuth
   originalRequest.headers['Authorization'] = headerAuth
   return service(originalRequest)
 }).catch((error) => {
   store.dispatch('logout').then(() => {
     router.push({ name: 'login' })
   }).catch(() => {
     router.push({ name: 'login' })
   })
 })
}
return Promise.reject(error)
}
)


// response interceptor
// service.interceptors.response.use(
//   response => response,
 
//   error => {
//     console.log('err' + error) // for debug
//     Message({
//       message: error.message,
//       type: 'error',
//       duration: 5 * 1000
//     })
//     return Promise.reject(error)
//   }
// )

export default service
