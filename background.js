chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    console.log(msg);
});

// might not be necessary
chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tab) {
  var tabID = tab[0].id;
  console.log('active / last window tab id : ' + tabID);
});


//chrome.tabs.sendMessage(tabID, {status: 'test'}, function(response){
//  if (chrome.runtime.lastError) {
//      alert("chrome.runtime.lastError" + chrome.runtime.lastError.message);
//  }
//});
