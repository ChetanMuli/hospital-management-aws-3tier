var express=require("express");
var exe=require("./connection");
var route=express.Router();

route.get("/",async(req,res)=>{
    var data=await exe("SELECT * FROM basic_info");
    var sliders=await exe("SELECT * FROM sliders");
    var opening_hours=await exe("SELECT * FROM opening_hours");
    var about_us=await exe ("SELECT * FROM about_us");
    var services_heading=await exe ("SELECT * FROM services_heading");
    var services=await exe ("SELECT * FROM services");
    var offers=await exe ("SELECT * FROM offers");
    var pricings=await exe ("SELECT * FROM pricings");
    var doctors=await exe ("SELECT * FROM doctors");
    var obj={
                "basic_info":data,
                "slides":sliders,
                "opening_hours":opening_hours,
                "about_us":about_us,
                "services_heading":services_heading,
                "services":services,
                "offers":offers,
                "pricings":pricings,
                "doctors":doctors
                
            };
    res.render("user/home.ejs",obj)
});
route.get("/about",async (req,res)=>{
     var data=await exe("SELECT * FROM basic_info");
     var about_us=await exe ("SELECT * FROM about_us");

    var obj={"basic_info":data,"about_us":about_us}
    res.render("user/about.ejs",obj)
});
route.get("/service",async (req,res)=>{
     var data=await exe("SELECT * FROM basic_info");
    var services_heading=await exe ("SELECT * FROM services_heading");
    var services=await exe ("SELECT * FROM services");


    var obj={"basic_info":data,"services_heading":services_heading,"services":services}
    res.render("user/service.ejs",obj)
});
route.get("/team",async (req,res)=>{
     var data=await exe("SELECT * FROM basic_info");
    var doctors=await exe ("SELECT * FROM doctors");

    var obj={"basic_info":data,"doctors":doctors}
    res.render("user/team.ejs",obj)
});
route.get("/contact",async (req,res)=>{
     var data=await exe("SELECT * FROM basic_info");
    var obj={"basic_info":data}
    res.render("user/contact.ejs",obj)
});
route.get("/appointment",async (req,res)=>{
     var data=await exe("SELECT * FROM basic_info");
     var service_list=await exe(`SELECT * FROM services`)
    var obj={"basic_info":data,"service_list":service_list}
    res.render("user/appointment.ejs",obj)
});

route.post("/save_contact",async(req,res)=>{
    // res.send(req.body)
    var d=req.body;
    var sql=`INSERT INTO contact( user_name, user_email, user_mobile, user_message)VALUES('${d.user_name}', '${d.user_email}', '${d.user_mobile}', '${d.user_message}' )`;
    var data=await exe(sql);
    res.redirect("/contact")
});
route.get("/get_doctor_list_by_service_id/:service_id",async(req,res)=>{
    var service_id=req.params.service_id;
    var sql=`SELECT * FROM doctors WHERE doctor_service_id=${service_id}`;
    var data=await exe(sql);
    res.send(data);
});
route.post("/save_appointment",async(req,res)=>{
    // res.send(req.body)
    var d=req.body;
    var sql=`INSERT INTO appointment(service_id, doctor_id, user_name, user_mobile,
         appointment_date, appointment_time,appointment_status)VALUES
         ('${d.service_id}', '${d.doctor_id}', '${d.user_name}', '${d.user_mobile}'
         , '${d.appointment_date}', '${d.appointment_time}','pending' ) `;
    var data=await exe(sql);
    res.redirect("/");
})
module.exports=route;

// CREATE TABLE contact(user_id INT PRIMARY KEY AUTO_INCREMENT,user_name VARCHAR(200),user_email VARCHAR(200),user_mobile VARCHAR(15),user_message TEXT);
// CREATE TABLE appointment(appointment_id INT PRIMARY KEY AUTO_INCREMENT,service_id INT,doctor_id INT,user_name VARCHAR(200),user_mobile VARCHAR(15),appointment_date VARCHAR(200),appointment_time VARCHAR(200));