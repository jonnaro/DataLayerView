// Saves options to chrome.storage
function save_options() {
  var toggle_status = document.getElementById('toggle').value;
  var datalayer_object = document.getElementById('datalayer_object').value;
  chrome.storage.sync.set({
    enabled: toggle_status,
    datalayer: datalayer_object
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
    console.log('Data Layer View Configuration updated.');
  });
}

// Displays configuration settings based on what is stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    // default values
    enabled: true,
    datalayer: 'digitalData'
  }, function(config) {
    document.getElementById('toggle').value = config.enabled;
    document.getElementById('datalayer_object').value = config.datalayer;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('saveBtn').addEventListener('click', save_options);
