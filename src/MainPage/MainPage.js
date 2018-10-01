import React, {Component} from 'react';
import Header from '../Header/Header.js';
import SideDrawer from '../SideDrawer/SideDrawer'
import Map from '../Map/Map'

import '../MainPage/MainPage.css';

class MainPage extends Component {
  state = {
    sideDrawerOpen: false,
    venues: [],
    filterQuery: '',
    markers: []
  }

  addVenues = (venues) => {
    this.setState({
      venues: venues
    })
  }

  addMarker = (marker) => {
    this.state.markers.push(marker)
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

  handleClick = (id) => {
    const foundMarker = this.state.markers.find(marker => marker.name === id)
    window.google.maps.event.trigger('click', foundMarker)
  }

  render() {
    let sideDrawer

    if (this.state.sideDrawerOpen) {
      sideDrawer = <SideDrawer venues={this.state.venues} filter={this.venueTypeFilter} markers={this.state.markers}/>
    }

    return (<div style={{
        height: '100%'
      }}>
      <Header click={this.drawerToggleButtonHandler}/>
      {sideDrawer}
      <main>
        <Map addVenues={this.addVenues} venues={this.state.venues} filterQuery={this.state.filterQuery} addMarker={this.addMarker}/>
      </main>
    </div>)
  }
}

export default MainPage;
