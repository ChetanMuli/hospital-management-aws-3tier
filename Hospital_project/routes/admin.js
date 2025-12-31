var express = require("express");
var exe = require("./connection");
const fs = require('fs');
const cors = require('cors');
const path = require('path');
var route = express.Router();
var time = new Date().getTime();
route.use(cors());
const publicFolderPath = path.join(__dirname, 'public/img');

function checkAdminLogin(req,res,next){
    console.log(req.session.admin_id)
    if(req.session.admin_id == undefined)
    {
        res.redirect("/admin_login");
    }
    if(req.session.admin_id != undefined)
    {
        next();
    }
}
route.get("/",checkAdminLogin, async(req, res) => {
    
    // res.send(appointment_list)

    res.render("admin/home.ejs")
});
//basic info start
route.get("/appointments",checkAdminLogin,async function(req,res)
{
    // var years=new Date().getFullYear();
    // var months=new Date().getMonth()+1;
    // var days=new Date().getDate();
    // months=(months<10)?"0"+months:months;
    // days=(days<10)?"0"+days:days;
    // var today=`${years}-${months}-${days}`;

    // console.log(publicFolderPath)
    // var sql=`SELECT * FROM appointment,services,doctors WHERE doctors.doctor_id=appointment
    // .doctor_id AND appointment.service_id AND appointment_date='${today}'`;

    var sql=`SELECT * FROM appointment`;
    // console.log(data);
    
    var data = await exe(sql);
    var obj={"appointment_list":data};
    res.render("admin/appointments.ejs",obj)

});
route.get("/basic_info",checkAdminLogin, async (req, res) => {
    var data = await exe(`SELECT * FROM basic_info `);
    var obj = { "basic_info": data }

    res.render("admin/basic_info.ejs", obj)
});
route.post("/save_basic_info",checkAdminLogin, async (req, res) => {
    var d = req.body;
    // var sql=`INSERT INTO basic_info(mobile_no, email_id, address, twitter_link, facebook_link, linkedin_link, instagram_link, google_map_link, heading  )VALUES('${d.mobile_no}', '${d.email_id}', '${d.address}', '${d.twitter_link}', '${d.facebook_link}', '${d.linkedin_link}', '${d.instagram_link}', '${d.google_map_link}', '${d.heading}' ) `
    var sql = `UPDATE basic_info SET mobile_no='${d.mobile_no}', email_id='${d.email_id}', address='${d.address}', twitter_link='${d.twitter_link}', facebook_link='${d.facebook_link}', linkedin_link='${d.linkedin_link}', instagram_link='${d.instagram_link}', google_map_link='${d.google_map_link}', heading='${d.heading}'`
    var data = await exe(sql);
    // res.send(data)
    res.redirect("/admin/basic_info")

});
//basic info end
//slider start
route.get("/sliders",checkAdminLogin, async (req, res) => {
    var sql = `SELECT * FROM sliders`;
    var sliders = await exe(sql);
    var obj = { "sliders": sliders }
    res.render("admin/sliders.ejs", obj)
});
route.post("/save_sliders",checkAdminLogin, async (req, res) => {
    var d = req.body;
    var slider_image = time + req.files.slider_image.name;
    req.files.slider_image.mv("public/img/" + slider_image);
    var sql = `INSERT INTO sliders(slider_image,slider_short_title,slider_title) VALUES ('${slider_image}','${d.slider_short_title}','${d.slider_title}')`;
    var data = await exe(sql);
    // res.send(data);
    res.redirect("/admin/sliders")
});
route.get("/delite_slider/:id/:imageName",checkAdminLogin, async (req, res) => {
    var id = req.params.id;
    var imageName = req.params.imageName;
    // res.send(publicFolderPath+"/"+imageName);
    // const imagePath =publicFolderPath+"/"+imageName;
    const imagePath = path.join(publicFolderPath, imageName);
    // // res.send(imagePath)

     var sql = `DELETE FROM sliders WHERE slider_id='${id}'`;
    // if (fs.existsSync(imagePath)) {
    //     // Delete the file
    //     fs.unlink(imagePath);
    //     res.send('Image deleted successfully');
    // } else {
    //     res.status(404).send('Image not found');
    // }
    await exe(sql);
    
    res.redirect("/admin/sliders");
});
// app.delete('/deleteImage/:imageName', (req, res) => {
//     const imageName = req.params.imageName;
//     const imagePath = path.join(publicFolderPath, imageName);
//     // Check if the file exists before attempting to delete
// });
route.get("/edit_slider/:id",checkAdminLogin, async (req, res) => {
    var id = req.params.id;
    var sql = `SELECT *  FROM sliders WHERE slider_id='${id}'`;
    var data = await exe(sql);
    var obj = { "slider_info": data }
    res.render("admin/update_slider.ejs", obj)

});
route.post("/update_sliders",checkAdminLogin, async (req, res) => {
    var d = req.body;

    if (req.files != null) {
        var slider_img = time + req.files.slider_image.name;
        req.files.slider_image.mv("public/img/" + slider_img);
        var sql = `UPDATE sliders SET slider_image='${slider_img}'WHERE slider_id='${d.slider_id}'`
        var data = await exe(sql);
    }
    var sql = `UPDATE sliders SET slider_short_title='${d.slider_short_title}',slider_title='${d.slider_title}' WHERE slider_id='${d.slider_id}'`
    var data = await exe(sql);
    res.redirect("/admin/sliders")

    // res.send(req.files)
});
//slider end

//opening and closing details start
route.get("/opening_hours",checkAdminLogin, async (req, res) => {
    var sql = `SELECT * FROM opening_hours `;
    var data = await exe(sql);
    var obj = { "time_shedule": data }
    res.render("admin/opening_houres.ejs", obj);
})
route.post("/save_opening_hours",checkAdminLogin, async (req, res) => {
    var d = req.body;
    // res.send(d)
    var sql = `INSERT INTO opening_hours(day,open_time,close_time)VALUES('${d.day}','${d.open_time}','${d.close_time}')`;
    var data = await exe(sql);
    res.redirect("/admin/opening_hours")

});
route.get("/edit_time_shedule/:id",checkAdminLogin, async (req, res) => {
    var id = req.params.id;
    var sql = `SELECT * FROM opening_hours WHERE opening_hours_id=${id}`
    var data = await exe(sql);
    var obj = { "time_info": data }
    res.render("admin/update_opening_hours.ejs", obj);
    // res.send(data)
})
route.post("/update_opening_hours",checkAdminLogin, async (req, res) => {
    var d = req.body;
    var sql = `UPDATE opening_hours SET day='${d.day}', open_time='${d.open_time}',close_time='${d.close_time}' WHERE opening_hours_id=${d.opening_hours_id} `;
    var data = await exe(sql);
    res.redirect("/admin/opening_hours")

});
route.get("/delete_time_shedule/:id",checkAdminLogin, async (req, res) => {
    var id = req.params.id;
    var sql = `DELETE  FROM opening_hours WHERE opening_hours_id=${id}`
    var data = await exe(sql);
    res.redirect("/admin/opening_hours")

});
//opening and closing details end

// about start
route.get("/about_us",checkAdminLogin, async (req, res) => {
    var sql = `SELECT * FROM about_us `
    var data = await exe(sql)
    var obj = { "about_info": data }

    // res.send(data)

    res.render("admin/about_us.ejs", obj);
});
route.post("/save_about_us",checkAdminLogin, async (req, res) => {
    var d = req.body;
    if (req.files != null) {
        var about_img = time + req.files.about_img.name;
        req.files.about_img.mv("public/img/" + about_img);
        var sql = `UPDATE about_us SET about_img='${about_img}' `
        var data = await exe(sql);
    }
    var sql = `UPDATE about_us SET  heading='${d.heading}',sub_heading='${d.sub_heading}',details='${d.details}',key_point_1='${d.key_point_1}',key_point_2='${d.key_point_2}',key_point_3='${d.key_point_3}',key_point_4='${d.key_point_4}' `
    var data = await exe(sql);
    res.redirect("/admin/about_us")
    // res.send(d)
});
//about end
//services start
route.get("/services_heading",checkAdminLogin, async (req, res) => {
    var sql = `SELECT * FROM services_heading`;
    var data = await exe(sql);
    var obj = { "services_headings": data };
    res.render("admin/services_heading.ejs", obj);
});
route.post("/save_services_heading",checkAdminLogin, async (req, res) => {
    // res.send(req.files)
    if (req.files.before_img != null) {
        var before_img = time + req.files.before_img.name;
        req.files.before_img.mv("public/img/" + before_img)
        // var sql=`INSERT INTO services_heading(before_img)VALUES('${before_img}')`;
        var sql = `UPDATE services_heading SET before_img='${before_img}'`;
        var data = await exe(sql);


    }
    if (req.files.after_img != null) {
        var after_img = new Date().getTime() + req.files.after_img.name;
        req.files.after_img.mv("public/img/" + after_img)
        // var sql=`INSERT INTO services_heading(after_img)VALUES('${after_img}')`;
        var sql = `UPDATE services_heading SET after_img='${after_img}'`;

        var data = await exe(sql);



    }
    var d = req.body;
    // var sql=`INSERT INTO services_heading(services_heading)VALUES('${d.services_heading}')`;
    var sql = `UPDATE services_heading SET services_heading='${d.services_heading}'`;
    var data = await exe(sql);
    res.redirect("/admin/services_heading")
});
route.get("/manage_services",checkAdminLogin, async (req, res) => {
    var sql = `SELECT * FROM  services`
    var data = await exe(sql);
    var obj = { "services_info": data }
    res.render("admin/manage_services.ejs", obj);
});
route.post("/save_service",checkAdminLogin, async (req, res) => {
    // res.send(req.files)
    var service_images = time + req.files.service_images.name;
    req.files.service_images.mv("public/img/" + service_images);
    var d = req.body;
    var sql = `INSERT INTO services(services_name,service_images,service_price,key_point_1,key_point_2,key_point_3)VALUES('${d.service_name}','${service_images}'),'${d.service_price}','${d.key_point_1}','${d.key_point_2}','${d.key_point_3}'`;
    var data = await exe(sql);
    res.redirect("/admin/manage_services")
});
route.get("/edit_service/:id",checkAdminLogin, async (req, res) => {
    var id = req.params.id;
    var sql = `SELECT * FROM services WHERE service__id=${id}  `;
    var data = await exe(sql);
    var obj = { "service_info": data };
    res.render("admin/update_services.ejs", obj);

});
route.post("/update_service",checkAdminLogin, async (req, res) => {
    // res.send(req.files);
    var d = req.body;
    if (req.files != null) {
        var service_images = time + req.files.service_images.name;
        req.files.service_images.mv("public/img/" + service_images);
        var sql = `UPDATE services SET service_images='${service_images}' WHERE service__id='${d.service__id}'   `
        await exe(sql);
    }
    var sql2 = `UPDATE services SET services_name='${d.service_name}',service_price='${d.service_price}',key_point_1='${d.key_point_1}',key_point_2='${d.key_point_2}',key_point_3='${d.key_point_3}' WHERE service__id='${d.service__id}'`;
    await exe(sql2);
    res.redirect("/admin/manage_services");
});
route.get("/delete_service/:id",checkAdminLogin, async (req, res) => {
    var id = req.params.id;
    var sql = `DELETE FROM services WHERE service__id='${id}'  `
    await exe(sql);
    res.redirect("/admin/manage_services");

})
//services end
route.get("/offer",checkAdminLogin, async (req, res) => {
    var sql = `SELECT * FROM offers`;
    var data = await exe(sql);
    var obj = { "offer_info": data };
    res.render("admin/offer.ejs", obj)
});
route.post("/save_offer",checkAdminLogin, async (req, res) => {
    // res.send(req.body);
    var d = req.body;
    var sql = `UPDATE offers SET offer_heading='${d.offer_heading}',offer_sub_heading='${d.offer_sub_heading}' `;
    await exe(sql);
    res.redirect("/admin/offer")
})
// pricing start
route.get("/pricing",checkAdminLogin, async (req, res) => {
    var sql = `SELECT * FROM pricings`;
    var data = await exe(sql);
    var obj = { "pricing_info": data };
    res.render("admin/pricing.ejs", obj)
});
route.post("/save_pricing",checkAdminLogin, async (req, res) => {
    // res.send(req.body);
    var d = req.body;
    var sql = `UPDATE pricings SET pricing_heading='${d.pricing_heading}',pricing_sub_heading='${d.pricing_sub_heading}' `;
    await exe(sql);
    res.redirect("/admin/pricing")
})
// pricing end
route.get("/doctors",checkAdminLogin, async (req, res) => {
    var sql = `SELECT * FROM  services`;
    var doctors=`SELECT * FROM doctors,services WHERE doctors.doctor_service_id=services.service__id  `;
    var service_list = await exe(sql);
    var doctors_info=await exe(doctors);
    var obj = { "service_list": service_list,"doctors_info":doctors_info };


    res.render("admin/doctors.ejs", obj)
});
route.post("/save_doctors",checkAdminLogin, async(req,res) => {
    // res.send(req.files)
    var d = req.body;
    var doctore_image = time+req.files.doctore_image.name;
    req.files.doctore_image.mv("public/img/" + doctore_image);

    var sql = `INSERT INTO doctors(doctor_name, doctor_mobile, doctor_email, speciallist, doctor_service_id, twitter_link, facebook_link, linkedin_link, instagram_link, doctore_image) VALUES ('${d.doctor_name}', '${d.doctor_mobile}', '${d.doctor_email}', '${d.speciallist}', '${d.doctor_service_id}', '${d.twitter_link}', '${d.facebook_link}', '${d.linkedin_link}', '${d.instagram_link}', '${doctore_image}' ); `
    var data=await exe(sql);

   res.redirect("/admin/doctors")
});
route.get("/edit_doctors/:id",checkAdminLogin,async(req,res)=>{
    var id=req.params.id;

    var sql = `SELECT * FROM  services`;
    var service_list = await exe(sql);

    var sql2=`SELECT * FROM doctors,services WHERE doctor_id=${id} AND doctors.doctor_service_id=services.service__id`;
    var data=await exe(sql2);

    var obj = { "service_list": service_list,"edit_doctors":data };

    res.render("admin/edit_doctors.ejs",obj)
    // res.send(data);

});
 route.post("/update_doctors",checkAdminLogin,async(req,res)=>{
    // res.send(req.body)
    var d=req.body;
    if(req.files!=null){
        var doctore_image=time+req.files.doctore_image.name;
        req.files.doctore_image.mv("public/img/"+doctore_image);

        var sql=`UPDATE doctors SET doctore_image='${doctore_image}'  WHERE  doctor_id='${d.doctor_id}' `
        await exe(sql);

        
    }
    var sql2=`UPDATE doctors SET doctor_name='${d.doctor_name}',doctor_mobile='${d.doctor_mobile}',doctor_email='${d.doctor_email}',speciallist='${d.speciallist}',doctor_service_id='${d.doctor_service_id}',twitter_link='${d.twitter_link}',facebook_link='${d.facebook_link}',linkedin_link='${d.linkedin_link}',instagram_link='${d.instagram_link}' WHERE  doctor_id='${d.doctor_id}'`;
    await exe(sql2)
    res.redirect("/admin/doctors")
 });
 route.get("/delete_doctors/:id",checkAdminLogin,async(req,res)=>{
    var id=req.params.id;
    var sql=`DELETE FROM doctors WHERE doctor_id='${id}'`;
    await exe(sql);
    res.redirect("/admin/doctors")

 })
//  contact us
route.get("/contact_us",checkAdminLogin,async (req,res)=>{
    var sql=`SELECT * FROM contact`
    var contact_infoata=await exe(sql);
    var obj={"contact_info":contact_infoata}

    res.render("admin/contact_us.ejs",obj)
});
route.get("/change_appointment_status/:id/:new_status",checkAdminLogin,async(req,res)=>{
    var id=req.params.id;
    var new_status=req.params.new_status;
    var sql=`UPDATE appointment SET appointment_status='${new_status}' WHERE appointment_id='${id}'`;
    await exe(sql);
    res.redirect("/admin/");
});
route.get("/users_profile",checkAdminLogin,async(req,res)=> {
  var data = await exe(`SELECT * FROM admin_tbl`);
 res.render("admin/users_profile.ejs",{"admin":data});
});
route.get('/logout', (req, res) => {
    // Clear the session
    req.session.destroy(err => {
      if (err) {
        return res.status(500).send('Error logging out');
      }
      res.redirect('/admin_login'); // Redirect to login page or wherever you want after logout
    });
});
module.exports = route;
//CREATE TABLE basic_info(basic_info_id INT PRIMARY KEY AUTO_INCREMENT, mobile_no VARCHAR(10), email_id TEXT, address TEXT, twitter_link TEXT, facebook_link TEXT, linkedin_link TEXT, instagram_link TEXT, google_map_link TEXT, heading TEXT);

//CREATE TABLE sliders(slider_id INT PRIMARY KEY AUTO_INCREMENT,slider_image TEXT,slider_short_title TEXT,slider_title TEXT );

//CREATE TABLE opening_hours(opening_hours_id INT PRIMARY KEY AUTO_INCREMENT ,day TEXT,open_time VARCHAR(100),close_time VARCHAR(100));

//CREATE TABLE about_us(about_us_id INT PRIMARY KEY AUTO_INCREMENT,heading TEXT,sub_heading TEXT,details TEXT,key_point_1 VARCHAR(200),key_point_2 VARCHAR(200),key_point_3 VARCHAR(200),key_point_4 VARCHAR(200),about_img TEXT);

//CREATE TABLE services_heading(service_heading_id INT PRIMARY KEY AUTO_INCREMENT ,services_heading TEXT,before_img TEXT,after_img TEXT);

//CREATE TABLE services(service__id INT PRIMARY KEY AUTO_INCREMENT ,services_name TEXT,service_images TEXT);

//CREATE TABLE offers(offer_id INT PRIMARY KEY AUTO_INCREMENT,offer_heading TEXT,offer_sub_heading TEXT);

// CREATE TABLE pricings(offer_id INT PRIMARY KEY AUTO_INCREMENT,pricing_heading TEXT,pricing_sub_heading TEXT);

// CREATE TABLE doctors(doctor_id INT PRIMARY KEY AUTO_INCREMENT,doctor_name VARCHAR(200),doctor_mobile VARCHAR(10),doctor_email VARCHAR(200),speciallist VARCHAR(200),doctor_service_id INT,twitter_link TEXT,facebook_link TEXT,linkedin_link TEXT,instagram_link TEXT,doctore_image TEXT);