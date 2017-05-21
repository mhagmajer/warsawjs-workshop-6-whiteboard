import React from 'react';

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
    const { isDrawingMode } = this.state;
    return (
      <div>
        <h1>Whiteboard</h1>
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
