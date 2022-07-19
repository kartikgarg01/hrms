'use strict'
let allEmployees = [];
let forms = document.getElementById('form');
let card = document.getElementById('cadDiv');
let sectionEl = document.getElementById('cardSection');


// constructor
function Employee(id, name, aadhar, department, level, image, salary) {
  this.employeeId = id;
  this.fullName = name;
  this.aadhar = aadhar;
  this.department = department;
  this.level = level;
  this.image = image;
  this.salary = salary;
  allEmployees.push(this);
}

Employee.prototype.render = function () {
  let card = document.createElement('div');
  card.classList = ('cardDiv');
  sectionEl.appendChild(card);
  // create image for employee
  let imageEl = document.createElement('img');
  imageEl.classList = ('card-img-top');
  imageEl.src = this.image;
  imageEl.alt = 'profilePic';
  card.appendChild(imageEl);

  // create name for employee
  let name = document.createElement('h5');
  name.classList = ('card-title');
  name.textContent = this.fullName;
  card.appendChild(name);

  // create Department, Level, salary, Id for employee
  let paragraph = document.createElement('p');
  paragraph.classList = ('card-text');
  paragraph.textContent = `ID: ${this.employeeId} \n Aadhar: ${this.aadhar} \n - Department: ${this.department} \n - Level: ${this.level} \n - salary: ${this.salary} JD`;
  card.appendChild(paragraph);
};



Employee.prototype.id = function () {
  return Math.floor(1000 + Math.random() * 9000);

};

// create a new employee
/*let employee_1 = new Employee('1000', 'Ghazi Samer', 'Administration', 'Senior', "../assets/Ghazi.jpg", '1700');
let employee_2 = new Employee('1001', 'Lana Ali', 'Finance', 'Senior', '../assets/Lana.jpg', '1500');
let employee_3 = new Employee('1002', 'Tamara Ayoub', 'Marketing', 'Senior', '../assets/Tamara.jpg', '1900');
let employee_4 = new Employee('1003', 'Safi Walid', 'Administration', 'Mid-Senior', '../assets/Safi.jpg', '1300');
let employee_5 = new Employee('1004', 'Omar Zaid', 'Development', 'Senior', `../assets/Omar.jpg`, '2000');
let employee_6 = new Employee('1005', 'Rana Saleh', 'Development', 'Junior', '../assets/Rana.jpg', '700');
let employee_7 = new Employee('1006', 'Hadi Ahmad', 'Finance', 'Mid-Senior', '../assets/Hadi.jpg', '1400');*/




function renderC() {
  for (let i = 0; i < allEmployees.length; i++) {
    allEmployees[i].render();
  }
}

Employee.prototype.salary = function () {
  let net = 0;
  let min = 0;
  let max = 0;
  if (`${this.level}` === 'Senior') {
    min = 1500;
    max = 2000;
    net = (Math.floor(Math.random() * (max - min + 1)) + min);
  } else if (`${this.level}` === 'Mid-Senior') {
    min = 1000;
    max = 1500;
    net = (Math.floor(Math.random() * (max - min + 1)) + min);
  } else {
    min = 500;
    max = 1000;
    net = (Math.floor(Math.random() * (max - min + 1)) + min);
  } return `${net - (net * (7.5 / 100))}`;
};


// create a new Event Listener

forms.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  console.log("Kartik");

  let id = Employee.prototype.id();
  let fullName = event.target.fname.value;
  let aadhar = event.target.aadhar.value;
  let department = event.target.floatingSelect1.value;
  let level = event.target.floatingSelect2.value;
  let image = event.target.formFile.value;
  let salary = event.target.salary.value;


  let newEmployee = new Employee(id, fullName,aadhar, department, level, image, salary);

  newEmployee.render();

  saveData(newEmployee);

};

function saveData(data) {
  let stringfiyData;
  let dataFromLocal = JSON.parse(localStorage.getItem('employeeItem'));
  if (dataFromLocal != null) {
    dataFromLocal.push(data);
    stringfiyData = JSON.stringify(dataFromLocal);
  } else {
    stringfiyData = JSON.stringify([data]);

  } localStorage.setItem('employeeItem', stringfiyData);
};

function getData() {
  let retrievedData = localStorage.getItem('employeeItem');
  let arrayData = JSON.parse(retrievedData);
  if (arrayData != null) {
    for (let i = 0; i < arrayData.length; i++) {
      new Employee(arrayData[i].id, arrayData[i].fullName, arrayData[i].department, arrayData[i].level, arrayData[i].image, arrayData[i].salary);
    }
  }
  renderC();
}
getData();
