INSERT INTO department(dept_name) VALUES ("Sales"), ("Accounting"), ("Engineering"), ("Legal");

INSERT INTO role(title, salary, dept_id) VALUES("Salesperson", 40000, 1), ("Accountant", 60000, 2), ("Engineer", 70000, 3), ("Lawyer", 85000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("Henry", "Notadog", 1, NULL), ("Josephine", "Thehound", 2, NULL), ("Terry", "Hogan", 3, NULL), ("Dwayne", "Therock", 4, NULL), ("Lex", "Luger", 3, 3), ("Ric", "Flair", 2, 2), ("Randy", "Savage", 1, 1), ("Sting", "Nolastname", 4, 4); 