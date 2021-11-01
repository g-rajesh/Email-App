import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import "./index.css";
import Home from "./components/Home";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Modal from "./Util/Modal";
import { useGlobalContext } from "./store/context";
import DynamicRoute from "./Util/DynamicRoute";

const App = () => {
  const data = useGlobalContext();
  console.log(data);

  return (
    <div className="App">
      {data.data.showModal && <Modal />}
      <Router>
        <Switch>
          <DynamicRoute path="/sign-up" guest>
            <Signup />
          </DynamicRoute>
          <DynamicRoute path="/sign-in" guest>
            <Signin />
          </DynamicRoute>
          <DynamicRoute exact path="/" authenticated>
            <Home />
          </DynamicRoute>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
