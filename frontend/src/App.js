import { BrowserRouter as Router, Route, Routes  } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
return (
  <Router>
    <Routes>
      <Route exact path="/" Component={Login} />
      <Route path="/register" Component={Register} />
    </Routes>
  </Router>
);
}

export default App;
