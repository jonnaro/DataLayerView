// save configuration options
function save_options() {
  //get form selections from options.html
  var toggle_status = document.getElementById('toggle').value;
  var datalayer_object = document.getElementById('datalayer_object').value;

  //save in chrome.storage
  chrome.storage.sync.set({
    dlvstatus: toggle_status,
    dlvobject: datalayer_object
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() { status.textContent = ''; }, 750);
    console.log('Data Layer View Configuration updated.');
  });
}

// Displays configuration settings based on what is stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    // default values
    dlvstatus: true,
    dlvobject: 'digitalData'
  }, function(config) {
    document.getElementById('toggle').value = config.dlvstatus;
    document.getElementById('datalayer_object').value = config.dlvobject;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('saveBtn').addEventListener('click', save_options);
