import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Main from "./pages/App";
import Login from "./pages/Login";
import Benif from "./pages/Benif";
import Home from "./pages/Home"
import './index.css';
import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div>
    <BrowserRouter>
        <Layout />
      <Routes>
        
        <Route >
            <Route path="/" element={<Home />} />
          <Route path="main" element={<Main />} />
          <Route path="login" element={<Login />} />
          <Route path="benificiary" element={<Benif />} />
        </Route>
        
      </Routes>
        
         
    </BrowserRouter>
    
    
    </div>
    
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);