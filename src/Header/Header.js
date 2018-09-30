import React, {Component} from 'react';

import DrawerToggleButton from '../SideDrawer/DrawerToggleButton'


class Header extends Component {
  render() {
    return(
      <header>
        <nav>
          <div id='hamburger'>
            <DrawerToggleButton click={this.props.click}/>
          </div>
          <div id="logo">
            <a href="/">LOGO</a>
          </div>
          <div id="nav-list">
          </div>
        </nav>
      </header>
    )
  }
}

export default Header;
