import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useState , useEffect  , useLayoutEffect} from "react";
  import { IconButton } from "react-native-paper";
  import { uuid } from "react-native-uuid";
  import Fallback from "../components/Fallback";
  import { useNavigation , useRoute } from '@react-navigation/native'
import axios from 'axios'
const API_BASE_URL = 'http://localhost:3000';
  
  console.log(Date.now().toString());
  
  const TodoScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const userToken = route.params?.userToken;
   const headers = {
    Authorization: `Bearer ${userToken}`, 
  };

    const [todo, setTodo] = useState("");
    const [todoList, setTodoList] = useState([]);
    const [editedTodo, setEditedTodo] = useState(null);

 
   
      const fetchTodos = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/Todo/todos`, { headers });
          setTodoList([...todoList, response.data]);
        } catch (error) {
          console.error("Failed to fetch todos:", error);
        }
      };
  
    const handleAddTodo = async () => {

      if (todo === "") {
        return; // early return
      }
      try {
        const response = await axios.post(`${API_BASE_URL}/Todo/todos`, { text: todo } , { headers });
        setTodoList([...todoList, {id :response.data.id, title :response.data.text}]);
        setTodo('');
    // to get   todo list from this user 
        // const newTask = { id: response.data.id, title: response.data.text };
        // setTodoList([...todoList, newTask]);
        // setTodo("");
        
        // // Fetch the updated todos immediately after adding a new task
        // const updatedTodosResponse = await axios.get(`${API_BASE_URL}/Todo/todos`, { headers });
        // setTodoList(updatedTodosResponse.data);

         
      } catch (error) {
        console.error('Failed to create a new todo:', error);
      }

    };
  
    const handleDeleteTodo = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/Todo/todos/${id}`, { headers });
            const updatedTodoList = todoList.filter((todo) => todo.id !== id);
            setTodoList(updatedTodoList);
          } catch (error) {
            console.error('Failed to delete the todo:', error);
          }
    };
  
  
    const handleEditTodo = (todo) => {
      setEditedTodo(todo);
      setTodo(todo.title);
    };
  
  
    const handleUpdateTodo = async() => {

        if (!editedTodo) return;

     try {
    const response = await axios.put(`${API_BASE_URL}/Todo/todos/${editedTodo.id}`, { text: todo }, { headers });
    const updatedTodos = todoList.map((item) => (item.id === editedTodo.id ? { ...item, title: todo } : item));
    setTodoList(updatedTodos);
    setEditedTodo(null);
    setTodo('');
  } catch (error) {
    console.error('Failed to update the todo:', error);
  }
        
    };

    // useEffect(() => {
    //     fetchTodos();
    //   }, []);

    const renderTodos = ({ item, index }) => {
      return (
        <View style={styles.background}>
          <Text style={styles.text}> {item.title}  </Text>
  
                <IconButton
                    icon="pencil"
                    iconColor="#fff"
                    onPress={() => handleEditTodo(item)}
                />
                <IconButton
                    icon="trash-can"
                    iconColor="#fff"
                    onPress={() => handleDeleteTodo(item.id)}
                />
        </View>
      );
    };
    return (
      <View style={{ marginHorizontal: 16, marginTop: 40 }}>
        <TextInput
          style={styles.textInput}
          placeholder="Add a task"
          value={todo}
          onChangeText={(userText) => setTodo(userText)}
        />
  
        {editedTodo ? (
          <TouchableOpacity
            style={styles.todo}
            onPress={() => handleUpdateTodo()}
          >
            <Text style={styles.font}>
              Save
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.todo}
            onPress={() => handleAddTodo()}
          >
            <Text style={styles.font}>
              Add
            </Text>
          </TouchableOpacity>
        )}
  
        {/* Render todo list */}
  
        <FlatList data={todoList} renderItem={renderTodos} />
  
        {todoList.length <= 0 && <Fallback />}
      </View>
    );
  };
  
  export default TodoScreen;
  
  const styles = StyleSheet.create({

    background:{
        backgroundColor: "#1e90ff",
            borderRadius: 6,
            paddingHorizontal: 6,
            paddingVertical: 8,
            marginBottom: 12,
            flexDirection: "row",
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 3,
    },
    text:{
        color: "#fff", fontSize: 20, fontWeight: "800", flex: 1 
    },
    textInput :{
        borderWidth: 2,
        borderColor: "#000",
        borderRadius: 6,
        paddingVertical: 8,
        paddingHorizontal: 16,
      },
      todo:{
        backgroundColor: "#000",
        borderRadius: 6,
        paddingVertical: 12,
        marginVertical: 34,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
      },
      font:{
        color: "#fff", fontWeight: "bold", fontSize: 20
      }

  });