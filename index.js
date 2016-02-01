var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'zoo_db'
});


// TEST
connection.query('SELECT * FROM caretakers WHERE id=1', function(err, data){
  if(err){throw err;}

  console.log(data);
});