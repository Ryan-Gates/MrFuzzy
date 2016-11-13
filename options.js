function saveOptions(e) {
    chrome.storage.local.set({
        UserString: document.querySelector("#UserString").value,
        UseCustom: document.querySelector("#UseCustom").checked,
        AllowCookies: document.querySelector("#AllowCookies").checked
    });
}

function restoreOptions() {

    function setCurrentChoice(results) {
        console.log(results);
        document.querySelector("#UserString").value = results.UserString;
        document.querySelector("#UseCustom").checked = results.UseCustom;
        document.querySelector("#AllowCookies").checked = results.AllowCookies;
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    var getting = browser.storage.local.get();
    getting.then(setCurrentChoice, onError);
}


document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);