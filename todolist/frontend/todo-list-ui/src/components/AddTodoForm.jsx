import React, { useState } from "react";
import "../css/form.css"

function AddTodoForm({ additemTolist }){

    const [todo, setTodo] = useState(""); 
        
    const handleChange = (event) => {
        setTodo(event.target.value); // Update the input field value in state
    };

    const handleSubmit = (event) => {
        event.preventDefault(); 
    
        fetch("http://localhost:8000/api/todo/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                title: todo,  
                complete: false 
            }), 
        })
        .then(response => response.json()).then(data => {
            additemTolist(data); 
            setTodo(""); 
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
          <div className="form-controll">
            <input className="mr-1" id="add"name="add" type="text" placeholder="water the plants"
              value={todo}
              onChange={handleChange} 
            />
            <button className="btn-regular" type="submit">Add</button>
          </div>
        </form>
    );
}
export default AddTodoForm;