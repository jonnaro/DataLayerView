function injectScript(file_path, tag) {
    var node = document.getElementsByTagName(tag)[0];
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', file_path);
    node.appendChild(script);
}

// Receive messages from popup.js
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

        if (request.message == "enable") {
          console.log("Data Layer View has been enabled.");
          sendResponse({notification: "enable_success"});
        }

        if (request.message == "disable") {
          console.log("Data Layer View has been disabled.");
          sendResponse({notification: "disable_success"});
        }

});

// Run on each page load
injectScript(chrome.extension.getURL('datalayerview.js'), 'body');
