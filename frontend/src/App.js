import { BrowserRouter as Router, Route, Routes  } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
// import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";

function App() {
return (
  <Router>
    <Routes>
      <Route exact path="/" Component={Login} />
      <Route path="/register" Component={Register} />
      {/* <Route path="/dashboard" Component={Navbar} /> */}
      <Route path="/dashboard" Component={Dashboard} />
    </Routes>
  </Router>
);
}

export default App;
