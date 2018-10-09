import React, {Component} from 'react';

import './SideDrawer.css'

class SideDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      open: false,
      topics: ['Top Pick','Trending', 'Food', 'Coffee', 'Arts', 'Outdoors', 'Drinks', 'Shops'],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Sets the value state to the current value that is being typed.
  handleChange = (event) =>{
    this.setState({value: event.target.value});
  }

  // Takes the value from the state and adds it to the filterSection state on the MainPage.
  handleSubmit = (event) => {
    this.props.clearMarkers()
    let venues = this.props.venues;
    let  updatedVenues = venues.filter(venue => {
      return venue.venue.name.toLowerCase().search(
        this.state.value.toLowerCase()) !== -1
    });
    this.props.addVenues(updatedVenues)
    event.preventDefault()
  }

  // If the name is clicked in the drawer,
  // it will check for an id that matches and clicks the marker that relates to that name.
  handleClick = (id) => {
    let foundMarker = this.props.markers.find(marker => marker.id === id)
    window.google.maps.event.trigger(foundMarker, 'click')
    console.log(this.props.markers)
    console.log(id)
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
        var msg = document.createTextNode('Catagories Closed')
        newAlert.appendChild(msg)
        document.body.appendChild(newAlert)
      }, 1000)
    } else {
      dropNav.style.display = 'block'

      const topics = this.state.topics

      topics.forEach(topic => {

          const liElement = window.document.createElement('li')
          const aTag = window.document.createElement('a')

          liElement.className = 'topic'
          aTag.innerHTML = topic

          ulContent.appendChild(liElement)
          liElement.appendChild(aTag)
          liElement.setAttribute('tabIndex', '0')

          setTimeout(() => {
            var oldAlert = document.getElementById("aria-alert")
            if (oldAlert){ document.body.removeChild(oldAlert) }

            var newAlert = document.createElement("div")
            newAlert.setAttribute("role", "alert")
            newAlert.setAttribute("id", "aria-alert")
            var msg = document.createTextNode('Catagories Open')
            newAlert.appendChild(msg)
            document.body.appendChild(newAlert)
          }, 1000)

          liElement.addEventListener('click', () => {

            this.props.clearMarkers()

            this.props.reloadState()
            console.log(this.props.reload)

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

              this.props.reloadState()
              console.log(this.props.reload)

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

  venueList = () => {
    `list of venues ${this.props.venues.length}`
  }



  render() {
        console.log(this.props.venues)
    return (
      <div id='side-drawer'>

          <div id="drop-down">
            <button onClick={this.dropList}>Click For Categories</button>
            <nav id="dropdown-nav">
              <ul id="topic-list"></ul>
            </nav>
          </div>

          <div id='filter'>
          <form onSubmit={this.handleSubmit} role="search">
            <label>
              <input type="text" name="venue-type" placeholder='Filter By Name' aria-label='Type the name you wish to search for and press enter' onChange={this.handleChange}/>
            </label>
            <input type="submit" value="Filter"/>
          </form>

          <div id='drawer-list' aria-label='List of venues' tabIndex='0'>
            <nav id='drawer-nav'>
              <ul id='marker-list'>
                {
                    this.props.venues.map((venue, index) => {
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
