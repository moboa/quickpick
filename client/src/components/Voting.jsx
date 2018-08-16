import React from 'react';
import { hot } from 'react-hot-loader';

class Voting extends React.Component {
    getPair() {
        return this.props.pair || [];
    }

    render() {
        return <div className="voting">
            {this.getPair().map(entry => 
                <button key={entry}>
                    <h1>{entry}</h1>
                </button>
            )}
            </div>;
    }
}

export default hot(module)(Voting);