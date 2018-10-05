import React, {Component} from 'react';

import DrawerToggleButton from '../SideDrawer/DrawerToggleButton'

import '../Header/Header.css'

class Header extends Component {
  render() {
    return(
      <header>
        <nav id="main-nav">
          <div id='hamburger'>
            <DrawerToggleButton click={this.props.click} ariaExpand={this.props.ariaExpand}/>
          </div>
          <div id="logo" tabIndex='-1'>
            <a href="/" tabIndex='-1'>LOGO</a>
          </div>
          <div id="nav-list">
          </div>
        </nav>
      </header>
    )
  }
}

export default Header;
