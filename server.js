var express = require('express'); // Bringing in the express into the server js file.
var path = require('path'); // Bringing in the path module (system inbuilt)
var bodyParser = require('body-parser'); //Bringing in the body parser for form data request response handling.

var index = require('./routes/index');
var users = require('./routes/users');

var port = 3000;

var app = express();

//View Engine/ Renderer
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//Seting up the static folders for the angular
app.use(express.static(path.join(__dirname, 'client')));

//Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/api', users);

app.listen(port, function(){
    console.log('Server started at port: '+port);
});
