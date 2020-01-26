var WebSocketServer = require("websocket").server;
const fetch = require("node-fetch");
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

getToken = async () => {
  var requestOptions = {
    method: "GET",
    headers: {
      Authorization: "Basic aWMuc3RhZ2Uuc2ltLmRldmVsb3A6ZGV2",
      Authorization:
        "Basic SGFja2F0aG9uLkNJVE0uSGFtaWx0b246V20seWImR2BLQlwyfWQ8cw=="
    },
    redirect: "follow"
  };

  const response = await fetch(
    "https://auth.aa.cityiq.io/oauth/token?grant_type=client_credentials",
    requestOptions
  );
  const text = await response.text();
  const data = JSON.parse(text);

  return data.access_token;
};

getAllAssets = async () => {
  var requestOptions = {
    method: "GET",
    headers: {
      "Predix-Zone-Id": "HAMILTON-IE-PEDESTRIAN",
      Authorization:
        "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImxlZ2FjeS10b2tlbi1rZXkiLCJ0eXAiOiJKV1QifQ.eyJqdGkiOiJlYzhmNDVlZmYzY2I0OGZjYmY5ZGI4YjdmNTA0YjFiYiIsInN1YiI6IkhhY2thdGhvbi5DSVRNLkhhbWlsdG9uIiwiYXV0aG9yaXRpZXMiOlsiaWUtY3VycmVudC5IQU1JTFRPTi1JRS1QRURFU1RSSUFOLklFLVBFREVTVFJJQU4uTElNSVRFRC5ERVZFTE9QIiwidWFhLnJlc291cmNlIiwiaWUtY3VycmVudC5IQU1JTFRPTi1JRS1QQVJLSU5HLklFLVBBUktJTkcuTElNSVRFRC5ERVZFTE9QIiwiaWUtY3VycmVudC5IQU1JTFRPTi1JRS1CSUNZQ0xFLklFLUJJQ1lDTEUuTElNSVRFRC5ERVZFTE9QIiwiaWUtY3VycmVudC5IQU1JTFRPTi1JRS1UUkFGRklDLklFLVRSQUZGSUMuTElNSVRFRC5ERVZFTE9QIiwiaWUtY3VycmVudC5IQU1JTFRPTi1JRS1FTlZJUk9OTUVOVEFMLklFLUVOVklST05NRU5UQUwuTElNSVRFRC5ERVZFTE9QIiwiaWUtY3VycmVudC5IQU1JTFRPTi1JRS1JTUFHRS5JRS1JTUFHRS5MSU1JVEVELkRFVkVMT1AiLCJpZS1jdXJyZW50LkhBTUlMVE9OLUlFLVZJREVPLklFLVZJREVPLkxJTUlURUQuREVWRUxPUCIsImllLWN1cnJlbnQuSEFNSUxUT04tSUUtQVVESU8uSUUtQVVESU8uTElNSVRFRC5ERVZFTE9QIl0sInNjb3BlIjpbImllLWN1cnJlbnQuSEFNSUxUT04tSUUtUEVERVNUUklBTi5JRS1QRURFU1RSSUFOLkxJTUlURUQuREVWRUxPUCIsInVhYS5yZXNvdXJjZSIsImllLWN1cnJlbnQuSEFNSUxUT04tSUUtUEFSS0lORy5JRS1QQVJLSU5HLkxJTUlURUQuREVWRUxPUCIsImllLWN1cnJlbnQuSEFNSUxUT04tSUUtQklDWUNMRS5JRS1CSUNZQ0xFLkxJTUlURUQuREVWRUxPUCIsImllLWN1cnJlbnQuSEFNSUxUT04tSUUtVFJBRkZJQy5JRS1UUkFGRklDLkxJTUlURUQuREVWRUxPUCIsImllLWN1cnJlbnQuSEFNSUxUT04tSUUtRU5WSVJPTk1FTlRBTC5JRS1FTlZJUk9OTUVOVEFMLkxJTUlURUQuREVWRUxPUCIsImllLWN1cnJlbnQuSEFNSUxUT04tSUUtSU1BR0UuSUUtSU1BR0UuTElNSVRFRC5ERVZFTE9QIiwiaWUtY3VycmVudC5IQU1JTFRPTi1JRS1WSURFTy5JRS1WSURFTy5MSU1JVEVELkRFVkVMT1AiLCJpZS1jdXJyZW50LkhBTUlMVE9OLUlFLUFVRElPLklFLUFVRElPLkxJTUlURUQuREVWRUxPUCJdLCJjbGllbnRfaWQiOiJIYWNrYXRob24uQ0lUTS5IYW1pbHRvbiIsImNpZCI6IkhhY2thdGhvbi5DSVRNLkhhbWlsdG9uIiwiYXpwIjoiSGFja2F0aG9uLkNJVE0uSGFtaWx0b24iLCJncmFudF90eXBlIjoiY2xpZW50X2NyZWRlbnRpYWxzIiwicmV2X3NpZyI6IjliM2ZmYjhhIiwiaWF0IjoxNTgwMDIyODE5LCJleHAiOjE1ODA2Mjc2MTksImlzcyI6Imh0dHBzOi8vYXV0aC5hYS5jaXR5aXEuaW8vb2F1dGgvdG9rZW4iLCJ6aWQiOiJ1YWEiLCJhdWQiOlsiaWUtY3VycmVudC5IQU1JTFRPTi1JRS1JTUFHRS5JRS1JTUFHRS5MSU1JVEVEIiwiSGFja2F0aG9uLkNJVE0uSGFtaWx0b24iLCJpZS1jdXJyZW50LkhBTUlMVE9OLUlFLVBFREVTVFJJQU4uSUUtUEVERVNUUklBTi5MSU1JVEVEIiwiaWUtY3VycmVudC5IQU1JTFRPTi1JRS1CSUNZQ0xFLklFLUJJQ1lDTEUuTElNSVRFRCIsInVhYSIsImllLWN1cnJlbnQuSEFNSUxUT04tSUUtQVVESU8uSUUtQVVESU8uTElNSVRFRCIsImllLWN1cnJlbnQuSEFNSUxUT04tSUUtUEFSS0lORy5JRS1QQVJLSU5HLkxJTUlURUQiLCJpZS1jdXJyZW50LkhBTUlMVE9OLUlFLVRSQUZGSUMuSUUtVFJBRkZJQy5MSU1JVEVEIiwiaWUtY3VycmVudC5IQU1JTFRPTi1JRS1FTlZJUk9OTUVOVEFMLklFLUVOVklST05NRU5UQUwuTElNSVRFRCIsImllLWN1cnJlbnQuSEFNSUxUT04tSUUtVklERU8uSUUtVklERU8uTElNSVRFRCJdfQ.ZnZA8NUY_orT2HQBapa40n2Hj7uOlimIIAqqyJpEJq5Lin-KQo_AZfAe6-1NRHrvbKLDx6UIQP0yeLLePI6HmsKYG_4r0d0GnXxgIPRYDduPYMkS0EBIDhw3U9L1vyCQARPLsyovwAfXMphcYK-DfMiy-zRkgmzhWC03U0TkomzV5zXCFjSYYllNMcgjXLyINAbxaoRgnWB_OEfm08BmoHFFAcnHlCarnAmGPQpR4-BX8dfzg9qvhX9erfG_Ol-0nqUTzMqsGTGI4dpcU-4cdem1XpnNNU7Ef33ibRzY2z_3-GKMXpbhD8hJK93X0cT0c1z2eW3G2a7mBuwKfH0YSI7ZO50wFIa8WzhEFw7JREFWafkij_WZXZGlgwX7gEnaHZkMIJxg26mUxYcvgqNrhoEzdNHVtaXhp4xowN3QjlEnlOpbpxK9ItTyTiF8oGlgLyCyp9a4VNS_zqA7Ho5ZSCD8F95UQFf3AjPrx3wh212aBN0UV065M1gcqzNxYN-GBXA4D8LFamZnrhz2Pfv3K_ZboZLwe5MVgtTdXbxKfRBfQ_k0n6wthSg1vplMHZRBo3SUrHHWCxlSioYvDu8yaKZAmjinCellK2zsbH59CspW4yjjjoJtaDbuGtOJuooddKbEQ8XLF3gCwZDuQKEKp2JDKFDTc36VEx9rZ_gQTxY"
    },
    redirect: "follow"
  };

  const response = await fetch(
    "https://hamilton.cityiq.io/api/v2/metadata/assets/search?page=0&size=200&q=eventTypes:TFEVT",
    requestOptions
  );
  const text = await response.text();
  const data = JSON.parse(text);

  console.log(data);
};

setup = async () => {
  const allAssets = await getAllAssets();
  console.log(allAssets);
};

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
