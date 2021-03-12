const program = require('commander')
const { prompt } = require('inquirer')

const { addCustomer, findCustomer, updateCustomer, deleteCustomer, listCustomer } = require('./index')

// Customers questions
const customerQuestions = [
    {
        type: 'input',
        name: 'firstname',
        message: 'Customer fisrtname : '
    },
    {
        type: 'input',
        name: 'lastname',
        message: 'Customer lastname : '
    },
    {
        type: 'input',
        name: 'phone',
        message: 'Customer phone number : '
    },
    {
        type: 'input',
        name: 'email',
        message: 'Customer email address : '
    }
]

program
    .version('1.0.0')
    .description('Client management sistem');

// Add customer
// program
//     .command('add <firstname> <lastname> <phone> <email>')
//     .alias('a')
//     .description('Add customer')
//     .action((firstname, lastname, phone, email) => {
//         addCustomer({firstname, lastname, phone, email})
//     } );

program
    .command('add')
    .alias('a')
    .description('Add customer')
    .action(() => {
        prompt(customerQuestions).then(answers => addCustomer(answers))
    });

// Find customer
program
    .command('find <name>')
    .alias('f')
    .description('Find customer')
    .action(name => findCustomer(name));

// Update customer
program
    .command('update <_id>')
    .alias('u')
    .description('Update customer')
    .action((_id) => {
        prompt(customerQuestions).then(answers => updateCustomer(_id, answers))
    });

// Delete customer
program
    .command('delete <_id>')
    .alias('d')
    .description('Delete customer')
    .action((_id) => deleteCustomer(_id));

// List customer
program
    .command('list')
    .alias('l')
    .description('List all customer')
    .action(() => listCustomer());

program.parse(process.argv)