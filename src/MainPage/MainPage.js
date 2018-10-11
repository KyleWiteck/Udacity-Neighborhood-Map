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
    venueResults: [],
    markers: [],
    ariaExpand: false
  }

  reloadState = () => {
    if (this.state.reload === true) {
      this.setState({reload: false})
    } else {
      this.setState({reload: true})
    }
  }

  // Adds the ability to change state of venues via props.
  addVenues = (venues) => {
    this.setState({venues: venues})
    this.nameFilter(this.state.filterName);
  }

  // Empties the venue state array
  clearVenues = () => {
    this
      .state
      .venues
      .forEach(venue => {
        this
          .state
          .venues
          .splice(venue)
      })
  }

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
    this
      .state
      .markers
      .push(marker)
  }

  clearMarkers = () => {
    this.state.markers.forEach(marker => {
        this.state.markers.splice(marker)
      })
  }

  updateMarkers = (newVenues) => {
    this.state.markers.forEach(marker => {
      this.state.markers.splice(marker)
    })

    this.setState({markers: newVenues})
  }

  // Adds the ability to change state of filterSection via props. Works with input
  // filter in side drawer.
  sectionFilter = (input) => {
    console.log("sectionFilter: ", input);
    this.setState({filterSection: input})
  }

  nameFilter = (input) => {
    let venueResults = input !== ""
      ? this.state.venues.filter(venue => {
          if (venue.name.includes(input)) {
            return venue;
          }
        })
      : this.state.venues;
      console.log("venueResults from nameFilter: ", venueResults);
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

  drawerCloseOnMapHandler = () => {
    if (this.state.sideDrawerOpen === true) {
      this.setState({sideDrawerOpen: false, ariaExpand: false})
    }
  }

  handleClick = (id) => {
    let foundMarker = this.state.markers.find(marker => marker.id === id)
    window.google.maps.event.trigger(foundMarker, 'click')
  }

  render() {
    console.log("venueResults for render: ", this.state.venueResults)
    console.log("Markers for render: ", this.state.markers)

    let sideDrawer

    // Adds and removes side drawer when hamburger icon is clicked.
    if (this.state.sideDrawerOpen) {
      sideDrawer = <SideDrawer
        venues={this.state.venues}
        filter={this.sectionFilter}
        markers={this.state.markers}
        clearMarkers={this.clearMarkers}
        clearVenues={this.clearVenues}
        reloadState={this.reloadState}
        ariaExpand={this.state.ariaExpand}
        venueResults={this.state.venueResults}
        updateVenueResults={this.updateVenueResults}
        updateMarkers={this.updateMarkers}
        handleClick={this.handleClick}/>
    }

    return (
      <div style={{
        height: '100%'
      }}>
        <Header
          click={this.drawerToggleButtonHandler}
          ariaExpand={this.state.ariaExpand}/> {sideDrawer}
        <main onClick={this.drawerCloseOnMapHandler}>
          <Map
            tabIndex='-1'
            addVenues={this.addVenues}
            venues={this.state.venues}
            filterSection={this.state.filterSection}
            addMarker={this.addMarker}
            markers={this.state.markers}
            clearMarkers={this.clearMarkers}
            reload={this.state.reload}
            venueResults={this.state.venueResults}/>
        </main>
      </div>
    )
  }
}

export default MainPage;
