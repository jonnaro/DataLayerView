// define DOM dataLayer object
var dataObject = window.digitalData;

// display Data Layer (called if dataObject found on page)
function dispDL(datalayer) {

  var dl    = datalayer;
  var width = 20; //width of left column in console display
  var name  = "";
  var val   = "";

  console.group('w3c DataLayer View - digitalData');

    //site-related
    if (dl.siteID) { console.log('siteID : ' + dl.siteID); }
    if (dl.siteType) { console.log('siteType : ' + dl.siteType); }

    //page-related
    if (dl.pageInstanceID) { console.log('pageInstanceID : ' + dl.pageInstanceID); }

    //iterate through pageInfo object
    if (dl.page.pageInfo) {
      var obj = dl.page.pageInfo;
      console.group('page.pageInfo');
      for (var key in obj) {
        name = key + ' '.repeat(width - key.length);
        val = obj[key];

        if (val) {
          if (val.length > 100) { //truncate lengthy values
            val = val.substring(0,95) + '...';
          }

          console.log(name + " : " + val);
        }
      }
      console.groupEnd();
    }

  console.groupEnd();
}

// look for datalayer within DOM
if (dataObject === undefined) {
  console.log('A Data Layer object could not be found.');
} else {
  dispDL(dataObject);
}
