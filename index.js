const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
  /*
  if (req.url === "/") {
    fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
      // check for any errors
      if (err) throw err;
      // We want this to be a 200 response, meaning everything is OK
      res.writeHead(200, { 'Content-Type': 'text/html' });
      // respond with the content after index.html has been read
      res.end(content);
    });
  }

  if (req.url === "/about") {
    fs.readFile(path.join(__dirname, 'public', 'about.html'), (err, content) => {
      // check for any errors
      if (err) throw err;
      // We want this to be a 200 response, meaning everything is OK
      res.writeHead(200, { 'Content-Type': 'text/html' });
      // respond with the content after index.html has been read
      res.end(content);
    });
  }

  if (req.url === "/api/users") {
    const users = [
      { name: 'Younis Jani', age: 40 },
      { name: 'John Doe', age: 30 }
    ];
    // A 200 response, but serving JSON
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  }
  */

  // Build filepath
  let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
  console.log("The req.url is: " + req.url);
  console.log("The filePath is: " + filePath);
  // Get the extension of the file being served
  let extname = path.extname(filePath);

  // Initial content type (we mostly expect html)
  let contentType = 'text/html';

  // Check extention and set content type
  switch(extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
  }

  // Read File
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == 'ENOENT') {
        // Page not found
        fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(content, 'utf8');
        });
      } else {
          // Otherwise, it's most likely some server error
          res.writeHead(500);
          res.end(`Server Error: ${err.code}`);
      }
    } else {
      // No errors, a successful response
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf8');
    }
  });

});

// Look for the port number in an environment variable OR assign 5000 if not found
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
