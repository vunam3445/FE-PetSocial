import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AuthPage from "./pages/auth/AuthPage";
import { ProfilePage } from "./pages/ProfilePage";
import { PrivateRoute } from "./routes/PrivateRoute";
import "./assets/css/login-register.css";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile/:id" element={<ProfilePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
