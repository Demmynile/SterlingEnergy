import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Receipt from "./pages/Receipt";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import { RequireAuthAdmin } from "./utils/privateRoutes";



function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/preview" element={<Receipt />} />
          <Route path="/admin" element={<RequireAuthAdmin redirectTo="/login"><Admin /></RequireAuthAdmin>} />
          <Route path="/login" element={<Login/> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
