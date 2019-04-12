import { Component } from 'react';

import * as views from "../../views/piece.view.js";

class Piece extends Component {
  render() {
    return views.Piece(this.props);
  }
}

export default Piece;
