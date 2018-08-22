const mysql=require('mysql');

connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'rest'
});

let userModel={}

userModel.getUser=(callbak)=>{

    if(connection){

        connection.query('SELECT * FROM users',(err,rows)=>{
            if(err) throw err;

            callbak(null,rows);
        });
    }
}

userModel.InsertUser=(userData,callbak)=>{

    if(connection){

        connection.query('INSERT INTO users SET ?',userData,(err,result)=>{
            
            if(err){
                throw err;
            }else{
                console.log(result)
                callbak(null,{
                    "insertId":result.insertId
                });

            } 
            
        })

    }
}

userModel.UpdateUser=(userData,callback)=>{

    if(connection){

        const sql=`UPDATE users SET 
                   username=${connection.escape(userData.username)},
                   email=${connection.escape(userData.email)},
                   password=${connection.escape(userData.password)}
                   WHERE id=${connection.escape(userData.id)}
                  ` 

        connection.query(sql,(err,result)=>{

            if(err){
                throw err;
            }else{
                callback(null,{"msg":"success"})
            }

        })
    }
}

userModel.DeleteUser=(id,callback)=>{

    if(connection){
        const sql=`
                    SELECT *FROM users WHERE id=${connection.escape(id)}
                  `
        
        connection.query(sql,(err,row)=>{

            if(row){
                let sql=`DELETE FROM users WHERE id=${id}`;

                connection.query(sql,(err,result)=>{

                    if(err){
                        throw err;
                    }else{
                        callback(null,{
                            msg:"deleted"
                        });
                    }

                });
            
            }else{
                callback(null,{
                    msg:"not exist"
                })
            }



        })
    }

}

module.exports=userModel;