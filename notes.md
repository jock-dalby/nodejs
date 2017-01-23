#Node.js

We're going to take a look at JavaScript on the server side, specifically JavaScript in the Node.js environment. JavaScript has become one of the go-to languages for making modern, scalable web applications and it's all thanks to Node.js. Node.js is great for building chat applications like Meatspaces. In this chat application, modern browsers can access the camera. Meatspaces takes a video of you when you send your chat message. The video is sent along with your message, adding a level of personality with every message.  And then there's build tools like gulp.js and Grunt.js. Whilst they aren't very exciting, they are extremely useful. These types of tools are used to concate your JavaScript files together, compile any SASS, minify any source code, and many more things.


###The console
Node is a console application, so, to make sure Node is up and running, just type 'node -v', which will tell the version of Node that is running. With Node we can just type node into the console, and it brings back a read evaluate print loop, or REPL, and that allows you to type in some JavaScript code and experiment.

Writing an application in Node.js is writing a JavaScript application but outside of the browser. The console object has some other methods that you can use for different types of output.

###JavaScript without the Browser

As developers, we use JavaScript, the programming language that's interpreted against the browser's JavaScript engine and is run against browser-specific APIs like the DOM, or Document Object Model. So, when thinking about a JavaScript program in the browser, you can split it up into two distinct parts. Firstly, native objects are the objects provided by JavaScript as a language, like string, array, dates, math, and many more. You can use these in any environment, not just in the browser. Secondly, host objects are objects provided by the environment or the host. In the case of the browser, it's things like window, document history, XML HTTPRequest, and many more. As JavaScript became more in demand, the performance of the JavaScript engine became more important, JavaScript started becoming a more viable option to build not just browser applications, but all types of applications. Chrome, Google's internet browser, became dominating the performance benchmarks and with its JavaScript engine, V8, going open source, it became the perfect environment for something new to appear, something to write any type of general purpose application in JavaScript, and that was Node.js. Ryan Dahl ripped V8's JavaScript engine out of the browser, leaving only the host objects behind and provided new ones to allow new types of applications to be written, objects like http, https, fs for file system, url, os, and much more. This coupling of the V8 engine with the APIs are what is known as the Node.js platform, or the Node.js environment. Now JavaScript's application are free to run, stand alone on a personal computer or even on the Internet on a server. The key to take away is when writing any application in JavaScript is knowing what's available to you. The native object should be available no matter what the environment is but in each environment, you'll have access to their particular host objects, which are often completely different.

###Why use Node.js?

You may be asking, okay, so I can write JavaScript on the server side, so what's the big deal? Here's an analogy that will help to illustrate why you'd want to use Node.js. Imagine I have an assistant who I give a stack of invoices to. I asked them to send them out on my behalf. The assistant sends the first invoice out and waits for the cheque for payment. Once they receive the payment, they deposit it in the bank and then send out the next invoice. Now, this isn't good for me. I'm not getting paid as quickly as I could. This is blocking me from my payments, my business from growing, for me getting stuff done. I've got two options, getting more assistants and they all do the same thing for me, or get a new, more efficient one. This new, more efficient assistant would send out all the invoices and process each payment as soon as it comes in. I know some of my customers pay quicker than others, so I wouldn't want to wait to deposit the payments in the same order as I send the invoices out. I want to deposit them as soon as I receive them. This assistant knows that. Not only is this assistant saving me lots of resources by not having to employ extra inefficient assistants, but while they're waiting for payments from the clients, they are freer to do other things to assist me, like sending out thank you notes for when I receive a payment. You could say that this assistant is non-blocking since they don't hinder me and improves my relationship with my customers.

Most web servers, languages and frameworks work like that first assistant, handling one set of tasks from beginning to end before repeating the process again, doing the same set of steps for another task. This sort of behavior manifests itself most noticeably when you're doing a couple of things in a single web request, like querying a database or uploading files to be saved to a disk. Imagine that you're running a popular social network that required a profile image on sign up. Imagine how frustrated your users would be if they had to wait for all the other users' images to be uploaded when they decided to sign up at the same time as them. It would be super frustrating, and I don't think you'd be popular for that long. This is known as blocking since it blocks the handling of other requests. One way that developers scale these types of applications is by running more than one instance of their application server. These instances are known as workers. However, Node.js works like the second more efficient assistant, doing what it can do now, responding to requests while it waits for other tasks to finish. This often means when certain types of applications are ported to Node.js, you don't necessarily require as much system resources to perform the same task. Sometimes, it can be even more responsive than other languages with just one worker. And this is why it wants to build JavaScript applications on the Node.js platform over other languages and platforms. Because it's non-blocking. It's fast and efficient. It doesn't take up as many computer resources like the computer's processing power or memory.

###Node.js tools

Being a developer in any environment requires you to understand the tools we have for building any given application. The most important place you can go to see what's possible with any given thing, is going to its official documentation site; In our case it will be the node.js documentation site, nodejs.org. The documentation is to document the API or the interface with the objects in the language environment or framework you're going to be working in. Being on the cutting edge of web development means that things can change and each section of this documentation site has been given a stability index. So zero means you shouldn't be using this anymore because it's deprecated. One is experimental so it may become something in the future or it may be removed. Two is unstable, meaning it's moving toward stability and things could still change here but needs more real world testing. Whilst indexes three to five, stable, API frozen, and locked shouldn't change unless something serious happens and you're safe to use these in your applications. As a developer, you'll be making difficult decisions all the time, and choosing what APIs you should use over another is one of those times. But a general rule of thumb is to stick to the stable, frozen, and locked APIs.

Now let's go back to the API docs and take a look at some things that you can do with Node.js. Listed here are all the APIs that come out of the box with Node.js, and all should have their own stability index. Some of the most common APIs we are going to use are Console, which is a way that we can output strings to the console. File System, where we can see the APIs to read and write files. And HTTP and HTTPS for creating web service or going out to the internet to retrieve information. Let's take a look at one example, HTTP. When we click through, we see a table of contents where we can skim through all the possible objects, methods, and properties relating to the HTTP web requests and responses. Let's take a look at HTTP request.

```js
var postData = querystring.stringify({
  'msg' : 'Hello World!'
});

var options = {
  hostname: 'www.google.com',
  port: 80,
  path: '/upload',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': postData.length
  }
};

var req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    console.log('No more data in response.')
  })
});

req.on('error', (e) => {
  console.log(`problem with request: ${e.message}`);
});

// write data to request body
req.write(postData);
req.end();
```

Let's step through the example above at a higher level. This first part is a set of options. We pass in the options to the http.request and a call back (or anonymous function) to run once when the data has been downloaded. The response has an event called data associated with it, and the callback prints out a piece of data and there is a bit of code here responds to an error event on the request. When you see an .on being called on an object, that means that this method is responding to an event. You'll see this a lot in node.js. And then finally, at the end  we close the request. This tells the server that all the information, all the data you want to send has been sent. This is when we wait for the response from the server.

Note that the code for dealing with the response happens before you call the requests end method. This is a common pattern when the code that you provide only gets executed when it needs to and the code is executed is executed in a non-blocking way.
