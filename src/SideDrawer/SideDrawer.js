import React, {Component} from 'react';

import './SideDrawer.css'

class SideDrawer extends Component {
  state = {
    value: '', // Holds the value of the input box
    open: false, // Used to check if the category button has ben open or closed
    topics: [
      'Top Pick',
      'Trending',
      'Food',
      'Coffee',
      'Arts',
      'Outdoors',
      'Drinks',
      'Shops'
    ] // Used as a list of topics for the category button
  }

  // Sets the value state to the current value that is being typed.
  // Instantiates the handleChange methods.
  updateValue = (value) => {
    this.setState({value: value})
    this.handleChange(value)
  }

  // Handles the filtering of the names that are passed into the input box.
  handleChange = (value) => {
    let venues = this.props.venueResults;

    // filters the venues and turns them lower case,
    // then it seaches for the value that is passed in after turning it to lower case.
    let updatedVenues = venues.filter(venue => {
      return venue.venue.name.toLowerCase().search(value.toLowerCase()) !== -1
    });

    // If there is a value, it will that update the venueResults and the markers based on the updatedVenues
    if (value) {
      this.props.updateVenueResults(updatedVenues)
      this.props.updateMarkers(updatedVenues)
    } else {

      // If there is no value, it will trigger reload state, which triggers the map and to reload the venues based on the current selected category.
      this.props.reloadState()
    }
  }

  // This handles the "back to top" button at the bottom of the list in the sideDrawer.
  scrollToTop = () => {
    window.document.getElementById('drawer-nav').scrollTop = 0; // For Safari
    window.document.getElementById('drawer-nav').scrollTop = 0; // For Chrome, Firefox, IE and Opera
    window.document.getElementsByTagName('a')[1].focus()
  }

  // This open and closes the catagory list when the button is pressed.
  dropList = () => {
    let open = this.state.open

    const dropNav = window.document.getElementById('dropdown-nav')
    const ulContent = window.document.getElementById('topic-list')

    // If open is true, then it will clear all the html making up the list of catagors and then set open to false.
    if (open) {
      ulContent.innerHTML = ""
      this.setState({open: false})

      // This adds an aria alert to say that button has Collapsed the list
      setTimeout(() => {
        var oldAlert = document.getElementById("aria-alert")
        if (oldAlert) {
          document.body.removeChild(oldAlert)
        }

        var newAlert = document.createElement("div")
        newAlert.setAttribute("role", "alert")
        newAlert.setAttribute("id", "aria-alert")
        var msg = document.createTextNode('Categories Collapsed')
        newAlert.appendChild(msg)
        document.body.appendChild(newAlert)
      }, 100)

    } else {

      // If open is false, then it will unhide the list. Create the HTML for the list of catigory buttons and set the aria alert to Expanded.
      dropNav.style.display = 'block'

      const topics = this.state.topics

      setTimeout(() => {
        var oldAlert = document.getElementById("aria-alert")
        if (oldAlert) {
          document.body.removeChild(oldAlert)
        }

        var newAlert = document.createElement("div")
        newAlert.setAttribute("role", "alert")
        newAlert.setAttribute("id", "aria-alert")
        var msg = document.createTextNode('Categories Expanded')
        newAlert.appendChild(msg)
        document.body.appendChild(newAlert)
      }, 100)

      // Creates the the list of catigoies to choose from when buttin is clicked
      topics.forEach(topic => {

        const liElement = window.document.createElement('li')
        const aTag = window.document.createElement('a')

        liElement.className = 'topic'
        aTag.innerHTML = topic

        ulContent.appendChild(liElement)
        liElement.appendChild(aTag)
        liElement.setAttribute('tabIndex', '0')

        // When clicked it clears all venues and markers,
        // then sets the reload state that trigger the map  and venues to reload from the current catigory selected.
        liElement.addEventListener('click', () => {

          this.props.clearVenues()
          this.props.clearMarkers()
          this.props.venueResults.forEach(venue => {
            this.props.venueResults.splice(venue)
          })

          this.props.reloadState()

          this.props.filter(topic)

          ulContent.innerHTML = ""
          this.setState({open: false})
        })

        // When enter is pressed it clears all venues and markers,
        // then sets the reload state that trigger the map  and venues to reload from the current catigory selected.
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
            this.setState({open: false})
          }
        })
      })

      this.setState({open: true})
    }
  }

  render() {
    return (<div id='side-drawer'>

      <div id="drop-down">
        <button onClick={this.dropList}>Click For Categories</button>
        <nav id="dropdown-nav">
          <ul id="topic-list"></ul>
        </nav>
      </div>

      <div id='filter'>
        <form onSubmit={(e) => {
            e.preventDefault()
          }} role="search">
          <label>
            <input type="text" name="venue-type" placeholder='Filter By Name' aria-label='Type the catagory you wish to filter of the map and press enter' value={this.state.value} onChange={(e) => this.updateValue(e.target.value)}/>
          </label>
        </form>

        <div id='drawer-list' aria-label='List of venues' tabIndex='0'>
          <nav id='drawer-nav'>
            <ul id='marker-list'>
              {
                this.props.venueResults.map((venue, index) => {
                  return (<li key={index}>
                    <a className="drawer-name" aria-label={`${venue.venue.name} ${venue.venue.location.formattedAddress} ${venue.venue.categories[0].name}`} onClick={() => {
                        this.props.handleClick(venue.venue.id)
                      }} onKeyPress={() => {
                        this.props.handleClick(venue.venue.id)
                      }} tabIndex="0">
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
    </div>)
  }
}

export default SideDrawer
