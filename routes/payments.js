var express = require('express');
var router = express.Router();

function throw_err(err, res) {
    res.json({ 'error': {
        message: err.message,
        error: err
    }});
    throw err;
}

/* GET payment listing. */

projection = function(req,res){
  pagination(req, res, req.query.fields, 'payment');
};

router.get('/', function(req, res){
	if(req.query.fields)
		return projection(req, res);
	else
		return pagination(req, res, '*', 'payment');
});


router.get('/:id', function(req, res) {	
	var db = req.sql;	
	sql.query('SELECT * FROM payment WHERE payment_id=' + req.params.id, function(err,rows,fields) {
	if(err) throw_err(err,res);
	res.json({'payment': rows});
	});

});
//e.g http://localhost:3000/payments?offset=0&limit=10

module.exports = router;


