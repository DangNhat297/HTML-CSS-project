var ce = 0,uw = "http://animehay.tv/";
var $cookie = {
    getItem: function(sKey) {
        return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    },
    setItem: function(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
            return false;
        }
        var sExpires = "";
        if (vEnd) {
            switch (vEnd.constructor) {
                case Number:
                    sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
                    break;
                case String:
                    sExpires = "; expires=" + vEnd;
                    break;
                case Date:
                    sExpires = "; expires=" + vEnd.toUTCString();
                    break;
            }
        }
        document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
        return true;
    },
    removeItem: function(sKey, sPath, sDomain) {
        if (!sKey || !this.hasItem(sKey)) {
            return false;
        }
        document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
        return true;
    },
    hasItem: function(sKey) {
        return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    },
    keys: /* optional method: you can safely remove it! */ function() {
        var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
        for (var nIdx = 0; nIdx < aKeys.length; nIdx++) {
            aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
        }
        return aKeys;
    }
};
var logMessage = function(message) {
    document.getElementById('log').innerHTML += message += '<br />';
}
function adSkip(t)
{
        jwplayer().skipAd();
}
function setupIframe(link)
{
    document.getElementById("player").innerHTML = '<iframe src="'+link+'" height="500px" width="100%" frameborder="0" scrolling="no" marginheight="0px" marginwidth="0px" allowfullscreen></iframe>';
}

function loadVideo2(s, aa, seek, w) {
    var player = jwplayer("ah-player");
    var audio = document.getElementById("audio");

    player.setup({
        sources: s,
        width: w,
        aspectratio: "12:6",
        playbackRateControls: [0.75, 1, 1.25, 1.5, 2, 2.5],
        autostart: true,
        volume: 100,
        advertising: {
            client: 'vast',
            admessage: 'Quảng cáo còn XX giây.',
            skipoffset: 5,
            skiptext: 'Bỏ qua quảng cáo',
            skipmessage: 'Bỏ qua sau xxs',
            tag: aa,
        },
    });
    player.on("pause",function()
    {
        audio.pause();
    }).on("seek",function(e)
    {
        audio.pause();
    }).on("seeked",function(e)
    {
        audio.play();
        audio.currentTime = player.getPosition();
    }).on('volume',function(e)
    {
        audio.volume = e.volume/100;
    });
    if (seek != 0) {
        player.seek(seek)
    }
    player.on('time', function(e) {
        $cookie.setItem('resumevideodata', Math.floor(e.position) + ':' + player.getDuration(), 82000, window.location.pathname)
    });
    player.on('firstFrame', function() {
		document.getElementById('server_load').style.display = 'block';
        audio.play();
        player.on("play",function()
        {
            audio.play();
        });
        var cookieData = $cookie.getItem('resumevideodata');
        if (cookieData) {
            var resumeAt = cookieData.split(':')[0],
                videoDur = cookieData.split(':')[1];
            if (parseInt(resumeAt) < parseInt(videoDur)) {
                (resumeAt == 0) ? resumeAt = 1: "";
                player.seek(resumeAt);
                logMessage('Resuming at ' + resumeAt)
            } else if (cookieData && !(parseInt(resumeAt) < parseInt(videoDur))) {
                logMessage('Video ended last time! Will skip resume behavior')
            }
        } else {
            logMessage('No video resume cookie detected. Refresh page.')
        }
    });
    
     player.on('adImpression',function()
    {   
        document.getElementById("ah-player").querySelector(".jw-aspect").insertAdjacentHTML("afterend", "<div class='ah-skip' style='padding: 0.9em;pointer-events: all;z-index:99999999;border: 1px solid #333;background-color: #000 !important;font-size: 15px!important;text-shadow: 1px 1px 2px #000;position: absolute;float: right;display: none;right: 10px;top: 12px;color: #fff;' onClick='adSkip(this)'>Bỏ qua quảng cáo</div>");
        setTimeout(function(){
            var elm = document.getElementById("ah-player").querySelector(".ah-skip");
            elm.style.display = 'inline-block';
            
        },13000);
    });
    var elm = null;
    player.on('adComplete',function()
    {
        elm = document.getElementById("ah-player").querySelector(".ah-skip");
        if(elm !== null)
        {
            elm.parentNode.removeChild(elm);
        }
    })
    player.on('adSkipped',function()
    {
        elm = document.getElementById("ah-player").querySelector(".ah-skip");
        if(elm !== null)
        {
            elm.parentNode.removeChild(elm);
        }
    })
    player.on("seek", function(e) {
        seek = e.offset;
    }).on("error", function() {
        ce += 1;
        if (ce < 10) {
            reloadPlayer();
        }
    })
}

function loadVideo(s, aa, seek, w) {
    if(document.getElementById('audio') !== null)
    {
        document.getElementById('audio').pause();
    }
    var jp = jwplayer("ah-player");
    jp.setup({
        sources: s,
        width: w,
        aspectratio: "12:6",
		playbackRateControls: [0.75, 1, 1.25, 1.5, 2, 2.5],
        autostart: true,
		volume: 100,
		primary: "html5",
		advertising: {
			tag: "https://ad.doubleclick.net/ddm/pfadx/N566201.3523628ANIMEHAY.TV/B20375305.243655050;sz=0x0;ord=[timestamp];dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;dcmt=text/xml;dc_sdk_apis=[APIFRAMEWORKS];dc_omid_p=[OMIDPARTNER];dc_vast=3",
			client: "googima",
			vpaidmode: "disabled",
			companiondiv: {
				"id": "sample-companion-div",
				"height": 250,
				"width": 300
			}
		},
       
    });
    if (seek != 0) {
        jp.seek(seek)
    }
    jp.on('time', function(e) {
        $cookie.setItem('resumevideodata', Math.floor(e.position) + ':' + jp.getDuration(), 82000, window.location.pathname)
    });
    jp.on('firstFrame', function() {	
        var cookieData = $cookie.getItem('resumevideodata');
        if (cookieData) {
            var resumeAt = cookieData.split(':')[0],
                videoDur = cookieData.split(':')[1];
            if (parseInt(resumeAt) < parseInt(videoDur)) {
                (resumeAt == 0) ? resumeAt = 1: "";
                jp.seek(resumeAt);
                logMessage('Resuming at ' + resumeAt)
            } else if (cookieData && !(parseInt(resumeAt) < parseInt(videoDur))) {
                logMessage('Video ended last time! Will skip resume behavior')
            }
        } else {
            logMessage('No video resume cookie detected. Refresh page.')
        }
    });
    jp.addButton(
      "http://animehay.tv/themes/AH_1.2/all/fonts/forward3.svg",
      "Tua tiến 10s",
      function() {
        jp.seek(jp.getPosition()+10);
      },
      "Tua tiến 10s"
    );
    jp.addButton(
      "http://animehay.tv/themes/AH_1.2/all/fonts/backward2.svg",
      "Tua lùi 10s",
      function() {
        jp.seek(jp.getPosition()-10);
      },
      "Tua lùi 10s"
    );
     jp.on('adImpression',function()
    {   
        document.getElementById("ah-player").querySelector(".jw-aspect").insertAdjacentHTML("afterend", "<div class='ah-skip' style='padding: 0.9em;pointer-events: all;z-index:99999999;border: 1px solid #333;background-color: #000 !important;font-size: 15px!important;text-shadow: 1px 1px 2px #000;position: absolute;float: right;display: none;right: 10px;top: 12px;color: #fff;' onClick='adSkip(this)'>Bỏ qua quảng cáo</div>");
        setTimeout(function(){
            var elm = document.getElementById("ah-player").querySelector(".ah-skip");
            elm.style.display = 'inline-block';
            
        },10000);
    });
    var elm = null;
    jp.on('adComplete',function()
    {
        elm = document.getElementById("ah-player").querySelector(".ah-skip");
        if(elm !== null)
        {
            elm.parentNode.removeChild(elm);
        }
    })
    jp.on('adSkipped',function()
    {
        elm = document.getElementById("ah-player").querySelector(".ah-skip");
        if(elm !== null)
        {
            elm.parentNode.removeChild(elm);
        }
    })
    jp.on("seek", function(e) {
        seek = e.offset;
    }).on("error", function() {
        ce += 1;
        if (ce < 10) {
            reloadPlayer();
        }
    })
}
function checkMobile() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

function reloadPlayer(a, b, c) {
    var el = document.getElementById("ah-player");
    a = jwplayer().getPosition();
    b = el.offsetWidth;
    c = el.offsetHeight;
    loadVideo(infoLoad.link_main_json,null,0,"100%");
}
function turnOfflight(a, b) {
    b = document.getElementsByTagName("body")[0];
    w = document.getElementById('ah-wrapper');
    a = b.querySelector(".lightsoff");
    if (a == null) {
        document.getElementById('ah-player').style.zIndex = 1002;
        w.insertAdjacentHTML("afterend", "<div class=\"lightsoff\" style=\"background-color: rgba(0, 0, 0, .9);width: 100%;top: 0;position: fixed;opacity: 1;filter: alpha(opacity=90);left: 0;height: 100%;z-index: 1001;-webkit-transition: opacity .5s ease-in-out;-moz-transition: opacity .5s ease-in-out;-o-transition: opacity .5s ease-in-out;transition: opacity .5s ease-in-out;\"></div>");
        b.querySelector(".lightsoff").onclick = function()
        {
            turnOfflight();
        }
    } else {
        document.getElementById('ah-player').style.zIndex = 0;
        b.removeChild(a);
    }
}
function addBox(uid, fid, token) {
    if (uid == 0) {
        alert("Đăng nhập để thực hiện thao tác");
        return false;
    };
    var t = document.getElementById("addBox");
    if (uid !== 0 && typeof fid !== "undefined") {
        var request = new XMLHttpRequest();
        var data = "uid_addBox="+uid+"&fid_addBox="+fid+"&token="+token;
        request.open('POST', uw + "ajax", true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.onreadystatechange = function() {
            if(request.readyState == 4 && request.status == 200) {
				if(this.responseText == "limit")
				{
					alert("Hộp phim giới hạn 400 bộ!");
				}
				else
				{
					location.reload();
				}
               
            }
        }
        request.send(data); 
    }
}