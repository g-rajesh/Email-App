import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import "./index.css";
import Home from "./components/Home";
import Signin from "./components/Signin";
import Signup from "./components/Signup";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/sign-up" component={Signup} />
          <Route path="/sign-in" component={Signin} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
