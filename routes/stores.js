
var express = require('express');
var router = express.Router();

function throw_err(err, res) {
    res.json({ 'error': {
        message: err.message,
        error: err
    }});
    throw err;
}

/* GET store listing. */

//ran on localhost:3000/stores/1 
router.get('/:id', function(req, res) {	
	//var db = req.sql;	
	sql.query('SELECT * FROM store WHERE store_id=' + req.params.id, function(err,rows,fields) {
	if(err) throw_err(err,res);
	res.json({'store': rows});
	});

});

//Post
router.post('/', function(req, res) {
    query = 'INSERT INTO store (store_id,manager_staff_id,address_id,last_update) VALUES (?,?,?,?)';
    params = [req.body.store_id, req.body.manager_staff_id,req.body.address_id,req.body.last_update]
    sql.query(query, params, function(err, rows, fields) {
        if (err) throw_err(err, res);
        res.json({ 'success': 1 });
    });
});

/*
 * PUT stores/id.
 */
// localhost:3000/stores/1
router.put('/:id', function(req, res) {
    query = 'UPDATE store SET last_update= ?,address_id=? WHERE store_id = ?';
    params = [req.body.last_update,req.body.address_id,req.params.id]
    sql.query(query, params, function(err, rows, fields) {
        if (err) throw_err(err, res);
        res.json({ 'success': 1 });
    });
});

//e.g http://localhost:3000/stores?offset=0&limit=10

module.exports = router;
