import React from 'react';

export default class Vote extends React.PureComponent {
    // Get the 2 entries to vote on.
    getPair() {
        return this.props.pair || [];
    }

    // Return true if the user has voted.
    isDisabled() {
        return !!this.props.hasVoted;
    }

    hasVotedFor(entry) {
        return this.props.hasVoted === entry;
    }

    render() {
        return <div className="voting">
            {this.getPair().map(entry =>
                <button
                    key={entry}
                    disabled={this.isDisabled()}
                    onClick={() => this.props.vote(entry)}
                >
                    <h1>{entry}</h1>
                    {this.hasVotedFor(entry) ?
                        <div className="label">Voted</div> : null
                    }
                </button>
            )}
        </div>;
    }
}