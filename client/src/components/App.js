import React from 'react';
import { Route } from 'react-router-dom';
import Voting from './Voting';
import Results from './Results';

export default class App extends React.Component {
    render() {
        return <div>
            <Route path="/" 
                render={() => <Voting {...this.props}/>} 
            /> 
            <Route path="/results" 
                render={() => <Results {...this.props} />}
            />
        </div>;
    }
}