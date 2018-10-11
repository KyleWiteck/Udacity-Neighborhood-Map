import React, {Component} from 'react';
import Header from '../Header/Header.js';
import SideDrawer from '../SideDrawer/SideDrawer'
import Map from '../Map/Map'

import '../MainPage/MainPage.css';

class MainPage extends Component {
  state = {
    sideDrawerOpen: false, // Used to open and close the sideDrawer
    reload: false, // Used to reload the map if category is selected
    filterSection: '', // Used to load filteres based on category
    filterName: '', // Used for name filtering
    venues: [], //Is a retainer for the venues
    venueResults: [], // Handles the vanues that are visable
    markers: [], // Handles the markers based on venueResults
    ariaExpand: false // Handles aria expand for hamburger icon
  }

  //This sets the reload state to true or false
  reloadState = () => {
    this.state.reload === true
      ? this.setState({reload: false})
      : this.setState({reload: true})
  }

  // This will add venues to the venue state and then run nameFilter()
  addVenues = (venues) => {
    this.setState({venues: venues})
    this.nameFilter(this.state.filterName);
  }

  // Empties the venue state array
  clearVenues = () => {
    this.state.venues.forEach(venue => {
      this.state.venues.splice(venue)
    })
  }

  // Updated the venueResults by removing all venues and adding new ones.
  updateVenueResults = (newVenues) => {
    this.state.venueResults.forEach(venue => {
      this.state.venueResults.splice(venue)
    })

    newVenues.forEach(venue => {
      this.state.venueResults.push(venue)
    })
  }

  // Adds the ability to push marker to markers state via props.
  addMarker = (marker) => {
    this.state.markers.push(marker)
  }

  // The empties the markers state array
  clearMarkers = () => {
    this.state.markers.forEach(marker => {
      this.state.markers.splice(marker)
    })
  }

  // Updated the markers state array by removing all venues and adding new ones.
  updateMarkers = (newVenues) => {
    this.state.markers.forEach(marker => {
      this.state.markers.splice(marker)
    })

    this.setState({markers: newVenues})
  }

  // Adds the ability to change state of filterSection via props. Works with input
  // filter in side drawer.
  sectionFilter = (input) => {
    this.setState({filterSection: input})
  }

  // Handles name filtering.
  nameFilter = (input) => {
    let venueResults = input !== ""
      ? this.state.venues.filter(venue => venue.name.includes(input))
      : this.state.venues
    this.setState({filterName: input, venueResults})
  }

  // Opens and closes the side drawer when clicking hamburger icon.
  drawerToggleButtonHandler = () => {
    this.setState((prevState) => {
      return {
        sideDrawerOpen: !prevState.sideDrawerOpen,
        ariaExpand: !prevState.ariaExpand
      }
    })
  }

  // Closes the side drawer when clicking on the map.
  drawerCloseOnMapHandler = () => {
    if (this.state.sideDrawerOpen === true) {
      this.setState({sideDrawerOpen: false, ariaExpand: false})
    }
  }

  // Triggers a click and opens the infowindow when the a venue name is clicked in the sideDrawer.
  handleClick = (id) => {
    let foundMarker = this.state.markers.find(marker => marker.id === id)
    window.google.maps.event.trigger(foundMarker, 'click')
  }

  render() {

    let sideDrawer

    // Adds and removes side drawer when hamburger icon is clicked.
    if (this.state.sideDrawerOpen) {
      sideDrawer = <SideDrawer venues={this.state.venues} filter={this.sectionFilter} markers={this.state.markers} clearMarkers={this.clearMarkers} clearVenues={this.clearVenues} reloadState={this.reloadState} ariaExpand={this.state.ariaExpand} venueResults={this.state.venueResults} updateVenueResults={this.updateVenueResults} updateMarkers={this.updateMarkers} handleClick={this.handleClick}/>
    }

    return (<div style={{
        height: '100%'
      }}>
      <Header click={this.drawerToggleButtonHandler} ariaExpand={this.state.ariaExpand}/> {sideDrawer}
      <main onClick={this.drawerCloseOnMapHandler}>
        <Map tabIndex='-1' addVenues={this.addVenues} venues={this.state.venues} filterSection={this.state.filterSection} addMarker={this.addMarker} markers={this.state.markers} clearMarkers={this.clearMarkers} reload={this.state.reload} venueResults={this.state.venueResults}/>
      </main>
    </div>)
  }
}

export default MainPage;
