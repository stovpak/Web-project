//проверка авторизован ли ользователь , да -> возвращаем компонент, нет ->  редиректимся на страницу /login
import React from 'react';
import {Route, Redirect} from "react-router-dom";
import {authenticationServise} from "../helpers/athentication";

export const PrivateRoute =({component:Component,role,...rest})=> {
    return (
        <Route {...rest} render={props => {
            const currentUser = authenticationServise.currentUserValue;
            if (!currentUser) {
                return <Redirect to={{pathname: "/Login", state: {from: props.location}}}/>
            }
            return <Component {...props}/>
        }}
        />);

};
export default PrivateRoute;