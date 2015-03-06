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
  password : 'Garima@123',
  database:  'sakila'

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

throw_err1 = function (err1,res) {
    res.json({ 'error': {
        message: "Cannot DELETE value. First delete values in the table referenced by the Foreign Key",
        error: err1
    }});
    throw err1;

}


pagination = function(req,res,fields,table_name,get_target){
  var p_key = table_name + '_id';

  console.log("in pag, table_name=" + table_name);
  console.log("in pag, fields=" + fields);

  if(get_target.indexOf("WHERE") == -1){
    sql.query(
      'SELECT COUNT(' + p_key + ') FROM ' + table_name
    ).then(function(query_res) {
      last_num = query_res[0]['COUNT('+p_key+')'];

    });
  }

  if(get_target.indexOf("WHERE") > -1){
    var get_target_token = get_target.split("WHERE")
    sql.query(
      'SELECT COUNT(' + p_key + ') FROM ' + table_name + ' WHERE' + get_target_token[1]
    ).then(function(query_res) {
      console.log('SELECT COUNT(' + p_key + ') FROM ' + table_name + ' WHERE' + get_target_token[1])
      last_num = query_res[0]['COUNT('+p_key+')'];
    });
  }

  if (!req.query.offset){
    req.query.offset = 0;
  }
  if(!req.query.limit){
    req.query.limit = 2;
  }

  console.log('SELECT ' + fields + ' FROM ' + table_name +  get_target + ' LIMIT '
    + req.query.limit + ' OFFSET ' + req.query.offset)

  sql.query(
      'SELECT ' + fields + ' FROM ' + table_name +  get_target + ' LIMIT '
    + req.query.limit + ' OFFSET ' + req.query.offset
  ).then(function(query_res) {
  console.log("last_num=" + last_num);

  var next_num = parseInt(req.query.offset)+parseInt(req.query.limit);
  var prev_num = parseInt(req.query.offset)-parseInt(req.query.limit);
  var lastpage_num = parseInt(last_num)-req.query.limit;

  if (lastpage_num < 0){
    lastpage_num = 0;
  }

  console.log("lastpage_num=" + lastpage_num);
  console.log("next_num=" +next_num);
  var originalUrl_token = req.originalUrl.split("?")

  if(next_num>last_num) {
    var next_link = {rel:"next", href:''}
  } else if (get_target.indexOf("WHERE") > -1) {
    var next_link = {rel:"next", href:req.protocol + '://' + req.hostname +
      ':' + req.app.locals.settings.port+originalUrl_token[0]
      + '?offset=' + next_num
      + '&limit=' + req.query.limit}
  }else {
    console.log(req.baseUrl);
        var next_link = {rel:"next", href:req.protocol + '://' + req.hostname +
      ':' + req.app.locals.settings.port+req.baseUrl
      + '?offset=' + next_num
      + '&limit=' + req.query.limit}
  }


  if(prev_num<0) {
    var prev_link = {rel:"prev", href:''}
  } else if (get_target.indexOf("WHERE") > -1) {
    var prev_link = {rel:"prev", href:req.protocol + '://' + req.hostname +
      ':' + req.app.locals.settings.port+originalUrl_token[0]
      + '?offset=' + prev_num
      + '&limit=' + req.query.limit}
  }
  else {
    var prev_link = {rel:"prev", href:req.protocol + '://' + req.hostname +
      ':' + req.app.locals.settings.port+req.baseUrl
      + '?offset=' + prev_num
      + '&limit=' + req.query.limit}
  }

  if (get_target.indexOf("WHERE") > -1) {
    var last_link = {rel:"last", href:req.protocol + '://' + req.hostname +
      ':' + req.app.locals.settings.port+originalUrl_token[0]
      + '?offset=' + lastpage_num
      + '&limit=' + req.query.limit}
  }
  else{
    var last_link = {rel:"last", href:req.protocol + '://' + req.hostname +
      ':' + req.app.locals.settings.port+req.baseUrl
      + '?offset=' + lastpage_num
      + '&limit=' + req.query.limit}
  }

  if (get_target.indexOf("WHERE") > -1) {
    var first_link = {rel:"first", href:req.protocol + '://' + req.hostname +
      ':' + req.app.locals.settings.port+originalUrl_token[0]
      + '?offset=' + 0
      + '&limit=' + req.query.limit}
  }
  else{
    var last_link = {rel:"first", href:req.protocol + '://' + req.hostname +
      ':' + req.app.locals.settings.port+req.baseUrl
      + '?offset=' + 0
      + '&limit=' + req.query.limit}
  }

  var links = [
      next_link,

      {rel:"self", href:req.protocol+'://'+req.hostname+
      ':'+req.app.locals.settings.port+req.originalUrl},

      prev_link,

      last_link,

      {rel:"first", href:req.protocol + '://' + req.hostname +
      ':' + req.app.locals.settings.port+req.baseUrl
      + '?offset=' + 0
      + '&limit=' + req.query.limit}
  ]

  var pagination_res = {data:body_parser(query_res, table_name, req), links:links};

  if(req.query.offset>last_num){
    res.send('out of bound');
  }else{
    res.send(pagination_res);
  }

  });
};

body_parser = function(query_res, table_name, page_req) {
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
            // nested_obj["data"]["name"] = getName(origin_obj, property, property_token);

          }
          nested_obj["link"] = {"rel": getRel(table_name, property_token[0])
                              , "href": getHref(origin_obj, property, page_req, property_token)};
          exp_obj[property_token[0]] = nested_obj;
        } else {
          exp_obj[property] = origin_obj[property];
        }

      }
    }
    res.push(exp_obj);
  }
  //Warp information into a JSON object
  return res;
}

getRel = function(table_name, first_token) {
  if (table_name == first_token)
    return 'self'
  else
    return table_name + "_" + first_token;
}

getHref = function(origin_obj, property, page_req, property_token) {
  return page_req.protocol+'://'+page_req.hostname+ ':'
    +page_req.app.locals.settings.port+'/'+property_token[0]+'/'+origin_obj[property];
}

getName = function(origin_obj, property, property_token) {
  var ret = {};
  var table_name;

  if (property_token.indexOf("customer") > -1)
    table_name = "customer";

  if(property_token.indexOf("manager") > -1)
    table_name = "staff"

  sql.query(
    "SELECT first_name, last_name FROM " + table_name + " WHERE " +
    table_name + "_id = " + origin_obj[property]
  ).then(function(query_res) {
    ret.last_name = query_res[0].last_name;
    ret.first_name = query_res[0].first_name;
    console.log(ret)
    return ret;
  });
}

console.log('running!!!');

module.exports = app;
