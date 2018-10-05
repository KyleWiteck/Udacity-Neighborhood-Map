import React, {Component} from 'react'

import './DrawerToggleButton.css'

class DrawerToggleButton extends Component {
  render() {
    return(
      <button className="drawer-button" onClick={this.props.click} aria-expanded={this.props.ariaExpand} aria-label='Filter Menue '>
          <div className="no-line" />
          <div className="button-line" />
          <div className="button-line" />
          <div className="button-line" />
          <div className="no-line" />
      </button>
    )
  }
}

export default DrawerToggleButton;
