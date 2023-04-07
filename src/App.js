import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import "./App.css";
import { Login, Register, Welcome } from "./components";

function App() {
  const { currentUser, isAuthReady } = useAuthContext();
  console.log(currentUser);
  return (
    <div className="App">
      {isAuthReady && (
        <BrowserRouter>
          <Routes>
            <Route
              index
              path="/"
              element={currentUser ? <Welcome /> : <Navigate to="/login" />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
