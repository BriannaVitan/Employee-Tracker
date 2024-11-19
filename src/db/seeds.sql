-- Insert departments
INSERT INTO department (department_name)
VALUES 
  ('Marketing'),
  ('Finance'),
  ('Customer service'),
  ('Sales'),
  ('IT');

-- Insert roles
INSERT INTO role (title, salary, department_id)
VALUES 
  ('Marketing Manager', 60000, 1),
  ('Sales Representative', 50000, 2),
  ('Customer Service Manager', 60500 , 3),
  ('Marketing Representative', 40000, 1),  
  ('Web Developer', 75000, 5);

-- Insert employees
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
  ('Brianna','Jackson', 1, null), 
  ('Ike', 'Buyers', 3, null), 
  ('Marianna','Vitan', 2, null), 
  ('Jesus','Jose', 2, 3),
  ('Leo','Jackson', 4, 1),
  ('Jake','Lamar', 4, 1),
  ('Nathalie','Mary', 5, null);
