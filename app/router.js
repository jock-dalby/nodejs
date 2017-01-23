const profile = require('./profile')
const renderer = require('./renderer')
const querystring = require('querystring')

const commonHeaders = {'Content-Type': 'text/html'}; // Tells browser how to format the string of data it is given.

// Create home route and handle HTTP route GET and POST / i.e. Home
function home(request, response) {
  // home route
  if (request.url === '/') {
    // if url === '/' && GET ==> show search field.
    if (request.method.toLowerCase() === 'get') {
      response.writeHead(200, commonHeaders)
      renderer.view('header', {}, response)
      renderer.view('search', {}, response)
      renderer.view('footer', {}, response)
      response.end()
    } else {
      // if url === '/' && POST ==>
      // get post data from body
      request.on('data', postBody => {
        // extract username
        var query = querystring.parse(postBody.toString())
        response.writeHead(303, {"Location": `/${query.username}`})
        response.end()
      })
    }
  }
}

// Handle HTTP route GET /:username i.e. jonathandalby
function user(request, response) {

  const username = request.url.replace('/', '');
  if (username.length > 0) {
    response.writeHead(200, commonHeaders)
    renderer.view('header', {}, response)

    // get json from Treehouse
    const studentProfile = new profile(username)

    // .on('end') show profile
    studentProfile.on('end', (profileJSON) => {

      // Store values
      const values = {
        avatarURL: profileJSON.gravatar_url,
        username: profileJSON.profile_name,
        badges: profileJSON.badges.length,
        javascriptPoints: profileJSON.points.JavaScript
      }

      // Create a response
      renderer.view('profile', values, response)
      renderer.view('footer', values, response)
      response.end()
    })
    // if error, show error
    studentProfile.on('error', (error) => {
      renderer.view('error', {errorMessage: error.message}, response)
      renderer.view('search', {}, response)
      renderer.view('footer', {}, response)
      response.end()
    })
  }
}

module.exports = {
  home,
  user
}
