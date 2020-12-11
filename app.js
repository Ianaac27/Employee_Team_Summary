const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Choice = require("inquirer/lib/objects/choice");
const Employee = require("./lib/Employee");

const employeeList = [];

// Asking user for manager info
function managerInfo() {

    return inquirer.prompt([
        {
            message: "What is your manager's name?",
            name: "name",
            type: "input"
        },
        {
            message: "What is your manager's id?",
            name: "id",
            type: "input"
        },
        {
            message: "What is your manager's email?",
            name: "email",
            type: "input"
        },
        {
            message: "What is your manager's office number?",
            name: "officeNumber",
            type: "input"
        }
    ]).then(( managerData ) => {
        const newManger = new Manager( managerData.name, managerData.id, managerData.email, managerData.officeNumber );

        employeeList.push( newManger );

        console.log("Manager Created");
        employeeType();

    });
}

// Asking user if they want to add an employee
function employeeType() {
    return inquirer.prompt([
        {
            message: "Which type of team member would you like to add next?",
            name: "Employee",
            type: "list",
            choices: ["Engineer", "Intern", "I do not wish to any more team members"]
        }

    ]).then(( employeeData ) => {
        if( employeeData.Employee == "Engineer") {
            engineerInfo();
        } 
        else if (employeeData.Employee == "Intern") {
            internInfo();
        }
        else {
            createHTMLFIle();
        }
    });
}

//Asking user for engineer info
function engineerInfo() {
    return inquirer.prompt([
        {
            message: "What is your engineer's name?",
            name: "name",
            type: "input"
        },
        {
            message: "What is your engineer's id?",
            name: "id",
            type: "input"
        },
        {
            message: "What is your engineer's email?",
            name: "email",
            type: "input"
        },
        {
            message: "What is your engineer's GitHub username?",
            name: "github",
            type: "input"
        }
    ]).then(( engineerData ) => {
        const newEngineer = new Engineer( engineerData.name, engineerData.id, engineerData.email, engineerData.github );
        
        employeeList.push( newEngineer );

        console.log("Engineer Created");
        employeeType();
    });
}

//Asking user for intern info
function internInfo() {
    return inquirer.prompt([
        {
            message: "What is your intern's name?",
            name: "name",
            type: "input"
        },
        {
            message: "What is your intern's id?",
            name: "id",
            type: "input"
        },
        {
            message: "What is your intern's email?",
            name: "email",
            type: "input"
        },
        {
            message: "What school did your intern go to?",
            name: "school",
            type: "input"
        }
    ]).then(( internData ) => {
        const newIntern = new Intern( internData.name, internData.id, internData.email, internData.school );
        
        employeeList.push( newIntern );

        console.log("Intern Created");
        employeeType();
    });
}

//Create team.html file and send to output folder
function createHTMLFIle() {
    const htmlContent = render( employeeList );

    fs.writeFile("./output/team.html", htmlContent, (err) => {
        if (err) console.log("Failed to write file");
        else console.log("Wrote file.");
    })
}

//Initiate application
managerInfo();
