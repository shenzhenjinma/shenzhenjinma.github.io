$(function(){
    //0.加载微信设置
    $.getJSON('/data/wechatjsapi',{
        'url' : encodeURI(window.location.href)
    },function(result){
        if(result && result['ret']==0 && result['data']){
            var appId = result['data']['appId'];
            var wechat_js_config = result['data'];
            if(wx && wx.ready){
                wx.config({
                    debug: false,
                    appId: wechat_js_config['appId'],
                    timestamp: wechat_js_config['timestamp'],
                    nonceStr: wechat_js_config['nonceStr'],
                    signature: wechat_js_config['signature'],
                    jsApiList: [
                        'checkJsApi',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'onMenuShareWeibo'
                    ]
                });
                wx.ready(function(){
                    setForward()
                });
            }
        }
    });

    var setForward = function(shareJSON){
        var share_title = (shareJSON && shareJSON["title"]) ? shareJSON["title"] : (wxShare && wxShare.title) ? wxShare.title : document.title,
            share_desc = (shareJSON && shareJSON["desc"]) ? shareJSON["desc"] : (wxShare && wxShare.desc) ? wxShare.desc : "",
            share_link = (shareJSON && shareJSON["link"]) ? shareJSON["link"] : (wxShare && wxShare.link) ? wxShare.link : location.href,
            share_imgUrl = (shareJSON && shareJSON["imgUrl"]) ? shareJSON["imgUrl"] : ((wxShare && wxShare.imgUrl) ? wxShare.imgUrl : '');

        wx.onMenuShareAppMessage({
            title: share_title,
            desc: share_desc,
            link: share_link,
            imgUrl: share_imgUrl
        });

        wx.onMenuShareTimeline({
            title: share_title,
            desc: share_desc,
            link: share_link,
            imgUrl: share_imgUrl
        });

        wx.onMenuShareQQ({
            title: share_title,
            desc: share_desc,
            link: share_link,
            imgUrl: share_imgUrl
        });

        wx.onMenuShareWeibo({
            title: share_title,
            desc: share_desc,
            link: share_link,
            imgUrl: share_imgUrl
        });
    }
});