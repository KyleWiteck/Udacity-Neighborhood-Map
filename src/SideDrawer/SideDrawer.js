import React, {Component} from 'react';

import './SideDrawer.css'

class SideDrawer extends Component {
    state = {
      value: '',
      open: false,
      topics: ['Top Pick','Trending', 'Food', 'Coffee', 'Arts', 'Outdoors', 'Drinks', 'Shops'],
    }

  // Sets the value state to the current value that is being typed.
  updateValue = (value) => {
    this.setState({value: value})
    this.handleChange(value)
  }

  handleChange = (value) =>{
    let venues = this.props.venueResults;
    let  updatedVenues = venues.filter(venue => {
      return venue.venue.name.toLowerCase().search(
        value.toLowerCase()) !== -1
    });
    if (value) {
      this.props.venueResults.forEach(venue => {
        this.props.venueResults.splice(venue)
      })

      updatedVenues.forEach(venue => {
        this.props.venueResults.push(venue)
      })


      this.props.markers.forEach(venue => {
        this.props.markers.splice(venue)
      })

      updatedVenues.forEach(venue => {
        this.props.markers.push(venue)
      })

      console.log(this.props.venueResults)
    } else {

      this.props.venueResults.forEach(venue => {
        this.props.venueResults.splice(venue)
      })

      this.props.venues.forEach(venue => {
        this.props.venueResults.push(venue)
      })

      console.log(this.props.venueResults)
    }

  }

  handleClick = (id) => {
    let foundMarker = this.props.markers.find(marker => marker.id === id)
    window.google.maps.event.trigger(foundMarker, 'click')
  }

  scrollToTop = () => {
    window.document.getElementById('drawer-nav').scrollTop = 0; // For Safari
    window.document.getElementById('drawer-nav').scrollTop = 0; // For Chrome, Firefox, IE and Opera
    window.document.getElementsByTagName('a')[1].focus()
  }

  dropList = () => {
    let open = this.state.open

    const dropNav = window.document.getElementById('dropdown-nav')
    const ulContent = window.document.getElementById('topic-list')

    if (open === true) {
      ulContent.innerHTML = ""
      this.setState({
        open: false
      })

      setTimeout(() => {
        var oldAlert = document.getElementById("aria-alert")
        if (oldAlert){ document.body.removeChild(oldAlert) }

        var newAlert = document.createElement("div")
        newAlert.setAttribute("role", "alert")
        newAlert.setAttribute("id", "aria-alert")
        var msg = document.createTextNode('Categories Collapsed')
        newAlert.appendChild(msg)
        document.body.appendChild(newAlert)
      }, 100)

    } else {
      dropNav.style.display = 'block'

      const topics = this.state.topics

      setTimeout(() => {
        var oldAlert = document.getElementById("aria-alert")
        if (oldAlert){ document.body.removeChild(oldAlert) }

        var newAlert = document.createElement("div")
        newAlert.setAttribute("role", "alert")
        newAlert.setAttribute("id", "aria-alert")
        var msg = document.createTextNode('Categories Expanded')
        newAlert.appendChild(msg)
        document.body.appendChild(newAlert)
      }, 100)

      topics.forEach(topic => {

          const liElement = window.document.createElement('li')
          const aTag = window.document.createElement('a')

          liElement.className = 'topic'
          aTag.innerHTML = topic

          ulContent.appendChild(liElement)
          liElement.appendChild(aTag)
          liElement.setAttribute('tabIndex', '0')

          liElement.addEventListener('click', () => {

            this.props.clearVenues()
            this.props.clearMarkers()
            this.props.venueResults.forEach(venue => {
              this.props.venueResults.splice(venue)
            })

            this.props.reloadState()

            this.props.filter(topic)

            ulContent.innerHTML = ""
            this.setState({
              open: false
            })
          })

          liElement.addEventListener('keypress', (e) => {
            const key = e.which || e.keycode
            if (key === 13) {

            this.props.clearVenues()
            this.props.clearMarkers()
            this.props.venueResults.forEach(venue => {
              this.props.venueResults.splice(venue)
            })

            this.props.reloadState()

            this.props.filter(topic)

            ulContent.innerHTML = ""
            this.setState({
              open: false
            })
            }
        })
      })

        this.setState({
          open: true
        })
    }
  }

  render() {
    return (
      <div id='side-drawer'>

          <div id="drop-down">
            <button onClick={this.dropList}>Click For Categories</button>
            <nav id="dropdown-nav">
              <ul id="topic-list"></ul>
            </nav>
          </div>

          <div id='filter'>
          <form onSubmit={(e) => {e.preventDefault()}} role="search">
            <label>
              <input type="text" name="venue-type" placeholder='Filter By Name' aria-label='Type the catagory you wish to filter of the map and press enter'  value={this.state.value} onChange={(e) => this.updateValue(e.target.value)}/>
            </label>
          </form>

          <div id='drawer-list' aria-label='List of venues' tabIndex='0'>
            <nav id='drawer-nav'>
              <ul id='marker-list'>
                {
                    this.props.venueResults.map((venue, index) => {
                      return(
                      <li key={index}>
                        <a className="drawer-name" aria-label={`${venue.venue.name} ${venue.venue.location.formattedAddress} ${venue.venue.categories[0].name}`  } onClick={() => {this.handleClick(venue.venue.id)}} onKeyPress={() => {this.handleClick(venue.venue.id)}} tabIndex="0">
                          {venue.venue.name}
                        </a>
                      </li>)
                  })
                }
                <button id='to-top' onClick={this.scrollToTop} tabIndex='0'>Back To Top</button>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    )
  }
}


export default SideDrawer
