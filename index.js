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

// Don't feel like typing console log over and over
function cl(str){
  console.log(str);
}

prompt.message = '';

prompt.start;

// ZOO OBJECT
var zoo = {
  welcome: function(){
    cl('Welcome to the Zoo And Friends App~!');
  },
  menu: function(){
    cl('Enter (A): ------> to Add a new animal to the Zoo!');
    cl('Enter (U): ------> to Update info on an animal in the Zoo!');
    cl('Enter (V): ------> to Visit the animals in the Zoo!');
    cl('Enter (D): ------> to Adopt an animal from the Zoo!\r\n');
    cl('Enter (Q): ------> to Quit and exit the Zoo!');
  }
};

zoo.menu();