import React, {Component,Fragment} from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'

import {Provider as AlertProvider} from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

import Header from './layouts/Header'
import Dashboard from './leads/Dashboard'

import Alerts from './layouts/Alerts'
import Login from './accounts/Login'
import Register from './accounts/Register'
import PrivateRoute from './common/PrivateRoute'
 
import { Provider} from 'react-redux'
import store from '../store'
import {loadUser} from '../actions/auth'


//alert options
const alertOptions ={
    timeout:3000,
    position: 'top right'
}
class App extends Component {
    componentDidMount(){
        store.dispatch(loadUser())
    }
    
    render() {
        return ( 
        <Provider store={store}>
            <AlertProvider template={AlertTemplate} {...alertOptions}>
                <Router>
                    <Fragment >
                    <Header />
                    <Alerts/>
                        <div className = "container" >
                            <Switch>
                                <PrivateRoute exact path="/" component={Dashboard} />
                                <Route exact path="/register" component={Register} />
                                <Route exact path="/login" component={Login} />
                            </Switch>
                        </div> 
                    </Fragment>
                    </Router>
            </AlertProvider>
        </Provider>
        )
    }
}

ReactDOM.render( < App /> , document.getElementById('app'));