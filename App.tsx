import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [completedTodos, setCompletedTodos] = useState([]);
  const [showCompletedList, setShowCompletedList] = useState(false);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);

    if (updatedTodos[index].completed) {
      // Tamamlanan görevi ayrı bir listeye taşı
      setCompletedTodos([...completedTodos, updatedTodos[index]]);
    } else {
      // Görev tamamlanmadıysa, tamamlanan listesinden çıkar
      setCompletedTodos(completedTodos.filter((todo) => todo !== updatedTodos[index]));
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Yeni görev ekle"
        value={newTodo}
        onChangeText={(text) => setNewTodo(text)}
      />
      <TouchableOpacity style={styles.button} onPress={addTodo}>
        <Text style={styles.buttonText}>Ekle</Text>
      </TouchableOpacity>

      <Text style={styles.headerText}>Aktif Görevler</Text>
      
      
      <FlatList
        data={todos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
       
            <TouchableOpacity onPress={() => toggleTodo(index)}>
               {!item.completed && (
              <View >
                <Text style={styles.todoItem}>
                  {  item.text }
                </Text>
              </View>
              )}
            </TouchableOpacity>
          
        )}
      />

      <TouchableOpacity onPress={() => setShowCompletedList(!showCompletedList)}>
        <Text style={styles.headerText}>
           {showCompletedList ? 'Kapat' : 'Tamamlanan Görevler'}
        </Text>
      </TouchableOpacity>
      {showCompletedList && (
        <FlatList
          data={completedTodos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => toggleTodo(index)}>
              <View style={styles.completedTodoItem}>
                <Text style={{ textDecorationLine: 'line-through' }}>{item.text}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    borderBottomColor: '#787878',
    backgroundColor: '#f4f4f4',
    padding: 16,
    borderRadius: 8,
    color: 'gray',
    fontFamily: 'Avenir-Medium',
    
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6610f2',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign:"center",
  },
  todoItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  completedTodoItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#f0f0f0',
  },
});

export default TodoApp;
