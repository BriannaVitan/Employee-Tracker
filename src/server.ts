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

function addrole() {
  inquirer
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
        type: "input",
        name: "department_id",
        message: "Which department does the role belong to?",
      },
    ])
    .then((role) => {
      db.addroles(role)
        .then(({rows}) => {
          console.log("Role added successfully");
          displayResults(rows);
          mainMenu();
        })
        .catch((err) => {
          console.error("Error adding role:", err);
          mainMenu();
        });
    });
}

function addemployee() {
  inquirer
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
        type: "input",
        name: "role_id",
        message: "What is the employee's role?",
      },
      {
        type: "input",
        name: "manager_id",
        message: "Who is the employee's manager?",
      },
    ])
    .then((employee) => {
      db.addemployee(employee)
        .then(({ rows }) => {
          console.log("Employee added successfully");
          displayResults(rows);
          mainMenu();
        })
        .catch((err) => {
          console.error("Error adding employee:", err);
          mainMenu();
        });
    });
}

function updatemployeerole() {
  inquirer
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
        type: "input",
        name: "role_id",
        message: "Which role do you want to assign to the selected employee?",
      },
    ])
    .then((updateInfo) => {
      db.updatemployeerole(updateInfo)
        .then((rows: any) => {
          console.log("Employee role updated successfully");
          displayResults(rows);
          mainMenu();
        })
        .catch((err: any) => {
          console.error("Error updating employee role:", err);
          mainMenu();
        });
    });
}

// Start the app
mainMenu();