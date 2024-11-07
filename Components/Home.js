import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View, Button, SafeAreaView, Alert, ScrollView, FlatList, Pressable} from "react-native";
import { useEffect, useState } from "react";
import Header from "./Header";
import Input from "./Input";
import GoalItem from "./GoalItem";
import PressableButton from "./PressableButton";
import { database } from "../Firebase/firebaseSetup";
import { writeToDB, deleteFromDB, deleteAll } from "../Firebase/firestoreHelper";
import { onSnapshot, collection, doc, query, where } from "firebase/firestore";
import {auth} from "../Firebase/firebaseSetup";

export default function Home({ navigation }) {
  const user = auth.currentUser;
  const appName = "My app!";
  const [input, setInput] = useState("");
  const [goals, setGoals] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const collectionName = "goals";
  
  // querySnapshot is an array of documentSnapshots
  useEffect(() => {

    const unsubscribe = onSnapshot(query(collection(database, collectionName), where("owner", "==", user.uid)), (querySnapshot) => {
      const currGoals = [];
      querySnapshot.forEach((docSnapshot) => {
        const id = docSnapshot.id;
        currGoals.push({ ...docSnapshot.data(), "id": id });
      })
      setGoals(currGoals);
    }, (error) => {
    console.log("on snapshot", error);
      Alert.alert(error);
    });

    return () => {
      console.log("unsubscribing");
      unsubscribe();
    };
  },[]);

  function handleInputData(data) {
    // declare a new js object
    const newGoal = {
      text: data.text,
      owner: user.uid,
      image: data.imageUri,
    };
    // write to the database
    writeToDB(newGoal, collectionName);
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
    deleteFromDB(deletedID, collectionName);
  }

  function handleDeleteAll() {
    console.log("Delete all goals");
    Alert.alert('Do you want to delete all goals', 'Press on OK to confirm', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      { text: 'OK', onPress: () => deleteAll(collectionName) },
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
          componentStyle={{backgroundColor: 'purple', borderRadius: 10}}
        >
          <Text style={styles.buttonText}>Add a goal</Text>
        </PressableButton>
      </View>
      <View style={styles.bottomView}>
        <FlatList
            data={goals}
            contentContainerStyle={styles.contentContainer}
            renderItem={({ item, separators }) => {
              return (
                <GoalItem
                  item={item}
                  handleDelete={goalDeleteHandler}
                  onPressInHighlight={separators.highlight}
                  onPressOutHighlight={separators.unhighlight}
                />
              );
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
            ItemSeparatorComponent={({ highlighted }) => (
              <View
                style={[
                  styles.separator,
                  highlighted ? styles.highlightedSeparator : null,
                ]}
              />
            )}
          />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    marginVertical: 5,
  },
  highlightedSeparator: {
    backgroundColor: 'purple',
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    padding: 10,
  },
});