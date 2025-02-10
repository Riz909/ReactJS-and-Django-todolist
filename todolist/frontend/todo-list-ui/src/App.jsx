
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UpdateTodoForm from "./components/UpdateTodoForm.jsx"; 
import Paper from "./components/Paper.jsx";


function App() {

  return(
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Paper/>} />
          <Route path="/edit/:id" element={<UpdateTodoForm/>} />
        </Routes>
      </Router>
    </>
  );
}


export default App
