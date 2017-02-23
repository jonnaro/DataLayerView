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

      flatDL.push([sortablekey,level]);
      //console.log(level + ' : ' + keyf + val);
    }

    var output = flatDL.sort(); //sort flattened data Layer
    return output;
  }

  // input a sorted and flattened data layer array
  // output a nested format in console
  function output(array) {

    //array key => level|element|value
    //array val => level
    var arrayLength = array.length;

    for (var i = 0; i < arrayLength; i++) {
      //extract hierarchy level from first part of key
      var level = array[i][0].split('|')[0];
      var next = array[(i+1) % array.length][1]; // level for next element
      //extract element from second part of key
      var element = array[i][0].split('|')[1];
      //extract value from third part of key and truncate lengthy values
      var value = array[i][0].split('|')[2];
      if (value.length > 100) { value = value.substring(0,95) + '...'; }

      //start top-level group
      if ((i == 0) & (level == 0)) { console.group('Base Object'); }

      console.log(element + value);

      //end top level group
      if ((level == 0) & (next > level)) { console.groupEnd(); }

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
