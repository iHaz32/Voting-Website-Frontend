import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Main from "./pages/Main";
import Info from "./pages/Info";
import Login from "./pages/Login";
import Passwords from "./pages/Passwords";
import Voting from "./pages/Voting";
import AddNominee from "./pages/AddNominee";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/home" element={<Main />} />
                <Route path="/info" element={<Info />} />
                <Route path="/voting" element={<Voting />} />
                <Route path="/login" element={<Login />} />
                <Route path="/passwords" element={<Passwords />} /> 
                <Route path="/addNominee" element={<AddNominee />}  /> 
            </Routes>
        </BrowserRouter>
    )
}

export default App;