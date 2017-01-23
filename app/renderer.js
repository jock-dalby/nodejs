const fs = require('fs') // short for file system

function mergeValues (values, content) {
  // Cylce over keys
  for (let key in values) {
    // Replace all {{key}} with the values from the values object
    content = content.replace(`{{${key}}}`, values[key])
  }
  // return mergedContent
  return content
}

function view (templateName, values, response) {

  // Read from the template file
  let fileContents = fs.readFileSync(`./views/${templateName}.html`, {encoding: "utf8"}) // Creates a synchronous block and forces the code to wait for response before continuing. If want to read file async just use .readfile

  // Insert values into content
  fileContents = mergeValues(values, fileContents);

  // Write out contents to the response
  response.write(fileContents)
}

module.exports = {
  view
}
