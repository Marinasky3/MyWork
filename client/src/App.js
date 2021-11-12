import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@material-ui/core';
import { DashBoardPage } from './Pages/DashBoardPage/DashBoardPage'
import {TablePage} from './Pages/TablePage/TablePage'
import { LayoutContainer } from './components/LayoutContainer/LayoutContainer';
import {WidthLimiter} from './components/WidthLimiter/WidthLimiter' 
import { Header } from './components/Header/Header';
import SignUp from './Containers/SignUp/SignUp';
import React, { Component } from 'react';
import {AddSat} from './Containers/AddSat/AddSat'
// import logo from './logo.svg';
import './App.css';
// import SignIn from ';
import {SignIn} from './Containers/signIn/SignIn';
import { Button } from '@material-ui/core';
import red from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import RecoverPass from './Containers/RecoverPass/RecoverPass'
import NewPassword from './Containers/NewPassword/NewPassword';

import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';

import {Loader} from './components/Loader/Loader'
import {useState, useEffect} from 'react'

//const login = localStorage.getItem('login') === 'true';

const App = () => {


        const [ isAuthenticated, setIsAuthenticated]= useState(false) 

        useEffect(() => { 

            const idToken = localStorage.getItem('login');
            // console.log('idToken', idToken)
            // console.log('layout refresh !!!!!!!!!!!!!!!!!!!!!!')
            // idToken
            // console.log('isAuthenticated', isAuthenticated)
            // if(!idToken || idToken==="false") return;
            // if(idToken==="true")setIsAuthenticated(true);
            if(idToken==="true"){
              setIsAuthenticated(true);
            }
            if(idToken==="false"){
              setIsAuthenticated(false);
            }

        }, []);


  return (
    <div className="App">
       <BrowserRouter>
        <ErrorBoundary>
          
              {/* <LayoutContainer> */}
              {/* {({ isAuthenticated, setIsAuthenticated }) => ( */}
                <>
                 {isAuthenticated &&
                    
                    <WidthLimiter>
                      < Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
                      <Switch>
                          <Route path="/conjunctions">
                            <TablePage setIsAuthenticated={setIsAuthenticated}/>
                            {/* < Loader /> */}
                          </Route>  
                          <Route path="/dashboard">
                            <DashBoardPage setIsAuthenticated={setIsAuthenticated}/>
                        </Route>
                        <Redirect to="/dashboard" />
                      </Switch> 
                      </WidthLimiter>                    
                  }
                  { !isAuthenticated &&
                    <><Switch>
                        <Route path="/" exact>
                          <SignIn setIsAuthenticated={setIsAuthenticated}/>
                        </Route>
                        <Route path="/SingUp">
                          < SignUp setIsAuthenticated={setIsAuthenticated}/>
                        </Route>
                        <Route path="/RecoverPass">
                          < RecoverPass setIsAuthenticated={setIsAuthenticated}/>
                        </Route>
                        <Route path="/NewPassword">
                          < NewPassword setIsAuthenticated={setIsAuthenticated}/>
                        </Route>
                       <Redirect to="/" />
                      </Switch>
                    </>
                  }
                </>
              {/* )} */}
              {/* </LayoutContainer> */}
          </ErrorBoundary>
        </BrowserRouter>  
    </div>
  );
}

export default App;







