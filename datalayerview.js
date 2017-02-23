// define DOM dataLayer object
var dataObject = window.digitalData;

// display Data Layer (called if dataObject found on page)
function dispDL(datalayer) {

  var dl     = datalayer;

  //flatten nested object
  function flatten(ob) {
    var toReturn = {};

  	for (var i in ob) {
  		if (!ob.hasOwnProperty(i)) continue;
  		if ((typeof ob[i]) == 'object') {
  			var flatObject = flatten(ob[i]);
  			for (var x in flatObject) {
  				if (!flatObject.hasOwnProperty(x)) continue;
  				toReturn[i + '.' + x] = flatObject[x];
  			}
  		} else {
  			toReturn[i] = ob[i];
  		}
  	}
  	return toReturn;
  };

  // input a flatted data layer object
  // output a sorted data layer array with hierarchy level
  function format(obj) {
    var flatDL = [];
    var width  = 40; //width of left column in console display

    for (var key in obj) {

      var level = (key.split(".").length - 1); //level in hierarchy
      var keyf = key + ' '.repeat(width - key.length) + ': ';
      var value = obj[key];
      var sortablekey = level + '|' + keyf + '|' + value;

      flatDL.push(sortablekey);
    }

    var output = flatDL.sort(); //sort flattened data Layer
    return output;
  }

  // input a sorted and flattened data layer array
  // output a nested format in console
  function output(array) {

    //array value => level|element|value
    var arrayLength = array.length;

    //delineate objects into groups
    // level 1+ => [Child Object]
    var a = [], b = [], prev;
    for (var i = 0; i < arrayLength; i++) {

      var level = array[i].split('|')[0];

      // level 0  => Base
      if (level == 0) {
        level = 'base';
      }

      // level 1+ => [Child Object]
      if (level >= 1) {
        level = array[i].split('|')[1].split('.')[0];
      }

      if (level !== prev) {
        a.push(level);
        b.push(1);
      } else {
        b[b.length-1]++;
      }
      prev = level;

    }

    var groups = {};
    for (var i = 0; i < a.length; i++) {
      groups[a[i]] = b[i];
    }

    //output elements
    var groupCount = 0;
    for (var i = 0; i < arrayLength; i++) {
      //extract group identifier from key, based on level
      var level = array[i].split('|')[0];
      if (level == 0) {
        level = 'base';
      }
      if (level >= 1) {
        level = array[i].split('|')[1].split('.')[0];
      }
      //extract element from second part of key
      var element = array[i].split('|')[1];
      //extract value from third part of key and truncate lengthy values
      var value = array[i].split('|')[2];
      if (value.length > 100) { value = value.substring(0,95) + '...'; }

      // group outputs
      groupCount++;

      if (groupCount == 1) { console.group(level); }

      console.log(element + value);

      if (groupCount == groups[level]) {
        console.groupEnd();
        groupCount = 0;
      }


    }

  }

  //flatten, format, and output the data layer
  console.group('Data Layer View: digitalData')

  output(format(flatten(dl)));

  console.groupEnd();
  ////////////////////////////////////

}

// look for datalayer within DOM
if (dataObject === undefined) {
  console.info('A Data Layer could not be found.');
} else {
  dispDL(dataObject);
}
