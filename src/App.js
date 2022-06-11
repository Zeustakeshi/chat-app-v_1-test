import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import AuthProvider from "./Context/AuthProvider";
import Login from "./pages/Login";
import Chat from "./pages/ChatRoom";
import AppProvider from "./Context/AppProvider";
function App() {
    return (
        <Router>
            <div className='App'>
                <AuthProvider>
                    <AppProvider>
                        <Routes>
                            <Route path='/' element={<Chat />} />
                            <Route path='/login' element={<Login />} />
                        </Routes>
                    </AppProvider>
                </AuthProvider>
            </div>
        </Router>
    );
}

export default App;
