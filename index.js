// REQ vars
var mysql = require('mysql');
var prompt = require('prompt');

// DB connect
  // TEST - Change database back to zoo_db when done testing
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'zoo_test'
});

// Don't feel like typing console log over and over
function cl(str){
  console.log(str);
}

prompt.start;
prompt.message = '';

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
  },
  add: function(input_scope){
    // TEST - change this below back to input_scope
    var currentScope = this;
    cl('To add an animal to the zoo please fill out the following form for us!');

    // TEST remove caretaker id references from query and newAnimal vars
    prompt.get(['careid', 'name', 'type', 'age'], function(err, result){
      var query = 'INSERT INTO animals (caretaker_id, name, type, age) VALUES (?,?,?,?);';
      var newAnimal = [result.careid, result.name, result.type, result.age];

      connection.query(query, newAnimal, function(err, res){
        if(err){ throw err; }

        cl(result.name + ' was involuntarily thrown into the zoo for milkshake drinking visitors to ogle.');
      });

      currentScope.menu();
      // currentScope.promptUser();

    });
  }
};

zoo.add();
