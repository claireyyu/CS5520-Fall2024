import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View, Button, SafeAreaView, Alert, ScrollView, FlatList } from "react-native";
import { useState } from "react";
import Header from "./Header";
import Input from "./Input";
import GoalItem from "./GoalItem";
import PressableButton from "./PressableButton";

export default function Home({ navigation }) {
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
    // async
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

  function goalDeleteHandler(deletedID) {
    setGoals((prevGoals) => {
      return prevGoals.filter((goal) => goal.id !== deletedID);
    });
  }

  function handleDeleteAll() {
    Alert.alert('Do you want to delete all goals', 'Press on OK to confirm', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => setGoals([]) },
    ]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.topView}>
        <Header name={appName}></Header>
        <Input textInputFocus={true} inputHandler={handleInputData} modalVisible={isModalVisible} alertHandler={handleAlert} />
        <PressableButton
          pressedFunction={handleModalVisibility}
        >
          <Text style={styles.buttonText}>Add a goal</Text>
        </PressableButton>
        {/* <Button title="Add a goal" onPress={handleModalVisibility}></Button> */}
      </View>
      <View style={styles.bottomView}>
      <FlatList
        data={goals}
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item }) => {
          console.log(item);
          return <GoalItem item={item} handleDelete={goalDeleteHandler}/>;
        }}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>No Goals to Show</Text>
        )}
        ListHeaderComponent={() =>
          goals.length !== 0 && <Text style={styles.headerText}>My Goal List</Text>
        }
        ListFooterComponent={() =>
          goals.length !== 0 && <Button title="Delete All" onPress={handleDeleteAll} />
        }
        ItemSeparatorComponent={() => <View style={styles.separator}></View>}
      />
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
  },
  emptyText: {
    fontSize: 20,
    color: "gray",
    textAlign: "center",
    marginTop: 20,
    padding: 8,
  },
  headerText: {
    fontSize: 20,
    color: "purple",
    textAlign: "center",
    marginTop: 20,
    padding: 8,
    marginBottom: 10,
  },
  separator: {
    height: 4,
    backgroundColor: 'grey',
    borderWidth: 1,
    borderColor: 'grey',
    marginVertical: 5,
  },
  buttonText: {
    color: "white",
    backgroundColor: "purple",
    fontSize: 20,
    padding: 10,
  },
});