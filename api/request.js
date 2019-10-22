const ENV = require('../config/env')

/*
 * url--访问的地址，全路径从http开始
 * body--json格式的请求数据
 * method--请求方式，默认post
 */
const request = (url, body, method = 'POST') => {
  return new Promise((resolve, reject) => {
    //数据加密
    let postData = body;

    uni.request({
      url: url,
      method: method,
      data: body,
      header: {
        'Content-Type': 'application/json'
      },
      success(res) {
        //接口调用成功的回调函数
        if (res.statusCode != 200) {
          reject({
            "result": res.statusCode,
            "error": res.errMsg
          })
          return
        }

        
        let  resdata = {};

        try {
          resdata = res.data
         
          console.log("request data <= ：", url,body, resdata)

        } catch (error) {
          console.log(error)

          reject(error.message)
          return
        }
 
        const result = resdata;
        if (result.code != 200) {
          //发生错误
          reject(resdata.error)
          return
        }

        const data = result.info
        resolve(data)
      },
      fail(error) {
        //接口调用失败的回调函数
        console.log(error)
        reject({
          "result": -1,
          "error": error.message
        })
      }
    })
  });
}

/**
 * 小程序的promise没有finally方法，自己扩展下
 */
Promise.prototype.finally = function(callback) {
  var Promise = this.constructor;
  return this.then(
    function(value) {
      Promise.resolve(callback()).then(
        function() {
          return value;
        }
      );
    },
    function(reason) {
      Promise.resolve(callback()).then(
        function() {
          throw reason;
        }
      );
    }
  );
}

module.exports = {
  request,
}