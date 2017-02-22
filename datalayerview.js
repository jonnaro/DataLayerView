function readDL(domContent) {

  var dl    = window.digitalData;
  var width = 20; //width of left column in console display
  var name  = "";
  var val   = "";

  console.group('w3c DataLayer View - digitalData');

  if (window.digitalData === undefined) {
    console.log('The digitalData object is undefined.');
  }
  else {

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

  }

  console.groupEnd();
}

readDL();
