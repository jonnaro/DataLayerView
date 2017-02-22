function readDL(domContent) {

  console.group('digitalData - w3c Data Layer View');

  if (window.digitalData === undefined) {
    console.log('The digitalData object is not defined on this page.');
  }
  else {
    console.log('pageInstanceID  : ' + window.digitalData.pageInstanceID);
    console.log('siteID          : ' + window.digitalData.siteID);
  }

  console.groupEnd();
}

readDL();
