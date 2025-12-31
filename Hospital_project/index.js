var express=require('express');
var bodyparser=require ('body-parser');
var session=require("express-session");
var upload=require("express-fileupload");
var userRoute=require("./routes/user")
var loginRoute=require("./routes/login")
var adminRoute=require("./routes/admin")

var  fs = require('fs');
var  path = require('path');

var app=express();

app.use(bodyparser.urlencoded({extended:true}));
app.use(upload());
app.use(express.static("public/"));
app.use(session({
    secret:"vaibhav",
    resave:true,
    saveUninitialized:true
}));

app.use("/",userRoute);
app.use("/admin_login",loginRoute);
app.use("/admin",adminRoute);
app.listen(3000);

// const express = require('express');
// const fs = require('fs');
// const path = require('path');

// const app = express();
// const publicFolderPath = path.join(__dirname, 'public');

// app.delete('/deleteImage/:imageName', (req, res) => {
//   const imageName = req.params.imageName;
//   const imagePath = path.join(publicFolderPath, imageName);

//   // Check if the file exists
//   if (fs.existsSync(imagePath)) {
//     // Delete the file
//     fs.unlinkSync(imagePath);
//     res.status(200).send('Image deleted successfully');
//   } else {
//     res.status(404).send('Image not found');
//   }
// });

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });
