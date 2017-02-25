# DataLayerView
A Chrome extension to easily view the contents of a nested data layer object within the console.

## Background
W3C-compliant Data Layer objects can be very powerful but can sometimes be unnecessarily time-consuming to validate. As nested objects, I wanted a way to easily flatten and view the object (which could be nested in any one of a variety of ways) in order to alleviate QA effort.

## Functionality
* Leverages the console within Chrome's developer tools to output a flattened version of the specifed data layer object.
* The extension can be configured to look for any Javascript object available within ```window```. It does default to ```window.digitalData``` as that is the object name in the w3c spec.

## Acknowledgements
Thank you to the team at 33 Sticks, who greatly supported the creation of this project. If you need help with data layer strategy, design, or development there is no better group to work with.

## Disclaimer
Although this is a currently working state, be warned that this extension is still in a beta-phase and is actively being tested under a variety of circumstances.
