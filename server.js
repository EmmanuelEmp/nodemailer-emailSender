

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

// instantiate an express app
const app = express();
// cors
app.use(cors());

// disable certificate validation when testing not good for production
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

// change the environment variable after done testing
//process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '1';
const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
    
  },

})

// verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

app.post("/send", (req, res) => {
  let form = new multiparty.Form();
  let data = {};
  form.parse(req, function (err, fields) {
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    });
    console.log(data);
    const mail = {
      from: `${data.name} <${data.email}>`,
      to: process.env.USER, // receiver email,
      subject: data.subject,
      text: `${data.name} <${data.email}> \n${data.message}`,
    };
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send("Something went wrong.");
      } else {
        console.log(data)
        res.status(200).json("Email successfully sent to recipient!");
      }
    });
  });
});
0
//Index page (static HTML)
app.use("/public", express.static(process.cwd() + "/public"));
app.route("/").get(function (req, res) {
  res.sendFile(process.cwd() + "/public/index.html");
});


// Express server listening...
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});