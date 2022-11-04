const db = require('./db/connection');
const inquirer = require('inquirer');

const mainMenu = () => {
    inquirer.prompt({ type: 'list', name: 'task', message: 'select your desired task.', choices: ['view departments', 'view roles', 'view employees'] })
    .then(({ task }) => {
        if(task === 'view departments') {
            viewDepartments();
        } else if (task === 'view roles') {
            viewRoles();
        } else if (task === 'view employees') {
            viewEmployees();
        } else {
            process.exit();
        };
    });
};

const viewDepartments = () => {
    db.promise().query("SELECT * FROM department").then(([response]) => {console.table(response);
    mainMenu()});
};

const viewRoles = () => {
    db.promise().query("SELECT * FROM role LEFT JOIN department ON role.dept_id=department.id").then(([response]) => {console.table(response);
    mainMenu()});
};

const viewEmployees = () => {
    db.promise().query("SELECT CONCAT(employee.first_name, ' ', employee.last_name) AS Employee, role.title AS Title, role.salary AS Salary, department.dept_name AS Department FROM employee LEFT JOIN role ON employee.role_id=role.id LEFT JOIN department ON role.dept_id=department.id").then(([response]) => {console.table(response);
    mainMenu()});
};

mainMenu();