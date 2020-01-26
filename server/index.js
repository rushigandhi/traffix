require("dotenv").config();
const moment = require("moment");
const express = require("express");
const client = require("twilio")(process.env.accountSid, process.env.authToken);

const app = express();

const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

const devicesList = [
  {
    location: {
      long: "27.2038",
      lat: "77.5011"
    },
    phoneNumber: "+16479634142",
    isInRange: () => true // just for now, can be more dynamic!
  }
];

app.get("/notify", (req, res) => {
  const today = moment()
    .format("MM DD, YYYY")
    .toString();
  const REQUEST_TPE = {
    UNSAFE_VEHICLE: `Many instances of tire screeching were reported on ${today} near 1280 Main St W.`,
    STRONG_WIND: `Strong winds were recorded on ${today} near 1280 Main St W, be sure to wear appropriate clothing!`,
    GUNSHOT: `Gunshot was detected at approximately 10:00 PM at 901 King St W on the day of ${today}.`
  };

  // fire off
  devicesList.forEach(device => {
    if (device.isInRange()) {
      console.log(`Sending to ${device.phoneNumber}.`);
      client.messages
        .create({
          body: REQUEST_TPE.UNSAFE_VEHICLE,
          from: "+14806464294",
          to: "+16479634142"
        })
        .then(message => {
          console.log("Message sent!");
          return res.status(200);
        })
        .catch(err => console.log(err));
    }
  });
});
