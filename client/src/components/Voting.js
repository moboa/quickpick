import React from 'react';
import { connect } from 'react-redux';
import Winner from './Winner';
import Vote from './Vote';
import * as actionCreators from '../actionCreators';

export class Voting extends React.PureComponent {
    render() {
        return <div>
            {this.props.winner ? 
                <Winner ref="winner" winner={this.props.winner} /> :
                <Vote {...this.props} />
            }
        </div>;
    }
}

// Add state properties to React component props.
function mapStateToProps(state) {
    return {
        pair: state.getIn(['vote', 'pair']),
        hasVotedFor: state.get('hasVotedFor'),
        winner: state.get('winner')
    };
}


export const VotingContainer = connect(mapStateToProps, actionCreators)(Voting);