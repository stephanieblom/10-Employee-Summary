    const express = require( "express" );
    const inquirer = require( 'inquirer' );
    var mysql = require("mysql");
    const cTable = require('console.table');

    // const PORT = 8080;
    // const app = express();

    // class Database {
    //     constructor( config ) {
    //         this.connection = mysql.createConnection( config );
    //     }
    //     query( sql, args=[] ) {
    //         return new Promise( ( resolve, reject ) => {
    //             this.connection.query( sql, args, ( err, rows ) => {
    //                 if ( err )
    //                     return reject( err );
    //                 resolve( rows );
    //             } );
    //         } );
    //     }
    //     close() {
    //         return new Promise( ( resolve, reject ) => {
    //             this.connection.end( err => {
    //                 if ( err )
    //                     return reject( err );
    //                 resolve();
    //             } );
    //         } );
    //     }
    //   }
    // at top INIT DB connection
    var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "Root1234",
        database: "employee_summary"
      });

      connection.connect(function(err){
        if (err) throw err;
        console.log("connected as id " + connection.threadId);
        main();
      })

    //app.use(bodyParser.urlencoded({ extended: false }));

    // app.listen(PORT, function() {
    //   console.log(`App running on: http://localhost:${PORT}`);
    // });

    async function repeat(){

      let repeatPrompt = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'Would you like to do anything else? ',
        choices: ['Yes', 'No']
      });

      if (repeatPrompt.action === 'Yes') {
        console.log(`Returning to Main Menu ...`)
        main();
      }else{
        console.log( `Thank you for using the Employee Management System, Please press ctrl C to Log Out ....`)
      }
      


    }

    async function main(){

      let actionPrompt = await inquirer.prompt({
          type: 'list',
          name: 'action',
          message: 'Would you like view information, input new information, or edit existing information? ',
          choices: ['View Information', 'Input New Information', `Update and Employee's Role`]
        });



      //View Company Information 
      async function viewRequest(){
        let viewPrompt = await inquirer.prompt({
          type: 'list',
          name: 'action',
          message: 'What would you like to view? ',
          choices: ['Employees', 'Departments', 'Roles']
        });

        console.log('You chose to view', viewPrompt.action);
        if (viewPrompt.action === 'Employees') {
          console.log('Displaying Employees...');
          var query = connection.query("SELECT * FROM employee LEFT JOIN role ON(employee.role_id = role.id)", function(err, res) {                       
            if (err) throw err;
            let values = [];
            for (var i = 0; i < res.length; i++) {
              let employee = { first_name: res[i].first_name, last_name: res[i].last_name, title: res[i].title, manager_id: res[i].manager_id }
              values.push(employee);
            }
          console.table([], values);
          repeat();
          });
        } else if(viewPrompt.action === 'Departments') {
              console.log('Displaying Departments...');
              var query = connection.query("SELECT * FROM department", function(err, res) {
                if (err) throw err;
                let values = [];
                for (var i = 0; i < res.length; i++) {
                  let department = { id: res[i].id, name: res[i].name}
                  values.push(department);
                }
              console.table([], values);
              repeat();
            });
          }
             else {
              console.log('Displaying Roles...');
              var query = connection.query("SELECT * FROM role LEFT JOIN department ON(role.department_id = department.id)", function(err, res) {
                if (err) throw err;
                let values = [];
                for (var i = 0; i < res.length; i++) {
                  let role = { title: res[i].title, salary: res[i].salary, department: res[i].name }
                  values.push(role);
                }
              console.table([], values);
              repeat();
            });
          }
      }

      //Input Data 
      async function inputData(){
        let inputPrompt = await inquirer.prompt({
          type: 'list',
          name: 'action',
          message: 'What would you like to input? ',
          choices: ['Employee', 'Department', 'Role']
        });

        if (inputPrompt.action === 'Employee') {
          console.log('You will be adding an Employee...');

          //Prompt employee information
          const employeeData = await inquirer.prompt([
            { name: 'first_name', type: 'input', message: `What is the employee's first name?` },
            { name: 'last_name', type: 'input', message: `What is the employee's last name?` },
            { name: 'role_id', type: 'input', message: 'What is their role id?' },
            { name: 'manager_id', type: 'input', message: `What is their manager's id?` },
        ]);

        let first_name = employeeData.first_name;
        let last_name = employeeData.last_name;
        let role_id = employeeData.role_id;
        let manager_id = employeeData.manager_id;

          var query = connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",[`${first_name}`,`${last_name}`,`${role_id}`,`${manager_id}`], function(err, res) {
            if (err) throw err;
          console.table(`${first_name} ${last_name} has been inputted into the system...`);
          repeat();
          });

        } else if(inputPrompt.action === 'Department') {
            console.log('You will be adding a new Department...');

            //Prompt department information
            const departmentData = await inquirer.prompt([
              { name: 'name', type: 'input', message: `What is the name of the new department that you would like to add?` }
            ]);

            let name = departmentData.name;

              var query = connection.query("INSERT INTO department (name) VALUES (?)",[`${name}`], function(err, res) {
                if (err) throw err;
              console.table(`${name} has been inputted into the system...`);
              repeat();
              });
              } else {
              console.log('You will be adding a new Department...');

              //Prompt role information
              const roleData = await inquirer.prompt([
                { name: 'title', type: 'input', message: `What is the title of the role?` },
                { name: 'salary', type: 'input', message: `What is the salary for this role?` },
                { name: 'department_id', type: 'input', message: `What department id is this role under?` }
              ]);

              let title = roleData.title;
              let salary = roleData.salary;
              let department_id = roleData.department_id;

                var query = connection.query("INSERT INTO role (title, salary, department_id) VALUES (?,?,?)",[`${title}`, `${salary}`, `${department_id}`], function(err, res) {
                  if (err) throw err;
                console.table(`${title} has been inputted into the system...`);
                repeat();
                });

            }
      }

      //Edit Employee's Role
      async function editData(){
        var editPrompt = await inquirer.prompt(
          { name: 'id', type: 'input', message: `Please input the id of the employee who's role you would like to edit?` },
        );
        let id = editPrompt.id;
        let name ="";

        async function employeeRole(){
        var editEmployee = await inquirer.prompt(
          { name: 'role_id', type: 'input', message: `Please input ${name}'s new role id` },
        );
          let role_id = editEmployee.role_id;

          var query = connection.query(`UPDATE employee SET role_id = '${role_id}' WHERE id = ${id}`, function(err, res) {
            if (err) throw err;
          console.table(`${name}'s new role has been saved to the system...`);
          repeat();
          });
        }

        var query = connection.query("SELECT * FROM employee WHERE id=?", [`${id}`],function(err, res) {
          if (err) throw err;
          console.log( `You will be editing ${res[0].first_name} ${res[0].last_name}`)
          name = res[0].first_name
          
          employeeRole();
        });
      }


    async function initialPrompt(){
          if (actionPrompt.action === 'View Information') {
            console.log('You chose to view information'); 
            await viewRequest();
            } else if(actionPrompt.action === 'Input New Information') {
                console.log('You chose to input new information');
                await inputData();
              } else {
                console.log('You chose to update and employee role');
                await editData();
              }
        };

        initialPrompt();
    }
    // main();
