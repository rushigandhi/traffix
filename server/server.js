var WebSocketServer = require("websocket").server;
var http = require("http");
const moment = require("moment");

var server = http.createServer(function(request, response) {});
server.listen(8888, function() {});

wsServer = new WebSocketServer({
  httpServer: server
});

const today = moment()
  .format("MMM DD, YYYY")
  .toString();

const alertTemplates = [
  {
    type: "UNSAFE_VEHICLE",
    location: {
      lat: 43.257955,
      lng: -79.922199
    },
    warning: "MODERATE"
  },
  {
    type: "STRONG_WIND",
    location: {
      lat: 43.257955,
      lng: -79.922199
    },
    warning: "NOT_PRIORITY"
  },
  {
    type: "GUNSHOT",
    location: {
      lat: 43.257955,
      lng: -79.922199
    },
    warning: "SEVERE"
  }
];

generateAlerts = count => {
  let arr = [];
  for (let i = 0; i < count; i++) {
    let obj = alertTemplates[Math.floor(Math.random() * 3)];
    obj.time = moment()
      .subtract(count - i, "days")
      .format("MMM DD, YYYY")
      .toString();
    arr.push(obj);
  }
  return arr;
};

let alerts = generateAlerts(30);

wsServer.on("request", function(request) {
  var connection = request.accept(null, request.origin);

  setInterval(() => {
    let data = {};
    data.type = "INFO_SESS";
    data.data = alerts;
    connection.send(JSON.stringify(data));
  }, 5000);

  setTimeout(() => {
    let data = {};
    data.type = "UPDATE";
    data.data = alertTemplates[0];
    connection.send(JSON.stringify(data));
  }, 1000);

  connection.on("close", function(connection) {
    // close user connection
  });
});
