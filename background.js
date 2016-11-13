// more user strings https://github.com/cvandeplas/pystemon/blob/master/user-agents.txt



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

var sets = browser.storage.local.get();

var settings = {};

sets.then(function (results) {
    settings = results;
}, onError);

function ChookieTracker(changeInfo) {

    if (settings.AllowCookies) {
        console.log('Cookie changed: ' +
                '\n * Cookie: ' + JSON.stringify(changeInfo.cookie) +
                '\n * Cause: ' + changeInfo.cause +
                '\n * Removed: ' + changeInfo.removed);
    } else {
        console.log("I eat the Cookies!!!!");
    }
    
}

function logURL(requestDetails) {
  //console.log("Loading: " + requestDetails.url);
  //console.log(Math.floor(Math.random()*3));
  //var ua = uaStrings[Math.floor(Math.random()*len)];
  //console.log(ua);
    var index = (Date.now() >> 10) % len;

    console.log(index);

    var ua = uaStrings[index];
  for (var header of requestDetails.requestHeaders) {
      //console.log(header.name +' '+header.value);
      if (header.name == "User-Agent") {
          if (settings.UseCustom) {
              header.value = settings.UserString;
          } else {
              header.value = ua;
          }
      }
  }
  return { requestHeaders: requestDetails.requestHeaders };

}

function onError(error) {
    console.log(`Error: ${error}`);
}

function logStorageChange(changes, area) {

    if (area == 'local') {

        console.log(settings);

        var changedItems = Object.keys(changes);

        console.log("Changing local");

        for (item of changedItems) {
            console.log("Changing local " + item + " " + settings[item] + " " + changes[item].newValue);
            settings[item] = changes[item].newValue;
        }
    } else {
        console.log("Change in storage area: " + area);

        var changedItems = Object.keys(changes);

        for (item of changedItems) {
            console.log(item + " has changed:");
            console.log("Old value: ");
            console.log(changes[item].oldValue);
            console.log("New value: ");
            console.log(changes[item].newValue);
        }
    }
}

//-------------------------------Set Listiners ---------------------------------------------------
browser.webRequest.onBeforeSendHeaders.addListener(logURL, { urls: ["<all_urls>"] },["blocking", "requestHeaders"]);

browser.storage.onChanged.addListener(logStorageChange);

browser.cookies.onChanged.addListener(function (tabId, changeInfo, tab) {
    console.log('Cookie changed: ' +
                '\n * Cookie: ' + JSON.stringify(changeInfo.cookie) +
                '\n * Cause: ' + changeInfo.cause +
                '\n * Removed: ' + changeInfo.removed);
});