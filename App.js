import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View, Button, SafeAreaView, Alert, ScrollView, FlatList } from "react-native";
import Header from "./Components/Header";
import { useState } from "react";
import Input from "./Components/Input";

export default function App() {
  const appName = "My app!";
  const [input, setInput] = useState("");
  const [goals, setGoals] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);


  function handleInputData(inputData) {
    console.log("app.js: " + inputData);
    // declare a new js object
    const newGoal = {
      id: Math.random().toString(),
      text: inputData,
    };
    // update state based on a previous state
    // const newArray = [...goals, newGoal];
    // console.log(newArray);
    // setGoals(newArray);
    // use updater function
    // async?
    setGoals((prevGoals) => {
      return [...prevGoals, newGoal];
    });
    setInput(inputData);
    setIsModalVisible(false);
  }

  function handleModalVisibility() {
    console.log("Modal visibility: " + isModalVisible);
    setIsModalVisible(true);
  }

  function handleAlert() {
    Alert.alert('Do you want to hide the modal', 'Press on OK to confirm', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => setIsModalVisible(false)},
    ]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.topView}>
        <Header name={appName}></Header>
        <Input textInputFocus={true} inputHandler={handleInputData} modalVisible={isModalVisible} alertHandler={handleAlert} />
        <Button title="Add a goal" onPress={handleModalVisibility}></Button>
      </View>
      <View style={styles.bottomView}>
        <FlatList data={goals} contentContainerStyle={styles.contentContainer} renderItem={({item}) => {
          console.log(item);
          return (<View key={item.id} style={styles.textContainer}>
            <Text style={styles.textStyle}>{item.text}</Text>
          </View>)
        }}>
          {/* <ScrollView contentContainerStyle={styles.contentContainer}> */}
          {/* {goals.map((goal) => {
            return (<View key={goal.id} style={styles.textContainer}>
              <Text style={styles.textStyle}>{goal.text}</Text>
            </View>)
          })} */}
          {/* </ScrollView> */} 
        </FlatList>
      
        
        {/* <View style={styles.textContainer}>
          <Text style={styles.textStyle}>{input}</Text>
        </View> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    color: "black",
    fontSize: 50,
    textAlign: "center",
  },
  topView: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  bottomView: {
    flex: 4,
    backgroundColor: "lavender",
  },
  textContainer: {
    marginTop: 5,
    borderRadius: 5,
    backgroundColor: "white",
    padding: 50,
  }
});