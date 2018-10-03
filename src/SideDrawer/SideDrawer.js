import React, {Component} from 'react';

import './SideDrawer.css'

class SideDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Sets the value state to the current value that is being typed.
  handleChange = (event) =>{
    this.setState({value: event.target.value});
  }

  // Takes the value from the state and adds it to the filterQuery state on the MainPage.
  handleSubmit = (event) => {
    this.props.filter(this.state.value)
    event.preventDefault();
  }

  // If the name is clicked in the drawer,
  // it will check for an id that matches and clicks the marker that relates to that name.
  handleClick = (id) => {
    let foundMarker = this.props.markers.find(marker => marker.id === id)
    window.google.maps.event.trigger(foundMarker, 'click')
  }


  handleKeyPress = (id, e) => {
    if(e.which === 13){
      console.log(id)

    }
  }

  scrollToTop = () => {
    window.document.getElementById('drawer-nav').scrollTop = 0; // For Safari
    window.document.getElementById('drawer-nav').scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }


  render() {

    return (
      <div id='side-drawer'>
        <form onSubmit={this.handleSubmit} role="search">
          <label>
            <input type="text" name="venue-type" aria-label='Type the catagory you wish to filter of the map.' onChange={this.handleChange}/>
          </label>
          <input type="submit" value="Filter" role="button"/>
        </form>
        <div id='drawer-list'>
          <nav id='drawer-nav'>
            <ul>
              {
                this.props.venues.map((venue, index) => {
                  return(
                  <li role='button' key={index}>
                    <a className="drawer-name" onClick={() => {this.handleClick(venue.venue.id)}} onKeyPress={() => {this.handleClick(venue.venue.id)}} tabIndex="0">
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
    )
  }
}

export default SideDrawer
