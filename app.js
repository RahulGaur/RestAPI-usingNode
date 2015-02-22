var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
// var users = require('./routes/users');
var rentals = require('./routes/rentals');
var payments = require('./routes/payments');
var staff = require('./routes/staff');
var stores = require('./routes/stores');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
// app.use('/users', users);
app.use('/rentals', rentals);
app.use('/payments', payments);
app.use('/staff', staff);
app.use('/stores', stores);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// Establishing connections with MySQL
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '',
  database: 'sakila'

});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

//and pass it into the node-mysql-wrap constructor
var createMySQLWrap = require('mysql-wrap');
sql = createMySQLWrap(connection);


/*
* Pagination
*/

pagination = function(req,res,fields,table_name){

  var p_key = table_name + '_id';
  sql.query(
    'SELECT ' + p_key + ' FROM ' + table_name + ' ORDER BY ' + p_key + ' DESC LIMIT 1'
  ).then(function(query_res) {
    last_num = query_res[0].p_key;
  });

  if (!req.query.offset){
    req.query.offset = 0;
  }
  if(!req.query.limit){
    req.query.limit = 3;
  }

  sql.query(
      'SELECT ' + fields + ' FROM ' + table_name + ' LIMIT ' + req.query.limit +
      ' OFFSET ' + req.query.offset
  ).then(function(query_res) {

  var next_num = parseInt(req.query.offset)+parseInt(req.query.limit);
  var prev_num = parseInt(req.query.offset)-parseInt(req.query.limit);
  var lastpage_num = parseInt(last_num)-parseInt(req.query.limit);

  if(next_num>last_num) {
    var next_link = {rel:"next", href:''}
  } else {
    var next_link = {rel:"next", href:req.protocol + '//:' + req.hostname +
      ':' + req.app.locals.settings.port+req.baseUrl
      + '?offset=' + next_num
      + '&limit=' + req.query.limit}
  }

  if(prev_num<0) {
    var prev_link = {rel:"prev", href:''}
  } else {
    var prev_link = {rel:"prev", href:req.protocol + '//:' + req.hostname +
      ':' + req.app.locals.settings.port+req.baseUrl
      + '?offset=' + prev_num
      + '&limit=' + req.query.limit}
  }

  var links = [
      next_link,

      {rel:"self", href:req.protocol+'//:'+req.hostname+
      ':'+req.app.locals.settings.port+req.originalUrl},

      prev_link,

      {rel:"last", href:req.protocol + '//:' + req.hostname +
      ':' + req.app.locals.settings.port+req.baseUrl
      + '?offset=' + lastpage_num
      + '&limit=' + req.query.limit},

      {rel:"first", href:req.protocol + '//:' + req.hostname +
      ':' + req.app.locals.settings.port+req.baseUrl
      + '?offset=' + 0
      + '&limit=' + req.query.limit}
  ]

  var pagination_res = {data:body_parser(query_res, table_name), links:links};

  if(req.query.offset>last_num){
    res.send('out of bound');
  }else{
    res.send(pagination_res);
  }

  });
};

body_parser = function(query_res, table_name) {
  var res = [];

  //For loop to get relation, link, expand info.
  for (var i = 0; i < query_res.length; i++) {
    var exp_obj = {};
    var origin_obj = query_res[i]
    for (var property in origin_obj) {
      if (origin_obj.hasOwnProperty(property)) {

        property_token = property.split("_")
        var nested_obj = {};

        if (property_token.indexOf("id") > -1){

          nested_obj["data"] = {"id": origin_obj[property]};
          if (property_token[0] == "customer" || property_token[0] == "manager") {
            nested_obj["data"]["name"] = getName(); //!!!
          }
          nested_obj["link"] = {"rel": getRel(table_name, property, property_token),
                              "href": getHref(origin_obj, property)};
          exp_obj[property_token[0]] = nested_obj;
        }

        if (property_token.indexOf("id") == -1){
          exp_obj[property] = origin_obj[property];
        }

      }
    }
    res.push(exp_obj);
  }
  //Warp information into a JSON object
  return res;
}

getRel = function(table_name, property, property_token) {
  if (table_name = property)
    return 'self'
  else
    return table_name + property_token[1];
}

getHref = function(origin_obj, property) {
  return href:req.protocol+'//:'+req.hostname+ ':'
    +req.app.locals.settings.port+property+origin_obj[property];
}

getName = function(origin_obj, property, property_token) {
  var first_name;
  var last_name;

  if (property_token.indexOf("customer") > -1){
    sql.query('SELECT first_name FROM customer WHERE customer_id = ' + origin_obj[property])
    first_name = query_res;
    sql.query('SELECT last_name FROM customer WHERE customer_id = ' + origin_obj[property])
    last_name = query_res;
  }

  if (property_token.indexOf("manager") > -1){
    sql.query('SELECT first_name FROM staff WHERE staff_id = ' + origin_obj[property])
    first_name = query_res;
    sql.query('SELECT last_name FROM staff WHERE staff_id = ' + origin_obj[property])
    last_name = query_res;
  }

  return {"Firstname": first_name, "Lastname": last_name};
}

console.log('running!!!');

module.exports = app;
