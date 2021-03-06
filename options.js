// save configuration options
function save_options() {
  //default configuration
  var toggle_status = 'true';
  var datalayer_object = 'digitalData';

  //toggle status selection (options.html)
  if (document.getElementById('toggle_enable').checked) {
    toggle_status = 'true';
  } else if (document.getElementById('toggle_disable').checked) {
    toggle_status = 'false';
  }

  //object name configuration (options.html)
  datalayer_object = document.getElementById('datalayer_object').value;

  //save in chrome.storage
  chrome.storage.sync.set({
    dlvstatus: toggle_status,
    dlvobject: datalayer_object
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() { status.textContent = ''; }, 750);
  });
}

// Displays configuration settings based on what is stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    // default values
    dlvstatus: true,
    dlvobject: 'digitalData'
  }, function(config) {
    document.getElementById('datalayer_object').value = config.dlvobject;

    if (config.dlvstatus == 'true') {
      document.getElementById('toggle_enable').checked = true;
      console.log('Data Layer View is currently enabled');
    } else if (config.dlvstatus == 'false') {
      document.getElementById('toggle_disable').checked = true;
      console.log('Data Layer View is currently disabled');
    }
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('saveBtn').addEventListener('click', save_options);
