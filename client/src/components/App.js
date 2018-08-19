import React from 'react';
import { hot } from 'react-hot-loader';
import { Route } from 'react-router-dom';
import { VotingContainer } from './Voting';
import { ResultsContainer } from './Results';

export default class App extends React.Component {
    render() {
        return <div>
            <Route path="/" 
                render={() => <VotingContainer {...this.props}/>} 
            /> 
            <Route path="/results" 
                render={() => <ResultsContainer {...this.props} />}
            />
        </div>;
    }
}