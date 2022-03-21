import axios from 'axios';
import { ElMessage } from 'element-plus';
import $ from 'jquery';
import qs from 'qs';
import walkpath from "../common/walkpath";

// ElLoading.service({})

axios.defaults.baseURL = '';
let token = '';
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios.interceptors.request.use(function (config) {
  token = localStorage.token || '';
  config.headers.common['token'] = token;
  if (config.url.indexOf('?') >= 0) {
      config.url += "&token=" + token;
  } else {
      config.url += "?token=" + token;
  }
  config.timeout = 120 * 1000;
  config.cancelToken = http.clearRequest.source.token;
  return config;
}, function (error) {
  // Do something with request error
  console.info("error: ");
  console.info(error);
  return Promise.reject(error);
})

axios.interceptors.response.use(function (response) {
  // nprogress.done();
  if (process.env.NODE_ENV === 'development') {
      // console.log(response.config.url.split('?')[0])
      // console.log(response.data)
  }

  let statusList = {
      '102': () => window.location.href = response.data.loginPage ? response.data.loginPage : window.location.href.origin + '#/login',
      '-101': () => window.location.href = response.data.loginPage ? response.data.loginPage : window.location.href.origin + '#/login',
      '135': () => console.warn(response.data.msg),
      '-200': () => console.warn(response.data.msg),
      '500': () => console.warn(response.data.msg),
      '-500': () => console.warn(response.data.msg),
      '115': () => console.warn(response.data.msg),
      '110': () => console.warn(response.data.msg),
      '150': () => ElMessage(response.data.msg),

  }
  if (statusList[response.data.status]) {
      statusList[response.data.status]();
  }

  if (response.request.responseURL.indexOf('export/excel') >= 0) {
      return response
  } else {
      return response.data
  }
}, function (error) {
  // Do something with request error
  console.info(error);
  if (JSON.stringify(error).indexOf('timeout') >= 0) {
      console.warn('请求超时')
  } else {
      console.log(error);
  }
  // nprogress.done();
  return Promise.reject(error);
});

const http = {
  axios,
  get: function (url, params) {
      return axios.get(url, params)
  },
  post: function (url, params) {
      return axios.post(url, params)
  },
  statusPost: function (url, params) {
      return axios({
          method: 'post',
          url,
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          data: qs.stringify(params),
      })
  },
  postFormData: function (url, formData) {
      return axios({
          method: 'post',
          url,
          headers: {
              'Content-Type': 'multipart/form-data; charset=UTF-8'
          },
          data: formData,
      })
  },
  put(url, params) {
      return axios.put(url, params)
  },
  upload: function (url, params) {
      return axios({
          method: 'post',
          url,
          headers: {
              'Content-Type': 'multipart/form-data'
          },
          data: params
      })
  },
  blobPost(url,params){

      return axios({
          method: 'post',
          url,
          responseType: 'blob',
          data: params,
      })
  },
  imagePost: function (url, params) {
      let res = '';
      $.ajax({
          method: 'post',
          url: url + '?token=' + token || localStorage.token,
          async: false,
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          },
          data: params,
          success(data) {
              res = data
          }
      });
      return res
  },
  download: function (url, params) {
      url += '?token=' + token;
      window.location.href = params ? `${url}&${qs.stringify(params)}` : url
  },
  downloadDirect(url) {
      let rela = url.includes('?') ? '&token=' : '?token=';
      window.open(url + rela + localStorage.token,"_blank");
  },
  returnURL(url) {
      let rela = url.includes('?') ? '&token=' : '?token=';
      return url + rela + localStorage.token
  },
  downloadNormal(url) {
      let href = this.returnURL(url);
      let downloadElement = document.createElement('a');
      downloadElement.href = href
      document.body.appendChild(downloadElement);
      downloadElement.click();
      document.body.removeChild(downloadElement);
  },
  downloadPDF(url,filename) {
      axios({
          url,
          method: 'get',
          responseType: 'arraybuffer'
      }).then(res => {
          let buffer = res.arrayBuffer();
          const blobURL = new Blob([buffer], {
              type: 'application/octet-stream',
              'Content-Disposition': 'attachment'
          });
          const filename = filename || "1.pdf";
          const link = window.URL.createObjectURL(blobURL)
          let a = document.createElement('a');
          a.href = link;
          a.download = filename;
          a.click();
          document.body.removeChild(a)
      })
  },
  downloadFlow(response, filename) {
/*
* 用上面blob post请求
* */
      let responseData;
      if(response.data){
          responseData = response.data
      }else{
          responseData = response;
      }
      const blob = new Blob([responseData],{type: response.type})
      const blobURL = window.URL.createObjectURL(blob)

      const tempLink = document.createElement('a')
      tempLink.style.display = 'none'
      tempLink.href = blobURL
      tempLink.setAttribute('download', decodeURI(filename))
      document.body.appendChild(tempLink)
      tempLink.click()
      document.body.removeChild(tempLink)
      // 释放blob URL地址
      window.URL.revokeObjectURL(blobURL)

  },
  delete: function (url, params) {
      return axios.delete(url, params)
  },
  //路由切换中断旧请求
  clearRequest: {
      source: {
          token: null,
          cancel: null
      }
  }
}

export default http
