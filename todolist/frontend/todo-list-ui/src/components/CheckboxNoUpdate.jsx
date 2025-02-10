function CheckboxNoUpdate({ ischeck,updatecheck}){
    return(
        <label class="container">
            <input 
                type="checkbox" 
                id="checkbox" 
                checked={ischeck}
                onChange={updatecheck}
                name="check">
            </input>
            <span class="custom-checkbox"></span>
        </label>
    )
}
export default CheckboxNoUpdate;