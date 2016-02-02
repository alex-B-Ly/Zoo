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
    var currentScope = input_scope;
    cl('To add an animal to the zoo please fill out the following form for us!');

    // Prompts user to add new animal, then inserts it into animals table in zoo_db
    prompt.get(['name', 'type', 'age'], function(err, result){
      var query = 'INSERT INTO animals (name, type, age) VALUES (?,?,?);';
      var newAnimal = [result.name, result.type, result.age];

      connection.query(query, newAnimal, function(err, res){
        if(err){ throw err; }

        cl(result.name + ' was involuntarily thrown into the zoo for milkshake drinking visitors to ogle.');
      });

      currentScope.menu();
      currentScope.promptUser();
    });
  },
  visit: function(){
    cl('Enter (I): ------> do you know the animal by its id? We will visit that animal!');
    cl('Enter (N): ------> do you know the animal by its name? We will visit that animal!');
    cl('Enter (A): ------> here’s the count for all animals in all locations!');
    cl('Enter (C): ------> here’s the count for all animals in this one city!');
    cl('Enter (O): ------> here’s the count for all the animals in all locations by the type you specified!\r\n');
    cl('Enter (Q): ------> Quits to the main menu!\r\n');

    // View gets called, asks for user input using guide above
    currentScope.view(currentScope);
  },
  view: function(input_scope){
    var currentScope = input_scope;

    cl('Please choose what you would like to visit.');

    prompt.get(['visit'], function(err, result){
      // This obviously points to methods based on choices defined in zoo.visit.  Why is there result.type, etc in the directions?
      if(result.visit === 'Q'){
        currentScope.menu();
      }else if(result.visit === 'O'){
        currentScope.type(input_scope);
      }else if(result.visit === 'I'){
        currentScope.animId(input_scope);
      }else if(result.visit === 'N'){
        currentScope.name(input_scope);
      }else if(result.visit === 'A'){
        currentScope.all(input_scope);
      }else if(result.visit === 'C'){
        currentScope.care(input_scope);
      }else{
        cl('Sorry. Didn\'t get that.  Come again?');
        currentScope.visit();
        currentScope.view(currentScope);
      }
    }); 
  },
  type: function(input_scope){
    var currentScope = input_scope;

    cl('Enter animal type to find how many animals we have of those type.');

    prompt.get(['animal_type'], function(err, result){
      var query = 'SELECT COUNT(type) FROM animals WHERE type=?';
      connection.query(query, result.animal_type, function(err, res){
        cl('We have ' + res[0]['COUNT(type)'] + ' of this animal: ' + result.animal_type +'\r\n');

        // Maybe set a timeout for calls below to give user chance to see how many animals there are.
        currentScope.menu();
        currentScope.promptUser();
      });
    });
  },
  care: function(input_scope){
    var currentScope = input_scope;

    cl('Enter city name NY/SF');

    prompt.get(['city_name'], function(err, result){
      var query = 'SELECT COUNT(*) FROM animals a, caretakers c WHERE a.caretaker_id = c.id AND city = ?';
      connection.query(query, result.city_name, function(err, res){
        cl('There are ' + res[0]['COUNT(*)'] + ' animals being taken care of in ' + result.city_name + '.');

        currentScope.visit();
        currentScope.view(currentScope);
      });
    });
  },
  animId: function(input_scope){
    var currentScope = input_scope;

    cl('Enter ID of the animal you want to visit.');

    prompt.get(['animal_id'], function(err, result){
      var query = 'SELECT * FROM animals WHERE id=?';
      connection.query(query, result.animal_id, function(err, res){
        cl('Animal name: '+res[0].name);
        cl('Animal type: '+res[0].type);
        cl('Animal age: '+res[0].age+'\r\n');

        currentScope.visit();
        currentScope.view(currentScope);
      });
    });
  },
  name: function(input_scope){
    var currentScope = input_scope;

    cl('Enter the name of the animal you want to visit.');

    prompt.get(['animal_name'], function(err, result){
      var query = 'SELECT * FROM animals WHERE name=?';
      connection.query(query, result.animal_name, function(err, res){
        cl('Animal name: '+res[0].name);
        cl('Animal type: '+res[0].type);
        cl('Animal age: '+res[0].age+'\r\n');

        currentScope.visit();
        currentScope.view(currentScope);
      });
    });
  },
  all: function(input_scope){
    // TEST - change zoo back to input_scope on line 157 and uncomment line 163
    var currentScope = zoo;

    connection.query('SELECT COUNT(*) FROM animals', function(err, res){
      cl('There are a total of ' + res[0]['COUNT(*)'] + ' animals in the zoo.\r\n');

      currentScope.menu();
      // currentScope.promptUser();
    });
  }
}; // END Zoo

// TEST
zoo.all();

