// const { Pool } = require("pg");
var fs = require("fs");
var path = require("path");
const EventEmitter = require("events");
// const NodeMediaServer = require("node-media-server");
const configObj = require("./config/websocket");
const { ConnectionTCP } = require("node-vmix");
const https = require("http");
const connection = new ConnectionTCP("127.0.0.1", {
  debug: true,
  connectOnInitialization: true,
  autoReconnect: true,
});
EventEmitter.defaultMaxListeners = 5;

configObj.appValue.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Stripe-Signature"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Origin", "http://localhost:8080/*")
  res.header("Access-Control-Allow-Origin", "http://localhost:3030/*")
  next();
});

let user = require("./routes/user");
let receive = require("./routes/receive");


// var nms = new NodeMediaServer(config);
// nms.run();
// https
//   .get("http://193.25.212.239:8088", (resp) => {
//     let data = "";

//     // A chunk of data has been received.
//     resp.on("data", (chunk) => {
//       data += chunk;
//     });

//     resp.on("end", () => {
//       console.log(data);
//     });
//   })
//   .on("error", (err) => {
//     console.log("Error: " + err.message);
//   });

configObj.ioConnection.on("connection", async (socket) => {
  var connectionInterval;
  var myTimeout;
  console.log("client is connected");
  socket.on("changeIP", function (val) {
    connection._setHost(val);
    console.log(val);
  });
  // connection._setPort("3044")

  // var jsonPath = path.join(__dirname, "..", "config", "dev", "foobar.json");
  // var jsonString = fs.readFileSync(jsonPath, "utf8");
  // const absolutePath = resolve('projects');
  // let absolutePath = path.resolve("projects");
  // console.log(absolutePath)
  // var files = fs.readdirSync("./files");
  // socket.emit("GetPresetFiles", {
  //   files,
  // });
  myTimeout = setTimeout(() => {
    connectionInterval = setInterval(() => {
      if (connection.connected()) {
        socket.emit("vmixConnected", true);
        // As soon as connected, then send request to receive XML state data
        connection.send("XML");
        // connection.send('TALLY')
      }
    }, 1000);
  }, 3000);

  // connection.on("tally", (tally) => {
  //   socket.emit("tally_lights", {
  //     tallylights: tally
  //   });
  // });

  connection.on("data", (xmlData) => {
    socket.emit("activePreset", {
      content: xmlData,
      vmixIP: connection._host,
      port: connection._port,
    });
  });
  connection.on("close", () => {
    // clearInterval(connectionInterval);
    // clearTimeout(myTimeout);
    socket.emit("vmixConnected", false);
  });
  socket.on("disconnect", async () => {
    clearInterval(connectionInterval);
    console.log(`Client disconnected [id=${socket.id}]`);
    clearTimeout(myTimeout);
  });
});

configObj.appValue.get("/", async (req, res) => {
  res.send("Hello World");
});

configObj.appValue.use("/user", user);
configObj.appValue.use("/receive", receive);

module.exports = configObj.appValue;
