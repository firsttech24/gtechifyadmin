/** @format */

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Mentors from "./pages/Mentors";
import MentorProfile from "./components/mentors/profileMentor";
import PortalPage from "./pages/PortalPage";
import LoginForm from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Mentors />}></Route>
        <Route
          path="/mentor"
          element={<MentorProfile />}
        />
        <Route
          path="/portal"
          element={<PortalPage />}
        />
        <Route
          path="/login"
          element={<LoginForm />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
