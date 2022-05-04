//jshint esversion: 6
var request = require("superagent");
const express = require("express");
const bodyParser = require("body-parser");
// const request = require("request");
const https = require("https");
const app = express();
const client = require("@mailchimp/mailchimp_marketing");
const response  = require("express");
// const { request } = require("express");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

// app.post("/", function (req, res) {
//   const firstName = "req.body.fName";
//   const lastName = "req.body.lName";
//   const email = "req.body.email";

//  console.log(firstName, lastName, email);
 
//  const subscribingUser={
//      firstName: firstName,
//      lastName: lastName,
//      email: email
//  }
//  const run = async () => {

//     const response = await client.lists.addListMember("4e0b0c84c9", {
        

//       email_address: subscribingUser.email,

//       status: "subscribed",

//       merge_fields: {

//         FNAME: subscribingUser.firstName,

//         LNAME: subscribingUser.lastName

//       }

//     });
//     console.log(response);
// };
// run();
// // });
// client.setConfig({
//     apiKey:"6487d73a098f8f7e7639bb9b90328997-us20",
//     server:"us20",
// });
// // app.listen(3000, function () {
// //     console.log("Server is running on port 3000");
// //   });
  
//   // const data = {
//   //   members: [
//   //     {
//   //       email_address: email,
//   //       status: "subscribed",
//   //       merge_field: {
//   //         FNAME: firstName,
//   //         LNAME: lastName,
//   //       },
//   //     },
//   //   ],
//   // };
//   // const jsonData = JSON.stringify(data);

//   const url = "https://us20.api.mailchimp.com/3.0/lists/4e0b0c84c9/";

//   const options = {
//     method: "POST",
//     auth: "sam1:6487d73a098f8f7e7639bb9b90328997-us20",
//   }
//   const request = https.request(url, options, function (response) {
//     if (response.statusCode===200){
//         res.sendFile(__dirname + "/success.html");
//     } else {
//         res.sendFile(__dirname + "/failure.html");
//     }
//     response.on("data", function (data) {
//       console.log(JSON.parse(data));
//     });
//   });
// //   request.write(jsonData);
//   request.end();
// });
var mailchimpInstance   = 'us20',
    listUniqueId        = '4e0b0c84c9',
    mailchimpApiKey     = '6487d73a098f8f7e7639bb9b90328997-us20';

app.post('/', function (req, res) {
    request
        .post('https://' + mailchimpInstance + '.api.mailchimp.com/3.0/lists/' + listUniqueId + '/members/')
        .set('Content-Type', 'application/json;charset=utf-8')
        .set('Authorization', 'Basic ' + new Buffer('any:' + mailchimpApiKey ).toString('base64'))
        .send({
          'email_address': req.body.email,
          'status': 'subscribed',
          'merge_fields': {
            'FNAME': "req.body.firstName",
            'LNAME': "req.body.lastName"
          }
        })
            .end(function(err, response) {
              if (response.status < 300 || (response.status === 400 && response.body.title === "Member Exists")) {
                res.sendFile(__dirname + "/success.html");
              } else {
                res.sendFile(__dirname + "/failure.html");
              }
          });
          console.log(response)
});
// app.post("/failure.html", function(req, res){
//     res.redirect("/");
// });

app.listen(process.env.PORT || 3000, function () {
  console.log("Server is running on port 3000");
});

// 6487d73a098f8f7e7639bb9b90328997-us20

// list id: 4e0b0c84c9.

// copy code 

// var mailchimpInstance   = 'us6',
//     listUniqueId        = 'b6a82d89f0',
//     mailchimpApiKey     = '637274b5ab272affbf7df7d3723ea2a1-us6';

// app.post('/signup', function (req, res) {
//     request
//         .post('https://' + mailchimpInstance + '.api.mailchimp.com/3.0/lists/' + listUniqueId + '/members/')
//         .set('Content-Type', 'application/json;charset=utf-8')
//         .set('Authorization', 'Basic ' + new Buffer('any:' + mailchimpApiKey ).toString('base64'))
//         .send({
//           'email_address': req.body.email,
//           'status': 'subscribed',
//           'merge_fields': {
//             'FNAME': req.body.firstName,
//             'LNAME': req.body.lastName
//           }
//         })
//             .end(function(err, response) {
//               if (response.status < 300 || (response.status === 400 && response.body.title === "Member Exists")) {
//                 res.send('Signed Up!');
//               } else {
//                 res.send('Sign Up Failed :(');
//               }
//           });
// });
