const express=require("express");
const exphbs=require("express-handlebars");
const bodyParser=require("body-parser");
const mysql=require("mysql2");
require('dotenv').config();
const ds=express();
const port=process.env.PORT||5000;
ds.use(bodyParser.urlencoded({extended:false}));
ds.use(bodyParser.json());

//static files
ds.use(express.static("public"));

//template engine
//html css a render pana use oantranga
const handlebars=exphbs.create({extname:".hbs"});
ds.engine('hbs',handlebars.engine);
ds.set("view engine","hbs");

//mysql connection
/*
const con=mysql.createPool({
    connectionLimit:10,
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME
})

//check database connection
con.getConnection((err,connection)=>{
    if(err) throw  err
    else console.log("Connection Success");
})*/


//router
/*
ds.get('/',(req,res)=>{
res.render("home");
}); //home page*/

const routes=require("./server/routes/student");
ds.use('/',routes);
//listen port
ds.listen(port,()=>{
    console.log("Listeneing port "+port);
})