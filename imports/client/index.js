import React from 'react';

import AccountsUI from './accounts-ui';
import Board from './board';
import FabricObjects from '../lib/fabric-objects';

if (Meteor.isDevelopment) {
  global.FabricObjects = FabricObjects;
}

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDrawingMode: true,
    };
  }

  render() {
    console.log('params', this.props.match.params);

    const { isDrawingMode } = this.state;
    return (
      <div>
        <h1>Whiteboard</h1>
        <AccountsUI />
        <Board
          isDrawingMode={isDrawingMode}
        />
        <label>
          <input
            type="checkbox"
            onChange={(e) => {
              this.setState({
                isDrawingMode: e.target.checked,
              });
            }}
            checked={isDrawingMode}
          />
          Drawing mode
        </label>
      </div>
    );
  }
}
