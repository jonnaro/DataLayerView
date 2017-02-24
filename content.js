function injectScript(file_path, tag) {
    var node = document.getElementsByTagName(tag)[0];
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', file_path);
    node.appendChild(script);
}

// get config options from local storage
chrome.storage.sync.get({dlvstatus: 'true', dlvobject: 'digitalData'},
  function(config) {
    //console.log('Data Layer View Status : ' + config.dlvstatus);
    //console.log('Data Layer View Object : ' + config.dlvobject);
    if (config.dlvstatus == 'true') {
      injectScript(chrome.extension.getURL('datalayerview.js'), 'body');

      setTimeout(function () {
        window.postMessage({ type: 'datalayer_config',
                             text: config.dlvobject},
                             '*' /* targetOrigin: any */ );
      }, 1000);

    }

});
