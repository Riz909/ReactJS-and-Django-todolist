import React, { useState } from "react";
import "../css/form.css"


function DeleteTodoForm({ id,removeItemFromList}){

    const [ todo, setTodo] = useState(id);

    const handleSubmit = (e) => {
        e.preventDefault()

        fetch(`http://localhost:8000/api/todo/${todo}/`, {
            method: "DELETE", 
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (response.ok) {
                console.log("Todo item deleted successfully");
                removeItemFromList(todo)
            } else {
                console.error("Error deleting todo item", response);
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }

    return(
        <form onSubmit={handleSubmit}>
            <div className="form-controll">
                <button className="btn-icon" title="Delete" type="submit"><i class="fa-solid fa-trash"></i></button>
            </div>
        </form>
    );
}
export default DeleteTodoForm;