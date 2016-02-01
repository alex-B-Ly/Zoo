// REQ vars
var mysql = require('mysql');
var prompt = require('prompt');

// DB connect
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'zoo_db'
});

prompt.message = '';

prompt.start;

// ZOO OBJECT
var zoo = {
  welcome: function(){
    console.log('Welcome to the Zoo And Friends App~!');
  }
};