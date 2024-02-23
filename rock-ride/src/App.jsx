import { Route, Routes } from "react-router-dom";
import "./App.css";
import {Signin, Login} from "./views";

function App() {

  return (
    <>
      <div>
        <Routes>

          <Route exact path="/signin" element={<Signin/>} />

          <Route exact path="/login" element={<Login/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;

