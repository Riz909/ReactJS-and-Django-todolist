import "../css/paper.css"
import React, { useState,useEffect } from "react";
import Header from "./header.jsx"; 
import LineDivider from "./LineDivider.jsx"; 
import AddTodoForm from "./AddTodoForm.jsx";
import List from "./List.jsx"; 

function Paper(){

    //code for getting todoitems
    const [todos, setTodos] = useState([]);

    useEffect(()=>{
        fetch("http://localhost:8000/api/todo/")
        .then((reponse) => reponse.json())
        .then((data)=> {
            setTodos(data)
        })
    }, []);


    // Add a new todo to the list
    const additemTolist = (newTodo) => {
        setTodos([...todos, newTodo]);
    };

    // Remove a todo by its id
    const removeItemFromList = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };


    return(
        <section className="paper">
            <Header/>
            <AddTodoForm additemTolist={additemTolist}/>
            <LineDivider/>
            <List todos={todos} removeItemFromList={removeItemFromList}/>
        </section>
    );
}
export default Paper;