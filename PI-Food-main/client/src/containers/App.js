import React from 'react';
import { Route } from 'react-router-dom';
import Landing from '../components/Landingpage/Landingpage.jsx'
import Home from '../components/Home/Home.jsx'
import Details from '../components/Details/Details.jsx'
import Form from '../components/Form/Form.jsx'
import './App.css';

function App() {
    return (
        <div>
            <Route exact path = '/'>
                <Landing/>
            </Route>
            <div>
                <Route exact path = '/home'>
                    <Home/>
                </Route>
                <Route path = '/detail/:id'>
                    <Details/>
                </Route>
                <Route path = '/create'>
                    <Form/>
                </Route>
        
            </div>
        </div>
    );
}

export default App;
