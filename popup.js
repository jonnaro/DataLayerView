//helper function to change text
function setText(elementId, text) {
  document.getElementById(elementId).innerText = text;
}

//default button text
//-- make these dynamic values based on config
function init() {
  setText('datalayer-object', 'digitalData');
  setText('status', 'Disable');
}

//toggle plugin
function toggle() {
  var toggle = true;


}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("status").addEventListener("click", toggle);
  init();
});
