import React, {Component} from 'react';

class Map extends Component {

  componentDidMount() {
    this.getVenues(this.props.filterQuery)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.filterQuery !== this.props.filterQuery) {
      this.getVenues(this.props.filterQuery)
    }
  }

  getVenues = (query) => {
    const venueRequest = 'https://api.foursquare.com/v2/venues/explore?'
    const parameters = {
      near: "Asheville, NC",
      client_id: "U40J3UEBLCG1TMBEQ4XCEU1J5GYNFSPMUJWVVGN4EDR5SJUQ",
      client_secret: "F5BB10TQ0IUVYVSHHKIVKXJ1SVFHX5UFURW4CASUACWPGV0D",
      query: query,
      v: "20180922"
    }

    const endPoint = venueRequest + new URLSearchParams(parameters)

    fetch(endPoint).then(response => response.json()).then(parsedJSON => {
      this.props.addVenues(parsedJSON.response.groups[0].items)
      this.setState({
        venues: parsedJSON.response.groups[0].items
      },  this.loadMap("https://maps.googleapis.com/maps/api/js?key=AIzaSyAVOPoUev3-s_UupkvLyhGPTd5ON5X_mH8&v=3&callback=initMap"))

    }).catch(error => console.log('Foursquare had an error! ', error))
  }

  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 35.584861,
        lng: -82.557763
      },
      zoom: 11.5
    })

    var infoWin = new window.google.maps.InfoWindow()

    this.props.venues.map(markedVenue => {
      var contentString = `<div id="infoContent">
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

      var marker = new window.google.maps.Marker({
        position: {
          lat: markedVenue.venue.location.lat,
          lng: markedVenue.venue.location.lng
        },
        title: markedVenue.venue.name,
        id: markedVenue.venue.id,
        map: map
      })

      marker.addListener('click', () => {
        infoWin.setContent(contentString)
        infoWin.open(map, marker)
      })

      this.props.addMarker(marker)
    })
  }

  loadMap = (src) => {
    const scriptElement = window.document.createElement('script')
    const firstScript = window.document.getElementsByTagName('script')[0]

    scriptElement.src = src
    scriptElement.async = true
    scriptElement.defer = true
    firstScript.parentNode.insertBefore(scriptElement, firstScript)
    window.initMap = this.initMap
  }

  render() {
    return(
      <div id='map'></div>
    )
  }
}

export default Map