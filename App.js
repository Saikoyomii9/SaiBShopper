/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import type {Node} from 'react';
import Router from './src/navigation/Router';
//bcrypt is a secure way to save passwords in a database
//its algorithms encrypt a password into a long 
//String of characters called a has, that is almost impossible
//to decryot
//it makes a database more secure - if someone hacks
//into it, they wont be abke to steal the users passwords
import bcrypt from 'react-native-bcrypt';
import { openDatabase} from "react-native-sqlite-storage"

const db = require('./src/components/Handlers/database.js');

const shopperDB = openDatabase({name: 'Shopper.db'});
const usersTableName = 'users';

//create a salt that will be used by bcrypt when creating the hash
//a salt is a random value that will kbe appended to the
//apassword before its encrypted to make it more secure.
let salt = bcrypt.genSaltSync()

const App: () => Node = () => {
  try {
    db.createListsTable();
  } catch (error) {
    console.log('Failed to create lists table ' + error);
  }

  try {
    db.createItemsTable();
  } catch (error) {
    console.log('Failed to create items table ' + error);
  }

  try {
    db.createListItemsTable();
  } catch (error) {
    console.log('Failed to create List items table ' + error);
  }

  try {
    db.createUsersTable();
  } catch (error) {
    console.log('Failed to create Users table ' + error);
  }
  return <Router />;
  create the has using reactNativeBcrypt
 try{ 
  let hash = bcrypt.hashSync(EmmaRose1105)
  //db.createUsersTable
 } 
}catch (error) {
  console.log('failed to create users table ' + error);

}

};

export default App;
