USE company_db;

INSERT INTO department(dept_name) VALUES("Accounting"), ("Sales"), ("Legal");
INSERT INTO role(title, salary, dept_id) VALUES("Accountant", 50000, 1), ("Salesman", 40000, 2), ("Lawyer", 70000, 3);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("Henry", "Johnson", 1, NULL), ("Josephine", "Howard", 2, NULL), ("Lukas", "Weibel", 3, NULL); 
