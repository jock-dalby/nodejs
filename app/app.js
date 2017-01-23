// Problem: Need to look at users badge count/ javascript points from a web browser.
// Solution: Use Node.js to perform the profile look ups and serve our templates via HTTP.

const router = require('./router');

// Create a web server
const http = require('http');
http.createServer(function (request, response) {
  router.home(request, response);
  router.user(request, response);
  /*
  * If uncomment below setInterval function and start up the server, * this will print Datetime to the browser every second. It will take 20 seconds before * starting to print to browser because it is waiting fot the .end function (which does * not exist) and so eventually it starts without it.

  setInterval(function() {
    response.write(new Date() + '\n')
  }, 1000)

  */
}).listen(3000)
console.log('Server running at http://<workspace-url>/');
