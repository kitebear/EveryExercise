var ucld = {};
ucld.ver = "V0.03.25", ucld.name = "UCloudMediaPlayerLiveRTMP", ucld.debugid = 0, ucld.log = function (e) {
    window.console && window.console.log("[" + ucld.debugid++ + "] " + e)
}, ucld.browser = {}, ucld.browser.ua = navigator.userAgent, ucld.live = {}, ucld.playerMap = {}, ucld.utils = {
    filterXSS: function (e) {
        return typeof e != "string" ? e : e.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/\'/g, "&apos;")
    }
};
if (window.ActiveXObject) {
    var vie = 6;
    (window.XMLHttpRequest || ucld.browser.ua.indexOf("MSIE 7.0") > -1) && (vie = 7), (window.XDomainRequest || ucld.browser.ua.indexOf("Trident/4.0") > -1) && (vie = 8), ucld.browser.ua.indexOf("Trident/5.0") > -1 && (vie = 9), ucld.browser.ua.indexOf("Trident/6.0") > -1 && (vie = 10), ucld.browser.ie = !0, ucld.browser.version = vie
} else ucld.browser.ua.indexOf("Trident/7.0") > -1 ? (ucld.browser.ie = !0, ucld.browser.version = 11) : ucld.browser.ie = !1;
ucld.PLAYERTYPE = {PLAYER: 1, PUBLISHER: 2}, ucld.noop = function () {
}, ucld.BasePlayer = function () {
    var e = this;
    this.flashobj = null, this.playerid = "", this.width = 0, this.height = 0, this.modId = "", this.wmode = "opaque", this.flashVars = {}, this.bgColor = "#ffffff", this.getFlashVars = function () {
        var e = "", t = window != top ? document.referrer : document.location.href;
        e += "host=" + encodeURIComponent(t);
        for (var n in this.flashVars)e += ["&", encodeURIComponent(n), "=", encodeURIComponent(this.flashVars[n])].join("");
        return e
    }, this.getFlashSwfUrl = function () {
        return ""
    }, this.getFlashHTML = function () {
        var e = this.getFlashVars(), t = this.getFlashSwfUrl(), n = this.width, r = this.height, i = ucld.utils.filterXSS(this.bgColor), s = ucld.utils.filterXSS(this.wmode), o = Math.round(Math.random() * 100);
        this.playerid = "ucld_fp_live_" + (new Date).getTime() + (o < 10 ? "0" + o : o), ucld.playerMap[this.playerid] = this;
        var u = ['<param name="allowScriptAccess" value="always" />', '<param name="movie" value="' + t + '" />', '<param name="bgcolor" value="' + i + '" />', '<param name="quality" value="high" />', '<param name="allowFullScreen" value="true"/>', '<param name="play" value="true" />', '<param name="wmode" value="' + s + '" />', '<param name="flashvars" value="' + e + '"/>', '<param name="type" value="application/x-shockwave-flash" />', '<param name="pluginspage" value="http://get.adobe.com/cn/flashplayer/" />'].join("\n"), a = "";
        return ucld.browser.ie ? (ucld.browser.version == 11 ? a += '<object data="' + t + '" type="application/x-shockwave-flash" width="' + n + '" height="' + r + '" id="' + this.playerid + '" codebase="http://fpdownload.adobe.com/pub/shockwave/cabs/flash/swflash.cab#version=10,2,0,0">\n' : a += '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="' + n + '" height="' + r + '" id="' + this.playerid + '" codebase="http://fpdownload.adobe.com/pub/shockwave/cabs/flash/swflash.cab#version=10,2,0,0">\n', a += u, a += '	<div id="ucld_flash_install" style="line-height:' + r + ";background:" + i + ';text-align:center"><a href="http://www.adobe.com/go/getflashplayer" target="_blank" style="color:#ffffff;font-size:14px;padding:10px;">ç‚¹å‡»æ­¤å¤„å®‰è£…æ’­æ”¾è§†é¢‘éœ€è¦çš„flashæ’ä»¶</a></div>\n', a += "</object>") : a += '<embed wmode="' + s + '" flashvars="' + e + '" src="' + t + '" quality="high" name="' + this.playerid + '" id="' + this.playerid + '" bgcolor="' + i + '" width="' + n + '" height="' + r + '" align="middle" allowScriptAccess="always" volume="10" allowFullScreen="true"  type="application/x-shockwave-flash" pluginspage="http://get.adobe.com/cn/flashplayer/"></embed>', a
    }, this.write = function (e) {
        var t = e;
        if (!t)return;
        t.innerHTML = this.getFlashHTML(), this.flashobj = ucld.browser.ie ? document.getElementById(this.playerid) : document.embeds[this.playerid]
    }, this.create = function (e) {
        this.width = e.width, this.height = e.height, this.modId = e.modId, typeof e.wmode != "undefined" && (this.wmode = e.wmode), typeof e.params == "object" && (this.flashVars = e.params), this.write(this.modId)
    }, this.getFlashObj = function () {
        return this.flashobj
    }, this.getCBEvent = function (e) {
        var t = undefined;
        return typeof this[e] == "function" && this[e] != ucld.noop && (t = this[e]), t
    }, this.callCBEvent = function (e) {
        var t = this.getCBEvent(e);
        if (typeof t == "function") {
            var n = Array.prototype.slice.call(arguments, 1);
            return t.apply(this, n)
        }
        return undefined
    }
}, ucld.live.Player = function () {
    this.getFlashSwfUrl = function () {
        var e = "";
        return e = "http://public.cdn.ucloud.com.cn/player/UMPlayerLive.swf", e
    }, this.load = function (e) {
        if (this.flashobj && typeof this.flashobj.uLoad == "function")return this.flashobj.uLoad(e)
    }, this.stop = function () {
        if (this.flashobj && typeof this.flashobj.uStop == "function")return this.flashobj.uStop()
    }, this.setMute = function (e) {
        if (this.flashobj && typeof this.flashobj.uSetMute == "function")return this.flashobj.uSetMute(e)
    }, this.getPlayStatus = function () {
        if (this.flashobj && typeof this.flashobj.uGetPlayStatus == "function")return this.flashobj.uGetPlayStatus()
    }, this.getFlashObject = function () {
        return this.flashobj
    }
}, ucld.live.Player.prototype = new ucld.BasePlayer, ucld.live.Publisher = function () {
    this.getFlashSwfUrl = function () {
        var e = "";
        return e = "http://public.cdn.ucloud.com.cn/guitazhang/ULivePublisher1VN.swf", e
    }, this.enterRoom = function (e) {
        this.flashobj && typeof this.flashobj.enterRoom == "function" && this.flashobj.enterRoom(e)
    }, this.publish = function () {
        this.flashobj && typeof this.flashobj.publish == "function" && this.flashobj.publish()
    }, this.unpublish = function () {
        this.flashobj && typeof this.flashobj.unpublish == "function" && this.flashobj.unpublish()
    }
}, ucld.live.Publisher.prototype = new ucld.BasePlayer, ucld.live.dispatchEvent = function (e, t) {
    if (!t || typeof t.objectId == "undefined")return;
    var n = t.objectId, r = ucld.playerMap[n];
    r instanceof ucld.BasePlayer && e && r.callCBEvent(e, t)
}, ucld.events = {
    onFlashInited: function (e) {
        ucld.live.dispatchEvent("onInited", e)
    }, onPlayStatus: function (e) {
        ucld.live.dispatchEvent("onPlayStatus", e)
    }, onUserAction: function (e) {
        ucld.live.dispatchEvent("onUserAction", e)
    }, onError: function (e) {
        ucld.live.dispatchEvent("onError", e)
    }
}

function player(el,url){
    var player = new ucld.live.Player();
    player.count = 0
    var params = {
        playurl: url,
        //是否为自动播放
        autoplay:1
    };
    //添加对初始化完成后的回调
    player.onInited = function(info) {
        ucld.log("播放器初始化完成!");
        for(var o in info){
            ucld.log(o+"="+info[o]);
        }
    };
    //播放状态通知
    player.onPlayStatus = function(info) {
        if(!info || (info && typeof info.type== undefined)){
            return;
        }

        switch (info.type){
            //视频加载中，调用播放接口时触发
            case "loading":
                break;
            //视频播放中，视频从loading转为可开始播放状态时触发
            case "playing":
                break;
            //视频停止，一般为视频正常结束、用户手动点击停止按钮或外部调用stop
            case "stop":
                break;
        }
    };
    //播放器错误消息处理
    player.onError = function(info) {
        if(!info){
            return;
        }

        if(player.count === 3){
            tapOther(el,player,{
                width : '246px',
                height : 'auto',
                modId : el,
                visibility: 'visible',
                params : params
            })
        }else{
            ++player.count
            player.load()
        }

        if(info.type){
            //不建议针对错误码做处理，用来做统计或定位问题使用
            //ucld.log("播放器错误码："+info.type);
        }
        if(info.desc){
            //显示错误提示给用户即可
            //ucld.log("播放器错误提示："+info.desc);
        }
    };

    //用户动作处理
    player.onUserAction = function(info) {
        if(!info || (info && typeof info.type == undefined)){
            return;
        }
        switch (info.type){
            //点击播放按钮
            case "playBtnClick":
                break;
            //点击暂停按钮
            case "pauseBtnClick":
                break;
            //点击全屏按钮
            case "fullscreen":
                break;
            //点击退出全屏按钮
            case "normalscreen":
                break;
            //点击静音按钮
            case "muteBtnClick":
                break;
            //点击取消静音按钮
            case "unmuteBtnClick":
                break;
            default:
                ucld.log("Unkown user action!");
        }
    };

    //创建播放器
    player.create({
        width : '246px',
        height : 'auto',
        modId : el,
        visibility: 'visible',
        params : params
    });

    ucld.log("创建完成");
}