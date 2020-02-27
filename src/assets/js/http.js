import axios from 'axios'
import qs from 'qs';
import router from '../../router'
import store from '../../store'
import Toast  from 'vant/lib/toast';
import 'vant/lib/toast/style';
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://localhost:8080/api/bxxApis'
} else if (process.env.NODE_ENV === 'production') {
  // axios.defaults.baseURL = 'https://wyzw.zzhiedu.com/bxxmgr/temp/'
  // axios.defaults.baseURL = 'https://testxcx.zzhiedu.com/bxxmgr/temp/'
}
axios.defaults.timeout = 5000;

axios.interceptors.request.use(config => {
  // config.data = JSON.stringify(config.data);

  // config.headers = {
  //   'Content-Type': 'application/x-www-form-urlencoded'
  // }
  return config;
},
  error => {
    return Promise.reject(error);
  }
);
//响应拦截器即异常处理
axios.interceptors.response.use(response => {
  return response
}, err => {
  
  if (err && err.response) {
    Toast.fail('网络异常')
    if (error.response.status === 403) {
      localStorage.clear()
      store.commit('USERINFO', '')
      router.push('/login')
    }
    
    // switch (err.response.status) {
    // case 400: 
    // console.log('错误请求')
    //   break;
    // case 401: 
    // console.log('未授权，请重新登录')
    //   break; case 403: console.log('拒绝访问')
    //   break; case 404: console.log('请求错误,未找到该资源')
    //   break; case 405: console.log('请求方法未允许')
    //   break; case 408: console.log('请求超时')
    //   break; case 500: console.log('服务器端出错')
    //   break; case 501: console.log('网络未实现')
    //   break; case 502: console.log('网络错误')
    //   break; case 503: console.log('服务不可用')
    //   break; case 504: console.log('网络超时')
    //   break; case 505: console.log('http版本不支持该请求')
    //   break; default: console.log(`连接错误${err.response.status}`)
    // }
  } else {
    // console.log('连接到服务器失败')
  } 
  
  return Promise.resolve(err.response)
})


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url,qs.stringify(data), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}




/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}

