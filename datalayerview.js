// define DOM dataLayer object
var dataObject = window.digitalData;

// display Data Layer (called if dataObject found on page)
function dispDL(datalayer) {

  var dl     = datalayer;
  var width  = 20; //width of left column in console display
  var val    = "";
  var lvlone = {}; //level 1

  console.group('DataLayer Viewer: digitalData');

    //TOP-LEVEL iteration
    for (var key in dl) {
      val = dl[key];

      if (typeof val === 'object') continue; //ignore nested objects
      lvlone[key] = val;
    }

    //conditionally output top-level elements if they exist
    if (Object.keys(lvlone).length > 0) {

      console.group('Top-level');

      for (var key in lvlone) {
        var keyf = key + ' '.repeat(width - key.length) + ': ';
        val = lvlone[key];
        console.log(keyf + val); //display top-level variables
      }

      console.groupEnd();
    }


    //LEVEL TWO iteration
    // page.pageInfo or page.category examples

    //manually iterate through pageInfo object
    if (dl.page.pageInfo) {
      var obj = dl.page.pageInfo;
      console.group('page.pageInfo');
      for (var key in obj) {
        var keyf = key + ' '.repeat(width - key.length) + ': ';
        val = obj[key];

        if (val) {
          if (val.length > 100) { //truncate lengthy values
            val = val.substring(0,95) + '...';
          }

          console.log(keyf + val);
        }
      }
      console.groupEnd();
    }

  console.groupEnd();
}

// look for datalayer within DOM
if (dataObject === undefined) {
  console.info('A Data Layer could not be found.');
} else {
  dispDL(dataObject);
}
