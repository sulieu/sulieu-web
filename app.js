'use strict';

var app = require('devebot').launchApplication({
  appRootPath: __dirname
}, [
  //'app-armor', 
  'app-databoard', 
  'app-datastore', 
  'app-filestore', 
  'app-localization', 
  'app-timeline', 
  'app-webproxy'
]);

if (require.main === module) app.server.start();

module.exports = app;
