import React, {Component} from 'react';
import Header from '../Header/Header.js';
import SideDrawer from '../SideDrawer/SideDrawer'
import Map from '../Map/Map'

import '../MainPage/MainPage.css';

class MainPage extends Component {
  state = {
    sideDrawerOpen: false,
    reload: false,

    filterSection: '',
    filterName: '',
    venues: [],

    markers: [],

    ariaExpand: false
  }

  reloadState = () => {
    if (this.state.reload === true){
      this.setState({reload: false})
    } else {
      this.setState({reload: true})
    }
  }

  // Adds the ability to change state of venues via props.
  addVenues = (venues) => {
    this.setState({
      venues: venues
    })
  }

  clearVenues = () => {
    this.setState({
      venues: []
    })
  }

  // Adds the ability to push marker to markers state via props.
  addMarker = (marker) => {
    this.state.markers.push(marker)
  }


  clearMarkersArray = () => {
    this.setState({
      markers: []
    })
  }

  // Adds the ability to change state of filterSection via props.
  // Works with input filter in side drawer.
  venueTypeFilter = (input) => {
    this.setState({
      filterSection: input
    })
  }

  nameFilter = (input) => {
    this.setState({
      filterName: input
    })
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

  drawerCloseOnMapHandler = () => {
    if (this.state.sideDrawerOpen === true) {
      this.setState({sideDrawerOpen: false,
      ariaExpand: false})
    }
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
      sideDrawer = <SideDrawer venues={this.state.venues}  filter={this.venueTypeFilter}  markers={this.state.markers}  filterSection={this.state.filterSection} filterList={this.filterList} addVenues={this.addVenues} clearMarkers={this.clearMarkersArray} clearVenues={this.clearVenues} reloadState={this.reloadState} ariaExpand={this.state.ariaExpand}/>
    }



    return (<div style={{
        height: '100%'
      }}>
      <Header click={this.drawerToggleButtonHandler} ariaExpand={this.state.ariaExpand}/>
      {sideDrawer}
      <main onClick={this.drawerCloseOnMapHandler}>
        <Map tabIndex='-1' addVenues={this.addVenues} venues={this.state.venues} filterSection={this.state.filterSection} addMarker={this.addMarker} markers={this.state.markers} clearMarkers={this.clearMarkersArray} reload={this.state.reload} clearVenues={this.clearVenues}/>
      </main>
    </div>)
  }
}

export default MainPage;
