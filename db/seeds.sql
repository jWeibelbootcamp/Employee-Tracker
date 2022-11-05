INSERT INTO department(dept_name) VALUES("Accounting"), ("Sales"), ("Legal");

INSERT INTO role(title, salary, dept_id) VALUES("Accountant", 50000, 1), ("Salesman", 40000, 2), ("Lawyer", 85000, 3);

INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("Henry", "Notadog", 1, NULL), ("Josephine", "Thehound", 2, NULL), ("Terry", "Hogan", 3, NULL), ("Lex", "Luger", 3, 2), ("Dwayne", "Therock", 2, 1), ("Randy", "Savage", 1, 0); 