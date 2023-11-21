const mysql=require("mysql2");
const con=mysql.createPool({
    connectionLimit:10,
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME
});


exports.view=(req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw  err
        connection.query("select * from users",(err,rows)=>{
            connection.release();
            if(!err){
                res.render("home",{rows});

            }
            else{
                console.log("Error in Listing Data"+err);
            }
        });
    });
    }; 
exports.adduser=(req,res)=>{
   res.render("adduser");
}
exports.save=(req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw  err
        const {name,age,city}=req.body;
        connection.query("insert into users (name,age,city) values(?,?,?)",[name,age,city],(err,rows)=>{
            connection.release();
            if(!err){
                res.render("adduser",{msg:"User Details Added Successfully"});

            }
            else{
                console.log("Error in Listing Data"+err);
            }
        });
    });

 };

 exports.edituser=(req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw  err
        //Get  id from url

        let id=req.params.id;
        connection.query("select * from users where id=?",[id],(err,rows)=>{
            connection.release();
            if(!err){
                res.render("edituser",{rows});

            }
            else{
                console.log("Error in Listing Data"+err);
            }
        });
    });

 }
 
 exports.edit=(req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw  err
        const {name,age,city}=req.body;
        let id=req.params.id;
        connection.query("update users set name=?,age=?,city=? where id=?",[name,age,city,id],(err,rows)=>{
            connection.release();
            if(!err){
                con.getConnection((err,connection)=>{
                    if(err) throw  err
                    //Get  id from url
            
                    let id=req.params.id;
                    connection.query("select * from users where id=?",[id],(err,rows)=>{
                        connection.release();
                        if(!err){
                          //  res.render("edituser",{rows});
                            res.render("edituser",{rows,msg:"User Details Updated Successfully"});

            
                        }
                        else{
                            console.log("Error in Listing Data"+err);
                        }
                    });
                });
            
            

            }
            else{
                console.log("Error in Listing Data"+err);
            }
        });
    });

 };

 
exports.delete=(req,res)=>{
con.getConnection((err,connection)=>{
    if(err) throw err

    //getv id from url
    let id=req.params.id;
    connection.query("delete from users where id=?",[id],(err,rows)=>{
       connection.release();
       if(!err){
     res.redirect("/");
       }
       else{
        console.log(err);
       }
    });
});
};