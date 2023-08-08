import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";


import { Auth } from "./pages/auth";
import Home from "./pages/home"
import  Saved  from "./pages/saved";
import { Navbar } from "./components/Navbar";
import Addrecipe from "./pages/addrecipe";
import Myrecipes from "./pages/myrecipes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




function App() {
  return (
    <div className="app">
     <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <Router>
      <Navbar />
     
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/addrecipe" element={<Addrecipe />} />
          <Route path="/saved-recipes" element={<Saved />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/myrecipes" element={<Myrecipes />}/>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
