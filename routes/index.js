var express = require('express');
var router = express.Router();
var mysql = require('mysql');





// Connect Database
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'awesome_db'
});
connection.connect();



/* Index */
router.get('/', function(req, res, next) {

	connection.query('SELECT * FROM message', function (error, results, fields) {

		// If error, Show Error then stop work process 
		if ( error ) {
			res.send( error );
			return false;
		}

		// Show Index Page and Send data
		res.render('index', { result: results });

	});

});



/* Add Message Page */
router.post('/add_message', function(req, res, next) {

	// Get Data from index to Variable
	var data = {
		name: req.body.name,
		text: req.body.message
	};

	// Add to Database
	connection.query('INSERT INTO message SET ?', data, function (error, results, fields) {

		// If error, Show Error then stop work process 
		if ( error ) {
			res.send( error );
			return false;
		}

		// Show Added Page
		res.render('added');

	});

});



/* Delete Message Page */
router.get('/delete_message', function(req, res, next) {

	// Get Data from index to Variable
	var id_message = req.query.id;

	// Delete from Database
	connection.query('DELETE FROM message WHERE id = ?', id_message, function (error, results, fields) {

		// If error, Show Error then stop work process 
		if ( error ) {
			res.send( error );
			return false;
		}

		// Show Added Page
		res.render('deleted');

	});

});



/* Not Important, Just auto repage to index if not send data */
router.get('/add_message', function(req, res, next) {

	res.redirect('./');

});





module.exports = router;
