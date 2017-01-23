const https = require("https");

function printMessage(username, badgeCount, points) {
  const message = username + " has " + badgeCount + " total badges and " + points + " points in JavaScript";
  console.log(message);
}

const printError = function (error) {
  console.error(error.message)
}

function get(username) {
  //Connect to the API URL
  const request = https.get(`https:\/\/teamtreehouse.com/${username}.json`, (response) => {
    console.log(response.statusCode);

    //Read the Data
    let body = "";

    response.setEncoding('utf8');

    response.on('data', (chunk) => {
      body += chunk;
    });

    response.on('end', () => {
      if (response.statusCode === 200) {
        try {
          //Parse the Data
          const profile = JSON.parse(body)
          //Print the Data
          printMessage(username, profile.badges.length, profile.points.JavaScript)
        } catch (error) {
          printError(error)
        }
      } else {
        printError({message: `There was an error getting the profile for ${username}.(Error code: ${response.statusCode})`})
      }
    });
  });
  request.on("error", printError);
}

module.exports = {
  get
}
