const fs = require("fs");
const fastify = require("fastify")();
const { coinCount } = require("./p3-module.js");

fastify.get("/", (request, reply) => {
  fs.readFile(`${__dirname}/index.html`, (err, data) => {
    if (err) {
      reply.code(500).send("Error");
      return;
    } else {
      reply.type("text/html").code(200).send(data);
    }
  });
});

fastify.get("/coin", (request, reply) => {
  let { denom = 0, count = 0 } = request.query;

  denom = parseInt(denom);
  count = parseInt(count);

  const coins = coinCount({ denom, count });

  reply
    .code(200)
    .header("Content-Type", "text/html; charset=utf-8")
    .send(`<h2>Value of ${count} of ${denom} is ${coins}</h2><br /><a href="/">Home</a>`);

  /*const { denom, count } = request.query;

  if (err) {
    res.code(200).send("Error reading file");
    return;
  } else {
    //res.type("text/html").code(200).send(data);
    denom = parseInt(denom);
    count = parseInt(count);
    const coinValue = coinCount({ denom, count });
    const responseHTML = `<h2>Value of ${count} of ${denom} is ${coinValue}</h2><br /><a href="/">Home</a>`;

    res
    .code(200)
    .header("Content-Type", "text/html")
    .send(responseHTML);
  }*/
});
//25, 2, 1, 7
fastify.get("/coins", (request, reply) => {
  let { option } = request.query;
  let coinValue = 0;
  const coins = [{denom: 25, count: 2},{denom: 1, count: 7}];
  switch (option) {
    case "1":
      coinValue = coinCount({ denom: 5, count: 3 }, { denom: 10, count: 2 });
      break;
    case "2":
        coinValue = coinCount(...coins);
        //coinValue = coinCount(...coins);
      break;
    case "3":
        coinValue = coinCount(coins);
      break;
    default:
      break;
  }

  reply
  .code(200)
  .header("Content-Type", "text/html; charset=utf-8")
  .send(`<h2>Option ${option} value is ${coinValue}</h2><br /><a href="/">Home</a>`);
});

const listenIP = "localhost";
const listenPort = 8082;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});

/*fastify.listen(8080, "localhost", (err, address) => {
  if (err) throw err;
  console.log(`Server listening on ${address}`);
});*/

/*const fs = require("fs");
const { coinCount } = require('./p3-module.js');
const fastify = require("fastify")();
// Get route and JSON/object reply
fastify.get("/", (req, res) => {
  fs.readFile(`${__dirname}/index.html`, (err, data) => {
    if (err) {
      console.log(err);
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/html");
      res.end("Error processing request");
    } else {
      res.statusCode = 200;
      console.log("URL: ", req.url);
      res.setHeader("Content-Type", "text/html");
      res.write(data);
      res.end();
    }
  });
  /*reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send({ test: "This is a test" });*/
//});
// Start server and listen to requests using Fastify
/*const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});*/
