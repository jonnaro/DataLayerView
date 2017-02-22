function readDL(domContent) {

  var dl = window.digitalData;
  var width = 10; //width of left column in console display

  console.group('digitalData - w3c Data Layer View');

  if (window.digitalData === undefined) {
    console.log('The digitalData object is not defined on this page.');
  }
  else {

    //site-related
    if (dl.siteID) { console.log('pageInstanceID : ' + dl.siteID); }

    //page-related
    if (dl.pageInstanceID) { console.log('pageInstanceID : ' + dl.pageInstanceID); }

    //iterate through pageInfo object
    if (dl.page.pageInfo) {
      branch = dl.page.pageInfo;
      console.group('page.pageInfo');
      for (var key in branch) {

        if (branch.hasOwnProperty(key) && branch[key]) {
          var name = key + " ".repeat(width - key.length);
          console.log(name + " : " + branch[key]);
        }
      }
      console.groupEnd();
    }

  }

  console.groupEnd();
}

readDL();
