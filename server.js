
var express = require('express');
//var exhbs = require('express-handlebars');
var app = express();
const bodyParser = require('body-parser')
app.use(express.json({limit: "10mb", extended: true}))
app.use(express.urlencoded({limit: "10mb", extended: true, parameterLimit: 50000}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

require('./index.js')(app);
const env = require('./env.js');
// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
const cors = require('cors')
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))

require('./index.js')(app);
 var server = app.listen(env.ServerPort, '0.0.0.0' ,function () {
 
  let host = server.address().address
  let port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port);
}) 