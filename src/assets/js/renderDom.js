/**
 * Created by shangxin on 2017-11-23 12:57
 */

//视频
import {Plyr} from './plyr.js'
import {Wxaudio} from './wx-audio.js'
import {MessageBox} from 'mint-ui'
//抛出交互
export function setupWebViewJavascriptBridge(callback) {
      if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
      if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
      window.WVJBCallbacks = [callback];
      var WVJBIframe = document.createElement('iframe');
      WVJBIframe.style.display = 'none';
      WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
      document.documentElement.appendChild(WVJBIframe);
      setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
};

/**
 * 深度遍历
 * 复合的Json结构数据，JSON对象里面可以嵌套多层对象(数组或对象)
 */
export function deepTraverse(json){
  if( ! (json instanceof Object) ) return;
  let isArray = isType(json, "Array"); //判断是不是数组
  let isObject = isType(json, "Object"); //判断是不是对象
  //根对象的path
  if(  ! json.path ) json.path = "";

  //对属性或子对象设置path
  for(let key in json){
    if( isArray && isType(json[key],"Object")) json[key].path = json.path + "["+key+"]";
    else if(isObject && (isType(json[key],"Object") || isType(json[key],"Array"))) json[key].path = json.path + "."+key;
  }
  //进行递归
  for(let key in json){
    deepTraverse(json[key]);
  }
  // 辅助函数，JS判断变量类型
  /**
   * 判断类型
   *  obj 判断的变量
   *  type 预期的类型
   */
  function isType(obj,type){
    return Object.prototype.toString.call(obj) ==="[object "+type+"]";

  };
};

export function InitVideo() {
  //没有视频 就不初始化了
if (!$('.plyr-player').length) return;
  //已经初始化过的就不初始化了
if ($('.plyr').length >= 1) {
    //点击视频的时候不呼出上下菜单
    $('.plyr').click(function (e) {
      e.stopPropagation();
    })
    return;
  }

  const players = Array.from(document.querySelectorAll('.plyr-player')).map(p => new Plyr(p, {
    controls: ['play-large', 'play', 'current-time', 'progress', 'captions', 'fullscreen'],
    fullscreen: {iosNative: true},
    captions: {active: false, language: 'auto'},
    invertTime: false,
    listeners: {
      play() {
        let _this = this; //执行环境s
        // cb1 ==>wifi情况下。直接执行,4g同意的情况下; cb2 ==> 4g不同意； cb3 ==> 无网的情况下  stateSwitch/状态切换   正在播放暂停时候不需要询问用户
        let cb1 = function () {
          if (!_this.playing) {
            _this.elements.controls.style.display = 'flex';
            _this.elements.videoTitle.style.display = 'block';
            _this.play();
          } else {
            _this.pause();
          }
        };
        let cb2 = function () {
          return false;
        };
        let cb3 = function () {
          return false;
        };
        //状态切换   正在播放暂停时候不需要询问用户
        let stateSwitch = function () {
          if (!!_this.playing) {
            _this.pause();
            return false;
          } else {
            return true
          }
        };
        judgeNetwork(cb1, cb2, cb3, stateSwitch);
      },
    },
  }));

  //初始化后把 控制条隐藏
   $('.plyr__controls').css('display', 'flex')
  players.forEach(function (item, index) {
    item.on('play', (event) => {
      // $('.plyr__poster').attr('background-image','')
      //与原生交互获取状态  只播放一个视频
      players.forEach(function (items, indexs) {
        if (items !== item) {
          items.pause();
        }

      })
    });
  })
}

/**
 * 音频
 * */
export class InitAudio {
  constructor() {
    this.init();
  }

  get prop() {
    // return this.value;
  }

  set(value) {
    // return this.obj = value;
  }

  init() {
    if ($('.bxx-audio-allInit').length > 0) return;
    let DomAudios = document.getElementsByClassName('bxx-audio');
    let DomAudiosLength = DomAudios.length;
    if (DomAudios && DomAudiosLength >= 1) {
      let audiosOption = [];
      for (let i = 0; i < DomAudiosLength; i++) {
        var option = {};
        option.title = DomAudios[i].getAttribute('title') ? DomAudios[i].getAttribute('title') : null;
        option.src = DomAudios[i].getAttribute('src');
        option.disc = DomAudios[i].getAttribute('disc') ? DomAudios[i].getAttribute('disc') : null;
        audiosOption.push(option)
      }
      //因为dom替换  所以从最后一个开始替换
      for (let i = DomAudiosLength - 1; i >= 0; i--) {
        DomAudios[i].outerHTML = `<div class="bxx-audio-allInit"></div>`
      }

      let audios = [];
      for (let i = 0; i < $('.bxx-audio-allInit').length; i++) {
        let audio = new Wxaudio({
          ele: i,
          title: audiosOption[i].title,
          disc: audiosOption[i].disc,
          src: audiosOption[i].src,
          ended: function () {
            //alert('播放结束')
          }
        });
        audios.push(audio)
      }
      $('.bxx-audio-allInit').click(function (e) {
        e.stopPropagation()
        e.preventDefault()
      })
      let buttons = document.getElementsByClassName('wx-audio-left')
      for (let i = 0; i < buttons.length; i++) {
        //此处click事件在移动端有点击穿透行为
        buttons[i].addEventListener('click', function (e) {
          e.stopPropagation();
          function domClickInit() {
            let _this = audios[i];
            if (_this.isPlaying) {
              _this.audioPause();
            } else {
              audios.forEach(function (item, index) {
                item.audioPause()
              })
              _this.audioPlay();
            }

          }
          domClickInit()
        }, false)
      }
    }
  }

}



//网络判断执行 不同终端下的执行
export function judgeNetwork(cb1, cb2, cb3, stateSwitch) {

  //判断是手机端还是电脑端
  let result = judgeTerminal();
  //询问用户的选择  //4g是否播放 获取用户权限
  let askAdvice = function (cb1, cb2) {
    try {
      MessageBox.confirm('', {
        message: `当前非Wi-Fi环境，继续使用会被运营商收取流量费用，是否确认继续使用？`,
        title: '',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false
      }).then(action => {
        if (action === 'confirm') {     //确认的回调
          if (!cb1) return false;
          cb1();
        }
        //用户确定以后 把用户4g可以播放的选择传递给原生   在这一次打开中不在询问  视频、音频、gif图片
        try {
          //ios
          setupWebViewJavascriptBridge(function (bridge) {
            bridge.callHandler('userNetWorkSelect', btoa(unescape(encodeURIComponent('用户确认4g播放权限'))), function responseCallback(data) {
              // 处理返回数据
            });

          })
        } catch (e) {
          console.log(e)
        }

      }).catch(err => {
        if (err === 'cancel') {
          if (!cb2) return false;
          cb2();
          return false;
        }
      });
    } catch (e) {
      console.log(e)
    }
  }
  //判断网络的执行
  let callBackStatus = function (responseData, cb1, cb2, cb3, stateSwitch) {

    if (responseData.status === '2000') {
      if (!cb1) return false;
      cb1();
    } else if (responseData.status === '2001') {
      // 4g
      //判断用户是否给了权限
      if (responseData.userNetWorkResult && responseData.userNetWorkResult === '1000') {
        //直接播放
        if (!cb1) return false;
        cb1();
      } else {
        if (stateSwitch) {
          let switchStatus = stateSwitch();
          if (!switchStatus) return false;
        }
        askAdvice(cb1, cb2)
      }

    } else if (responseData.status === '2002') {
      //无网
      MessageBox.alert('当前无网络，请检查您的网络设置').then(action => {
        if (!cb3) return false;
        cb3();
      });

    }
  }
  if (result === 'pc') {
    if (!cb1) return false;
    cb1();
  } else {
    //判断手机状态并执行
    if (result === 'ios') {
      //ios
      let promise = new Promise(function (resolve, reject) {
        setupWebViewJavascriptBridge(function (bridge) {
          bridge.callHandler('netWorkState', btoa(unescape(encodeURIComponent('获取网络状态'))), function responseCallback(data) {
            // 处理返回数据
            let responseData = JSON.parse(decodeURIComponent(escape(window.atob(data))));
            if (responseData) {
              resolve(responseData);
            } else {
              reject('网络状态交互失败')
            }
          });

        })
      });

      promise.then((responseData) => {
        callBackStatus(responseData, cb1, cb2, cb3, stateSwitch)
      }).catch((e) => {
        console.warn(e)
      })
    } else if (result === 'android') {
      //android

      try {
        let status = JSON.parse(jsCallAndroid.netWorkState('获取网络状态')); //返回的状态
        callBackStatus(status, cb1, cb2, cb3, stateSwitch)
      } catch (e) {

      }

    }

  }
}



/**
 * 判断是在webview中还是浏览器
 * */
export function judgeTerminal() {
  let u = navigator.userAgent;
  let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) && u.indexOf('Safari') < 0;
  let isAndroid = /(?:Android)/.test(u);
  if (isIOS) {
    return 'ios'
  } else if (isAndroid) {
    return 'android'
  } else {
    return 'pc'
  }
}



export function H5InitVideo() {
  //没有视频 就不初始化了
if (!$('.plyr-player').length) return;
  //已经初始化过的就不初始化了
if ($('.plyr').length >= 1) {
    //点击视频的时候不呼出上下菜单
    $('.plyr').click(function (e) {
      e.stopPropagation();
    })
    return;
  }

  const players = Array.from(document.querySelectorAll('.plyr-player')).map(p => new Plyr(p, {
    controls: ['play-large', 'play', 'current-time', 'progress', 'captions', 'fullscreen'],
    fullscreen: {iosNative: true},
    captions: {active: false, language: 'auto'},
    invertTime: false,
    listeners: {},
  }));

  //初始化后把 控制条隐藏
  $('.plyr__controls').css('display', 'flex')
  players.forEach(function (item, index) {
    item.on('play', (event) => {
      // $('.plyr__poster').attr('background-image','')
      //与原生交互获取状态  只播放一个视频
      players.forEach(function (items, indexs) {
        if (items !== item) {
          items.pause();
        }

      })
    });
  })
}
