import React from 'react';
import { hot } from 'react-hot-loader';
import Winner from './Winner';
import Vote from './Vote';

class Voting extends React.PureComponent {
    render() {
        return <div>
            {this.props.winner ? 
                <Winner ref="winner" winner={this.props.winner} /> :
                <Vote {...this.props} />
            }
        </div>;
    }
}

export default hot(module)(Voting);