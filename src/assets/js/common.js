export function openOrDownload() {
    let terminal = navigator.userAgent;
    var isAndroid = terminal.indexOf("Android") > -1 || terminal.indexOf("Adr") > -1; //android终端
    var isiOS = !!terminal.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if (isAndroid) {
    window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.wyzwedu.www.baoxuexiapp";
  } else if (isiOS) {
    window.location.href = "https://itunes.apple.com/cn/app/id1369837201?mt=8";
  } else {
    window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.wyzwedu.www.baoxuexiapp";
  }
  }


  import {Plyr} from "./plyr";

/**
 * 解析url
 * */
export function GetRequest () {
    let url = decodeURIComponent(window.location.href) // 获取url中"?"符后的字串  去掉字符串额#/
    url = url.replace('#/', '')
    let theRequest = new Object()
    if (url.indexOf('?') !== -1) {
        let start = url.indexOf('?') + 1
        let end = url.length - 1
        let str = url.substr(start, end)
        let strs = str.split('&')

        for (let i = 0; i < strs.length; i++) {
            theRequest[strs[i].split('=')[0]] = strs[i].split('=')[1]
        }
    }
    console.log(JSON.stringify(theRequest))
    return theRequest
}

/**
 * 拼接url
 * */
export function setRequest (obj) {
    let str = ''
    for (let i in obj) {
        str += i + '=' + obj[i] + '&'
    }
    let result = str.substring(0, str.length - 1)
    return result
}





//初始化视频
export function initVideo(data) {
    const options = {
        fullscreen: {
            iosNative: true // 进入全屏时是否使用原生iOS全屏（建议开启）
        },
        controls: [
            "play-large",
            "play",
            "current-time",
            "progress",
            "duration",
            "fullscreen"
        ],
//        controls: ['play', 'play-large', 'duration', 'progress', 'current-time', 'duration-time','fullscreen']
    };
    // 创建video标签并设置属性
    const myVideo = document.createElement('video');
    myVideo.setAttribute('id', 'bxxVideo');
    // 插入video标签
    document.getElementsByClassName('video')[0].appendChild(myVideo);
    // video初始化
    const player = new Plyr(`#bxxVideo`, options);
    // 设置video资源文件
    player.source = {
        type: 'video',
        sources: [
            {
                src: data.videourl,
                type: 'video/mp4'
            }
        ],
        poster: data.videocover
    };
   window.player = player;

}
/**
 * 判断是在webview中还是浏览器
 * */
export function judgeTerminal () {
    let u = navigator.userAgent
    let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) && u.indexOf('Safari') < 0
    let isAndroid = /(?:Android)/.test(u)
    if (isAndroid) {
        return 'android'
    } else {
        return 'ios'
    }
}


//弹出框的简单函数
export function showAlert(text,html,index,telphone){
    document.getElementsByClassName('alert-container')[0].innerHTML = html;
    document.getElementsByClassName('alert-button-text')[0].innerHTML = text;
    document.getElementsByClassName('bxx-alert')[0].classList.add('bxx-alert-active')
    document.getElementsByClassName('mask')[0].classList.add('mask-active');
    //按钮的点击事件
    document.getElementsByClassName('alert-button-text')[0].addEventListener('click',function(){
        let info = '';
        if(text === '去学习'){
            info = '领取成功'+index;
        }else if(text === '去登录'){
            info = '新用户下载'
        }else if(text === '马上去撩'){
            info = '老用户下载'
        }
        _czc.push(["_trackEvent", "必刷福利",info,"用户手机"+telphone,'.get-button-second']);
         if(judgeTerminal() === 'android'){
            window.location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.wyzwedu.www.baoxuexiapp'
        }else{
             window.location.href = 'https://itunes.apple.com/cn/app/id1369837201?mt=8'
        }
    },false)

}

//toast简单函数
export function showToast(html){
    document.getElementsByClassName('bxx-toast')[0].innerHTML = html;
    document.getElementsByClassName('bxx-toast')[0].classList.add('bxx-toast-active')
    setTimeout(() => {
        document.getElementsByClassName('bxx-toast')[0].classList.remove('bxx-toast-active')
    },2000)

}


//toast简单函数
export function showLoading(){
   document.getElementsByClassName('loading')[0].classList.add('loading-active')
   document.getElementsByClassName('mask')[0].classList.add('mask-active-loading')

}

export function closeLoading(){
    document.getElementsByClassName('loading')[0].classList.remove('loading-active')
    document.getElementsByClassName('mask')[0].classList.remove('mask-active-loading')

}