import React from 'react';

import AccountsUI from './accounts-ui';
import Board from './board';
import FabricObjects from '../lib/fabric-objects';

if (Meteor.isDevelopment) {
  global.FabricObjects = FabricObjects;
}

import {
  Link,
} from 'react-router-dom';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDrawingMode: true,
    };
  }

  _clearBoard() {
    const { id: boardId } = this.props.match.params;
    Meteor.call('clearBoard', boardId);
  }

  _renderBoardWithControls() {
    const { id: boardId } = this.props.match.params;
    if (!boardId) {
      return null;
    }

    const { isDrawingMode } = this.state;

    return (
      <div>
        <Board
          id={boardId}
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
        <button onClick={() => this._clearBoard()}>
          Czyść tablicę
        </button>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h1>Whiteboard</h1>
        <AccountsUI />
        <button
          onClick={() => {
            this.props.history.push(`/board/${Random.id()}`);
          }}
        >Nowa sesja</button>
        {this._renderBoardWithControls()}
      </div>
    );
  }
}
