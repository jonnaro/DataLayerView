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
      var sortablekey = level + '|' + keyf;
      var value = obj[key];

      flatDL.push([sortablekey,value]);
      //console.log(level + ' : ' + keyf + val);
    }

    var output = flatDL.sort(); //sort flattened data Layer
    return output;
  }

  // input a sorted and flattened data layer array
  // output a nested format in console
  function output(array) {

    var arrayLength = array.length;
    for (var i = 0; i < arrayLength; i++) {
      var element = array[i][0];

      var value   = array[i][1];
      //truncate length values
      if (value.length > 100) { value= value.substring(0,95) + '...'; }

      console.log(element + value);
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
