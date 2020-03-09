import React from "react";

import Header from "./components/shared/Header/Header";
import About from "./components/About/About";
import Home from "./components/Home/Home";
import MyQuests from "./components/Quests/MyQuests/MyQuests";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory,
} from "react-router-dom";

import {connect, Provider} from "react-redux";
import store from "./redux/store"
import mapStateToProps from "react-redux/es/connect/mapStateToProps";
import mapDispatchToProps from "react-redux/es/connect/mapDispatchToProps";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Header/>
                <Switch>
                    <Route exact path={"/"}>
                        <Home/>
                    </Route>
                    <Route exact path={"/about"}>
                        <About/>
                    </Route>
                    <Route exact path={"/myQuests"}>
                        <MyQuests/>
                    </Route>
                </Switch>
            </Router>
        </Provider>
    );
}

export default App
