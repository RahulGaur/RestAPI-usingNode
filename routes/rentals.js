var express = require('express');
var router = express.Router();

function throw_err(err, res) {
    res.json({ 'error': {
        message: err.message,
        error: err
    }});
    throw err;
}

/* GET rental listing. */

var projection = function(req,res){
	console.log("in rentals, fields=" + req.query.fields)
  pagination(req, res, req.query.fields, 'rental');
};

router.get('/', function(req, res){
	console.log(req.baseUrl);
	if(req.query.fields) {
		return projection(req, res);
	}

	else
		return pagination(req, res, '*', 'rental');
});
//e.g http://localhost:3000/rentals?offset=0&limit=10
//GET
router.get('/:id', function(req, res) {	
	var db = req.sql;	
	sql.query('SELECT * FROM rental WHERE rental_id=' + req.params.id, function(err,rows,fields) {
	if(err) throw_err(err,res);
	res.json({'rental': rows});
	});

});

router.get('/customer/:id', function(req, res) {	
	var db = req.sql;	

	console.log('SELECT * FROM rental WHERE customer_id=' + req.params.id)

	sql.query('SELECT * FROM rental WHERE customer_id=' + req.params.id, function(err,rows,fields) {
	if(err) throw_err(err,res);
	res.json({'rental': rows});
	});

});

router.get('/staff/:id', function(req, res) {	
	var db = req.sql;	
	sql.query('SELECT * FROM rental WHERE staff_id=' + req.params.id, function(err,rows,fields) {
	if(err) throw_err(err,res);
	res.json({'rental': rows});
	});

});

router.get('/inventory/:id', function(req, res) {	
	var db = req.sql;	
	sql.query('SELECT * FROM rental WHERE inventory_id=' + req.params.id, function(err,rows,fields) {
	if(err) throw_err(err,res);
	res.json({'rental': rows});
	});

});

router.get('/customer/:id1/staff/:id2', function(req, res) {	
	//var db = req.sql;	
	sql.query('SELECT * FROM rental WHERE customer_id=' + req.params.id1 +' AND staff_id= ' + req.params.id2, function(err,rows,fields) {
	if(err) throw_err(err,res);
	res.json({'rental': rows});
	});

});

router.get('/staff/:id1/customer/:id2', function(req, res) {	
	//var db = req.sql;	
	sql.query('SELECT * FROM rental WHERE customer_id=' + req.params.id1 +' AND staff_id= ' + req.params.id2, function(err,rows,fields) {
	if(err) throw_err(err,res);
	res.json({'rental': rows});
	});

});

router.get('/customer/:id1/inventory/:id2', function(req, res) {	
	//var db = req.sql;	
	sql.query('SELECT * FROM rental WHERE customer_id=' + req.params.id1 +' AND inventory_id= ' + req.params.id2, function(err,rows,fields) {
	if(err) throw_err(err,res);
	res.json({'rental': rows});
	});

});

router.get('/inventory/:id1/customer/:id2', function(req, res) {	
	//var db = req.sql;	
	sql.query('SELECT * FROM rental WHERE inventory_id=' + req.params.id1 +' AND customer_id= ' + req.params.id2, function(err,rows,fields) {
	if(err) throw_err(err,res);
	res.json({'rental': rows});
	});

});

router.get('/inventory/:id1/staff/:id2', function(req, res) {	
	//var db = req.sql;	
	sql.query('SELECT * FROM rental WHERE inventory_id=' + req.params.id1 +' AND staff_id= ' + req.params.id2, function(err,rows,fields) {
	if(err) throw_err(err,res);
	res.json({'rental': rows});
	});

});

router.get('/staff/:id1/inventory/:id2', function(req, res) {	
	//var db = req.sql;	
	sql.query('SELECT * FROM rental WHERE staff_id=' + req.params.id1 +' AND inventory_id= ' + req.params.id2, function(err,rows,fields) {
	if(err) throw_err(err,res);
	res.json({'rental': rows});
	});

});

router.get('/:id1/customer/:id2', function(req, res) {	
	//var db = req.sql;	
	//console.log(req.params);
	sql.query('SELECT * FROM rental WHERE rental_id = ' + req.params.id1 + ' AND customer_id= ' + req.params.id2, function(err,rows,fields) {
	if(err) throw_err(err,res);
	res.json({'rental': rows});
	});

});

router.get('/:id1/staff/:id2', function(req, res) {	
	//var db = req.sql;	
	//console.log(req.params);
	sql.query('SELECT * FROM rental WHERE rental_id = ' + req.params.id1 + ' AND staff_id= ' + req.params.id2, function(err,rows,fields) {
	if(err) throw_err(err,res);
	res.json({'rental': rows});
	});

});

router.get('/:id1/inventory/:id2', function(req, res) {	
	//var db = req.sql;	
	//console.log(req.params);
	sql.query('SELECT * FROM rental WHERE rental_id = ' + req.params.id1 + ' AND inventory_id= ' + req.params.id2, function(err,rows,fields) {
	if(err) throw_err(err,res);
	res.json({'rental': rows});
	});

});


router.get('/:id1/customer/:id2/staff/:id3', function(req, res) {	
	//var db = req.sql;	
	//console.log(req.params);
	sql.query('SELECT * FROM rental WHERE rental_id = ' + req.params.id1 + ' AND customer_id= ' + req.params.id2 + ' AND staff_id = ' + req.params.id3, function(err,rows,fields) {
	if(err) throw_err(err,res);
	res.json({'rental': rows});
	});

});

router.get('/:id1/staff/:id2/customer/:id3', function(req, res) {	
	//var db = req.sql;	
	//console.log(req.params);
	sql.query('SELECT * FROM rental WHERE rental_id = ' + req.params.id1 + ' AND staff_id= ' + req.params.id2 + ' AND customer_id = ' + req.params.id3, function(err,rows,fields) {
	if(err) throw_err(err,res);
	res.json({'rental': rows});
	});

});

router.get('/:id1/customer/:id2/inventory/:id3', function(req, res) {	
	//var db = req.sql;	
	//console.log(req.params);
	sql.query('SELECT * FROM rental WHERE store_id = ' + req.params.id1 + ' AND customer_id= ' + req.params.id2 + ' AND inventory_id = ' + req.params.id3, function(err,rows,fields) {
	if(err) throw_err(err,res);
	res.json({'rental': rows});
	});

});

router.get('/:id1/inventory/:id2/customer/:id3', function(req, res) {	
	//var db = req.sql;	
	//console.log(req.params);
	sql.query('SELECT * FROM rental WHERE store_id = ' + req.params.id1 + ' AND customer_id= ' + req.params.id3 + ' AND inventory_id = ' + req.params.id2, function(err,rows,fields) {
	if(err) throw_err(err,res);
	res.json({'rental': rows});
	});

});

router.get('/:id1/staff/:id2/inventory/:id3', function(req, res) {	
	//var db = req.sql;	
	//console.log(req.params);
	sql.query('SELECT * FROM rental WHERE rental_id = ' + req.params.id1 + ' AND staff_id= ' + req.params.id2 + ' AND inventory_id = ' + req.params.id3, function(err,rows,fields) {
	if(err) throw_err(err,res);
	res.json({'rental': rows});
	});

});

router.get('/:id1/inventory/:id2/staff/:id3', function(req, res) {	
	//var db = req.sql;	
	//console.log(req.params);
	sql.query('SELECT * FROM rental WHERE rental_id = ' + req.params.id1 + ' AND inventory_id= ' + req.params.id2 + ' AND staff_id = ' + req.params.id3, function(err,rows,fields) {
	if(err) throw_err(err,res);
	res.json({'rental': rows});
	});

});

router.get('/:id1/customer/:id2/inventory/:id3/staff/:id4', function(req, res) {	
	//var db = req.sql;	
	//console.log(req.params);
	sql.query('SELECT * FROM rental WHERE store_id = ' + req.params.id1 + ' AND customer_id= ' + req.params.id2 + ' AND inventory_id = ' + req.params.id3 + ' AND staff_id = ' + req.params.id4, function(err,rows,fields) {
	if(err) throw_err(err,res);
	res.json({'rental': rows});
	});

});

router.get('/:id1/customer/:id2/staff/:id3/inventory/:id4', function(req, res) {	
	//var db = req.sql;	
	//console.log(req.params);
	sql.query('SELECT * FROM rental WHERE store_id = ' + req.params.id1 + ' AND customer_id= ' + req.params.id2 + ' AND staff_id = ' + req.params.id3 + ' AND inventory_id = ' + req.params.id4, function(err,rows,fields) {
	if(err) throw_err(err,res);
	res.json({'rental': rows});
	});

});

router.get('/:id1/inventory/:id2/customer/:id3/staff/:id4', function(req, res) {	
	//var db = req.sql;	
	//console.log(req.params);
	sql.query('SELECT * FROM rental WHERE store_id = ' + req.params.id1 + ' AND inventory_id= ' + req.params.id2 + ' AND customer_id = ' + req.params.id3 + ' AND staff_id = ' + req.params.id4, function(err,rows,fields) {
	if(err) throw_err(err,res);
	res.json({'rental': rows});
	});

});

router.get('/:id1/inventory/:id2/staff/:id3/customer/:id4', function(req, res) {	
	//var db = req.sql;	
	//console.log(req.params);
	sql.query('SELECT * FROM rental WHERE store_id = ' + req.params.id1 + ' AND inventory_id= ' + req.params.id2 + ' AND staff_id = ' + req.params.id3 + ' AND customer_id = ' + req.params.id4, function(err,rows,fields) {
	if(err) throw_err(err,res);
	res.json({'rental': rows});
	});

});

router.get('/:id1/staff/:id2/customer/:id3/inventory/:id4', function(req, res) {	
	//var db = req.sql;	
	//console.log(req.params);
	sql.query('SELECT * FROM rental WHERE store_id = ' + req.params.id1 + ' AND staff_id= ' + req.params.id2 + ' AND customer_id = ' + req.params.id3 + ' AND inventory_id = ' + req.params.id4, function(err,rows,fields) {
	if(err) throw_err(err,res);
	res.json({'rental': rows});
	});

});

router.get('/:id1/staff/:id2/inventory/:id3/customer/:id4', function(req, res) {	
	//var db = req.sql;	
	//console.log(req.params);
	sql.query('SELECT * FROM rental WHERE store_id = ' + req.params.id1 + ' AND staff_id= ' + req.params.id2 + ' AND inventory_id = ' + req.params.id3 + ' AND customer_id = ' + req.params.id4, function(err,rows,fields) {
	if(err) throw_err(err,res);
	res.json({'rental': rows});
	});

});



router.get('/customer/:id2/inventory/:id3/staff/:id4', function(req, res) {	
	//var db = req.sql;	
	//console.log(req.params);
	sql.query('SELECT * FROM rental WHERE customer_id= ' + req.params.id2 + ' AND inventory_id = ' + req.params.id3 + ' AND staff_id = ' + req.params.id4, function(err,rows,fields) {
	if(err) throw_err(err,res);
	res.json({'rental': rows});
	});

});

router.get('/customer/:id2/staff/:id3/inventory/:id4', function(req, res) {	
	//var db = req.sql;	
	//console.log(req.params);
	sql.query('SELECT * FROM rental WHERE customer_id= ' + req.params.id2 + ' AND staff_id = ' + req.params.id3 + ' AND inventory_id = ' + req.params.id4, function(err,rows,fields) {
	if(err) throw_err(err,res);
	res.json({'rental': rows});
	});

});

router.get('/inventory/:id2/customer/:id3/staff/:id4', function(req, res) {	
	//var db = req.sql;	
	//console.log(req.params);
	sql.query('SELECT * FROM rental WHERE inventory_id= ' + req.params.id2 + ' AND customer_id = ' + req.params.id3 + ' AND staff_id = ' + req.params.id4, function(err,rows,fields) {
	if(err) throw_err(err,res);
	res.json({'rental': rows});
	});

});

router.get('/inventory/:id2/staff/:id3/customer/:id4', function(req, res) {	
	//var db = req.sql;	
	//console.log(req.params);
	sql.query('SELECT * FROM rental WHERE inventory_id= ' + req.params.id2 + ' AND staff_id = ' + req.params.id3 + ' AND customer_id = ' + req.params.id4, function(err,rows,fields) {
	if(err) throw_err(err,res);
	res.json({'rental': rows});
	});

});

router.get('/staff/:id2/customer/:id3/inventory/:id4', function(req, res) {	
	//var db = req.sql;	
	//console.log(req.params);
	sql.query('SELECT * FROM rental WHERE staff_id= ' + req.params.id2 + ' AND customer_id = ' + req.params.id3 + ' AND inventory_id = ' + req.params.id4, function(err,rows,fields) {
	if(err) throw_err(err,res);
	res.json({'rental': rows});
	});

});

router.get('/staff/:id2/inventory/:id3/customer/:id4', function(req, res) {	
	//var db = req.sql;	
	//console.log(req.params);
	sql.query('SELECT * FROM rental WHERE staff_id= ' + req.params.id2 + ' AND inventory_id = ' + req.params.id3 + ' AND customer_id = ' + req.params.id4, function(err,rows,fields) {
	if(err) throw_err(err,res);
	res.json({'rental': rows});
	});

});

//POST

router.post('/', function(req, res) {
    query = 'INSERT INTO rental (rental_id,rental_data,inventory_id,customer_id,staff_id,return_data,last_update) VALUES (?,?,?,?,?,?,?)';
    params = [req.body.rental_id, req.body.customer_id,req.body.staff_id,req.body.rental_data,req.body.inventory_id,req.body.return_data,req.body.last_update]
    sql.query(query, params, function(err, rows, fields) {
        if (err) throw_err(err, res);
        res.json({ 'success': 1 });
    });
});

//PUT

router.put('/:id', function(req, res) {
    query = 'UPDATE payment SET customer_id = ?,staff_id = ?,rental_data = ?,inventory_id = ?,return_data = ?,last_update = ? WHERE rental_id = ?';
    params = [req.params.id, req.body.customer_id,req.body.staff_id,req.body.rental_data,req.body.inventory_id,req.body.return_data,req.body.last_update]
    sql.query(query, params, function(err, rows, fields) {
        if (err) throw_err(err, res);
        res.json({ 'success': 1 });
    });
});


module.exports = router;
