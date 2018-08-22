const User=require('.././models/User');

module.exports=function(app){

    app.get('/users',function(req,res,next){

        User.getUser((err,data)=>{

            res.status(200).json(data);

        });
    });

    app.post('/users',function(req,res,next){

        const userData={
            id:null,
            username:req.body.username,
            email:req.body.email,
            password:req.body.password,
            created_at:null,
            updated_at:null
        }

        User.InsertUser(userData,(err, data)=>{

            
            if(data && data.insertId){
                res.json({
                    success:true,
                    msg:"Inserted",
                    data:data,
                });
            }else{
                res.status(500).json(err);
            }
            
        });
    });

    app.put('/users/:id',(req,res,next)=>{

        const userData={
            id:req.params.id,
            username:req.body.username,
            email:req.body.email,
            password:req.body.password,
            created_at:null,
            updated_at:null
        }


        User.UpdateUser(userData,(err,data)=>{

            if(data && data.msg){
                res.json(data);
            }else{
                res.json({
                    success:false,
                    msg:"error"
                });
            }
        });

    })

    app.delete('/users/:id',(req,res,next)=>{

        User.DeleteUser(req.params.id,(err,data)=>{

            if(data && data.msg==='deleted' || data && data.msg==='not exist'){

                res.json({
                    success:true,
                    data
                })
    
            }else{
                res.status(500).json({
                    msg:"Error"
                });
            }

        })

        

    });

}