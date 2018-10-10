import React, {Component} from 'react'

import '../Map/Map.css'

class Map extends Component {

  // Loads all the map information once it is mounted.
  componentDidMount() {
    this.getVenues(this.props.filterSection)
  }

  // Loads all the map information once it changes or updates.
  componentDidUpdate(prevProps) {
  if (prevProps.reload !== this.props.reload) {
      setTimeout(() => {this.getVenues(this.props.filterSection)}, 100)
      console.log('map reloaded 1')

    } else if (prevProps.markers !== this.props.markers) {
      this.initMap()
      console.log('map reloaded 2')
    }
  }


  // Calls all the info for venues, sets up endpoint and retrieves the information.
  //This uses Foursquares API's database.
  getVenues = (query) => {

      const venueRequest = 'https://api.foursquare.com/v2/venues/explore?'
      const parameters = {
        near: "Asheville, NC",
        client_id: "U40J3UEBLCG1TMBEQ4XCEU1J5GYNFSPMUJWVVGN4EDR5SJUQ",
        client_secret: "OKA5YRRWSVBJCZ5QEY5PKBUFWDVQUFW2N3E0KIHCONWFN0AF",
        section: query,
        v: "20180922"
      }

      // Creates the full URL
      const endPoint = venueRequest + new URLSearchParams(parameters)

      fetch(endPoint).then(response => response.json()).then(parsedJSON => {
        this.props.addVenues(parsedJSON.response.groups[0].items)
        this.setState({
          venues: parsedJSON.response.groups[0].items
        },
        // loads and initiates the map.
        this.loadInitMap())
      }).catch(error => {console.log('Foursquare had an error! ', error)
        alert('Foursquare API failed to load. Please check your internet connection and refresh the page. ', error)})
    // }
  }

  // Initiates the map, sets up markers, adds info windows, and sets positions.
  // This uses Google Maps API
  initMap = () => {
    this.props.markers.forEach( marker => {
      this.props.markers.splice(marker)
    })

    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 35.584861,
        lng: -82.557763
      },
      zoomControl: true,
      zoomControlOptions: {
          position: window.google.maps.ControlPosition.RIGHT_CENTER
      },
      fullscreenControl: true
    })

    var infoWin = new window.google.maps.InfoWindow()
    var bounds = new window.google.maps.LatLngBounds()

    // Sets the markers state on the MainPage to empty
    this.props.venueResults.forEach(markedVenue => {

        // Creates the content for the infowindow
        var contentString = `<div id="infoContent" tabIndex="0">
        <div id="siteNotice">
        </div>
        <h1 id="firstHeading" class="firstHeading"> ${markedVenue.venue.name} </h1>
        <p id="address"> <b>${markedVenue.venue.location.formattedAddress[0]}<br>
        ${markedVenue.venue.location.formattedAddress[1]}</b>
        </p>
        <div id="bodyContent">
        <p> ${markedVenue.venue.categories[0].name} </p>
        </div>
        </div>`

        // Creates marker for the venue that is called
        var marker = new window.google.maps.Marker({
          position: {
            lat: markedVenue.venue.location.lat,
            lng: markedVenue.venue.location.lng
          },
          title: markedVenue.venue.name,
          id: markedVenue.venue.id,
          map: map
        })

        var loc = new window.google.maps.LatLng(marker.position.lat(), marker.position.lng())
        bounds.extend(loc)

        // Adds event listener to open info window on click.
        marker.addListener('click', () => {
          map.setCenter(marker.getPosition())
          marker.setAnimation(window.google.maps.Animation.BOUNCE)
          setTimeout(() => {
            marker.setAnimation(null)
          }, 1000)
          infoWin.setContent(contentString)
          infoWin.open(map, marker)
        })

        // Adds each marker that is on the page to the markers state array.
        this.props.markers.push(marker)

    })


    map.fitBounds(bounds)
    map.panToBounds(bounds)

    setTimeout(() => {
      var oldAlert = document.getElementById("aria-alert")
      if (oldAlert){ document.body.removeChild(oldAlert) }

      var newAlert = document.createElement("div")
      newAlert.setAttribute("role", "alert")
      newAlert.setAttribute("id", "aria-alert")
      var msg = document.createTextNode('Venues have loaded')
      newAlert.appendChild(msg)
      document.body.appendChild(newAlert)
    }, 500)

  }


  // Loads the map and creates the script file for the map.
  loadMap = (src) => {
    const scriptElement = window.document.createElement('script')
    const firstScript = window.document.getElementsByTagName('script')[0]

    scriptElement.onerror = () => {window.alert("Google Maps API failed to load data!")}

    scriptElement.setAttribute("id", "map-script")
    scriptElement.src = src
    scriptElement.async = true
    scriptElement.defer = true
    firstScript.parentNode.insertBefore(scriptElement, firstScript)
    window.initMap = this.initMap
  }

  loadInitMap = () => {

    // Checks if the map script tag is there,
    //if it isn't it adds it, if it is, it just re initializes it.
    if (typeof google === 'undefined') {
      this.loadMap("https://maps.googleapis.com/maps/api/js?key=AIzaSyAVOPoUev3-s_UupkvLyhGPTd5ON5X_mH8&v=3&callback=initMap")
    } else {
      this.initMap()
    }
  }

  render() {
    return (<div id='map' role="application" aria-label="Map" tabIndex="-1"></div>)
  }
}

export default Map
