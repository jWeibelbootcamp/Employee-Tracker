const db = require('./db/connection');
const inquirer = require('inquirer');

const mainMenu = () => {
    inquirer.prompt({ type: 'list', name: 'task', message: 'Select your desired task.', choices: ['View Departments', 'View Roles', 'View Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee', 'Delete Department', 'Delete Role', 'Delete Employee', 'Quit'] })
        .then(({ task }) => {
            if (task === 'View Departments') {
                viewDepartments();
            } else if (task === 'View Roles') {
                viewRoles();
            } else if (task === 'View Employees') {
                viewEmployees();
            } else if (task === 'Add Department') {
                addDepartment();
            } else if (task === 'Add Role') {
                addRole();
            } else if (task === 'Add Employee') {
                addEmployee();
            } else if (task === 'Update Employee') {
                updateEmployee();
            } else if (task === 'Delete Department') {
                deleteDepartment();
            } else if (task === 'Delete Role') {
                deleteRole();
            } else if (task === 'Delete Employee') {
                deleteEmployee();
            } else {
                process.exit();
            };
        });
};

// Viewing functions: 
const viewDepartments = () => {
    db.promise().query("SELECT * FROM department").then(([response]) => {
        console.table(response);
        mainMenu()
    });
};

const viewRoles = () => {
    db.promise().query("SELECT * FROM role LEFT JOIN department ON role.dept_id=department.id").then(([response]) => {
        console.table(response);
        mainMenu()
    });
};

const viewEmployees = () => {
    db.promise().query("SELECT CONCAT(employee.first_name, ' ', employee.last_name) AS Employee, role.title AS Title, role.salary AS Salary, CONCAT (manager.first_name, ' ', manager.last_name) AS Manager, department.dept_name AS Department FROM employee LEFT JOIN role ON employee.role_id=role.id LEFT JOIN department ON role.dept_id=department.id LEFT JOIN employee manager ON manager.id=employee.manager_id").then(([response]) => {
        console.table(response);
        mainMenu()
    });
};

// Adding functions: 
const addDepartment = () => {
    inquirer.prompt({ type: 'input', name: 'name', message: 'Enter department name.' }).then(answer => {
        db.promise().query("INSERT INTO department SET ?", { dept_name: answer.name })
            .then(([response]) => {
                if (response.affectedRows > 0) {
                    viewDepartments();
                } else {
                    console.info('Failed to add department.');
                    mainMenu();
                };
            });
    });
};

const addRole = async () => {
    const [departments] = await db.promise().query('SELECT * FROM department')
    const departmentArray = departments.map(({ id, dept_name }) => ({ name: dept_name, value: id }));

    inquirer.prompt([{ type: 'input', name: 'role', message: 'What is the new role?' }, { type: 'input', name: 'salary', message: 'Enter the salary.' }, { type: 'list', name: 'department', message: 'Please select the department.', choices: departmentArray }]).then(answer => {
        db.promise().query("INSERT INTO role SET ?", { title: answer.role, salary: answer.salary, dept_id: answer.department })
            .then(([response]) => {
                if (response.affectedRows > 0) {
                    viewRoles();
                } else {
                    console.info('Failed to add role.');
                    mainMenu();
                };
            });
    });
};

const addEmployee = async () => {
    const [roles] = await db.promise().query('SELECT * FROM role');
    const rolesArray = roles.map(({ id, title }) => ({ name: title, value: id }));

    const [employees] = await db.promise().query('SELECT * FROM employee');
    const employeeArray = employees.map(({ id, first_name, last_name }) => ({ name: first_name + ' ' + last_name, value: id }));

    // Will allow for an unmanaged employee.
    const employeeNone = [...employeeArray, { name: 'None', value: null }];

    inquirer.prompt([{ type: 'input', name: 'first', message: 'Enter first name.' }, { type: 'input', name: 'last', message: 'Enter last name.' }, { type: 'list', name: 'role', message: 'Please select the role.', choices: rolesArray }, { type: 'list', name: 'manager', message: 'Select the manager.', choices: employeeNone }]).then(answer => {
        db.promise().query("INSERT INTO employee SET ?", { first_name: answer.first, last_name: answer.last, role_id: answer.role, manager_id: answer.manager })
            .then(([response]) => {
                if (response.affectedRows > 0) {
                    viewEmployees();
                } else {
                    console.info('Failed to add employee.');
                    mainMenu();
                };
            });
    });
};

// Updating functions: 
const updateEmployee = async () => {
    const [employees] = await db.promise().query('SELECT * FROM employee');
    const employeeArray = employees.map(({ id, first_name, last_name }) => ({ name: first_name + ' ' + last_name, value: id }));

    const [roles] = await db.promise().query('SELECT * FROM role');
    const rolesArray = roles.map(({ id, title }) => ({ name: title, value: id }));

    inquirer.prompt([{ type: 'list', name: 'employee', message: 'Select employee.', choices: employeeArray }, { type: 'list', name: 'role', message: 'Select a new role.', choices: rolesArray }]).then(answer => {
        db.promise().query('UPDATE employee SET ? WHERE employee.id = ?', [{ role_id: answer.role }, answer.employee])
            .then(([response]) => {
                if (response.affectedRows > 0) {
                    viewEmployees();
                } else {
                    console.info('Failed to updated employee information.');
                    mainMenu();
                };
            });
    });
};

// Deleting functions:      not working yet
const deleteDepartment = async () => {
    const [departments] = await db.promise().query('SELECT * FROM department')
    const departmentArray = departments.map(({ id, dept_name }) => ({ name: dept_name, value: id }));
    
    inquirer.prompt([{ type: 'list', name: 'department', message: 'Select Department to Delete:', choices: departmentArray }]).then(answer => {
        db.promise().query("DELETE FROM department WHERE department.id = ?", { dept_name: answer.department })
            .then(([response]) => {
                if (response.affectedRows > 0) {
                    viewDepartments();
                } else {
                    console.info('Failed to delete department.');
                    mainMenu();
                };
            });
    });
};


mainMenu();