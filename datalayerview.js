// define DOM dataLayer object
var dataObject = window.digitalData;

// display Data Layer (called if dataObject found on page)
function dispDL(datalayer) {

  var dl     = datalayer;
  var width  = 20; //width of left column in console display
  var name   = "";
  var val    = "";
  var lvltwo = [];

  console.group('DataLayer Viewer: digitalData');

    //TOP-LEVEL iteration
    console.group('Top-level');
    for (var key in dl) {
      name = key + ' '.repeat(width - key.length);
      val = dl[key];

      if (typeof val === 'object') {
        lvltwo.push(key); //add to leveltwo objects array
        continue;
      }
      console.log(name + ' : ' + val); //display top-level variables
    }
    console.groupEnd();

    //LEVEL TWO iteration
    //console.log(lvltwo);

    //iterate through pageInfo object (TEMP)
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
  console.info('A Data Layer object could not be found.');
} else {
  dispDL(dataObject);
}
