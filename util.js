const fs = require('fs')
module.exports ={
    getIPAdress() {
        var interfaces = require('os').networkInterfaces();　　
        for (var devName in interfaces) {　　　　
            var iface = interfaces[devName];　　　　　　
            for (var i = 0; i < iface.length; i++) {
                var alias = iface[i];
                if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                    return alias.address;
                }
            }　　
        }
    },
    getFile(path) {
        return  new Promise((resolve,reject)=>{
              fs.readFile(path, 'utf8', function (err, data) {
                  if (err) {
                      console.log("读文件:=="+err)
                      reject(err)
                  } else {
                      resolve(data)        
                  }
              })
          })
      }
}