import React, {Component} from 'react';
import Header from './Header/Header.js';
import SideDrawer from './SideDrawer/SideDrawer'
import Map from './Map/Map'

class MainPage extends Component {
  state = {
    sideDrawerOpen: false,
    venues: [],
    filterQuery: ''
  }

  addVenues = (venues) => {
    this.setState({
      venues: venues
    })
  }

  venueTypeFilter = (input) => {
    this.setState({
      filterQuery: input
    })
  }

  drawerToggleButtonHandler = () => {
    this.setState((prevState) => {
      return {
        sideDrawerOpen: !prevState.sideDrawerOpen
      }
    })
  }

  render() {
    let sideDrawer

    if (this.state.sideDrawerOpen) {
      sideDrawer = <SideDrawer venues={this.state.venues} filter={this.venueTypeFilter}/>
    }

    {console.log(this.state.venues)}

    return (<div style={{
        height: '100%'
      }}>
      <Header click={this.drawerToggleButtonHandler}/> {sideDrawer}
      <main>
        <Map addVenues={this.addVenues} venues={this.state.venues} filterQuery={this.state.filterQuery}/>
      </main>
    </div>)
  }
}

export default MainPage;
