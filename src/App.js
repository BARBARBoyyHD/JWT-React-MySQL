import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import Homepage from "./pages/homePage";
import Login from "./pages/login";
import Register from "./pages/register";
import ProtectedRoutes from "./security/ProtectedRoutes";
import Profile from "./pages/profile";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/profile"
            element={
              <ProtectedRoutes>
                <Profile />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
