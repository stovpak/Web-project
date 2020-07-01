import React,{Component}from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link
} from "react-router-dom";
import SignIn from "./components/signIn/SignIn";
import SignUp from "./components/signUp/SignUp";
import MainPage from "./components/Main-Page/Home";
import Cookies from "universal-cookie";
import CreateTopic from "./components/topics/createTopic";
import Profile from "./components/userProfile/Profile";
import ChangeEmail from "./components/changeData/ChangeEmail";
const cookies = new Cookies();

export default class App extends Component{
    render() {
        const isAuth=cookies.get('sessionToken');
        return(
            <Router >
                <Switch>
                    {/*<Route exact path="/" component={() => isAuth?<Redirect to={"/homePage"}/>:<Redirect to={"/sign-in"}/>}/>*/}
                <Route path={"/sign-up"} component={SignUp}/>
                <Route path={"/sign-in"} component={SignIn}/>
                    <Route path={"/topic"} component={MainPage}/>
                    <Route path={'/create-topic'} component={CreateTopic}/>
                    <Route exact  path={"/profile"} component={Profile} />
                    <Route path={"/profile/change-email"} component={ChangeEmail}/>
                </Switch>
            </Router>
        )
    }
}
