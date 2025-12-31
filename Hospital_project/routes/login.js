var express =require("express");
var route=express.Router();
var exe=require("./connection.js")

route.get("/",(req,res)=>{
    res.render("login/login.ejs")
});
route.post("/check_admin",async(req,res)=>{
    var d=req.body;
    // var sql =`SELECT * FROM admin_tbl WHERE admin_email='${d.username}' OR admin_name='${d.username}'  AND admin_password='${d.password}'`
    var sql =`SELECT * FROM admin_tbl WHERE admin_email='${d.username}' AND admin_password='${d.password}'`
    var data=await exe(sql);
    if(data.length>0){
        // res.send("login success");
        // set session here
        req.session['admin_id']=data[0].id;
        // ====================vnghmjk.+-
        res.redirect("/admin/")
    }
    else
    {
        // res.send("login failed");
        res.redirect("/admin_login")
    }

    // res.send(data);

});

module.exports=route;
