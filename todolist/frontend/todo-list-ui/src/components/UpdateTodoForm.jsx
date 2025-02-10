import React, { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import LineDivider from "./LineDivider.jsx"; 
import CheckboxNoUpdate from "./CheckboxNoUpdate.jsx"; 
import "../css/form.css"


function UpdateTodoForm(){

    const navigate = useNavigate();

    const { id } = useParams();

    const [todoitem, setitem] = useState("");
    const [ischeck, setischeck] = useState("");
    const [successMessage, setSuccessMessage] = useState('');


    useEffect(() => {
        fetch(`http://localhost:8000/api/todo/${id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            setitem(data.title)
            setischeck(data.complete)
        })
        .catch(error => console.error('Error:', error));
    }, [id]);

    const updateitem = (event) =>{
        setitem(event.target.value);
    }
    const updatecheck = (event) => {
        setischeck(!ischeck);
    }


    const handleSubmit = (event) =>{
        event.preventDefault();

        fetch(`http://localhost:8000/api/todo/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                title: todoitem,
                complete: ischeck
            }), 
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message)
            setSuccessMessage(data.message)
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    }

    const goback = () =>{
        navigate('/');
    }

    return(
        <form className="update-form" onSubmit={handleSubmit}>
            <button className="btn-icon" title="Go back" onClick={goback}><i class="fa-solid fa-arrow-left"></i></button>
            <h1>Edit Todo Item</h1>
            <LineDivider/>
            <div className="form-control-wrapper">
                <div className="form-controll update-input checkbox-wrapper">
                    <p>Complete</p>
                    <CheckboxNoUpdate ischeck={ischeck} updatecheck={updatecheck}/>
                </div>
                <div className="form-controll update-input">
                    <input id="update"name="update" type="text"
                        value={todoitem}
                        onChange={updateitem} 
                    />
                </div>
                <div className={`success-alert ${successMessage ? 'show' : ''}`}>{successMessage}</div>
                <button className="btn-regular btn-flex center mt-3" type="submit" title="Edit">Edit <i class="fa-solid fa-pencil"></i></button>
            </div>

        </form>
    );
}
export default UpdateTodoForm;