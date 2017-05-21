import { createContainer } from 'meteor/react-meteor-data';
import { fabric } from 'fabric';
import { findDOMNode } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import React from 'react';

import FabricObjects from '../lib/fabric-objects';

class Board extends React.Component {
  componentDidMount() {
    const canvas = new fabric.Canvas(findDOMNode(this), {
      isDrawingMode: this.props.isDrawingMode,
      selection: false, // disable group selection
    });

    this._canvas = canvas;

    canvas.on('object:added', async ({ target: fabricObject }) => {
      if (fabricObject.id) {
        return;
      }

      try { // we use genInsert and not insert to catch any potential errors
        const id = await FabricObjects.genInsert(fabricObject.toObject());
        fabricObject.id = id;
      } catch (e) {
        alert(String(e));
      }
    });

    canvas.on('object:modified', async ({ target: fabricObject }) => {
      try {
        await FabricObjects.genUpdate(fabricObject.id, { $set: fabricObject.toObject() });
      } catch (e) {
        alert(String(e));
      }
    });

    this._fabricObjectsChangesHandle = this.props.fabricObjectsCursor.observeChanges({
      added(id, doc) {
        const objectOnCanvas = canvas.getObjectById(id);
        if (objectOnCanvas) {
          return;
        }

        fabric.util.enlivenObjects([doc], ([fabricObject]) => {
          fabricObject.id = id;
          canvas.add(fabricObject);
        });
      },
      changed(id, fields) {
        const fabricObject = canvas.getObjectById(id);
        if (!fabricObject) {
          return;
        }

        fabricObject.set(fields);
        canvas.renderAll();
      },
      removed(id) {
        const fabricObject = canvas.getObjectById(id);
        if (!fabricObject) {
          return;
        }

        canvas.remove(fabricObject);
      },
    });
  }

  componentWillUpdate(nextProps) {
    this._canvas.isDrawingMode = nextProps.isDrawingMode;
  }

  componentWillUnmount() {
    this._fabricObjectsChangesHandle.stop();
  }

  render() {
    return (
      <canvas width="800" height="200"></canvas>
    );
  }
}

export default createContainer(() => {
  return {
    objectsHandle: Meteor.subscribe('fabricObjects'),
    fabricObjectsCursor: FabricObjects.find(),
  };
}, Board);

/**
 * @example canvas.getObjectById(id)
 */
fabric.Canvas.prototype.getObjectById = function (id) {
  return this.getObjects().find(obj => obj.id === id);
};
