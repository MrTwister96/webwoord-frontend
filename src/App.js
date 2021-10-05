import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// Pages
import HomePage from "./pages/HomePage/HomePage";
// Styles
import "./App.css";

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/">
                    <HomePage />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
