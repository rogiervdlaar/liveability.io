//Load packages
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json()); 
app.use(express.static('public'));
app.set("view engine", "ejs");

//SERVER
// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
})

//render home page
app.get('/', function(req,res){
    res.render("home");
});


//post request
app.post('/', function(req, res)
{var body = res.json(req.body)
 var name = body.name; 
    console.log(name);
});

app.get("/posts", function(req,res){
    var posts = [
        {title: "Wat is it called?", author: "me", source: "https://source.unsplash.com/Lml_PhRFbsk"},
        {title: "You didn't know this!", author: "you", source: "https://source.unsplash.com/0oPpbZVd-zY"},
        {title: "How to get stuff done", author: "someone else", source: "https://source.unsplash.com/ouZj1RPPiTU"}
    ];
    res.render("posts", {posts:posts});
});

// app.get("/", function(req,res){
//     console.log(req.body);


// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'rogiervdlaar@gmail.com',
//       pass: 'Tatum2011' // naturally, replace both with your real credentials or an application-specific password
//     }
//   });

// // app.post("/sendmail", function(req,res){
// //     console.log(req.body);

// // const messageOptions = {
// // //   from: 'rogiervdlaar@gmail.com',
// // //   to: 'contact@marulatrading.com',
// // //   subject: "Liveability feature request",
// // //   text: 'test'
// // // };


//     let to_email = "rogiervdlaar@gmail.com";
//     let mail_subject =  req.body.name;
//     let message = "test";
//     // let attach = req.body.attach;
 
 
//     let messageOptions = {
//         from: 'rogiervdlaar@gmail.com',
//         to: to_email,
//         subject: mail_subject,
//         text: message
//         // html: message
//     };
 
//     // if(attach){
//     //     messageOptions = {...messageOptions, attachments: [{
//     //             filename: 'Promotion.jpg',
//     //             path: './Promotion.jpg'
//     //         }]
//     //     };
//     // }
 
 
//     transporter.sendMail(messageOptions, (error, info) => {
//         if (error) {
//             return console.log(error);
//         }
//         console.log('Message %s sent: %s', info.messageId, info.response);
//         res.redirect('/');
//     });
// });
// });


// app.get("*", function(req,res){
// 	res.send("catchall!") 
// });


