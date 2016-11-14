var doc = window.content.document;
var wih = window.innerHeight;
var wiw = window.innerWidth;

function getwiw() {
    var mod = Math.floor(Math.random() * 10);
    return Math.pow(-1, mod) * mod + wiw;
}

function getwih() {
    var mod = Math.floor(Math.random() * 10);
    return Math.pow(-1, mod) * mod + wih;
}
var uaStrings = [
   "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:41.0) Gecko/20100101 Firefox/41.0",
   "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36",
   "Mozilla/5.0 (compatible, MSIE 11, Windows NT 6.3; Trident/7.0;  rv:11.0) like Gecko"
    , "Mozilla/5.0 (X11; U; Linux x86_64; en-US; rv:1.9.0.7) Gecko/2009030719 Firefox/3.0.3"
    , "Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US; rv:1.9a5pre) Gecko/20070428 Minefield/3.0a5pre"
    , "Mozilla/5.0 (X11; U; Linux i686; es-ES; rv:1.9.1.7) Gecko/20091222 SUSE/3.5.7-1.1.1 Firefox/3.5.7"
    , "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.8) Gecko/2009032609 Firefox/3.0.0 (.NET CLR 3.5.30729)"
    , "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/534.3 (KHTML, like Gecko) Iron/6.0.475 Chrome/6.0.475.0 Safari/92861792.534"
    , "Mozilla/5.0 (X11; U; OpenBSD i386; en-US; rv:1.8.1.7) Gecko/20070930 Firefox/2.0.0.7"
    , "Mozilla/5.0 (Windows; U; Windows NT 5.2; en-US; rv:1.8.0.12) Gecko/20070508 Firefox/1.5.0.12"
    , "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/534.30 (KHTML, like Gecko) Iron/12.0.750.0 Chrome/12.0.750.0 Safari/534.30"
    , "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:0.9.2) Gecko/20010809"
    , "Mozilla/5.0 (X11; U; Linux i686 (x86_64); en-GB; rv:1.9.1.3) Gecko/20091010 Iceweasel/3.5.3 (Debian-3.5.3-2)"
    , "Mozilla/5.0 (X11; U; SunOS sun4u; en-US; rv:1.7) Gecko/20060629"
    , "Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US) AppleWebKit/525.19 (KHTML, like Gecko) Iron/0.2.152.0 Safari/41562480.525"
    , "Mozilla/5.0 (Windows; U; Windows NT 6.1; ja; rv:1.9.1.15) Gecko/20101029 Firefox/3.5.15 Lunascape/6.3.4.23051 ( .NET CLR 3.5.30729; .NET4.0C)"
    , "Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/522+ (KHTML, like Gecko) OmniWeb"
    , "Mozilla/5.0 (Windows NT 6.1; rv:2.0b11pre) Gecko/20110126 Firefox/4.0b11pre"
    , "Mozilla/5.0 (X11; U; Linux i686; en-gb) AppleWebKit/525.1+ (KHTML, like Gecko, Safari/525.1+) epiphany-webkit"
    , "Mozilla/5.0 (X11; FreeBSD amd64; rv:5.0) Gecko/20100101 Firefox/5.0"
    , "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.0.1) Gecko/20021122 Debian/1.0.1-2"
    , "Opera/9.51 (Windows NT 5.1; U; nn)"
    , "Opera/9.80 (Windows NT 6.0; U; en) Presto/2.7.39 Version/11.00"];

var len = uaStrings.length;

var index = (Date.now() >> 10) % len;

console.log(index);

var ua = uaStrings[index];
//Add the script
var script = doc.createElement("script");
script.setAttribute("type", "text/javascript");
script.setAttribute("charset", "UTF-8");
var winwidthpwn = '\n window.__defineGetter__(\"innerWidth\",function () { return ' + getwiw() + '});';
var winhighthpwn = '\n window.__defineGetter__(\"innerHeight\",function () { return ' + getwih() + '});';
var winoutdthpwn = '\n window.__defineGetter__(\"outerWidth\",function () { return ' + getwiw() + '});';
var winhoutthpwn = '\n window.__defineGetter__(\"outerHeight\",function () { return ' + getwih() + '});';
var pluginnuke = '\n window.navigator.__defineGetter__(\"plugins\",function () { return \'\'});';
var juser = "function setUserAgent(window, userAgent) { if (window.navigator.userAgent != userAgent) { var userAgentProp = { get: function () { return userAgent; } }; try { Object.defineProperty(window.navigator, 'userAgent', userAgentProp);  } catch (e) { window.navigator = Object.create(navigator, { userAgent: userAgentProp  });  } } } \n \n setUserAgent(window,\"" + ua + "\");"
var newContent = document.createTextNode(juser + pluginnuke + winhighthpwn + winwidthpwn + winoutdthpwn + winhoutthpwn);
script.appendChild(newContent);

doc.head.appendChild(script);
