import { fabric } from 'fabric';
import { findDOMNode } from 'react-dom';
import React from 'react';

export default class Board extends React.Component {
  componentDidMount() {
    this._canvas = new fabric.Canvas(findDOMNode(this), {
      isDrawingMode: true,
      selection: false, // disable group selection
    });
  }

  render() {
    return (
      <canvas width="800" height="600"></canvas>
    );
  }
}
