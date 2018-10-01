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

  // Adds the ability to change state of venues via props.
  addVenues = (venues) => {
    this.setState({
      venues: venues
    })
  }

  // Adds the ability to push marker to markers state via props.
  addMarker = (marker) => {
    this.state.markers.push(marker)
  }

  clearMarkers = () => {
    this.setState({
      markers: []
    })
  }

  // Adds the ability to change state of filterQuery via props.
  // Works with input filter in side drawer.
  venueTypeFilter = (input) => {
    this.setState({
      filterQuery: input
    })
  }


  // Opens and closes the side drawer when clicking hamburger icon.
  drawerToggleButtonHandler = () => {
    this.setState((prevState) => {
      return {
        sideDrawerOpen: !prevState.sideDrawerOpen
      }
    })
  }

  // Triggers a click on the marker after clicking corrisponding name in side drawer.
  handleClick = (id) => {
    const foundMarker = this.state.markers.find(marker => marker.name === id)
    window.google.maps.event.trigger('click', foundMarker)
  }

  render() {
    let sideDrawer

    // Adds and removes side drawer when hamburger icon is clicked.
    if (this.state.sideDrawerOpen) {
      sideDrawer = <SideDrawer venues={this.state.venues} filter={this.venueTypeFilter} markers={this.state.markers}/>
    }

    return (<div style={{
        height: '100%'
      }}>
      <Header click={this.drawerToggleButtonHandler}/>
      {sideDrawer}
      <main>
        <Map addVenues={this.addVenues} venues={this.state.venues} filterQuery={this.state.filterQuery} addMarker={this.addMarker} clearMarkers={this.clearMarkers}/>
      </main>
    </div>)
  }
}

export default MainPage;
