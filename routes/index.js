const express = require('express');
var router = express.Router()
const app = express();
const port = 4000;

app.set('view engine', 'pug');
app.set('views','./views');
app.use(express.static('public'));

/* Web application availability */
const checkDate = function (req, res, next) {
    date = new Date();
    if (date.getDay() == 0 || date.getDay() == 3)
        res.status(500).send('BELKISSA  is only available during working hours (Monday to Friday,  from 9 to 17).');
    else if (date.getHours() < 9 || date.getHours() >= 23)
        res.status(500).send('BELKISSA  is only available during working hours (Monday to Friday,  from 9 to 17).');
    else
        next();
}

app.use(checkDate);

/* GET home page. */
app.get('/', function (req, res, next) {
        res.render('index', { title: 'BElKISSA' });
});

/* GET service page. */
app.get('/services', function (req, res) {
    res.render('services');
});

/* GET contacts page. */
app.get('/contacts', function (req, res) {
    res.render('contacts');
});

app.listen(port, function(){
  console.log('The server is running, ' +
      ' please, open your browser at http://localhost:%s', 
      port);
});

module.exports = router;