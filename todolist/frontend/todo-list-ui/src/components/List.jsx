import React, { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "../css/list.css"
import CheckBox from "./CheckBox.jsx"; 
import DeleteTodoForm from "./DeleteTodoForm.jsx"; 

function List({ todos, removeItemFromList }){

    const navigate = useNavigate();

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    return(
        <ul className="list">
            {todos.map(todo => (
                <li key={todo.id} className={`item`}>
                    <div className="d-flex">
                        <CheckBox checked={todo.complete} id={todo.id}/>
                        <DeleteTodoForm id={todo.id} removeItemFromList={removeItemFromList}/>
                        <button 
                            className="btn-icon" 
                            title="Edit"
                            onClick={() => handleEdit(todo.id)}>
                                <i class="fa-solid fa-pencil"></i>
                            </button>
                    </div>
                    <p className="title">{todo.title}</p>
                </li>
            ))} 
        </ul>
    );
}
export default List;
