import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AuthPage from "./pages/auth/AuthPage";
import { ProfilePage } from "./pages/ProfilePage";
import { PrivateRoute } from "./routes/PrivateRoute";
import { Home } from "./pages/Home";
import { SearchPage } from "./pages/SearchPage";
import { ChatProvider } from "./Provider/ChatProvider";
import "./assets/css/login-register.css";
import { ChatModalsContainer } from "./components/molecules/ChatModalsContainer";
function App() {
  return (
    <ChatProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/" element = {<Home/>}/>
          <Route path="/search" element = {<SearchPage/>}/>
        </Route>
      </Routes>
    </Router>
    <ChatModalsContainer />
    </ChatProvider>
  );
}

export default App;
