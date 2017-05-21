import React from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

export default class AccountsUI extends React.Component {
  componentDidMount() {
    this._view = Blaze.render(
      Template.loginButtons,
      ReactDOM.findDOMNode(this)
    );
  }

  componentWillUnmount() {
    Blaze.remove(this._view);
  }

  render() {
    return <div />;
  }
}
