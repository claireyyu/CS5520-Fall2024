import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'

const GoalUsers = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const url = "https://jsonplaceholder.typicode.com/users";
      
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
    
        const json = await response.json();
        setUsers(json);
        console.log(json);
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