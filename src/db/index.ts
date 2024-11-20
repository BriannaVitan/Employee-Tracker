import { pool } from "./connection.js";

export default class database {
  [x: string]: any;
  updateemployeerole() {
    throw new Error("Method not implemented.");
  }
  constructor() {}

  async query(sequel: string, args: any[] = []) {
    const client = await pool.connect();
    try {
      const databack = await client.query(sequel, args);
      // console.log(databack);
      return databack;
    } finally {
      client.release();
    }
  }
  async findemps() {
    return this.query(
      "select employee.id, employee.first_name, employee.last_name, role.title, role.salary, role.department_id, department.department_name from employee left join role on employee.role_id = role.id left join department on role.department_id = department.id;"
    );
  }
  async finddep() {
    return this.query(
      "SELECT id, department_name FROM department"
    );
  }

  async findrole() {
    return this.query("SELECT * FROM role;");
  }

  async adddepartment(department: any) {
    return this.query("INSERT INTO department (department_name) values ($1)"
      , [department.department_name]);
  }

  async addroles(role: any) {
    return this.query(
      "INSERT INTO role (title,salary,department_id) values ($1,$2,$3)",
      [role.title, role.salary, role.department_id]
    );
  }

async addemployee(employee: any) {
  return this.query(
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4);",
      [employee.first_name, employee.last_name, employee.role_id, employee.manager_id]
    );
}

async updatemployeerole(employee: any) {
  return this.query(
    "UPDATE employee SET role_id = $1 WHERE id = $2",
    [employee.role_id, employee.id]
  );
}
}