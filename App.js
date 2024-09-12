import { StyleSheet, Text, View } from 'react-native';
import Header from './Components/Header';

export default function App() {
  const appName = "my App";
  return (
    <View style={styles.container}>
      < Header name={appName} >
        <Text>child 1</Text>  
        <Text>child 2</Text> 
      </Header>
    </ View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
