import { fabric } from 'fabric';
import { findDOMNode } from 'react-dom';
import React from 'react';

import FabricObjects from '../lib/fabric-objects';

export default class Board extends React.Component {
  componentDidMount() {
    const canvas = new fabric.Canvas(findDOMNode(this), {
      isDrawingMode: this.props.isDrawingMode,
      selection: false, // disable group selection
    });

    this._canvas = canvas;

    canvas.on('object:added', async ({ target: fabricObject }) => {
      try { // we use genInsert and not insert to catch any potential errors
        const id = await FabricObjects.genInsert(fabricObject.toObject());
        fabricObject.id = id;
      } catch (e) {
        alert(String(e));
      }
    });
  }

  componentWillUpdate(nextProps) {
    this._canvas.isDrawingMode = nextProps.isDrawingMode;
  }

  render() {
    return (
      <canvas width="800" height="600"></canvas>
    );
  }
}
