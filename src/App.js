import "./App.css";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Header from "./components/Header";

import Home from "./screens/Home";
import CharacterView from "./screens/CharacterView";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <main id="content" role="main" className="container">
          <Switch>
            <Route path="/character/:id" component={CharacterView} />
            <Route exact path="/" component={Home} />
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
