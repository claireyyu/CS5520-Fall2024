import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import { writeToDB, readAll } from '../Firebase/firestoreHelper';

const GoalUsers = ({goalId}) => {

  const [users, setUsers] = useState([]);
  const collectionName = 'goals';
  const subCollectionName = 'users';

  useEffect(() => {
    async function fetchData() {
      const url = "https://jsonplaceholder.typicode.com/users";
      
      try {
        // if there is, don't fetch data from the server and just set users with the data
        // if there isn't, fetch data from the server
        const allUsers = await readAll(`${collectionName}/${goalId}/${subCollectionName}`);
        if (allUsers.length > 0) {
          setUsers(allUsers);
          return;
        }

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
    
        const jsonData = await response.json();
        setUsers(jsonData);

        jsonData.forEach((user) => {
          writeToDB(user, `${collectionName}/${goalId}/${subCollectionName}`);
        });

        console.log(jsonData);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchData();
  }, []);

  const Item = ({name}) => (
    <View>
      <Text>{name}</Text>
    </View>
  );

  return (
    <View>
      <FlatList
        data={users}
        renderItem={({item}) => <Item name={item.name} />}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

export default GoalUsers