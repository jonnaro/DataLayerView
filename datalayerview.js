var datalayer_string = "";

// listen for message from content.js with name of object
window.addEventListener('message', function(e) {
    if (e.data.type && (e.data.type == 'datalayer_config')) {

      datalayer_string = e.data.text;
      var obj = window[datalayer_string];

      //only run extension if data layer object was found.
      console.log('Looking for the (' + e.data.text + ') data layer...');
      if (obj) {
        readObject(obj);
      } else {
        console.log(e.data.text + ' was not found on this page.')
      }

    }
});

// process and output data layer object (only executed if found on page)
function readObject(datalayer) {

  var dl = datalayer;

  //flatten nested object
  function flatten(ob) {
    var toReturn = {};

  	for (var i in ob) {
  		if (!ob.hasOwnProperty(i)) continue;
      if (typeof ob[i] === 'function') continue; //ignore embedded function reference

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
    var width  = 40; //default width of left column in console display

    for (var key in obj) {

      var level = (key.split(".").length - 1); //level in hierarchy

      // output formatting
      var whitespace = Math.abs(width - key.length); // to get alignment
      var keyf = key + ' '.repeat(whitespace) + ': ';

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
        level = 'root';
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
        level = 'root';
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
  console.group('Data Layer View: ' + datalayer_string);
  output(format(flatten(dl)));
  console.groupEnd();
  ////////////////////////////////////

};
