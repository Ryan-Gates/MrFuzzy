var doc = window.content.document;

//Add the script
var script = doc.createElement("script");
script.setAttribute("type", "text/javascript");
script.setAttribute("charset", "UTF-8");
var pluginnuke = '\n window.navigator.__defineGetter__(\"plugins\",function () { return \'\'});';
var newContent = document.createTextNode("function setUserAgent(window, userAgent) { if (window.navigator.userAgent != userAgent) { var userAgentProp = { get: function () { return userAgent; } }; try { Object.defineProperty(window.navigator, 'userAgent', userAgentProp);  } catch (e) { window.navigator = Object.create(navigator, { userAgent: userAgentProp  });  } } } \n \n setUserAgent(window,\"" + "Opera/10.60 (Windows NT 5.1; U; zh-cn) Presto/2.6.30 Version/10.60" + "\");"+pluginnuke);
script.appendChild(newContent);

doc.head.appendChild(script);
