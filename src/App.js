import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// Utils
import { connectToSocketIoServer } from "./utils/socketio";
// Pages
import HomePage from "./pages/HomePage/HomePage";
import RoomPage from "./pages/RoomPage/RoomPage";
import CreateStream from "./pages/CreateStream/CreateStream";

const App = () => {
    useEffect(() => {
        connectToSocketIoServer();
    }, []);

    return (
        <Router>
            <Switch>
                <Route path="/room">
                    <RoomPage />
                </Route>
                <Route path="/create-stream">
                    <CreateStream />
                </Route>
                <Route path="/">
                    <HomePage />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
