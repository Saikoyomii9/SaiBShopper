import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import Item from '../../components/Item';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';


import { openDatabase} from "react-native-sqlite-storage"
const shopperDB = openDatabase({name: 'Shopper.db'});
const itemsTableName = 'Items';
const listItemsTableName = 'list_items';


const ViewListItemsScreen= props => {

  const post = props.route.params.post;

  const [items, setItems] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {//use effect only wen screen is in focus
    const listener = navigation.addListener('focus', () => {
      
      // declare an empty arry that will store the results of the 
      //SELECT
      let results = [];
      // declare a transaction that will execute the SELECT
      shopperDB.transaction(txn => {
        
        //execute SELECT
        txn.executeSql(
          `SELECT items.id, name, price, quantity FROM ${itemsTableName},
          ${listItemsTableName} WHERE items.id = item_id AND list_id = ${post.id}`,
          [],
          // call back function that will handle the results form the SELECT
          (_, res) => {
            
            // get number of rows of data selected 
            let len = res.rows.length;
            console.log('Length of Items ' + len);
            // check if more than one ro was returned
            if (len > 0) {
              // loop through the rows 
              for (let i = 0; i < len; i++) {
                // push a row of data at a time
                let item  = res.rows.item(i);
                results.push({
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  quantity: item.quantity,
                  list_id: post.id,
                });
                }
                //assign the results array to the lists table
                setItems(results);

              } else {
                //if no rows are returned set the lists state variable to an empty array
                setItems([]);
              }
            },
            error => {
              console.log('Error getting Items  ' + error.message);
            },
          )
        });
      });
      return listener;
    });




  return (
    <View style={styles.container}>
      <FlatList
          data={items}
          renderItem={({item}) => <Item post={item} />} 
          keyExtractor={item=> item.id}
          />
    </View>
  );
};

export default ViewListItemsScreen;