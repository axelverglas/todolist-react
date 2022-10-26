import React, { useState, useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import Todo from './Todo';
import { db } from './firebase';
import { query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc } from 'firebase/firestore';


const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-blue-400 to-purple-500`,
  container: `max-w-md m-auto bg-white rounded-lg shadow-md overflow-hidden md:max-w-2xl p-4`,
  heading: `text-black text-3xl font-semibold p-4 text-center`,
  form: `flex items-center`,
  input: `flex-1 appearance-none rounded border border-gray-300 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent`,
  button: `ml-4 p-2 rounded-full bg-blue-600 text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50`,
  count: `text-center p-4`,
  error: `flex w-full rounded bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-4 mt-4`,
};

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  //gestion des erreur champ vide
  // enlever le message d'erreur si le champ est rempli
  const [error, setError] = useState(false);
  // Create Todo
  const addTodo = async (e) => {
    e.preventDefault();
    if(input === ''){
      setError(true);
      return;
    }
    await addDoc(collection(db, 'todos'), {
      text: input,
      completed: false,
    });
    setInput('');
  };

  // Read todos
  const Read = () => {
    const q = query(collection(db, 'todos'));
    const unsubcribe = onSnapshot(q, (querySnapshot) => {
      const todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({...doc.data(), id: doc.id});
      });
      setTodos(todosArr);
    });
    return () => unsubcribe;
  }
  // Update todo
  const updateTodo = async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed,
    });
  }
  // Delete todo
  const removeTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
  }

  // Remaining todos
  const todosRemaining = todos.filter(todo => !todo.completed).length;

  useEffect(() => {
    Read();
  }, []);
  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Liste des tâches</h3>
        <form onSubmit={addTodo} className={style.form}>
          <input value={input} onChange={(e)=> setInput(e.target.value) & setError(false)} className={style.input} type="text" placeholder='Ajouter une tâche'/>
          <button className={style.button} type="submit"><AiOutlinePlus/></button>
        </form>
        {error && <div className={style.error}>Veuillez entrer une tâche</div>}
        <ul>
          {todos.map((todo, index) => (
            <Todo key={index} todo={todo} toggleComplete={updateTodo} removeTodo={removeTodo}/>
          ))}
        </ul>
        {todosRemaining < 1 ? null : <p className={style.count}>{todosRemaining} {todosRemaining > 1 ? 'tâches' : 'tâche'} restante</p>}
      </div>
    </div>
  );
}

export default App;
