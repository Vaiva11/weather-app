import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, Favorites } from "./pages";
import { Header, Footer } from "./components";
import "./index.scss";

class App extends React.Component {
  render() {
    return (
      <div className="AppLayout">
        <Router>
          <Header />
          <main>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/favorites" component={Favorites} />
            </Switch>
          </main>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
