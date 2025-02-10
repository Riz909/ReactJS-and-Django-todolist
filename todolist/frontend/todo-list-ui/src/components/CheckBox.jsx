import React, { useState, useEffect } from "react";
import "../css/checkbox.css"

function CheckBox({ checked, id }){
    const [isChecked, setIsChecked] = useState(checked); 

    useEffect(() => {
        setIsChecked(checked); 
    }, [checked]);

    const handleCheck = () => {
        const newCheckedStatus = !isChecked;  // New checked state (toggled)
        setIsChecked(newCheckedStatus);

        fetch(`http://localhost:8000/api/todo/${id}/`, {
            method: "PATCH", 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                complete: newCheckedStatus
            }), 
        })  
        .then(response => {
            if(response.ok) {
                console.log("Todo item updated successfully");
            }else{
                console.error("Error updating todo item", response);
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });

    };

    return(
        <label class="container">
            <input 
                type="checkbox" 
                id="checkbox" 
                checked={isChecked}
                onChange={handleCheck}
                name="check">
            </input>
            <span class="custom-checkbox"></span>
        </label>
    );
}
export default CheckBox;