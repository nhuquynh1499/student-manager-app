var readlineSyc = require('readline-sync');
var fs = require('fs');
const { table } = require('table');

var students = [];
var output = [['Name', 'Age']]

function loadData() {
  var fileContent = fs.readFileSync('./data.json');
  students = JSON.parse(fileContent);
}

function showMenu() {
  console.log('1. Show all students');
  console.log('2. Create a new students');
  console.log('3. Save & Exit');

  var option = readlineSyc.question('> ');
  switch (option) {
    case '1':
      showStudents();
      showMenu();
      break;
    case '2':
      showCreateStudent();
      showMenu();
      break;
    case '3':
      saveAndExit();
      break;
    default:
      console.log('Wrong option');
      showMenu();
      break;
  }
}

function showStudents() {
  for (var student of students) {
    output.push([student.name, student.age]);
  }
  output = table(output);
  console.log(output);
}

function showCreateStudent() {
  var name = readlineSyc.question('Name: ');
  var age = readlineSyc.question('Age: ');
  var student = {
    name: name,
    age: parseInt(age)
  }
  students.push(student);
}

function saveAndExit() {
  var content = JSON.stringify(students);
  fs.writeFileSync('./data.JSON', content);
}

function main() {
  loadData();
  showMenu();
}

main();