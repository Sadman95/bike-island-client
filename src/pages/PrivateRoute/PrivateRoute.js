import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import useAuth from '../../hooks/useAuth/useAuth';

const PrivateRoute = ({children, ...rest}) => {
    const {user, isLoading} = useAuth();

    if(isLoading){
        return <>
            <img style={{ margin: 'auto', display: 'table'}} src="https://i.ibb.co/R2tS1bh/graphloader.gif" alt="preloader" />
        </>
    }

    return (
        <Route
        {...rest}
        render= {({location}) =>
            user.email ? 
            children
            :
            <Redirect
            to = {
                {
                    pathname: '/login',
                    state: {from : location}
                }
            }
            />
        }
        >

        </Route>
    );
};

export default PrivateRoute;