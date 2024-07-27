import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";

function App() {
  const auth = useAuth();
  return (
    <main>
      <Routes>
        <Route path="/" element={<Landing />} />
        {auth?.isLoggedin && auth.user && (
          <Route path="/home" element={<Home />} />
        )}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;
