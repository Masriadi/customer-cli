const mongoose = require('mongoose');

// Map global promise - get rid of warning
// mongoose.Promise = global.Promise

// Connect to db
const db = mongoose.connect('mongodb://root:toor@127.0.0.1:27017', {
    dbName: 'customercli',
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// Import model
const Customer = require('./models/customer');

// Add customer
const addCustomer = (customer) => {
    Customer.create(customer).then(customer => {
        console.info("New customer added.")
        mongoose.connection.close()
    })
}

//  Find customer
const findCustomer = (name) => {
    // Make case insensitive
    const search = new RegExp(name, 'i')

    Customer.find({$or: [{firstname: search}, {lastname: search}]})
        .then(customer => {
            console.info(customer)
            console.info(`${customer.length} matched`)
            mongoose.connection.close()
        })
}

// Update customer
const updateCustomer = (_id, customer) => {
    Customer.updateOne({_id}, customer).then(customer => {
        console.info("Customer updated.")
        mongoose.connection.close()
    })
}

// Delete customer
const deleteCustomer = (_id) => {
    Customer.deleteOne({_id}).then(customer => {
        console.info("Customer remove.")
        mongoose.connection.close()
    })
}

// List customer
const listCustomer = () => {
    Customer.find().then(customer => {
        console.info(customer)
        console.info(`${customer.length} customers`)
        mongoose.connection.close()
    })
}

// Export all module
module.exports = {
    addCustomer,
    findCustomer,
    updateCustomer,
    deleteCustomer,
    listCustomer
}