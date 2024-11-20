import inquirer from "inquirer";
import database from "./db/index.js";


const db = new database();

// Utility function to display results in a table
function displayResults(rows: any[]) {
  console.log(rows);
  console.table(rows);
}

function mainMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
          { name: "View all departments", value: "viewdepartments" },
          { name: "View all roles", value: "viewroles" },
          { name: "View all employees", value: "viewemployees" },
          { name: "Add a department", value: "adddepartment" },
          { name: "Add a role", value: "addrole" },
          { name: "Add an employee", value: "addemployee" },
          { name: "Update an employee's role", value: "updatemployeerole" },
          { name: "Exit", value: "byebyeexit"},
        ],
      },
    ])
    .then((response) => {
      switch (response.choice) {
        case "viewdepartments":
          viewdepartments();
          break;
        case "viewroles":
          viewroles();
          break;
        case "viewemployees":
          viewemployees();
          break;
        case "adddepartment":
          adddepartment();
          break;
        case "addrole":
          addrole();
          break;
        case "addemployee":
          addemployee();
          break;
        case "updatemployeerole":
          updatemployeerole();
          break;
      }
    });
}

function viewdepartments() {
  db.finddep()
    .then(({ rows }) => {
      displayResults(rows);
      mainMenu();
    })
    .catch((err) => {
      console.error("Error fetching departments:", err);
      mainMenu();
    });
}

function viewroles() {
  db.findrole()
    .then(({ rows }) => {
      displayResults(rows);
      mainMenu();
    })
    .catch((err) => {
      console.error("Error fetching roles:", err);
      mainMenu();
    });
}

function viewemployees() {
  db.findemps()
    .then(({ rows }) => {
      displayResults(rows);
      mainMenu();
    })
    .catch((err) => {
      console.error("Error fetching employees:", err);
      mainMenu();
    });
}

function adddepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department_name",
        message: "What is the name of the department?",
      },
    ])
    .then((department) => {
      db.adddepartment(department)
        .then(({ rows }) => {
          console.log("Department added successfully");
          displayResults(rows);
          mainMenu();
        })
        .catch((err) => {
          console.error("Error adding department:", err);
          mainMenu();
        });
    });
}

async function addrole(){
  try {
    let {rows} = await db.query('SELECT id as value, department_name as name FROM department')
    let answers = await inquirer
        .prompt([
          {
            type: "input",
            name: "title",
            message: "What is the name of the role?",
          },
          {
            type: "input",
            name: "salary",
            message: "What is the salary of the role?",
          },
          {
            type: "list",
            name: "department_id",
            choices: rows,
            message: "Which department does the role belong to?",
          },
        ])
    await db.addroles(answers)
    mainMenu();
  } catch (error) {
    console.log(error) 
    mainMenu();
  } 
}

async function addemployee(){
  try {
    let roles = await db.query('SELECT id as value, title as name FROM role;')
    let managers = await db.query(`SELECT id as value, CONCAT(first_name,' ', last_name) name FROM employee where manager_id IS null`)  
    console.log(roles)
    console.log(managers)
    let answers = await inquirer
        .prompt([
          {
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?",
          },
          {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name?",
          },
          {
            type: "list",
            name: "role_id",
            choices: roles.rows,
            message: "What is the employee's role?",
          },
          {
            type: "list",
            name: "manager_id",
            choices: managers.rows,
            message: "Who is the employee's manager?",
          },
        ])
    await db.addemployee(answers)
    mainMenu();
  } catch (error) {
    console.log(error) 
    mainMenu();
  } 
}

async function updatemployeerole(){
  try {
    let employees = await db.query(`SELECT id as value, CONCAT(first_name,' ', last_name) name FROM employee`)  
    let roles = await db.query('SELECT id as value, title as name FROM role;') 
    console.log(employees)
    console.log(roles)
    let answers = await inquirer
        .prompt([
          {
            type: "list",
            name: "role_id",
            choices: employees.rows,
            message: "Which employee's role do you want to update?",
          },
          {
            type: "list",
            name: "manager_id",
            choices: roles.rows,
            message: "Which role do you want to assign the selected employee?",
          },
        ])
        await db.updatemployeerole(answers)
        mainMenu();
      } catch (error) {
        console.log(error) 
        mainMenu();
      } 
    }


// Start the app
mainMenu();