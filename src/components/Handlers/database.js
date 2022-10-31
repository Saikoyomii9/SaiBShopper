// import openDatabase hook
import { openDatabase} from "react-native-sqlite-storage"

//use the hook to create database
const shopperDB = openDatabase({name: 'Shopper.db'});
const listsTableName = 'lists';
const itemsTableName = 'Items';
const listItemsTableName = 'list_items';


module.exports = {
        //Declare the function that create the lists table
        createListsTable: async function () {
                //Declare a transaction that will execute a SQL statement
                (await shopperDB).transaction(txn => {
                        //Execute the SQL
                        txn.executeSql(
                                `CREATE TABLE IF NOT EXISTS ${listsTableName}(
                                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                                        name TEXT,
                                        store TEXT,
                                        date TEXT
                                );`,
                                //ARGUMENTS NEEDED WHEN USING  an SQL prepared statemtn
                                [],
                                //CALL BACK FUNCTION TO HANDLE  results of SQL query
                                () => {
                                        console.log(' Lists table created successfully');
                                },
                                error => {
                                        console.log ('Error creating lists table ' + error.message);
                                },

                        );
                });
        },

        // declare function that will insert a row of data into the lists table
        addList: async function (name, store, date) {
                console.log('inAddListFunction');
                //declare  a transaction that will execute an SQL statement
                (await shopperDB).transaction(txn => {
                        //execute the SQL
                        txn.executeSql(
                                `INSERT INTO ${listsTableName} (name, store, date) VALUES ("${name}", "${store}", "${date}")`,
                                //arguments passed when using SQL prepared statement
                                [],
                                // callback function to handle results of SQL query
                                () => {
                                        console.log(name + ' added successfully');
                                },
                                error => {
                                console.log('Error  adding list ' + error.message);
                                },
                        );
                });
        },
        
        createItemsTable: async function () {
                //Declare a transaction that will execute a SQL statement
                (await shopperDB).transaction(txn => {
                        //Execute the SQL
                        txn.executeSql(
                                `CREATE TABLE IF NOT EXISTS ${itemsTableName}(
                                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                                        name TEXT(100),
                                        price REAL,
                                        quantity INTEGER
                                );`,
                                //ARGUMENTS NEEDED WHEN USING  an SQL prepared statemtn
                                [],
                                //CALL BACK FUNCTION TO HANDLE  results of SQL query
                                () => {
                                        console.log(' Items table created successfully');
                                },
                                error => {
                                        console.log ('Error creating Items table ' + error.message);
                                },

                        );
                });
        },


        addItem: async function (name, price, quantity) {
                //Insert a row into the items table
                (await shopperDB).transaction(txn => {
                        //execute the SQL
                        txn.executeSql(
                                `INSERT INTO ${itemsTableName} (name, price, quantity) VALUES ("${name}", ${price}, ${quantity})`,
                                //arguments passed when using SQL prepared statement
                                [],
                                // callback function to handle results of SQL query
                                () => {
                                        console.log(name + ' added successfully');
                                },
                                error => {
                                console.log('Error  adding item ' + error.message);
                                },
                        );
                });
        },

        createListItemsTable: async function () {
                //Declare a transaction that will execute a SQL statement
                (await shopperDB).transaction(txn => {
                        //Execute the SQL
                        txn.executeSql(
                                `CREATE TABLE IF NOT EXISTS ${listItemsTableName}(
                                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                                        list_id INTEGER,
                                        item_id INTEGER
                                );`,
                                //ARGUMENTS NEEDED WHEN USING  an SQL prepared statemtn
                                [],
                                //CALL BACK FUNCTION TO HANDLE  results of SQL query
                                () => {
                                        console.log(' List Items table created successfully');
                                },
                                error => {
                                        console.log ('Error creating List Items table ' + error.message);
                                },

                        );
                });
        },


        addListItem: async function (list_id, item_id) {
                //Insert a row into the items table
                (await shopperDB).transaction(txn => {
                        //execute the SQL
                        txn.executeSql(
                                `INSERT INTO ${listItemsTableName} (list_id, item_id) VALUES (${list_id}, ${item_id})`,
                                //arguments passed when using SQL prepared statement
                                [],
                                // callback function to handle results of SQL query
                                () => {
                                        console.log('List Item added successfully');
                                },
                                error => {
                                console.log('Error  adding item ' + error.message);
                                },
                        );
                });
        },




};


