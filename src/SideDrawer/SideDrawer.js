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


  render() {
    {console.log(this.props.markers)}
    return (
      <div id='side-drawer'>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input type="text" name="venue-type" onChange={this.handleChange}/>
          </label>
          <input type="submit" value="Filter" />
        </form>
        <div id='drawer-list'>
          <nav id='drawer-nav'>
            <ul>
              {
                this.props.venues.map((venue, index) => {
                  return(
                  <li  key={index}>
                    <a onClick={() => {this.handleClick(venue.venue.id)}} className="drawer-name">
                      {venue.venue.name}
                    </a>
                  </li>)
                })
              }
            </ul>
          </nav>
        </div>
      </div>
    )
  }
}

export default SideDrawer
