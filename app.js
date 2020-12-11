const Manager = require("./lib/Manager");
// const Engineer = require("./lib/Engineer");
// const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Choice = require("inquirer/lib/objects/choice");

const employeeList = [];

function askUserForManagerInfro() {

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

        createHTMLFIle();

        // askUserForEmployeeType();

    });
}


//console log line breaks or colors to show different set of prompts.

// function askUserForEmployeeType() {
//     return inquirer.prompt([
//         {
//             message: "Name",
//             name: "name",
//             type: "list"
           
//         }
//     ]).then(( employeeData ) => {

//         //If they selected a new Engineer
//         askUserForEngineerInfo(); 

//         //ELSE if the user selected a new intern
//         askUserForInternInfo();

//         //ELSE create Output

//         createHTMLFIle();

//     });
// }

// function askUserForEngineerInfo() {
//     return inquirer.prompt([
//         {
//             message: "Name",
//             name: "name",
//             type: "input"
//         }
//     ]).then(( engineerData ) => {

//     });
// }

// function askUserForInternInfo() {
//     return inquirer.prompt([
//         {
//             message: "Name",
//             name: "name",
//             type: "input"
//         }
//     ]).then(( internData ) => {

//     });
// }


const fileNumber = 1;

function createHTMLFIle() {
    const htmlContent = render( employeeList );

    fs.writeFile("./output/team.html", htmlContent, (err) => {
        if (err) console.log("Failed to write file");
        else console.log("Wrote file.");
    })


}

askUserForManagerInfro();
