import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { Dashboard } from "./screens/dashboard";
import App from "./App";
import { Calender } from "./screens/calender";
import TimeReport from "./screens/timereport";
import SignUp from "./screens/signup";
import SignIn from "./screens/login";

export const AppRouter = () => {
  return (
    <Router>
      <Stack />
    </Router>
  );
};

const Stack = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/calender" element={<Calender />} />
      <Route path="/" element={<App />} />
      <Route path="/timereport" element={<TimeReport/>} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/login" element={<SignIn/>} />
    </Routes>
  );
};
