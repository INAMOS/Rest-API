const express=require('express');
const app=express();
const morgan=require('morgan');
const bodyParser=require('body-parser');

//settings
app.set('port',process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

//routes
require('./routes/user')(app);

app.listen(app.get('port'),()=>{

    console.log('Server listen on port '+app.get('port'));

});