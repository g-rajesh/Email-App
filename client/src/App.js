import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import "./index.css";
import Home from "./components/Home";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Modal from "./Util/Modal";
import { useGlobalContext } from "./store/context";

const App = () => {
  const data = useGlobalContext();
  console.log(data);

  return (
    <div className="App">
      {data.data.showModal && <Modal />}
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
