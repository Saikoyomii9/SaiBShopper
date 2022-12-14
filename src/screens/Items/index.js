import React, { useState, useEffect } from 'react';
import  {View, TouchableOpacity, Text, FlatList} from 'react-native';
import Item from '../../components/Item/index';
import { useNavigation } from '@react-navigation/native'
import styles from './styles';
import { openDatabase } from "react-native-sqlite-storage"


const shopperDB = openDatabase({name: 'Shopper.db'});
const itemsTableName = 'Items';

const ItemsScreen = props => {

  const navigation = useNavigation();
  const [items, setItems] = useState([]);

  useEffect(() => {//use effect only wen screen is in focus
    const listener = navigation.addListener('focus', () => {
      
      // declare an empty arry that will store the results of the 
      //SELECT
      let results = [];
      // declare a transaction that will execute the SELECT
      shopperDB.transaction(txn => {
        
        //execute SELECT
        txn.executeSql(
          `SELECT * FROM  ${itemsTableName}`,
          [],
          // cal back function that will handle the results form the SELECT
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
            console.log('Error getting My Items  ' + error.message);
          },
        )
      });
    });

    /*
  [
    {
    id: 1
    name: Comb
    price: 3
    quantity: 1
    },
    {
    id: 2
    name: Popcorn
    price: 1.99
    quantity: 2
    },
    {
    id: 3
    name: Lettuce
    price: 1.34
    quantity: 3
    },
  ]
    */
    return listener;
  });


  return (
    <View style={styles.container}>
      <View>
     <FlatList
          data={items}
          renderItem={({item}) => <Item post={item} />} 
          keyExtractor={item=> item.id}
          />
          </View>
        <View style = {styles.bottom}>
                <TouchableOpacity
                style ={styles.button}
                onPress={()=> navigation.navigate('Add Item')}
                >
                <Text style ={styles.buttonText}> Add item </Text>
                </TouchableOpacity>

        </View>
    </View>
  );

};

export default ItemsScreen;