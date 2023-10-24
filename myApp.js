const express = require('express');
const helmet=require('helmet');
const app = express();
const ninetyDaysInSeconds = 90*24*60*60;
 

 


  app.use(helmet({
    frameguard: {         // configure
      action: 'deny'
    },
    contentSecurityPolicy: {    // enable and configure
      directives: {
        "defaultSrc":["'self'"],
        "script-src": ["'self'", "trusted-cdn.com"],
      }
    },
    dnsPrefetchControl: false  ,   // disable
    htts:{      maxAge:7776000,
                force: true,},
    noCache:true ,
    ieNoOpen: true,
    noSniff:true,
    xssFilter:true,
    hidePoweredBy:true,
    
  }))









































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
