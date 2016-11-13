// more user strings https://github.com/cvandeplas/pystemon/blob/master/user-agents.txt
var uaStrings = [
   "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:41.0) Gecko/20100101 Firefox/41.0",
   "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36",
   "Mozilla/5.0 (compatible, MSIE 11, Windows NT 6.3; Trident/7.0;  rv:11.0) like Gecko"
];

var len = uaStrings.length;

function logURL(requestDetails) {
  console.log("Loading: " + requestDetails.url);
  //console.log(Math.floor(Math.random()*3));
  var ua = uaStrings[Math.floor(Math.random()*len)];
  console.log(ua);
  
  for (var header of requestDetails.requestHeaders) {
    if (header.name == "User-Agent") {
      header.value = ua;
    } 
  } 
  return { requestHeaders: requestDetails.requestHeaders };
  
  
}

browser.webRequest.onBeforeSendHeaders.addListener(
  logURL,
        { urls: ["<all_urls>"] },
        ["blocking", "requestHeaders"]);